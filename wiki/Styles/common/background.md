# common.background

`Styles.background.*` — background styling with extended variants.

---

## Variants

### `background`

Base background with color, image, size, position, and repeat.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `image` | `string\|array` | Background image URL or CSS gradient | — |
| `position` | `string\|array` | Background position | e.g. `center` |
| `size` | `string\|array` | Background size | `cover`, `contain`, or CSS value |
| `repeat` | `string\|array` | Background repeat | `repeat`, `no-repeat` |
| `attachment` | `string` | Background attachment | `scroll`, `fixed`, `local` |
| `color` | `string` | Background color | Any CSS color value |
| `background` | `string\|array` | Shorthand for all background CSS | CSS shorthand value |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.primary", "color.on.primary"],
        "components": [{ "type": "label", "cap": "Solid background" }]
    }
]
```

### Semantic background presets

These no-argument paths set a theme-owned colored or surface background. When a colored family is used as the background, pair it with the matching `color.on.*` foreground.

| Path | Color token | Description |
|---|---|---|
| `background.primary` | `--jam-color-primary-default` | Primary colored background |
| `background.secondary` | `--jam-color-secondary-default` | Secondary colored background |
| `background.tertiary` | `--jam-color-tertiary-default` | Tertiary colored background |
| `background.quaternary` | `--jam-color-quaternary-default` | Quaternary colored background |
| `background.neutral` | `--jam-color-neutral-default` | Neutral colored background |
| `background.elevated` | `--jam-color-elevated-default` | Elevated surface treatment |
| `background.highest` | `--jam-color-surface-highest` | Highest surface level |
| `background.higher` | `--jam-color-surface-higher` | Higher surface level |
| `background.default` | `--jam-color-surface-default` | Default surface level |
| `background.lower` | `--jam-color-surface-lower` | Lower surface level |
| `background.lowest` | `--jam-color-surface-lowest` | Lowest surface level |

### `tint`

Applies a computed tint using the accent color. This established root path is an intensity effect; the compact CSS value `background:tint` instead resolves directly to `--jam-color-tint-default`. See [css / state-prefixed CSS](css.md#property-aware-token-values).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `intense` | `number` | Tint intensity | Default: `0.015` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.tint(intense:0.02)"],
        "components": [{ "type": "label", "cap": "Tinted" }]
    }
]
```

### `crystal`

Crystal effect via a CSS class (`background-crystal`). No arguments.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.crystal()"],
        "components": [{ "type": "label", "cap": "Crystal" }]
    }
]
```

### `glassify`

Glass morphism background with blur and opacity. No arguments; applies preset glass styles.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.glassify()"],
        "components": [{ "type": "label", "cap": "Glass morphism" }]
    }
]
```

### `gradient`

Standard gradient background.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number\|string` | Gradient angle | e.g. `135`, `45deg` |
| `arg` | `string` | Position / shape parameter | e.g. `circle at center` |
| `stops` | `array` | Color stops with positions | Default preset |
| `type` | `string` | Gradient type | `linear`, `radial`, `conic`, `repeatingLinear`, `repeatingRadial`, `repeatingConic` (default: `linear`) |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["background.gradient(deg:180;type:linear)"],
        "components": [{ "type": "label", "cap": "Gradient bg" }]
    }
]
```

### `gradient.corner`

Corner gradient with a subtle highlight angle.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number` | Angle of the corner gradient | Default: `166` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["background.gradient.corner(deg:160)"],
        "components": [{ "type": "label", "cap": "Corner gradient" }]
    }
]
```

### `gradient.aurora`

Aurora-like gradient with a shallow angle.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number` | Angle of the aurora gradient | Default: `-15` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["background.gradient.aurora(deg:-15)"],
        "components": [{ "type": "label", "cap": "Aurora" }]
    }
]
```

### `gradient.concave`

Concave / depth gradient with a radial shadow effect. No arguments.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["background.gradient.concave()"],
        "components": [{ "type": "label", "cap": "Concave" }]
    }
]
```

### `stripy`

Striped pattern background.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number` | Stripe angle in degrees | Default: `135` |
| `color` | `string` | Stripe color | Default accent color |
| `width` | `string` | Stripe width | e.g. `0.25rem` |
| `gap` | `string` | Gap between stripes | Defaults to `width` |
| `stops` | `array` | Custom color and width stops | Overrides `color`/`width`/`gap` |
| `fixed` | `boolean` | Fixed attachment | Default: `false` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.stripy(deg:135;color:var(--jam-ac-color);width:0.25rem)"],
        "components": [{ "type": "label", "cap": "Stripes" }]
    }
]
```

### `bubbles`

Bubble pattern background using multiple radial gradients.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `bubbleSize` | `number\|string` | Base bubble size | Default: `1rem` |
| `bubbleCount` | `number\|string` | Fixed bubble count | Overrides `countRange` |
| `countRange` | `array` | Count range `[min, max]` | Random count in range |
| `sizeRange` | `array` | Size multiplier range | Default: `[0.75, 1.25]` |
| `blurRange` | `array` | Blur multiplier range | Default: `[0.25, 2.5]` |
| `alphaRange` | `array` | Alpha/opacity range | Default: `[0, 0.75]` |
| `hueRange` | `array` | Hue shift range in degrees | Default: `[-30, 30]` |
| `satuRange` | `array` | Saturation multiplier range | Default: `[1, 1]` |
| `lumiRange` | `array` | Luminosity multiplier range | Default: `[1, 1]` |
| `allowOverflowY` | `boolean` | Allow vertical overflow | — |
| `allowOverflowX` | `boolean` | Allow horizontal overflow | — |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.bubbles(bubbleSize:1;bubbleCount:15)"],
        "components": [{ "type": "label", "cap": "Bubbles" }]
    }
]
```

### `ribbon`

Ribbon pattern with a clipped polygon shape and gradient. No arguments.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.ribbon()"],
        "components": [{ "type": "label", "cap": "Ribbon" }]
    }
]
```

### `grid`

Grid pattern background with perpendicular lines.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `deg` | `number\|string` | Grid rotation angle | Default: `90` |
| `color` | `string` | Grid line color | Default accent color |
| `width` | `string` | Grid line width | Default: `0.0625rem` |
| `gap` | `string` | Spacing between grid lines | Default: `3.125rem` |
| `gapX` | `string` | Horizontal grid spacing | Defaults to `gap` |
| `gapY` | `string` | Vertical grid spacing | Defaults to `gap` |
| `size` | `string` | Grid cell size (overrides `gap`) | Computes from size minus width |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.grid(gap:3rem;color:rgba(255,255,255,0.1);width:1px)"],
        "components": [{ "type": "label", "cap": "Grid pattern" }]
    }
]
```

### `chess`

Checkerboard pattern background.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | First cell color | Default accent color |
| `color2` | `string` | Second cell color | Default: `transparent` |
| `color3` | `string` | Third cell color | Defaults to `color` |
| `color4` | `string` | Fourth cell color | Defaults to `color2` |
| `size` | `string` | Cell size | Default: `25%` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.chess(color:var(--jam-ac-color);color2:transparent;size:25%)"],
        "components": [{ "type": "label", "cap": "Checkerboard" }]
    }
]
```
