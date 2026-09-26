# common.padding

`Styles.padding.*` — padding sub-properties.

---

## Variants

### `padding`

Sets padding spacing on individual sides of an element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style padding`.

The padding shorthand overrides individual side values.

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
