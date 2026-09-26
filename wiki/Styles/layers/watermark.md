# layer.watermark

`Styles.layer.watermark.*` — watermark and icon overlay layer effects.

---

## Variants

### `watermark`

Text watermark overlay. Renders translucent text over the element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.watermark`.

Use the `style` dictionary for CSS on the watermark text span, for example `{ opacity: 0.2 }` in JavaScript.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["layer.watermark(text:CONFIDENTIAL;size:1.5rem;weight:bold)"],
        "components": [{ "type": "label", "cap": "Confidential document" }]
    },
    {
        "type": "card",
        "styles": ["layer.watermark(text:DRAFT;color:hsl(0 75% 45%);size:2rem)"],
        "components": [{ "type": "label", "cap": "Draft version" }]
    }
]
```

### `watermark.icon`

Icon/emoji watermark with gradient and inversion options. Copies the host element's `icon` slot into a decorative layer; set the host `icon` param to an icon name or emoji.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.watermark.icon`.

```json jaml-playground
[
    {
        "type": "card",
        "icon": "🔒",
        "styles": ["layer.watermark.icon(size:4em;bottom:1rem;right:1rem)"],
        "components": [
            { "type": "label", "cap": "Secure content" }
        ]
    },
    {
        "type": "card",
        "icon": "⭐",
        "styles": ["layer.watermark.icon(gradient:true;size:5em)"],
        "components": [
            { "type": "label", "cap": "Featured" }
        ]
    }
]
```
