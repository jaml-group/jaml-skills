# button-group

**Class:** `BlackberryButtonGroup` · **Type:** `"buttongroup"` · **Extends:** `OliveOptions` (`AbstractOptionElement`)

A row of buttons, with each option rendered as a `BananaButton`. Plain `"buttongroup"` defaults to `checkType: "none"`; use `"buttongroup-radio"` for exclusive single selection or `"buttongroup-checkbox"` for multiple selection. Visual subtypes such as `"buttongroup-ghost"` and `"buttongroup-outline"` do not enable selection by themselves; combine style and mode with `"buttongroup-ghostradio"` or `"buttongroup-outlineradio"` when needed.

`buttongroup-radio` owns mutually exclusive selection, the selected value and checked state. Its native button styles already make the checked button visibly selected. A `check.*` style is optional alternative or enhanced presentation; it neither creates selection nor makes an underline a complete tabs interaction. See [selection and content](../JAML/state-and-data.md#selection-and-content) for publishing selection to a listening content owner.

---

## JAML usage

```json jaml-playground
{
    "type": "buttongroup-radio",
    "cap": "View Mode",
    "data": [
        { "name": "List", "value": "list", "icon": "☰" },
        { "name": "Grid", "value": "grid", "icon": "⊞" },
        { "name": "Chart", "value": "chart", "icon": "📊" }
    ],
    "defaultValue": "list",
    "valueKey": "viewMode"
}
```

---

## Params

For external labels, use `optionTextPolicy: 'literal'` and keep `autoTip` disabled where available. See the shared [literal-label contract](./JAM-UI.md#literal-external-labels) for text-template scope and trusted metadata limits.

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param          | Type              | Default           | Description                                                         |
| -------------- | ----------------- | ----------------- | ------------------------------------------------------------------- |
| `data`         | `ElementOption[]` | `[]`              | Button options. Each entry becomes a button.                        |
| `value`        | `any \| any[]`    | —                 | Selected value(s).                                                  |
| `defaultValue` | `any \| any[]`    | —                 | Pre-selected value(s).                                              |
| `chooseAll`    | `boolean`         | `true` (checkbox) | Show a "select all" toggle. Auto-enabled in checkbox mode.          |
| `autoTip`      | `boolean`         | `false`           | Auto-generate tooltip text for each option from its name and value. |

**Available subtypes:** `radio` (explicit single-select), `checkbox` / `multi` (multi-select), `ghost` / `outline` (transparent or bordered style), `ghostcheckbox` / `ghostradio` / `outlinecheckbox` / `outlineradio` (combined style and mode).

---

## ElementOption fields

| Field    | Description                        |
| -------- | ---------------------------------- |
| `name`   | Button label text                  |
| `value`  | Selection value                    |
| `icon`   | Button icon                        |
| `color`  | Button accent color                |
| `styles` | Additional styles for this button  |
| `attrs`  | Extra attributes on the button DOM |
| `tip`    | Tooltip text                       |
| `hide`   | Hide this option                   |

---

## Examples

### Single-select (radio)

```json jaml-playground
{
    "type": "buttongroup-radio",
    "cap": "Size",
    "data": [
        { "name": "S", "value": "s" },
        { "name": "M", "value": "m" },
        { "name": "L", "value": "l" },
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
        { "name": "New", "value": "new" },
        { "name": "Popular", "value": "popular" },
        { "name": "On Sale", "value": "sale" }
    ],
    "valueKey": "filters"
}
```

### Ghost style single-select buttons

```json jaml-playground
{
    "type": "buttongroup-ghostradio",
    "cap": "Platform",
    "data": [
        { "name": "Windows", "value": "win", "icon": "⊞" },
        { "name": "macOS", "value": "mac", "icon": "🍎" },
        { "name": "Linux", "value": "nix", "icon": "🐧" }
    ],
    "defaultValue": "mac",
    "valueKey": "platform"
}
```

### Colored selection

```json jaml-playground
{
    "type": "buttongroup-radio",
    "data": [
        { "name": "Success", "value": "success", "color": "green" },
        { "name": "Warning", "value": "warning", "color": "orange" },
        { "name": "Error", "value": "error", "color": "red" }
    ],
    "defaultValue": "warning",
    "valueKey": "alertLevel"
}
```

---

## Notes

-   Set the selection subtype explicitly. A `defaultValue` or `valueKey` does not change plain `buttongroup` into radio mode.
-   In `radio` mode the selected button has a checked input element rendered inside it.
-   In `checkbox` / `multi` mode each button has a checkbox input.
-   The `chooseAll` param adds a master toggle option at the top of the list for checkbox mode.
-   Generated native inputs use the [shared option listener/CSP contract](./JAM-UI.md#generated-options-and-csp). Button-host keyboard behavior is described in [button](./button.md#focused-keyboard-activation); it does not add a complete group navigation or ARIA pattern.
