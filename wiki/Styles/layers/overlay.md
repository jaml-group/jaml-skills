# layer.overlay

`Styles.layer.overlay` — semi-transparent overlay layer.

Adds a positioned overlay with optional content on top of the element.

---

## Args

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.overlay`.

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Decorative overlay",
        "styles": ["layer.overlay(content:Hello World;opacity:0.8)"]
    },
    {
        "type": "card",
        "cap": "Minimal overlay",
        "styles": ["layer.overlay(content:⚠;class:warning;opacity:0.9)"]
    }
]
```
