# layer.combo

<!-- Generated from native authoring; do not edit. -->

[中文](combo.zh.md)

`Styles.layer.combo.*` — composite layer effects combining multiple spinners or masked backgrounds.

For `combo.spinner.roulette`, `.radar` and `.reddit`, omitted `spin` keeps the preset motion; `spin:false` stops rotation throughout the composite. This does not stop independent animation effects. Preset directions, geometry and fixed timings remain intentional; compose individual spinners when each layer needs independent control.

---

## Variants

### `combo.spinner.roulette`

<a id="entry-layer-combo-spinner-roulette"></a>

Roulette

Show a segmented ring, comet and orbiting dot as one decorative activity motif.

Combines counter-rotating frets and comet layers with a dot using a fixed short orbital duration.

Provide a host with measurable height for the component spinner layers and load framework layer styles.

Creates multiple child layers; reverting the composed style ownership removes its owned layers rather than the host.

Use this preset when its assembled motif fits. Compose individual layer.spinner variants when each ring needs independent geometry or motion.

Omitting spin keeps the preset motion; spin:false disables rotation in every constituent layer. Preset directions, geometry and fixed timings still take precedence over other caller values. Separate animation effects, application busy state and status text remain caller-owned.

Positional order: `fretWidth` → `fretGap` → `fretCount` → `fretBackground` → `fretFrom` → `fretColors` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `cometLength` → `tailColor` → `headColor` → `cometBackground` → `cometBlur` → `cometFrom` → `roundHead` → `roundTail` → `animateLength`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `fretWidth` | `numberOrString` | `1.5` | Segment width<br>Default unit: deg |
| `fretGap` | `numberOrString` | `10.5` | Segment spacing<br>Default unit: deg |
| `fretCount` | `number` | Not supplied | Segment count |
| `fretBackground` | `string` | `var(--jam-ac-color)` | Background<br>Accepts a color, image or gradient. |
| `fretFrom` | `number` | Not supplied | Start<br>Unit: deg |
| `fretColors` | `array` | Not supplied | Segment colors<br>Assign colors to individual fret segments; the number is limited by fretCount. |
| `outer` | `number` | Not supplied | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `75` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | Not supplied | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | `1rem` | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | Not supplied | Rotation<br>Omit to keep preset motion, or pass false to stop rotation throughout this composite. Other values do not override directions fixed by the preset. This does not disable independent animation effects.<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `cometLength` | `number` | `100` | Arc length |
| `tailColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | Tail color |
| `headColor` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 1.5), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 15), 0.85)` | Head color |
| `cometBackground` | `string` | Not supplied | Background<br>Accepts a color, image or gradient. When set, head and tail colors no longer apply. |
| `cometBlur` | `number` | `1px` | Blur<br>Unit: `px` |
| `cometFrom` | `number` | `0` | Start<br>Unit: deg |
| `roundHead` | `boolean` | `true` | Rounded head |
| `roundTail` | `boolean` | `false` | Rounded tail |
| `animateLength` | `booleanOrArray` | `false` | Animate arc length |

Roulette-style spinner combining frets, comet, and orbit spinners.

Combines `spinner.frets` (reversed, mid:80), `spinner.comet` (mid:80, normal direction), and `spinner.orbit` (single sphere, mid:80).

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Roulette',
        styles: ['layer.combo.spinner.roulette(duration:4000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `combo.spinner.radar`

<a id="entry-layer-combo-spinner-radar"></a>

Radar

Show a radar-like decorative activity motif.

Combines a rotating filled comet sweep, moving radial marker and concentric segmented rings.

Provide a host with measurable height for the component spinner layers and load framework layer styles.

Creates multiple child layers; reverting the composed style ownership removes its owned layers rather than the host.

Use this preset when its assembled motif fits. Compose individual layer.spinner variants when each ring needs independent geometry or motion.

Omitting spin keeps the preset motion; spin:false disables rotation in every constituent layer. Preset directions, geometry and fixed timings still take precedence over other caller values. Separate animation effects, application busy state and status text remain caller-owned.

Positional order: `cometLength` → `tailColor` → `headColor` → `cometBackground` → `cometBlur` → `cometFrom` → `roundHead` → `roundTail` → `animateLength` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `cometLength` | `number` | `100` | Arc length |
| `tailColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | Tail color |
| `headColor` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 1.5), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 15), 0.85)` | Head color |
| `cometBackground` | `string` | Not supplied | Background<br>Accepts a color, image or gradient. When set, head and tail colors no longer apply. |
| `cometBlur` | `number` | `0` | Blur<br>Unit: `px` |
| `cometFrom` | `number` | `0` | Start<br>Unit: deg |
| `roundHead` | `boolean` | `true` | Rounded head |
| `roundTail` | `boolean` | `false` | Rounded tail |
| `animateLength` | `booleanOrArray` | `false` | Animate arc length |
| `outer` | `number` | Not supplied | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `75` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | Not supplied | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | `1rem` | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | Not supplied | Rotation<br>Omit to keep preset motion, or pass false to stop rotation throughout this composite. Other values do not override directions fixed by the preset. This does not disable independent animation effects.<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Radar-style spinner combining comet and multiple frets layers.

Creates a radar sweep with concentric rings. Uses `spinner.comet` for the sweep line and multiple `spinner.frets` for concentric circles.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Radar',
        styles: ['layer.combo.spinner.radar(duration:3000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `combo.spinner.reddit`

<a id="entry-layer-combo-spinner-reddit"></a>

Reddit

Show a two-ring orbit motif around a central disk.

Combines two segmented rings and paired orbit dots at different fixed speeds, with a stationary center disk.

Provide a host with measurable height for the component spinner layers and load framework layer styles.

Creates multiple child layers; reverting the composed style ownership removes its owned layers rather than the host.

Use this preset when its assembled motif fits. Compose individual layer.spinner variants when each ring needs independent geometry or motion.

Omitting spin keeps the preset motion; spin:false disables rotation in every constituent layer. Preset directions, geometry and fixed timings still take precedence over other caller values. Separate animation effects, application busy state and status text remain caller-owned.

Positional order: `cometLength` → `tailColor` → `headColor` → `cometBackground` → `cometBlur` → `cometFrom` → `roundHead` → `roundTail` → `animateLength` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `cometLength` | `number` | `100` | Arc length |
| `tailColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | Tail color |
| `headColor` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 1.5), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 15), 0.85)` | Head color |
| `cometBackground` | `string` | Not supplied | Background<br>Accepts a color, image or gradient. When set, head and tail colors no longer apply. |
| `cometBlur` | `number` | `0` | Blur<br>Unit: `px` |
| `cometFrom` | `number` | `0` | Start<br>Unit: deg |
| `roundHead` | `boolean` | `true` | Rounded head |
| `roundTail` | `boolean` | `false` | Rounded tail |
| `animateLength` | `booleanOrArray` | `false` | Animate arc length |
| `outer` | `number` | Not supplied | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `75` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | Not supplied | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | `1rem` | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | Not supplied | Rotation<br>Omit to keep preset motion, or pass false to stop rotation throughout this composite. Other values do not override directions fixed by the preset. This does not disable independent animation effects.<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Multi-layered Reddit-style spinner.

Combines two pairs of frets + orbit layers at different radii and a central background dot.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Reddit',
        styles: ['layer.combo.spinner.reddit(duration:5000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `combo.masked`

<a id="entry-layer-combo-masked"></a>

Background

Use a caller-supplied CSS background on a separate decorative layer.

Writes background image, position, size, repeat, attachment, color and shorthand properties on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

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

Background layer with an optional caller-supplied mask. Only `combo.masked.stripy` supplies a fade mask automatically. The base variant keeps combo-layer classes and needs explicit layer geometry; set the host position and the layer’s `css` as below. For a full-size background with native geometry, use `layer.background` with an explicit mask.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['css(position:relative)', "layer.combo.masked(color:var(--jam-ac-color);opacity:0.15;mask:linear-gradient(90deg,hsl(0 0% 0%),transparent);css:{position:'absolute',inset:0,display:'block',pointerEvents:'none'})"],
        components: [{ type: 'label', cap: 'Masked bg' }]
    }
];
```

### `combo.masked.stripy`

<a id="entry-layer-combo-masked-stripy"></a>

Stripes

Stripy

Add stripes that fade across the decoration.

Delegates to the background stripe layer with a preset accent tint, stripe width and linear mask perpendicular to the stripe angle.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This preset overwrites color, width and mask after spreading the caller arguments. Use layer.background.stripy with an explicit mask for full control.

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

Stripy background with a gradient mask. The stripes are masked by a linear gradient for a fade effect.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.combo.masked.stripy(deg:45)'],
        components: [{ type: 'label', cap: 'Masked stripy' }]
    }
];
```

## `layer.combo.masked.grid`

<a id="entry-layer-combo-masked-grid"></a>

Grid

Use a decorative grid on a separate decorative layer.

Combines two perpendicular repeating linear gradients; line spacing can differ between the two axes.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

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

## `layer.combo.masked.size`

<a id="entry-layer-combo-masked-size"></a>

Dimensions

Use background image sizing on a separate decorative layer.

Sets the CSS background-size property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Dimensions |

## `layer.combo.masked.tint`

<a id="entry-layer-combo-masked-tint"></a>

Tint

Use a lightly tinted surface on a separate decorative layer.

Computes an accent-relative, theme-aware background color from the tint intensity.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `intense`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `intense` | `number` | `0.015` | Intensity<br>Shorthand |

## `layer.combo.masked.chess`

<a id="entry-layer-combo-masked-chess"></a>

Checkerboard

Use a checker pattern on a separate decorative layer.

Builds a repeating conic pattern from two to four colors; the tile covers twice the configured square size on each axis.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

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

## `layer.combo.masked.color`

<a id="entry-layer-combo-masked-color"></a>

Background color

Use a solid background fill on a separate decorative layer.

Sets the CSS background-color property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `string` | Background color |

## `layer.combo.masked.image`

<a id="entry-layer-combo-masked-image"></a>

Image

Use an image or gradient background on a separate decorative layer.

Sets the CSS background-image property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Image |

## `layer.combo.masked.lower`

<a id="entry-layer-combo-masked-lower"></a>

Lower

Use the lower surface tone on a separate decorative layer.

Uses the lower surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.higher`

<a id="entry-layer-combo-masked-higher"></a>

Higher

Use the higher surface tone on a separate decorative layer.

Uses the higher surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.lowest`

<a id="entry-layer-combo-masked-lowest"></a>

Lowest

Use the lowest surface tone on a separate decorative layer.

Uses the lowest surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.repeat`

<a id="entry-layer-combo-masked-repeat"></a>

Repeat

Use background tiling behavior on a separate decorative layer.

Sets the CSS background-repeat property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Repeat |

## `layer.combo.masked.ribbon`

<a id="entry-layer-combo-masked-ribbon"></a>

Ribbon

Use a ribbon-shaped background on a separate decorative layer.

Clips the background into a horizontal notched ribbon and paints an accent gradient.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. This clips a background; use layer.ribbon or layer.ribbon.bookmark for a corner-attached content ornament. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.bubbles`

<a id="entry-layer-combo-masked-bubbles"></a>

Dreamy bubbles

For a scrolling animation, use `Styles.layer.scroller.bubbles`.

Use random decorative bubbles on a separate decorative layer.

Builds a static stack of radial gradients with randomized placement, size, softness and accent-relative colors.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. This variant is a generated CSS image, not an animated canvas. Its size conversion reads the layer height; choose canvas.particles for per-particle animation. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

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

## `layer.combo.masked.crystal`

<a id="entry-layer-combo-masked-crystal"></a>

Crystal

Use a crystal-like accent surface on a separate decorative layer.

Adds the crystal background class, whose layered gradients vary between normal and dark presentation.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.default`

<a id="entry-layer-combo-masked-default"></a>

Default

Use the default surface fill on a separate decorative layer.

Uses the default surface color token for the background fill.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.highest`

<a id="entry-layer-combo-masked-highest"></a>

Highest

Use the highest surface tone on a separate decorative layer.

Uses the highest surface fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.neutral`

<a id="entry-layer-combo-masked-neutral"></a>

Neutral

Use a neutral fill on a separate decorative layer.

Uses the neutral color token for the background fill.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.primary`

<a id="entry-layer-combo-masked-primary"></a>

Primary

Use the primary theme role on a separate decorative layer.

Uses the primary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.elevated`

<a id="entry-layer-combo-masked-elevated"></a>

Elevated

Use an elevated surface fill on a separate decorative layer.

Uses the elevated color token for the background fill.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.glassify`

<a id="entry-layer-combo-masked-glassify"></a>

Glass

Use a frosted glass-like surface on a separate decorative layer.

Combines a translucent surface, an enlarged radial highlight and backdrop blur.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. Backdrop blur changes the content behind the layer; its visible result depends on that backdrop and browser support. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.gradient`

<a id="entry-layer-combo-masked-gradient"></a>

Gradient

Use a configurable gradient fill on a separate decorative layer.

Builds a background image using the gradient type, geometry and stops.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

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

## `layer.combo.masked.position`

<a id="entry-layer-combo-masked-position"></a>

Position

Use background placement on a separate decorative layer.

Sets the CSS background-position property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `arrayOrString` | Position |

## `layer.combo.masked.tertiary`

<a id="entry-layer-combo-masked-tertiary"></a>

Tertiary

Use the tertiary theme role on a separate decorative layer.

Uses the tertiary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.secondary`

<a id="entry-layer-combo-masked-secondary"></a>

Secondary

Use the secondary theme role on a separate decorative layer.

Uses the secondary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.attachment`

<a id="entry-layer-combo-masked-attachment"></a>

Attachment

Use background attachment behavior on a separate decorative layer.

Sets the CSS background-attachment property on the created layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. An atomic background property does not supply the other properties needed for an image. Configure a complete background on one layer when those properties must act together. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `value` | `string` | Attachment |

## `layer.combo.masked.quaternary`

<a id="entry-layer-combo-masked-quaternary"></a>

Quaternary

Use the quaternary theme role on a separate decorative layer.

Uses the quaternary default fill

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.combo.masked.gradient.aurora`

<a id="entry-layer-combo-masked-gradient-aurora"></a>

Aurora

Use an aurora-like directional highlight on a separate decorative layer.

Uses a linear gradient that passes from transparent into an accent-colored glow.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `number` | `-15` | Angle<br>Unit: `deg` |

## `layer.combo.masked.gradient.corner`

<a id="entry-layer-combo-masked-gradient-corner"></a>

Corner

Use a shaded corner on a separate decorative layer.

Uses a linear gradient with a broad transparent area and a colored corner.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `deg` | `number` | `166` | Angle<br>Unit: `deg` |

## `layer.combo.masked.gradient.concave`

<a id="entry-layer-combo-masked-gradient-concave"></a>

Concave

Use a concave surface highlight on a separate decorative layer.

Uses an enlarged radial gradient positioned near a corner to create a concave-looking surface.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The combo.masked form does not inject a mask for this variant; configure mask explicitly when needed. The direct masked path retains combo-layer classes; the background full-size geometry and background-host marker are not added by that path. Configure layer css geometry explicitly where required.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
