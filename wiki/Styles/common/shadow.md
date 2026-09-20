# common.shadow

`Styles.shadow.*` -- box shadow styling.

---

## Variants

### `shadow`

Applies a box-shadow to an element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `shadow` | `string` | Box shadow CSS value | Shorthand arg. e.g. `0 0.25rem 0.5rem rgba(0,0,0,0.2)` |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["shadow(0 0.25rem 0.5rem rgba(0,0,0,0.2))"]
    }
]
```

### Token shadow presets

The preset paths resolve through the active theme's shadow tokens.

| Paths | CSS property | Scale |
|---|---|---|
| `shadow.xs`, `shadow.s`, `shadow.m`, `shadow.l`, `shadow.xl` | `box-shadow` | Neutral `xs` through `xl` |
| `shadow.primary.xs`, `shadow.primary.s`, `shadow.primary.m`, `shadow.primary.l`, `shadow.primary.xl` | `box-shadow` | Primary-colored `xs` through `xl` |
| `shadow.text.xs`, `shadow.text.s`, `shadow.text.m` | `text-shadow` | Neutral `xs` through `m` |
| `shadow.text.primary.xs`, `shadow.text.primary.s`, `shadow.text.primary.m` | `text-shadow` | Primary-colored `xs` through `m` |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Theme shadow",
        "styles": ["shadow.m"]
    }
]
```

### `sphere`

Applies a 3D sphere shadow preset.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["shadow.sphere", "css(padding:1rem)"],
        "components": [{ "type": "label", "cap": "Sphere shadow" }]
    }
]
```
