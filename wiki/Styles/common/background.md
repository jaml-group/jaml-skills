# common.background

`Styles.background.*` — background styling with extended variants.

---

## Variants

### `background`

Base background with color, image, size, position, and repeat.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background`.

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

Applies a computed tint using the accent color. This established root path is an intensity effect; the compact CSS value `background:tint` instead resolves directly to `--jam-color-tint-default`. See [css / state-prefixed CSS](css.md#property-aware-token-values).

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.tint`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.gradient`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.gradient.corner`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.gradient.aurora`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.stripy`.

Explicit stops override the color/width/gap composition.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.bubbles`.

An explicit bubble count overrides the count range.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.grid`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style background.chess`.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.chess(color:var(--jam-ac-color);color2:transparent;size:25%)"],
        "components": [{ "type": "label", "cap": "Checkerboard" }]
    }
]
```
