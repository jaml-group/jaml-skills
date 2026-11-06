# Retained tabs

Use `jaml.tabs(items, options?, jamlOverride?)` for a tabbed workspace whose panels retain component identity, local input and scroll state when switching. It returns a component definition; the caller mounts it through normal JAML composition. This builder requires a development runtime with native tabs support; check the installed runtime before using it in an older application.

Choose `buttongroup-radio` for selecting a value without managing tab panels. Choose [a drawer or foldable layout](drawer-and-previewer.md#choose-the-folding-owner) for changing the visibility or size of an outer region. Tabs own their tab/panel relationships, keyboard navigation and retained panel lifetime; the application still owns destinations, resource identity, persistence and close authorization. Tabs do not supply an outer drawer, modal or background focus trap.

## Compose a workspace

```javascript jaml-playground
let view;
let items = [
    { id: 'overview', label: 'Overview', content: { type: 'label', cap: 'Workspace overview' } },
    { id: 'draft', label: 'Draft', closable: true, content: { type: 'input', value: 'Keep this draft while switching tabs' } }
];

export default jaml.tabs(
    items,
    {
        label: 'Workspace destinations',
        onReady(handle) {
            view = handle;
        },
        onClose(id) {
            items = items.filter((item) => item.id !== id);
            view.update(items);
        }
    },
    { style: { height: '20rem' } }
);
```

Provide a bounded height when panels should scroll inside a workspace. Keep that structural flex/grid sizing in place while an enclosing inspector is hidden or folding; removing its constraints can expand a retained editor to its full content height and clamp its scroll position. Use the final override for root sizing, attributes and caller hooks, following the [builder override contract](component.md#final-jaml-overrides). Do not replace the generated tab strip or panel children. Do not add a negative `tabindex` to the root: on a custom shadow host it can prevent sequential keyboard access to its descendants.

## Items and options

| Item field | Contract                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `id`       | Required unique nonempty string within this owner. It is an opaque application identity, not a DOM ID or binding expression. |
| `label`    | Required literal tab caption. Long captions ellipsize within the strip; the close control keeps its space.                   |
| `title`    | Optional literal hover title, defaulting to `label`. Supply full path context when the visible label is shortened.           |
| `icon`     | Optional native icon name.                                                                                                   |
| `content`  | Required ordinary component definition, not a factory. Captured when the ID is first introduced.                             |
| `closable` | Optional boolean, default false. Enables the native close control and Delete-key request.                                    |
| `disabled` | Optional boolean, default false. Excludes the tab from selection and keyboard navigation.                                    |

Options are `value?: string`, `label?: string`, `onSelect?(id)`, `onClose?(id)` and `onReady?(view)`. `value` chooses the initial eligible tab; otherwise the first eligible tab is selected. `label` supplies the tablist accessible name, defaulting to `Tabs`. `onSelect` reports later selection changes, with `undefined` when no eligible tab remains. Initialize application state from `view.value` in `onReady` if needed; do not depend on an initial selection callback.

`onClose(id)` is only a request. Removing an item through `view.update` accepts the close; leaving the list unchanged keeps the pane. The callback may run application confirmation logic before updating. The native close accessible name combines the translated Close label and literal item label; metadata projection refreshes it after a locale change.

## Update and retain

The `onReady` handle exposes:

| Member                     | Behavior                                                                                             |
| -------------------------- | ---------------------------------------------------------------------------------------------------- |
| `value`                    | Read-only selected ID, or `undefined`.                                                               |
| `update(items, activeId?)` | Projects the full destination list and metadata. A valid enabled `activeId` wins.                    |
| `select(id)`               | Selects an existing enabled destination; returns whether selection succeeds.                         |
| `destroy()`                | Disposes the tab owner and its panel content. Normal component destruction already performs cleanup. |

Content builds lazily on first selection and remains hidden/inert while inactive. Metadata updates and reordering retain the same pane. Replacing `content` under an existing ID does not replace its captured definition: use a new ID, or remove then re-add the ID, for a new content/resource lifetime. A failed first build leaves a working pane selected and permits retry.

Removing an inactive tab preserves selection. Removing the active tab prefers its previous enabled neighbor, then the next; an explicit eligible `activeId` overrides that fallback. Removal destroys the pane. Closing and reopening a file should create a fresh occurrence identity when it needs a fresh resource session. Persist the application destination list and selected ID explicitly if they should survive reloads; tabs do not save them automatically.

## Keyboard and focus

Left/Right and Home/End move focus without activating a pane; Enter/Space activate it. Disabled tabs are skipped and Left/Right respect RTL. Sequential Tab enters the selected tab. Delete requests closing the focused closable tab. The sibling close control is not nested inside the tab and does not add another sequential tab stop.

Reordering and metadata updates retain focus. Removing a focused pane/tab moves focus to its fallback tab, or the empty workspace. Updates do not move focus from outside the workspace. Keyboard navigation scrolls the tab strip to reveal the focused item and its close control without scrolling the document.

## Preview inside a tab

Use [`jaml.previewer` with `presentation: 'inline'`](drawer-and-previewer.md#inline-previews) as the tab's `content`. An inactive retained tab keeps its preview session and pending reads. Removing the tab destroys the preview and aborts pending resolution; late results release their resources. Expanded/modal preview remains a separate caller-owned presentation and session. Do not use fullscreen preview defaults for an embedded panel or add application CSS to undo modal positioning.
