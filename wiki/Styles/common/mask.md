# common.mask

<!-- Generated from native authoring; do not edit. -->

[中文](mask.zh.md)

`Styles.mask.*` -- CSS mask-image properties.

---

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
