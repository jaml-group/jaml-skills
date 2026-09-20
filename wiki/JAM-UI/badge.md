# badge

**Class:** `BetelnutBadge` · **Type:** `"badge"` · **Extends:** `AbstractInputElement`

A compact tag-style value display with icon, cap, and content/value slots. Typically used to show a labelled value, status indicator, or data chip. Supports `badge` and `datetime` subtypes.

---

## JAML usage

```json jaml-playground
{
  "type": "badge",
  "cap": "Role",
  "content": "Admin",
  "color": "blue"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement). Use `content` in examples for badge readability; it is an alias for the underlying value.

| Param | Type | Description |
|---|---|---|
| `cap` | `string` | Label/prefix text. Fills the `cap` slot. |
| `icon` | `string` | Icon content. Fills the `icon` slot. |
| `content` | `any` | Alias for `value`. Primary value displayed in the default value slot. |

---

## Slots

| Slot | Description |
|---|---|
| `icon` | Icon (left-most position) |
| `cap` | Label text |
| `value` (default) | Value display. `content` writes to this slot through the value API |

---

## Examples

### Status badge

```json jaml-playground
{
  "type": "badge",
  "cap": "Status",
  "content": "Active",
  "color": "green"
}
```

### Badge with icon and content

```javascript jaml-playground
export default {
  type: 'badge',
  icon: '💰',
  cap: 'Revenue',
  content: '$1,234,567'
}
```

### Badge with states for dynamic color switching

```json jaml-playground
{
  "type": "badge",
  "cap": "Priority",
  "content": "High",
  "states": {
    "low":    { "color": "green" },
    "medium": { "color": "orange" },
    "high":   { "color": "red" },
    "urgent": { "color": "purple" }
  },
  "stateStyles": {
    "urgent": ["css(animation:pulse 1s infinite)"]
  }
}
```

### Reactive badge bound to vars

```javascript jaml-playground
export default {
  type: 'badge',
  cap: 'Level',
  content: '{{userLevel}}',
  color: '{{levelColor}}'
}
```
