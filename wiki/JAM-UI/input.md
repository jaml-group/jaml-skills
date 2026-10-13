# input

**Class:** `ImbeInput` · **Type:** `"input"` · **Extends:** `AbstractInputElement`

A versatile text input supporting plain text, textarea, number, password, color picker, code editor, compose editor, and file upload modes.

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

| Composite type     | Input mode   | Description                                                                                                    |
| ------------------ | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `"input"`          | `'text'`     | Standard text input (default)                                                                                  |
| `"input-search"`   | `'search'`   | Search input with search styling and a built-in clear button                                                   |
| `"input-textarea"` | `'textarea'` | Multi-line text area                                                                                           |
| `"input-number"`   | `'number'`   | Numeric input (returns number via `getValue()`)                                                                |
| `"input-password"` | `'password'` | Masked password input                                                                                          |
| `"input-color"`    | `'color'`    | Color picker                                                                                                   |
| `"input-code"`     | `'code'`     | Code editor (uses CodeMirror when available)                                                                   |
| `"input-compose"`  | `'compose'`  | Plain-text composition with recognized inline/atomic tokens and owned suggestions; current development runtime |
| `"input-file"`     | `'file'`     | File selection — rendered as a button, no visible input                                                        |
| `"input-range"`    | `'range'`    | Range slider. Shows a value tooltip on hover when `showValueTip: true`.                                        |

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

## Compose input and inline tokens

The current development runtime supports `input-compose`, using the optional CodeMirror editor bundle with one plain-text `value`. Deploy matching runtime and editor assets. If editor delivery fails, the backing textarea remains usable, without token presentation or suggestions. Markdown presentation is enabled by default, including inline formatting and block structure. It remains a source-backed text editor, not a rich Markdown document renderer or a host for arbitrary editable components.

The application defines its text grammar and lookup sources. `recognize(text)` reconstructs token ranges; no hidden token identity or mandatory marker syntax is stored. Clipboard operations preserve source text. Use the receiving application's canonical reference syntax for real file or skill references; selecting a visual token does not upload a file, execute a skill or authorize an action.

### Markdown editing and keyboard commands

Use `input-compose` for a draft that combines Markdown text with optional application-defined tokens and suggestions. Set `compose.markdown: false` for plain composition with the same token/picker contract. Markdown settings can change without replacing the text or undo history.

Bold, italic, strikethrough, inline code and links receive editable formatting. Headings, quotes, ordered/bullet/task lists, thematic rules and code blocks receive editor presentation. Moving the selection into inline formatting exposes its syntax; the active block line exposes its markers. Fences remain visible and muted. Tables stay editable Markdown source. Images, HTML, math, Mermaid and embedded JAML remain literal source: this editor does not execute or render them. Use the [Markdown plugin](../Plugins/markdown.md) for document rendering instead.

Application tokens take priority over Markdown presentation. Automatic trigger lookup is suppressed inside parsed code, while explicit toolbar and replacement requests remain available. Recognition callbacks still decide whether application tokens belong in code. Copy, cut and paste preserve Markdown source rather than rendered HTML.

| Key              | Editing behavior                                                                                                                                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cmd-B / Ctrl-B   | Toggle bold for the current inline selection or enclosing bold span.                                                                                                                                                                                     |
| Cmd-I / Ctrl-I   | Toggle italic for the current inline selection or enclosing italic span.                                                                                                                                                                                 |
| Tab              | Accept a current suggestion first. Otherwise nest the current list item and its descendants under the preceding sibling; indent selected lines; or insert a literal tab at an ordinary caret. A first list item cannot nest without a preceding sibling. |
| Shift-Tab        | Lift a nested list item with its descendants, or outdent selected/current lines.                                                                                                                                                                         |
| Escape, then Tab | Leave editing with CodeMirror's keyboard focus escape.                                                                                                                                                                                                   |

Use Cmd on macOS and Ctrl elsewhere. Bold/italic keep selected text selected and create an undoable source change; at an empty caret they insert paired delimiters ready for typing. They do not format across block boundaries, inside code/HTML, or through part of an application token. Whole tokens can receive surrounding formatting. Underline and a rich/source-mode toggle are not provided. Read-only and IME composition retain their editing guards.

Newlines keep the configured `newlineKey` and submission priority below. An admitted newline continues a list or quote; an empty list item exits the list. Ordinary text receives one newline, not automatic paragraph spacing. Markdown editing does not add another submission handler.

```javascript jaml-playground
export default {
  type: "input-compose",
  cap: "Draft",
  rows: "auto",
  minRows: 4,
  maxRows: 12,
  value:
    "## Draft\n\n- First item\n- Second item\n\nSelect words and press Cmd-B or Ctrl-B.",
  compose: { markdown: true, newlineKey: "Enter" },
};
```

### Compose options

Pass these fields through the input's `compose` option:

| Field                    | Contract                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `markdown`               | Defaults to `true`: source-backed Markdown presentation, list/quote continuation and bold/italic commands. Set `false` for plain composition.                                                                                                                                                                                                                                                                                        |
| `recognize(text)`        | Synchronous, pure token recognizer; defaults to no tokens.                                                                                                                                                                                                                                                                                                                                                                           |
| `triggers`               | Ordered `{ pattern: RegExp, source }` rules. Match a nonempty suffix on the current line before the caret, stopping at atomic tokens. Capture 1 supplies the query, otherwise the full match does. Acceptance replaces the full match. Lookbehind can exclude a prefix without consuming it. `^` anchors the current line segment, not the entire document: require `context.from === 0` in the source for a document-start command. |
| `compact`                | Defaults to `true`: content-sized picker at the query/token row. `false` fills the editing surface width and prefers above the whole editor, excluding its caption.                                                                                                                                                                                                                                                                  |
| `position`               | Compact placement: `top` (default) or `bottom`; available space may flip it.                                                                                                                                                                                                                                                                                                                                                         |
| `bias`                   | Compact gap in CSS pixels, default `6`; noncompact placement uses zero gap.                                                                                                                                                                                                                                                                                                                                                          |
| `newlineKey`             | `Enter` (default), `Alt-Enter` or `Shift-Enter`. Unselected shortcuts among these three do not insert a newline.                                                                                                                                                                                                                                                                                                                     |
| `submitOnEnter`          | Defaults to false. Plain Enter submits after picker/token actions.                                                                                                                                                                                                                                                                                                                                                                   |
| `submitOnModEnter`       | Defaults to false. Opt in to Ctrl/Meta-Enter submission with the same picker/token precedence. Without this option, the editor retains its ordinary modified-key handling.                                                                                                                                                                                                                                                           |
| `onsubmit(text, event?)` | Application admission callback. The native keyboard path supplies its `KeyboardEvent`, including modifiers. Existing one-argument callbacks continue to work. The application owns validation, delivery and retry identity.                                                                                                                                                                                                          |

A source receives `{ text, from, to, query, token?, signal }` and returns `[{ label, insertText, icon?, description?, group? }]` synchronously or by promise. Candidate labels, optional descriptions and token explanations are literal text. `icon` is an authored native icon name such as `cube`, a legacy Font Awesome class string such as `fas fa-file-lines`, or a supported single emoji such as `🧩`, rendered by the native icon plugin. Supply the icon stylesheet for font icons; emoji do not require it. Do not forward remote icon values or markup. Icons are decorative; the label remains the accessible option name and a supplied description is linked as its accessible description. Rows show the icon, label and muted description on one line, truncating long text within the picker width. Label-only sources remain supported. Optional `group` is literal heading text, shown before the first candidate in each nonempty group transition. Candidate order is preserved, so repeated nonadjacent groups get separate headings. Empty groups add no heading. Headings are not selectable: arrows and Enter operate on candidates only, including candidates with identical labels. Group context joins the accessible description; the accessible name remains the candidate label. Acceptance replaces the captured range with `insertText` in one undoable transaction. Sources should honor the AbortSignal and retain their own application/session ownership. The editor rejects late results after document/selection/configuration changes, blur, disable, read-only, unmount or destruction. Failures leave the query intact and show an unavailable message.

Each token has `{ from, to, kind, label?, icon?, contentFrom?, contentTo?, info?, replace? }`. Offsets are UTF-16, `to` is exclusive, and ranges must be nonempty, in bounds and single-line. The first returned range wins overlaps. Invalid ranges are ignored; recognition errors leave ordinary text visible.

- `kind: 'atomic'` displays a native label with an optional `icon` over an indivisible source range. Click or adjacent arrows highlight it; the next arrow exits, and deletion acts on the whole token. Navigation does not reopen autocomplete. Undo restores its source.
- `kind: 'inline'` keeps text editable with inline-code presentation. Optional content bounds hide delimiters outside editing. Deleting the final editable character removes delimiters in the same transaction.
- `info` supplies a plain-text explanation; omit it when token hover/keyboard explanations are unwanted. Optional `replace` opens a replacement source from a dropdown or Enter on the fully selected token. Omit `replace` for selectable/deletable references without replacement controls.

Suggestion labels and icons default to `var(--jam-color-fg-muted)`; descriptions and group indicators use `var(--jam-color-fg-faint)`. Group indicators retain the faint role independently of candidate color overrides. Their default size is `var(--jam-typography-font-size-s)`. Set these optional CSS properties on the compose input or an ancestor to scope its picker presentation:

| Property                                 | Default                             |
| ---------------------------------------- | ----------------------------------- |
| `--jam-compose-picker-font-size`         | `var(--jam-typography-font-size-s)` |
| `--jam-compose-picker-color`             | `var(--jam-color-fg-muted)`         |
| `--jam-compose-picker-description-color` | `var(--jam-color-fg-faint)`         |

The picker reads these values when its content updates and carries them into its popup outside the input's inheritance tree. A subsequent query update or reopening picks up changed inherited values. For example, an application can set `--jam-compose-picker-font-size: min(var(--jam-typography-font-size-s), var(--app-chat-font-size, var(--jam-typography-font-size-m)))` to keep suggestions no larger than its own chat text. These properties do not change inline token colors or text size.

Inline and resting atomic token text uses `var(--jam-color-fg-primary)` for readable accented text on ordinary surfaces. Selected atomic tokens pair a primary fill with `var(--jam-color-on-primary)`. See [foreground and fill roles](../Theme/color.md#foregrounds).

### Minimal composition

This self-contained example uses an application-defined demonstration grammar; replace its grammar and catalog with the receiving application's canonical references. All token and candidate content remains data.

```javascript
const references = [{ id: "guide", label: "Guide" }];
const source = ({ query }) =>
  references
    .filter((item) => item.label.toLowerCase().startsWith(query.toLowerCase()))
    .map((item) => ({ label: item.label, insertText: `[[ref:${item.id}]] ` }));

const composer = {
  type: "input-compose",
  valueKey: "draft",
  rows: "auto",
  minRows: 2,
  maxRows: 18,
  attrs: { "aria-label": "Message" },
  styles: ["input.ghost"],
  compose: {
    compact: false,
    newlineKey: "Alt-Enter",
    triggers: [{ pattern: /(?<![\w@])@([a-z]*)$/i, source }],
    recognize(text) {
      return Array.from(text.matchAll(/\[\[ref:([a-z]+)\]\]/g)).flatMap(
        (match) => {
          const item = references.find((entry) => entry.id === match[1]);
          return item
            ? [
                {
                  from: match.index,
                  to: match.index + match[0].length,
                  kind: "atomic",
                  label: item.label,
                },
              ]
            : [];
        },
      );
    },
  },
};
```

A newly typed query stays plain text, including an exact current match from `recognize`. Explicitly choosing a suggestion releases that draft for token recognition; the application’s `recognize` callback determines its token presentation. Unchosen drafts remain plain after Escape, blur, moving the caret away or continuing into an unmatched query. Space is query text, never an acceptance key: configure the trigger to include spaces when candidate names can contain them, for example `/\/([a-z -]*)$/`. Keep the full query, including its spaces, when filtering candidates. A single or exact match never commits automatically. Only explicit Tab/Enter/candidate-click acceptance chooses an item. When an automatic query returns no candidates, its flyout closes without changing the source text. Normal editor key handling resumes after dismissal; pending and failed lookups retain their existing Enter guards. Explicit toolbar/replacement requests may still show an empty state.

Committed/restored tokens keep whole-token selection and deletion; moving back to them does not reopen lookup or edit their interior. Undoing acceptance restores the original plain-text draft against current configuration. Native composition edits the query as plain text and does not accept a suggestion. Restored and pasted complete references reconstruct from `recognize`. Candidate `insertText` is inserted literally, so the source owns any intended trailing delimiter.

A contiguous query retains the same popup and native list until acceptance, dismissal or no matches. The first lookup shows a loading message. Later pending lookups keep the last settled rows visible and mark the list busy and its options unavailable; arrows, Enter, Tab and pointer actions cannot select or accept those stale rows. Only results for the current request replace them and enable choice. Current empty results close automatic suggestions; explicit requests retain an empty message. Failures show an unavailable message without editing the query. The last settled highlighted candidate is retained across pending revisions when its label, inserted text and group still match the current results; otherwise the first result is highlighted. Moving away, Escape, blur and disposal cancel the request and close owned presentation. Late or aborted responses cannot reopen it.

### Toolbar suggestions and editor ownership

`input.requestComposeSuggestions(source)` opens the editor-owned [flyout](popup.md#root-bound-flyouts) at its retained current selection and restores editor focus. It returns a boolean synchronously. The source receives the selected range and its text as `query`, or an empty query at a caret; it cannot expand the captured replacement range. Acceptance uses the same native undo transaction as typed triggers. This supports a reference toolbar button without exposing editor selection internals or creating another popup.

The method returns false if the editor is unavailable, detached, disabled, read-only, composing or destroyed, or if focus callbacks invalidate the captured editor state. It never queues a toolbar request while the editor bundle loads. Await `editorReady` before enabling an editor-dependent toolbar. A true result means the request was accepted, not that asynchronous suggestions have arrived.

Do not apply textarea `selectionStart`/`selectionEnd` or `execCommand` insertion to compose input: `getAgent()` returns its contenteditable surface. Equal bound-value echoes preserve history; a distinct authoritative `value` replacement resets history and clamps the caret. External values arriving during composition are deferred until composition ends. Use picker acceptance for undoable reference insertion rather than rewriting the full bound draft. After deliberately replacing the draft (for example, appending a recalled message), `await input.focus('end')` moves the compose caret to the current document end and scrolls it into view. Ordinary `focus()` preserves selection. The optional movement is skipped during IME or if focus handlers invalidate the editor state; other input modes retain their existing focus behavior.

Up/Down highlight candidates; Enter first accepts the current picker, then opens a selected token's replacement picker, then submits or inserts the configured newline. Opted-in Ctrl/Meta-Enter follows the same priority. Repeated Enter events do not accept or submit. IME confirmation remains native. Configured Alt/Shift-Enter newline dismisses a picker without accepting and is undoable. Escape closes. Plain Tab accepts a current candidate once. While lookup is pending, plain Tab is consumed without acceptance or indentation. Otherwise Tab and Shift-Tab use the editing commands above; Escape followed by Tab allows focus navigation. Plain Enter during pending, empty or failed lookup never submits or inserts a newline. Avoid a second bubbling Enter handler that submits the same event; route admission through `onsubmit`.

For file paste uploads, register a lifecycle-managed **capture-phase** `paste` listener on the input host, preventing default only when clipboard files are handled. A bubbling `on.paste` listener runs after CodeMirror may have replaced the selection with clipboard text. Remove the listener during owner teardown and preserve normal text paste. Attachments and their upload lifecycle remain application-owned.

### Growth, presentation and limits

Compose wraps and grows natively. `rows: 'auto'` uses `minRows` as its minimum; numeric `rows` sets a minimum height. A positive `maxRows` caps the scrolling editing viewport in line-height units; nonpositive values leave it uncapped. For an 18-row composer, set `maxRows: 18`; no textarea auto-row plugin is needed. This limits visible height, not source length. Set the inheritable `--jam-compose-max-height` to an application-owned CSS length or viewport calculation to cap the same scroller further on short screens. Both its minimum and maximum respect this allowance; no second overflow wrapper is needed.

Keep toolbar and usage-stat spacing in the surrounding application container. `input.ghost` supports a transparent input with native focus treatment. For one shared outline, follow the wrapper `:focus-within` pattern below. The compose content uses `--jam-space-s` padding; the code editor's `--code-padding` setting is not its padding owner.

The owned picker has a compact candidate contract with optional icon, description and group heading. It does not automatically re-anchor on subsequent editor scroll/resize, and it is not an arbitrary rich-content command palette. Native browser checks do not establish real IME or assistive-technology behavior on every platform; qualify those in the consuming application.

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
