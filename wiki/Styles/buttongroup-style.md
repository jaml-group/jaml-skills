# buttongroup style variants

**Element:** `jam-buttongroup` · **Type:** `element`

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `option` | slotted | Individual button options (`.jam-option`) |

---

## Style variants

### `buttongroup.tilted`
Tilted / navigation tab style — buttons have angled edges. No args.

```json jaml-playground
[
    {
        "type": "buttongroup-radio",
        "cap": "Tabs",
        "styles": ["buttongroup.tilted"],
        "data": [
            { "name": "Tab 1", "value": "tab1" },
            { "name": "Tab 2", "value": "tab2" },
            { "name": "Tab 3", "value": "tab3" }
        ]
    }
]
```

### `buttongroup.equalwidth`
Equal-width buttons — each option takes the same amount of space.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `width` | `string` | Minimum button width | Default: `'6.25rem'` |

```json jaml-playground
[
    {
        "type": "buttongroup-radio",
        "cap": "Equal",
        "styles": ["buttongroup.equalwidth(width:8rem)"],
        "data": [
            { "name": "Small", "value": "small" },
            { "name": "Medium", "value": "medium" },
            { "name": "Large", "value": "large" }
        ]
    }
]
```

### `buttongroup.vertical`
Vertical layout — stacks buttons top-to-bottom. No args.

```json jaml-playground
[
    {
        "type": "buttongroup-radio",
        "cap": "Vertical",
        "styles": ["buttongroup.vertical"],
        "data": [
            { "name": "Option A", "value": "a" },
            { "name": "Option B", "value": "b" }
        ]
    }
]
```

### `buttongroup.stripy`
Zebra striping — alternating row background colors for readability. No args.

```json jaml-playground
[
    {
        "type": "buttongroup-radio",
        "cap": "Stripy",
        "styles": ["buttongroup.stripy"],
        "data": [
            { "name": "Item 1", "value": "1" },
            { "name": "Item 2", "value": "2" },
            { "name": "Item 3", "value": "3" }
        ]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'buttongroup-radio',
  cap: 'Tabs',
  styles: ['buttongroup.tilted', 'buttongroup.equalwidth'],
  data: [
    { name: 'Tab 1', value: 'tab1' },
    { name: 'Tab 2', value: 'tab2' }
  ]
}
```
