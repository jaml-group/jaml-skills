# layer.spinner

`Styles.layer.spinner.*` — animated spinner/loader layer effects.

---

## Variants

### `spinner.background`
Rotating background layer. Spins a ring around the element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `background` | `string` | Ring background color | Default: `ac(1, 1, 1, 0.33)` |
| `backgroundMask` | `string` | Mask over the background | — |
| `outer` | `number` | Outer edge position in % | Mutually exclusive with `mid` |
| `mid` | `number` | Midline position in % | Default: `75`. Use with `width` |
| `inner` | `number` | Inner edge position in % | Mutually exclusive with `mid` |
| `width` | `string` | Ring width | Default: `'4rem'` |
| `size` | `string` | Overall spinner size | Default: `'100%'` |
| `spin` | `boolean \| string` | Spin direction | Options: `false`, `'normal'`, `'reverse'`. Default: `false` |
| `duration` | `number` | Spin duration in ms | Default: `10000` |
| `easing` | `string` | CSS easing function | Default: `'linear'` |
| `radialMask` | `array \| string` | Radial mask stops | — |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Loading",
        "styles": ["layer.spinner.background(spin:normal;duration:8000;width:3rem)", "css(position:relative;width:10rem;height:10rem)"]
    },
    {
        "type": "indicator",
        "cap": "Slow spin",
        "styles": ["layer.spinner.background(background:var(--jam-ac-color);spin:reverse;duration:15000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `spinner.frets`
Segmented fret/guitar-fret spinner with individually colored segments.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `fretWidth` | `number \| string` | Fret width in deg | — |
| `fretGap` | `number \| string` | Gap between frets in deg | Default: `10.5` |
| `fretCount` | `number` | Number of frets | — |
| `fretBackground` | `string` | Fret background (color/gradient/image) | Default: `ac()` |
| `fretFrom` | `number` | Starting offset in deg | — |
| `fretColors` | `array` | Per-fret colors (limited by `fretCount`) | — |
| `outer` | `number` | Outer edge in % | — |
| `mid` | `number` | Midline in % | Default: `75` |
| `inner` | `number` | Inner edge in % | — |
| `width` | `string` | Ring width | Default: `'1rem'` |
| `size` | `string` | Spinner size | Default: `'100%'` |
| `spin` | `boolean \| string` | Spin direction | Options: `false`, `'normal'`, `'reverse'` |
| `duration` | `number` | Duration in ms | Default: `10000` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Fret spinner",
        "styles": ["layer.spinner.frets(fretCount:8;fretWidth:3;spin:normal;duration:6000;width:2rem)", "css(position:relative;width:10rem;height:10rem)"]
    },
    {
        "type": "indicator",
        "cap": "Colorful frets",
        "styles": ["layer.spinner.frets(fretCount:6;fretColors:[red,orange,yellow,green,blue,purple];spin:normal;duration:8000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `spinner.comet`
Comet-tail spinner with a glowing head and fading tail.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `cometLength` | `number` | Comet tail length in % | Default: `100` |
| `tailColor` | `string` | Tail color | Default: `ac(1, 1, 1, 0.5)` |
| `headColor` | `string` | Head color | Default: `ac(1, 1.5, lumiO(15), 0.85)` |
| `cometBackground` | `string` | Background behind comet | Overrides head/tail colors if set |
| `cometBlur` | `number` | Blur radius in px | Default: `0` |
| `cometFrom` | `number` | Starting angle in deg | Default: `0` |
| `roundHead` | `boolean` | Round head | Default: `true` |
| `roundTail` | `boolean` | Round tail | Default: `false` |
| `animateLength` | `boolean \| array` | Animate comet length | Default: `false`. Array for `[min, max]` range |
| `width` | `string` | Ring width | Default: `'1rem'` |
| `spin` | `boolean \| string` | Spin direction | Options: `false`, `'normal'`, `'reverse'` |
| `duration` | `number` | Duration in ms | Default: `10000` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Comet",
        "styles": ["layer.spinner.comet(cometLength:80;spin:normal;duration:4000;width:2rem)", "css(position:relative;width:10rem;height:10rem)"]
    },
    {
        "type": "indicator",
        "cap": "Pulsing comet",
        "styles": ["layer.spinner.comet(animateLength:true;spin:normal;width:1.5rem)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `spinner.orbit`
Orbital spinner with spheres orbiting on a circular track.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `showOrbit` | `boolean` | Show the orbit track | Default: `true` |
| `orbitColor` | `string` | Orbit track color | Default: `ac(1, 1, 1, 0.33)` |
| `orbitFrom` | `number` | Starting angle in deg | Default: `0` |
| `sphereCount` | `number` | Number of spheres | Default: `3` |
| `sphereRadius` | `number \| string` | Sphere radius | Default: `0.75rem` |
| `sphereBackground` | `string` | Sphere background | Default: `ac(1, 1, 1, 0.5)` |
| `sphereColor` | `string` | Sphere color | Default: `ac(1, 1, 1)` |
| `width` | `string` | Orbit track width | Default: `'0.2rem'` |
| `spin` | `boolean \| string` | Spin direction | Options: `false`, `'normal'`, `'reverse'` |
| `duration` | `number` | Duration in ms | Default: `10000` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Orbit",
        "styles": ["layer.spinner.orbit(sphereCount:3;duration:3000;spin:normal)", "css(position:relative;width:10rem;height:10rem)"]
    },
    {
        "type": "indicator",
        "cap": "Single sphere",
        "styles": ["layer.spinner.orbit(sphereCount:1;sphereRadius:1.2rem;spin:normal;duration:2000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `spinner.object`
Object/text carousel spinner. Spins text characters, HTML, or JAML objects around a ring.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `text` | `string` | Text to split into spinning characters | Overrides `objectHTML` and `objectJAML` |
| `objectCount` | `number` | Number of objects | Default: `3` |
| `objectHTML` | `array \| string` | HTML for each object | Default: `'<div></div>'` |
| `objectJAML` | `dictionary` | JAML definition for each object | — |
| `objectRotation` | `number \| string` | Self-rotation duration; positive=clockwise, negative=counter, `'auto'`=stationary | Default: `0` |
| `objectGap` | `number` | Gap between objects in deg | Calculated from count if not set |
| `objectFrom` | `number` | Starting angle in deg | Default: `0` |
| `objectDelay` | `number` | Per-object animation delay in ms | Default: `200` |
| `objectSize` | `number \| string` | Object size in rem | — |
| `fontStyle` | `string` | CSS font style string | Default: `'font-size:1.6rem'` |
| `colorMap` | `array` | Color range for text objects | — |
| `colorMode` | `string` | Chroma color mode for `colorMap` | — |
| `spin` | `boolean \| string` | Spin direction | Options: `false`, `'normal'`, `'reverse'` |
| `duration` | `number` | Duration in ms | Default: `5000` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Text spinner",
        "styles": ["layer.spinner.object(text:LOADING;duration:4000;spin:normal;fontStyle:font-size:2rem)", "css(position:relative;width:10rem;height:10rem)"]
    },
    {
        "type": "indicator",
        "cap": "Object spinner",
        "styles": ["layer.spinner.object(objectCount:6;objectHTML:[⚡,🔥,💧,🌪️,❄️,🌈];duration:5000;spin:normal;objectSize:2rem)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `spinner.particles`
Particle system spinner. Renders configurable particles in a circular layout.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `countRange` | `array` | Particle count range `[min, max]` | — |
| `sizeRange` | `array` | Particle size range | — |
| `blurRange` | `array` | Blur range for particles | — |
| `rotateRange` | `array` | Rotation range | — |
| `shape` | `string \| function` | Particle shape | Options vary (circle, square, triangle, etc.) |
| `distribution` | `string` | Distribution method | Options: `'random'`, `'halton'`, `'gaussian'`, `'fill'`. Default: `'random'` |
| `hueRange` | `array` | Hue range for colors | — |
| `satuRange` | `array` | Saturation range | — |
| `lumiRange` | `array` | Luminosity range | — |
| `alphaRange` | `array` | Alpha transparency range | — |
| `circular` | `boolean` | Circular layout | — |
| `inner` | `number` | Inner radius edge in % | Default: `70` |
| `outer` | `number` | Outer radius edge in % | Default: `90` |
| `spin` | `boolean \| string` | Spin direction | Options: `false`, `'normal'`, `'reverse'` |
| `duration` | `number` | Duration in ms | Default: `10000` |

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Particles",
        "styles": ["layer.spinner.particles(countRange:[8,16];sizeRange:[4,12];circular:true;spin:normal;duration:6000)", "css(position:relative;width:10rem;height:10rem)"]
    },
    {
        "type": "indicator",
        "cap": "Sprinkles",
        "styles": ["layer.spinner.particles(shape:sprinkle;countRange:[20,30];sizeRange:[6,10];circular:true;spin:normal;duration:4000)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
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
