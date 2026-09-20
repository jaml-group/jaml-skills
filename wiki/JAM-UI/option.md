# option

**Class:** `OsteenOption` · **Type:** `"option"` · **Extends:** `AbstractElement`

A declarative child option item. Place `<jam-option>` elements inside an option-based parent (e.g. `select`, `options`, `buttongroup`) to define options via HTML attributes instead of a `data` array.

`OsteenOption` is a `ghostElement` — it has no visible rendering of its own. Its attributes are read by the parent element to build option entries.

---

## JAML usage

```json jaml-playground
{
  "type": "select",
  "cap": "Color",
  "components": [
    { "type": "option", "name": "Red",   "value": "red"   },
    { "type": "option", "name": "Green", "value": "green" },
    { "type": "option", "name": "Blue",  "value": "blue"  }
  ]
}
```

---

## Params

All attributes on the `<jam-option>` element are read as option fields by the parent element.

| Param | Type | Description |
|---|---|---|
| `name` | `string` | **(required)** Option display label |
| `value` | `any` | Option selection value |
| `group` | `string` | Group name for this option (creates optgroup or collapsible section) |
| `checked` | `boolean` | Pre-check this option |
| `hide` | `boolean \| 'auto'` | Hide the option |
| `color` | `ColorType` | Option color |
| `icon` | `string` | Option icon |
| `tip` | `string` | Tooltip text |
| `attrs` | `string` (JSON) | Extra attributes as JSON string |

The `option` property (`el.option`) returns the assembled `ElementOption` object from these attributes.

---

## Declarative HTML usage

`OsteenOption` also works as a raw HTML element inside option parents:

```html
<jam-select cap="Language">
  <jam-option name="English" value="en"></jam-option>
  <jam-option name="Chinese" value="zh"></jam-option>
  <jam-option name="French"  value="fr"></jam-option>
</jam-select>
```

---

## Examples

### Basic option list in a select

```json jaml-playground
{
  "type": "select",
  "cap": "Country",
  "components": [
    { "type": "option", "name": "USA",   "value": "us", "icon": "🇺🇸" },
    { "type": "option", "name": "China",  "value": "cn", "icon": "🇨🇳" },
    { "type": "option", "name": "Japan", "value": "jp", "icon": "🇯🇵" },
    { "type": "option", "name": "UK",    "value": "uk", "icon": "🇬🇧" }
  ]
}
```

### Options with groups and pre-checked value

```json jaml-playground
{
  "type": "select",
  "cap": "Settings",
  "strict": true,
  "components": [
    { "type": "option", "name": "Notifications", "value": "notif", "group": "General" },
    { "type": "option", "name": "Privacy",       "value": "priv",  "group": "General", "checked": true },
    { "type": "option", "name": "Theme",         "value": "theme", "group": "Appearance" },
    { "type": "option", "name": "Language",      "value": "lang",  "group": "Appearance" }
  ]
}
```

### Options with extra attributes

```json jaml-playground
{
  "type": "checkbox",
  "cap": "Features",
  "components": [
    {
      "type": "option",
      "name": "Export CSV",
      "value": "csv",
      "tip": "Download data as CSV file",
      "attrs": "{\"data-format\":\"text/csv\"}"
    },
    {
      "type": "option",
      "name": "Export JSON",
      "value": "json",
      "tip": "Download data as JSON",
      "attrs": "{\"data-format\":\"application/json\"}"
    }
  ]
}
```

### Mixed data and declarative options

OsteenOption children merge with `data` array options. Both sources are combined in the parent:

```json jaml-playground
{
  "type": "select",
  "cap": "Priority",
  "data": [
    { "name": "High", "value": 3 }
  ],
  "components": [
    { "type": "option", "name": "Low",    "value": 1 },
    { "type": "option", "name": "Medium", "value": 2 },
    { "type": "option", "name": "High",   "value": 3 }
  ]
}
```

---

## Notes

- The `option` property returns the built `ElementOption` object from the element's attributes.
- If `name` is not set, the element is ignored.
- Parent option elements detect `OsteenOption` children via `childadded` and automatically update their data.
