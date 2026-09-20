# layer.ribbon

`Styles.layer.ribbon.*` — corner ribbon decorations and tooltip triggers.

---

## Variants

### `ribbon`
Corner ribbon element. Displays a ribbon with content in the corner of an element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `content` | `string \| function \| any` | Ribbon content | Default: jam logo |
| `top` | `number \| string` | Top offset | Calculated from `radius` if not set |
| `right` | `number \| string` | Right offset | — |
| `radius` | `number \| string` | Border radius for the ribbon | — |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Featured",
        "styles": ["layer.ribbon(content:NEW;radius:0.5rem;top:0.5rem)"]
    }
]
```

### `ribbon.tiptrigger`
Ribbon used as a tooltip trigger (used by the `jam-tip` plugin). Same args as `ribbon` plus a `tip` property.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `content` | `string \| function \| any` | Ribbon content | Default: `'<div class="jam-layer-tiptrigger-i">i</div>'` |
| `tip` | `string` | Tooltip text | Default: `''` |
| `top` | `number \| string` | Top offset | — |
| `right` | `number \| string` | Right offset | — |
| `radius` | `number \| string` | Border radius | — |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Hover for info",
        "styles": ["layer.ribbon.tiptrigger(tip:This is a helpful tip;radius:0.5rem)"]
    }
]
```

### `ribbon.bookmark`
Bookmark-shaped ribbon with configurable style. Supports fishtail, pendant, flat, and slanted shapes.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `style` | `string` | Bookmark shape style | Options: `'fishtail'`, `'pendant'`, `'flat'`, `'slanted'`. Default: `'fishtail'`. Shorthand |
| `content` | `string \| function \| any` | Ribbon content | Default: jam logo |
| `indent` | `number \| string` | Indent depth for the cut | Unit: rem |
| `background` | `string` | Background color/gradient | Default: accent + gradient overlay |
| `top` | `number \| string` | Top offset | — |
| `right` | `number \| string` | Right offset | — |
| `width` | `string` | Bookmark width | — |
| `height` | `string` | Bookmark height | — |
| `size` | `string` | Shorthand for both width and height | — |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Fishtail",
        "styles": ["layer.ribbon.bookmark(style:fishtail;content:HOT;indent:20%)"]
    },
    {
        "type": "card",
        "cap": "Slanted",
        "styles": ["layer.ribbon.bookmark(style:slanted;content:SALE;background:gold)"]
    },
    {
        "type": "card",
        "cap": "Pendant",
        "styles": ["layer.ribbon.bookmark(style:pendant;content:TOP;indent:25%)"]
    }
]
```
