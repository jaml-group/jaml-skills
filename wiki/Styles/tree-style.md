# tree styles

`Styles.tree.*` styles the [tree element](../JAM-UI/tree.md). Trees use the table theme tokens and hide the table header by default.

## Variants

| Style | Description |
|---|---|
| `tree.stretchrow` | Stretch node rows |
| `tree.stripy` | Alternating node backgrounds |
| `tree.gridline` | Grid lines and outline |
| `tree.bento` | Spaced rounded rows |
| `tree.fixednodeheight` | Fixed-height node rows with virtual scrolling |
| `tree.hovermarker` | Hover outline |
| `tree.hoverhighlight` | Hover background |
| `tree.td.*` / `tree.tdslot.*` | Node-cell and body-slot styles |

These variants share arguments with their [table equivalents](./table-style.md); `fixednodeheight` corresponds to `table.fixedrowheight`.

```json jaml-playground
{
  "type": "tree-checkbox",
  "styles": ["tree.stripy", "tree.gridline", "tree.fixednodeheight(height:2.5rem)"],
  "data": [{ "id": "plant", "name": "Plant", "children": [
    { "id": "pump", "name": "Pump" },
    { "id": "valve", "name": "Valve" }
  ] }]
}
```
