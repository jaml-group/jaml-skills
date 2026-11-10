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

| Param         | Type             | Default | Description                                 |
| ------------- | ---------------- | ------- | ------------------------------------------- |
| `value`       | `any`            | —       | The value to display.                       |
| `cap`         | `string`         | —       | Caption / label text.                       |
| `icon`        | `string`         | —       | Icon (emoji, text, or icon name).           |
| `unit`        | `string`         | —       | Unit label shown to the right of the value. |
| `formatter`   | `(value) => any` | —       | Transform value for display.                |
| `placeholder` | `string \| null` | `null`  | Shown when value is `null` or `undefined`.  |

The value display format is controlled by the element subtype (e.g. `"indicator-number"`, `"indicator-percent"`, `"indicator-date"`). See the Value types table below.

---

## Value types

Use a composite JAML `type` to select a display format — for example `"type": "indicator-number"`.

| Shorthand              | Equivalent `type` | Default formatting                                         |
| ---------------------- | ----------------- | ---------------------------------------------------------- |
| `"indicator"`          | `'any'`           | As-is                                                      |
| `"indicator-text"`     | `'text'`          | As string                                                  |
| `"indicator-number"`   | `'number'`        | Rounded to `decimalPos` decimal places                     |
| `"indicator-percent"`  | `'percent'`       | Multiplied by 100, appended `%`                            |
| `"indicator-date"`     | `'date'`          | Formatted with `pattern` (default `'yyyy-MM-dd'`)          |
| `"indicator-time"`     | `'time'`          | Formatted with `pattern` (default `'HH:mm:ss'`)            |
| `"indicator-datetime"` | `'datetime'`      | Formatted with `pattern` (default `'yyyy-MM-dd HH:mm:ss'`) |

---

## Slots

| Slot              | Description                 |
| ----------------- | --------------------------- |
| `icon`            | Icon display (left of cap)  |
| `cap`             | Label text                  |
| `value` (default) | Value display               |
| `unit`            | Unit label (right of value) |

---

## Instance methods

Inherits all `AbstractInputElement` methods, plus:

| Method                       | Description                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| `indicator.usePlaceholder()` | Display the `placeholder` text when value is null/undefined. Called automatically by `setValue`. |

---

## Examples

### Metrics in a reply

`valueStates` derives a state from the value; `color.stateMap` gives it a semantic color, and `value.color.primary` applies that color to the value.

<!-- generated-reply-demo:metrics:start -->

````text
```text jamll-content
{ type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284, styles: ['indicator.bigicon'] }
{ type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94, valueStates: { good: 'value>=0.9', watch: 'value>=0.7', late: 'value<0.7' }, styles: ['indicator.bigicon', 'color.stateMap(good:success;watch:warn;late:error)', 'value.color.primary'] }
{ type: 'indicator-number', icon: '↩️', cap: 'Returns', value: 37, unit: 'this week', valueStates: { good: 'value<20', watch: 'value<50', high: 'value>=50' }, styles: ['indicator.bigicon', 'color.stateMap(good:success;watch:warn;high:error)', 'value.color.primary', 'indicator.unit.color.accent'] }
```
````

<!-- generated-reply-demo:metrics:end -->

### Metric cards in a reply

A parent's `childStyles` gives every card one treatment: `stylize: 'list'` with `stylize.bento` on the parent and `params(stylize:item)` on each card, `value.major()` and `cap.main(0.75)` for the hierarchy, and `value.grouped` for thousands separators. Each card adds a divider and a sub-caption as children with `slot: 'layer'` and `indicator.sub(above)`, which places them between the caption and the value, in source order; plain `indicator.sub` places a child after the value instead. `indicator.sub` only places the row, so the sub-caption label also adds `cap.sub` for muted sub-caption text.

<!-- generated-reply-demo:kpiCards:start -->

````text
```text jamll-content
{ type: 'wrapper', stylize: 'list', style: { width: '100%' }, styles: ['layout.autoalign', 'stylize.bento'], childStyles: ['params(stylize:item)', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped', 'css(padding:l;gap:xs)'] }
    { type: 'indicator-number', icon: '📦', cap: 'Orders', value: 1284 }
        { type: 'hr', slot: 'layer', styles: ['indicator.sub(above)'] }
        { type: 'label', cap: '+8% vs last week', slot: 'layer', styles: ['indicator.sub(above)', 'cap.sub'] }
    { type: 'indicator-percent', icon: '🚚', cap: 'On time', value: 0.94 }
        { type: 'hr', slot: 'layer', styles: ['indicator.sub(above)'] }
        { type: 'label', cap: 'Target 90%', slot: 'layer', styles: ['indicator.sub(above)', 'cap.sub'] }
    { type: 'indicator-number', icon: '⭐', cap: 'Rating', value: 4.7, decimalPos: 1, unit: '/ 5' }
        { type: 'hr', slot: 'layer', styles: ['indicator.sub(above)'] }
        { type: 'label', cap: '312 reviews', slot: 'layer', styles: ['indicator.sub(above)', 'cap.sub'] }
```
````

<!-- generated-reply-demo:kpiCards:end -->

One featured figure: `indicator.vertical` with `indicator.bigicon` stacks icon, caption and value, centred.

<!-- generated-reply-demo:heroStat:start -->

````text
```text jamll-content
{ type: 'indicator-number', icon: '💧', cap: 'Water saved this month', value: 2480, unit: 'litres', styles: ['indicator.vertical', 'indicator.bigicon', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped'] }
    { type: 'label', cap: 'About 16 full baths', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
```
````

<!-- generated-reply-demo:heroStat:end -->

Compact facts: `indicator.inline` puts caption and value on one row; a shared width aligns the values.

<!-- generated-reply-demo:inlineFacts:start -->

````text
```text jamll-content
{ type: 'container', style: { width: '100%' }, styles: ['layout.flex(direction:column)', 'css(gap:xs)'], childStyles: ['indicator.inline', 'value.color.primary', 'css(width:18rem)'] }
    { type: 'indicator-number', icon: '🛣️', cap: 'Distance', value: 12.4, decimalPos: 1, unit: 'km' }
    { type: 'indicator-number', icon: '⏱️', cap: 'Moving time', value: 58, unit: 'min' }
    { type: 'indicator-number', icon: '⛰️', cap: 'Elevation gain', value: 214, unit: 'm' }
```
````

<!-- generated-reply-demo:inlineFacts:end -->

A stat card stacks caption, a large value and one line of context: `indicator.vertical` with `indicator.lefted`, inside a `stylize.bento` container for the card surface. The context line is an `indicator.sub` layer child; give it a semantic `color` with `color.primary`, and `cap.sub(1)` to keep it at full strength.

<!-- generated-reply-demo:statCard:start -->

````text
```text jamll-content
{ type: 'container', styles: ['stylize.bento'] }
    { type: 'indicator-number', cap: 'Monthly revenue', value: 48200, unit: 'USD', styles: ['css(padding:l)', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'value.color.primary', 'value.grouped'] }
        { type: 'label', cap: '+12% vs last month', color: 'success', slot: 'layer', styles: ['indicator.sub', 'cap.sub(1)', 'color.primary'] }
```
````

<!-- generated-reply-demo:statCard:end -->

Tags added the same way list what stands behind the number.

<!-- generated-reply-demo:tagCard:start -->

````text
```text jamll-content
{ type: 'container', styles: ['stylize.bento'] }
    { type: 'indicator-number', cap: 'Open tickets', value: 23, styles: ['css(padding:l)', 'indicator.vertical', 'indicator.lefted', 'value.major()', 'cap.main(0.75)', 'value.color.primary'] }
        { type: 'label', cap: 'Most reported', slot: 'layer', styles: ['indicator.sub', 'cap.sub'] }
        { type: 'tags', data: ['Billing', 'Login', 'Export'], showCount: false, slot: 'layer', styles: ['indicator.sub', 'tags.chip'] }
```
````

<!-- generated-reply-demo:tagCard:end -->

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
    type: 'container',
    vars: { lastUpdated: null },
    components: [
        {
            type: 'indicator-datetime',
            cap: 'Last Updated',
            value: '{{lastUpdated}}',
            pattern: 'yyyy-MM-dd HH:mm',
            placeholder: 'No data yet'
        },
        {
            type: 'button',
            cap: 'Update Now',
            onclick: function () {
                this.model.lastUpdated = new Date().toISOString();
            }
        }
    ]
};
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
        ':scope[state=pass]': ['color(success)'],
        ':scope[state=failed]': ['color(error)']
    },
    vars: { score: 43 }
};
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

-   Use `placeholder` to show a fallback when there's no value yet.
-   `indicator.tweening.dial` style applies an odometer-style number animation.
-   `indicator.bigicon` style enlarges the icon and stacks icon/cap/value vertically.

---

### Local clock variants with live interval

`indicator.clock` displays the browser's local time. The following variants share the same current timestamp; `jam.bindInterval()` ties updates to each element's lifetime. A fixed timestamp offset does not provide named-time-zone or daylight-saving handling.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['size.fullsize', 'layout.autoalign', 'align(center-center)'],
    components: [
        {
            type: 'indicator-datetime',
            cap: 'Local time',
            styles: ['indicator.clock()'],
            onmount() {
                jam.bindInterval(this, () => (this.value = Date.now()), 1000, true, true);
            }
        },
        {
            type: 'indicator-datetime',
            cap: 'Local time — square',
            styles: ['indicator.clock(square:true;labelall:true;continuous:true)'],
            onmount() {
                jam.bindInterval(this, () => (this.value = Date.now()), 1000, true, true);
            }
        },
        {
            type: 'indicator-datetime',
            cap: 'Local time — digits',
            styles: ['indicator.clock(square:true;continuous:true;digits:true)'],
            onmount() {
                jam.bindInterval(this, () => (this.value = Date.now()), 1000, true, true);
            }
        }
    ]
};
```
