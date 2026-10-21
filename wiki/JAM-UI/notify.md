# notify

**Class:** `NutmegNotify` · **Type:** `"notify"` · **Extends:** `AbstractElement` · **Global:** `nutmeg`

`NutmegNotify` owns a notification stack: presentation, level defaults, close/pin controls and timed dismissal. Trigger it through `nutmeg`, `jam.notify()` or `NutmegNotify.appendNotify()`; pass JAML as content when the notification needs another native purpose, such as a metric or an action. The committed baseline uses the `modal` stylize profile; verify the consuming runtime before relying on that profile.

## Choose the notification content

Choose by the information and interaction required, before choosing a layout:

| Purpose                                               | Start with                                                                                               | What the application owns                                                                                 |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Report a completed operation or an error              | Plain `nutmeg.success(message)`, `nutmeg.error(message)` or `jam.notify(message, options)`               | Outcome, severity, literal/translated text and a meaningful ID.                                           |
| Confirm an action beside its triggering control       | An anchored [Papaya popup](popup.md) through [jam.popup](../utils.md#jampopuptarget-content-option-type) | Anchor, activation/dismissal policy and whether feedback must remain available after leaving the control. |
| Offer a recovery action or display structured content | A native button, indicator or meaningful JAML composition as notification content                        | Action eligibility, business state and any asynchronous recovery/deadline rules.                          |
| Retain validation, progress or an unresolved decision | The field, progress element or decision view that owns that state                                        | Keep necessary information available; a transient notification is not its state owner.                    |

A plain outcome already has a native presentation owner. Do not wrap a message in a container and label just to display text, set its level or obtain a close button. An application notification adapter should preserve this plain path when its optional action is absent. Select native options and styles before rebuilding presentation.

### Plain messages and literal text

```javascript
nutmeg.success('Settings saved.', { id: 'settings-save' });

// Treat external text as data, including apparent HTML or binding syntax.
const message = 'Connection failed: <server> {{detail}}';
nutmeg.error(document.createTextNode(message), { id: 'connection-error' });
```

A supplied `Text` node keeps this a plain notification; a JAML content object selects custom-content mode. Literal Text handling requires the updated runtime described in [slot content and literal text](JAM-UI.md#slot-content-and-literal-text); older bundles may reparse Text. Authored HTML strings remain HTML-capable. Translate application-authored messages through the application's localization owner before display; do not translate arbitrary external error text as a message key.

### Structured or interactive content

Custom content is useful when the body has another purpose: the [indicator example below](#interactive-notification-demo) represents a metric, and a recovery button represents an available action. It is not required just because the notification belongs to an application.

Integration example: supply `openConnectionSettings()` to navigate to the application's connection settings. A native button owns the recovery action; Nutmeg still owns the notification shell. Clicking the button requests dismissal of this notice before navigating.

```javascript
const notice = jam.notify(
    {
        type: 'button',
        cap: 'Connection failed — Open settings',
        onclick() {
            notice.remove();
            openConnectionSettings();
        }
    },
    { id: 'connection-recovery', level: 'error', duration: 8000 }
);
```

For `jam.notify()` and `nutmeg.*`, a recognized JAML object selects `isCustom: true`. That skips automatic level icons, card titles and level decorations; the level still supplies its color. Global `NutmegNotify.styles` apply to plain notifications. Per-notification `styles`, native close/pin controls and the returned instance remain available for custom content. Choose custom content for its required purpose before compensating for those changed defaults. Do not invent an `actions` option: compose an actual action through the supported content contract.

### Identity, lifetime and verification

Use a stable, meaningful `id` for repeated outcomes of one operation. Normal same-ID updates reuse the notification and restart its native duration. Keep its content mode stable: switching an existing ID between plain and custom content does not reinitialize all mode-specific defaults. Use distinct IDs for those presentations, or verify the transition against the target runtime. Keep asynchronous result ordering and cancellation with the operation owner so an older result cannot replace newer feedback. An ID is not an application operation token.

`duration` governs native dismissal, not business eligibility: hovering can defer removal, and pinning retains a notice. A time-limited Undo action must check its own deadline and eligibility, exclude duplicate pending requests and settle only after success or retirement; failure can remain retryable. Follow the [archive/Undo transitions](#archive-and-undo) even while its notification remains visible. A repeated outcome and a notice already awaiting removal are distinct lifecycle cases; verify the latter against the consuming runtime. Retire owned pending actions and notifications when their application owner is disposed.

Verify the selected composition as well as visible text: a plain-message path should retain native plain mode and defaults, literal external text should remain literal, and repeated IDs should not create duplicate notices. For interactive content, exercise the actual control, stale-result replacement and any deadline/retirement rules. Styling or a test that only checks a nested label's text does not establish that custom composition was necessary.

---

## Archive and Undo

For a reversible archive, compose a native Undo button as [interactive notification content](#structured-or-interactive-content). The application owns the record, prior collection/placement, request identity and backend restoration eligibility. A notification ID identifies feedback, not the request or restoration authority.

| State or outcome    | Application behavior and feedback                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Archive pending     | Gate repeated activation. An optimistic row removal may be useful, but show pending feedback and keep Undo unavailable until the backend acknowledges archive.           |
| Archive succeeds    | Reconcile the archived state; retain the backend's restoration identity and actual deadline/eligibility. Offer Undo for that operation.                                  |
| Archive fails       | Reconcile the row with authoritative state and retire obsolete pending/Undo feedback for that operation only. Show the failure and retry path.                           |
| Restore pending     | Check current eligibility and acquire a restore-pending gate before sending. Keep the recovery feedback available while awaiting the result.                             |
| Restore fails       | Release the gate; retain archived state and allow an explicit retry while still eligible. Reconcile uncertain outcomes before repeating a possibly committed request.    |
| Restore succeeds    | Reconcile the document's restored collection/position and retire only the matching operation's notice. A late callback must not remove newer feedback using the same ID. |
| Eligibility expires | Make Undo visibly unavailable and reject further activation. Retire the recovery action independently of notification hover, pinning or native duration.                 |

Use an explicit operation state rather than a permanent “used” flag set on the first click: duplicates while pending are blocked, while a failed restore remains retryable. Keep recovery feedback available while Undo is pending or retryable; if the consuming runtime supports click dismissal, leave it disabled for this action. Native `duration` and same-ID refresh are presentation timing, not backend deadlines; they cannot extend restoration eligibility.

The operation owner must outlive a dismissed notice or hand its pending request to another application owner. Keep completion/recovery reachable when feedback is dismissed, replaced or its view is disposed. See [asynchronous operation ownership](../JAML/purpose-and-composition.md#own-asynchronous-operations) for cancellation and stale view updates.

## `nutmeg` — global proxy (preferred API)

`nutmeg` is a proxy over the `NutmegNotify` class. Call level names as methods, or use any valid CSS color name as a method for custom-colored debug notifications.

```javascript
nutmeg.info('File saved successfully');
nutmeg.success('Account created!');
nutmeg.warn('Your session expires in 5 minutes');
nutmeg.error('Failed to connect to server');
nutmeg.hurray('You just reached level 10!');

// Any valid chroma color name creates a custom-colored debug notification
nutmeg.gold('Special event!');
nutmeg.coral('Custom highlight');
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
});
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
});
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
});
```

### `NutmegNotify.clear()`

Remove all current notifications.

### `NutmegNotify.show()` / `NutmegNotify.hide()`

Show or hide the notification container element.

### `NutmegNotify.count`

Read-only. Current number of active notifications.

### Static properties

| Property                       | Type                                  | Default       | Description                                             |
| ------------------------------ | ------------------------------------- | ------------- | ------------------------------------------------------- |
| `NutmegNotify.notifies`        | `NutmegNotify[]`                      | `[]`          | Array of all active notification instances.             |
| `NutmegNotify.defaultContent`  | `string`                              | Fallback      | Fallback content when none is provided.                 |
| `NutmegNotify.defaultDuration` | `number`                              | `3000`        | Default auto-dismiss time in ms.                        |
| `NutmegNotify.entryDuration`   | `number`                              | `400`         | Entry/exit animation duration in ms.                    |
| `NutmegNotify.order`           | `'descend' \| 'ascend'`               | `'descend'`   | Stacking order.                                         |
| `NutmegNotify.defaultType`     | `'banner' \| 'card'`                  | `'banner'`    | Default display style.                                  |
| `NutmegNotify.styles`          | `StyleOption[]`                       | `[]`          | Global styles applied to plain notifications.           |
| `NutmegNotify.onupdate`        | `(count, toRemove, toAppend) => void` | —             | Callback fired when the notification list changes.      |
| `NutmegNotify.levels`          | `object`                              | _(see below)_ | Level icon/cap/color defaults. Override via `config()`. |

---

## Instance properties & methods

| Property / Method   | Type                 | Default           | Description                                                                          |
| ------------------- | -------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| `notify.level`      | `NotifyLevel`        | `'info'`          | Sets color in both modes; automatic icon/card title/decorations apply in plain mode. |
| `notify.type`       | `'banner' \| 'card'` | `defaultType`     | Display style.                                                                       |
| `notify.content`    | `any`                | —                 | Body content (slot).                                                                 |
| `notify.pin`        | `boolean`            | `false`           | When `true`, notification stays pinned and does not auto-dismiss.                    |
| `notify.closable`   | `boolean`            | `true`            | Show a close button.                                                                 |
| `notify.pinnable`   | `boolean`            | `false`           | Show a pin/unpin toggle button.                                                      |
| `notify.linkTo`     | `HTMLElement`        | —                 | When set, clicking the notification locates the linked element.                      |
| `notify.isCustom`   | `boolean`            | `false`           | Skip automatic level icon/card title/decorations; level color remains.               |
| `notify.createTime` | `Date`               | _(auto)_          | Read-only creation timestamp.                                                        |
| `notify.duration`   | `number`             | `defaultDuration` | Auto-dismiss delay in ms.                                                            |
| `notify.remove()`   | method               | —                 | Remove this notification from the stack.                                             |

---

## `NotifyOption` fields

| Field      | Type                 | Default           | Description                                                                                   |
| ---------- | -------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| `content`  | `any`                | —                 | Body text, supplied Text/Element, or JAML through `jam.notify()` / `nutmeg.*`.                |
| `cap`      | `string`             | Level default     | Title / header text (shown in card type).                                                     |
| `icon`     | `string`             | Level default     | Icon (emoji or text).                                                                         |
| `level`    | `NotifyLevel`        | `'info'`          | Severity level: `'debug'`, `'info'`, `'success'`, `'warn'`, `'error'`, `'hurray'`.            |
| `type`     | `'banner' \| 'card'` | `defaultType`     | Display style. `'banner'` is compact, `'card'` shows icon+cap+content with background layers. |
| `duration` | `number`             | `defaultDuration` | Auto-dismiss delay in ms.                                                                     |
| `id`       | `string`             | —                 | Unique ID. Repeated calls with the same ID update the existing notification.                  |
| `styles`   | `StyleOption[]`      | —                 | Additional styles applied to this notification.                                               |
| `shake`    | `boolean`            | `true`            | Shake the notification if it already exists (when `id` matches).                              |
| `linkTo`   | `HTMLElement`        | —                 | Element to link the notification to. Requires the target element to have an `id`.             |
| `closable` | `boolean`            | `true`            | Show close button.                                                                            |
| `pinnable` | `boolean`            | `false`           | Show pin button.                                                                              |

---

## `NotifyInitOption` fields

| Field             | Type                            | Default     | Description                                                             |
| ----------------- | ------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `position`        | `'left' \| 'center' \| 'right'` | `'center'`  | Position of the notification stack.                                     |
| `order`           | `'descend' \| 'ascend'`         | `'descend'` | Stacking order — `'descend'` shows newest at top, `'ascend'` at bottom. |
| `paddingTop`      | `string`                        | `'1rem'`    | Top offset of the container (CSS value).                                |
| `defaultDuration` | `number`                        | `3000`      | Default auto-dismiss time (ms).                                         |
| `defaultType`     | `'banner' \| 'card'`            | `'banner'`  | Default display style.                                                  |
| `levels`          | `Partial<levels>`               | —           | Override icon, cap, and color for each level.                           |
| `styles`          | `StyleOption[]`                 | `[]`        | Global styles applied to plain notifications.                           |

---

## Level defaults

| Level     | Icon | Cap  | Color       | Notes                                           |
| --------- | ---- | ---- | ----------- | ----------------------------------------------- |
| `debug`   | 🐛   | 调试 | _(none)_    | Diagnostic messages                             |
| `info`    | 🔈   | 提示 | `'info'`    | General information                             |
| `success` | ✅   | 成功 | `'success'` | Success confirmation                            |
| `warn`    | ⚠️   | 警告 | `'warn'`    | Warning / caution                               |
| `error`   | ❌   | 错误 | `'error'`   | Error / failure                                 |
| `hurray`  | 🎉   | 恭喜 | _(none)_    | Celebration (card type adds sprinkle particles) |

Override via `NutmegNotify.config({ levels: { info: { icon: 'ℹ️', cap: 'Info' } } })`.

---

## Slots

| Slot                | Description                                                            |
| ------------------- | ---------------------------------------------------------------------- |
| `label`             | Icon + cap header area (via `Templates.label`).                        |
| `content` (default) | Notification body content.                                             |
| `time`              | Timestamp display (card type only, auto-populated with relative time). |

---

## Examples

### Notification after saving

Integration example: provide an application `save()` function that returns a promise. The success message appears after it resolves; a rejected save displays an error.

```javascript
export default {
    type: 'button',
    cap: 'Save',
    onclick: async function () {
        try {
            await save();
            nutmeg.success('Saved!');
        } catch (e) {
            nutmeg.error(document.createTextNode(`Save failed: ${e.message}`));
        }
    }
};
```

### Persistent card notification with pin

```javascript
// Show a pinnable card notification
nutmeg.warn('Session expiring soon', {
    type: 'card',
    pinnable: true,
    duration: 10000,
    id: 'session-warn'
});
```

### Custom-colored notification

```javascript
// Any valid color name works
nutmeg.gold('Special achievement!', { duration: 5000 });
nutmeg.coral('Custom event triggered');
```

### Persistent error with ID

```javascript
// Show the error
nutmeg.error('Network unavailable', { id: 'network', duration: 99999 });

// Dismiss it once network is restored
NutmegNotify.notifies.find((n) => n.id === 'network')?.remove();
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
            onclick: function () {
                const input = this.model.ref.emailInput;
                if (!input.value) {
                    nutmeg.warn('Please fill in your email', {
                        linkTo: input,
                        id: 'email-field-notify'
                    });
                }
            }
        }
    ]
};
```

### Sequential progress notifications

```javascript
// Show step-by-step progress
nutmeg.info('Step 1: Validating input...', { id: 'progress' });

setTimeout(() => {
    nutmeg.info('Step 2: Processing...', { id: 'progress' });
}, 1000);

setTimeout(() => {
    nutmeg.success('All steps completed!', { id: 'progress' });
}, 2000);
```

### App initialization

```javascript
NutmegNotify.config({
    position: 'right',
    defaultDuration: 4000,
    defaultType: 'card',
    paddingTop: '5rem'
});
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
            type: 'button',
            cap: 'Pinnable Info',
            icon: '🔈',
            onclick() {
                nutmeg.info('You can pin this', { pinnable: true, duration: 3000 });
            }
        },
        {
            type: 'button',
            cap: 'Success',
            icon: '✅',
            onclick() {
                nutmeg.success('Operation completed!', { duration: 2000 });
            }
        },
        {
            type: 'button',
            cap: 'Non-closable Error',
            icon: '❌',
            onclick() {
                nutmeg.error('Critical failure', { closable: false, duration: 5000 });
            }
        },
        {
            type: 'button',
            cap: 'Warning',
            icon: '⚠️',
            onclick() {
                nutmeg.warn('Please save your work', { duration: 4000 });
            }
        },
        {
            type: 'button',
            cap: 'Literal error text',
            onclick() {
                nutmeg.error(document.createTextNode('Connection failed: <server> {{detail}}'), { id: 'literal-error' });
            }
        },
        {
            type: 'button',
            cap: 'Custom Content',
            icon: '⏱️',
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
