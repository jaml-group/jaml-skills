# wrapper

**Class:** `WalnutWrapper` · **Type:** `"wrapper"` · **Extends:** `CoconutContainer`

A labeled container with a title row (icon + cap + extra) and a default body slot. Suitable for grouping elements under a heading. Supports layout subtypes via the type shorthand.

| Type shorthand | `type` | Behavior |
|---|---|---|
| `"wrapper"` (default) | `"default"` | Standard labeled wrapper |
| `"wrapper-list"` | `"list"` | Applies `Styles.wrapper.list` for list-style layout |
| `"wrapper-vertical"` | `"vertical"` | Applies `Styles.wrapper.vertical` for vertical stacking |

---

## JAML usage

```json jaml-playground
{
  "type": "wrapper",
  "cap": "User Profile",
  "icon": "user",
  "components": [
    { "type": "input", "cap": "Name",  "valueKey": "name" },
    { "type": "input", "cap": "Email", "valueKey": "email" }
  ]
}
```

---

## Params

Inherits all params from [CoconutContainer](./container.md) and [AbstractElement](./JAM-UI.md#section-1--abstractelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `type` | `string` | `'default'` | Layout specialization: `'default'`, `'list'`, or `'vertical'`. Select it with `"wrapper-list"` or `"wrapper-vertical"` in JAML. |

---

## Slots

| Slot | Description |
|---|---|
| `icon` | Icon in the header row. |
| `cap` (default) | Title text in the header row. |
| `default` | Body content (child elements). |

---

## Examples

### Standard labeled section

```json jaml-playground
{
  "type": "wrapper",
  "cap": "Account Settings",
  "icon": "settings",
  "components": [
    { "type": "input", "cap": "Full Name", "valueKey": "fullName" },
    { "type": "input", "cap": "Email",     "valueKey": "email" },
    { "type": "switch", "cap": "Email notifications", "defaultValue": true }
  ]
}
```

### Button row (horizontal)

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["size.fullwidth", "wrapper.buttonwrapper"],
  "components": [
    { "type": "button",  "cap": "Reset",  "usage": "reset" },
    { "type": "button",  "cap": "Clear",  "usage": "clear" },
    { "type": "button-cta", "cap": "Submit" }
  ]
}
```

### List-style wrapper

```json jaml-playground
{
  "type": "wrapper-list",
  "cap": "Recent Items",
  "buildFor": "(item) in items",
  "components": [
    { "type": "label", "cap": "{{item.name}}" }
  ]
}
```

### Vertical stacking wrapper

```json jaml-playground
{
  "type": "wrapper-vertical",
  "cap": "Form Controls",
  "components": [
    { "type": "input",  "cap": "Field 1" },
    { "type": "input",  "cap": "Field 2" },
    { "type": "button", "cap": "Submit" }
  ]
}
```

### With icon only (no cap)

```json jaml-playground
{
  "type": "wrapper",
  "icon": "chart-bar",
  "components": [
    { "type": "label", "cap": "Icon header with no text title" }
  ]
}
```

### Wrapper inside a card

```json jaml-playground
{
  "type": "card",
  "cap": "Dashboard",
  "components": [
    {
      "type": "wrapper",
      "cap": "Analytics",
      "icon": "trending-up",
      "components": [
        { "type": "chart-line" }
      ]
    },
    {
      "type": "wrapper",
      "cap": "Controls",
      "components": [
        { "type": "switch", "cap": "Auto-refresh", "defaultValue": true }
      ]
    }
  ]
}
```

---

## Notes

- A bare wrapper with no visible slot content or children has no intrinsic content size and can collapse in centered or shrink-to-fit layouts. Add children or explicit sizing; use `indicator`, `label`, or `button` for a standalone visible value, label, or action.
- `WalnutWrapper` extends `CoconutContainer`, which provides `observeChild: true` by default and an `isStable` promise that resolves when no child changes have occurred for 10ms.
- Composite types such as `"wrapper-list"` and `"wrapper-vertical"` select a layout specialization.
- When title, icon, and cap content are all absent, the wrapper collapses its header so its body can occupy the available layout.
