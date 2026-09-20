# indicator

**Class:** `IcacoIndicator` · **Type:** `"indicator"` · **Extends:** `AbstractInputElement`

A read-only value display with icon, cap, value, and unit slots. Used for KPI dashboards, metric cards, and status displays.

---

## JAML usage

```json jaml-playground
{
  "type": "indicator",
  "icon": "📊",
  "cap": "Revenue",
  "value": 128450,
  "unit": "USD",
  "formatter": "(v) => `$${v.toLocaleString()}`",
  "styles": ["indicator.bigicon"]
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `value` | `any` | — | The value to display. |
| `cap` | `string` | — | Caption / label text. |
| `icon` | `string` | — | Icon (emoji, text, or icon name). |
| `unit` | `string` | — | Unit label shown to the right of the value. |
| `formatter` | `(value) => any` | — | Transform value for display. |
| `placeholder` | `string \| null` | `null` | Shown when value is `null` or `undefined`. |

The value display format is controlled by the element subtype (e.g. `"indicator-number"`, `"indicator-percent"`, `"indicator-date"`). See the Value types table below.

---

## Value types

Use a composite JAML `type` to select a display format — for example `"type": "indicator-number"`.

| Shorthand | Equivalent `type` | Default formatting |
|---|---|---|
| `"indicator"` | `'any'` | As-is |
| `"indicator-text"` | `'text'` | As string |
| `"indicator-number"` | `'number'` | Rounded to `decimalPos` decimal places |
| `"indicator-percent"` | `'percent'` | Multiplied by 100, appended `%` |
| `"indicator-date"` | `'date'` | Formatted with `pattern` (default `'yyyy-MM-dd'`) |
| `"indicator-time"` | `'time'` | Formatted with `pattern` (default `'HH:mm:ss'`) |
| `"indicator-datetime"` | `'datetime'` | Formatted with `pattern` (default `'yyyy-MM-dd HH:mm:ss'`) |

---

## Slots

| Slot | Description |
|---|---|
| `icon` | Icon display (left of cap) |
| `cap` | Label text |
| `value` (default) | Value display |
| `unit` | Unit label (right of value) |

---

## Instance methods

Inherits all `AbstractInputElement` methods, plus:

| Method | Description |
|---|---|
| `indicator.usePlaceholder()` | Display the `placeholder` text when value is null/undefined. Called automatically by `setValue`. |

---

## Examples

### KPI card with percent formatting

```json jaml-playground
{
  "type": "indicator-percent",
  "icon": "📈",
  "cap": "Conversion Rate",
  "value": 0.873,
  "formatter": "(v) => `${(v * 100).toFixed(1)}%`",
  "styles": ["indicator.bigicon", "css(padding:1.5rem;background:var(--jam-bg-card);border-radius:0.5rem)"]
}
```

### Reactive date/time display with placeholder

```javascript jaml-playground
export default {
  "type": "container",
  "vars": { "lastUpdated": null },
  "components": [
    {
      "type": "indicator-datetime",
      "cap": "Last Updated",
      "value": "{{lastUpdated}}",
      "pattern": "yyyy-MM-dd HH:mm",
      "placeholder": "No data yet"
    },
    {
      "type": "button",
      "cap": "Update Now",
      "onclick": function() {
        this.model.lastUpdated = new Date().toISOString()
      }
    }
  ]
}
```

### Conditional state coloring with `valueStates`

```javascript jaml-playground
export default {
  type: 'indicator',
  cap: 'Score',
  value: '{{score}}',
  valueStates: {
    pass: (value) => value >= 60,
    failed: (value) => value < 60
  },
  descStyles: {
    ':scope[state=pass]': ['color(green)'],
    ':scope[state=failed]': ['color(red)']
  },
  vars: { score: 43 }
}
```

Because `descStyles` is declared on the indicator itself, `:scope[state=...]` targets the indicator host. Do not combine `valueStates` with `states`; use a parent selector such as `indicator[state=pass]` only when the styles belong to an ancestor.

### Tweening animation

```json jaml-playground
{
  "type": "indicator-number",
  "cap": "Active Users",
  "value": 12450,
  "unit": "users",
  "formatter": "(v) => v.toLocaleString()",
  "styles": ["indicator.tweening.dial"]
}
```

---

## Notes

- Use `placeholder` to show a fallback when there's no value yet.
- `indicator.tweening.dial` style applies an odometer-style number animation.
- `indicator.bigicon` style enlarges the icon and stacks icon/cap/value vertically.

---

### World clocks with live interval

Live-updating world clock indicators using `jam.bindInterval()` and `indicator.clock` styles:

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['size.fullsize', 'layout.autoalign', 'align(center-center)'],
  components: [
    {
      type: 'indicator-datetime',
      icon: '🇨🇳', cap: 'Nanjing',
      styles: ['indicator.clock()'],
      unit: '+8HRS',
      onmount() { jam.bindInterval(this, () => (this.value = Date.now()), 1000, true, true); }
    },
    {
      type: 'indicator-datetime',
      icon: '🇬🇧', cap: 'UTC',
      styles: ['indicator.clock(square:true;labelall:true;continuous:true)'],
      unit: '+0HRS',
      onmount() { jam.bindInterval(this, () => (this.value = Date.now() - 8 * 60 * 60 * 1000), 1000, true, true); }
    },
    {
      type: 'indicator-datetime',
      icon: '🇺🇸', cap: 'Cupertino',
      styles: ['indicator.clock(square:true;continuous:true;digits:true)'],
      unit: '-15HRS',
      onmount() { jam.bindInterval(this, () => (this.value = Date.now() - 15 * 60 * 60 * 1000), 1000, true, true); }
    }
  ]
};
```
