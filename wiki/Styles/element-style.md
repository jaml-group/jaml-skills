# element style variants

**Element:** `jam-element` · **Type:** `element`

Element (`EndiveElement`) is a generic container used for representers (`divider`, `hr`, `vr`, `data`, `placeholder`). Minimal style variants.

---

## Style variants

### `element.placeholder`

Placeholder visibility — hides the element by default (sets `visibility: hidden`). Useful for representers that should not be visible. No args.

```json jaml-playground
[
    {
        "type": "element-divider",
        "styles": ["element.placeholder"]
    }
]
```

### `element.header`

Heading-style layout.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style element.header`.

```json jaml-playground
[
    {
        "type": "element",
        "value": "Section title",
        "styles": ["element.header(level:2)"]
    }
]
```

### `element.para`

Paragraph text layout.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style element.para`.

```json jaml-playground
[
    {
        "type": "element",
        "value": "Paragraph copy with an indent.",
        "styles": ["element.para(indent:1)"]
    }
]
```

### `element.quote`

Blockquote style.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style element.quote`.

```json jaml-playground
[
    {
        "type": "element",
        "value": "A quoted sentence.",
        "styles": ["element.quote(indent:1)"]
    }
]
```

### `element.list`

List item with optional order number or todo checkbox.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style element.list`.

```json jaml-playground
[
    {
        "type": "element",
        "value": "Buy groceries",
        "styles": ["element.list(todo:true;checked:false)"]
    }
]
```

### `element.image`

Image display — renders an `<img>` element inside the element.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style element.image`.

```json jaml-playground
[
    {
        "type": "element",
        "styles": ["element.image(src:https://via.placeholder.com/200;alt:Placeholder image)"]
    }
]
```

---

## Usage

Element (`EndiveElement`) is a generic container used for representers (`divider`, `hr`, `vr`, `data`, `placeholder`). Minimal style variants.
