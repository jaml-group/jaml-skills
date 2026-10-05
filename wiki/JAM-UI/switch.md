# switch

**Class:** `SunflowerSwitch` · **Type:** `"switch"` · **Extends:** `AbstractInputElement`

A boolean toggle control available in six visual subtypes. The value is always a `boolean` (the internal `modifier` defaults to `toBoolean`, so any truthy input becomes `true`).

| Composite type       | Specialization | Description                                |
| -------------------- | -------------- | ------------------------------------------ |
| `"switch"` (default) | `"slider"`     | Sliding toggle with `<input type="range">` |
| `"switch-checkbox"`  | `"checkbox"`   | Styled checkbox with checkmark animation   |
| `"switch-radio"`     | `"radio"`      | Styled radio button                        |
| `"switch-button"`    | `"button"`     | Button that toggles `jam-checked` on click |
| `"switch-ghost"`     | `"ghost"`      | Transparent/ghost button                   |
| `"switch-outline"`   | `"outline"`    | Outline-styled button                      |

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

| Param            | Type      | Default | Description                                                                                                                                       |
| ---------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked`        | `boolean` | —       | Alias for `value`. Get or set the boolean state.                                                                                                  |
| `indeterminate`  | `boolean` | `false` | Tri-state indeterminate mode (checkbox subtype). Displays a dash instead of check/empty.                                                          |
| `bindKey`        | `string`  | —       | Global shortcut while the document body has focus (e.g. `"Space"`, `"Enter"`); separate from slider focused activation.                           |
| `holdingOn`      | `boolean` | `false` | When `true`, value is `true` only while the mouse button or key is held down (`mousedown`/`keydown` sets `true`, `mouseup`/`keyup` sets `false`). |
| `triggeredByKey` | `boolean` | `false` | Read-only flag: `true` if the last `setValue()` came from a keyboard event.                                                                       |

---

## Slots

| Slot            | Description                                                                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `icon`          | Icon content (all subtypes).                                                                                                                           |
| `cap` (default) | Label text (all subtypes).                                                                                                                             |
| `box`           | Custom checkbox/radio box element. Auto-created as `<span class="box"><span class="check"></span></span>` for checkbox/radio subtypes if not provided. |
| `slider`        | Custom slider input. Auto-created as `<input type="range" min="0" max="100">` for the slider subtype if not provided.                                  |

---

## Events

| Event         | Detail                                              | Description                                                                                 |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `valuechange` | `{ value, oldValue }`                               | Inherited from `AbstractInputElement`. Fired when the value changes.                        |
| `keydown`     | `{ code, key, shiftKey, ctrlKey, altKey, metaKey }` | Fired when `bindKey` is pressed.                                                            |
| `keyup`       | `{ code, key, shiftKey, ctrlKey, altKey, metaKey }` | Fired when `bindKey` is released.                                                           |
| `click`       | —                                                   | Toggles value (unless `holdingOn` is `true`, in which case `mousedown`/`mouseup` are used). |

---

## Examples

For mutually exclusive switches that can return to no selection, see the [cancelable switch-group recipe](../utils.md#cancelable-switch-group) and its runtime compatibility note. Use [group utilities](../utils.md#checked-state-and-group-helpers) when application code owns grouping; `updateSiblingsCheckedState` reconciles an already updated target without toggling it again.

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

## Slider focus, keyboard and accessibility

The corrected development runtime makes the default slider **host** the semantic `role="switch"` control and sole sequential focus stop. `getAgent()` returns that host for the slider subtype. The native range remains pointer-operated but is non-tabbable and hidden from accessibility. Other switch subtypes retain their existing agent and interaction contracts.

A caption names the host. For a captionless settings row, supply an accessible name through the public agent:

```javascript jaml-playground
export default {
    type: 'switch',
    value: false,
    oninit() { this.getAgent().setAttribute('aria-label', 'Enable plugin'); }
};
```

Focused Space or Enter activates once on keydown, prevents default scrolling, ignores repeated/composing/Ctrl/Alt/Meta key input and honors ordinary application handlers that call `preventDefault()`. `holdingOn` releases on keyup, blur, disconnection or disabled/read-only changes. Pointer behavior remains available through the range and host. Native host `aria-checked`, `aria-disabled` and `aria-readonly` follow current state; disabling removes the tab stop and reenabling restores it.

`setValueQuietly(value)` updates visual and ARIA state without another change notification. For an asynchronous external owner, quietly restore the accepted value before dispatching its action, then project the result when accepted. Native switching does not await external actions or own their rollback policy.

`bindKey` remains a **global body-focus shortcut**, separate from focused activation. It can match multiple registered controls; do not use it to implement focused Space/Enter. The pre-correction runtime returned null from `getAgent()` and lacked these slider semantics, so verify the delivered artifact before using this contract. Custom slider-slot behavior, other variants and assistive-technology support need their own acceptance checks.
