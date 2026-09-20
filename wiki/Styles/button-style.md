# button style variants

**Element:** `jam-button` · **Type:** `element`

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `icon` | slotted | Icon content |
| `cap` | slotted | Button label (default slot) |

---

## Style variants

### Ghost button
Use the `button-ghost` element type for a transparent button.

```json jaml-playground
[
    {
        "type": "button-ghost",
        "cap": "Ghost"
    }
]
```

### `button.cta`
Call-to-action button with prominent styling. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Submit",
        "styles": ["button.cta"]
    }
]
```

### `button.close`
Close button (X icon style). No args.

```json jaml-playground
[
    {
        "type": "button",
        "icon": "✕",
        "styles": ["button.close"]
    }
]
```

### `button.reset`
Reset button style. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Reset",
        "styles": ["button.reset"]
    }
]
```

### `button.add`
Add / create button with plus icon styling. No args.

```json jaml-playground
[
    {
        "type": "button",
        "icon": "+",
        "cap": "Add",
        "styles": ["button.add"]
    }
]
```

### `button.check`
Check / confirm button with checkmark styling. No args.

```json jaml-playground
[
    {
        "type": "button",
        "icon": "✓",
        "cap": "Confirm",
        "styles": ["button.check"]
    }
]
```

### `button.vertical`
Vertical layout — stacks icon above the label. No args.

```json jaml-playground
[
    {
        "type": "button",
        "icon": "⬆",
        "cap": "Upload",
        "styles": ["button.vertical"]
    }
]
```

### `button.pill`
Pill / rounded capsule shape. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Pill",
        "styles": ["button.pill"]
    }
]
```

### `button.fab`
Floating action button — circular, elevated. No args.

```json jaml-playground
[
    {
        "type": "button",
        "icon": "✏",
        "styles": ["button.fab"]
    }
]
```

### `button.link`
Link-style button — appears as a hyperlink. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Learn more",
        "styles": ["button.link"]
    }
]
```

### `button.blended`
Blended button style. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Blended",
        "styles": ["button.blended"]
    }
]
```

### `button.round`
Round button shape. No args.

```json jaml-playground
[
    {
        "type": "button",
        "icon": "plus",
        "styles": ["button.round"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'wrapper',
  styles: ['wrapper.buttonwrapper'],
  components: [
    { type: 'button', cap: 'Primary', styles: ['button.cta'] },
    { type: 'button-ghost', cap: 'Ghost' },
    { type: 'button', cap: 'Link', styles: ['button.link'] }
  ]
}
```
