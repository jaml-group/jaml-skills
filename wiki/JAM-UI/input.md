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
  "rules": { "required": true, "minLength": 3 },
  "valueKey": "username"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement), including `value`, `defaultValue`, `formatter`, `modifier`, `accessor`, `rules`, and the validation system.

The input mode is selected with a composite type such as `"input-number"`, `"input-textarea"`, or `"input-code"`. See the Input types table below.

| Param            | Type                                                           | Default       | Description                                                                                                                                                                           |
| ---------------- | -------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cap`            | `string`                                                       | —             | Label text above the input.                                                                                                                                                           |
| `placeholder`    | `string`                                                       | —             | Placeholder text.                                                                                                                                                                     |
| `rows`           | `number \| 'auto'`                                             | `2`           | Visible row count for textarea/code. `'auto'` enables auto-resize based on content.                                                                                                   |
| `minRows`        | `number`                                                       | `1`           | Minimum rows when `rows` is `'auto'`.                                                                                                                                                 |
| `maxRows`        | `number`                                                       | `-1`          | For an auto-growing textarea, positive values set the row limit; nonpositive values (including the default `-1`) use a five-row limit. Set an explicit positive bound for a composer. |
| `autoFormat`     | `boolean`                                                      | `false`       | Auto-format JSON content when type is `'code'`.                                                                                                                                       |
| `eagerEditor`    | `boolean`                                                      | `false`       | In code mode, initialize immediately instead of waiting for visibility or `replaceReady`. Can also be enabled after mounting.                                                         |
| `tabWidth`       | `number`                                                       | `4`           | Tab size for code editor.                                                                                                                                                             |
| `emptyLineAtEnd` | `boolean`                                                      | `true`        | Ensure code editor ends with empty line.                                                                                                                                              |
| `useVim`         | `boolean`                                                      | `false`       | Enable Vim keybindings in code editor.                                                                                                                                                |
| `lineWrapping`   | `boolean`                                                      | `false`       | Enable line wrapping in code editor.                                                                                                                                                  |
| `autoCompletion` | `boolean`                                                      | `false`       | Enable auto-completion in code editor.                                                                                                                                                |
| `lineNumber`     | `boolean`                                                      | `true`        | Show line numbers in the code editor.                                                                                                                                                 |
| `reserveUndo`    | `boolean`                                                      | `false`       | Preserve undo history in code editor.                                                                                                                                                 |
| `lang`           | `string`                                                       | auto-detected | Preferred language hint for code mode. Overrides auto-detection when the value is set.                                                                                                |
| `codeLang`       | `string`                                                       | auto-detected | Current CodeMirror language name / attribute. Usually set through `lang` or auto-detection.                                                                                           |
| `showValueTip`   | `boolean`                                                      | `true`        | Show a value tooltip when hovering a `'range'` input.                                                                                                                                 |
| `dropzone`       | `HTMLElement \| string \| null`                                | `null`        | Dropzone element for file drag-and-drop (file type only).                                                                                                                             |
| `prompt`         | `string \| null`                                               | `null`        | Prompt text for file dropzone.                                                                                                                                                        |
| `onfileread`     | `(fileInfo: FileInfo) => void`                                 | —             | Callback for the first file from a current selection or drop. Superseded reads and reads completed after destruction are ignored.                                                     |
| `onfileselect`   | `(files: File[], source: 'picker' \| 'drop') => void \| false` | —             | Current development runtime: synchronous raw-file snapshot before built-in reads; returning `false` vetoes reading.                                                                   |
| `multiple`       | `boolean`                                                      | `false`       | Forwarded to the native file picker; allows multiple selection.                                                                                                                       |
| `accept`         | `string`                                                       | `''`          | Forwarded picker hint; application validation remains required.                                                                                                                       |

---

## Input types

Use a composite JAML `type` directly — for example `"type": "input-number"`.

| Composite type     | Input mode   | Description                                                             |
| ------------------ | ------------ | ----------------------------------------------------------------------- |
| `"input"`          | `'text'`     | Standard text input (default)                                           |
| `"input-search"`   | `'search'`   | Search input with search styling and a built-in clear button            |
| `"input-textarea"` | `'textarea'` | Multi-line text area                                                    |
| `"input-number"`   | `'number'`   | Numeric input (returns number via `getValue()`)                         |
| `"input-password"` | `'password'` | Masked password input                                                   |
| `"input-color"`    | `'color'`    | Color picker                                                            |
| `"input-code"`     | `'code'`     | Code editor (uses CodeMirror when available)                            |
| `"input-file"`     | `'file'`     | File selection — rendered as a button, no visible input                 |
| `"input-range"`    | `'range'`    | Range slider. Shows a value tooltip on hover when `showValueTip: true`. |

---

## Slots

| Slot    | Description                                                  |
| ------- | ------------------------------------------------------------ |
| `label` | Label area; its fallback contains the `icon` and `cap` slots |
| `icon`  | Icon within the fallback label area                          |
| `cap`   | Caption within the fallback label area                       |
| `unit`  | Unit label, present in the number-input template             |

These follow the shared [named-slot lifecycle](./JAM-UI.md#named-slot-lifecycle). Use `capslotchange` for caption assignment changes and `valuechange` for the input value: the input template has no `value` slot.

---

## Async properties

| Property                   | Type               | Description                                                                                                                           |
| -------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `input.editorReady`        | `Promise<void>`    | Resolves when the code editor is initialized (code mode).                                                                             |
| `input.initializeEditor()` | `Promise<void>`    | Request code-editor initialization immediately and return the shared `editorReady` promise. Repeated requests retain the same editor. |
| `input.prettierReady`      | `Promise<boolean>` | Resolves when Prettier formatting is loaded (code mode).                                                                              |
| `input.replaceReady`       | `Promise<void>`    | Set to defer content replacement. Toggles the `jam-lazy-replace` CSS class. Call `replaceReady = somePromise` before setting value.   |

---

## Instance methods

Inherits all `AbstractInputElement` methods, plus:

| Method                                               | Description                                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `input.focus()`                                      | Focus the input (async for code editor).                                            |
| `input.blur()`                                       | Blur the input (async for code editor).                                             |
| `input.formatContent()`                              | Reformat code content; current development runtime skips read-only/disabled inputs. |
| `input.getContent()`                                 | Get the raw string content from the input agent.                                    |
| `input.setContent(value)`                            | Set the raw display content.                                                        |
| `input.updateValueAndTriggerChange(value, oldValue)` | Set value and fire `valuechange` in one call.                                       |

---

## Ghost textarea and shared composer focus

In the updated development runtime, use the native [`input.ghost` style](../Styles/input-style.md#entry-input-ghost) with `input-textarea`. It keeps the input transparent in normal, hover, disabled and read-only states, removes its resting border/shadow, and preserves native focus indication. It does not remove labels: omit `cap` and `icon` when the composer needs no caption, and [name the native agent](JAM-UI.md#naming-native-input-agents). Do not use `input-textarea-ghost`: that unsupported subtype does not select a textarea.

```javascript jaml-playground
export default {
  type: "input-textarea",
  placeholder: "Message",
  rows: "auto",
  minRows: 1,
  maxRows: 8,
  styles: ["input.ghost"],
  oninit() {
    this.getAgent().setAttribute("aria-label", "Message");
  },
};
```

For one rounded composer containing the textarea, attachment button, settings and Send action, keep those controls as siblings inside the application-owned wrapper. The native textarea owns bounded growth. To show one focus outline around that wrapper, use `Styles.css({ selector: '&:focus-within', outline: 'var(--jam-input-focus-outline-width) solid var(--jam-input-focus-outline-color)' })` on it. Suppress the inner outline only on the input with `Styles.css({ '--jam-input-focus-outline-width': '0px' })`; leave the wrapper's outline tokens intact. `focus` targets `:focus`, so it is not a substitute for `:focus-within` on the wrapper. Keep a visible focus indication for keyboard users.

The ghost style is a new development capability; verify the delivered runtime, including keyboard, disabled/read-only and theme states. It covers native text inputs and textareas, not file/color controls or external code-editor surfaces.

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
  type: "input-code",
  cap: "Configuration",
  lang: "JSON",
  autoFormat: true,
  tabWidth: 2,
  valueKey: "config",
};
```

### Read-only unified diff

The current development runtime and matching code-editor bundle support `lang: 'diff'` (`'Diff'` and `'patch'` are aliases). Load both updated bundles; the unchanged package version alone does not establish this capability. This mode highlights supplied unified-diff text: additions, deletions and hunk headers. It does not compute, apply or authorize a patch, pair old/new line numbers, or provide merge controls. Colors follow the current theme palette; the literal `+`/`-` markers retain their meaning independently of color.

For a recorded text preview, use `readOnly: true`, `autoFormat: false`, `autoCompletion: false` and `useVim: false`. Read-only mode preserves selection, native copy and Tab navigation while blocking typing, cut, paste and editor formatting. In this development runtime, `formatContent()` and its formatting shortcut also do nothing when the input is disabled; a formatter that finishes while either flag is true cannot apply its result. Programmatic model updates remain allowed. Do not attach value-changing modifiers, formatters or application handlers to this recorded-content viewer.

Keep external content out of authored `vars`, handlers and interpolated JAML. The following integration fragment requires a mounted `host` element, loaded Jam-UI/code-editor bundles and an application-provided `externalDiffText` string. Authored defaults are trusted; the external text enters through a runtime model assignment:

```javascript
const model = new jam.Model({
  type: "container",
  vars: { recordedDiff: "" },
  components: [
    {
      type: "input-code",
      cap: "Recorded changes",
      lang: "diff",
      readOnly: true,
      eagerEditor: true,
      autoFormat: false,
      autoCompletion: false,
      useVim: false,
      emptyLineAtEnd: false,
      value: "{{recordedDiff}}",
      styles: ["css(display:block;width:100%;height:20rem)"],
    },
  ],
});
model.vars.recordedDiff = externalDiffText;
model.render(host);
// Later: model.vars.recordedDiff = nextExternalDiffText;
// On teardown: model.destroy();
```

Once the input is mounted, `await input.initializeEditor()` requests initialization and waits for the editor; `editorReady` has the same readiness boundary. These do not mean every later binding assignment has settled. `valueReady` waits for the first value-change event and can remain pending for an empty or unchanged initial value; do not use it as a general mount barrier.

LF text retains trailing spaces and whether a final newline is present when formatting is disabled. The editor normalizes CRLF/CR line endings to LF, including copied text; this is a text presentation, not a byte-exact file store. Keep the original file bytes and download/copy-original action with the host when exact line endings matter. The host also owns size limits, binary detection, diff computation and patch authorization. For binary or oversized results, choose a native literal-text status message instead of loading the full content into the editor. Destroy the owning model when replacing the view.

### File upload with dropzone

```javascript jaml-playground
export default {
  type: "input-file",
  cap: "Upload File",
  dropzone: "#drop-area",
  onfileread: function (fileInfo) {
    console.log("File loaded:", fileInfo.name, fileInfo.size);
    this.model.vars.fileContent = fileInfo.data;
  },
};
```

### Color picker

```javascript jaml-playground
export default {
  type: "input-color",
  cap: "Theme Color",
  defaultValue: "#4a90d9",
  onvaluechange: function (color) {
    document.documentElement.style.setProperty("--primary-color", color);
  },
};
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

- For `type: 'file'`, the element renders as a button — clicking it opens the native file picker. The `onfileread` callback receives a `FileInfo` object with `path`, `name`, `size`, `mime`, `data`, `time` and `orig` fields. `data` is text for supported text MIME types and a data URL otherwise; `time` is the original last-modified timestamp and `orig` retains the browser `File`. `path` is normally the relative path (or an empty string); an Electron bridge may supply a filesystem path. The callback runs after reading the file contents.
- For `type: 'code'`, `input.editorReady` resolves when the editor is initialized. Use `await input.editorReady` before interacting with the editor.
- Use `eagerEditor: true` or `await input.initializeEditor()` to bypass deferred initialization. Destruction cancels pending initialization. Browser Print uses a literal source fallback while a deferred editor loads and removes the fallback after printing; Markdown documents can await [scoped print preparation](../Plugins/markdown.md#printing).
- Passing an object value to a non-color input auto-serializes it as JSON.

## File-read ownership

In the current development runtime, picker selections and drops share one read generation. A newer selection/drop, clearing the selection, replacing the dropzone or destroying the input invalidates an older completion. Completion also requires the callback to have the same identity captured when the read started; temporarily replacing it and restoring that same callback does not cancel the read. This does not abort the underlying browser file read. `onfileread` receives only the first file; an attachment queue, multiple-file policy and upload lifecycle belong to the application. Keep conversation/session identity checks in that owner as well.

For limits that must be checked before reading bytes, `onfileread` is too late. The file helpers `jam.attachFiles` and `jam.makeFileDroppable` also read files before delivering `FileInfo` objects. Generic [`jam.makeDroppable`](../Plugins/dragndrop.md) exposes the drop event so an application can inspect `event.dataTransfer.files` before choosing which files to read. Keep drop registration/cleanup and upload policy in one owner. Use the raw-selection hook below for the native picker and its integrated dropzone; do not reach into the protected input agent.

### Raw file selection before reading

In the current development runtime, `onfileselect(files, source)` runs synchronously for picker input and the configured native `dropzone`, even without `onfileread`. `files` is an array snapshot retaining the original browser `File` objects; `source` is `'picker'` or `'drop'`. Inspect count, names, MIME hints and sizes before choosing which bytes to read or upload. Array mutations do not change the legacy read list. An empty picker selection supplies an empty snapshot.

Return exactly `false` to suppress the built-in read for that selection. Otherwise the legacy callback remains first-file-only: the picker reads its first file, while the drop helper reads the dropped list before delivering the first result. A Promise is not an asynchronous veto. For asynchronous validation, retain the raw files, return `false` immediately and let the application own later work. Every selection supersedes prior pending delivery, including a vetoed selection. Destruction, replacement, changed callback identity and reentrant selection invalidate obsolete work. This does not cancel a browser read already started.

`multiple` and `accept` use the existing native-parameter forwarding path; `accept` is not application validation. Share one application admission/queue function with a paste adapter that copies `clipboardData.files` synchronously. Keep session/navigation guards with that owner; the framework supplies no upload transport or attachment queue.

File mode currently hides its internal input and does not provide the native button's keyboard activation. Its `focus()` therefore does not establish a usable file-button tab stop. Compose a sibling native `button` with the mounted file control; let the button own focus, Enter and Space and synchronously call the file control's public `.click()`. Keep both disabled states aligned. Do not nest the controls or duplicate the integrated drop engine.

```javascript jaml-playground
export default {
  type: "container",
  id: "attachment-composer",
  vars: { fileNames: [] },
  components: [
    {
      type: "button",
      cap: "Add files",
      onclick() {
        document.getElementById("attachment-picker").click();
      },
    },
    {
      type: "input-file",
      id: "attachment-picker",
      multiple: true,
      dropzone: "#attachment-composer",
      styles: ["css(display:none)"],
      onfileselect(files, source) {
        this.model.vars.fileNames = files.map((file) => file.name);
        // Hand raw files to the application's validation/queue owner here.
        return false;
      },
    },
  ],
};
```

## Native caption and accessible names

In the updated development runtime, the normal input/select/textarea agent receives a native label association with its caption. Caption changes update that label. Use host `attrs` to forward `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-required`, `aria-invalid` or `aria-errormessage` to the backing control. Explicit accessible names take precedence over the caption. Removing a forwarded attribute restores the previous native value while the forwarding still owns it; a subsequent direct native override is preserved.

References to elements outside the control's shadow root rely on browser support for ARIA element-reference properties. Reassign the host attribute after replacing its referenced targets. Custom replacement editors own their accessible naming. Verify the actual backing control and accessible tree in the target browser; host attributes alone are insufficient.
