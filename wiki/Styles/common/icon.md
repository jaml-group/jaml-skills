# common.icon

`Styles.icon.*` -- icon customization using Font Awesome, emoji, or other icon sets.

---

## Variants

### `icon`

Customizes the icon appearance on an element with an icon slot.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Icon color | Uses shorthand; defaults to accent color |
| `strokeWidth` | `string` | Stroked outline width | Default: `0.0625rem` |
| `strokeColor` | `string` | Stroke outline color | Dynamic luminance-based |
| `size` | `string` | Icon size CSS value | e.g. `1.5rem` |

```json jaml-playground
[
    {
        "type": "label",
        "icon": "star",
        "cap": "Starred",
        "styles": ["icon(size:1.5rem;color:gold)"]
    }
]
```

### `emoji`

Renders the icon as an emoji character. Same args as `icon`.

### `light`

Thin icon style using Font Awesome Light (fal). Same args as `icon` but `strokeWidth` defaults to `0px`.

### `regular`

Regular icon style using Font Awesome Regular (far). Same args as `icon` but `strokeWidth` defaults to `0px`.

### `duotone`

Dual-tone icon style using Font Awesome Duotone (fad). Same args as `icon`, plus:

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color2` | `string` | Secondary color | Dynamic secondary color |

### `solid`

Solid icon style using Font Awesome Solid (fas). Same args as `icon`.

### `brand`

Brand icon style using Font Awesome Brand (fab). Same args as `icon`.

### `chars`

Renders icon text as plain characters instead of converting it to a Font Awesome class. Same args as `icon`.

### `withbg`

Icon with a background behind it.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `radius` | `string` | Background border radius | Default: `0.55em` |
| `bg` | `string` | Background CSS | Radial gradient with accent color |

### `withborder`

Icon with a border around it.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `radius` | `string` | Border radius | Default: `1em` |
| `borderWidth` | `string` | Border width | Default: `0.125rem` |
| `borderColor` | `string` | Border color | Default: `currentColor` |

### `bar`

Creates a shaped icon bar by inserting a `span.jam-icon-bar` into the icon slot.

### `dot`

Creates a shaped icon dot by inserting a `span.jam-icon-dot` into the icon slot.

### `square`

Creates a shaped square icon by inserting a `span.jam-icon-square` into the icon slot. The square is `0.875em` on each side and uses the theme's extra-small border radius. No args.

### `arrow`

Creates a shaped arrow icon. Numeric input value changes point it down for negative values and up otherwise. Other elements use their `state` to choose a direction.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `direction` | `string` | Initial arrow direction | Default: `up`; supports `up`, `down`, `left`, `right` |
| `stateDirections` | `object` | Map element states to directions | Default: `{ expanded: 'down', default: 'right' }`; unmatched states use `up` |
