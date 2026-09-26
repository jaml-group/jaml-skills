# layer.spinner

`Styles.layer.spinner.*` — animated spinner/loader layer effects.

---

## Variants

### `spinner.background`

Rotating background layer. Spins a ring around the element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.spinner.background`.

Choose either `mid` or the separate inner/outer positioning controls.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.spinner.frets`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.spinner.comet`.

A comet background overrides the head/tail colors when supplied.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.spinner.orbit`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.spinner.object`.

Text content takes precedence over `objectHTML` and `objectJAML`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.spinner.particles`.

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
