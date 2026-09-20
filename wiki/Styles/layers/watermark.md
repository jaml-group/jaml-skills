# layer.watermark

`Styles.layer.watermark.*` — watermark and icon overlay layer effects.

---

## Variants

### `watermark`
Text watermark overlay. Renders translucent text over the element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `text` | `string \| function` | Watermark text content | Default: `'watermark'`. Shorthand arg |
| `color` | `string` | Text color | Default: `ac(1, 0.15, lumiO(5))` |
| `font` | `string` | Font family | — |
| `size` | `string` | Font size | — |
| `weight` | `string` | Font weight | Options: `'normal'`, `'bold'` |
| `style` | `Dictionary` | CSS declarations for the watermark text span | For example `{ transform: "rotate(-15deg)" }` in JavaScript |
| `decoration` | `string` | Text decoration | Options: `'none'`, `'underline'` |
| `spacing` | `string` | Letter spacing | — |
| `shadow` | `string` | Text shadow | — |
| `align` | `string` | Text alignment | Options: `'left'`, `'center'`, `'right'` |
| `opacity` | `number` | Layer opacity | — |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.watermark(text:CONFIDENTIAL;size:1.5rem;weight:bold)"],
        "components": [{ "type": "label", "cap": "Confidential document" }]
    },
    {
        "type": "card",
        "styles": ["layer.watermark(text:DRAFT;color:hsl(0 75% 45%);size:2rem)"],
        "components": [{ "type": "label", "cap": "Draft version" }]
    }
]
```

### `watermark.icon`
Icon/emoji watermark with gradient and inversion options. Copies the host element's `icon` slot into a decorative layer; set the host `icon` param to an icon name or emoji.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `style` | `string` | Font Awesome style | Options: `'fas'`, `'far'`, `'fad'`, `'fal'`. Default: `'fas'` |
| `size` | `string` | Icon size | Default: `'6em'` |
| `bottom` | `number \| string` | Bottom offset | — |
| `right` | `number \| string` | Right offset | — |
| `invert` | `boolean` | Invert for dark mode | Default: auto-detected |
| `gradient` | `boolean \| string` | Apply gradient to icon | Pass a string for custom gradient |

```json jaml-playground
[
    {
        "type": "card",
        "icon": "🔒",
        "styles": ["layer.watermark.icon(size:4em;bottom:1rem;right:1rem)"],
        "components": [
            { "type": "label", "cap": "Secure content" }
        ]
    },
    {
        "type": "card",
        "icon": "⭐",
        "styles": ["layer.watermark.icon(gradient:true;size:5em)"],
        "components": [
            { "type": "label", "cap": "Featured" }
        ]
    }
]
```
