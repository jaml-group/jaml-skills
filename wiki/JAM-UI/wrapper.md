# wrapper

**Class:** `WalnutWrapper` · **Type:** `"wrapper"` · **Extends:** `CoconutContainer`

A labeled container with a title row (icon + cap + extra) and a default body slot. Suitable for grouping elements under a heading. Supports layout subtypes via the type shorthand.

| Type shorthand        | `type`       | Behavior                                                |
| --------------------- | ------------ | ------------------------------------------------------- |
| `"wrapper"` (default) | —            | Standard labeled wrapper                                |
| `"wrapper-vertical"`  | `"vertical"` | Applies `Styles.wrapper.vertical` for vertical stacking |

---

## JAML usage

```json jaml-playground
{
    "type": "wrapper",
    "cap": "User Profile",
    "icon": "user",
    "components": [
        { "type": "input", "cap": "Name", "valueKey": "name" },
        { "type": "input", "cap": "Email", "valueKey": "email" }
    ]
}
```

---

## Params

Inherits all params from [CoconutContainer](./container.md) and [AbstractElement](./JAM-UI.md#section-1--abstractelement).

| Param  | Type     | Default | Description                                                                                                                                                          |
| ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type` | `string` | —       | Use `"wrapper-vertical"` for automatic vertical styling. For an application collection, use `stylize: "list"` and child `stylize: "item"`; select layout separately. |

---

## Slots

| Slot      | Description                    |
| --------- | ------------------------------ |
| `icon`    | Icon in the header row.        |
| `cap`     | Title text in the header row.  |
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
        { "type": "input", "cap": "Email", "valueKey": "email" },
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
        { "type": "button", "cap": "Reset", "usage": "reset" },
        { "type": "button", "cap": "Clear", "usage": "clear" },
        { "type": "button-cta", "cap": "Submit" }
    ]
}
```

### Repeated collection with list/item roles

```json jaml-playground
{
    "type": "wrapper",
    "cap": "Recent Items",
    "stylize": "list",
    "styles": ["layout.flex(direction:column)"],
    "vars": {
        "items": [
            { "id": "alpha", "name": "Alpha" },
            { "id": "beta", "name": "Beta" }
        ]
    },
    "components": [{ "type": "label", "stylize": "item", "buildFor": "item in items", "key": "id", "cap": "{{item.name}}" }]
}
```

### Vertical stacking wrapper

```json jaml-playground
{
    "type": "wrapper-vertical",
    "cap": "Form Controls",
    "components": [
        { "type": "input", "cap": "Field 1" },
        { "type": "input", "cap": "Field 2" },
        { "type": "button", "cap": "Submit" }
    ]
}
```

### With icon only (no cap)

```json jaml-playground
{
    "type": "wrapper",
    "icon": "chart-bar",
    "components": [{ "type": "label", "cap": "Icon header with no text title" }]
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
            "components": [{ "type": "chart-line" }]
        },
        {
            "type": "wrapper",
            "cap": "Controls",
            "components": [{ "type": "switch", "cap": "Auto-refresh", "defaultValue": true }]
        }
    ]
}
```

---

## Notes

-   A bare wrapper with no visible slot content or children has no intrinsic content size and can collapse in centered or shrink-to-fit layouts. Add children or explicit sizing; use `indicator`, `label`, or `button` for a standalone visible value, label, or action.
-   `WalnutWrapper` inherits the one-time initial `isStable` promise and recurring `onstable` callback from [container](container.md#instance-methods-and-properties).
-   `"wrapper-vertical"` applies vertical styling automatically. List/item roles supply collection and peer theme context; use native children that fit each item’s purpose and choose layout explicitly.
-   `wrapper.list` and `wrapper.orderedList` only add legacy markers without native wrapper styling. They do not generate bullets, numbering or selection. `element.list` is reserved for Markdown rendering; supply document lists as Markdown.
-   For native row operations, choose [table](table.md) or [tree](tree.md). [Show more](../Plugins/show-more.md) reveals their loaded rows; it does not limit arbitrary wrapper children.
-   When title, icon, and cap content are all absent, the wrapper collapses its header so its body can occupy the available layout.
