# options

`Styles.options.*` -- option group elements for radio buttons, checkboxes, and selection lists.

---

## Variants

### `options.vertical`
Arranges options in a vertical column layout instead of the default horizontal flow.

```json jaml-playground
[
    {
        "type": "options",
        "styles": ["options.vertical", "options.stripy"],
        "data": [
            { "name": "Option A", "value": "a" },
            { "name": "Option B", "value": "b" }
        ]
    }
]
```

### `options.stripy`
Adds alternating zebra-stripe background colors to option rows for improved readability.

```json jaml-playground
[
    {
        "type": "options",
        "styles": ["options.stripy"],
        "data": [
            { "name": "Apple", "value": "apple" },
            { "name": "Banana", "value": "banana" },
            { "name": "Cherry", "value": "cherry" }
        ]
    }
]
```

### `options.hidebox`
Hides the selection checkbox or radio box, showing only the option name label.

```json jaml-playground
[
    {
        "type": "options",
        "styles": ["options.hidebox"],
        "data": [
            { "name": "Red", "value": "red" },
            { "name": "Green", "value": "green" },
            { "name": "Blue", "value": "blue" }
        ]
    }
]
```
