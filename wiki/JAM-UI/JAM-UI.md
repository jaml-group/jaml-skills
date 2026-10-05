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

| Type              | Class                     | Doc                               |
| ----------------- | ------------------------- | --------------------------------- |
| `badge`           | `BetelnutBadge`           | [badge](./badge.md)               |
| `button`          | `BananaButton`            | [button](./button.md)             |
| `buttongroup`     | `BlackberryButtonGroup`   | [button-group](./button-group.md) |
| `calendar`        | `CarambolaCalendar`       | [calendar](./calendar.md)         |
| `card`            | `CherryCard`              | [card](./card.md)                 |
| `chart`           | `CashewChart`             | [chart](./chart.md)               |
| `container`       | `CoconutContainer`        | [container](./container.md)       |
| `datepicker`      | `DateDatePicker`          | [datepicker](./datepicker.md)     |
| `daterangepicker` | `DewberryDateRangePicker` | _(extends datepicker)_            |
| `element`         | `EndiveElement`           | [element](./element.md)           |
| `indicator`       | `IcacoIndicator`          | [indicator](./indicator.md)       |
| `input`           | `ImbeInput`               | [input](./input.md)               |
| `label`           | `LeekLabel`               | [label](./label.md)               |
| `locator`         | `LoganLocator`            | [locator](./locator.md)           |
| `map`             | `MedlarMap`               | [map](./map.md)                   |
| `notify`          | `NutmegNotify`            | [notify](./notify.md)             |
| `option`          | `OsteenOption`            | [option](./option.md)             |
| `options`         | `OliveOptions`            | [options](./options.md)           |
| `popup`           | `PapayaPopup`             | [popup](./popup.md)               |
| `progress`        | `PeachProgress`           | [progress](./progress.md)         |
| `select`          | `SugarcaneSelect`         | [select](./select.md)             |
| `shortcuts`       | `SafouShortcuts`          | [shortcuts](./shortcuts.md)       |
| `step`            | `ShaddockStep`            | [step](./step.md)                 |
| `switch`          | `SunflowerSwitch`         | [switch](./switch.md)             |
| `table`           | `TomatoTable`             | [table](./table.md)               |
| `tags`            | `ToughpearTags`           | [tags](./tags.md)                 |
| `timepicker`      | `TangerineTimePicker`     | [timepicker](./timepicker.md)     |
| `timerangepicker` | —                         | _(extends timepicker)_            |
| `tree`            | `TamarilloTree`           | [tree](./tree.md)                 |
| `wrapper`         | `WalnutWrapper`           | [wrapper](./wrapper.md)           |

> **Element specialization:** Use the composite `"type-specialization"` form, such as `"button-cta"`, `"input-number"`, or `"select-checkbox"`.

---

## Representers

Representers use the same `"type"` key in JAML for data carriers and HTML primitives. Most entries create framework elements with their inherited parameters. [`vanilla`](vanilla.md) instead creates an ordinary HTML element; component-level bindings, attributes and visibility still apply, but it does not inherit every `AbstractElement` property or slot.

| Type                    | Class           | Description                                                                                       |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `checkbox`              | —               | Checkbox input. Extends `AbstractInputElement`.                                                   |
| `code`                  | —               | Syntax-highlighted code block.                                                                    |
| `data`                  | —               | Invisible data carrier; see [shared data ownership](../JAML/state-and-data.md#shared-data-owner). |
| `divider`               | `EndiveElement` | Visual divider; optional label is supplied through inherited `value` from `AbstractInputElement`. |
| `hr`                    | —               | Horizontal rule (`<hr>`).                                                                         |
| `placeholder`           | —               | Placeholder element.                                                                              |
| `radio`                 | —               | Radio input. Extends `AbstractInputElement`.                                                      |
| `tag`                   | —               | Single tag/chip.                                                                                  |
| `textarea`              | —               | Multi-line text area. Extends `AbstractInputElement`.                                             |
| `vr`                    | —               | Vertical rule.                                                                                    |
| [`vanilla`](vanilla.md) | —               | Creates an ordinary HTML tag: `vanilla` defaults to `<div>`; `vanilla-img` creates `<img>`.       |
| `unknown`               | —               | Fallback for unrecognized types.                                                                  |

---

## Section 1 — AbstractElement

Every JAM-UI element inherits from `AbstractElement`. All params listed here are available on every element.

---

### Core

| Param          | Type      | Description                                                                             |
| -------------- | --------- | --------------------------------------------------------------------------------------- |
| `ghostElement` | `boolean` | When `true` the element is invisible in the DOM (used internally for virtual elements). |
| `observeChild` | `boolean` | Enable child mutation observation (fires child lifecycle events).                       |
| `autoState`    | `boolean` | Automatically toggle state on click (cycles through defined `states`).                  |

### Theme presentation

| Param     | Type     | Description                                                                                                                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stylize` | `string` | Apply a runtime presentation profile, such as a semantic role (`"panel"`, `"field"`) or renderer profile (`"markdown"`, `"json"`). See [Theme Stylize](../Theme/stylize.md). |
| `variant` | `any`    | Select an alternate style supplied by the active theme. Emits `jam-variant`; use a stable numeric or descriptive value.                                                      |

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

| Param     | Type             | Description                                                                            |
| --------- | ---------------- | -------------------------------------------------------------------------------------- |
| `styles`  | `StyleOption[]`  | Ordered array of styles applied to the element. See [Styles](../Styles/styles.md).     |
| `plugins` | `PluginOption[]` | Ordered array of plugins applied to the element. See [Plugins](../Plugins/plugins.md). |

---

### State machine

| Param           | Type                            | Description                                                                                                         |
| --------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `state`         | `string`                        | Current named state. Setting changes params, styles, and fires hooks.                                               |
| `states`        | `Dictionary`                    | Define named states. Each state is an object of params to apply. A `default` state is auto-derived if not declared. |
| `stateStyles`   | `Record<string, StyleOption[]>` | Additional styles keyed by state name. Merged into the corresponding `states` entry.                                |
| `onstatechange` | `(state, oldState) => void`     | Hook fired when state changes. `this` = element.                                                                    |

```javascript jaml-playground
export default {
  type: "indicator",
  states: {
    pass: { color: "green" },
    fail: { color: "red" },
    warning: { color: "orange" },
  },
  onstatechange: function (state, old) {
    // this = the indicator element
    console.log(`State: ${old} → ${state}`);
  },
};
```

**Instance methods:**

- `el.state = 'fail'` — set state directly
- `el.resetState()` — return to `'default'`
- `el.switchToNextState()` — cycle through defined states
- `el.toggleState('fail')` — toggle between named state and `'default'`

---

### Enabled / readOnly

| Param      | Type                     | Description                                                                     |
| ---------- | ------------------------ | ------------------------------------------------------------------------------- |
| `disabled` | `boolean \| string`      | Disable the element. Pass a string to show it as a tooltip message on hover.    |
| `readOnly` | `boolean`                | Make the element read-only (prevents value changes).                            |
| `ontry`    | `(event: Event) => void` | Called when a disabled element is clicked, after any disabled-message handling. |

```json jaml-playground
{
  "type": "input",
  "disabled": "<b>This field is locked</b> — contact an admin to change it"
}
```

---

### Color system

| Param                 | Type              | Description                                                     |
| --------------------- | ----------------- | --------------------------------------------------------------- |
| `color`               | `ColorType`       | Accent color — CSS variable, hex, named color, or chroma color. |
| `colorScheme`         | `ColorScheme`     | Full color scheme (primary, secondary, etc).                    |
| `colorSet` / `colors` | `ColorType[]`     | Array of colors forming a set (used by charts, indicators).     |
| `darkMode`            | `boolean \| null` | Force light/dark mode. `null` follows system.                   |

```json jaml-playground
{
  "type": "button",
  "cap": "Danger",
  "color": "red"
}
```

---

### DOM surface

| Param   | Type                   | Description                                                                                                  |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| `id`    | `string`               | Element ID. Auto-assigned if not set.                                                                        |
| `class` | `string \| string[]`   | Add CSS classes.                                                                                             |
| `style` | `string \| Dictionary` | Native inline CSS. Both forms support property-aware token values; use `styles` for JAML style-plugin paths. |
| `attrs` | `Dictionary`           | Batch-set arbitrary HTML attributes.                                                                         |

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

| Param       | Type     | Description                                                                    |
| ----------- | -------- | ------------------------------------------------------------------------------ |
| `tip`       | `string` | Tooltip text — shown on hover via the `popup.tip` plugin.                      |
| `help`      | `string` | Help text — shown in a help popup via the `popup.helper` plugin.               |
| `shortcuts` | `any`    | Attach a `SafouShortcuts` button-group popup. See [shortcuts](./shortcuts.md). |

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

| Param                | Type          | Description                                                     |
| -------------------- | ------------- | --------------------------------------------------------------- |
| `child` / `addChild` | `any \| Node` | Append a child node or HTML to the element.                     |
| `clickWith` / `for`  | `string`      | When clicked, also trigger a click on the element with this ID. |

---

### Slot content and literal text

Slot setters such as `cap` accept authored HTML strings as well as supplied `Text` nodes and Elements. A string is not an automatic plain-text boundary. To display external content literally, supply `document.createTextNode(text)` or an Element whose `textContent` was assigned from the value. This remains separate from [binder/data interpretation](../JAML/binder.md#runtime-data-and-authored-definitions).

```javascript
// Imperative example: label is an existing Jam-UI label element.
label.cap = document.createTextNode("<b>Literal {{text}}</b>");
// Authored HTML strings intentionally retain markup semantics:
label.cap = "<b>Emphasized text</b>";
```

The updated development runtime preserves supplied Text as literal content when wrapping it for a slot, including nested/async binding results. Slot assignment can wrap or move nodes; it does not promise preservation of the Text node's identity. Elements retain their existing DOM content, so create them through text-safe APIs when needed. Older 1.6.0 bundles may reparse a supplied Text node as markup; verify the consuming runtime. This correction does not sanitize arbitrary HTML strings or Elements.

### Naming native input agents

For a native input, textarea or select without a visible caption, provide an accessible name on its actual native agent. The updated development runtime forwards selected host ARIA attributes; see [native caption and accessible names](input.md#native-caption-and-accessible-names) for ownership, removal and browser-reference limits. Older bundles do not forward these attributes: use the direct-agent fallback below. `getAgent()` is public; the element's `oninit` hook runs after its native agent has been assigned.

```javascript jaml-playground
export default {
  type: "select",
  data: [{ name: "Model A", value: "a" }],
  oninit() {
    this.getAgent().setAttribute("aria-label", "Model");
  },
};
```

For a changing or localized name, update the same attribute from its existing application owner. This example sets a static name once; it does not define naming for replacement editors. `setParam('aria-label', ...)` is not an attribute-forwarding API, and `agent.attrs` is not a registered style. Component `onafterrender` may run while a parent is detached; prefer element initialization when native-agent readiness is required.

### Named-slot lifecycle

Every named slot present in an element's template at initialization exposes a `[name]slotchange` event and an `on[name]slotchange` hook. For example, `cap` provides `capslotchange` / `oncapslotchange`; the same rule applies to `icon`, `label`, `value`, `unit` and other slots actually present on that element. This works independently of `observeChild`.

| Surface               | Runtime signature / payload                                           | Receiver                                                               |
| --------------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `on[name]slotchange`  | `(slot: HTMLSlotElement, assigned: Node[]) => void`                   | `this` is the element; arguments are not an event                      |
| `[name]slotchange`    | `CustomEvent<{ slot: HTMLSlotElement, assigned: Node[] }>`            | Dispatched on the element; read `event.detail`                         |
| `slotChangedCallback` | `(slotName: string, slot: HTMLSlotElement, assigned: Node[]) => void` | Element subclass callback; preserve inherited behavior when overriding |

On receipt of native `slotchange`, the element reads `slot.assignedNodes({ flatten: true })`, updates the slot's `empty` class, calls `slotChangedCallback`, invokes the named hook, then dispatches the named event. `assigned` is a snapshot array of nodes, including text nodes and flattened fallback content where applicable; it is not a `NodeListOf<Element>` or a list of only direct children. A throwing callback/hook interrupts the remaining steps; returning `false` does not cancel delivery.

#### Listening and delegation

Prefer JAML `on: { capslotchange(event) { ... } }` or `el.on('capslotchange', handler)` for independent subscriptions. Direct hook assignment uses `el.oncapslotchange = function (slot, assigned) { ... }`. The dispatcher looks up the hook dynamically, but a top-level JAML hook param is accepted only when the element exposes that property; use the event form for template-only names such as `label`. In the current runtime, slot-property hooks such as `oncapslotchange` can share their assigned callback across instances, so event listeners are the reliable choice for per-instance behavior.

The named host event has `bubbles: false`, `composed: false` and `cancelable: false`. An ordinary ancestor listener or ancestor `on` map will not receive a descendant's event. Delegation within the same DOM tree uses `root.addEventListener('capslotchange', handler, { capture: true })`; identify the emitting host with `event.target`, and the relevant slot with `event.detail.slot`. It does not cross an enclosing shadow boundary. Remove the listener with the same capture setting when its owner is released.

Native `slotchange` does bubble inside the shadow tree. Nested template slots can therefore notify an outer slot too: for an input, a `capslotchange` may be accompanied by `labelslotchange`. Each payload describes the slot whose listener handled the notification. Do not assume one host event per application update.

#### Initialization and firing limits

- Slots and their listeners are prepared on first connection, before `init` / `oninit` and `mount` / `onmount`. There is no unconditional initial named event or replay for a late subscriber. Read current state when attaching behavior, and use mount/render lifecycle when the behavior depends on attachment or completed child rendering.
- Native notifications are asynchronous and can coalesce. Adding, removing, replacing or reassigning slotted nodes can notify; changing a descendant's text or attributes without changing assignment does not. JAM-UI can update an existing caption text node in place, so setting `cap` is not a guarantee of `capslotchange`. See the [DOM slot notification contract](https://dom.spec.whatwg.org/#signaling-slot-change).
- A slot added after template initialization does not automatically receive this bridge. In particular, dynamically created `layer` / `extra` slots are not guaranteed to emit their own named host event.
- A `value` property does not imply a `value` slot. Text inputs write their internal control, so use `valuechange` / `onvaluechange` for value changes; `valueslotchange` describes slot assignment only where a value slot exists.

#### Reuse before observing DOM

For caption or other slot assignment changes, use these events plus an initial read. For model-driven text updates, synchronize from the existing binding/watcher or value event that owns the change. Add a `MutationObserver` only for a demonstrated requirement those contracts do not cover, such as arbitrary external descendant mutations, and give it explicit cleanup. A plugin subscribes and reads current state when plugged, then removes its listeners when unplugged; see [plugin lifecycle](../Plugins/plugins.md#lifecycle-and-ownership).

This example marks whether the input has caption text on mount and whenever caption assignment changes. In-place caption text updates need synchronization from their data owner as described above.

```javascript jaml-playground
function syncCaptionState(element, assigned) {
  const _hasCaption = assigned.some(
    (node) => (node.textContent ?? "").trim() !== "",
  );
  element.toggleAttribute("data-has-caption", _hasCaption);
}

export default {
  type: "input",
  cap: "Account",
  onmount() {
    syncCaptionState(this, this.slots.cap.assignedNodes({ flatten: true }));
  },
  on: {
    capslotchange(event) {
      const { assigned } = event.detail;
      syncCaptionState(this, assigned);
    },
  },
};
```

---

### Lifecycle hooks

The hooks listed below can be passed as JAML params or set directly on the element instance. For ordinary functions in element hooks, `this` = **element**; arrow functions retain their lexical receiver. For slot hooks, including their parameter and subscription limits, see [Named-slot lifecycle](#named-slot-lifecycle).

The current development runtime corrects the ordinary `ondestroy` receiver to the element. Earlier bundles omitted that receiver; verify the corrected bundle before relying on `this` there. Until updating, a cleanup closure can capture the actual element in component `onafterrender` (`this.element` in that component hook). Destruction unplugs element plugins first, invokes `ondestroy`, emits `destroy`, and then removes the element. A throwing hook is reported and native teardown continues. This is not a guarantee that arbitrary application cleanup or repeated direct destruction is idempotent.

| Hook                | Signature                           | When                                                                                                                      |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `oninit`            | `() => void`                        | Element first initialized — fires **once** on first DOM attachment, before `onmount`. Never fires again on re-attachments |
| `onmount`           | `() => void`                        | Element connected to the DOM (`connectedCallback`) — fires on **every** connection                                        |
| `onunmount`         | `() => void`                        | Element disconnected from the DOM                                                                                         |
| `ondestroy`         | `() => void`                        | `element.destroy()` is called                                                                                             |
| `onattrchange`      | `(attr, value, oldValue) => void`   | An attribute changes                                                                                                      |
| `onstatechange`     | `(state, oldState) => void`         | State changes                                                                                                             |
| `onchildadd`        | `(children) => void`                | Child appended (requires `observeChild: true`)                                                                            |
| `onchildremove`     | `(children) => void`                | Child removed (requires `observeChild: true`)                                                                             |
| `onchildremoving`   | `(children) => void`                | Child is about to be removed — fires before DOM removal, while the child is still in the tree                             |
| `onchildchange`     | `(children) => void`                | Any child added or removed                                                                                                |
| `onchildattrchange` | `(child, attr, value, old) => void` | A child's attribute changes                                                                                               |

```javascript jaml-playground
export default {
  type: "container",
  oninit: function () {
    // this = the container element
    // Fires ONCE — setup that should only run the first time
    console.log("initialized");
  },
  onmount: function () {
    // Fires on every connection
    console.log("mounted");
  },
  ondestroy: function () {
    console.log("container destroyed");
  },
};
```

---

### Instance methods

| Method                                 | Description                                                                               |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| `el.on(event, cb)`                     | Add an event listener (tracked for cleanup)                                               |
| `el.once(event, cb)`                   | Add a one-shot listener                                                                   |
| `el.off(event, cb?)`                   | Remove listener(s)                                                                        |
| `el.trigger(event, detail?)`           | Fire a custom event                                                                       |
| `el.show()`                            | Show element (remove `jam-hide`, animated)                                                |
| `el.hide()`                            | Hide element (add `jam-hide`, animated)                                                   |
| `el.shake()`                           | Shake animation (e.g. for validation feedback)                                            |
| `el.destroy()`                         | Unplug all plugins, fire `ondestroy`, trigger `destroy` event                             |
| `el.applyStylesSync(key, styles)`      | Apply a named group of styles (synchronous)                                               |
| `el.revertStyles(key)`                 | Revert a named group of styles                                                            |
| `el.toggleStyles(key, styles, force?)` | Toggle a named group of styles                                                            |
| `el.addPlugin(plugin)`                 | Add a plugin imperatively                                                                 |
| `el.removePlugin(plugin)`              | Remove a plugin imperatively                                                              |
| `el.popup(message, option?)`           | Show a popup anchored to this element                                                     |
| `el.closePopup(delay?)`                | Close the popup for this element                                                          |
| `el.setParam(key, value)`              | Set a single param                                                                        |
| `el.setParams(params)`                 | Set multiple params at once                                                               |
| `el.getParam(key)`                     | Get a param value                                                                         |
| `el.onReady(event)`                    | Returns a `SyncPromise<void>` with a `.run(task)` method that executes when `event` fires |

---

## Section 2 — AbstractInputElement

Extends `AbstractElement`. All elements with a user-settable `value` inherit from this.

---

### Value

| Param               | Type                                                | Description                                                                                                                                                |
| ------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`             | `any`                                               | Current value. A changed assignment normally fires the value-change hook and events.                                                                       |
| `defaultValue`      | `any`                                               | Initial value to reset to. Accepts a factory function `() => value`.                                                                                       |
| `clearable`         | `boolean`                                           | Whether `clear()` and the clearable plugin can reset the value. Default `true`.                                                                            |
| `onvaluechange`     | `(value, oldValue) => void`                         | Hook fired when value changes. `this` = element.                                                                                                           |
| `onvalueslotchange` | `(slot: HTMLSlotElement, assigned: Node[]) => void` | [Slot hook](#named-slot-lifecycle), only when a value slot is present. Some type declarations say `NodeListOf<Element>`; the runtime argument is `Node[]`. |

```json jaml-playground
{
  "type": "input",
  "cap": "Name",
  "defaultValue": "Alice"
}
```

---

### Value changes and explicit actions

Assigning `value`, or calling `setValue` with its default `triggerChange: true`, invokes `onvaluechange`, emits `valuechange` and dispatches `change` when the resulting value differs. Programmatic assignments, including model bindings that write `value`, can therefore reach `onchange`; that notification alone does not establish a human commit. Native user editing also uses the framework's synthesized change event.

Use `onchange` freely for local draft state, previews and other intended value reactions. When changing access, applying a preset or sending another business action requires explicit confirmation, bind the selector to a draft value and perform that action from a separate **Apply** button. At the application boundary, ignore unchanged effective settings before making an RPC or entering a timed wait; native setter equality checks do not cover every application update path.

For a deliberately silent programmatic update, `setValueQuietly(value)` or `setValue(value, source, false)` suppresses this hook/event sequence. Use that only when subscribers should not be notified; it is not a substitute for separating drafts from committed actions.

---

### Validation — `rules`

**Type:** `IRules`

Define validation constraints. `getFormData()` throws if any fail. Rule keys are case-sensitive: use `minLength` and `maxLength`, matching the native control properties. Test user typing separately from programmatic value assignment; native length validity and input truncation do not imply that arbitrary assigned values receive the same enforcement.

| Rule field  | Type               | Description                                             |
| ----------- | ------------------ | ------------------------------------------------------- |
| `required`  | `boolean`          | Value must not be empty                                 |
| `minLength` | `number`           | Minimum string length                                   |
| `maxLength` | `number`           | Maximum string length                                   |
| `min`       | `number \| string` | Minimum numeric/date value                              |
| `max`       | `number \| string` | Maximum numeric/date value                              |
| `pattern`   | `string` (RegExp)  | Must match the pattern                                  |
| `triggers`  | `string[]`         | When to validate: `'blur'`, `'valuechange'`, `'submit'` |

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
  type: "input-number",
  cap: "Score",
  rules: {
    min: { limit: 0, message: "Must be positive" },
    max: { limit: 100, message: "Cannot exceed 100" },
  },
};
```

---

### Value transform pipeline

Values flow through: `modifier` (normalize on set) → stored → `accessor` (transform on read) → `formatter` (display).

| Param       | Type                         | Description                                                                |
| ----------- | ---------------------------- | -------------------------------------------------------------------------- |
| `formatter` | `(value) => any` \| `string` | Transform value for **display**. String body receives `value` as argument. |
| `modifier`  | `(value) => any` \| `string` | Transform value on **write** (before storing).                             |
| `accessor`  | `(value) => any` \| `string` | Transform value on **read** (before returning from `.value`).              |

```javascript jaml-playground
export default {
  type: "input",
  cap: "Price",
  modifier: (v) => parseFloat(v), // store as number
  formatter: (v) => `$${v?.toFixed(2)}`, // display as "$1.23"
  accessor: (v) => v, // read as stored
};
```

---

### Number formatting

| Param        | Type                         | Description                                                                                                                                   |
| ------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `decimalPos` | `number`                     | Number of decimal places (default `2`).                                                                                                       |
| `toFixed`    | `boolean \| number`          | Use `toFixed()` instead of `round()` for display. Pass a number to also set `decimalPos`.                                                     |
| `pattern`    | `string`                     | Date/time format pattern (e.g. `'yyyy-MM-dd'`).                                                                                               |
| `symbol`     | `'auto' \| 'both' \| 'none'` | Sign display for numeric formatting. `'both'` prefixes positive numbers with `+`; `'none'` hides the minus sign in display. Default `'auto'`. |

---

### `valueStates` — condition-based state switching

`valueStates` is the condition-only shorthand for value-driven `states`. Each entry is equivalent to a `states` entry containing only `condition`. Use either `valueStates` or `states` on an element, never both. Conditions run in declaration order and the first match wins; when none match, the element returns to `default`.

```javascript jaml-playground
export default {
  type: "indicator",
  cap: "Score",
  value: "{{score}}",
  valueStates: {
    pass: (value) => value >= 60,
    failed: (value) => value < 60,
  },
  descStyles: {
    ":scope[state=pass]": ["color(green)"],
    ":scope[state=failed]": ["color(red)"],
  },
  vars: { score: 43 },
};
```

`valueStates` derives the element's `state`; it does not add a visual treatment by itself. In the example, `descStyles` belongs to the stateful indicator, so `:scope[state=...]` targets that indicator's host. A plain selector is descendant-scoped; use `indicator[state=...]` only from an ancestor's `descStyles`. For state-to-accent-color mapping on the same element, `color.stateMap` is the purpose-built alternative.

---

### Instance methods

| Method                                        | Description                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| `el.getValue()`                               | Get raw stored value (before `accessor`)                                 |
| `el.setValue(value, source?, triggerChange?)` | Set value; `triggerChange` defaults to `true`                            |
| `el.setValueQuietly(value, source?)`          | Set value without the value-change hook or `valuechange`/`change` events |
| `el.clear()`                                  | Reset value to `null` if `clearable` is true                             |
| `el.getContent()`                             | Get the display content from the value slot                              |
| `el.setContent(content)`                      | Set display content manually                                             |
| `el.focus()`                                  | Focus the internal agent element                                         |
| `el.blur()`                                   | Blur the internal agent element                                          |

---

## Section 3 — AbstractOptionElement

Extends `AbstractInputElement`. Elements where the value is selected from a list of options.

---

### Params (extends AbstractInputElement)

| Param           | Type                | Description                                                                                                      |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `alternateDraw` | `(...args) => void` | Custom draw function — overrides the element's default rendering logic. Only available on option-based elements. |
| `optionsSet`    | `boolean`           | Read-only. `true` once `setOption()` has run at least once.                                                      |

---

### Options data

| Param              | Type                     | Description                                                                                                                                    |
| ------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`             | `ElementOption[]`        | The options list. Each entry is an option descriptor.                                                                                          |
| `dataUrl`          | `string`                 | Load options from a remote URL (JSON).                                                                                                         |
| `optionTextPolicy` | `'trusted' \| 'literal'` | Current development runtime: default `'trusted'`; `'literal'` inserts option-template text once without parsing HTML or resubstituting braces. |

**`ElementOption` fields:**

| Field     | Type                | Description                                                                        |
| --------- | ------------------- | ---------------------------------------------------------------------------------- |
| `name`    | `string`            | Display label                                                                      |
| `value`   | `any`               | Selection value                                                                    |
| `group`   | `string`            | Group name (creates optgroup or collapsible section)                               |
| `depth`   | `number`            | Visual nesting depth. Applied to option DOM as `--jam-depth` when greater than `0` |
| `checked` | `boolean`           | Pre-checked state                                                                  |
| `hide`    | `boolean \| 'auto'` | Hide the option                                                                    |
| `color`   | `ColorType`         | Option color                                                                       |
| `icon`    | `string`            | Option icon                                                                        |
| `tip`     | `string`            | Tooltip text                                                                       |
| `attrs`   | `Dictionary`        | Extra attributes on the option DOM                                                 |

```json jaml-playground
{
  "type": "select",
  "cap": "Category",
  "data": [
    { "name": "Electronics", "value": "electronics", "group": "Products" },
    { "name": "Clothing", "value": "clothing", "group": "Products" },
    { "name": "Books", "value": "books", "group": "Media" }
  ]
}
```

---

### Literal external labels

In the current development runtime, set `optionTextPolicy: 'literal'` for external question choices, model names and file/workspace labels. It applies to native select, radio/checkbox and button-group text templates. Names remain strings, so filtering, option keys and selected values keep their ordinary behavior. Text placeholders are replaced once; markup and braces in inserted values remain visible literally. Native select group labels are also literal attributes.

```javascript jaml-playground
export default {
  type: "buttongroup-radio",
  optionTextPolicy: "literal",
  autoTip: false,
  onafterrender({ element }) {
    // Pass incoming labels as data, outside JAML expression authoring.
    const choices = [{ name: "<model> {{literal}} {name}", value: "model-id" }];
    element.setOptions(choices.map(({ name, value }) => ({ name, value })));
  },
};
```

Configure the policy before `setOptions`; `setParams({ data, optionTextPolicy: 'literal' })` orders the policy first automatically. Changing the policy alone does not redraw existing options: call `setOptions` with the new list afterward. Keep external labels as strings rather than replacing names with DOM nodes.

The policy applies to all text-node placeholders in a custom option template, including mixed/repeated placeholders. Templates and attribute fields remain trusted authoring: it does not sanitize `attrs`, events, `icon`, `tip`, or a custom `cap="{name}"` attribute sink. Keep `autoTip: false` for untrusted labels because automatic tooltips interpret generated markup. Copy only approved label/value fields from external records. The default `trusted` policy preserves existing authored markup.

---

### Selection mode

Use a composite select type to choose single- or multi-selection.

| Composite type                    | Behavior         |
| --------------------------------- | ---------------- |
| `select-radio` (default for most) | Single selection |
| `select-checkbox`                 | Multi-selection  |

```json jaml-playground
{
  "type": "select-checkbox",
  "cap": "Toppings",
  "data": [
    { "name": "Cheese", "value": "cheese" },
    { "name": "Mushrooms", "value": "mushrooms" }
  ]
}
```

| Param       | Type        | Description                                                           |
| ----------- | ----------- | --------------------------------------------------------------------- |
| `valueType` | `ParamType` | Coerce option `value` to a type: `'string'`, `'number'`, `'boolean'`. |

---

### Filtering

| Param     | Type     | Description                                   |
| --------- | -------- | --------------------------------------------- |
| `keyword` | `string` | Live filter — hides options that don't match. |

---

### Value return format

| Param      | Type                      | Description                                                        |
| ---------- | ------------------------- | ------------------------------------------------------------------ |
| `allKeys`  | `string[]`                | Extra option fields to include when calling `getCheckedOptions()`. |
| `perGroup` | `boolean`                 | Return value as `{ groupName: value }` instead of a flat value.    |
| `template` | `HTMLElement \| Function` | Custom option DOM template.                                        |

---

### Instance methods

| Method                   | Description                                 |
| ------------------------ | ------------------------------------------- |
| `el.getCheckedValue()`   | Get array of currently checked values       |
| `el.getCheckedOptions()` | Get full option objects for checked options |
| `el.getCheckedDoms()`    | Get DOM elements for checked options        |
| `el.findOption(value)`   | Find an option by value                     |
| `el.allOptions()`        | Get all `Option` instances                  |
| `el.setOptions(options)` | Set options programmatically                |
| `el.clearOptions()`      | Remove all options                          |

---

### Generated options and CSP

The updated development runtime attaches click listeners to each generated radio/checkbox input after its template is cloned. Built-in radio/checkbox and button-group choices therefore stop the input click from bubbling into a second wrapper activation without a string `onclick` attribute on that native input. Older bundles may still rely on that attribute.

This is a boundary for the generated native-input listener, not a whole-framework strict-CSP guarantee. Authored handlers, binding expressions, option attributes and custom templates remain trusted application code; verify the actual application under its Content Security Policy. See [trusted definitions and runtime data](../JAML/binder.md#runtime-data-and-authored-definitions).

### `optionReady`

`el.optionReady` is a `Promise<void>` that resolves after the first options render. Useful when you need to interact with options after they've been built.

```javascript
// Imperative usage (outside JAML playground)
await el.optionReady;
console.log("Options are ready:", el.getCheckedValue());
```
