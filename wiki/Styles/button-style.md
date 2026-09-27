# button style variants

**Element:** `jam-button` · **Type:** `element`

---

## Slots

| Slot   | Type    | Description                 |
| ------ | ------- | --------------------------- |
| `icon` | slotted | Icon content                |
| `cap`  | slotted | Button label (default slot) |

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

This legacy style adds a class only. Select the native `button-cta` type for the call-to-action variant; bind the action separately.

```json jaml-playground
[
    {
        "type": "button-cta",
        "cap": "Submit"
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

This legacy style adds a class only. Use the native `button-fab` type for the floating-action presentation and `button.round` when a circular shape is required.

```json jaml-playground
[
    {
        "type": "button-fab",
        "icon": "✏",
        "cap": "Edit",
        "styles": ["button.round"]
    }
]
```

### `button.link`

This legacy style adds a class only. Use the native `button-link` type for link presentation; navigation or command handling remains explicit.

```json jaml-playground
[
    {
        "type": "button-link",
        "cap": "Learn more"
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
  stylize: 'actions',
  styles: ['layout.flex'],
  components: [
    { type: 'button-cta', cap: 'Primary' },
    { type: 'button-ghost', cap: 'Ghost' },
    { type: 'button-link', cap: 'Link' }
  ]
}
```
