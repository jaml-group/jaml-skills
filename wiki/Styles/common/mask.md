# common.mask

<!-- Generated from native authoring; do not edit. -->

[中文](mask.zh.md)

`Styles.mask.*` -- CSS mask-image properties.

---

## Scroll edge fades

<a id="entry-mask-overflow"></a>

Overflow edge fade

Measures the styled element and masks only physical edges with remaining content. Defaults to a 1.5rem fade and listenScroll:true. listenScroll:false retains initial, resize and light-DOM content measurements without subscribing to scroll events. Replaces text-overflow ellipsis with clip; does not change overflow or wrapping.

Shares target observers and at most one scroll listener with other watchers. Unmount releases this subscription; unplug also removes the mask styles. Remaining consumers stay active. Scroll listening ends when no subscriber requests it.

Apply to the actual clipped text box or scrolling viewport. The target must have bounded dimensions and authored clipping/scrolling. It owns its watcher subscription; no separate interact.scrollWatcher is needed. Each target resets its own mask edge variables.

Masks the entire target, potentially including native scrollbars. With listenScroll:false, scroll-only changes are not observed. Apply as a runtime style to the actual element; it is not exposed through child, shadow slot or agent style menus. Does not expose a public callback API.

Positional order: `size` → `listenScroll`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `numberOrString` | `1.5` | Fade length; numbers use rem<br>Unit: `rem`<br>Shorthand |
| `listenScroll` | `boolean` | `true` | Listen to native scroll events |

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(display:block;width:20rem;max-width:100%;height:12rem;overflow:auto;padding:0)', 'mask.overflow'],
    components: [
        {
            type: 'container',
            styles: ['css(display:flex;flex-direction:column;width:32rem;gap:1rem;padding:1.5rem)'],
            components: Array.from({ length: 12 }, (_, index) => ({ type: 'label', cap: `Scroll to discover item ${index + 1}` }))
        }
    ]
};
```

Use `mask.overflow(size:1.5rem)` on a scrolling viewport, or `mask.overflow(size:1.5rem;listenScroll:false)` on bounded clipped text. The shorthand measures its own target, replaces ellipsis with clipping, resets all four edge variables, and owns a shared watcher subscription. It preserves authored overflow, wrapping and dimensions. Scroll listening defaults to true; disabling it retains initial and layout/content updates. Do not also add a watcher unless another consumer requires it.

For a custom mask recipe, apply the mask to the actual scrolling viewport and publish its own state with `interact.scrollWatcher`, or `event.scrollProgress({ updateAttr: true })` when progress events are needed. Use [overflow direction styles](./overflow.md) to set each edge fade width only while content remains beyond that edge. No extra scroll handler or JavaScript mask-position synchronization is needed.

For four directions, combine horizontal and vertical gradients with `mask-composite: intersect`. Explicitly reset all four custom edge widths to zero on each scroller so nested scrollers cannot inherit an outer fade; fallback values alone do not stop inheritance. Keep default edge widths at zero and set only the matching direction to a small `rem` length. At the beginning only the far edge fades; in the middle both ends fade; at the end the reached edge becomes clear.

A mask affects the entire painted scroller, including its background and potentially its native scrollbar. This simple composition accepts that tradeoff; overlay scrollbar behavior varies by browser and platform. A mask on the moving content would move with it. Avoid extra viewport layers merely to preserve scrollbar appearance. Keep borders and stationary controls on an existing unmasked parent when needed. Do not change measured geometry in response to overflow state.

## Variants

### `mask`

<a id="entry-mask"></a>

mask

Mask the rendered target using a CSS mask image.

Maps mask to mask-image through the standard style application path.

Use mask.gradient for a generated fade and background styles for visible paint.

This helper does not configure mask positioning, repeat, or size; use css when those properties are required.

Positional order: `mask`.

| Argument | Type | Contract |
| --- | --- | --- |
| `mask` | `string` | Mask<br>Shorthand<br>`{"cssKey":"maskImage"}` |

Applies a CSS mask image to an element.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Masked',
        styles: ['mask(mask:linear-gradient(black, transparent))']
    }
];
```

### `gradient`

<a id="entry-mask-gradient"></a>

Gradient

Generate a gradient for background paint or masking according to the path.

background.gradient writes background-image; mask.gradient writes mask-image. Both build CSS gradient text from the chosen type, argument, and stops.

Use background gradients for visible color and mask gradients for fading the rendered target; these are different effects.

Provide the gradient argument appropriate to its type. The shared builder checks lowercase linear in the type name, so repeatingLinear should use arg for its angle rather than relying on deg.

Positional order: `deg` → `arg` → `stops` → `type`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `deg` | `numberOrString` | `calc(var(--jam-background-deg var(--jam-mask-deg, 180deg)) - 90deg)` | Angle<br>Unit: `deg` |
| `arg` | `string` | Not supplied | Position parameters |
| `stops` | `array` | `["black","transparent 60%"]` | Stops |
| `type` | `string` | `linear` | Style<br>Options: `linear` — Linear, `radial` — Radial, `conic` — Conic, `repeatingLinear` — Repeating linear, `repeatingRadial` — Repeating radial, `repeatingConic` — Repeating conic |

Applies a gradient mask to the element.
