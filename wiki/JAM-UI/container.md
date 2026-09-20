# container

**Class:** `CoconutContainer` · **Type:** `"container"` · **Extends:** `AbstractElement`

The root layout container with a single default slot for children. Commonly used as the outermost element of a JAML render tree. Supports child mutation observation and a stable-state promise for dynamic content.

---

## JAML usage

```json jaml-playground
{
  "type": "container",
  "styles": ["size.fullsize", "layout.autoalign"],
  "components": [
    { "type": "label", "cap": "Hello from JAML" },
    { "type": "button", "cap": "Click me" }
  ]
}
```

---

## Params

Inherits all params from [AbstractElement](./JAM-UI.md).

| Param | Type | Default | Description |
|---|---|---|---|
| `observeChild` | `boolean` | `true` | Observe child mutations (add/remove). Enabled by default on containers. Fires `onchildadd`, `onchildremove`, `onchildchange`. |
| `onstable` | `() => void` | `null` | Called when the container has had no child additions or removals for 10 ms. |

---

## Slots

| Slot | Description |
|---|---|
| default | All children are placed here. |

---

## Instance methods and properties

| Member | Description |
|---|---|
| `container.clear()` | Remove all slotted children. |
| `container.isStable` | `Promise<void>` that resolves when no children have been added or removed for 10 ms. Useful for knowing when dynamic children are done rendering. |

---

## Examples

### Form container

```json jaml-playground
{
  "type": "container",
  "styles": ["layout.alignlabel", "layout.autoalign"],
  "components": [
    { "type": "input", "cap": "Name",  "valueKey": "name"  },
    { "type": "input", "cap": "Email", "valueKey": "email" },
    { "type": "button-cta", "cap": "Submit" }
  ]
}
```

### Container with child animations

```json jaml-playground
{
  "type": "container",
  "styles": ["size.fullsize", "layout.overflow"],
  "components": [
    { "type": "card", "cap": "Card 1" },
    { "type": "card", "cap": "Card 2" },
    { "type": "card", "cap": "Card 3" }
  ]
}
```

### Full-screen app shell

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['size.fullsize'],
  vars: { page: 'home' },
  components: [
    { type: 'wrapper', cap: 'Header' },
    { type: 'container', styles: ['layout.autoalign'], components: [] }
  ]
}
```

---

## Notes

- `isStable` is useful for knowing when all dynamic children have been added (e.g. after a `buildFor` loop).
- `CoconutContainer` is also the base for `CherryCard` and `WalnutWrapper`.
- Child observation is enabled by default (`observeChild: true`), unlike most other elements.
