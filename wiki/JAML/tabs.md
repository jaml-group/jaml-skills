# Retained tabs

Use `jaml.tabs(items, options?, jamlOverride?)` for a tabbed workspace whose panels retain component identity, local input and scroll state when switching. It returns a component definition; the caller mounts it through normal JAML composition. This builder requires a development runtime with native tabs support; check the installed runtime before using it in an older application.

Choose `buttongroup-radio` for selecting a value without managing tab panels. Choose [a drawer or foldable layout](drawer-and-previewer.md#choose-the-folding-owner) for changing the visibility or size of an outer region. Tabs own selection, keyboard navigation, user-initiated removal and retained panel lifetime. The application owns its destination identities and persistence. Tabs do not supply an outer drawer, modal or background focus trap.

## Compose a workspace

```javascript jaml-playground
const items = [
    { id: 'overview', label: 'Overview', content: { type: 'label', cap: 'Workspace overview' } },
    { id: 'draft', label: 'Draft', closable: true, content: { type: 'input', value: 'Keep this draft while switching tabs' } }
];

export default jaml.tabs(
    items,
    {
        label: 'Workspace destinations'
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
| `closable` | Optional boolean, default false. Enables the native close control and Delete-key close.                                      |
| `disabled` | Optional boolean, default false. Excludes the tab from selection and keyboard navigation.                                    |

Options are `value?: string`, `label?: string`, `onSelect?(id)`, `onClose?(id)` and `onReady?(view)`. `value` chooses the initial eligible tab; otherwise the first eligible tab is selected. `label` supplies the tablist accessible name, defaulting to `Tabs`. `onSelect` reports later selection changes, with `undefined` when no eligible tab remains. Initialize application state from `view.value` in `onReady` if needed; do not depend on an initial selection callback.

Clicking the X or pressing Delete on a closable tab removes it and destroys its panel. Optional `onClose(id)` runs after removal and before `onSelect` reports a fallback selection. Use it to mirror the closed ID in application state. If the application later calls `view.update` with a full destination list, omit the closed ID unless you intend to reopen it. The native close accessible name combines the translated Close label and literal item label; metadata projection refreshes it after a locale change.

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

Left/Right and Home/End move focus without activating a pane; Enter/Space activate it. Disabled tabs are skipped and Left/Right respect RTL. Sequential Tab enters the selected tab. Delete closes the focused closable tab. The tab button owns the named X in its extra slot. The X stays out of the Tab sequence, and hover, selection and keyboard focus cover the whole tab.

Reordering and metadata updates retain focus. Removing a focused pane/tab moves focus to its fallback tab, or the empty workspace. Updates do not move focus from outside the workspace. Keyboard navigation scrolls the tab strip to reveal the focused item and its close control without scrolling the document.

### Verify a closable tab

Run the workspace example above and select Draft. The native tab button uses [`interact.closable`](../Styles/interact.md#entry-interact-closable) to place the X in its own `extra` slot. Tabs handles removal and panel cleanup.

1. Hover Draft to reveal the X. Move the pointer from the label onto the X and check that the highlight spans the whole tab. With the pointer away, check that selected paint spans it too. Focus Draft with the keyboard and check that the ring encloses the label and X.
2. Inspect the browser’s **Accessibility** tree while the X is visible. Check for a tab named **Draft** and a button named **Close Draft**. Chromium exposes both roles and names in this composition.
3. From the focused tab, press Tab to move into the selected panel. The X uses `tabindex="-1"`, so it stays out of the sequential Tab order. Return focus to Draft and press Delete. Draft and its panel should disappear, and focus should move to Overview. Reopen the example and click the X to exercise the same close by pointer.

## Preview inside a tab

Use [`jaml.previewer` with `presentation: 'inline'`](drawer-and-previewer.md#inline-previews) as the tab's `content`. An inactive retained tab keeps its preview session and pending reads. Removing the tab destroys the preview and aborts pending resolution; late results release their resources. Expanded/modal preview remains a separate caller-owned presentation and session. Do not use fullscreen preview defaults for an embedded panel or add application CSS to undo modal positioning.
