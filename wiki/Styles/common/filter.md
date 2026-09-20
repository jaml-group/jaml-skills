# common.filter

`Styles.filter.*` — CSS filter property.

---

## Variants

### `filter`

Applies CSS filter and backdrop-filter effects. Accepts raw CSS filter function strings.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `filter` | `string` | CSS filter value | Shorthand; e.g. `blur(2px) grayscale(0.5)` |
| `backdrop` | `string` | CSS backdrop-filter value | Shorthand; e.g. `blur(10px)` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Blurred",
        "styles": ["filter(filter:blur(2px) grayscale(0.5))"]
    }
]
```
