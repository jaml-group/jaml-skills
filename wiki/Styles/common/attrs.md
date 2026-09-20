# common.attrs

`Styles.attrs` — set arbitrary HTML attributes on the element.

---

## Variants

### `attrs`

Accepts any number of HTML attribute name-value pairs to set on the element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| (any key) | `string` | Arbitrary HTML attribute value | Attribute name is the key |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Attributed",
        "styles": ["attrs(data-testid:my-label;aria-label:My Label)"]
    }
]
```
