# common.clazz

`Styles.clazz` — raw CSS class helper.

For semantic trait classes such as `is.major`, `with.accent`, and element-scoped `no(...)`, see [common.trait](./trait.md).

---

## Variants

### `clazz`

Adds arbitrary CSS classes to the element. Accepts one or more class names.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `clazz` | `string` | CSS class name(s) to add | Shorthand; multiple classes space/comma-separated |
| `descStyles` | `dictionary` | Descendant styles object | Registered as a global style rule for the class |
| `revertKey` | `string` | Revert / clean-up key for unstyling | Default: `clazz` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Custom",
        "styles": ["clazz(my-custom-class)"]
    }
]
```
