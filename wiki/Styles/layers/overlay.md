# layer.overlay

`Styles.layer.overlay` — semi-transparent overlay layer.

Adds a positioned overlay with optional content on top of the element.

---

## Args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `content` | `any` | Overlay content (text or HTML) | Rendered inside the overlay |
| `class` | `string` | Additional CSS class for the overlay | Default: `''`. Applied alongside internal classes |

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Hover for overlay",
        "styles": ["layer.overlay(content:Hello World;opacity:0.8)"]
    },
    {
        "type": "card",
        "cap": "Minimal overlay",
        "styles": ["layer.overlay(content:⚠;class:warning;opacity:0.9)"]
    }
]
```
