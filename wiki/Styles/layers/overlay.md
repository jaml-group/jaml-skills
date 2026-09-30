# layer.overlay

<!-- Generated from native authoring; do not edit. -->

[中文](overlay.zh.md)

`Styles.layer.overlay` — semi-transparent overlay layer.

Adds a positioned overlay with optional content on top of the element.

---

## Args

<a id="entry-layer-overlay"></a>

Overlay layer

Cover a host with an optional content overlay.

Centers supplied content over the host, copies the parent border radius during resize handling, and uses a compact treatment on short overlays. Nonempty content adds an inset dashed frame.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The overlay children are pointer-transparent; this style does not create a modal dialog, move focus or manage an application loading state.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `zIndex` | `number` | Not supplied | Layer order |
| `dropShadow` | `boolean` | `false` | Drop shadow |
| `boxShadow` | `string` | Not supplied | Shadow |
| `mask` | `string` | Not supplied | Mask |
| `filter` | `string` | Not supplied | Filter |
| `padding` | `string` | Not supplied | Padding |
| `borderRadius` | `string` | Not supplied | Corner radius |
| `transform` | `string` | Not supplied | Transform |
| `border` | `string` | Not supplied | Border |
| `clipPath` | `string` | Not supplied | Clipping |
| `animation` | `string` | Not supplied | Animation |
| `opacity` | `number` | Not supplied | Opacity<br>Editor hints (not runtime limits): `{"step":0.1}` |
| `css` | `dictionaryOrString` | Not supplied | CSS |
| `depth` | `number` | Not supplied | Perspective depth |
| `class` | `string` | Not supplied | CSS class name |
| `attrs` | `dictionary` | Not supplied | Properties |
| `rotateX` | `number` | Not supplied | X-axis rotation |
| `rotateY` | `number` | Not supplied | Y-axis rotation |
| `translateY` | `numberOrString` | Not supplied | Y-axis translation |
| `slot` | `string` | Not supplied | Slot |
| `content` | `any` | Not supplied | Text |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` | Entry animation |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` | Exit animation |

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Decorative overlay',
        styles: ['layer.overlay(content:Hello World;opacity:0.8)']
    },
    {
        type: 'card',
        cap: 'Minimal overlay',
        styles: ['layer.overlay(content:⚠;class:warning;opacity:0.9)']
    }
];
```
