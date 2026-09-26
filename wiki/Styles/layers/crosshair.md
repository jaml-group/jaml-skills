# layer.crosshair

`Styles.layer.crosshair` — crosshair locator overlay anchored to the host.

Displays a crosshair corner-bracket locator around the host element. Mouse entry and movement trigger its breathing behavior; leaving returns it to a steady state. The locator stays on the host rather than following cursor coordinates. For cursor-following decoration, use a [layer.follower](./follower.md) variant with `follow: true`.

---

## Args

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.crosshair`.

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layer.crosshair(glow:6;easing:bouncing;duration:400)"],
        "components": [
            { "type": "label", "cap": "Hover for breathing crosshair" }
        ]
    },
    {
        "type": "container",
        "styles": ["layer.crosshair(glow:0;width:2;radius:8)"],
        "components": [
            { "type": "label", "cap": "Sharp crosshair" }
        ]
    }
]
```
