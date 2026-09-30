# layer.follower

<!-- Generated from native authoring; do not edit. -->

[中文](follower.zh.md)

Load framework layer styles and give the host usable geometry. Enable follow explicitly when pointer tracking is required.

Choose spotlight for a glow, edge for a rim, or shadow for an offset shadow. Use layer.crosshair when the decoration should stay anchored to the host.

Movement is driven by document mouse events, not selection state or a complete touch/keyboard interaction. Containment, clipping and stacking affect the visible result.

`Styles.layer.follower.*` provides decorative layers with optional pointer following. Enable `follow: true` for pointer tracking; read the entry below for behavior and limitations. Compare [selection, hover and host decoration](../../choosing-native-capabilities.md#selection-and-hover) before choosing this family.

---

## Common args

<a id="common-args-layer-follower-spotlight"></a>

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `zIndex` | `number` | `0` | Layer order |
| `dropShadow` | `boolean` | `false` | Drop shadow |
| `boxShadow` | `string` | Not supplied | Shadow |
| `mask` | `string` | Not supplied | Mask |
| `filter` | `string` | Not supplied | Filter |
| `padding` | `string` | Not supplied | Padding |
| `borderRadius` | `string` | Not supplied | Corner radius |
| `transform` | `string` | Not supplied | Transform |
| `border` | `string` | Not supplied | Border |
| `clipPath` | `string` | Not supplied | Clipping |
| `animation` | `string` | Not supplied | Animation |
| `opacity` | `number` | `0.25` | Opacity<br>Editor hints (not runtime limits): `{"step":0.1}` |
| `css` | `dictionaryOrString` | Not supplied | CSS |
| `depth` | `number` | Not supplied | Perspective depth |
| `class` | `string` | Not supplied | Class |
| `attrs` | `dictionary` | Not supplied | Properties |
| `rotateX` | `number` | Not supplied | X-axis rotation |
| `rotateY` | `number` | Not supplied | Y-axis rotation |
| `translateY` | `numberOrString` | Not supplied | Y-axis translation |
| `slot` | `string` | Not supplied | Slot |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` | Entry animation |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` | Exit animation |
| `contain` | `boolean` | `false` | Keep within the container |
| `offset` | `numberOrString` | `0` | Offset<br>Unit: `rem` |
| `size` | `numberOrString` | `20` | Size<br>Unit: `rem` |
| `duration` | `numberOrString` | `0` | Animation duration<br>Unit: `ms` |
| `reverse` | `boolean` | `false` | Reverse |
| `speed` | `number` | `1` | Speed multiplier |
| `follow` | `boolean` | `false` | Follow |
| `position` | `string` | `top-left` | Position |

All follower variants share these base args:

---

## Variants

### `follower.spotlight`

<a id="entry-layer-follower-spotlight"></a>

Spotlight

Use a spotlight glow as optional decorative pointer feedback.

Creates a decorative layer. Pointer movement updates it only when follow is true; otherwise its configured position remains in use.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position`.

Common arguments: [layer.follower.spotlight](#common-args-layer-follower-spotlight).

A spotlight/glow effect that follows the cursor inside the host.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Spotlight',
        styles: ['layer.follower.spotlight(follow:true;size:30)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `follower.edge`

<a id="entry-layer-follower-edge"></a>

Glowing edge

Use a glowing edge as optional decorative pointer feedback.

Creates a decorative layer. Pointer movement updates it only when follow is true; otherwise its configured position remains in use.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position` → `width` → `radius`.

Common arguments: [layer.follower.spotlight](#common-args-layer-follower-spotlight).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `opacity` | `number` | Not supplied | Opacity<br>Editor hints (not runtime limits): `{"step":0.1}` |
| `size` | `numberOrString` | `50%` | Size<br>Unit: `rem` |
| `width` | `numberOrString` | `0.25` | Width<br>Unit: `rem` |
| `radius` | `numberOrString` | `0.25` | Corner radius<br>Unit: `rem` |

A glowing edge/rim effect that follows the cursor. The inner element fills a percentage of the host.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Golden Edge',
        styles: ['layer.follower.edge(follow:true)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `follower.shadow`

<a id="entry-layer-follower-shadow"></a>

Shadow

Use a cursor-reactive shadow as optional decorative pointer feedback.

Creates a decorative layer. Pointer movement updates it only when follow is true; otherwise its configured position remains in use.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position` → `color` → `offsetX` → `offsetY` → `blur`.

Common arguments: [layer.follower.spotlight](#common-args-layer-follower-spotlight).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `zIndex` | `number` | `-1` | Layer order |
| `opacity` | `number` | Not supplied | Opacity<br>Editor hints (not runtime limits): `{"step":0.1}` |
| `reverse` | `boolean` | `true` | Reverse |
| `speed` | `number` | `0.05` | Speed multiplier |
| `color` | `string` | `hsla(0, 0%, 0%, 0.2)` | Color |
| `offsetX` | `numberOrString` | `0` | X offset<br>Unit: `rem` |
| `offsetY` | `numberOrString` | `0.5` | Y offset<br>Unit: `rem` |
| `blur` | `numberOrString` | `2` | Blur<br>Unit: `px` |

A cursor-reactive shadow that shifts opposite to the cursor direction.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Shadow',
        styles: ['layer.follower.shadow(follow:true)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```
