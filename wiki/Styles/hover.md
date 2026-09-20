# hover

`Styles.hover.*` — hover-triggered visual effects applied to any element.

---

## Variants

### `hover.frame`
Shows a frame locator around the element on mouseenter. The locator matches the target's border-radius and can glow, breathe, or animate with custom easing.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number` | Locator corner size in px | — |
| `width` | `number \| string` | Border width in px | Default: `'auto'` (matches target's border-width) |
| `bias` | `number` | Offset inward from the target edge in px | Default: `0` |
| `glow` | `number` | Glow blur radius in px | Default: `5`. Set to `0` to disable |
| `radius` | `number \| string` | Border radius | Default: `'auto'` (matches target's radius). Pass a number for px |
| `delay` | `number` | Delay before showing in ms | Default: `0` |
| `breathe` | `boolean` | Enable breathing pulse animation | Default: `false` |
| `container` | `Element` | Container to append the locator into | — |
| `clipTarget` | `Element` | Element to clip the locator against | — |
| `easing` | `string` | CSS easing for transitions | Options: `linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `bouncing`, `smooth`, `crisp` |
| `duration` | `number` | Transition duration in ms | — |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(padding:1rem)", "hover.frame(glow:10;breathe:true;easing:bouncing)"],
        "components": [{ "type": "label", "cap": "Hover for frame" }]
    },
    {
        "type": "wrapper",
        "styles": ["css(padding:1rem)", "hover.frame(glow:0;width:3;radius:12)"],
        "components": [{ "type": "label", "cap": "Sharp frame, no glow" }]
    }
]
```

### `hover.shade`
Shows a shaded locator behind the element on mouseenter. Same args as `frame`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(padding:1rem)", "hover.shade(glow:8)"],
        "components": [{ "type": "label", "cap": "Hover for shade" }]
    }
]
```

### `hover.crosshair`
Shows a crosshair corner-bracket locator on mouseenter. Same args as `frame` with `breathe` default `true`, `easing` default `'ease-in-out'`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(padding:1rem)", "hover.crosshair(glow:6;duration:300)"],
        "components": [{ "type": "label", "cap": "Hover for crosshair" }]
    }
]
```

### `hover.parallax`
3D parallax tilt effect on mouse move. Add `pp-depth` attributes to children to control depth layers.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `intensity` | `number` | Tilt intensity multiplier | Default: `3` |
| `maxDepth` | `number` | Accepted configuration field | Default: `3`; the current engine derives depth from the tree and does not enforce this as a cap |
| `inward` | `boolean` | Tilt inward instead of outward | Default: `false` |
| `pan` | `boolean` | Use translation instead of rotation | Default: `false` |
| `startAngles` | `array` | Initial rotation angles `[x, y]` in degrees | — |

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Tilt me",
        "styles": ["hover.parallax(intensity:5;maxDepth:5)", "css(padding:2rem)"]
    },
    {
        "type": "card",
        "cap": "Inward tilt",
        "styles": ["hover.parallax(inward:true;pan:true)", "css(padding:2rem)"]
    }
]
```

### `hover.dynamicbg`
Shows an animated dynamic background on hover. No args.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(padding:1rem)", "hover.dynamicbg"],
        "components": [{ "type": "label", "cap": "Hover for animated bg" }]
    }
]
```

### `hover.withbg`
Shows a solid background on hover. No args.

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["css(padding:1rem)", "hover.withbg"],
        "components": [{ "type": "label", "cap": "Hover for bg" }]
    }
]
```

### `hover.highlightcap`
Highlights the `cap` slot text on hover by inserting a background layer behind it. Does not apply to `BananaButton` elements. No args.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Hover to highlight me",
        "styles": ["hover.highlightcap", "css(padding:0.5rem)"]
    }
]
```

### `hover.brighter`
Brightness and saturation boost on hover.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `b` | `number` | Brightness multiplier | Default: `1.04` |
| `s` | `number` | Saturation multiplier | Default: `1.1` |

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Brighten on hover",
        "styles": ["hover.brighter(b:1.15;s:1.3)"]
    },
    {
        "type": "button",
        "cap": "Subtle brighten",
        "styles": ["hover.brighter"]
    }
]
```

### `hover.toShowAll`
Shows a floating label clone of truncated text on hover. Useful for table cells or labels with `overflow: hidden` / `text-overflow: ellipsis`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `selector` | `string` | CSS selector to target specific overflowing children | Defaults to the element itself |
| `align` | `string` | Where the floating label appears | Default: `'center'`. Options: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `top`, `bottom`, `left`, `center`, `right` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "This is a very long text that will be truncated due to overflow hidden style",
        "styles": ["hover.toShowAll(align:top)", "css(width:10rem;overflow:hidden;textOverflow:ellipsis;whiteSpace:nowrap)"]
    }
]
```

### `hover.bouncing`
Bounce animation on hover. No args.

```json jaml-playground
[
    {
        "type": "button",
        "cap": "Bounce on hover",
        "styles": ["hover.bouncing"]
    }
]
```

---

## Combo example

Combine `hover.parallax` with `interact.movable` for an interactive card:

```json jaml-playground
[
    {
        "type": "card",
        "styles": [
            "props(width:30rem)",
            "interact.movable",
            "hover.parallax"
        ],
        "components": [
            {
                "type": "indicator",
                "cap": "Movable parallax card",
                "styles": ["indicator.tips", "auto.badge"]
            }
        ]
    }
]
```
