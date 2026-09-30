# layer.background

<!-- Generated from native authoring; do not edit. -->

[中文](background.zh.md)

`Styles.layer.background.*` — background layer with common background options.

Wraps `common/background` options in a layer context. Supports all standard background properties plus layer positioning.

---

## Variants

### `background`

<a id="entry-layer-background"></a>

Background

Use a caller-supplied CSS background on a separate decorative layer.

Writes background image, position, size, repeat, attachment, color and shorthand properties on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `image` → `position` → `size` → `repeat` → `attachment` → `color` → `background`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `image` | `arrayOrString` | Image<br>`{"cssKey":"backgroundImage"}` |
| `position` | `arrayOrString` | Position<br>`{"cssKey":"backgroundPosition"}` |
| `size` | `arrayOrString` | Dimensions<br>`{"cssKey":"backgroundSize"}` |
| `repeat` | `arrayOrString` | Repeat<br>`{"cssKey":"backgroundRepeat"}` |
| `attachment` | `string` | Attachment<br>`{"cssKey":"backgroundAttachment"}` |
| `color` | `string` | Background color<br>`{"cssKey":"backgroundColor"}` |
| `background` | `arrayOrString` | Background color<br>Shorthand<br>`{"cssKey":"background"}` |

Basic background with standard CSS background properties.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background(color:var(--jam-ac-color);opacity:0.1)'],
        components: [{ type: 'label', cap: 'Tinted background' }]
    },
    {
        type: 'card',
        styles: ['layer.background(image:linear-gradient(45deg,red,blue);opacity:0.3)'],
        components: [{ type: 'label', cap: 'Gradient background' }]
    }
];
```

### `background.tint`

<a id="entry-layer-background-tint"></a>

Tint

Use a lightly tinted surface on a separate decorative layer.

Computes an accent-relative, theme-aware background color from the tint intensity.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `intense`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `intense` | `number` | `0.015` | Intensity<br>Shorthand |

Subtle color tint overlay.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.tint(intense:0.03)'],
        components: [{ type: 'label', cap: 'Tinted' }]
    }
];
```

### `background.crystal`

<a id="entry-layer-background-crystal"></a>

Crystal

Use a crystal-like accent surface on a separate decorative layer.

Adds the crystal background class, whose layered gradients vary between normal and dark presentation.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

Crystal/glass-like background effect. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.crystal'],
        components: [{ type: 'label', cap: 'Crystal' }]
    }
];
```

### `background.glassify`

<a id="entry-layer-background-glassify"></a>

Glass

Use a frosted glass-like surface on a separate decorative layer.

Combines a translucent surface, an enlarged radial highlight and backdrop blur.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Backdrop blur changes the content behind the layer; its visible result depends on that backdrop and browser support.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

Frosted glass effect with blur and gradient.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.glassify'],
        components: [{ type: 'label', cap: 'Glass' }]
    }
];
```

### `background.gradient`

<a id="entry-layer-background-gradient"></a>

Gradient

Use a configurable gradient fill on a separate decorative layer.

Builds a background image using the gradient type, geometry and stops.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg` → `arg` → `stops` → `type`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `numberOrString` | Not supplied | Angle<br>Unit: `deg` |
| `arg` | `string` | Not supplied | Position parameters |
| `stops` | `array` | `["hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.28), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 46), 0.65)","50%","hsla(calc(var(--jam-ac-h) * 1.2), calc(var(--jam-ac-s) * 0.42), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 45), 0.95)","hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.43), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 44), 0.45)"]` | Stops |
| `type` | `string` | `linear` | Style<br>Options: `linear` — Linear, `radial` — Radial, `conic` — Conic, `repeatingLinear` — Repeating linear, `repeatingRadial` — Repeating radial, `repeatingConic` — Repeating conic |

Smooth multi-stop gradient background.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient'],
        components: [{ type: 'label', cap: 'Gradient' }]
    }
];
```

### `background.gradient.corner`

<a id="entry-layer-background-gradient-corner"></a>

Corner

Use a shaded corner on a separate decorative layer.

Uses a linear gradient with a broad transparent area and a colored corner.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `number` | `166` | Angle<br>Unit: `deg` |

Corner gradient from transparent to accent color.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient.corner'],
        components: [{ type: 'label', cap: 'Corner gradient' }]
    }
];
```

### `background.gradient.aurora`

<a id="entry-layer-background-gradient-aurora"></a>

Aurora

Use an aurora-like directional highlight on a separate decorative layer.

Uses a linear gradient that passes from transparent into an accent-colored glow.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `number` | `-15` | Angle<br>Unit: `deg` |

Aurora-style gradient from transparent to accent.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient.aurora'],
        components: [{ type: 'label', cap: 'Aurora' }]
    }
];
```

### `background.gradient.concave`

<a id="entry-layer-background-gradient-concave"></a>

Concave

Use a concave surface highlight on a separate decorative layer.

Uses an enlarged radial gradient positioned near a corner to create a concave-looking surface.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

Concave/depressed gradient effect. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient.concave'],
        components: [{ type: 'label', cap: 'Concave' }]
    }
];
```

### `background.stripy`

<a id="entry-layer-background-stripy"></a>

Stripes

Use a striped background on a separate decorative layer.

Builds a repeating linear gradient and optionally fixes its background attachment.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The gradient helper prefers color/width stripe construction when those values are supplied; stops is the alternate construction path.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg` → `color` → `width` → `gap` → `stops` → `fixed`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `number` | `135` | Angle<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)` | Color |
| `width` | `string` | Not supplied | Width |
| `gap` | `string` | Not supplied | Gap |
| `stops` | `array` | `["transparent","0.15rem","hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)","0.15rem"]` | Colors and widths |
| `fixed` | `boolean` | `false` | Fixed |

Diagonal stripe pattern.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.stripy(deg:45;width:0.5rem)'],
        components: [{ type: 'label', cap: 'Stripy' }]
    }
];
```

### `background.bubbles`

<a id="entry-layer-background-bubbles"></a>

Dreamy bubbles

For a scrolling animation, use `Styles.layer.scroller.bubbles`.

Use random decorative bubbles on a separate decorative layer.

Builds a static stack of radial gradients with randomized placement, size, softness and accent-relative colors.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This variant is a generated CSS image, not an animated canvas. Its size conversion reads the layer height; choose canvas.particles for per-particle animation.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `bubbleSize` → `bubbleCount` → `countRange` → `sizeRange` → `blurRange` → `alphaRange` → `hueRange` → `satuRange` → `lumiRange` → `allowOverflowY` → `allowOverflowX`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `bubbleSize` | `numberOrString` | `1` | Base size<br>Unit: `rem` |
| `bubbleCount` | `numberOrString` | Not supplied | Count |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | Not supplied | Size range |
| `blurRange` | `array` | Not supplied | Blur range |
| `alphaRange` | `array` | Not supplied | Opacity range |
| `hueRange` | `array` | Not supplied | Color range |
| `satuRange` | `array` | Not supplied | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `allowOverflowY` | `boolean` | Not supplied | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | Not supplied | Allow overflow on the X axis |

Bubble pattern overlay.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.bubbles(bubbleSize:1.5rem;bubbleCount:8)'],
        components: [{ type: 'label', cap: 'Bubbles' }]
    }
];
```

### `background.ribbon`

<a id="entry-layer-background-ribbon"></a>

Ribbon

Use a ribbon-shaped background on a separate decorative layer.

Clips the background into a horizontal notched ribbon and paints an accent gradient.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This clips a background; use layer.ribbon or layer.ribbon.bookmark for a corner-attached content ornament.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

Ribbon-shaped background with clip path. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.ribbon'],
        components: [{ type: 'label', cap: 'Ribbon bg' }]
    }
];
```

### `background.grid`

<a id="entry-layer-background-grid"></a>

Grid

Use a decorative grid on a separate decorative layer.

Combines two perpendicular repeating linear gradients; line spacing can differ between the two axes.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg` → `color` → `width` → `gap` → `gapX` → `gapY` → `size`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `numberOrString` | `90` | Angle<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.1), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 10), 0.075)` | Color |
| `width` | `string` | `0.0625rem` | Width |
| `gap` | `string` | `3.125rem` | Gap |
| `gapX` | `string` | Not supplied | X-axis gap |
| `gapY` | `string` | Not supplied | Y-axis gap |
| `size` | `string` | Not supplied | Width |

Repeating grid pattern.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.grid(gap:2rem)'],
        components: [{ type: 'label', cap: 'Grid' }]
    }
];
```

### `background.chess`

<a id="entry-layer-background-chess"></a>

Checkerboard

Use a checker pattern on a separate decorative layer.

Builds a repeating conic pattern from two to four colors; the tile covers twice the configured square size on each axis.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `color` → `color2` → `color3` → `color4` → `size`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.5), var(--jam-ac-l), 0.05)` | Color |
| `color2` | `string` | `transparent` | Color 2 |
| `color3` | `string` | Not supplied | Color 3 |
| `color4` | `string` | Not supplied | Color 4 |
| `size` | `string` | `25%` | Width |

Checkerboard/chess pattern.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.chess(size:2rem)'],
        components: [{ type: 'label', cap: 'Chess' }]
    }
];
```

## `layer.background.size`

<a id="entry-layer-background-size"></a>

Dimensions

Use background image sizing on a separate decorative layer.

Sets the CSS background-size property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Dimensions |

## `layer.background.color`

<a id="entry-layer-background-color"></a>

Background color

Use a solid background fill on a separate decorative layer.

Sets the CSS background-color property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `string` | Background color |

## `layer.background.image`

<a id="entry-layer-background-image"></a>

Image

Use an image or gradient background on a separate decorative layer.

Sets the CSS background-image property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Image |

## `layer.background.lower`

<a id="entry-layer-background-lower"></a>

Lower

Use the lower surface tone on a separate decorative layer.

Uses the lower surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.higher`

<a id="entry-layer-background-higher"></a>

Higher

Use the higher surface tone on a separate decorative layer.

Uses the higher surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.lowest`

<a id="entry-layer-background-lowest"></a>

Lowest

Use the lowest surface tone on a separate decorative layer.

Uses the lowest surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.repeat`

<a id="entry-layer-background-repeat"></a>

Repeat

Use background tiling behavior on a separate decorative layer.

Sets the CSS background-repeat property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Repeat |

## `layer.background.default`

<a id="entry-layer-background-default"></a>

Default

Use the default surface fill on a separate decorative layer.

Uses the default surface color token for the background fill.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.highest`

<a id="entry-layer-background-highest"></a>

Highest

Use the highest surface tone on a separate decorative layer.

Uses the highest surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.neutral`

<a id="entry-layer-background-neutral"></a>

Neutral

Use a neutral fill on a separate decorative layer.

Uses the neutral color token for the background fill.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.primary`

<a id="entry-layer-background-primary"></a>

Primary

Use the primary theme role on a separate decorative layer.

Uses the primary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.elevated`

<a id="entry-layer-background-elevated"></a>

Elevated

Use an elevated surface fill on a separate decorative layer.

Uses the elevated color token for the background fill.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.position`

<a id="entry-layer-background-position"></a>

Position

Use background placement on a separate decorative layer.

Sets the CSS background-position property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Position |

## `layer.background.tertiary`

<a id="entry-layer-background-tertiary"></a>

Tertiary

Use the tertiary theme role on a separate decorative layer.

Uses the tertiary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.secondary`

<a id="entry-layer-background-secondary"></a>

Secondary

Use the secondary theme role on a separate decorative layer.

Uses the secondary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.background.attachment`

<a id="entry-layer-background-attachment"></a>

Attachment

Use background attachment behavior on a separate decorative layer.

Sets the CSS background-attachment property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `string` | Attachment |

## `layer.background.quaternary`

<a id="entry-layer-background-quaternary"></a>

Quaternary

Use the quaternary theme role on a separate decorative layer.

Uses the quaternary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
