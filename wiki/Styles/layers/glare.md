# layer.glare

<!-- Generated from native authoring; do not edit. -->

[中文](glare.zh.md)

`Styles.layer.glare.*` — light glare and reflection layer effects.

---

## Variants

### `glare.spot`

<a id="entry-layer-glare-spot"></a>

Light spot

Spot

Add a soft reflected spotlight.

Uses an elliptical radial highlight, with top/bottom placement and depth-controlled parallax translation.

Load framework layer styles and give the host measurable geometry. Pointer-responsive glare requires a parallax behavior that updates the host bias and glare variables.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Combine the glare with the host surface and parallax behavior; the glare style supplies decoration while parallax owns pointer movement.

The glare layer does not install pointer tracking itself. Its host marker clips overflow, so account for content or ornaments that extend beyond the host.

Positional order: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `numberOrString` | Not supplied | size |
| `position` | `string` | `top` | position<br>Options: `top`, `bottom` |
| `glareDepth` | `number` | `40` | glareDepth |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Spotlight glare decoration positioned at the top or bottom. This style does not install mouse tracking. For pointer following use `layer.follower.spotlight(follow:true)`.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Spot glare',
        styles: ['layer.glare.spot(position:top;glareDepth:30)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Bottom spot',
        styles: ['layer.glare.spot(position:bottom;glareDepth:50)', 'css(padding:2rem)']
    }
];
```

### `glare.reflect`

<a id="entry-layer-glare-reflect"></a>

Reflection

Reflect

Add a glass-like reflected surface.

Chooses a linear reflective band or an enlarged radial reflection image and translates it through parallax bias.

Load framework layer styles and give the host measurable geometry. Pointer-responsive glare requires a parallax behavior that updates the host bias and glare variables.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Combine the glare with the host surface and parallax behavior; the glare style supplies decoration while parallax owns pointer movement.

The glare layer does not install pointer tracking itself. Its host marker clips overflow, so account for content or ornaments that extend beyond the host.

Positional order: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `type`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `numberOrString` | Not supplied | size |
| `position` | `string` | `top` | position<br>Options: `top`, `bottom` |
| `glareDepth` | `number` | `5` | glareDepth |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `type` | `string` | `linear` | type<br>Shorthand<br>Options: `linear`, `radial` |

Linear or radial reflection effect.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Reflect',
        styles: ['layer.glare.reflect(type:linear;position:top)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Radial reflect',
        styles: ['layer.glare.reflect(type:radial;position:bottom)', 'css(padding:2rem)']
    }
];
```

### `glare.gloss`

<a id="entry-layer-glare-gloss"></a>

Gloss

Add a curved glossy highlight.

Builds a white rounded comet arc with a radial mask and marks it for parallax glare handling.

Load framework layer styles and give the host measurable geometry. Pointer-responsive glare requires a parallax behavior that updates the host bias and glare variables.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Combine the glare with the host surface and parallax behavior; the glare style supplies decoration while parallax owns pointer movement.

This is composed from spinner.comet and does not install pointer tracking. Its arc geometry differs from the other glare variants; caller arguments are applied after its preset values.

Positional order: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `numberOrString` | Not supplied | size |
| `position` | `string` | `top` | position<br>Options: `top`, `bottom` |
| `glareDepth` | `number` | `0` | glareDepth |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Gloss/sheen effect. Uses a comet spinner internally to create a sweeping gloss highlight.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Glossy',
        styles: ['layer.glare.gloss(position:top;glareDepth:30)', 'css(padding:2rem)']
    }
];
```

### `glare.metal`

<a id="entry-layer-glare-metal"></a>

Metal

Add a metallic sheen or radial streaks.

Uses a rotating linear highlight when count is zero, or repeating conic streaks when count is positive.

Load framework layer styles and give the host measurable geometry. Pointer-responsive glare requires a parallax behavior that updates the host bias and glare variables.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Combine the glare with the host surface and parallax behavior; the glare style supplies decoration while parallax owns pointer movement.

The glare layer does not install pointer tracking itself. Its host marker clips overflow, so account for content or ornaments that extend beyond the host.

Positional order: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `count`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `numberOrString` | Not supplied | size |
| `position` | `string` | `top` | position<br>Options: `top`, `bottom` |
| `glareDepth` | `number` | `0` | glareDepth |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `count` | `number` | `0` | count<br>Shorthand |

Metallic glare with configurable streak count.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Metal',
        styles: ['layer.glare.metal(count:6;position:top)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Brushed metal',
        styles: ['layer.glare.metal(count:12;position:bottom)', 'css(padding:2rem)']
    }
];
```

### `glare.light`

<a id="entry-layer-glare-light"></a>

Light tube

Light

Add a bright reflected light-strip effect.

Uses paired skewed rectangular highlights with broad glow; translation responds to the glare depth.

Load framework layer styles and give the host measurable geometry. Pointer-responsive glare requires a parallax behavior that updates the host bias and glare variables.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Combine the glare with the host surface and parallax behavior; the glare style supplies decoration while parallax owns pointer movement.

The glare layer does not install pointer tracking itself. Its host marker clips overflow, so account for content or ornaments that extend beyond the host.

Positional order: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `numberOrString` | Not supplied | size |
| `position` | `string` | `top` | position<br>Options: `top`, `bottom` |
| `glareDepth` | `number` | `96` | glareDepth |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Tube light effect. A bright elongated light glow.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Light tube',
        styles: ['layer.glare.light(position:top;glareDepth:80)', 'css(padding:2rem)']
    }
];
```
