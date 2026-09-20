# card

**Class:** `CherryCard` · **Type:** `"card"` · **Extends:** `CoconutContainer`

A card component with a title section (icon + cap + extra) and a body (default) section. Suitable for content blocks, panels, and info cards. Inherits container behavior including child observation and stable-state detection.

---

## JAML usage

```json jaml-playground
{
  "type": "card",
  "cap": "User Summary",
  "icon": "👤",
  "components": [
    { "type": "indicator", "cap": "Name",  "value": "Alice"  },
    { "type": "indicator", "cap": "Role",  "value": "Admin"  },
    { "type": "indicator", "cap": "Score", "value": 98       }
  ]
}
```

---

## Params

Inherits all params from [CoconutContainer](./container.md) and [AbstractElement](./JAM-UI.md).

| Param | Type | Description |
|---|---|---|
| `cap` | `string` | Card title text. Fills the `cap` slot inside the `label` wrapper. |
| `icon` | `string` | Icon shown in the title row. |

---

## Slots

| Slot | Description |
|---|---|
| `label` | Wraps `icon` + `cap` + `extra` slots |
| `icon` | Icon in the title |
| `cap` | Title text |
| `extra` | Extra content in the title row (e.g. action buttons). Set `slot="extra"` on children to place them here. |
| default (body) | Card body content |

---

## Examples

### Info card with indicators

```json jaml-playground
{
  "type": "card",
  "cap": "Server Status",
  "icon": "🖥️",
  "components": [
    { "type": "indicator", "cap": "CPU",    "value": "45%",   "color": "green"  },
    { "type": "indicator", "cap": "Memory", "value": "72%",   "color": "orange" },
    { "type": "indicator", "cap": "Disk",   "value": "28%",   "color": "blue"   }
  ]
}
```

### Card with action button in title

```javascript jaml-playground
export default {
  type: 'card',
  cap: 'Data Panel',
  components: [
    {
      type: 'button-cta',
      cap: 'Refresh',
      slot: 'extra',
      onclick: function() {
        this.model.reload()
      }
    },
    { type: 'table', data: [] }
  ]
}
```

### No-title card (body only)

```json jaml-playground
{
  "type": "card",
  "components": [
    { "type": "chart", "cap": "Pie", "data": [] }
  ]
}
```

When title, icon, and cap content are all absent, the card collapses its title row and lets the body fill the card.

### Card with custom styles

```json jaml-playground
{
  "type": "card",
  "cap": "Styled Card",
  "icon": "🎨",
  "styles": ["css(max-width:400px;margin:1rem)", "shadow.m"],
  "components": [
    { "type": "element", "value": "Content inside a styled card" }
  ]
}
```

---

## Notes

- To place a child in the `extra` slot, set `slot: "extra"` on the child, or add the `jam-extra-btn` CSS class.
- `CherryCard` extends `CoconutContainer`, so it inherits `clear()`, `isStable`, and automatic child observation.
