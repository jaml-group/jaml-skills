# Retained drawers and file previews

## Choose the folding owner

Use `jaml.drawer` for one retained host-relative edge panel whose presentation may switch between docked and overlay. For multiple independently foldable grid regions, use [layout.accordion](../Styles/common/layout.md#entry-layout-accordion) on the explicit-template parent and [interact.foldable](../Styles/interact.md#entry-interact-foldable) on each single-track region. A legacy paired sibling expansion uses [interact.expandable](../Styles/interact.md#entry-interact-expandable); its accordion adapter delegates state and sizing to the neighboring foldable. Keep persistent navigation rail controls outside folded hosts, because even a visible nonzero folded strip is inert.

## Retained drawers

`jaml.drawer(layout, jamlOverride?)` returns a container definition with required `content` and `drawer` component definitions. Use it for an inspector whose component identity and scroll position should survive closing. The builder owns its region structure: `jamlOverride` cannot replace generated children, alternate rendering inputs or the container type. Put panel captions, icons, styles and panel children in `layout.drawer`; the final override targets the two-region host. Its `components` array appends host children after the generated regions, not inside the panel. See the [final override contract](component.md#final-jaml-overrides) for merging and existing-hook composition.

```javascript
export default jaml.drawer(
    {
        content: { type: 'label', cap: 'Main content' },
        drawer: { type: 'label', cap: 'Inspector' },
        open: true,
        edge: 'right',
        mode: 'auto',
        size: 24
    },
    { style: { height: '32rem' } }
);
```

| Option               | Default    | Meaning                                                    |
| -------------------- | ---------- | ---------------------------------------------------------- |
| `open`               | `false`    | Boolean or ordinary JAML binding string                    |
| `edge`               | `'right'`  | `'left'`, `'right'`, `'top'`, `'bottom'`                   |
| `mode`               | `'auto'`   | `'auto'`, `'docked'`, `'overlay'`                          |
| `breakpoint`         | `48`       | Host-width threshold in rem, for every edge                |
| `size`               | `24`       | Preferred panel size in rem                                |
| `minSize`, `maxSize` | `12`, `36` | Panel bounds in rem                                        |
| `minContentSize`     | `16`       | Content minimum in rem                                     |
| `escapeToClose`      | `true`     | Unhandled, non-composing Escape inside the panel closes it |
| `resizable`          | `true`     | Resize while open and docked                               |

Sizes must be finite and nonnegative; `minSize` cannot exceed `maxSize`. Auto mode selects overlay at or below the host-width breakpoint, otherwise docked. Top/bottom drawers also use host width to choose mode, while `size` controls height.

Panel content is built on first opening and retained after closing. The host owns at most one drawer. Owner destruction destroys the content. Ordinary overlays have no curtain, background inertness, focus trap or outside-click dismissal. Use [modal presentation](../utils.md#adaptive-modal-presentation) when background interaction must be blocked.

The rendered host exposes `drawerOpen` and `drawer`. Set `host.drawerOpen`, or call `host.drawer.setOpen(boolean)` and `host.drawer.configure(options)`. Read `host.drawer.open` and its resolved `mode`. Bubbling `draweropenchange` carries `{ open }`; `drawersizechange` carries `{ size }` in rem. Mirror native dismissal into application state when binding `open`. Docked resizing retains preferred size separately from temporary host clamping. Persistence, route dismissal and fetching remain application-owned.

## File thumbnails

Use the `file` component with `props.presentation: 'thumbnail'` for a standalone file thumbnail. Its default image fit is `contain`. On development runtimes with the thumbnail-fit correction, set `props.fit: 'cover'` to fill and crop the image inside the thumbnail frame; explicit fit also applies to the native loading-thumbnail part and supports reactive updates. On development runtimes with native cover reveal, a cover thumbnail reuses the file builder’s animated sizing: hover reveals the whole image, and leaving returns to cover even if focus remains after closing preview. Keep only the existing `presentation`, `fit` and size configuration in the app; do not add image-part hover CSS or pointer state. Default/contain thumbnails remain fully visible. Omit `fit` wherever the whole image should remain visible. This does not change tile hover behavior or the separately opened preview's fit.

```javascript
const thumbnail = {
    type: 'file',
    props: {
        presentation: 'thumbnail',
        fit: 'cover',
        resource: { id: 'photo', name: 'photo.jpg', mime: 'image/jpeg', src: '/photo.jpg' }
    }
};
```

## File preview definitions

Renderer dependencies and resource loading still apply; see [Markdown and diagram rendering](../Plugins/markdown.md).

`jaml.previewer(resource, options?, jamlOverride?)` returns a definition; it does not mount a modal. Pass root customization in the third argument, using `{}` for omitted preview options. Customize preview actions and bottom content through `options.actions` and `options.mountBottom`; appended root children do not acquire those behaviors. Its final root override follows the [protected builder contract](component.md#final-jaml-overrides); resource methods, properties, generated content and existing cleanup remain owned by the previewer. Native renderers handle images, video, text/code, Markdown/JAML, Mermaid and PDF; unsupported formats show metadata and explicit actions.

```javascript
const definition = jaml.previewer({
    id: 'release-notes',
    revision: 1,
    name: 'release-notes.txt',
    kind: 'text',
    resolve: () => ({ text: 'Release notes are ready.' })
});
const model = jam.renderModal(document.body, definition, {
    presentation: 'dialog',
    click2Close: true
});
```

A resource requires `id` and `name`. Optional fields are `revision`, `mime`, `kind`, `src`, `thumbnailSrc`, `size`, `modified` and `resolve(signal)`. Explicit `kind` is `'image' | 'video' | 'text' | 'pdf'`; otherwise MIME and filename choose the renderer. `modified` is an epoch timestamp in milliseconds.

`resolve(AbortSignal)` returns an object or promise with optional `src`, `text`, `blob`, `bytes`, `width`, `height` and `release()`. Authentication and acquisition policy belong to the caller. Caller URLs remain caller-owned; preview-created resources and resolver cleanup belong to the session. Do not share exclusive cleanup ownership between competing sessions.

Options include `fit`, `lang`, `markdown` and `actions`; actions use `{ name, icon?, run(resource), disabled? }`. `budgetBytes` defaults to 64 MiB, `concurrency` to 3, and `cancelOnSwitch` to `false`. The budget estimates retained resources, not total browser memory; the selected resource may exceed it.

`navigation` accepts a live owner with `navigate(request)` and optional `subscribe(refresh, detach)`. The originating view owns membership, order and selection; see [navigation](../Plugins/navigation.md). `preload` accepts `false` or `{ previous?, next? }`, defaulting to one candidate each way from enabled navigation. `mountBottom(host)` mounts caller-owned DOM and may return synchronous restoration cleanup. Empty footer and bottom-dock surroundings dismiss through the native modal curtain, respecting its click-to-close policy. Media, controls, mounted content and scrollbar gutters remain interactive. The previewer does not treat blank space inside caller-mounted content as its own dismissal surface.

### Custom preview actions

Use `actions` for simple named callbacks. Use `extra: BaseComponentOption[]` for richer native controls, including a split control composed from buttons and a popup. The previewer copies these definitions into its top-right extra slot. Do not mutate the returned `components` array to add controls.

Extra controls inherit the read-only `currentResource` prop. Bind with `jaml.var('currentResource', callback)` or a string-path alias; watch `currentResource` when reacting to target changes. In native handlers, read `this.shared.currentResource`; `this` is the invoking control and can be used as a popup anchor. This value follows initial selection, navigation and `selectResource`, including while content loads or fails. Active-resource invalidation clears it to null. Unmount under a surviving model also clears it; terminal destruction removes the backing state. Treat null/missing as unavailable. Detached components can republish on remount under a surviving model; a closed modal is destroyed and must be rendered anew.

Example options fragment (the caller supplies `openResource`):

```javascript
const options = {
    extra: [
        {
            type: 'button',
            cap: jaml.var('currentResource', (resource) => (resource ? `Open ${resource.name}` : 'Unavailable')),
            disabled: jaml.var('currentResource', (resource) => !resource),
            onclick(event) {
                event.stopPropagation();
                const resource = this.shared.currentResource;
                if (resource) {
                    openResource(resource, this);
                }
            }
        }
    ]
};
```

The caller owns action metadata, authentication, target identity, pending/error/retry state and popup dismissal when the target changes. Keep those operations in the application or reusable business module. The previewer publishes its selection; it does not invoke an OS service or own the action request lifecycle. Use the existing `resource` input or `selectResource` method to change selection rather than writing `currentResource`.

Selection changes preserve the session and reset image transforms. Removing the originating row does not close an open preview; detaching its navigation owner disables navigation. Unmount disposes the session. The rendered host supports `selectResource(resource)` and `invalidate(id)`. Identity is `id` plus `revision`: change revision when content changes. Access revocation needs explicit invalidation; filtering an item out of a collection is insufficient.

Text/code is read-only literal content. Markdown/JAML defaults to `contentPolicy: 'safe'`; overriding that policy retains the renderer's execution consequences. PDF URLs need fetch access/CORS or a resolver-provided Blob and use the browser's embedded viewer. Supported URL forms are HTTP(S), Blob, relative URLs and kind-appropriate data URLs.

For reactive object resources, materialize descriptors in view data and use a string-path alias. A computed object prop supplied through `jaml.var` can currently reach descendants as its raw binder.
