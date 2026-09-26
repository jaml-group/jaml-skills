# common.border

`Styles.border.*` — border styling.

---

## Variants

### `border`

Applies border width, style, color, and border-radius to an element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style border`.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["border(width:0.125rem;style:solid;color:var(--jam-ac-color);radius:0.5rem)"]
    }
]
```

The `radius` and `width` arguments accept the semantic scale names. They resolve through `--jam-border-radius-*` and `--jam-border-width-*` respectively.

```json jaml-playground
{
    "type": "card",
    "cap": "Theme geometry",
    "styles": ["border(radius:l;width:s;style:solid;color:primary)"]
}
```

### Semantic border presets

These no-argument presets apply a solid `--jam-border-width-xs` border whose color follows the active theme.

| Path                | Color token                     | Description                |
| ------------------- | ------------------------------- | -------------------------- |
| `border.highest`    | `--jam-color-surface-highest`   | Highest surface border     |
| `border.higher`     | `--jam-color-surface-higher`    | Higher surface border      |
| `border.default`    | `--jam-color-surface-default`   | Default surface border     |
| `border.lower`      | `--jam-color-surface-lower`     | Lower surface border       |
| `border.lowest`     | `--jam-color-surface-lowest`    | Lowest surface border      |
| `border.subtle`     | `--jam-color-outline-subtle`    | Subtle outline border      |
| `border.muted`      | `--jam-color-outline-muted`     | Muted outline border       |
| `border.faint`      | `--jam-color-outline-faint`     | Faint outline border       |
| `border.primary`    | `--jam-color-primary-subtle`    | Primary semantic border    |
| `border.secondary`  | `--jam-color-secondary-subtle`  | Secondary semantic border  |
| `border.tertiary`   | `--jam-color-tertiary-subtle`   | Tertiary semantic border   |
| `border.quaternary` | `--jam-color-quaternary-subtle` | Quaternary semantic border |

### Border-width presets

`border.xs`, `border.s`, `border.m`, `border.l`, and `border.xl` set only the border width from the matching `--jam-border-width-*` token. Apply one after a semantic border preset when both color and a wider stroke are needed.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["border.primary", "border.m"],
        "components": [{ "type": "label", "cap": "Primary border" }]
    }
]
```
