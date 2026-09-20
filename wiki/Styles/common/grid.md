# common.grid

`Styles.grid.*` — CSS grid container properties.

---

## Variants

### `grid`

Sets CSS grid layout properties on a container element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `templateColumns` | `string` | Column track sizes | e.g. `1fr 1fr 1fr` |
| `templateRows` | `string` | Row track sizes | — |
| `autoColumns` | `string` | Auto column size | — |
| `autoRows` | `string` | Auto row size | — |
| `templateAreas` | `string` | Named grid areas | — |
| `area` | `string` | Grid area for a child item | CSS `grid-area` with variable fallback |
| `gap` | `string` | Gap between grid cells | e.g. `1rem` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["grid(templateColumns:1fr 1fr 1fr;gap:1rem)"],
        "components": [
            { "type": "label", "cap": "A" },
            { "type": "label", "cap": "B" },
            { "type": "label", "cap": "C" }
        ]
    }
]
```

### `grid.area`

Explicit grid placement for an item using row and column start/span.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `rowStart` | `number` | Grid row start line | — |
| `colStart` | `number` | Grid column start line | — |
| `rowSpan` | `number` | Number of rows to span | — |
| `colSpan` | `number` | Number of columns to span | — |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Grid item",
        "styles": ["grid.area(rowStart:1;colStart:2;rowSpan:1;colSpan:2)"]
    }
]
```
