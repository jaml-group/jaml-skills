# Retained drawers and file previews

## Retained drawers

`jaml.drawer(layout, rootOptions?)` returns a container definition with required `content` and `drawer` component definitions. Use it for an inspector whose component identity and scroll position should survive closing. The builder owns its region structure: `rootOptions` cannot replace `components`, `element` or the container type.

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

## File preview definitions

Renderer dependencies and resource loading still apply; see [Markdown and diagram rendering](../Plugins/markdown.md).

`jaml.previewer(resource, options?)` returns a definition; it does not mount a modal. Native renderers handle images, video, text/code, Markdown/JAML, Mermaid and PDF; unsupported formats show metadata and explicit actions.

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

`navigation` accepts a live owner with `navigate(request)` and optional `subscribe(refresh, detach)`. The originating view owns membership, order and selection; see [navigation](../Plugins/navigation.md). `preload` accepts `false` or `{ previous?, next? }`, defaulting to one candidate each way from enabled navigation. `mountBottom(host)` mounts caller-owned DOM and may return synchronous restoration cleanup.

Selection changes preserve the session and reset image transforms. Removing the originating row does not close an open preview; detaching its navigation owner disables navigation. Unmount disposes the session. The rendered host supports `selectResource(resource)` and `invalidate(id)`. Identity is `id` plus `revision`: change revision when content changes. Access revocation needs explicit invalidation; filtering an item out of a collection is insufficient.

Text/code is read-only literal content. Markdown/JAML defaults to `contentPolicy: 'safe'`; overriding that policy retains the renderer's execution consequences. PDF URLs need fetch access/CORS or a resolver-provided Blob and use the browser's embedded viewer. Supported URL forms are HTTP(S), Blob, relative URLs and kind-appropriate data URLs.

For reactive object resources, materialize descriptors in view data and use a string-path alias. A computed object prop supplied through `jaml.var` can currently reach descendants as its raw binder.
