# common.margin

`Styles.margin.*` -- margin sub-properties.

---

## Variants

### `margin`

Sets margin spacing on individual sides of an element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style margin`.

The margin shorthand overrides individual side values.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style margin.top`.

### `right`

Sets only the right margin.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style margin.right`.

### `bottom`

Sets only the bottom margin.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style margin.bottom`.

### `left`

Sets only the left margin.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style margin.left`.
