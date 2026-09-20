# options

**Class:** `OliveOptions` · **Types:** `"radio"`, `"checkbox"` · **Extends:** `AbstractOptionElement`

An inline radio or checkbox option list. Renders each option as a styled `<input>` + label pair. Supports "select all", option groups, and auto-tip.

---

## JAML usage

```json jaml-playground
{
  "type": "radio",
  "cap": "Priority",
  "data": [
    { "name": "Low",    "value": 1 },
    { "name": "Medium", "value": 2 },
    { "name": "High",   "value": 3 }
  ],
  "defaultValue": 2,
  "valueKey": "priority"
}
```

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement), including `data`, `dataUrl`, `value`, `defaultValue`, `allKeys`, `perGroup`, `template`, and `keyword`.

| Param | Type | Default | Description |
|---|---|---|---|
| `type` | `'radio' \| 'checkbox'` | — | Selection mode. Use `"radio"` or `"checkbox"` as the JAML type directly. |
| `chooseAll` | `boolean` | `true` for checkbox | Show a "select all" option at the top. |
| `rootConf` | `GroupConfig` | auto | Root group configuration. Override to customize the root group. |
| `autoTip` | `boolean` | `false` | Auto-generate tooltip with name and value for each option. |

---

## `rootConf` fields

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Root group ID |
| `name` | `string` | "Select all" option name |
| `tip` | `string` | "Select all" tooltip |
| `hide` | `boolean` | Hide the root group option |
| `checkType` | `'radio' \| 'checkbox'` | Selection type |

---

## Option groups

Add a `group` field to options to create collapsible group sections:

```json jaml-playground
{
  "type": "checkbox",
  "cap": "Permissions",
  "chooseAll": false,
  "data": [
    { "name": "Read",   "value": "read",   "group": "Data" },
    { "name": "Write",  "value": "write",  "group": "Data" },
    { "name": "Delete", "value": "delete", "group": "Data" },
    { "name": "Login",  "value": "login",  "group": "Auth" },
    { "name": "Logout", "value": "logout", "group": "Auth" }
  ],
  "valueKey": "permissions"
}
```

---

## Examples

### Radio with default value

```json jaml-playground
{
  "type": "radio",
  "cap": "Gender",
  "data": [
    { "name": "Male",   "value": "m" },
    { "name": "Female", "value": "f" },
    { "name": "Other",  "value": "x" }
  ],
  "defaultValue": "m",
  "valueKey": "gender"
}
```

### Checkbox with select-all

```json jaml-playground
{
  "type": "checkbox",
  "cap": "Work Days",
  "chooseAll": true,
  "data": [
    { "name": "Mon", "value": 1 },
    { "name": "Tue", "value": 2 },
    { "name": "Wed", "value": 3 },
    { "name": "Thu", "value": 4 },
    { "name": "Fri", "value": 5 }
  ],
  "defaultValue": [1, 2, 3, 4, 5],
  "valueKey": "workDays"
}
```

### Styled options with alignment

```json jaml-playground
{
  "type": "checkbox",
  "cap": "Tech Stack",
  "styles": ["checkbox.alignoption(width:10rem)", "checkbox.checkmark"],
  "data": [
    { "name": "TypeScript", "value": "ts" },
    { "name": "React",      "value": "react" },
    { "name": "Vue",        "value": "vue" },
    { "name": "Svelte",     "value": "svelte" }
  ],
  "valueKey": "techStack"
}
```

### Load options from a remote URL

```json jaml-playground
{
  "type": "radio",
  "cap": "Select User",
  "dataUrl": "/api/users",
  "valueKey": "userId"
}
```

Assuming `/api/users` returns:

```json
[
  { "name": "Alice Johnson", "value": 1 },
  { "name": "Bob Smith",     "value": 2 },
  { "name": "Carol Davis",   "value": 3 }
]
```

### Dynamic options with keyword filtering

```javascript jaml-playground
export default {
  type: 'container',
  vars: { search: '' },
  components: [
    {
      type: 'input',
      cap: 'Filter',
      valueKey: 'search',
      placeholder: 'Type to filter options...'
    },
    {
      type: 'checkbox',
      cap: 'Fruits',
      keyword: '{{search}}',
      data: [
        { name: 'Apple',     value: 'apple' },
        { name: 'Banana',    value: 'banana' },
        { name: 'Cherry',    value: 'cherry' },
        { name: 'Grape',     value: 'grape' },
        { name: 'Orange',    value: 'orange' },
        { name: 'Strawberry',value: 'strawberry' }
      ],
      valueKey: 'selectedFruits'
    }
  ]
}
```

---

## Notes

- Use `keyword` param to filter options by text match in real time.
- Option groups are built from the `group` field in data entries. Groups are collapsible in checkbox mode.
- The `type` key selects between `"radio"` (single select) and `"checkbox"` (multi-select).
