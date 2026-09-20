# card style variants

**Element:** `jam-card` · **Type:** `container`

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `icon` | slotted | Icon content |
| `cap` | slotted | Title label text |
| `label` slot | slot | The `<slot name="label">` element |
| `body` slot | slot | The `<slot class="body">` default slot |

---

## Style variants

### `card.floating`
Floating card — movable, resizable, closable, zoomable, click-to-front panel. The card can be dragged by its label slot, resized from any edge, closed via the close button, and brought to front on click.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `top` | `string` | Initial top position (e.g. `'100px'`) | — |
| `left` | `string` | Initial left position (e.g. `'100px'`) | — |
| `bias` | `number` | Offset from the current front panel | Default: `30` |
| `width` | `string` | Card width (e.g. `'300px'`) | — |
| `height` | `string` | Card height (e.g. `'200px'`) | — |
| `minWidth` | `string` | Minimum width | Default: `200` |
| `maxWidth` | `string` | Maximum width | — |
| `minHeight` | `string` | Minimum height | Default: `200` |
| `maxHeight` | `string` | Maximum height | — |
| `size` | `string` | Shorthand — sets both width and height to the same value | — |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Floating Panel",
        "styles": ["card.floating(width:300px;height:200px)"],
        "components": [
            { "type": "label", "cap": "Drag by the title bar" },
            { "type": "label", "cap": "Resize from edges" }
        ]
    },
    {
        "type": "card",
        "cap": "Centered Float",
        "styles": ["card.floating(top:10%;left:50%;width:400px;height:150px)"],
        "components": [
            { "type": "label", "cap": "Positioned card" }
        ]
    }
]
```

### `card.modal`

Managed modal card — movable, resizable, closable, zoomable, and inserted at the front of its parent's modal stack. It accepts the same `top`, `left`, `bias`, and size arguments as `card.floating`. Only the frontmost managed modal has enabled extra controls; trying a disabled control shakes the current front modal.

```json jaml-playground
{
    "type": "card",
    "cap": "Modal Panel",
    "styles": ["card.modal(width:24rem;height:14rem;bias:24)"],
    "components": [
        { "type": "label", "cap": "Managed modal content" }
    ]
}
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'card',
  cap: 'Floating Panel',
  styles: ['card.floating(width:300px;height:200px)'],
  components: [
    { type: 'label', cap: 'Content here' }
  ]
}
```
