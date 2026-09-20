# SantolSortable — Child Sorting Plugin

Use [`interact.sortable`](../Styles/interact.md#interactsortable) to reorder direct children or transfer them between containers with the same group. It can be combined with `animation.flipchild` for layout transitions.

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["interact.sortable(placement:deferred)"],
  "components": [
    { "type": "label", "cap": "First" },
    { "type": "label", "cap": "Second" },
    { "type": "label", "cap": "Third" }
  ]
}
```

## Direct API

`new SantolSortable(target, option?)` attaches sorting immediately. It must own the container's movement handler; do not attach another Damson movement handler to the same container. Creating a new sortable for the same target destroys its previous controller. Call `destroy()` to cancel an active drag and release observers and event listeners.

`SortableOption` uses the same selector, group, placement, handle, avoid, overlap, scroll, scrollMargin, scrollSpeed, and change options as the style. `change` receives a `SortableChange` with the moved `item`, `from` and `to` containers, `oldIndex` and `newIndex`, and the resulting `fromItems` and `toItems` arrays. Persist data changes in this callback; DOM sorting does not rewrite JAML data.
