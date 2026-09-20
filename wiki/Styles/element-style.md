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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `level` | `number` | Heading level | Default: `1` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `indent` | `number` | Paragraph indent level | Default: `0` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `indent` | `number` | Quote indent level | Default: `0` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `indent` | `number` | List indent level | Default: `0` |
| `order` | `number` | Ordered list number | — |
| `todo` | `boolean` | Show as todo item with checkbox | Default: `false` |
| `checked` | `boolean` | Checkbox checked state | Default: `false`. Only applies when `todo` is `true` |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `src` | `string` | Image URL | — |
| `alt` | `string` | Alternate text | — |

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
