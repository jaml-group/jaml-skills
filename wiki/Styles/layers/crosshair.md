# layer.crosshair

<!-- Generated from native authoring; do not edit. -->

[中文](crosshair.zh.md)

`Styles.layer.crosshair` — crosshair locator overlay anchored to the host.

Displays a crosshair corner-bracket locator around the host element. Mouse entry and movement trigger its breathing behavior; leaving returns it to a steady state. The locator stays on the host rather than following cursor coordinates. For cursor-following decoration, use a [layer.follower](./follower.md) variant with `follow: true`.

---

## Args

<a id="entry-layer-crosshair"></a>

Crosshair

Use a host-anchored corner-bracket decoration that reacts to pointer activity without following pointer coordinates.

Creates a crosshair locator targeted at the host. Mouse entry and movement trigger breathing; mouse leave returns it to a steady state.

Use a host whose bounds should be outlined and load the framework locator styles.

The crosshair child removes its host mouse listeners on unmount.

Use hover.crosshair for a marker that moves between hovered targets, check.frame for selected options, or a layer.follower variant with follow true for pointer-following decoration.

It does not select the host, move application content or supply keyboard/focus behavior.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `number` | Not supplied | Size |
| `width` | `numberOrString` | `auto` | Border width |
| `bias` | `number` | `0` | Border distance |
| `glow` | `number` | `5` | Glow |
| `radius` | `numberOrString` | `auto` | Border radius<br>auto: fit the element automatically; a numeric value specifies the radius in px. |
| `delay` | `number` | `0` | Delay |
| `breathe` | `boolean` | `false` | Breathing |
| `container` | `any` | Not supplied | Container |
| `clipTarget` | `any` | Not supplied | Clipping target |
| `easing` | `string` | Not supplied | Animation easing |
| `duration` | `number` | Not supplied | Animation duration |

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layer.crosshair(glow:6;easing:bouncing;duration:400)'],
        components: [{ type: 'label', cap: 'Hover for breathing crosshair' }]
    },
    {
        type: 'container',
        styles: ['layer.crosshair(glow:0;width:2;radius:8)'],
        components: [{ type: 'label', cap: 'Sharp crosshair' }]
    }
];
```
