# datepicker

**Class:** `DateDatePicker` · **Type:** `"datepicker"` · **Extends:** `AbstractInputElement`

A native date input using the browser's built-in date picker UI. Supports format patterns, timestamp conversion, and validation rules.

---

## JAML usage

```json jaml-playground
{
    "type": "datepicker",
    "cap": "Start Date",
    "pattern": "yyyy-MM-dd",
    "defaultValue": "()=>Date.now()",
    "valueKey": "startDate"
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement).

| Param          | Type                           | Default        | Description                                                                                                                           |
| -------------- | ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `value`        | `string \| number`             | —              | Selected date. Accepts a date string (`yyyy-MM-dd`) or numeric timestamp (ms). Timestamps are converted to the pattern format on set. |
| `defaultValue` | `string \| number \| Function` | —              | Initial date value. Pass `"()=>Date.now()"` for the current date.                                                                     |
| `pattern`      | `string`                       | `'yyyy-MM-dd'` | Conversion pattern used when assigning a numeric timestamp; use the native date syntax `yyyy-MM-dd`.                                  |
| `cap`          | `string`                       | —              | Label text above the input.                                                                                                           |

---

## Value handling

-   If `value` is a numeric timestamp, it is converted via `formatTime(new Date(value), pattern)`.
-   Strings pass through to the native input. The browser requires `yyyy-MM-dd`; an incompatible converted or supplied string can leave the native control empty.
-   `pattern` acts during numeric assignment, not when reading `getValue()`. Use a separate display formatter when a human-readable date must differ from the native input value.

---

## Examples

### Basic date picker with validation

```json jaml-playground
{
    "type": "datepicker",
    "cap": "Birthday",
    "rules": {
        "required": true,
        "min": "1900-01-01",
        "max": "2010-12-31",
        "triggers": ["blur", "valuechange"]
    },
    "valueKey": "birthday"
}
```

### Default to today

```json jaml-playground
{
    "type": "datepicker",
    "cap": "Report Date",
    "pattern": "yyyy-MM-dd",
    "defaultValue": "()=>Date.now()",
    "valueKey": "reportDate"
}
```

### Date picker in a form

```json jaml-playground
{
    "type": "container",
    "styles": ["layout.alignlabel", "layout.autoalign"],
    "components": [
        { "type": "datepicker", "cap": "Start", "rules": { "required": true }, "valueKey": "start" },
        { "type": "datepicker", "cap": "End", "rules": { "required": true, "min": "{{start}}" }, "valueKey": "end" },
        { "type": "button-cta", "cap": "Submit" }
    ]
}
```

---

## Notes

-   The native date picker UI varies by browser and platform.
-   Use `rules` with `min`/`max` date strings for range validation.
