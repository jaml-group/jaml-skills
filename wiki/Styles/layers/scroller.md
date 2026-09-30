# layer.scroller

<!-- Generated from native authoring; do not edit. -->

[中文](scroller.zh.md)

`Styles.layer.scroller.*` — auto-scrolling background layer effects.

---

## Variants

### `scroller`

<a id="entry-layer-scroller"></a>

scroller

Use a repeating background behind host content.

Creates two background layers with half-cycle offset. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `image` → `position` → `size` → `repeat` → `attachment` → `color` → `background`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `down` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `image` | `arrayOrString` | Not supplied | Image<br>`{"cssKey":"backgroundImage"}` |
| `position` | `arrayOrString` | Not supplied | Position<br>`{"cssKey":"backgroundPosition"}` |
| `size` | `arrayOrString` | Not supplied | Dimensions<br>`{"cssKey":"backgroundSize"}` |
| `repeat` | `arrayOrString` | Not supplied | Repeat<br>`{"cssKey":"backgroundRepeat"}` |
| `attachment` | `string` | Not supplied | Attachment<br>`{"cssKey":"backgroundAttachment"}` |
| `color` | `string` | Not supplied | Background color<br>`{"cssKey":"backgroundColor"}` |
| `background` | `arrayOrString` | Not supplied | Background color<br>Shorthand<br>`{"cssKey":"background"}` |

Auto-scrolling background. Two background copies (primary and secondary) cycle to create a seamless scroll effect.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller(direction:up;scroll:true;duration:12000;color:var(--jam-ac-color);opacity:0.08)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Scrolling up' }]
    },
    {
        type: 'wrapper',
        styles: ['layer.scroller(direction:left;scroll:true;duration:8000;color:hsla(0,0%,100%,0.05))', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Scrolling left' }]
    }
];
```

### `scroller.text`

<a id="entry-layer-scroller-text"></a>

text

Use a repeating text marquee behind host content.

Creates two text layers; auto duration scales with the content string length. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately. Text is duplicated for cycling; keep essential readable content in the host rather than relying on moving decorative copies.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `string` | `Hello World` | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `down` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `auto` | Scroll duration |
| `easing` | `string` | `linear` | Easing |

Scrolling text content. Splits text characters and scrolls them across the background.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.text(content:JAM UI;scroll:true;direction:up;duration:auto;opacity:0.1)', 'css(position:relative;width:20rem;height:20rem;padding:1rem;font-size:2rem)'],
        components: [{ type: 'label', cap: 'Scrolling text' }]
    }
];
```

### `scroller.particles`

<a id="entry-layer-scroller-particles"></a>

particles

Use a repeating particle field behind host content.

Creates two particle canvases that can travel as whole layers; per-particle onTick animation remains separate. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `down` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | Not supplied | Size range |
| `blurRange` | `array` | Not supplied | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | Not supplied | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | Not supplied | Shape |
| `distribution` | `string` | `random` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | Not supplied | Color range |
| `satuRange` | `array` | Not supplied | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | Not supplied | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | Not supplied | Factor range |
| `allowOverflowY` | `boolean` | Not supplied | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | Not supplied | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | Not supplied | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

Scrolling particle system. Configurable particles that animate across the background.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.particles(scroll:true;direction:up;duration:10000;countRange:[10,20];sizeRange:[4,12];shape:circle;alphaRange:[0.2,0.6])', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Particle scroll' }]
    }
];
```

### `scroller.bubbles`

<a id="entry-layer-scroller-bubbles"></a>

bubbles

Use rising bubble decoration behind host content.

Creates two enlarged particle canvases using bubble shapes, upward direction and soft transparent particle ranges. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `css` | `dictionaryOrString` | `{"height":"400%"}` | CSS |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `up` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | `["5%","10%"]` | Size range |
| `blurRange` | `array` | `[0,"5%"]` | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | `bubble` | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | Not supplied | Shape |
| `distribution` | `string` | `random` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | Not supplied | Color range |
| `satuRange` | `array` | Not supplied | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | `[0,0.5]` | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | `[0.9,1]` | Factor range |
| `allowOverflowY` | `boolean` | Not supplied | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | Not supplied | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | Not supplied | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

Scrolling bubble particles. A preset particle system with bubble-shaped particles drifting upward.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.bubbles(scroll:true;duration:16000)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Bubbles' }]
    }
];
```

### `scroller.stripy`

<a id="entry-layer-scroller-stripy"></a>

stripy

Use moving stripes behind host content.

Creates two stripe backgrounds and, by default, adjusts the travel dimension to align the stripe repetition. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately. Stripe alignment measures host dimensions during layer creation; choose the angle and width with the intended travel direction in mind.

Positional order: `alignStripy` → `convertWidth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `deg` → `color` → `width` → `gap` → `stops` → `fixed`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `alignStripy` | `boolean` | `true` | Automatic alignment |
| `convertWidth` | `boolean` | `true` | Convert width |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `down` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `deg` | `number` | `135` | Angle<br>Unit: `deg` |
| `color` | `string` | `var(--jam-ac-color)` | Color |
| `width` | `string` | `5%` | Width |
| `gap` | `string` | Not supplied | Gap |
| `stops` | `array` | `["transparent","0.15rem","hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)","0.15rem"]` | Colors and widths |
| `fixed` | `boolean` | `false` | Fixed |

Scrolling stripy (striped) background. Alternating colored stripes that scroll seamlessly.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.stripy(scroll:true;direction:right;duration:8000;deg:45;width:3rem)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Stripy scroll' }]
    }
];
```

### `scroller.grid`

<a id="entry-layer-scroller-grid"></a>

grid

Use a moving decorative grid behind host content.

Creates two grid backgrounds using the common grid builder. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `deg` → `color` → `width` → `gap` → `gapX` → `gapY` → `size`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `down` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `deg` | `numberOrString` | `90` | Angle<br>Unit: `deg` |
| `color` | `string` | `var(--jam-ac-color)` | Color |
| `width` | `string` | `0.0625rem` | Width |
| `gap` | `string` | `3.125rem` | Gap |
| `gapX` | `string` | Not supplied | X-axis gap |
| `gapY` | `string` | Not supplied | Y-axis gap |
| `size` | `string` | Not supplied | Width |

Scrolling grid background. A repeating grid pattern that scrolls.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.grid(scroll:true;direction:down;duration:12000;gap:2rem)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Grid scroll' }]
    }
];
```
