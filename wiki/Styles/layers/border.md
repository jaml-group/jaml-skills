# layer.border

`Styles.layer.border` — border layer with common border options.

Wraps `common/border` options in a layer context. Supports per-side width, style, color, border-radius per corner, and border-image properties.

---

## Args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Border width | CSS `borderWidth` |
| `topWidth` | `string` | Top border width | CSS `borderTopWidth` |
| `rightWidth` | `string` | Right border width | CSS `borderRightWidth` |
| `bottomWidth` | `string` | Bottom border width | CSS `borderBottomWidth` |
| `leftWidth` | `string` | Left border width | CSS `borderLeftWidth` |
| `style` | `string` | Border style | Options: `'none'`, `'solid'`, `'dashed'`, `'dotted'`, `'double'`, `'groove'`, `'ridge'`, `'inset'`, `'outset'` |
| `topStyle` | `string` | Top border style | Same options as `style` |
| `rightStyle` | `string` | Right border style | Same options as `style` |
| `bottomStyle` | `string` | Bottom border style | Same options as `style` |
| `leftStyle` | `string` | Left border style | Same options as `style` |
| `radius` | `string` | Border radius | CSS `borderRadius` |
| `topLeftRadius` | `string` | Top-left radius | CSS `borderTopLeftRadius` |
| `topRightRadius` | `string` | Top-right radius | CSS `borderTopRightRadius` |
| `bottomRightRadius` | `string` | Bottom-right radius | CSS `borderBottomRightRadius` |
| `bottomLeftRadius` | `string` | Bottom-left radius | CSS `borderBottomLeftRadius` |
| `color` | `string` | Border color | CSS `borderColor` |
| `topColor` | `string` | Top border color | CSS `borderTopColor` |
| `rightColor` | `string` | Right border color | CSS `borderRightColor` |
| `bottomColor` | `string` | Bottom border color | CSS `borderBottomColor` |
| `leftColor` | `string` | Left border color | CSS `borderLeftColor` |
| `border` | `string` | Shorthand border value | CSS `border`. Shorthand arg |
| `image` | `string` | Border image | — |
| `imageSource` | `string` | Border image source | CSS `borderImageSource` |
| `imageSlice` | `string` | Border image slice | CSS `borderImageSlice` |
| `imageWidth` | `string` | Border image width | CSS `borderImageWidth` |
| `imageOutset` | `string` | Border image outset | CSS `borderImageOutset` |
| `imageRepeat` | `string` | Border image repeat | CSS `borderImageRepeat` |

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
