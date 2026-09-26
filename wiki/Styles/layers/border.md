# layer.border

`Styles.layer.border` — border layer with common border options.

Wraps `common/border` options in a layer context. Supports per-side width, style, color, border-radius per corner, and border-image properties.

---

## Args

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.border`.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.border(width:0.125rem;color:var(--jam-ac-color);style:solid)"],
        "components": [{ "type": "label", "cap": "Accent border" }]
    },
    {
        "type": "card",
        "styles": ["layer.border(width:2px;style:dashed;color:gray;radius:0.5rem)"],
        "components": [{ "type": "label", "cap": "Dashed rounded" }]
    },
    {
        "type": "card",
        "styles": ["layer.border(topWidth:3px;topColor:red;bottomWidth:3px;bottomColor:blue)"],
        "components": [{ "type": "label", "cap": "Top & bottom only" }]
    }
]
```
