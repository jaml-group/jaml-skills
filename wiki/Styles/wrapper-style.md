# wrapper

`Styles.wrapper.*` -- generic container elements that compose layouts with children.

Wrapper inherits all container layout/grid basics plus `container.innershadow` and `container.childcount`.

---

## Variants

### `wrapper.vertical`
Arranges children in a vertical column layout instead of the default horizontal flow.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["wrapper.vertical"],
        "components": [
            { "type": "label", "cap": "Item 1" },
            { "type": "label", "cap": "Item 2" },
            { "type": "label", "cap": "Item 3" }
        ]
    }
]
```

### `wrapper.wraplabel`
Wraps children with a label that sits at the top or around the wrapper boundary.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Settings",
        "styles": ["wrapper.wraplabel"],
        "components": [
            { "type": "switch", "cap": "Enable notifications" },
            { "type": "switch", "cap": "Dark mode" }
        ]
    }
]
```

### `wrapper.dividelabel`
Shows a label with a visual divider line separating it from the content.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Account",
        "styles": ["wrapper.dividelabel"],
        "components": [
            { "type": "label", "cap": "Profile settings" },
            { "type": "label", "cap": "Security" }
        ]
    }
]
```

### `wrapper.buttonwrapper`
Groups buttons together in a compact horizontal bar, suitable for toolbar or dialog action areas.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["wrapper.buttonwrapper"],
        "components": [
            { "type": "button", "cap": "Save" },
            { "type": "button", "cap": "Cancel" }
        ]
    }
]
```

### `wrapper.pill`
Pill-shaped container with automated child position recalculation on resize. Commonly used for segmented controls or pill navigation.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["wrapper.pill"],
        "components": [
            { "type": "button", "cap": "Tab 1" },
            { "type": "button", "cap": "Tab 2" },
            { "type": "button", "cap": "Tab 3" }
        ]
    }
]
```

### `wrapper.list`
Unordered list container. Renders children as list items with bullet markers.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["wrapper.list"],
        "components": [
            { "type": "label", "cap": "First item" },
            { "type": "label", "cap": "Second item" },
            { "type": "label", "cap": "Third item" }
        ]
    }
]
```

### `wrapper.orderedList`
Ordered list container. Renders children as numbered list items.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["wrapper.orderedList"],
        "components": [
            { "type": "label", "cap": "Step one" },
            { "type": "label", "cap": "Step two" },
            { "type": "label", "cap": "Step three" }
        ]
    }
]
```
