# common.size

`Styles.size.*` -- element sizing.

---

## Variants

### `size`

Sets element width, height, and related dimension properties.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style size`.

The size shorthand overrides individual width and height values.

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
