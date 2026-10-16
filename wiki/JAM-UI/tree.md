# tree

**Class:** `TamarilloTree` · **Type:** `"tree"` · **Extends:** `TomatoTable`

A tree view element for hierarchical data display. Supports nested options with expand/collapse nodes. Accepts data in the standard `ElementOption[]` format where options can contain a `children` array for nesting.

Tree uses the table rendering, selection, filtering, and row-detail APIs with a hidden header and one visible node column. Nodes start collapsed; use the arrow to expand children. `tree-radio` selects one node and `tree-checkbox` selects multiple nodes.

---

## JAML usage

```json jaml-playground
{
    "type": "tree",
    "cap": "File Browser",
    "data": [
        {
            "name": "Root",
            "value": "root",
            "children": [
                { "name": "Child A", "value": "a" },
                { "name": "Child B", "value": "b" }
            ]
        }
    ]
}
```

---

## Params

Inherits [table params and row methods](./table.md).

| Param         | Type                | Description                                                           | Notes                                                                                         |
| ------------- | ------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `nodeDef`     | `Partial<ThOption>` | Visible node-column definition, including cell styles and `ontdbuild` | Default: `{}`. Built-in arrow and checkbox controls are retained.                             |
| `click2Check` | `boolean`           | Select a node by clicking its row                                     | Default: `true`                                                                               |
| `data`        | `object[]`          | Nested nodes with `children` arrays                                   | `name` falls back to `cap`; `id` defaults to the node's index path; `value` defaults to `id`. |

The updated development runtime also supports:

| Param                | Type                                              | Default | Contract                                                         |
| -------------------- | ------------------------------------------------- | ------- | ---------------------------------------------------------------- |
| `keyboardNavigation` | `boolean`                                         | `false` | Opt into native row keyboard navigation.                         |
| `checkParents`       | `boolean`                                         | `true`  | Allow ordinary selection toggles on nodes with children.         |
| `allowUncheck`       | `boolean`                                         | `true`  | Allow an ordinary toggle to clear a checked node.                |
| `toggleIcons`        | `{ collapsed: string, expanded: string } \| null` | `null`  | Override the native disclosure icons; null retains the defaults. |

With keyboard navigation enabled, Up/Down and Home/End move through visible rows; Right expands or enters children, and Left collapses or moves to the parent. Enter/Space follows the row’s selection action. Modified, composing, handled, disabled and read-only interactions retain their normal boundaries. The selection restrictions govern ordinary toggles; explicit force arguments and value writes remain authoritative. This does not establish a complete checkbox accessibility contract. Verify keyboard behavior against the target runtime before relying on this opt-in capability.

Supply stable, unique `id` values when data can be reordered. Initial node `checked` values seed selection when no value has been set. Selection applies to individual nodes; checking a parent does not automatically check its descendants.

---

## Slots

| Slot              | Description                           |
| ----------------- | ------------------------------------- |
| `tbody` (default) | Generated node cells and row details. |
| `thead`           | Hidden table header.                  |
| `tneck` / `tfoot` | Inherited table slots.                |

---

## Examples

### Basic hierarchical tree

```json jaml-playground
{
    "type": "tree",
    "cap": "Documents",
    "data": [
        {
            "name": "Documents",
            "value": "docs",
            "children": [
                {
                    "name": "Work",
                    "value": "work",
                    "children": [
                        { "name": "Report.pdf", "value": "report" },
                        { "name": "Notes.txt", "value": "notes" }
                    ]
                },
                { "name": "Personal", "value": "personal" }
            ]
        }
    ]
}
```

### Tree with checkbox selection mode

```json jaml-playground
{
    "type": "tree-checkbox",
    "cap": "Permissions",
    "data": [
        {
            "name": "User Management",
            "value": "users",
            "children": [
                { "name": "Create Users", "value": "create", "checked": true },
                { "name": "Edit Users", "value": "edit" },
                { "name": "Delete Users", "value": "delete" }
            ]
        }
    ]
}
```

### Styled nodes

```json jaml-playground
{
    "type": "tree",
    "styles": ["tree.gridline", "tree.hoverhighlight"],
    "nodeDef": { "styles": ["css(font-weight:600)"] },
    "data": [
        {
            "id": "devices",
            "name": "Devices",
            "children": [
                { "id": "meter", "name": "Meter" },
                { "id": "sensor", "name": "Sensor" }
            ]
        }
    ]
}
```

### Using with value binding

```json jaml-playground
{
    "type": "tree-radio",
    "cap": "Select Category",
    "data": [
        { "name": "Technology", "value": "tech" },
        { "name": "Science", "value": "science" }
    ],
    "defaultValue": "tech"
}
```

---

## Notes

Use `hasRowChildren(pKey)`, `getRowLevel(pKey)`, `isRowChildrenExpanded(pKey)`, and `toggleRowChildren(pKey, force?)` to inspect or change expansion. The inherited `rowchildrenchange` event reports `{ pKey, expanded }`. Active filters reveal matching descendants and hold expansion until filtering ends.

See [tree styles](../Styles/tree-style.md) and [table row details](./table.md#row-details-and-nested-rows).

### Clearing tree data

Trees inherit the table structural `clear(theadOnly?)` operation: it clears rows, data, headers, expansion, filters and sort state even with `clearable: false`. Passing `true` retains only `tneck` and `tfoot` slot contents; it does not preserve tree nodes. See [table methods](table.md#data--display).
