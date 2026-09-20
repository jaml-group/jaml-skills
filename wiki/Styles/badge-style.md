# badge style variants

**Element:** `jam-badge` · **Type:** `element`

---

## CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--font-size` | `0.75em` | Base font size |
| `--outer-padding` | `0.5em` | Outer padding |
| `--inner-padding` | `0.25em` | Inner padding between cap and content |
| `--cross-padding` | `0em` | Cross-axis padding |
| `--shadowed` | `var(--jam-cta-text-shadow)` | Text shadow |
| `--carved` | `var(--jam-text-shadow-carved)` | Carved text shadow |

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `icon` | slotted | Icon content (left-most) |
| `cap` | slotted | Label text |
| `content` | slotted | Main content (default slot) |
| `extra` | slotted | Extra action area |

---

## Style variants

### `badge.vertical`
Vertical layout — stacks cap above content instead of side-by-side. No args.

```json jaml-playground
[
    {
        "type": "badge",
        "cap": "Status",
        "content": "Online",
        "styles": ["badge.vertical"]
    }
]
```

### `badge.ghost`
Ghost / transparent style with no background fill. No args.

```json jaml-playground
[
    {
        "type": "badge",
        "cap": "Beta",
        "content": "v1.2",
        "styles": ["badge.ghost"]
    }
]
```

### `badge.code`
Code / monospace typography style. No args.

```json jaml-playground
[
    {
        "type": "badge",
        "cap": "const",
        "content": "active = true",
        "styles": ["badge.code"]
    }
]
```

### `badge.stamp`
Stamp / seal style with a bordered appearance. No args.

```json jaml-playground
[
    {
        "type": "badge",
        "cap": "APPROVED",
        "content": "2025-01-15",
        "styles": ["badge.stamp"]
    }
]
```

### `badge.datetime`
Date-time display style. No args.

```json jaml-playground
[
    {
        "type": "badge",
        "cap": "Updated",
        "content": "2025-01-15 14:30",
        "styles": ["badge.datetime"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'badge',
  cap: 'Status',
  content: 'Active',
  styles: ['badge.ghost', 'badge.vertical']
}
```
