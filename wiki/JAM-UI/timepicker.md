# timepicker

**Class:** `TangerineTimePicker` · **Type:** `"timepicker"` · **Extends:** `AbstractInputElement`

A time input that uses the browser's native `<input type="time">` UI, with configurable format pattern. Accepts `'HH:mm'` strings or numeric timestamps as value.

---

## JAML usage

```json jaml-playground
{
    "type": "timepicker",
    "cap": "Start Time",
    "defaultValue": "09:00"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement).

| Param     | Type     | Default   | Description                                                                                               |
| --------- | -------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `pattern` | `string` | `'HH:mm'` | Numeric-timestamp conversion pattern on assignment. Use native time syntax such as `HH:mm` or `HH:mm:ss`. |

---

## Slots

| Slot    | Description                                                    |
| ------- | -------------------------------------------------------------- |
| `label` | Label area via `Templates.label` (icon + cap).                 |
| `value` | Value display slot (auto-populated by `AbstractInputElement`). |

---

## Value handling

-   Accepts `'HH:mm'` string values or numeric timestamps (milliseconds since epoch).
-   Numeric values are converted using `formatTime(new Date(value), pattern)`.
-   The converted string is assigned to the native input and stored as the component value; existing strings pass through. Use browser-supported time syntax such as `HH:mm` or `HH:mm:ss`. An incompatible pattern can leave the native control empty.
-   Reading `getValue()` does not apply `pattern` again. Native display and precision depend on the browser and input configuration.

---

## Examples

### Basic time picker with default value

```json jaml-playground
{
    "type": "timepicker",
    "cap": "Meeting Time",
    "defaultValue": "09:00"
}
```

### With seconds format

```json jaml-playground
{
    "type": "timepicker",
    "cap": "Timestamp",
    "pattern": "HH:mm:ss",
    "defaultValue": "14:30:00"
}
```

### Current time as default

```json jaml-playground
{
    "type": "timepicker",
    "cap": "Current Time",
    "defaultValue": "()=>Date.now()"
}
```

### Date + time pair in a container

```json jaml-playground
{
    "type": "container",
    "cap": "Appointment",
    "components": [
        {
            "type": "datepicker",
            "cap": "Date",
            "defaultValue": "()=>Date.now()"
        },
        {
            "type": "timepicker",
            "cap": "Time",
            "defaultValue": "()=>Date.now()"
        }
    ]
}
```

### With validation rules

```json jaml-playground
{
    "type": "timepicker",
    "cap": "Start Time",
    "rules": {
        "required": true,
        "triggers": ["blur"]
    }
}
```

---

## Notes

-   The native browser time picker is used — appearance varies by browser and platform.
-   If `value` is a numeric timestamp it is converted via `formatTime()`. Non-numeric values are passed through as-is to the native input.
-   The `pattern` defaults to `'HH:mm'`. Include `HH:mm:ss` for seconds-level precision.
