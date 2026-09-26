# common.agent

`Styles.agent.*` — styles targeting the element's internal agent (the native HTML element backing a custom input).

---

## Variants

### `agent.background`

Sets the background of the internal agent element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.background`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.border`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.size`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.padding`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.margin`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.text`.

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

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style agent.outline`.

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
