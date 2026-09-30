# common.outline

<!-- Generated from native authoring; do not edit. -->

[中文](outline.zh.md)

`Styles.outline.*` — outline sub-properties.

---

## Variants

### `outline`

<a id="entry-outline"></a>

Outline

Add or adjust an outline around a target.

Sets outline width, style, color, offset, or shorthand.

Choose an outline for an external emphasis ring; supply a visible style as well as width or color.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `width` → `style` → `color` → `offset` → `outline`.

| Argument | Type | Contract |
| --- | --- | --- |
| `width` | `string` | Outline width<br>`{"cssKey":"outlineWidth"}` |
| `style` | `string` | Outline style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"outlineStyle"}` |
| `color` | `string` | Outline color<br>`{"cssKey":"outlineColor"}` |
| `offset` | `string` | Outline offset<br>`{"cssKey":"outlineOffset"}` |
| `outline` | `string` | Outline<br>Shorthand |

Applies outline width, style, color, and offset to an element.

The outline shorthand overrides its individual fields.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Focused',
        styles: ['outline(width:2px;style:solid;color:var(--jam-ac-color))']
    }
];
```
