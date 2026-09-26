# common.clazz

`Styles.clazz` — raw CSS class helper.

For semantic trait classes such as `is.major`, `with.accent`, and element-scoped `no(...)`, see [common.trait](./trait.md).

---

## Variants

### `clazz`

Adds arbitrary CSS classes to the element. Accepts one or more class names.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style clazz`.

Descendant styles are registered as a global rule for the class.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Custom",
        "styles": ["clazz(my-custom-class)"]
    }
]
```
