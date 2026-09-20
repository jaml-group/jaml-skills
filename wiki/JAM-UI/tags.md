# tags

**Class:** `ToughpearTags` · **Type:** `"tags"` · **Extends:** `AbstractOptionElement`

A tag list that renders each selected option as a visual tag/chip. Supports adding, removing, clearing, and maintaining insertion order. The value is an array of tag values.

---

## JAML usage

```json jaml-playground
{
  "type": "tags",
  "cap": "Selected Items",
  "data": [
    { "name": "TypeScript", "value": "ts",    "color": "blue"   },
    { "name": "React",      "value": "react", "color": "cyan"   },
    { "name": "Node.js",    "value": "node",  "color": "green"  }
  ],
  "removable": true
}
```

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `removable` | `boolean` | `false` | Show a close/remove button on each tag. Also sets `clearable: true`. |
| `addable` | `boolean` | `false` | Show an add button (`+`). Requires `onaddclick` handler. Set automatically when `onaddclick` is assigned. |
| `showCount` | `boolean` | `true` | Show the tag count badge on the purge-all button. |
| `placeholder` | `string` | `'没有任何内容'` | Empty state message shown when no tags exist. |
| `keepOrder` | `boolean` | `false` | Maintain insertion order when updating tags. When `false`, new tags are appended. |
| `updateViaValue` | `boolean` | `false` | Re-render tags based on the `value` array instead of `data`. Useful when the value is driven by another element. |
| `onaddclick` | `(e) => void` | — | Hook fired when the add button is clicked. Setting this also sets `addable: true`. |
| `ontagremove` | `(data) => void` | — | Hook fired when a tag is removed. Receives the removed option's data. Setting this also sets `removable: true`. |

---

## Slots

| Slot | Description |
|---|---|
| `label` | Label area via `Templates.label` (icon + cap). |
| `tag` (default) | Tag content area. Individual tags are rendered as `<jam-label stylize="tag">` elements within this slot. |

---

## Events

| Event | Detail | Description |
|---|---|---|
| `tagremove` | `{ data: OptionData }` | Fired when a tag is removed. Detail includes the removed option's data. |
| `valuechange` | `{ value, oldValue }` | Inherited from `AbstractInputElement`. Fired when the tag value array changes. |

---

## Examples

### Basic removable tags

```json jaml-playground
{
  "type": "tags",
  "cap": "Languages",
  "removable": true,
  "data": [
    { "name": "JavaScript", "value": "js",  "color": "yellow" },
    { "name": "Python",     "value": "py",  "color": "blue"   },
    { "name": "Rust",       "value": "rs",  "color": "orange" }
  ]
}
```

### Addable tags with prompt

```javascript jaml-playground
export default {
  type: 'tags',
  cap: 'Labels',
  removable: true,
  data: [],
  onaddclick: function(e) {
    const name = prompt('New tag name:')
    if (name) {
      this.data = [...this.data, { name, value: name.toLowerCase() }]
    }
  },
  ontagremove: function(data) {
    console.log('Removed:', data.name)
  }
}
```

### Value-driven tags (synced with another element)

```json jaml-playground
{
  "type": "tags",
  "cap": "Your Selections",
  "updateViaValue": true,
  "valueWatcher": "targetChecked",
  "dataWatcher": "targetChecked-data"
}
```

### Tags with purge-all button visible

```json jaml-playground
{
  "type": "tags",
  "cap": "Applied Filters",
  "removable": true,
  "showCount": true,
  "keepOrder": true,
  "data": [
    { "name": "Active",       "value": "active", "color": "green" },
    { "name": "Premium",      "value": "premium", "color": "gold" },
    { "name": "Beta Tester",  "value": "beta", "color": "purple" }
  ]
}
```

### Empty state with custom placeholder

```json jaml-playground
{
  "type": "tags",
  "cap": "Tags",
  "data": [],
  "placeholder": "No tags assigned yet",
  "addable": true,
  "onaddclick": "console.log('add clicked')"
}
```

---

## Instance methods

| Method | Returns | Description |
|---|---|---|
| `tags.getCheckedValue()` | `any[]` | Returns `this.value` — the array of currently selected tag values |
| `tags.getCheckedOptions()` | `ElementOption[]` | Returns the full option objects for currently checked (selected) tags |
| `tags.getCheckedDoms()` | `HTMLElement[]` | Returns the DOM elements of currently checked (selected) tags |

---

## Notes

- Each tag is rendered using `<jam-label stylize="tag">` with `icon`, `value`, `name`, and `color` from the option data.
- The `purgeButt` button (clear-all, shown at top-right) contains a `count` span that displays the current tag count.
- Tags animate in and out: they fade in with a staggered delay (30ms per tag) and slide out with a CSS transition on removal.
- Setting `removable: true` also sets `clearable: true`, enabling `el.clear()` to remove all tags.
- When `updateViaValue` is `true`, tags are rendered from `this.value` filtering the available options, rather than from `this.data` directly.
