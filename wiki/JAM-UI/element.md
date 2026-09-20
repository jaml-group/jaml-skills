# element

**Class:** `EndiveElement` · **Type:** `"element"` · **Extends:** `AbstractInputElement`

A lightweight generic element wrapper with a single value slot and no pre-built UI chrome (no label, icon, or agent). Use it as a minimal building block when you need the full `AbstractInputElement` API (value, rules, formatter, etc.) without the overhead of a full-featured element.

---

## JAML usage

```json jaml-playground
{
  "type": "element",
  "value": "Hello, JAM-UI!"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement).

| Param | Type | Description |
|---|---|---|
| `value` | `any` | The element's value. Rendered in the default `value` slot. |

Use a composite type such as `"element-placeholder"` or `"element-divider"` to select an element specialization. Each specialization adds its `jam-{name}` attribute for styling.

## Magnet specialization

`type: 'magnet'` turns an `EndiveElement` into a line endpoint. Its `magnetName` getter/setter reflects the `jam-magnet` attribute, `magnetOwner` resolves the `AbstractElement` identified by `jam-owner`, and `place({ x, y })` positions the magnet in its current line container. `place` rejects non-magnet elements and non-finite coordinates.

Owner elements prepare magnet children for the dynamic `layer` slot and destroy owned magnets when the owner is destroyed. Most applications use [LycheeLine](../Plugins/line.md) to acquire and manage these magnets instead of setting ownership attributes directly.

---

## Slots

| Slot | Description |
|---|---|
| `value` (default) | The main content slot. The `jam-with-value` CSS class is toggled for divider subtypes when this slot is filled. |

---

## Examples

### Basic value display

```json jaml-playground
{
  "type": "element",
  "value": "Some content here"
}
```

### Placeholder subtype

```json jaml-playground
{
  "type": "element-placeholder",
  "value": "Loading..."
}
```

Without an explicit `stylize`, the placeholder specialization keeps the default element profile and applies placeholder styling.

### Divider specialization

```json jaml-playground
{
  "type": "element-divider",
  "value": "Details"
}
```

A divider specialization selects the built-in `divider` stylize profile. When its value slot is filled, the element also receives the `jam-with-value` class.

### Custom styled element

```javascript jaml-playground
export default {
  type: 'element',
  value: 'Custom styled element',
  styles: [
    'css(padding:1rem;border:1px dashed #ccc;border-radius:8px)',
    'text.mono'
  ]
}
```

### Reactive value binding

```javascript jaml-playground
export default {
  type: 'container',
  vars: { message: 'Initial message' },
  components: [
    {
      type: 'element',
      value: '{{message}}',
      styles: ['css(padding:0.5rem;font-style:italic)']
    },
    {
      type: 'input',
      cap: 'Edit message',
      value: '{{message}}'
    }
  ]
}
```

### Element with value formatting

```javascript jaml-playground
export default {
  type: 'element',
  value: 1234.5678,
  formatter: (v) => `$${v.toFixed(2)}`,
  modifier: (v) => parseFloat(v)
}
```

---

## Notes

- `EndiveElement` is the simplest value-carrying element. It has no icon, cap, label, or agent — just a single `value` slot.
- A composite type splits its specialization on `-` and adds `jam-{part}` attributes to the element for CSS targeting.
- Use it as a lightweight container when you need value handling without chrome.
