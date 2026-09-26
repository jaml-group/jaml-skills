# common.attrs

`Styles.attrs` — set arbitrary HTML attributes on the element.

---

## Variants

### `attrs`

Accepts any number of HTML attribute name-value pairs to set on the element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style attrs`.

Each key names the attribute to apply.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Attributed",
        "styles": ["attrs(data-testid:my-label;aria-label:My Label)"]
    }
]
```
