# JAM-UI® — The Element Base

All JAM-UI elements are custom HTML elements that extend one of three abstract base classes. This document covers the full public API shared across every element in the library.

```
AbstractElement
  └── AbstractInputElement     (elements with a value)
        └── AbstractOptionElement  (elements with selectable options)
```

---

## Elements

Each element type is used as the `"type"` value in JAML. Click through to the individual doc for element-specific params, slots, events, and examples.

| Type | Class | Doc |
|---|---|---|
| `badge` | `BetelnutBadge` | [badge](./badge.md) |
| `button` | `BananaButton` | [button](./button.md) |
| `buttongroup` | `BlackberryButtonGroup` | [button-group](./button-group.md) |
| `calendar` | `CarambolaCalendar` | [calendar](./calendar.md) |
| `card` | `CherryCard` | [card](./card.md) |
| `chart` | `CashewChart` | [chart](./chart.md) |
| `container` | `CoconutContainer` | [container](./container.md) |
| `datepicker` | `DateDatePicker` | [datepicker](./datepicker.md) |
| `daterangepicker` | `DewberryDateRangePicker` | *(extends datepicker)* |
| `element` | `EndiveElement` | [element](./element.md) |
| `indicator` | `IcacoIndicator` | [indicator](./indicator.md) |
| `input` | `ImbeInput` | [input](./input.md) |
| `label` | `LeekLabel` | [label](./label.md) |
| `locator` | `LoganLocator` | [locator](./locator.md) |
| `map` | `MedlarMap` | [map](./map.md) |
| `notify` | `NutmegNotify` | [notify](./notify.md) |
| `option` | `OsteenOption` | [option](./option.md) |
| `options` | `OliveOptions` | [options](./options.md) |
| `popup` | `PapayaPopup` | [popup](./popup.md) |
| `progress` | `PeachProgress` | [progress](./progress.md) |
| `select` | `SugarcaneSelect` | [select](./select.md) |
| `shortcuts` | `SafouShortcuts` | [shortcuts](./shortcuts.md) |
| `step` | `ShaddockStep` | [step](./step.md) |
| `switch` | `SunflowerSwitch` | [switch](./switch.md) |
| `table` | `TomatoTable` | [table](./table.md) |
| `tags` | `ToughpearTags` | [tags](./tags.md) |
| `timepicker` | `TangerineTimePicker` | [timepicker](./timepicker.md) |
| `timerangepicker` | — | *(extends timepicker)* |
| `tree` | `TamarilloTree` | [tree](./tree.md) |
| `wrapper` | `WalnutWrapper` | [wrapper](./wrapper.md) |

> **Element specialization:** Use the composite `"type-specialization"` form, such as `"button-cta"`, `"input-number"`, or `"select-checkbox"`.

---

## Representers

Representers are lightweight elements that represent a data shape or HTML primitive. They use the same `"type"` key in JAML and accept all [AbstractElement](#section-1--abstractelement) params.

| Type | Class | Description |
|---|---|---|
| `checkbox` | — | Checkbox input. Extends `AbstractInputElement`. |
| `code` | — | Syntax-highlighted code block. |
| `data` | — | Invisible data carrier (virtual element, no DOM output). |
| `divider` | `EndiveElement` | Visual divider; optional label is supplied through inherited `value` from `AbstractInputElement`. |
| `hr` | — | Horizontal rule (`<hr>`). |
| `placeholder` | — | Placeholder element. |
| `radio` | — | Radio input. Extends `AbstractInputElement`. |
| `tag` | — | Single tag/chip. |
| `textarea` | — | Multi-line text area. Extends `AbstractInputElement`. |
| `vr` | — | Vertical rule. |
| `vanilla` | — | Wraps an arbitrary existing `HTMLElement`. |
| `unknown` | — | Fallback for unrecognized types. |

---

## Section 1 — AbstractElement

Every JAM-UI element inherits from `AbstractElement`. All params listed here are available on every element.

---

### Core

| Param | Type | Description |
|---|---|---|
| `ghostElement` | `boolean` | When `true` the element is invisible in the DOM (used internally for virtual elements). |
| `observeChild` | `boolean` | Enable child mutation observation (fires child lifecycle events). |
| `autoState` | `boolean` | Automatically toggle state on click (cycles through defined `states`). |

### Theme presentation

| Param | Type | Description |
|---|---|---|
| `stylize` | `string` | Apply a runtime presentation profile, such as a semantic role (`"panel"`, `"field"`) or renderer profile (`"markdown"`, `"json"`). See [Theme Stylize](../Theme/stylize.md). |
| `variant` | `any` | Select an alternate style supplied by the active theme. Emits `jam-variant`; use a stable numeric or descriptive value. |

### Theme variants

`variant` is a native param on every element. When set, its value is exposed as the `jam-variant` attribute so framework and theme selectors can attach an alternate style recipe.

Use a stable descriptive value when it makes the alternate purpose clear:

```json jaml-playground
{
  "type": "container",
  "stylize": "list",
  "variant": "legend"
}
```

Numeric values remain valid when they are the clearer contract. Because the value becomes an HTML attribute, keep it selector-friendly and make the theme selector match its emitted string. The compact form `stylize: "list-legend"` is equivalent to the example above. See [Theme Style Variants](../Theme/theme.md#theme-style-variants).

---

### Styles & Plugins

| Param | Type | Description |
|---|---|---|
| `styles` | `StyleOption[]` | Ordered array of styles applied to the element. See [Styles](../Styles/styles.md). |
| `plugins` | `PluginOption[]` | Ordered array of plugins applied to the element. See [Plugins](../Plugins/plugins.md). |

---

### State machine

| Param | Type | Description |
|---|---|---|
| `state` | `string` | Current named state. Setting changes params, styles, and fires hooks. |
| `states` | `Dictionary` | Define named states. Each state is an object of params to apply. A `default` state is auto-derived if not declared. |
| `stateStyles` | `Record<string, StyleOption[]>` | Additional styles keyed by state name. Merged into the corresponding `states` entry. |
| `onstatechange` | `(state, oldState) => void` | Hook fired when state changes. `this` = element. |

```javascript jaml-playground
export default {
  type: 'indicator',
  states: {
    pass:    { color: 'green' },
    fail:    { color: 'red' },
    warning: { color: 'orange' }
  },
  onstatechange: function(state, old) {
    // this = the indicator element
    console.log(`State: ${old} → ${state}`)
  }
}
```

**Instance methods:**

- `el.state = 'fail'` — set state directly
- `el.resetState()` — return to `'default'`
- `el.switchToNextState()` — cycle through defined states
- `el.toggleState('fail')` — toggle between named state and `'default'`

---

### Enabled / readOnly

| Param | Type | Description |
|---|---|---|
| `disabled` | `boolean \| string` | Disable the element. Pass a string to show it as a tooltip message on hover. |
| `readOnly` | `boolean` | Make the element read-only (prevents value changes). |
| `ontry` | `(event: Event) => void` | Called when a disabled element is clicked, after any disabled-message handling. |

```json jaml-playground
{
  "type": "input",
  "disabled": "<b>This field is locked</b> — contact an admin to change it"
}
```

---

### Color system

| Param | Type | Description |
|---|---|---|
| `color` | `ColorType` | Accent color — CSS variable, hex, named color, or chroma color. |
| `colorScheme` | `ColorScheme` | Full color scheme (primary, secondary, etc). |
| `colorSet` / `colors` | `ColorType[]` | Array of colors forming a set (used by charts, indicators). |
| `darkMode` | `boolean \| null` | Force light/dark mode. `null` follows system. |

```json jaml-playground
{
  "type": "button",
  "cap": "Danger",
  "color": "red"
}
```

---

### DOM surface

| Param | Type | Description |
|---|---|---|
| `id` | `string` | Element ID. Auto-assigned if not set. |
| `class` | `string \| string[]` | Add CSS classes. |
| `style` | `string \| Dictionary` | Native inline CSS. Both forms support property-aware token values; use `styles` for JAML style-plugin paths. |
| `attrs` | `Dictionary` | Batch-set arbitrary HTML attributes. |

```json jaml-playground
{
  "type": "button",
  "cap": "Primary",
  "class": "my-button jam-primary",
  "style": { "marginTop": "1rem" }
}
```

---

### UX annotations

| Param | Type | Description |
|---|---|---|
| `tip` | `string` | Tooltip text — shown on hover via the `popup.tip` plugin. |
| `help` | `string` | Help text — shown in a help popup via the `popup.helper` plugin. |
| `shortcuts` | `any` | Attach a `SafouShortcuts` button-group popup. See [shortcuts](./shortcuts.md). |

```json jaml-playground
{
  "type": "input",
  "cap": "Email",
  "tip": "Enter your work email address",
  "help": "We use your email for account recovery only. It will not be shared."
}
```

---

### Child / slot helpers

| Param | Type | Description |
|---|---|---|
| `child` / `addChild` | `any \| Node` | Append a child node or HTML to the element. |
| `clickWith` / `for` | `string` | When clicked, also trigger a click on the element with this ID. |

---

### Lifecycle hooks

All hooks can be passed as JAML params or set directly on the element instance. Inside all element hooks, `this` = **element**.

| Hook | Signature | When |
|---|---|---|
| `oninit` | `() => void` | Element first initialized — fires **once** on first DOM attachment, before `onmount`. Never fires again on re-attachments |
| `onmount` | `() => void` | Element connected to the DOM (`connectedCallback`) — fires on **every** connection |
| `onunmount` | `() => void` | Element disconnected from the DOM |
| `ondestroy` | `() => void` | `element.destroy()` is called |
| `onattrchange` | `(attr, value, oldValue) => void` | An attribute changes |
| `onstatechange` | `(state, oldState) => void` | State changes |
| `onchildadd` | `(children) => void` | Child appended (requires `observeChild: true`) |
| `onchildremove` | `(children) => void` | Child removed (requires `observeChild: true`) |
| `onchildremoving` | `(children) => void` | Child is about to be removed — fires before DOM removal, while the child is still in the tree |
| `onchildchange` | `(children) => void` | Any child added or removed |
| `onchildattrchange` | `(child, attr, value, old) => void` | A child's attribute changes |

```javascript jaml-playground
export default {
  type: 'container',
  oninit: function() {
    // this = the container element
    // Fires ONCE — setup that should only run the first time
    console.log('initialized')
  },
  onmount: function() {
    // Fires on every connection
    console.log('mounted')
  },
  ondestroy: function() {
    console.log('container destroyed')
  }
}
```

---

### Instance methods

| Method | Description |
|---|---|
| `el.on(event, cb)` | Add an event listener (tracked for cleanup) |
| `el.once(event, cb)` | Add a one-shot listener |
| `el.off(event, cb?)` | Remove listener(s) |
| `el.trigger(event, detail?)` | Fire a custom event |
| `el.show()` | Show element (remove `jam-hide`, animated) |
| `el.hide()` | Hide element (add `jam-hide`, animated) |
| `el.shake()` | Shake animation (e.g. for validation feedback) |
| `el.destroy()` | Unplug all plugins, fire `ondestroy`, trigger `destroy` event |
| `el.applyStylesSync(key, styles)` | Apply a named group of styles (synchronous) |
| `el.revertStyles(key)` | Revert a named group of styles |
| `el.toggleStyles(key, styles, force?)` | Toggle a named group of styles |
| `el.addPlugin(plugin)` | Add a plugin imperatively |
| `el.removePlugin(plugin)` | Remove a plugin imperatively |
| `el.popup(message, option?)` | Show a popup anchored to this element |
| `el.closePopup(delay?)` | Close the popup for this element |
| `el.setParam(key, value)` | Set a single param |
| `el.setParams(params)` | Set multiple params at once |
| `el.getParam(key)` | Get a param value |
| `el.onReady(event)` | Returns a `SyncPromise<void>` with a `.run(task)` method that executes when `event` fires |

---

## Section 2 — AbstractInputElement

Extends `AbstractElement`. All elements with a user-settable `value` inherit from this.

---

### Value

| Param | Type | Description |
|---|---|---|
| `value` | `any` | Current value. Setting fires `onvaluechange`. |
| `defaultValue` | `any` | Initial value to reset to. Accepts a factory function `() => value`. |
| `clearable` | `boolean` | Whether `clear()` and the clearable plugin can reset the value. Default `true`. |
| `onvaluechange` | `(value, oldValue) => void` | Hook fired when value changes. `this` = element. |

```json jaml-playground
{
  "type": "input",
  "cap": "Name",
  "defaultValue": "Alice"
}
```

---

### Validation — `rules`

**Type:** `IRules`

Define validation constraints. `getFormData()` throws if any fail.

| Rule field | Type | Description |
|---|---|---|
| `required` | `boolean` | Value must not be empty |
| `minlength` | `number` | Minimum string length |
| `maxlength` | `number` | Maximum string length |
| `min` | `number \| string` | Minimum numeric/date value |
| `max` | `number \| string` | Maximum numeric/date value |
| `pattern` | `string` (RegExp) | Must match the pattern |
| `triggers` | `string[]` | When to validate: `'blur'`, `'valuechange'`, `'submit'` |

```json jaml-playground
{
  "type": "input",
  "cap": "Email",
  "rules": {
    "required": true,
    "pattern": "^[^@]+@[^@]+\\.[^@]+$",
    "triggers": ["blur", "valuechange"]
  }
}
```

Rules can carry a custom `message`:

```javascript jaml-playground
export default {
  type: 'input-number',
  cap: 'Score',
  rules: {
    min: { limit: 0,   message: 'Must be positive' },
    max: { limit: 100, message: 'Cannot exceed 100' }
  }
}
```

---

### Value transform pipeline

Values flow through: `modifier` (normalize on set) → stored → `accessor` (transform on read) → `formatter` (display).

| Param | Type | Description |
|---|---|---|
| `formatter` | `(value) => any` \| `string` | Transform value for **display**. String body receives `value` as argument. |
| `modifier` | `(value) => any` \| `string` | Transform value on **write** (before storing). |
| `accessor` | `(value) => any` \| `string` | Transform value on **read** (before returning from `.value`). |

```javascript jaml-playground
export default {
  type: 'input',
  cap: 'Price',
  modifier: (v) => parseFloat(v),          // store as number
  formatter: (v) => `$${v?.toFixed(2)}`,   // display as "$1.23"
  accessor: (v) => v                        // read as stored
}
```

---

### Number formatting

| Param | Type | Description |
|---|---|---|
| `decimalPos` | `number` | Number of decimal places (default `2`). |
| `toFixed` | `boolean \| number` | Use `toFixed()` instead of `round()` for display. Pass a number to also set `decimalPos`. |
| `pattern` | `string` | Date/time format pattern (e.g. `'yyyy-MM-dd'`). |
| `symbol` | `'auto' \| 'both' \| 'none'` | Sign display for numeric formatting. `'both'` prefixes positive numbers with `+`; `'none'` hides the minus sign in display. Default `'auto'`. |

---

### `valueStates` — condition-based state switching

`valueStates` is the condition-only shorthand for value-driven `states`. Each entry is equivalent to a `states` entry containing only `condition`. Use either `valueStates` or `states` on an element, never both. Conditions run in declaration order and the first match wins; when none match, the element returns to `default`.

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

`valueStates` derives the element's `state`; it does not add a visual treatment by itself. In the example, `descStyles` belongs to the stateful indicator, so `:scope[state=...]` targets that indicator's host. A plain selector is descendant-scoped; use `indicator[state=...]` only from an ancestor's `descStyles`. For state-to-accent-color mapping on the same element, `color.stateMap` is the purpose-built alternative.

---

### Instance methods

| Method | Description |
|---|---|
| `el.getValue()` | Get raw stored value (before `accessor`) |
| `el.setValue(value, source?, triggerChange?)` | Set value with optional source tracking |
| `el.setValueQuietly(value, source?)` | Set value without firing `onvaluechange` |
| `el.clear()` | Reset value to `null` if `clearable` is true |
| `el.getContent()` | Get the display content from the value slot |
| `el.setContent(content)` | Set display content manually |
| `el.focus()` | Focus the internal agent element |
| `el.blur()` | Blur the internal agent element |

---

## Section 3 — AbstractOptionElement

Extends `AbstractInputElement`. Elements where the value is selected from a list of options.

---

### Params (extends AbstractInputElement)

| Param | Type | Description |
|---|---|---|
| `alternateDraw` | `(...args) => void` | Custom draw function — overrides the element's default rendering logic. Only available on option-based elements. |
| `optionsSet` | `boolean` | Read-only. `true` once `setOption()` has run at least once. |

---

### Options data

| Param | Type | Description |
|---|---|---|
| `data` | `ElementOption[]` | The options list. Each entry is an option descriptor. |
| `dataUrl` | `string` | Load options from a remote URL (JSON). |

**`ElementOption` fields:**

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Display label |
| `value` | `any` | Selection value |
| `group` | `string` | Group name (creates optgroup or collapsible section) |
| `depth` | `number` | Visual nesting depth. Applied to option DOM as `--jam-depth` when greater than `0` |
| `checked` | `boolean` | Pre-checked state |
| `hide` | `boolean \| 'auto'` | Hide the option |
| `color` | `ColorType` | Option color |
| `icon` | `string` | Option icon |
| `tip` | `string` | Tooltip text |
| `attrs` | `Dictionary` | Extra attributes on the option DOM |

```json jaml-playground
{
  "type": "select",
  "cap": "Category",
  "data": [
    { "name": "Electronics", "value": "electronics", "group": "Products" },
    { "name": "Clothing",    "value": "clothing",    "group": "Products" },
    { "name": "Books",       "value": "books",        "group": "Media"   }
  ]
}
```

---

### Selection mode

Use a composite select type to choose single- or multi-selection.

| Composite type | Behavior |
|---|---|
| `select-radio` (default for most) | Single selection |
| `select-checkbox` | Multi-selection |

```json jaml-playground
{
  "type": "select-checkbox",
  "cap": "Toppings",
  "data": [
    { "name": "Cheese",   "value": "cheese" },
    { "name": "Mushrooms","value": "mushrooms" }
  ]
}
```

| Param | Type | Description |
|---|---|---|
| `valueType` | `ParamType` | Coerce option `value` to a type: `'string'`, `'number'`, `'boolean'`. |

---

### Filtering

| Param | Type | Description |
|---|---|---|
| `keyword` | `string` | Live filter — hides options that don't match. |

---

### Value return format

| Param | Type | Description |
|---|---|---|
| `allKeys` | `string[]` | Extra option fields to include when calling `getCheckedOptions()`. |
| `perGroup` | `boolean` | Return value as `{ groupName: value }` instead of a flat value. |
| `template` | `HTMLElement \| Function` | Custom option DOM template. |

---

### Instance methods

| Method | Description |
|---|---|
| `el.getCheckedValue()` | Get array of currently checked values |
| `el.getCheckedOptions()` | Get full option objects for checked options |
| `el.getCheckedDoms()` | Get DOM elements for checked options |
| `el.findOption(value)` | Find an option by value |
| `el.allOptions()` | Get all `Option` instances |
| `el.setOptions(options)` | Set options programmatically |
| `el.clearOptions()` | Remove all options |

---

### `optionReady`

`el.optionReady` is a `Promise<void>` that resolves after the first options render. Useful when you need to interact with options after they've been built.

```javascript
// Imperative usage (outside JAML playground)
await el.optionReady
console.log('Options are ready:', el.getCheckedValue())
```
