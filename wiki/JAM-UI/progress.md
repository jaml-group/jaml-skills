# progress

**Class:** `PeachProgress` · **Type:** `"progress"` · **Extends:** `AbstractInputElement`

A progress bar backed by a native `<progress>` element. Accepts values from `0` to `1` or percentage strings like `"75%"`.

---

## JAML usage

```json jaml-playground
{
  "type": "progress",
  "cap": "Upload Progress",
  "value": 0.6,
  "formatter": "(v) => `${Math.round(v * 100)}%`"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement), including `value`, `defaultValue`, `formatter`, `rules`, and the state machine.

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| string` | — | Progress value: `0`–`1` (e.g. `0.75`) or percent string (e.g. `"75%"`). |
| `cap` | `string` | — | Label text above the bar. |
| `formatter` | `(value) => string` | — | Transform value for display text (shown as `formatted` attribute on progress). |

---

## Value format

| Input | Meaning |
|---|---|
| `0.75` | 75% |
| `"75%"` | 75% |
| `0` | 0% |
| `1` | 100% |
| `null` / `undefined` | Treated as 0% |

The value is clamped to `[0, 1]` before display.

---

## CSS variables

The element sets two CSS custom properties on itself:

| Variable | Value |
|---|---|
| `--p-val` | Current percentage as `%` string (e.g. `"75%"`) |
| `--p-factor` | `100 / percentage` (useful for inverse scaling) |

---

## Instance methods

Inherits all `AbstractInputElement` methods, plus:

| Method | Description |
|---|---|
| `progress.setContent(content)` | Manually set the `formatted` attribute on the internal `<progress>` element (useful for custom display text). |

---

## Examples

### Basic progress bar

```json jaml-playground
{
  "type": "progress",
  "cap": "Loading",
  "value": 0.35
}
```

### Reactive via valueWatcher

```json jaml-playground
{
  "type": "progress",
  "cap": "Upload",
  "formatter": "(v) => `${Math.round(v * 100)}%`",
  "valueWatcher": "uploadProgress"
}
```

### From percentage string

```javascript jaml-playground
export default {
  type: 'progress',
  cap: 'Completion',
  value: '65%'
}
```

### Linked with indicator and input

```json jaml-playground
{
  "type": "container",
  "vars": { "threshold": 0.35 },
  "components": [
    {
      "type": "indicator",
      "cap": "Threshold",
      "unit": "%",
      "formatter": "(v) => (v * 100).toFixed(1)",
      "valueWatcher": "threshold"
    },
    {
      "type": "progress",
      "cap": "Progress",
      "valueWatcher": "threshold"
    },
    {
      "type": "input-number",
      "cap": "Set Threshold",
      "step": 0.01,
      "defaultValue": 0.35,
      "valueKey": "threshold"
    }
  ]
}
```

### Dynamic progress with state coloring

```javascript jaml-playground
export default {
  type: 'container',
  vars: { progress: 0 },
  components: [
    {
      type: 'progress',
      cap: 'Task Progress',
      valueWatcher: 'progress',
      formatter: '(v) => `${Math.round(v * 100)}%`',
      styles: ['color.stateMap({colors:{idle:"gray",slow:"orange",fast:"green",done:"blue"}})'],
      valueStates: {
        idle: (value) => value <= 0,
        slow: (value) => value > 0 && value < 0.33,
        fast: (value) => value >= 0.33 && value < 1,
        done: (value) => value >= 1
      }
    },
    {
      type: 'button',
      cap: 'Simulate Progress',
      onclick: function() {
        let p = 0
        const interval = setInterval(() => {
          p += 0.1
          this.model.progress = Math.min(p, 1)
          if (p >= 1) clearInterval(interval)
        }, 500)
      }
    }
  ]
}
```

---

## Notes

- The element uses a native `<progress max="100">` internally, mapping the `0–1` value to `0–100`.
- `formatter` output is stored in the `formatted` attribute on the `<progress>` element, available for CSS `attr()` display tricks.
- `valueStates` derives the progress state from its value, while `color.stateMap` maps that state to an accent color. Do not combine `valueStates` with `states`.
