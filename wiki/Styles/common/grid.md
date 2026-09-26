# common.grid

`Styles.grid.*` — CSS grid container properties.

---

## Variants

### `grid`

Sets CSS grid layout properties on a container element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style grid`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style grid.area`.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Grid item",
        "styles": ["grid.area(rowStart:1;colStart:2;rowSpan:1;colSpan:2)"]
    }
]
```
