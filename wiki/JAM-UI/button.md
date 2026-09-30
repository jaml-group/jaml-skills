# button

**Class:** `BananaButton` · **Type:** `"button"` · **Extends:** `AbstractElement`

A standard click button with icon and cap slots. Supports keyboard binding, hold-to-repeat, and visual specializations. Use composite types such as `"button-cta"`, `"button-ghost"`, `"button-outline"`, `"button-fab"`, or `"button-link"`.

---

## JAML usage

```json jaml-playground
{
  "type": "button",
  "cap": "Submit",
  "icon": "✓",
  "color": "green"
}
```

---

## Params

Inherits all params from [AbstractElement](./JAM-UI.md).

| Param         | Type                        | Default | Description                                                                                                                  |
| ------------- | --------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `cap`         | `string \| Text \| Element` | —       | Fills the `cap` slot; strings can contain authored HTML. See [literal slot text](./JAM-UI.md#slot-content-and-literal-text). |
| `icon`        | `string`                    | —       | Icon content. Fills the `icon` slot. Can be emoji, text, or icon name.                                                       |
| `bindKey`     | `string`                    | —       | Keyboard shortcut. Pressing the key fires a `click` event.                                                                   |
| `repeat`      | `boolean \| number`         | `0`     | Hold-to-repeat interval in ms. `true` defaults to 50ms.                                                                      |
| `repeatDelay` | `number`                    | `500`   | Delay in ms before repeat starts.                                                                                            |

---

## Slots

| Slot            | Description                |
| --------------- | -------------------------- |
| `icon`          | Icon content (left of cap) |
| `cap` (default) | Button label text          |

---

## Events

| Event   | Description                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `click` | Standard DOM click. When triggered via keyboard bind, event detail includes `code`, `key`, `shiftKey`, `ctrlKey`, `altKey`, `metaKey`. |

---

## Focused keyboard activation

In the updated development runtime, a focused button host handles Enter on keydown and Space on release. It ignores browser key-repeat duplication, composition, and Alt/Ctrl/Meta combinations; `repeat` is the separate opt-in hold behavior. Disabled buttons do not activate. Key events originating from a nested input or another nested control are not treated as activation of the button host. Handlers reached before the framework's window-bubble listener can call `preventDefault()` to suppress activation. This is a listener fallback, not a browser-native post-dispatch default action; later window listeners cannot reliably cancel an already-fired click.

Key release clears held state and repetition even when an application handler stops subsequent `keyup` propagation. Blur, disabling or disconnection also clears held state and repetition.

The caller owns the appropriate role and focusability. For an ordinary button, set `attrs: { role: 'button', tabindex: '0' }`; retain the role/tabindex required by an enclosing menu or other interaction instead of overwriting it. The framework's focused activation does not implement a complete menu, group navigation or ARIA pattern.

Explicit `bindKey` shortcuts are separate: their click is generated on keydown, while keyup removes active state and ends repetition. Ordinary focused activation is not a second shortcut registration. Older 1.6.0 bundles may lack focused activation; verify the consuming runtime and the actual keyboard interaction.

---

## Examples

### CTA button

```json jaml-playground
{
  "type": "button-cta",
  "cap": "Get Started",
  "icon": "→"
}
```

### Ghost and outline subtypes

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["wrapper.buttonwrapper"],
  "components": [
    { "type": "button-ghost",  "cap": "Ghost" },
    { "type": "button-outline","cap": "Outline" },
    { "type": "button-link",   "cap": "Link" },
    { "type": "button-fab",    "icon": "✏️" }
  ]
}
```

### Button with keyboard shortcut

```javascript jaml-playground
export default {
  type: 'button',
  cap: 'Confirm',
  bindKey: 'Enter',
  onclick: () => console.log('Enter pressed or clicked')
}
```

### Disabled with message tooltip

```json jaml-playground
{
  "type": "button",
  "cap": "Delete",
  "disabled": "<b>Deletion is disabled</b> — you do not have permission"
}
```

### Auto-repeat button (hold to increment)

```javascript jaml-playground
export default {
  type: 'container',
  vars: { count: 0 },
  components: [
    { type: 'indicator', cap: 'Count', value: '{{count}}' },
    {
      type: 'button',
      icon: '+',
      repeat: 100,
      repeatDelay: 400,
      onclick: function() { this.model.vars.count++ }
    }
  ]
}
```

---

## Notes

-   When `disabled` is set to a string, a popup with that message appears on hover or click.
-   `bindKey` activates on keydown; keyup clears `jam-active` and stops repetition. See [focused activation](#focused-keyboard-activation) for the separate button-host behavior.
-   `repeat` + `repeatDelay` enable auto-repeat. Useful for increment/decrement buttons.
