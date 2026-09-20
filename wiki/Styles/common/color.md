# common.color

`Styles.color.*` — semantic foreground colors and HSL color adjustments.

---

## Variants

### `color`

Adjusts an element's color via hue shift, saturation, lightness, and alpha multipliers.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `h` | `number\|string` | Hue shift in degrees | — |
| `s` | `number\|string` | Saturation multiplier | e.g. `1.2` |
| `l` | `number\|string` | Lightness multiplier | e.g. `1.1` |
| `a` | `number\|string` | Alpha multiplier | e.g. `0.8` |
| `color` | `string` | Direct CSS color value | Shorthand; maps to CSS `color` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Tinted",
        "styles": ["color(h:30;s:1.2;l:1.1)"]
    }
]
```

### Semantic foreground presets

These no-argument paths set `color` from the active theme rather than binding the element to a literal color.

| Path | Color token | Description |
|---|---|---|
| `color.default` | `--jam-color-fg-default` | Default foreground |
| `color.strong` | `--jam-color-fg-strong` | Strong foreground |
| `color.subtle` | `--jam-color-fg-subtle` | Subtle foreground |
| `color.muted` | `--jam-color-fg-muted` | Muted foreground |
| `color.faint` | `--jam-color-fg-faint` | Faint foreground |
| `color.primary` | `--jam-color-fg-primary` | Primary semantic foreground |
| `color.secondary` | `--jam-color-fg-secondary` | Secondary semantic foreground |
| `color.tertiary` | `--jam-color-fg-tertiary` | Tertiary semantic foreground |
| `color.quaternary` | `--jam-color-fg-quaternary` | Quaternary semantic foreground |

`color.primary`, `color.secondary`, `color.tertiary`, and `color.quaternary` also add the `.jam-colored` marker so parent role recipes do not overwrite the explicit semantic foreground.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Theme-aware emphasis",
        "styles": ["color.strong"]
    }
]
```

### Contrast foreground presets

The `color.on.*` namespace supplies foregrounds designed for the matching colored background. These are distinct from `color.primary|secondary|tertiary|quaternary`, which use the `fg.*` family on ordinary surfaces. `color.on` itself is a namespace and is not callable.

| Path | Color token | Intended background |
|---|---|---|
| `color.on.primary` | `--jam-color-on-primary` | `background.primary` |
| `color.on.secondary` | `--jam-color-on-secondary` | `background.secondary` |
| `color.on.tertiary` | `--jam-color-on-tertiary` | `background.tertiary` |
| `color.on.quaternary` | `--jam-color-on-quaternary` | `background.quaternary` |

These dotted names are native style paths. Inside compact CSS, use the corresponding undotted values: `css(color:onprimary)`, `css(color:onsecondary)`, `css(color:ontertiary)`, and `css(color:onquaternary)`.

```json jaml-playground
[
    {
        "type": "card",
        "styles": ["background.primary", "color.on.primary"],
        "components": [{ "type": "label", "cap": "On primary" }]
    }
]
```

### `accent`

Sets the accent color on an element (supports AbstractElement color system).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Accent color value | Shorthand |
| `h` | `number` | Hue for random color generation | — |
| `s` | `number` | Saturation for random color gen | — |
| `l` | `number` | Lightness for random color gen | — |
| `temp` | `string` | Color temperature | `warm`, `cool` |
| `bias` | `number` | Color bias | — |
| `seq` | `boolean` | Sequential color mode | Default: `false` |

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Accented",
        "styles": ["color.accent(color:#ff6600)"]
    }
]
```

### `syncWithMap`

Synchronizes the element's accent color with its map region. After the nearest parent `jam-map` finishes drawing, the style matches the element's `jam-coord` attribute to a region name and applies that region's `itemStyle.areaColor` at full opacity. The accent override is removed when the style is unplugged. No args.

### `valueMap`

Maps input values to colors on a scale.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `valueRange` | `array` | Input value range | Default: `[0, 100]` |
| `colorRange` | `array` | Color scale range | Default: `['red', 'green']` |
| `mode` | `string` | Color interpolation mode | `rgb`, `lch`, `hsl`, `lab`, `lrgb` (default: `lch`) |

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Mapped",
        "styles": ["color.valueMap(valueRange:[0,100];colorRange:[red,green];mode:lch)"]
    }
]
```

### `stateMap`

Maps element state to accent colors.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `colors` | `dictionary` | State-to-color mapping | Shorthand; e.g. `{ active: 'red', inactive: 'gray' }` |
| `harmony` | `boolean` | Apply harmony adjustments | Default: `true` |

```json jaml-playground
{
    "type": "indicator",
    "cap": "Score",
    "value": 72,
    "valueStates": {
        "pass": "value >= 60",
        "failed": "value < 60"
    },
    "styles": [
        "color.stateMap({colors:{pass:'green',failed:'red'}})"
    ]
}
```

`valueStates` derives `pass` or `failed`; `color.stateMap` listens for that state and applies the corresponding accent color. Define every reachable state in the color map so an unmapped state does not retain the previous accent.
