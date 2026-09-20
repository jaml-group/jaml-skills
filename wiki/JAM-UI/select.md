# select

**Class:** `SugarcaneSelect` · **Type:** `"select"` · **Extends:** `AbstractOptionElement`

A native `<select>` dropdown with `<optgroup>` support, a configurable placeholder entry, and single/multi-select modes.

| Type shorthand | Behavior |
|---|---|
| `"select"` (default) | Single selection |
| `"select-checkbox"` | Multi-selection; adds the native `multiple` attribute |

---

## JAML usage

```json jaml-playground
{
  "type": "select",
  "cap": "Country",
  "data": [
    { "name": "USA",    "value": "us" },
    { "name": "China",  "value": "cn" },
    { "name": "France", "value": "fr" }
  ],
  "defaultValue": "us"
}
```

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string \| boolean` | `'--请选择--'` | Placeholder option at the top of the dropdown. Pass `false` or `''` to hide. |

---

## Slots

Inherits all slots from `Templates.label` (`label`, `icon`, `cap`). No element-specific slots.

---

## Examples

### Options with groups

Use the `group` field on options to create `<optgroup>` sections:

```json jaml-playground
{
  "type": "select",
  "cap": "Location",
  "data": [
    { "name": "New York",   "value": "ny",  "group": "North America" },
    { "name": "Los Angeles","value": "la",  "group": "North America" },
    { "name": "Paris",      "value": "par", "group": "Europe" },
    { "name": "London",     "value": "lon", "group": "Europe" }
  ]
}
```

### Multi-select with checkboxes

```json jaml-playground
{
  "type": "select-checkbox",
  "cap": "Permissions",
  "data": [
    { "name": "Read",  "value": "read" },
    { "name": "Write", "value": "write" },
    { "name": "Admin", "value": "admin" }
  ],
  "defaultValue": ["read"]
}
```

### Remote data source

```json jaml-playground
{
  "type": "select",
  "cap": "App Type",
  "dataUrl": "assets/appTypes.json",
  "defaultValue": "1"
}
```

### Data watcher (reactive options)

```json jaml-playground
{
  "type": "select",
  "cap": "Category",
  "tip": "Loaded from messenger data",
  "dataWatcher": "categoryList"
}
```

### Disabled placeholder and custom styles

```json jaml-playground
{
  "type": "select",
  "cap": "Tags",
  "placeholder": false,
  "styles": ["size.fullwidth"],
  "data": [
    { "name": "Urgent", "value": "urgent", "color": "red" },
    { "name": "Normal", "value": "normal", "color": "blue" }
  ]
}
```

---

## Notes

- The placeholder entry is always the first `<option>` and is hidden when `placeholder: false` or `placeholder: ''`.
- The `jam-selected` CSS class is toggled when a non-null value is selected.
- In multi-select mode (`"select-checkbox"`), the `<select>` element gets the native `multiple` attribute and the placeholder is automatically hidden.
