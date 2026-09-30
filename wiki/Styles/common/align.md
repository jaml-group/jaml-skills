# common.align

<!-- Generated from native authoring; do not edit. -->

[中文](align.zh.md)

`Styles.align.*` — flexbox alignment for individual children.

---

## Variants

### `align`

<a id="entry-align"></a>

Alignment

Align items or content within an existing layout.

The align shorthand expands horizontal and vertical words into justify and align properties; explicit individual properties take precedence. A missing vertical word defaults to center.

The target must participate in a layout where the selected alignment property has an effect.

This helper does not establish grid or flex display, and main/cross-axis interpretation still follows the layout.

Positional order: `alignSelf` → `alignItems` → `alignContent` → `justifySelf` → `justifyItems` → `justifyContent` → `align`.

| Argument | Type | Contract |
| --- | --- | --- |
| `alignSelf` | `string` | Self alignment on the cross axis<br>align-self overrides align-items for an individual item. In Grid, it aligns the item within its grid area; in Flexbox, it aligns the item on the cross axis, perpendicular to the flex direction.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"alignSelf"}` |
| `alignItems` | `string` | Child alignment on the cross axis<br>align-items sets the default align-self for direct children as a group. In Flexbox, it controls cross-axis alignment; in Grid, it controls block-axis alignment within each grid area.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"alignItems"}` |
| `alignContent` | `string` | Content distribution (align-content)<br>align-content distributes space between and around flex lines on the cross axis, or grid tracks on the block axis.<br>Options: `flex-start` — Start, `center` — Center, `flex-end` — End, `space-between` — Space between, `space-around` — Space around, `space-evenly` — Space evenly<br>`{"cssKey":"alignContent"}` |
| `justifySelf` | `string` | Self alignment on the main axis<br>justify-self aligns an individual box on the appropriate axis within its layout container.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"justifySelf"}` |
| `justifyItems` | `string` | Child alignment on the main axis<br>justify-items sets the default justify-self for items, aligning them on the appropriate axis within their boxes.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"justifyItems"}` |
| `justifyContent` | `string` | Main-axis content distribution<br>justify-content distributes space between and around items on a flex container's main axis or a grid container's inline axis.<br>Options: `flex-start` — Start, `center` — Center, `flex-end` — End, `space-between` — Space between, `space-around` — Space around, `space-evenly` — Space evenly<br>`{"cssKey":"justifyContent"}` |
| `align` | `string` | Alignment<br>align is shorthand for setting align-items and align-content together.<br>Shorthand<br>Options: `left-top` — Top left, `center-top` — Top center, `right-top` — Top right, `left-middle` — Middle left, `center-middle` — Center, `right-middle` — Middle right, `left-bottom` — Bottom left, `center-bottom` — Bottom center, `right-bottom` — Bottom right, `around-top` — Space around, top, `around-middle` — Space around, middle, `around-bottom` — Space around, bottom, `evenly-top` — Space evenly, top, `evenly-middle` — Space evenly, middle, `evenly-bottom` — Space evenly, bottom, `between-top` — Space between, top, `between-middle` — Space between, middle, `between-bottom` — Space between, bottom |

Sets alignment properties for flex/grid children.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Centered',
        styles: ['align(alignSelf:center)']
    }
];
```
