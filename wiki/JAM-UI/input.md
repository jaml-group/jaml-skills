# input

**Class:** `ImbeInput` · **Type:** `"input"` · **Extends:** `AbstractInputElement`

A versatile text input supporting plain text, textarea, number, password, color picker, code editor, and file upload modes.

---

## JAML usage

```json jaml-playground
{
  "type": "input",
  "cap": "Username",
  "placeholder": "Enter your username",
  "rules": { "required": true, "minlength": 3 },
  "valueKey": "username"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement), including `value`, `defaultValue`, `formatter`, `modifier`, `accessor`, `rules`, and the validation system.

The input mode is selected with a composite type such as `"input-number"`, `"input-textarea"`, or `"input-code"`. See the Input types table below.

| Param | Type | Default | Description |
|---|---|---|---|
| `cap` | `string` | — | Label text above the input. |
| `placeholder` | `string` | — | Placeholder text. |
| `rows` | `number \| 'auto'` | `2` | Visible row count for textarea/code. `'auto'` enables auto-resize based on content. |
| `minRows` | `number` | `1` | Minimum rows when `rows` is `'auto'`. |
| `maxRows` | `number` | `-1` | Maximum rows when `rows` is `'auto'`. `-1` means unlimited. |
| `autoFormat` | `boolean` | `false` | Auto-format JSON content when type is `'code'`. |
| `eagerEditor` | `boolean` | `false` | In code mode, initialize immediately instead of waiting for visibility or `replaceReady`. Can also be enabled after mounting. |
| `tabWidth` | `number` | `4` | Tab size for code editor. |
| `emptyLineAtEnd` | `boolean` | `true` | Ensure code editor ends with empty line. |
| `useVim` | `boolean` | `false` | Enable Vim keybindings in code editor. |
| `lineWrapping` | `boolean` | `false` | Enable line wrapping in code editor. |
| `autoCompletion` | `boolean` | `false` | Enable auto-completion in code editor. |
| `lineNumber` | `boolean` | `true` | Show line numbers in the code editor. |
| `reserveUndo` | `boolean` | `false` | Preserve undo history in code editor. |
| `lang` | `string` | auto-detected | Preferred language hint for code mode. Overrides auto-detection when the value is set. |
| `codeLang` | `string` | auto-detected | Current CodeMirror language name / attribute. Usually set through `lang` or auto-detection. |
| `showValueTip` | `boolean` | `true` | Show a value tooltip when hovering a `'range'` input. |
| `dropzone` | `HTMLElement \| string \| null` | `null` | Dropzone element for file drag-and-drop (file type only). |
| `prompt` | `string \| null` | `null` | Prompt text for file dropzone. |
| `onfileread` | `(fileInfo: FileInfo) => void` | — | Callback when a file is selected or dropped. |

---

## Input types

Use a composite JAML `type` directly — for example `"type": "input-number"`.

| Composite type | Input mode | Description |
|---|---|---|
| `"input"` | `'text'` | Standard text input (default) |
| `"input-search"` | `'search'` | Search input with search styling and a built-in clear button |
| `"input-textarea"` | `'textarea'` | Multi-line text area |
| `"input-number"` | `'number'` | Numeric input (returns number via `getValue()`) |
| `"input-password"` | `'password'` | Masked password input |
| `"input-color"` | `'color'` | Color picker |
| `"input-code"` | `'code'` | Code editor (uses CodeMirror when available) |
| `"input-file"` | `'file'` | File selection — rendered as a button, no visible input |
| `"input-range"` | `'range'` | Range slider. Shows a value tooltip on hover when `showValueTip: true`. |

---

## Slots

| Slot | Description |
|---|---|
| `label` (via template) | Label area above the input |
| `unit` | Unit label (right of number input) |

---

## Async properties

| Property | Type | Description |
|---|---|---|
| `input.editorReady` | `Promise<void>` | Resolves when the code editor is initialized (code mode). |
| `input.initializeEditor()` | `Promise<void>` | Request code-editor initialization immediately and return the shared `editorReady` promise. Repeated requests retain the same editor. |
| `input.prettierReady` | `Promise<boolean>` | Resolves when Prettier formatting is loaded (code mode). |
| `input.replaceReady` | `Promise<void>` | Set to defer content replacement. Toggles the `jam-lazy-replace` CSS class. Call `replaceReady = somePromise` before setting value. |

---

## Instance methods

Inherits all `AbstractInputElement` methods, plus:

| Method | Description |
|---|---|
| `input.focus()` | Focus the input (async for code editor). |
| `input.blur()` | Blur the input (async for code editor). |
| `input.formatContent()` | Reformat the current content (code editor only). |
| `input.getContent()` | Get the raw string content from the input agent. |
| `input.setContent(value)` | Set the raw display content. |
| `input.updateValueAndTriggerChange(value, oldValue)` | Set value and fire `valuechange` in one call. |

---

## Examples

### Text input with validation

```json jaml-playground
{
  "type": "input",
  "cap": "Email",
  "rules": {
    "required": true,
    "pattern": "^[^@]+@[^@]+\\.[^@]+$",
    "triggers": ["blur"]
  },
  "valueKey": "email"
}
```

### Number input with range

```json jaml-playground
{
  "type": "input-number",
  "cap": "Threshold",
  "step": 0.01,
  "defaultValue": 0.35,
  "rules": { "min": 0, "max": 1 },
  "styles": ["interact.clearable", "interact.resettable"],
  "valueKey": "threshold"
}
```

### Textarea

```json jaml-playground
{
  "type": "input-textarea",
  "cap": "Description",
  "rows": 5,
  "defaultValue": "Enter description here...",
  "valueKey": "description"
}
```

### Code editor with auto-format

```javascript jaml-playground
export default {
  type: 'input-code',
  cap: 'Configuration',
  lang: 'JSON',
  autoFormat: true,
  tabWidth: 2,
  valueKey: 'config'
}
```

### File upload with dropzone

```javascript jaml-playground
export default {
  type: 'input-file',
  cap: 'Upload File',
  dropzone: '#drop-area',
  onfileread: function(fileInfo) {
    console.log('File loaded:', fileInfo.name, fileInfo.size)
    this.model.fileContent = fileInfo.content
  }
}
```

### Color picker

```javascript jaml-playground
export default {
  type: 'input-color',
  cap: 'Theme Color',
  defaultValue: '#4a90d9',
  onvaluechange: function(color) {
    document.documentElement.style.setProperty('--primary-color', color)
  }
}
```

### Range slider with value tip

```json jaml-playground
{
  "type": "input-range",
  "cap": "Volume",
  "min": 0,
  "max": 100,
  "defaultValue": 50,
  "showValueTip": true,
  "valueKey": "volume"
}
```

---

## Notes

- For `type: 'file'`, the element renders as a button — clicking it opens the native file picker. The `onfileread` callback receives a `FileInfo` object with `name`, `size`, `type`, `content`, and `dataURL` fields.
- For `type: 'code'`, `input.editorReady` resolves when the editor is initialized. Use `await input.editorReady` before interacting with the editor.
- Use `eagerEditor: true` or `await input.initializeEditor()` to bypass deferred initialization. Destruction cancels pending initialization. Browser Print uses a literal source fallback while a deferred editor loads and removes the fallback after printing; Markdown documents can await [scoped print preparation](../Plugins/markdown.md#printing).
- Passing an object value to a non-color input auto-serializes it as JSON.
