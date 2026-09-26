# hover

`Styles.hover.*` — hover-triggered visual effects applied to any element.

---

## Variants

### `hover.frame`

Shows a frame locator around the element on mouseenter. The locator matches the target's border-radius and can glow, breathe, or animate with custom easing.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style hover.frame`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style hover.parallax`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style hover.brighter`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style hover.toShowAll`.

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
