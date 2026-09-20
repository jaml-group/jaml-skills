# button-group

**Class:** `BlackberryButtonGroup` · **Type:** `"buttongroup"` · **Extends:** `OliveOptions` (`AbstractOptionElement`)

A row of buttons that acts as a single-select or multi-select input. Each option is rendered as a `BananaButton`. Supports radio (single-select), checkbox/multi (multi-select), and combined subtypes. Use composite shorthand like `"buttongroup-checkbox"`, `"buttongroup-ghost"`, or `"buttongroup-outline"` to set the mode and style.

---

## JAML usage

```json jaml-playground
{
  "type": "buttongroup",
  "cap": "View Mode",
  "data": [
    { "name": "List",  "value": "list",  "icon": "☰" },
    { "name": "Grid",  "value": "grid",  "icon": "⊞" },
    { "name": "Chart", "value": "chart", "icon": "📊" }
  ],
  "defaultValue": "list",
  "valueKey": "viewMode"
}
```

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `data` | `ElementOption[]` | `[]` | Button options. Each entry becomes a button. |
| `value` | `any \| any[]` | — | Selected value(s). |
| `defaultValue` | `any \| any[]` | — | Pre-selected value(s). |
| `chooseAll` | `boolean` | `true` (checkbox) | Show a "select all" toggle. Auto-enabled in checkbox mode. |
| `autoTip` | `boolean` | `false` | Auto-generate tooltip text for each option from its name and value. |

**Available subtypes:** `radio` (default, single-select), `checkbox` / `multi` (multi-select), `ghost` / `outline` (transparent or bordered style), `ghostcheckbox` / `ghostradio` / `outlinecheckbox` / `outlineradio` (combined style and mode).

---

## ElementOption fields

| Field | Description |
|---|---|
| `name` | Button label text |
| `value` | Selection value |
| `icon` | Button icon |
| `color` | Button accent color |
| `styles` | Additional styles for this button |
| `attrs` | Extra attributes on the button DOM |
| `tip` | Tooltip text |
| `hide` | Hide this option |

---

## Examples

### Single-select (radio)

```json jaml-playground
{
  "type": "buttongroup",
  "cap": "Size",
  "data": [
    { "name": "S",  "value": "s"  },
    { "name": "M",  "value": "m"  },
    { "name": "L",  "value": "l"  },
    { "name": "XL", "value": "xl" }
  ],
  "defaultValue": "m",
  "valueKey": "size"
}
```

### Multi-select (checkbox)

```json jaml-playground
{
  "type": "buttongroup-checkbox",
  "cap": "Tags",
  "chooseAll": true,
  "data": [
    { "name": "New",     "value": "new"     },
    { "name": "Popular", "value": "popular" },
    { "name": "On Sale", "value": "sale"    }
  ],
  "valueKey": "filters"
}
```

### Ghost style buttons

```json jaml-playground
{
  "type": "buttongroup-ghost",
  "cap": "Platform",
  "data": [
    { "name": "Windows", "value": "win", "icon": "⊞" },
    { "name": "macOS",   "value": "mac", "icon": "🍎" },
    { "name": "Linux",   "value": "nix", "icon": "🐧" }
  ],
  "defaultValue": "mac",
  "valueKey": "platform"
}
```

### Colored selection

```json jaml-playground
{
  "type": "buttongroup",
  "data": [
    { "name": "Success", "value": "success", "color": "green" },
    { "name": "Warning", "value": "warning", "color": "orange" },
    { "name": "Error",   "value": "error",   "color": "red"   }
  ],
  "defaultValue": "warning",
  "valueKey": "alertLevel"
}
```

---

## Notes

- In `radio` mode the selected button has a checked input element rendered inside it.
- In `checkbox` / `multi` mode each button has a checkbox input.
- The `chooseAll` param adds a master toggle option at the top of the list for checkbox mode.
