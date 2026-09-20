# common.padding

`Styles.padding.*` — padding sub-properties.

---

## Variants

### `padding`

Sets padding spacing on individual sides of an element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `top` | `string` | Top padding | — |
| `right` | `string` | Right padding | — |
| `bottom` | `string` | Bottom padding | — |
| `left` | `string` | Left padding | — |
| `padding` | `string` | Shorthand for all sides | Overrides individual side values |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["padding(top:1rem;left:1rem;right:1rem;bottom:0.5rem)"]
    }
]
```

### Token scale presets

`padding.xxs`, `padding.xs`, `padding.s`, `padding.m`, `padding.l`, `padding.xl`, and `padding.xxl` set all sides from the matching `--jam-space-*` token.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Token-spaced",
        "styles": ["padding.m"]
    }
]
```
