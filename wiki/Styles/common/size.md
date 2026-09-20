# common.size

`Styles.size.*` -- element sizing.

---

## Variants

### `size`

Sets element width, height, and related dimension properties.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Element width CSS value | -- |
| `height` | `string` | Element height CSS value | -- |
| `minWidth` | `string` | Minimum width | -- |
| `maxWidth` | `string` | Maximum width | -- |
| `minHeight` | `string` | Minimum height | -- |
| `maxHeight` | `string` | Maximum height | -- |
| `size` | `string` | Shorthand for width/height. Single value (e.g. `"10rem"`) sets both equally. Comma or space-separated pair (e.g. `"10rem,20rem"`) sets width then height | Overrides individual width/height values |

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["size(width:300px;height:200px)"]
    }
]
```

### `fullscreen`

Sets the element to 100vw &times; 100vh (full viewport).

### `fullsize`

Sets the element to 100% width &times; 100% height of its parent.

### `fullheight`

Sets the element height to 100% of its parent.

### `fullwidth`

Sets the element width to 100% of its parent.

### `square`

Sets aspect ratio to 1:1.
