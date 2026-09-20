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

| Param | Type | Default | Description |
|---|---|---|---|
| `cap` | `string` | — | Button label text. Fills the `cap` slot. |
| `icon` | `string` | — | Icon content. Fills the `icon` slot. Can be emoji, text, or icon name. |
| `bindKey` | `string` | — | Keyboard shortcut. Pressing the key fires a `click` event. |
| `repeat` | `boolean \| number` | `0` | Hold-to-repeat interval in ms. `true` defaults to 50ms. |
| `repeatDelay` | `number` | `500` | Delay in ms before repeat starts. |

---

## Slots

| Slot | Description |
|---|---|
| `icon` | Icon content (left of cap) |
| `cap` (default) | Button label text |

---

## Events

| Event | Description |
|---|---|
| `click` | Standard DOM click. When triggered via keyboard bind, event detail includes `code`, `key`, `shiftKey`, `ctrlKey`, `altKey`, `metaKey`. |

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

- When `disabled` is set to a string, a popup with that message appears on hover or click.
- `bindKey` fires both on keydown (adding `jam-active` CSS class) and keyup.
- `repeat` + `repeatDelay` enable auto-repeat. Useful for increment/decrement buttons.
