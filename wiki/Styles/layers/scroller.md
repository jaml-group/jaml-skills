# layer.scroller

`Styles.layer.scroller.*` — auto-scrolling background layer effects.

---

## Variants

### `scroller`
Auto-scrolling background. Two background copies (primary and secondary) cycle to create a seamless scroll effect.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Scroll direction | Options: `'up'`, `'down'`, `'left'`, `'right'`. Default: `'down'` |
| `scroll` | `boolean` | Enable scrolling | Default: `false` |
| `fromStart` | `boolean` | Start from beginning | Default: `false` |
| `duration` | `number \| string` | Scroll animation duration in ms | Default: `10000` |
| `easing` | `string` | CSS easing function | Default: `'linear'` |
| `color` | `string` | Background color | — |
| `image` | `array \| string` | Background image | — |
| `position` | `array \| string` | Background position | — |
| `size` | `array \| string` | Background size | — |
| `repeat` | `array \| string` | Background repeat | — |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller(direction:up;scroll:true;duration:12000;color:var(--jam-ac-color);opacity:0.08)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Scrolling up" }]
    },
    {
        "type": "wrapper",
        "styles": ["layer.scroller(direction:left;scroll:true;duration:8000;color:hsla(0,0%,100%,0.05))", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Scrolling left" }]
    }
]
```

### `scroller.text`
Scrolling text content. Splits text characters and scrolls them across the background.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `content` | `string` | Text content to scroll | Default: `'Hello World'` |
| `direction` | `string` | Scroll direction | Options: `'up'`, `'down'`, `'left'`, `'right'`. Default: `'down'` |
| `scroll` | `boolean` | Enable scrolling | Default: `false` |
| `fromStart` | `boolean` | Start from beginning | Default: `false` |
| `duration` | `number \| string` | Duration in ms (or `'auto'` to calculate from content length) | Default: `'auto'` |
| `easing` | `string` | CSS easing | Default: `'linear'` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.text(content:JAM UI;scroll:true;direction:up;duration:auto;opacity:0.1)", "css(position:relative;width:20rem;height:20rem;padding:1rem;font-size:2rem)"],
        "components": [{ "type": "label", "cap": "Scrolling text" }]
    }
]
```

### `scroller.particles`
Scrolling particle system. Configurable particles that animate across the background.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Scroll direction | Options: `'up'`, `'down'`, `'left'`, `'right'`. Default: `'down'` |
| `scroll` | `boolean` | Enable scrolling | Default: `false` |
| `duration` | `number \| string` | Duration in ms | Default: `10000` |
| `countRange` | `array` | Particle count range | — |
| `sizeRange` | `array` | Particle size range | — |
| `shape` | `string \| function` | Particle shape | — |
| `distribution` | `string` | Distribution method | Options: `'random'`, `'halton'`, `'gaussian'`, `'fill'` |
| `hueRange` | `array` | Hue range | — |
| `satuRange` | `array` | Saturation range | — |
| `lumiRange` | `array` | Luminosity range | — |
| `alphaRange` | `array` | Alpha range | — |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.particles(scroll:true;direction:up;duration:10000;countRange:[10,20];sizeRange:[4,12];shape:circle;alphaRange:[0.2,0.6])", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Particle scroll" }]
    }
]
```

### `scroller.bubbles`
Scrolling bubble particles. A preset particle system with bubble-shaped particles drifting upward.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Scroll direction | Default: `'up'` |
| `scroll` | `boolean` | Enable scrolling | Default: `false` |
| `duration` | `number \| string` | Duration in ms | Default: `10000` |
| `shape` | `string` | Particle shape | Default: `'bubble'` |
| `alphaRange` | `array` | Alpha range | Default: `[0, 0.5]` |
| `sizeRange` | `array` | Size range | Default: `['5%', '10%']` |
| `blurRange` | `array` | Blur range | Default: `[0, '5%']` |
| `factorRange` | `array` | Size factor range for bubble variation | Default: `[0.9, 1]` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.bubbles(scroll:true;duration:16000)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Bubbles" }]
    }
]
```

### `scroller.stripy`
Scrolling stripy (striped) background. Alternating colored stripes that scroll seamlessly.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Scroll direction | Options: `'up'`, `'down'`, `'left'`, `'right'`. Default: `'down'` |
| `scroll` | `boolean` | Enable scrolling | Default: `false` |
| `duration` | `number \| string` | Duration in ms | Default: `10000` |
| `alignStripy` | `boolean` | Auto-align stripes to element dimensions | Default: `true` |
| `convertWidth` | `boolean` | Convert width units automatically | Default: `true` |
| `deg` | `number` | Stripe angle in deg | Default: `135` |
| `color` | `string` | Stripe color | Default: `ac()` |
| `width` | `string` | Stripe width | Default: `'5%'` |
| `gap` | `string` | Stripe gap | — |
| `stops` | `array` | Custom stripe stops | Default: `['transparent', '0.15rem', ac(...), '0.15rem']` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.stripy(scroll:true;direction:right;duration:8000;deg:45;width:3rem)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Stripy scroll" }]
    }
]
```

### `scroller.grid`
Scrolling grid background. A repeating grid pattern that scrolls.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Scroll direction | Options: `'up'`, `'down'`, `'left'`, `'right'`. Default: `'down'` |
| `scroll` | `boolean` | Enable scrolling | Default: `false` |
| `duration` | `number \| string` | Duration in ms | Default: `10000` |
| `deg` | `number \| string` | Grid angle | Default: `90deg` |
| `color` | `string` | Grid line color | Default: `ac()` |
| `width` | `string` | Grid line width | Default: `'0.0625rem'` |
| `gap` | `string` | Grid gap | Default: `'3.125rem'` |
| `size` | `string` | Grid size (overrides width) | — |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["layer.scroller.grid(scroll:true;direction:down;duration:12000;gap:2rem)", "css(position:relative;width:20rem;height:20rem)"],
        "components": [{ "type": "label", "cap": "Grid scroll" }]
    }
]
```
