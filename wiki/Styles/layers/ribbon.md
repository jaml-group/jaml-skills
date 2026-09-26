# layer.ribbon

`Styles.layer.ribbon.*` — corner ribbon decorations and tooltip triggers.

---

## Variants

### `ribbon`

Corner ribbon element. Displays a ribbon with content in the corner of an element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.ribbon`.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Featured",
        "styles": ["layer.ribbon(content:NEW;radius:0.5rem;top:0.5rem)"]
    }
]
```

### `ribbon.tiptrigger`

Ribbon used as a tooltip trigger (used by the `jam-tip` plugin). Same args as `ribbon` plus a `tip` property.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.ribbon.tiptrigger`.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Hover for info",
        "styles": ["layer.ribbon.tiptrigger(tip:This is a helpful tip;radius:0.5rem)"]
    }
]
```

### `ribbon.bookmark`

Bookmark-shaped ribbon with configurable style. Supports fishtail, pendant, flat, and slanted shapes.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.ribbon.bookmark`.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Fishtail",
        "styles": ["layer.ribbon.bookmark(style:fishtail;content:HOT;indent:20%)"]
    },
    {
        "type": "card",
        "cap": "Slanted",
        "styles": ["layer.ribbon.bookmark(style:slanted;content:SALE;background:gold)"]
    },
    {
        "type": "card",
        "cap": "Pendant",
        "styles": ["layer.ribbon.bookmark(style:pendant;content:TOP;indent:25%)"]
    }
]
```
