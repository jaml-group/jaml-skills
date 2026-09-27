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

Legacy class marker without a dedicated native layout rule in this baseline. For an action bar, use an `actions` role wrapper and an explicit flex layout; handlers own the commands.

### `wrapper.pill`

Adds a legacy class and recalculates child render-position markers on resize. It does not implement selection or guarantee a pill appearance. Use a native radio button group for a single-selection segmented control, then choose its presentation.

### `wrapper.list`

Legacy class marker; it does not create list semantics or bullet markers in this baseline. Use the list role for a semantic region and `element.list` for native document-item presentation.

### `wrapper.orderedList`

Legacy class marker; it does not automatically number children. Compose native `element.list` items with explicit order values when document numbering is required.
