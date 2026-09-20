# common.outline

`Styles.outline.*` — outline sub-properties.

---

## Variants

### `outline`

Applies outline width, style, color, and offset to an element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Outline width CSS value | e.g. `2px` |
| `style` | `string` | Outline style | `none`, `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset` |
| `color` | `string` | Outline color | Any CSS color value |
| `offset` | `string` | Outline offset from element edge | e.g. `2px` |
| `outline` | `string` | Shorthand for all outline properties | Overrides individual values |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Focused",
        "styles": ["outline(width:2px;style:solid;color:var(--jam-ac-color))"]
    }
]
```
