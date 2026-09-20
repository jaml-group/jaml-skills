# switch

**Class:** `SunflowerSwitch` · **Type:** `"switch"` · **Extends:** `AbstractInputElement`

A boolean toggle control available in six visual subtypes. The value is always a `boolean` (the internal `modifier` defaults to `toBoolean`, so any truthy input becomes `true`).

| Composite type | Specialization | Description |
|---|---|---|
| `"switch"` (default) | `"slider"` | Sliding toggle with `<input type="range">` |
| `"switch-checkbox"` | `"checkbox"` | Styled checkbox with checkmark animation |
| `"switch-radio"` | `"radio"` | Styled radio button |
| `"switch-button"` | `"button"` | Button that toggles `jam-checked` on click |
| `"switch-ghost"` | `"ghost"` | Transparent/ghost button |
| `"switch-outline"` | `"outline"` | Outline-styled button |

---

## JAML usage

```json jaml-playground
{
  "type": "switch",
  "cap": "Dark Mode",
  "defaultValue": false
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | Alias for `value`. Get or set the boolean state. |
| `indeterminate` | `boolean` | `false` | Tri-state indeterminate mode (checkbox subtype). Displays a dash instead of check/empty. |
| `bindKey` | `string` | — | Keyboard shortcut key (e.g. `"Space"`, `"Enter"`). Pressing the key toggles value. |
| `holdingOn` | `boolean` | `false` | When `true`, value is `true` only while the mouse button or key is held down (`mousedown`/`keydown` sets `true`, `mouseup`/`keyup` sets `false`). |
| `triggeredByKey` | `boolean` | `false` | Read-only flag: `true` if the last `setValue()` came from a keyboard event. |

---

## Slots

| Slot | Description |
|---|---|
| `icon` | Icon content (all subtypes). |
| `cap` (default) | Label text (all subtypes). |
| `box` | Custom checkbox/radio box element. Auto-created as `<span class="box"><span class="check"></span></span>` for checkbox/radio subtypes if not provided. |
| `slider` | Custom slider input. Auto-created as `<input type="range" min="0" max="100">` for the slider subtype if not provided. |

---

## Events

| Event | Detail | Description |
|---|---|---|
| `valuechange` | `{ value, oldValue }` | Inherited from `AbstractInputElement`. Fired when the value changes. |
| `keydown` | `{ code, key, shiftKey, ctrlKey, altKey, metaKey }` | Fired when `bindKey` is pressed. |
| `keyup` | `{ code, key, shiftKey, ctrlKey, altKey, metaKey }` | Fired when `bindKey` is released. |
| `click` | — | Toggles value (unless `holdingOn` is `true`, in which case `mousedown`/`mouseup` are used). |

---

## Examples

### Default slider toggle

```json jaml-playground
{
  "type": "switch",
  "cap": "Enable notifications",
  "defaultValue": true
}
```

### Checkbox with indeterminate state

```javascript jaml-playground
export default {
  type: 'switch-checkbox',
  cap: 'Select All',
  indeterminate: true,
  onvaluechange: function(checked) {
    console.log(`Checked: ${checked}`)
  }
}
```

### Button with hold-to-activate mode

```javascript jaml-playground
export default {
  type: 'switch-button',
  cap: 'Hold to Record',
  icon: 'mic',
  holdingOn: true,
  onvaluechange: function(active) {
    if (active) startRecording()
    else stopRecording()
  }
}
```

### Keyboard-bound switch

```javascript jaml-playground
export default {
  type: 'switch',
  cap: 'Toggle Panel (Space)',
  bindKey: 'Space'
}
```

### Reactive value bound to a container variable

```javascript jaml-playground
export default {
  type: 'container',
  vars: { featureEnabled: false },
  components: [
    {
      type: 'switch',
      cap: 'Feature Flag',
      valueKey: 'featureEnabled'
    },
    {
      type: 'indicator',
      cap: 'Status',
      value: '{{featureEnabled ? "ON" : "OFF"}}',
      state: '{{featureEnabled ? "success" : "default"}}'
    }
  ]
}
```

### Ghost and outline subtypes in a button bar

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["wrapper.buttonwrapper"],
  "components": [
    { "type": "switch-ghost", "cap": "Ghost" },
    { "type": "switch-outline", "cap": "Outline" }
  ]
}
```

---

## Notes

- Setting `value` to `true` automatically clears `indeterminate` to `false`.
- The `checked` property is a direct alias for `value`. Reading `el.checked` returns the current boolean state; setting `el.checked = true` is equivalent to `el.setValue(true)`.
- The `button`/`ghost`/`outline` subtypes apply `Stylize.button` and add `jam-ghost` for ghost mode.
- For the `slider` subtype, the internal range input value is set to `100` when checked and `0` when unchecked.
