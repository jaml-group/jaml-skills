# layer.css

`Styles.layer.css` — arbitrary CSS layer. Wraps `common/css` options in a layer context.

Applies CSS to a generated child. The style does not supply full-size geometry: position the host, then give the child its own position and bounds. Use for custom backgrounds, borders, masks, or other CSS decoration.

---

## Args

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.css`.

All CSS properties are also accepted as individual args (background, color, margin, padding, etc.).

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["css(position:relative)", "layer.css(position:absolute;inset:0;display:block;pointer-events:none;background:linear-gradient(45deg,hsl(0 100% 50%),hsl(240 100% 50%));opacity:0.5)"],
        "components": [{ "type": "label", "cap": "Gradient overlay" }]
    },
    {
        "type": "card",
        "styles": ["css(position:relative)", "layer.css(position:absolute;inset:0;display:block;pointer-events:none;background:hsl(0 0% 0% / 0.2);backdropFilter:blur(5px);borderRadius:inherit)"],
        "components": [{ "type": "label", "cap": "Blur overlay" }]
    }
]
```
