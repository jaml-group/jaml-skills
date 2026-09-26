# layer.background

`Styles.layer.background.*` — background layer with common background options.

Wraps `common/background` options in a layer context. Supports all standard background properties plus layer positioning.

---

## Variants

### `background`

Basic background with standard CSS background properties.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.tint`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.gradient`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.gradient.corner`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.gradient.aurora`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.stripy`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.bubbles`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.grid`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.background.chess`.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.background.chess(size:2rem)"],
        "components": [{ "type": "label", "cap": "Chess" }]
    }
]
```
