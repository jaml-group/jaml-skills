# common.agent

`Styles.agent.*` — styles targeting the element's internal agent (the native HTML element backing a custom input).

---

## Variants

### `agent.background`

Sets the background of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Background color | Any CSS color value |
| `image` | `string` | Background image URL or CSS gradient | — |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.background(color:transparent)"]
    }
]
```

### `agent.border`

Sets the border of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Border width | — |
| `style` | `string` | Border style | `solid`, `dashed`, `none` |
| `color` | `string` | Border color | — |
| `radius` | `string` | Border radius | — |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.border(width:1px;style:solid;color:#ccc;radius:4px)"]
    }
]
```

### `agent.size`

Sets the size of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Width | — |
| `minWidth` | `string` | Minimum width | — |
| `height` | `string` | Height | — |
| `minHeight` | `string` | Minimum height | — |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.size(width:100%;height:2.5rem)"]
    }
]
```

### `agent.padding`

Sets the padding of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `padding` | `string` | Padding CSS shorthand | e.g. `0.5rem 0.75rem` |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.padding(padding:0.5rem 0.75rem)"]
    }
]
```

### `agent.margin`

Sets the margin of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `margin` | `string` | Margin CSS shorthand | e.g. `1rem 0` |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.margin(margin:1rem 0 2rem)"]
    }
]
```

### `agent.text`

Sets the text styling of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `font` | `string` | Font family | CSS `fontFamily` |
| `size` | `string` | Font size | CSS `fontSize` |
| `weight` | `string` | Font weight | `normal`, `bold` |
| `color` | `string` | Text color | — |
| `lineheight` | `string` | Line height | `normal`, `1`, `1.5` |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.text(size:1.2rem)"]
    }
]
```

### `agent.outline`

Sets the outline of the internal agent element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Outline width | — |
| `style` | `string` | Outline style | `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none` |
| `color` | `string` | Outline color | — |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.outline(width:2px;style:solid;color:var(--jam-ac-color))"]
    }
]
```

### `agent.css`

Applies arbitrary CSS to the internal agent element. Accepts any CSS key-value pairs.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Styled",
        "styles": ["agent.css(opacity:0.9;transition:all 0.2s)"]
    }
]
```
