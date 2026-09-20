# label style variants

**Element:** `jam-label` · **Type:** `element`

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `icon` | slotted | Icon content |
| `cap` | slotted | Label text (default slot) |

---

## Style variants

### `label.atTop`
Top-aligned label — positions the cap text above the content instead of inline. No args.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Compact",
        "styles": ["label.atTop"],
        "components": [
            { "type": "label", "cap": "Content below" }
        ]
    },
    {
        "type": "label",
        "cap": "Field Name",
        "styles": ["label.atTop"],
        "components": [
            { "type": "input", "value": "Field value" }
        ]
    }
]
```

### `label.trailingIcon`
Places the icon after the cap text instead of before it. No args.

```json jaml-playground
[
    {
        "type": "label",
        "icon": "arrow-right",
        "cap": "Next",
        "styles": ["label.trailingIcon"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'wrapper',
  components: [
    { type: 'label', cap: 'Compact', styles: ['label.atTop'] },
    { type: 'label', icon: 'arrow-right', cap: 'With icon', styles: ['label.trailingIcon'] }
  ]
}
```
