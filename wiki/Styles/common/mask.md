# common.mask

`Styles.mask.*` -- CSS mask-image properties.

---

## Variants

### `mask`

Applies a CSS mask image to an element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `mask` | `string` | Mask image CSS value | e.g. `linear-gradient(black, transparent)`. Shorthand arg. |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Masked",
        "styles": ["mask(mask:linear-gradient(black, transparent))"]
    }
]
```

### `gradient`

Applies a gradient mask to the element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Gradient type | `linear` (default), `radial`, `conic`, `repeatingLinear`, `repeatingRadial`, `repeatingConic` |
| `deg` | `string` | Gradient angle | Default: `calc(var(--jam-background-deg var(--jam-mask-deg, 180deg)) - 90deg)` |
| `arg` | `string` | Position parameters | Additional gradient position args |
| `stops` | `array` | Color stops | Default: `[black, transparent 60%]` |
