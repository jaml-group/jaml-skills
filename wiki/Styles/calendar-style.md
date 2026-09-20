# calendar style variants

**Element:** `jam-calendar` · **Type:** `element`

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `ctitle` | slotted | Calendar title/header |
| `weekday` | slotted | Weekday labels |
| `date` | slotted | Date cells |

---

## Style variants

Calendar has no element-specific style variants. In 1.5.2, the former `calendar.weekendLine` variant was removed; weekend cells now receive the built-in elevated background, while the current date is marked automatically.

```json jaml-playground
[
    {
        "type": "calendar"
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'calendar'
}
```
