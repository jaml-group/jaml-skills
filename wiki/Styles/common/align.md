# common.align

`Styles.align.*` — flexbox alignment for individual children.

---

## Variants

### `align`

Sets alignment properties for flex/grid children.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `alignSelf` | `string` | Cross-axis alignment override | `stretch`, `center`, `baseline`, `flex-end`, `flex-start` |
| `alignItems` | `string` | Cross-axis children alignment | `stretch`, `center`, `baseline`, `flex-end`, `flex-start` |
| `alignContent` | `string` | Multi-line cross-axis distribution | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` |
| `justifySelf` | `string` | Main-axis alignment override | `stretch`, `center`, `baseline`, `flex-end`, `flex-start` |
| `justifyItems` | `string` | Main-axis children alignment | `stretch`, `center`, `baseline`, `flex-end`, `flex-start` |
| `justifyContent` | `string` | Main-axis content distribution | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` |
| `align` | `string` | Shorthand setting both axes | `left-top`, `center-top`, `right-top`, `left-middle`, `center-middle`, `right-middle`, `left-bottom`, `center-bottom`, `right-bottom`, `around-top`, `around-middle`, `around-bottom`, `evenly-top`, `evenly-middle`, `evenly-bottom`, `between-top`, `between-middle`, `between-bottom` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Centered",
        "styles": ["align(alignSelf:center)"]
    }
]
```
