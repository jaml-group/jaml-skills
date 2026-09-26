# input style variants

**Element:** `jam-input` · **Type:** `element`

---

## Slots

| Slot    | Type    | Description                                 |
| ------- | ------- | ------------------------------------------- |
| `icon`  | slotted | Icon content                                |
| `cap`   | slotted | Label text                                  |
| `agent` | agent   | The native `<input>` / `<textarea>` element |

---

## Style variants

### `input.showColorName`

Shows a color name overlay on color picker inputs — displays the human-readable color name above the input value. No args.

```json jaml-playground
[
    {
        "type": "input-color",
        "value": "#ff6600",
        "styles": ["input.showColorName"]
    }
]
```

### `input.chocolate`

Chocolate-style input — a distinct visual theme for input fields. No args.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Name",
        "value": "John Doe",
        "styles": ["input.chocolate"]
    }
]
```

### `input.code`

Code editor with Prettier formatting — applies automatic code formatting to the input value.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style input.code`.

```json jaml-playground
[
    {
        "type": "input-code",
        "value": "const greeting = 'hello world'",
        "styles": ["input.code(semi:false;singleQuote:true;trailingComma:none;printWidth:80)"]
    },
    {
        "type": "input-code",
        "value": "let x = 1; let y = 2;",
        "styles": ["input.code(semi:true;singleQuote:false)"]
    }
]
```

### `input.code.withPadding`

Code editor with inner padding — adds padding inside the code editor area.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style input.code.withPadding`.

```json jaml-playground
[
    {
        "type": "input-code",
        "value": "const x = 42;",
        "styles": ["input.code.withPadding(padding:0.5rem)"]
    },
    {
        "type": "input-code",
        "value": "const y = 7;",
        "styles": ["input.code.withPadding"]
    }
]
```

### `input.autoRows`

Auto-resize textarea rows — dynamically adjusts the number of rows to fit the content.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style input.autoRows`.

```json jaml-playground
[
    {
        "type": "input-textarea",
        "value": "Line one\nLine two\nLine three",
        "styles": ["input.autoRows(minRows:2;maxRows:8)"]
    },
    {
        "type": "input-textarea",
        "value": "Single line",
        "styles": ["input.autoRows"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'input-code',
  styles: ['input.code(semi:false;singleQuote:true;trailingComma:all)']
}
```
