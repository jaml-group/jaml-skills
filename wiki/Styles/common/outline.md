# common.outline

`Styles.outline.*` — outline sub-properties.

---

## Variants

### `outline`

Applies outline width, style, color, and offset to an element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style outline`.

The outline shorthand overrides its individual fields.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Focused",
        "styles": ["outline(width:2px;style:solid;color:var(--jam-ac-color))"]
    }
]
```
