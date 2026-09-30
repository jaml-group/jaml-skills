# common.background

<!-- Generated from native authoring; do not edit. -->

[中文](background.zh.md)

`Styles.background.*` — background styling with extended variants.

---

## Variants

### `background`

<a id="entry-background"></a>

Background

Set background paint on the path-selected target.

Combines image, position, size, repeat, attachment, color, or the CSS background shorthand.

Use background.color or a semantic preset for a simple fill; avoid a shorthand when unrelated background longhands must survive.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `image` → `position` → `size` → `repeat` → `attachment` → `color` → `background`.

| Argument | Type | Contract |
| --- | --- | --- |
| `image` | `arrayOrString` | Image<br>`{"cssKey":"backgroundImage"}` |
| `position` | `arrayOrString` | Position<br>`{"cssKey":"backgroundPosition"}` |
| `size` | `arrayOrString` | Dimensions<br>`{"cssKey":"backgroundSize"}` |
| `repeat` | `arrayOrString` | Repeat<br>`{"cssKey":"backgroundRepeat"}` |
| `attachment` | `string` | Attachment<br>`{"cssKey":"backgroundAttachment"}` |
| `color` | `string` | Background color<br>`{"cssKey":"backgroundColor"}` |
| `background` | `arrayOrString` | Background color<br>Shorthand<br>`{"cssKey":"background"}` |

Base background with color, image, size, position, and repeat.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.primary', 'color.on.primary'],
        components: [{ type: 'label', cap: 'Solid background' }]
    }
];
```

### Semantic background presets

These no-argument paths set a theme-owned colored or surface background. When a colored family is used as the background, pair it with the matching `color.on.*` foreground.

| Path                    | Color token                      | Description                   |
| ----------------------- | -------------------------------- | ----------------------------- |
| `background.primary`    | `--jam-color-primary-default`    | Primary colored background    |
| `background.secondary`  | `--jam-color-secondary-default`  | Secondary colored background  |
| `background.tertiary`   | `--jam-color-tertiary-default`   | Tertiary colored background   |
| `background.quaternary` | `--jam-color-quaternary-default` | Quaternary colored background |
| `background.neutral`    | `--jam-color-neutral-default`    | Neutral colored background    |
| `background.elevated`   | `--jam-color-elevated-default`   | Elevated surface treatment    |
| `background.highest`    | `--jam-color-surface-highest`    | Highest surface level         |
| `background.higher`     | `--jam-color-surface-higher`     | Higher surface level          |
| `background.default`    | `--jam-color-surface-default`    | Default surface level         |
| `background.lower`      | `--jam-color-surface-lower`      | Lower surface level           |
| `background.lowest`     | `--jam-color-surface-lowest`     | Lowest surface level          |

### `tint`

<a id="entry-background-tint"></a>

Tint

Apply the root accent-derived tint fill.

Computes a background color from the local accent and luminosity helpers with adjustable intensity.

The root background.tint extension differs from nested background.tint presets, which select the theme tint-default token. It does not edit the theme token.

Positional order: `intense`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `intense` | `number` | `0.015` | Intensity<br>Shorthand |

Applies a computed tint using the accent color. This established root path is an intensity effect; the compact CSS value `background:tint` instead resolves directly to `--jam-color-tint-default`. See [css / state-prefixed CSS](css.md#property-aware-token-values).

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.tint(intense:0.02)'],
        components: [{ type: 'label', cap: 'Tinted' }]
    }
];
```

### `crystal`

<a id="entry-background-crystal"></a>

Crystal

Paint an accent-based crystal-like gradient surface.

Adds the crystal background class, which layers linear and radial gradients and uses different rules below a dark ancestor.

Combine with readable foreground roles and suitable size; the effect uses background-image rather than child layers.

Crystal effect via a CSS class (`background-crystal`). No arguments.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.crystal()'],
        components: [{ type: 'label', cap: 'Crystal' }]
    }
];
```

### `glassify`

<a id="entry-background-glassify"></a>

Glass

Create a translucent glass-like surface.

Sets a translucent background, radial highlight image, background positioning and scale, and a backdrop blur.

The target needs visible content behind it for the backdrop blur to matter.

The helper supplies paint properties only; it does not create a layer, establish layout, or guarantee foreground contrast.

Glass morphism background with blur and opacity. No arguments; applies preset glass styles.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.glassify()'],
        components: [{ type: 'label', cap: 'Glass morphism' }]
    }
];
```

### `gradient`

<a id="entry-background-gradient"></a>

Gradient

Generate a gradient for background paint or masking according to the path.

background.gradient writes background-image; mask.gradient writes mask-image. Both build CSS gradient text from the chosen type, argument, and stops.

Use background gradients for visible color and mask gradients for fading the rendered target; these are different effects.

Provide the gradient argument appropriate to its type. The shared builder checks lowercase linear in the type name, so repeatingLinear should use arg for its angle rather than relying on deg.

Positional order: `deg` → `arg` → `stops` → `type`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `deg` | `numberOrString` | Not supplied | Angle<br>Unit: `deg` |
| `arg` | `string` | Not supplied | Position parameters |
| `stops` | `array` | `["hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.28), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 46), 0.65)","50%","hsla(calc(var(--jam-ac-h) * 1.2), calc(var(--jam-ac-s) * 0.42), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 45), 0.95)","hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.43), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 44), 0.45)"]` | Stops |
| `type` | `string` | `linear` | Style<br>Options: `linear` — Linear, `radial` — Radial, `conic` — Conic, `repeatingLinear` — Repeating linear, `repeatingRadial` — Repeating radial, `repeatingConic` — Repeating conic |

Standard gradient background.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient(deg:180;type:linear)'],
        components: [{ type: 'label', cap: 'Gradient bg' }]
    }
];
```

### `gradient.corner`

<a id="entry-background-gradient-corner"></a>

Corner

Apply the decorative corner gradient preset.

Sets a linear background gradient that keeps much of the surface transparent and emphasizes an angled corner.

Combine with a base background color when the transparent portions should expose a particular surface.

This writes background-image; coordinate with other background-image styles.

Positional order: `deg`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `deg` | `number` | `166` | Angle<br>Unit: `deg` |

Corner gradient with a subtle highlight angle.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient.corner(deg:160)'],
        components: [{ type: 'label', cap: 'Corner gradient' }]
    }
];
```

### `gradient.aurora`

<a id="entry-background-gradient-aurora"></a>

Aurora

Apply the decorative aurora gradient preset.

Sets a linear background gradient fading from transparency into accent color, with an adjustable angle.

Combine with a base background color when the transparent portions should expose a particular surface.

This writes background-image; coordinate with other background-image styles.

Positional order: `deg`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `deg` | `number` | `-15` | Angle<br>Unit: `deg` |

Aurora-like gradient with a shallow angle.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient.aurora(deg:-15)'],
        components: [{ type: 'label', cap: 'Aurora' }]
    }
];
```

### `gradient.concave`

<a id="entry-background-gradient-concave"></a>

Concave

Apply the decorative concave gradient preset.

Sets an accent-based radial gradient with enlarged background size and an offset position.

Combine with a base background color when the transparent portions should expose a particular surface.

This writes background-image; coordinate with other background-image styles.

Concave / depth gradient with a radial shadow effect. No arguments.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient.concave()'],
        components: [{ type: 'label', cap: 'Concave' }]
    }
];
```

### `stripy`

<a id="entry-background-stripy"></a>

Stripes

Paint a repeating stripe pattern.

Builds repeating linear gradient bands; color and width take precedence over explicit stops when both are present. fixed selects a fixed background attachment.

The style also publishes the background angle variable for cooperating effects.

This paints stripes without creating an overlay layer or owning layout.

Positional order: `deg` → `color` → `width` → `gap` → `stops` → `fixed`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `deg` | `number` | `135` | Angle<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)` | Color |
| `width` | `string` | Not supplied | Width |
| `gap` | `string` | Not supplied | Gap |
| `stops` | `array` | `["transparent","0.15rem","hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)","0.15rem"]` | Colors and widths |
| `fixed` | `boolean` | `false` | Fixed |

Striped pattern background.

Explicit stops override the color/width/gap composition.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.stripy(deg:135;color:var(--jam-ac-color);width:0.25rem)'],
        components: [{ type: 'label', cap: 'Stripes' }]
    }
];
```

### `bubbles`

<a id="entry-background-bubbles"></a>

Dreamy bubbles

For a scrolling animation, use `Styles.layer.scroller.bubbles`.

Paint a decorative field of gradient bubbles.

Builds randomized radial gradients and derives bubble size from the host height at application time.

The host needs a measurable height for size conversion.

This is generated background paint, not bubble DOM or animation; it does not install a resize regeneration listener.

Positional order: `bubbleSize` → `bubbleCount` → `countRange` → `sizeRange` → `blurRange` → `alphaRange` → `hueRange` → `satuRange` → `lumiRange` → `allowOverflowY` → `allowOverflowX`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
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

Bubble pattern background using multiple radial gradients.

An explicit bubble count overrides the count range.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.bubbles(bubbleSize:1;bubbleCount:15)'],
        components: [{ type: 'label', cap: 'Bubbles' }]
    }
];
```

### `ribbon`

<a id="entry-background-ribbon"></a>

Ribbon

Give a target a notched ribbon silhouette and accent gradient.

Sets a polygon clip-path and a horizontal accent-based background image.

The clip applies to the whole rendered target, including its contents. Provide space for the fixed-size notches.

Ribbon pattern with a clipped polygon shape and gradient. No arguments.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.ribbon()'],
        components: [{ type: 'label', cap: 'Ribbon' }]
    }
];
```

### `grid`

<a id="entry-background-grid"></a>

Grid

Paint grid lines without adding layout tracks or DOM.

Builds two perpendicular repeating linear gradients; line width, gaps, and optional overall cell size determine the pattern.

Use for a visual backdrop. Use layout grid helpers for actual child placement.

A supplied size is converted into gap after subtracting line width.

Positional order: `deg` → `color` → `width` → `gap` → `gapX` → `gapY` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `deg` | `numberOrString` | `90` | Angle<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.1), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 10), 0.075)` | Color |
| `width` | `string` | `0.0625rem` | Width |
| `gap` | `string` | `3.125rem` | Gap |
| `gapX` | `string` | Not supplied | X-axis gap |
| `gapY` | `string` | Not supplied | Y-axis gap |
| `size` | `string` | Not supplied | Width |

Grid pattern background with perpendicular lines.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.grid(gap:3rem;color:rgba(255,255,255,0.1);width:1px)'],
        components: [{ type: 'label', cap: 'Grid pattern' }]
    }
];
```

### `chess`

<a id="entry-background-chess"></a>

Checkerboard

Paint a repeating checkerboard background.

Builds a repeating conic pattern from the configured colors and sets the tile dimensions to twice size.

Use for a decorative pattern or transparency-style backdrop; reserve background-image ownership for this pattern or explicitly compose image layers.

Positional order: `color` → `color2` → `color3` → `color4` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.5), var(--jam-ac-l), 0.05)` | Color |
| `color2` | `string` | `transparent` | Color 2 |
| `color3` | `string` | Not supplied | Color 3 |
| `color4` | `string` | Not supplied | Color 4 |
| `size` | `string` | `25%` | Width |

Checkerboard pattern background.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.chess(color:var(--jam-ac-color);color2:transparent;size:25%)'],
        components: [{ type: 'label', cap: 'Checkerboard' }]
    }
];
```

## `background.size`

<a id="entry-background-size"></a>

Dimensions

Sets `background-size` from `value`.

Use the broader background style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `arrayOrString` | Dimensions |

## `background.color`

<a id="entry-background-color"></a>

Background color

Sets `background-color` from `value`.

Use the broader background style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Background color |

## `background.image`

<a id="entry-background-image"></a>

Image

Sets `background-image` from `value`.

Use the broader background style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `arrayOrString` | Image |

## `background.lower`

<a id="entry-background-lower"></a>

Lower

background.lower selects the surface.lower fill token; border.lower adds a solid border using surface.lower and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.higher`

<a id="entry-background-higher"></a>

Higher

background.higher selects the surface.higher fill token; border.higher adds a solid border using surface.higher and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.lowest`

<a id="entry-background-lowest"></a>

Lowest

background.lowest selects the surface.lowest fill token; border.lowest adds a solid border using surface.lowest and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.repeat`

<a id="entry-background-repeat"></a>

Repeat

Sets `background-repeat` from `value`.

Use the broader background style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `arrayOrString` | Repeat |

## `background.default`

<a id="entry-background-default"></a>

Default

Sets background-color from sys.color.surface.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.highest`

<a id="entry-background-highest"></a>

Highest

background.highest selects the surface.highest fill token; border.highest adds a solid border using surface.highest and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.neutral`

<a id="entry-background-neutral"></a>

Neutral

Sets background-color from sys.color.neutral.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.primary`

<a id="entry-background-primary"></a>

Primary

background.primary selects the primary.default fill token; border.primary adds a solid border using primary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.elevated`

<a id="entry-background-elevated"></a>

Elevated

Sets background-color from sys.color.elevated.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.position`

<a id="entry-background-position"></a>

Position

Sets `background-position` from `value`.

Use the broader background style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `arrayOrString` | Position |

## `background.tertiary`

<a id="entry-background-tertiary"></a>

Tertiary

background.tertiary selects the tertiary.default fill token; border.tertiary adds a solid border using tertiary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.secondary`

<a id="entry-background-secondary"></a>

Secondary

background.secondary selects the secondary.default fill token; border.secondary adds a solid border using secondary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `background.attachment`

<a id="entry-background-attachment"></a>

Attachment

Sets `background-attachment` from `value`.

Use the broader background style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Attachment |

## `background.quaternary`

<a id="entry-background-quaternary"></a>

Quaternary

background.quaternary selects the quaternary.default fill token; border.quaternary adds a solid border using quaternary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.
