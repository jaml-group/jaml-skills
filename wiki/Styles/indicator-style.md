# indicator style variants

**Element:** `jam-indicator` · **Type:** `element`

---

## Slots

| Slot    | Type    | Description             |
| ------- | ------- | ----------------------- |
| `icon`  | slotted | Icon content            |
| `cap`   | slotted | Label text              |
| `value` | slotted | Value display (default) |
| `unit`  | slotted | Unit label              |

---

## Style variants

### `indicator.bigicon`

Large icon display — increases the icon size.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style indicator.bigicon`.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Revenue",
        "value": 42000,
        "icon": "💰",
        "styles": ["indicator.bigicon(size:3)"]
    },
    {
        "type": "indicator",
        "cap": "Users",
        "value": "1.2k",
        "icon": "👤",
        "styles": ["indicator.bigicon(size:2)"]
    }
]
```

### `indicator.tips`

Tooltip-style display — minimal presentation suitable for overlay hints. No args.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Info",
        "value": "New update available",
        "styles": ["indicator.tips"]
    }
]
```

### `indicator.tweening`

Animated number transitions — smoothly animates the value from its old to new state with per-digit or overall easing.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style indicator.tweening`.

Overall duration takes priority over per-digit timing.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Score",
        "value": 12345,
        "styles": ["indicator.tweening(easing:easeOut;duration:800)"]
    },
    {
        "type": "indicator",
        "cap": "Counter",
        "value": 9876,
        "styles": ["indicator.tweening(perdigit:true;digitduration:100)"]
    }
]
```

### `indicator.tweening.dial`

Dial-wheel digit animation — each digit is rendered on a spinning wheel that rolls to the target value.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style indicator.tweening.dial`.

Overall duration takes priority over per-digit timing. `maskImage` is an alternative to `masklength`.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Count",
        "value": 1337,
        "styles": ["indicator.tweening.dial(height:2;width:1.2;background:#333;borderRadius:0.2;margin:0.1)"]
    },
    {
        "type": "indicator",
        "cap": "Price",
        "value": 4999,
        "styles": ["indicator.tweening.dial(hideLeading0:false;digitduration:200)"]
    }
]
```

### `indicator.clock`

Analog or digital clock display rendered inside the indicator. Supports toggling between modes, showing labels, date, and continuous second hand.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style indicator.clock`.

```json jaml-playground
[
    {
        "type": "indicator",
        "value": 1700000000000,
        "styles": ["indicator.clock(type:analog;labelall:true;showdate:true)"]
    },
    {
        "type": "indicator",
        "value": 1700000000000,
        "styles": ["indicator.clock(type:digital;square:true)"]
    }
]
```

### `indicator.inline`

Inline grid layout — arranges icon, cap, value, and unit in a single row with automatic grid columns. No args.

Related layout trait variants:

| Variant                  | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `indicator.vertical`     | Stack indicator slots vertically                                             |
| `indicator.valueTop`     | Place the value before the cap/content flow                                  |
| `indicator.unitTop`      | Place the unit on the top row and span the value across both content columns |
| `indicator.trailingIcon` | Place the icon after the cap/value text                                      |
| `indicator.lefted`       | Left-align indicator content                                                 |
| `indicator.useArea`      | Opt into named grid areas for the icon, cap, value, unit, and extra slots    |
| `indicator.useLabel`     | Display the combined label slot and lay out its icon/caption together        |

```json jaml-playground
[
    {
        "type": "indicator",
        "icon": "⚡",
        "cap": "Status:",
        "value": "Connected",
        "styles": ["indicator.inline"]
    },
    {
        "type": "indicator",
        "icon": "arrow-right",
        "cap": "Next step",
        "value": "Profile",
        "styles": ["indicator.trailingIcon", "indicator.lefted"]
    }
]
```

### `indicator.unitTop`

Places the unit on the top row beside the caption and lets the value span the two content columns below. No args.

### `indicator.useArea`

Opts into the named grid-area layout `'i c c e' / '_ v u e'`, mapping the icon, cap, value, unit, and extra slots to `i`, `c`, `v`, `u`, and `e`. Use it when descendant styles need those area names; the default indicator layout uses numeric grid placement. No args.

### `indicator.useLabel`

Displays the indicator's combined label slot as an inline flex group spanning the caption columns. The icon and caption then flow inside that group instead of occupying independent grid areas. No args.

### `indicator.centered`

Centered content layout — aligns all content to the center of the indicator. No args.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Total",
        "value": "100%",
        "styles": ["indicator.centered"]
    }
]
```

### `indicator.datetime`

Date/time display with custom formatting pattern. Renders the value using the given HTML template.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style indicator.datetime`.

```json jaml-playground
[
    {
        "type": "indicator",
        "cap": "Updated",
        "value": 1700000000000,
        "styles": ["indicator.datetime(pattern:<p>yyyy/MM/dd</p><p>HH:mm</p>)"]
    },
    {
        "type": "indicator",
        "cap": "Event",
        "value": 1700000000000,
        "styles": ["indicator.datetime"]
    }
]
```

### `indicator.jaml`

JAML logo mark — displays the JAML branding mark. No args.

```json jaml-playground
[
    {
        "type": "indicator",
        "styles": ["indicator.jaml"]
    }
]
```

### `indicator.jamui`

JAM-UI logo mark — displays the JAM-UI branding mark. No args.

```json jaml-playground
[
    {
        "type": "indicator",
        "styles": ["indicator.jamui"]
    }
]
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'indicator',
  cap: 'Score',
  value: 12345,
  styles: ['indicator.tweening(easing:easeOut;duration:800)']
}
```
