# common.margin

`Styles.margin.*` -- margin sub-properties.

---

## Variants

### `margin`

Sets margin spacing on individual sides of an element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `top` | `string` | Top margin | -- |
| `right` | `string` | Right margin | -- |
| `bottom` | `string` | Bottom margin | -- |
| `left` | `string` | Left margin | -- |
| `margin` | `string` | Shorthand for all sides | Overrides individual side values |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Spaced",
        "styles": ["margin(top:1rem;bottom:0.5rem)"]
    }
]
```

### Token scale presets

`margin.xxs`, `margin.xs`, `margin.s`, `margin.m`, `margin.l`, `margin.xl`, and `margin.xxl` set all sides from the matching `--jam-space-*` token.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Token-spaced",
        "styles": ["margin.m"]
    }
]
```

### `top`

Sets only the top margin.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `value` | `string` | Top margin CSS value | -- |

### `right`

Sets only the right margin.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `value` | `string` | Right margin CSS value | -- |

### `bottom`

Sets only the bottom margin.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `value` | `string` | Bottom margin CSS value | -- |

### `left`

Sets only the left margin.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `value` | `string` | Left margin CSS value | -- |
