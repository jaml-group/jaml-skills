# tags

`Styles.tags.*` -- tag/chip elements for labels, badges, and keyword indicators.

---

## Variants

### `tags.wrapped`
Wraps tags to multiple lines when they exceed the container width, instead of overflowing or scrolling horizontally.

```json jaml-playground
[
    {
        "type": "tags",
        "styles": ["tags.wrapped"],
        "data": ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"]
    }
]
```
