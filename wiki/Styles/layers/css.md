# layer.css

`Styles.layer.css` — arbitrary CSS layer. Wraps `common/css` options in a layer context.

Supports applying any CSS properties as a positioned layer. Use for custom backgrounds, borders, masks, or any CSS styling.

---

## Args

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.css`.

All CSS properties are also accepted as individual args (background, color, margin, padding, etc.).

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.css(background:linear-gradient(45deg,red,blue);opacity:0.5)"],
        "components": [{ "type": "label", "cap": "Gradient overlay" }]
    },
    {
        "type": "card",
        "styles": ["layer.css(background:hsla(0,0%,0%,0.2);backdropFilter:blur(5px);borderRadius:inherit)"],
        "components": [{ "type": "label", "cap": "Blur overlay" }]
    }
]
```
