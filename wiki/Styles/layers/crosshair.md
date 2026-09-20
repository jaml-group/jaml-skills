# layer.crosshair

`Styles.layer.crosshair` — mouse-following crosshair locator overlay.

Displays a crosshair corner-bracket locator that follows the mouse cursor over the element.

---

## Args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `size` | `number` | Locator corner size in px | — |
| `width` | `number \| string` | Border width in px | Default: `'auto'` (matches target's border-width) |
| `bias` | `number` | Offset inward from the target edge in px | Default: `0` |
| `glow` | `number` | Glow blur radius in px | Default: `5`. Set to `0` to disable |
| `radius` | `number \| string` | Border radius | Default: `'auto'` (matches target's radius) |
| `delay` | `number` | Delay before showing in ms | Default: `0` |
| `breathe` | `boolean` | Enable breathing pulse animation | Default: `false` |
| `container` | `Element` | Container to append the locator into | — |
| `clipTarget` | `Element` | Element to clip the locator against | — |
| `easing` | `string` | CSS easing for transitions | Options: `'linear'`, `'ease'`, `'ease-in'`, `'ease-out'`, `'ease-in-out'`, `'bouncing'`, `'smooth'`, `'crisp'` |
| `duration` | `number` | Transition duration in ms | — |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["layer.crosshair(glow:6;easing:bouncing;duration:400)"],
        "components": [
            { "type": "label", "cap": "Move mouse here" }
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
