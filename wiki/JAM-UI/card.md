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
        { "type": "indicator", "cap": "Name", "value": "Alice" },
        { "type": "indicator", "cap": "Role", "value": "Admin" },
        { "type": "indicator", "cap": "Score", "value": 98 }
    ]
}
```

---

## Params

Inherits all params from [CoconutContainer](./container.md) and [AbstractElement](./JAM-UI.md).

| Param  | Type     | Description                                                       |
| ------ | -------- | ----------------------------------------------------------------- |
| `cap`  | `string` | Card title text. Fills the `cap` slot inside the `label` wrapper. |
| `icon` | `string` | Icon shown in the title row.                                      |

---

## Slots

| Slot           | Description                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------------------- |
| `label`        | Wraps `icon` + `cap` + `extra` slots                                                                     |
| `icon`         | Icon in the title                                                                                        |
| `cap`          | Title text                                                                                               |
| `extra`        | Extra content in the title row (e.g. action buttons). Set `slot="extra"` on children to place them here. |
| default (body) | Card body content                                                                                        |

---

For a dismissible card, use [`interact.closable`](../Styles/interact.md#entry-interact-closable) for the native extra close control; supply its callback when close must change application state or request confirmation. Modal mounting, dismissal and focus requirements belong to the [modal owner](../utils.md#jamrendermodalcontainer-option-config). See [document composition](../JAML/purpose-and-composition.md#one-document-reuses-button-and-card-parts) for these parts together.

## Examples

### Info card with indicators

```json jaml-playground
{
    "type": "card",
    "cap": "Server Status",
    "icon": "🖥️",
    "components": [
        { "type": "indicator", "cap": "CPU", "value": "45%", "color": "hsl(120 100% 25%)" },
        { "type": "indicator", "cap": "Memory", "value": "72%", "color": "hsl(39 100% 50%)" },
        { "type": "indicator", "cap": "Disk", "value": "28%", "color": "hsl(240 100% 50%)" }
    ]
}
```

### Card with action button in title

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Data Panel',
    vars: { refreshCount: 0 },
    components: [
        {
            type: 'button-cta',
            cap: 'Refresh',
            slot: 'extra',
            onclick: function () {
                this.model.vars.refreshCount++;
            }
        },
        { type: 'indicator', cap: 'Refresh count', value: '{{refreshCount}}' }
    ]
};
```

### No-title card (body only)

```json jaml-playground
{
    "type": "card",
    "components": [{ "type": "label", "cap": "Body content without a card title" }]
}
```

When title, icon, and cap content are all absent, the card collapses its title row and lets the body fill the card.

### Card with custom styles

```json jaml-playground
{
    "type": "card",
    "cap": "Styled Card",
    "icon": "🎨",
    "styles": ["css(max-width:25rem;margin:1rem)", "shadow.m"],
    "components": [{ "type": "element", "value": "Content inside a styled card" }]
}
```

---

## Notes

-   To place a child in the `extra` slot, set `slot: "extra"` on the child, or add the `jam-extra-btn` CSS class.
-   `CherryCard` extends `CoconutContainer`, so it inherits `clear()`, `isStable`, and automatic child observation.
