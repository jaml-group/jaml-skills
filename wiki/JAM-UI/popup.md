# popup

**Class:** `PapayaPopup` · **Type:** `"popup"` · **Extends:** `AbstractElement` · **Global:** `papaya`

`PapayaPopup` is a floating overlay element. It is **not** placed via JAML (`type: 'popup'` is not a valid JAML component entry). Instead it is triggered imperatively — via the `papaya` global singleton, or via the `element.popup()` helper available on every JAM-UI element.

---

## `papaya` — global singleton

`papaya` is a globally available `PapayaPopup` instance created once at startup. Use it to show persistent or reused popups.

```javascript
// Show a popup anchored to a button
const btn = document.querySelector('#my-button')
papaya.show(btn, 'Hello from popup!')

// Hide it
papaya.hide()

// Hide after 500ms
papaya.hide(500)
```

---

## `papaya.show(target, content, option?)`

Show the popup anchored to `target`.

| Argument | Type | Description |
|---|---|---|
| `target` | `HTMLElement \| MouseEvent` | Element to anchor to, or a mouse event (for cursor-relative positioning). |
| `content` | `any \| Function` | Content to display. Can be a string, DOM node, or `(target, popup) => content` function. |
| `option` | `ShowPopupOption` | Display options (see below). |

---

## `papaya.hide(delay?)`

Hide the popup after an optional delay (ms).

---

## `element.popup()` — helper on every JAM-UI element

Every JAM-UI element has a `popup()` and `closePopup()` method inherited from `AbstractElement`. These show a per-element popup without needing the global singleton.

```javascript
const input = model.ref.emailInput
input.popup('Please enter a valid email address', {
  position: 'bottom',
  showDelay: 0
})

// Close it after 2 seconds
setTimeout(() => input.closePopup(200), 2000)
```

Inside an element hook (`onclick`, etc.) use `this` directly:

```javascript jaml-playground
export default {
  type: 'input',
  cap: 'Email',
  onvaluechange: function(value) {
    // this = the input element
    if (!value.includes('@')) {
      this.popup('Please enter a valid email address', { position: 'bottom' })
    } else {
      this.closePopup()
    }
  }
}
```

---

## `element.popup(message, option?)`

| Argument | Type | Description |
|---|---|---|
| `message` | `any` | Content to show. HTML strings and DOM nodes are supported. |
| `option` | `ShowPopupOption` | Display options (see below). Defaults to `unified: true`, `clickElsewhere2Hide: true`. |

## `element.closePopup(delay?)`

Hide the element's popup.

---

## Declarative: `tip` and `help` params

For common use cases, use the declarative `tip` and `help` params instead of calling `popup()` directly. The parent element must include the corresponding plugin in its `plugins` array: `'popup.tip'` for tip support, `'popup.helper'` for help support.

```json jaml-playground
{
  "type": "input",
  "cap": "Password",
  "plugins": ["popup.tip", "popup.helper"],
  "tip": "Hover to see requirements",
  "help": "Password must be at least 8 characters with one number."
}
```

- `tip` — shows on hover after a delay, uses `PopupType.tip` profile. Requires `plugins: ['popup.tip']` on the element or a parent.
- `help` — shows as a persistent help popup, uses `PopupType.help` profile. Requires `plugins: ['popup.helper']` on the element or a parent.

---

## `ShowPopupOption` fields

| Field | Type | Default | Description |
|---|---|---|---|
| `position` | `PositionString` | `'top'` | Popup placement: `'top'`, `'bottom'`, `'left'`, `'right'`, `'bottom-right'`, etc. |
| `align` | `MoveAlign \| MoveAlign[] \| string` | — | Alignment override passed to `MelonMove` for popup positioning. |
| `snapTo` | `'cursor' \| 'target'` | `'target'` | What the popup snaps to for positioning — the cursor or the target element. |
| `triggerBy` | `'click' \| 'hover' \| 'rightClick'` | `'click'` | What triggers the popup to show. |
| `showDelay` | `number` | `0` | Delay in ms before showing. |
| `hideDelay` | `number` | `0` | Delay in ms before hiding (auto-calculated for hover mode when not set). |
| `stay` | `boolean` | `true` | Keep showing when hovering over the popup itself. |
| `exclusive` | `boolean \| string` | `false` | Hide other popups of the same type when this shows. |
| `unified` | `boolean` | `false` | Use a single popup instance for the element (reuse across calls). |
| `dynamic` | `boolean \| Function` | `false` | Popup follows the cursor. |
| `moreSteady` | `boolean` | `false` | Smoother positioning — avoids repositioning on minor positional changes. |
| `click2Hide` | `boolean` | `false` | Clicking the popup hides it. |
| `clickElsewhere2Hide` | `boolean` | `true` | Clicking outside hides the popup. |
| `autoFlip` | `boolean` | `true` | Auto-flip position if the popup would go off-screen. |
| `alignWithCursor` | `boolean \| Function` | `true` | Align arrow with cursor position. |
| `arrowAlignWithCursor` | `boolean` | `true` | Keep arrow pointing at cursor. |
| `allowOverflow` | `boolean \| Function` | `false` | Allow popup to overflow scroll container. |
| `showArrow` | `boolean` | `true` | Show the directional arrow. |
| `showAnima` | `string` | `'show-popup 300ms ease-out'` | CSS animation for show. |
| `hideAnima` | `string` | `'hide-popup 250ms ease-in-out forwards'` | CSS animation for hide. |
| `container` | `HTMLElement \| Function` | `document.body` | Container element to append the popup into. |
| `manuallyUpdatePos` | `boolean` | `false` | Disable automatic position updates. Set `true` when controlling position manually. |
| `moveAlong` | `boolean` | `false` | Popup follows the target element when it moves (e.g. during drag). |
| `moveAlongThrottle` | `number` | `25` | Throttle interval for move-along behavior in ms. |
| `moveDebug` | `boolean \| number` | `false` | Enable debug mode for position calculation. |
| `noFlash` | `boolean` | `false` | Prevent flash animation when re-showing a previously visible popup. |
| `color` | `ColorType` | — | Popup accent color. |
| `style` | `Dictionary \| string` | — | Inline styles to apply to the popup content. |

---

## Events

| Event | Detail | Description |
|---|---|---|
| `showing` | `{ target, content, container }` | Fired when the popup becomes visible. |
| `hiding` | — | Fired when the popup starts its hide animation. |

---

## `PopupType` enum

Predefined type profiles with specific default options.

| Value | Trigger | Exclusive | Notes |
|---|---|---|---|
| `PopupType.default` | `click` | No | General-purpose |
| `PopupType.tip` | `hover` | `'tip'` | Tooltip — shows after 1000ms delay |
| `PopupType.help` | `click` | `'help'` | Help popup |
| `PopupType.title` | `hover` | `'title'` | Title tooltip — shows after 2000ms |
| `PopupType.floatingTip` | `hover` | `'floatingTip'` | Follows cursor, no arrow |
| `PopupType.contextMenu` | `rightClick` | `'contextMenu'` | Right-click menu, no arrow |
| `PopupType.shortcuts` | `hover` | `'shortcuts'` | Shortcut overlay, no arrow |
| `PopupType.selector` | `click` | `'selector'` | Selector dropdown |
| `PopupType.dropDown` | `click` | `'dropDown'` | Dropdown menu with expand/collapse animation |

```javascript
import { PapayaPopup, PopupType } from 'jam-ui'

papaya.show(target, content, { ...getPopupProfile(PopupType.tip), showDelay: 500 })
// Shorthand for dropdown
jam.dropDown(target, content, { position: 'bottom' })
```

---

## Instance properties & methods

### Properties

| Property | Type | Description |
|---|---|---|
| `popup.target` | `Function \| HTMLElement` | Get/set the target element (or a function returning it) to anchor to. |
| `popup.eventTarget` | `HTMLElement` | Get/set the element that receives the trigger events. |
| `popup.showing` | `boolean` | Read-only. Whether the popup is currently visible. |
| `popup.content` | `any \| Function` | Get/set the popup content. |

### Methods

| Method | Description |
|---|---|
| `popup.setContent(content)` | Update the popup content at runtime without re-showing. |
| `popup.reapplyContent()` | Re-apply the current content (useful when content is a function). |
| `popup.updatePosition(noFlash?)` | Manually recalculate and apply the popup position. |
| `popup.moveToCursor()` | Move the popup to the current cursor position. |
| `popup.moveToCoord(coord)` | Move the popup to a specific `{ x, y }` coordinate. |
| `popup.moveToTarget()` | Move the popup to follow the target element. |
| `popup.bindEvents()` | Bind trigger events on `eventTarget` (required for standalone instances). |
| `popup.destroy()` | Clean up the popup instance. |

### Static methods

| Method | Description |
|---|---|
| `PapayaPopup.hideAllTips(filter?)` | Hide all matching popups. `filter` can be a PopupType string or filter function. |

---

## Slots

| Slot | Description |
|---|---|
| `rect` (default) | Main content area of the popup. |
| `arrow` | Directional arrow element pointing at the target. |

---

## Creating a standalone popup

For a persistent or specially configured popup, create a `PapayaPopup` instance directly:

```javascript
import { PapayaPopup, PopupType } from 'jam-ui'

const myPopup = new PapayaPopup({
  type: PopupType.contextMenu,
  removeOnHiding: false
})

myPopup.bindEvents()   // if using eventTarget
myPopup.show(target, content, { position: 'bottom' })
```

---

## Examples

### Basic anchored popup

```javascript jaml-playground
export default {
  type: 'input',
  cap: 'Show Info',
  onfocus: function() {
    this.popup('This field accepts text input', {
      position: 'top',
      showDelay: 0
    })
  }
}
```

### Validation help with element.popup()

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'input',
      cap: 'Password',
      rules: { required: true, minlength: 8 },
      onvaluechange: function(value) {
        if (value && value.length < 8) {
          this.popup('At least 8 characters required', {
            position: 'bottom',
            color: 'warn'
          })
        } else {
          this.closePopup()
        }
      }
    }
  ]
}
```

### Right-click context menu

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'wrapper',
      cap: 'Right-click me',
      id: 'context-target',
      styles: ['css(padding:1rem;border:1px dashed var(--jam-border))'],
      onmount: function() {
        // Bind a context-menu popup on mount
        papaya.eventTarget = this
        papaya.type = 'contextMenu'
        papaya.content = `
          <div style="padding:0.5rem 1rem;cursor:pointer">Edit</div>
          <div style="padding:0.5rem 1rem;cursor:pointer">Copy</div>
          <div style="padding:0.5rem 1rem;cursor:pointer">Delete</div>
        `
        papaya.bindEvents()
      }
    }
  ]
}
```

### Dynamic popup following the cursor

```javascript jaml-playground
export default {
  type: 'input',
  cap: 'Hover for details',
  onfocus: function() {
    this.popup('This popup follows your mouse', {
      dynamic: true,
      position: 'bottom-right',
      showArrow: false,
      showDelay: 0
    })
  }
}
```

### Tooltip-style with delay

```json jaml-playground
{
  "type": "input",
  "cap": "Submit",
  "plugins": ["popup.tip", "popup.helper"],
  "tip": "Save and continue to the next step",
  "help": "This action cannot be undone. Make sure all fields are correct."
}
```
