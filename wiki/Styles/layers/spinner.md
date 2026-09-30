# layer.spinner

<!-- Generated from native authoring; do not edit. -->

[中文](spinner.zh.md)

Provide a host with measurable height when using percentage size, and load framework layer styles. Enable spin explicitly for rotation.

Choose the visual variant independently of application busy/progress state. The application decides when to attach or remove it; use a progress element for measured progress.

These are decorative layers: they do not detect pending work, report progress, announce status or disable controls. The spin default is false; particles and optional variant animations can still animate independently.

`Styles.layer.spinner.*` provides decorative activity layers. Read [activity versus progress](../../choosing-native-capabilities.md#decorative-activity-and-actual-progress) before using them as loading UI; the entries below describe each variant’s activation and sizing requirements.

---

## Variants

### `spinner.background`

<a id="entry-layer-spinner-background"></a>

Background

Use a ring background for optional decorative activity feedback.

Builds a masked background layer; spin controls its rotation.

Positional order: `background` → `backgroundMask` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `background` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.33)` | Background |
| `backgroundMask` | `string` | Not supplied | Background mask |
| `outer` | `number` | Not supplied | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `75` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | Not supplied | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | `4rem` | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | `false` | Rotation<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Rotating background layer. Spins a ring around the element.

Choose either `mid` or the separate inner/outer positioning controls.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Loading',
        styles: ['layer.spinner.background(spin:normal;duration:8000;width:3rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Slow spin',
        styles: ['layer.spinner.background(background:var(--jam-ac-color);spin:reverse;duration:15000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.frets`

<a id="entry-layer-spinner-frets"></a>

Segments

Frets

Use a segmented ring for optional decorative activity feedback.

Builds a conic segmented ring from fret settings; spin controls its rotation.

Positional order: `fretWidth` → `fretGap` → `fretCount` → `fretBackground` → `fretFrom` → `fretColors` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `fretWidth` | `numberOrString` | Not supplied | Segment width<br>Default unit: deg |
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
| `spin` | `booleanOrString` | `false` | Rotation<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Segmented fret/guitar-fret spinner with individually colored segments.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Fret spinner',
        styles: ['layer.spinner.frets(fretCount:8;fretWidth:3;spin:normal;duration:6000;width:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Colorful frets',
        styles: ['layer.spinner.frets(fretCount:6;fretColors:[red,orange,yellow,green,blue,purple];spin:normal;duration:8000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.comet`

<a id="entry-layer-spinner-comet"></a>

Comet

Use a comet arc for optional decorative activity feedback.

Builds a gradient arc with head and tail controls. spin rotates it; animateLength independently enables repeated arc-length animation.

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
| `spin` | `booleanOrString` | `false` | Rotation<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Comet-tail spinner with a glowing head and fading tail.

A comet background overrides the head/tail colors when supplied.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Comet',
        styles: ['layer.spinner.comet(cometLength:80;spin:normal;duration:4000;width:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Pulsing comet',
        styles: ['layer.spinner.comet(animateLength:true;spin:normal;width:1.5rem)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.orbit`

<a id="entry-layer-spinner-orbit"></a>

Orbit

Use orbiting dots for optional decorative activity feedback.

Builds radial dot images and an optional orbit track. spin rotates the layer.

Positional order: `showOrbit` → `orbitColor` → `orbitFrom` → `sphereCount` → `sphereRadius` → `sphereBackground` → `sphereColor` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `showOrbit` | `boolean` | `true` | Show orbit |
| `orbitColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.33)` | Color |
| `orbitFrom` | `number` | `0` | Start<br>Unit: deg |
| `sphereCount` | `number` | `3` | Dot count |
| `sphereRadius` | `numberOrString` | `0.75` | Dot radius<br>Unit: `rem` |
| `sphereBackground` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | Dot background |
| `sphereColor` | `string` | `hsl(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l))` | Dot color |
| `outer` | `number` | Not supplied | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `75` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | Not supplied | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | `0.2rem` | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | `false` | Rotation<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Orbital spinner with spheres orbiting on a circular track.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Orbit',
        styles: ['layer.spinner.orbit(sphereCount:3;duration:3000;spin:normal)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Single sphere',
        styles: ['layer.spinner.orbit(sphereCount:1;sphereRadius:1.2rem;spin:normal;duration:2000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.object`

<a id="entry-layer-spinner-object"></a>

Object

Use repeated objects or text around a ring for optional decorative activity feedback.

Uses text characters first, then objectJAML, then objectHTML to create repeated content. spin controls orbital motion; content and rotation settings remain caller-owned.

Positional order: `objectCount` → `objectHTML` → `objectJAML` → `objectRotation` → `objectGap` → `objectFrom` → `objectDelay` → `text` → `objectSize` → `fontStyle` → `colorMap` → `colorMode` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `objectCount` | `number` | `3` | Object count |
| `objectHTML` | `arrayOrString` | `<div></div>` | HTML |
| `objectJAML` | `dictionary` | Not supplied | JAML |
| `objectRotation` | `numberOrString` | `0` | Self-rotation<br>Self-rotation duration: positive values rotate forward, negative values rotate backward; "auto" appears stationary. |
| `objectGap` | `number` | Not supplied | Gap<br>Unit: deg |
| `objectFrom` | `number` | `0` | Start<br>Unit: deg |
| `objectDelay` | `number` | `200` | Delay<br>Animation delay per object, multiplied by its order |
| `text` | `string` | Not supplied | Text |
| `objectSize` | `numberOrString` | Not supplied | Size<br>Unit: `rem` |
| `fontStyle` | `string` | `font-size:1.6rem` | Font style |
| `colorMap` | `array` | Not supplied | Color range |
| `colorMode` | `string` | `lch` | Mode<br>Options: `rgb`, `lch`, `hsl`, `lab`, `lrgb` |
| `outer` | `number` | Not supplied | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `100` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | Not supplied | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | `0` | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | `false` | Rotation<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `5000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `cubic-bezier(0.65, 0.19, 0.4, 0.84)` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |

Object/text carousel spinner. Spins text characters, HTML, or JAML objects around a ring.

Text content takes precedence over `objectHTML` and `objectJAML`.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Text spinner',
        styles: ['layer.spinner.object(text:LOADING;duration:4000;spin:normal;fontStyle:font-size:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Object spinner',
        styles: ['layer.spinner.object(objectCount:6;objectHTML:[⚡,🔥,💧,🌪️,❄️,🌈];duration:5000;spin:normal;objectSize:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.particles`

<a id="entry-layer-spinner-particles"></a>

particles

Use a circular particle effect for optional decorative activity feedback.

Creates a canvas particle effect during resize setup using the configured inner and outer radii; particle animation is separate from spin rotation.

Positional order: `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `outer` | `number` | `90` | Outer edge<br>Outer edge in %. Mutually exclusive with mid. When inner is also set, width need not be specified. |
| `mid` | `number` | `75` | Middle edge<br>Middle edge in %. Mutually exclusive with outer/inner; use with width. |
| `inner` | `number` | `70` | Inner edge<br>Inner edge in %. Mutually exclusive with mid. When outer is also set, width need not be specified. |
| `size` | `string` | `100%` | Dimensions<br>A non-square host makes the spinner elliptical. Specify size in a non-percentage unit to keep it circular. |
| `width` | `string` | Not supplied | Width<br>When width is specified, setting one of outer/mid/inner is sufficient. |
| `spin` | `booleanOrString` | `false` | Rotation<br>Options: `false` — None, `normal` — Clockwise, `reverse` — Counterclockwise |
| `duration` | `number` | `10000` | Duration |
| `delay` | `number` | `0` | Delay |
| `easing` | `string` | `linear` | Easing |
| `animateDeg` | `booleanOrNumber` | `false` | Animated rotation angle |
| `fixedBackground` | `boolean` | `false` | Fixed background |
| `radialMask` | `arrayOrString` | Not supplied | Radial mask<br>Radial mask defined by alternating visible/hidden lengths [visible, hidden, visible, hidden]; lengths accept any unit. |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
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
| `circular` | `boolean` | `true` | Circular |
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

Particle system spinner. Renders configurable particles in a circular layout.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Particles',
        styles: ['layer.spinner.particles(countRange:[8,16];sizeRange:[4,12];circular:true;spin:normal;duration:6000)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Sprinkles',
        styles: ['layer.spinner.particles(shape:sprinkle;countRange:[20,30];sizeRange:[6,10];circular:true;spin:normal;duration:4000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

---

## Interactive spinner with reactive controls

Orbit spinner controlled by live input bindings — count, speed, colors, and animation toggle:

```javascript jaml-playground
export default jaml.container(
    { styles: [Styles.layout.autoalign, 'css(gap:0.5rem)'] },
    [
        jaml.indicator('Orbit Spinner', {
            styles: [
                'css(position:relative;width:100%;height:10rem;backgroundColor:{{bg}};border-radius:1rem)',
                Styles.layer.spinner.orbit({
                    spin: '{{spin}}',
                    css: { aspectRatio: '1 / 1', width: 'auto', zIndex: 1 },
                    sphereColor: '{{fg}}',
                    duration: '{{duration}}',
                    sphereCount: '{{count}}'
                })
            ]
        }),
        jaml.input.number('Orbit Count', '{{count}}', { min: 0 }),
        jaml.input.number('Duration', '{{duration}}', { min: 0, step: 500 }),
        jaml.switch('Spin', '{{spin}}'),
        jaml.input.color('Sphere Color', '{{fg}}'),
        jaml.input.color('Background', '{{bg}}')
    ],
    { vars: { fg: jam.colorSet[2].css(), bg: jam.ac[3](1, 0.5, jam.lumiO(44)), duration: 2000, spin: true, count: 3 } }
);
```
