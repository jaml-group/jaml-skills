# layer.background

`Styles.layer.background.*` — background layer with common background options.

Wraps `common/background` options in a layer context. Supports all standard background properties plus layer positioning.

---

## Variants

### `background`
Basic background with standard CSS background properties.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Background color | CSS `backgroundColor` |
| `image` | `array \| string` | Background image | CSS `backgroundImage` |
| `position` | `array \| string` | Background position | CSS `backgroundPosition` |
| `size` | `array \| string` | Background size | CSS `backgroundSize` |
| `repeat` | `array \| string` | Background repeat | CSS `backgroundRepeat` |
| `attachment` | `string` | Background attachment | CSS `backgroundAttachment` |
| `background` | `array \| string` | Shorthand background value | CSS `background` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background(color:var(--jam-ac-color);opacity:0.1)"],
        "components": [{ "type": "label", "cap": "Tinted background" }]
    },
    {
        "type": "card",
        "styles": ["layer.background(image:linear-gradient(45deg,red,blue);opacity:0.3)"],
        "components": [{ "type": "label", "cap": "Gradient background" }]
    }
]
```

### `background.tint`
Subtle color tint overlay.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `intense` | `number` | Tint intensity | Default: `0.015`. Shorthand arg |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.tint(intense:0.03)"],
        "components": [{ "type": "label", "cap": "Tinted" }]
    }
]
```

### `background.crystal`
Crystal/glass-like background effect. No args.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.crystal"],
        "components": [{ "type": "label", "cap": "Crystal" }]
    }
]
```

### `background.glassify`
Frosted glass effect with blur and gradient.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.glassify"],
        "components": [{ "type": "label", "cap": "Glass" }]
    }
]
```

### `background.gradient`
Smooth multi-stop gradient background.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `string` | Gradient direction | Default: `'to bottom'` |
| `stops` | `array` | Gradient color stops | Default: 4-stop gradient |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.gradient"],
        "components": [{ "type": "label", "cap": "Gradient" }]
    }
]
```

### `background.gradient.corner`
Corner gradient from transparent to accent color.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number` | Gradient angle | Default: `166deg` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.gradient.corner"],
        "components": [{ "type": "label", "cap": "Corner gradient" }]
    }
]
```

### `background.gradient.aurora`
Aurora-style gradient from transparent to accent.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number` | Gradient angle | Default: `-15deg` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.gradient.aurora"],
        "components": [{ "type": "label", "cap": "Aurora" }]
    }
]
```

### `background.gradient.concave`
Concave/depressed gradient effect. No args.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.gradient.concave"],
        "components": [{ "type": "label", "cap": "Concave" }]
    }
]
```

### `background.stripy`
Diagonal stripe pattern.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number` | Stripe angle | Default: `135deg` |
| `color` | `string` | Stripe color | Default: `ac(1, 1, lumiO(40), 0.25)` |
| `width` | `string` | Stripe width | — |
| `gap` | `string` | Stripe gap | — |
| `stops` | `array` | Custom color stops | Default: 4-stop pattern |
| `fixed` | `boolean` | Fixed background attachment | Default: `false` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.stripy(deg:45;width:0.5rem)"],
        "components": [{ "type": "label", "cap": "Stripy" }]
    }
]
```

### `background.bubbles`
Bubble pattern overlay.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `bubbleSize` | `number \| string` | Base bubble size | Default: `1rem` |
| `bubbleCount` | `number \| string` | Number of bubbles | — |
| `countRange` | `array` | Bubble count range | — |
| `sizeRange` | `array` | Bubble size range | — |
| `blurRange` | `array` | Blur range | — |
| `alphaRange` | `array` | Alpha range | — |
| `hueRange` | `array` | Hue range | — |
| `satuRange` | `array` | Saturation range | — |
| `lumiRange` | `array` | Luminosity range | — |
| `allowOverflowX` | `boolean` | Allow horizontal overflow | — |
| `allowOverflowY` | `boolean` | Allow vertical overflow | — |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.bubbles(bubbleSize:1.5rem;bubbleCount:8)"],
        "components": [{ "type": "label", "cap": "Bubbles" }]
    }
]
```

### `background.ribbon`
Ribbon-shaped background with clip path. No args.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.ribbon"],
        "components": [{ "type": "label", "cap": "Ribbon bg" }]
    }
]
```

### `background.grid`
Repeating grid pattern.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number \| string` | Grid angle | Default: `90deg` |
| `color` | `string` | Grid line color | Default: `ac(1, 0.1, lumiO(10), 0.075)` |
| `width` | `string` | Line width | Default: `'0.0625rem'` |
| `gap` | `string` | Grid gap | Default: `'3.125rem'` |
| `gapX` | `string` | Horizontal grid gap | Defaults to `gap` |
| `gapY` | `string` | Vertical grid gap | Defaults to `gap` |
| `size` | `string` | Grid cell size | Computes both gaps from size minus line width |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.grid(gap:2rem)"],
        "components": [{ "type": "label", "cap": "Grid" }]
    }
]
```

### `background.chess`
Checkerboard/chess pattern.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Primary color | Default: `ac(1, 0.5, 1, 0.05)` |
| `color2` | `string` | Secondary color | Default: `'transparent'` |
| `color3` | `string` | Third color | — |
| `color4` | `string` | Fourth color | — |
| `size` | `string` | Cell size | Default: `'25%'` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.chess(size:2rem)"],
        "components": [{ "type": "label", "cap": "Chess" }]
    }
]
```
