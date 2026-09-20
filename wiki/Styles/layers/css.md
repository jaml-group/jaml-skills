# layer.css

`Styles.layer.css` — arbitrary CSS layer. Wraps `common/css` options in a layer context.

Supports applying any CSS properties as a positioned layer. Use for custom backgrounds, borders, masks, or any CSS styling.

---

## Args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `cssText` | `string \| function` | CSS content as string or function returning style dict/string | Shorthand arg |
| `selector` | `string` | CSS selector applied to the layer | Auto-generated from path if not set |
| `method` | `string` | Application method | Options: `'vars'`, `'rule'`, `'props'` |
| `direct` | `boolean` | Apply only to direct children (default: all descendants) | — |

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
