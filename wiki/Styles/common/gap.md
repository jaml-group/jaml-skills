# common.gap

`Styles.gap.*` — row and column gap spacing.

---

## Variants

### `gap`

Sets the CSS gap between rows and columns.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `gap` | `string` | Row and column gap shorthand | Shorthand arg |
| `row` | `string` | Row gap | Maps to `row-gap` |
| `col` | `string` | Column gap | Maps to `column-gap` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(display:flex)", "gap(row:0.5rem;col:1rem)"],
        "components": [
            { "type": "label", "cap": "One" },
            { "type": "label", "cap": "Two" }
        ]
    }
]
```

### Token scale presets

`gap.xxs`, `gap.xs`, `gap.s`, `gap.m`, `gap.l`, `gap.xl`, and `gap.xxl` set both axes from the matching `--jam-space-*` token.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(display:flex)", "gap.m"],
        "components": [
            { "type": "label", "cap": "One" },
            { "type": "label", "cap": "Two" }
        ]
    }
]
```

### `row` and `col`

The atomic paths `gap.row(value)` and `gap.col(value)` set one axis only.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `value` | `string` | Gap CSS value | Shorthand |
