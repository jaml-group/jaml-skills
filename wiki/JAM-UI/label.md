# label

**Class:** `LeekLabel` · **Type:** `"label"` · **Extends:** `AbstractElement`

A text label element with optional icon. Commonly used as a static display or heading inside containers. Supports three visual subtypes: plain label, tag/badge, and outline.

---

## JAML usage

```json jaml-playground
{
  "type": "label",
  "cap": "Status",
  "icon": "📋"
}
```

---

## Params

Inherits all params from [AbstractElement](./JAM-UI.md).

| Param | Type | Default | Description |
|---|---|---|---|
| `cap` | `string` | — | Label text. Fills the `cap` slot. |
| `icon` | `string` | — | Icon content. Fills the `icon` slot. |

The visual specialization is selected with a composite type:

| Composite type | Specialization | Description |
|---|---|---|
| `"label"` | `'label'` | Default text label (no border) |
| `"label-tag"` | `'tag'` | Tag/badge style with background |
| `"label-outline"` | `'outline'` | Outline border style |

---

## Slots

| Slot | Description |
|---|---|
| `icon` | Icon content (left of cap) |
| `cap` (default) | Label text |

---

## Examples

### Simple text label

```json jaml-playground
{
  "type": "label",
  "cap": "Total Revenue"
}
```

### Label with icon

```json jaml-playground
{
  "type": "label",
  "icon": "📊",
  "cap": "Monthly Report"
}
```

### Icon-only label

```json jaml-playground
{
  "type": "label",
  "icon": "✓",
  "color": "green"
}
```

### Reactive label with state-driven color

```javascript jaml-playground
export default {
  type: 'container',
  vars: { status: 'idle' },
  components: [
    {
      type: 'label',
      cap: '{{status}}',
      states: {
        idle:    { color: 'gray'  },
        running: { color: 'blue'  },
        done:    { color: 'green' },
        error:   { color: 'red'   }
      },
      stateWatcher: 'status'
    }
  ]
}
```

### Tag and outline subtypes

```json jaml-playground
{
  "type": "wrapper",
  "styles": ["wrapper.buttonwrapper"],
  "components": [
    { "type": "label-tag", "cap": "New", "color": "blue" },
    { "type": "label-tag", "cap": "Deprecated", "color": "orange" },
    { "type": "label-outline", "cap": "View Details" }
  ]
}
```

### Using the subtypes inside a table or list

```json jaml-playground
{
  "type": "container",
  "components": [
    { "type": "label-tag", "cap": "Admin", "color": "purple", "icon": "👤" },
    { "type": "label-tag", "cap": "Active", "color": "green" },
    { "type": "label-outline", "cap": "Edit Profile", "icon": "✏️" }
  ]
}
```
