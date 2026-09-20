# notify

**Class:** `NutmegNotify` · **Type:** `"notify"` · **Extends:** `AbstractElement` · **Global:** `nutmeg`

`NutmegNotify` manages a self-contained notification stack and uses the `modal` stylize profile by default. It is **not** placed via JAML. Notifications are triggered imperatively via the `nutmeg` global proxy or the static `NutmegNotify.appendNotify()` method.

---

## `nutmeg` — global proxy (preferred API)

`nutmeg` is a proxy over the `NutmegNotify` class. Call level names as methods, or use any valid CSS color name as a method for custom-colored debug notifications.

```javascript
nutmeg.info('File saved successfully')
nutmeg.success('Account created!')
nutmeg.warn('Your session expires in 5 minutes')
nutmeg.error('Failed to connect to server')
nutmeg.hurray('You just reached level 10!')

// Any valid chroma color name creates a custom-colored debug notification
nutmeg.gold('Special event!')
nutmeg.coral('Custom highlight')
```

All methods accept an optional `NotifyOption` as the second argument.

### `nutmeg.info(content, option?)`
### `nutmeg.log(content, option?)` (alias for `info`)
### `nutmeg.success(content, option?)`
### `nutmeg.warn(content, option?)`
### `nutmeg.error(content, option?)`
### `nutmeg.hurray(content, option?)`
### `nutmeg.debug(content, option?)`

```javascript
nutmeg.error('Upload failed', {
  id: 'upload-error',
  duration: 5000,
  type: 'card'
})
```

---

## Static API — `NutmegNotify`

### `NutmegNotify.config(option: NotifyInitOption)`

Configure global defaults before any notifications are shown. Call once at app startup.

```javascript
NutmegNotify.config({
  position: 'right',
  order: 'descend',
  paddingTop: '4rem',
  defaultDuration: 4000,
  defaultType: 'card'
})
```

### `NutmegNotify.appendNotify(option: NotifyOption)`

Programmatically create and show a notification. Returns the `NutmegNotify` instance. If a notification with the same `id` already exists, it is updated in place (with an optional shake). Consecutive identical notifications (same type, level, and content) are deduplicated.

```javascript
const notify = NutmegNotify.appendNotify({
  content: 'New message received',
  level: 'info',
  duration: 3000,
  type: 'banner',
  id: 'new-msg'
})
```

### `NutmegNotify.clear()`

Remove all current notifications.

### `NutmegNotify.show()` / `NutmegNotify.hide()`

Show or hide the notification container element.

### `NutmegNotify.count`

Read-only. Current number of active notifications.

### Static properties

| Property | Type | Default | Description |
|---|---|---|---|
| `NutmegNotify.notifies` | `NutmegNotify[]` | `[]` | Array of all active notification instances. |
| `NutmegNotify.defaultContent` | `string` | Fallback | Fallback content when none is provided. |
| `NutmegNotify.defaultDuration` | `number` | `3000` | Default auto-dismiss time in ms. |
| `NutmegNotify.entryDuration` | `number` | `400` | Entry/exit animation duration in ms. |
| `NutmegNotify.order` | `'descend' \| 'ascend'` | `'descend'` | Stacking order. |
| `NutmegNotify.defaultType` | `'banner' \| 'card'` | `'banner'` | Default display style. |
| `NutmegNotify.styles` | `StyleOption[]` | `[]` | Global styles applied to every notification. |
| `NutmegNotify.onupdate` | `(count, toRemove, toAppend) => void` | — | Callback fired when the notification list changes. |
| `NutmegNotify.levels` | `object` | _(see below)_ | Level icon/cap/color defaults. Override via `config()`. |

---

## Instance properties & methods

| Property / Method | Type | Default | Description |
|---|---|---|---|
| `notify.level` | `NotifyLevel` | `'info'` | Severity level. Setting updates icon, cap, color, and styles. |
| `notify.type` | `'banner' \| 'card'` | `defaultType` | Display style. |
| `notify.content` | `any` | — | Body content (slot). |
| `notify.pin` | `boolean` | `false` | When `true`, notification stays pinned and does not auto-dismiss. |
| `notify.closable` | `boolean` | `true` | Show a close button. |
| `notify.pinnable` | `boolean` | `false` | Show a pin/unpin toggle button. |
| `notify.linkTo` | `HTMLElement` | — | When set, clicking the notification locates the linked element. |
| `notify.isCustom` | `boolean` | `false` | Skip level-based icon/cap/color injection (for fully custom notifications). |
| `notify.createTime` | `Date` | _(auto)_ | Read-only creation timestamp. |
| `notify.duration` | `number` | `defaultDuration` | Auto-dismiss delay in ms. |
| `notify.remove()` | method | — | Remove this notification from the stack. |

---

## `NotifyOption` fields

| Field | Type | Default | Description |
|---|---|---|---|
| `content` | `any` | — | Notification body text or HTML. |
| `cap` | `string` | Level default | Title / header text (shown in card type). |
| `icon` | `string` | Level default | Icon (emoji or text). |
| `level` | `NotifyLevel` | `'info'` | Severity level: `'debug'`, `'info'`, `'success'`, `'warn'`, `'error'`, `'hurray'`. |
| `type` | `'banner' \| 'card'` | `defaultType` | Display style. `'banner'` is compact, `'card'` shows icon+cap+content with background layers. |
| `duration` | `number` | `defaultDuration` | Auto-dismiss delay in ms. |
| `id` | `string` | — | Unique ID. Repeated calls with the same ID update the existing notification. |
| `styles` | `StyleOption[]` | — | Additional styles applied to this notification. |
| `shake` | `boolean` | `true` | Shake the notification if it already exists (when `id` matches). |
| `linkTo` | `HTMLElement` | — | Element to link the notification to. Requires the target element to have an `id`. |
| `closable` | `boolean` | `true` | Show close button. |
| `pinnable` | `boolean` | `false` | Show pin button. |

---

## `NotifyInitOption` fields

| Field | Type | Default | Description |
|---|---|---|---|
| `position` | `'left' \| 'center' \| 'right'` | `'center'` | Position of the notification stack. |
| `order` | `'descend' \| 'ascend'` | `'descend'` | Stacking order — `'descend'` shows newest at top, `'ascend'` at bottom. |
| `paddingTop` | `string` | `'1rem'` | Top offset of the container (CSS value). |
| `defaultDuration` | `number` | `3000` | Default auto-dismiss time (ms). |
| `defaultType` | `'banner' \| 'card'` | `'banner'` | Default display style. |
| `levels` | `Partial<levels>` | — | Override icon, cap, and color for each level. |
| `styles` | `StyleOption[]` | `[]` | Global styles applied to every notification. |

---

## Level defaults

| Level | Icon | Cap | Color | Notes |
|---|---|---|---|---|
| `debug` | 🐛 | 调试 | _(none)_ | Diagnostic messages |
| `info` | 🔈 | 提示 | `'info'` | General information |
| `success` | ✅ | 成功 | `'success'` | Success confirmation |
| `warn` | ⚠️ | 警告 | `'warn'` | Warning / caution |
| `error` | ❌ | 错误 | `'error'` | Error / failure |
| `hurray` | 🎉 | 恭喜 | _(none)_ | Celebration (card type adds sprinkle particles) |

Override via `NutmegNotify.config({ levels: { info: { icon: 'ℹ️', cap: 'Info' } } })`.

---

## Slots

| Slot | Description |
|---|---|
| `label` | Icon + cap header area (via `Templates.label`). |
| `content` (default) | Notification body content. |
| `time` | Timestamp display (card type only, auto-populated with relative time). |

---

## Examples

### Notification on button click

```javascript jaml-playground
export default {
  type: 'button',
  cap: 'Save',
  onclick: async function() {
    try {
      await save()
      nutmeg.success('Saved!')
    } catch (e) {
      nutmeg.error(`Save failed: ${e.message}`)
    }
  }
}
```

### Persistent card notification with pin

```javascript
// Show a pinnable card notification
nutmeg.warn('Session expiring soon', {
  type: 'card',
  pinnable: true,
  duration: 10000,
  id: 'session-warn'
})
```

### Custom-colored notification

```javascript
// Any valid color name works
nutmeg.gold('Special achievement!', { duration: 5000 })
nutmeg.coral('Custom event triggered')
```

### Persistent error with ID

```javascript
// Show the error
nutmeg.error('Network unavailable', { id: 'network', duration: 99999 })

// Dismiss it once network is restored
NutmegNotify.notifies.find(n => n.id === 'network')?.remove()
```

### Linked notification (click to locate)

```javascript jaml-playground
export default {
  type: 'container',
  components: [
    {
      type: 'input',
      cap: 'Email',
      id: 'email-field',
      ref: 'emailInput',
      rules: { required: true }
    },
    {
      type: 'button-cta',
      cap: 'Submit',
      onclick: function() {
        const input = this.model.ref.emailInput
        if (!input.value) {
          nutmeg.warn('Please fill in your email', {
            linkTo: input,
            id: 'email-field-notify'
          })
        }
      }
    }
  ]
}
```

### Sequential progress notifications

```javascript
// Show step-by-step progress
nutmeg.info('Step 1: Validating input...', { id: 'progress' })

setTimeout(() => {
  nutmeg.info('Step 2: Processing...', { id: 'progress' })
}, 1000)

setTimeout(() => {
  nutmeg.success('All steps completed!', { id: 'progress' })
}, 2000)
```

### App initialization

```javascript
NutmegNotify.config({
  position: 'right',
  defaultDuration: 4000,
  defaultType: 'card',
  paddingTop: '5rem'
})
```

---

## Interactive notification demo

Notification levels, pinnable notifications, custom content, and auto-triggered notifications in a single demo:

```javascript jaml-playground
nutmeg.config({ paddingTop: '3rem' });

export default {
  type: 'card',
  styles: ['interact.movable', 'interact.resizable'],
  components: [
    {
      type: 'button', cap: 'Pinnable Info', icon: '🔈',
      onclick() { nutmeg.info('You can pin this', { pinnable: true, duration: 3000 }); }
    },
    {
      type: 'button', cap: 'Success', icon: '✅',
      onclick() { nutmeg.success('Operation completed!', { duration: 2000 }); }
    },
    {
      type: 'button', cap: 'Non-closable Error', icon: '❌',
      onclick() { nutmeg.error('Critical failure', { closable: false, duration: 5000 }); }
    },
    {
      type: 'button', cap: 'Warning', icon: '⚠️',
      onclick() { nutmeg.warn('Please save your work', { duration: 4000 }); }
    },
    {
      type: 'button', cap: 'Custom Content', icon: '⏱️',
      onclick() {
        nutmeg.info({ type: 'indicator', cap: 'Timer', value: 3000, unit: 'ms', icon: '⏱️' }, { pinnable: true });
      }
    }
  ],
  onafterrender() {
    nutmeg.success('Demo loaded');
  }
};
```
