# layer.ribbon

<!-- Generated from native authoring; do not edit. -->

[中文](ribbon.zh.md)

`Styles.layer.ribbon.*` — corner ribbon decorations and tooltip triggers.

---

## Variants

### `ribbon`

<a id="entry-layer-ribbon"></a>

Ribbon

Attach a small content ornament at the host corner.

Creates a ribbon layer whose content may be a Node, HTML-like content or a callback result; top/right/radius place it near the top-right corner.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Use content for the ornament body; use layer.ribbon.bookmark for a clipped bookmark background or layer.ribbon.tiptrigger for an information marker.

This is an attached ornament, not a layout region. Ensure host overflow permits any part placed outside its bounds.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `top` → `right` → `radius`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `functionOrAny` | `<jam-indicator styles="indicator.jaml">JAML®</jam-indicator>` | Content |
| `top` | `numberOrString` | Not supplied | Top |
| `right` | `numberOrString` | Not supplied | Right side |
| `radius` | `numberOrString` | Not supplied | Corner radius |

Corner ribbon element. Displays a ribbon with content in the corner of an element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Featured',
        styles: ['layer.ribbon(content:NEW;radius:0.5rem;top:0.5rem)']
    }
];
```

### `ribbon.tiptrigger`

<a id="entry-layer-ribbon-tiptrigger"></a>

Tip trigger

Trigger used by the jam-tip plugin

Attach a compact information-tip trigger to the host corner.

Creates an information-marker ribbon and places tip text in its jam-tip attribute for the framework tooltip handling.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Use with the framework tooltip facility and concise tip text; the style sets the trigger attribute and does not create tooltip content itself.

This is an attached ornament, not a layout region. Ensure host overflow permits any part placed outside its bounds.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `top` → `right` → `radius` → `tip`.

Common arguments: [layer.ribbon](#entry-layer-ribbon).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `content` | `functionOrAny` | `<div class="jam-layer-tiptrigger-i">i</div>` | Content |
| `tip` | `string` | `` | Tip content |

Ribbon used as a tooltip trigger (used by the `jam-tip` plugin). Same args as `ribbon` plus a `tip` property.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Hover for info',
        styles: ['layer.ribbon.tiptrigger(tip:This is a helpful tip;radius:0.5rem)']
    }
];
```

### `ribbon.bookmark`

<a id="entry-layer-ribbon-bookmark"></a>

Bookmark

Attach a bookmark-shaped ornament to the host.

Adds a configurable bookmark silhouette: fishtail, pendant, slanted or flat. Its default entry slides in from above and exit reverses that motion.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Use style and size to shape the bookmark, and content for its label or icon. Use layer.background.ribbon for a ribbon-shaped surface instead.

This is an attached ornament, not a layout region. Ensure host overflow permits any part placed outside its bounds.

Positional order: `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `top` → `right` → `radius` → `style` → `indent` → `background`.

Common arguments: [layer.ribbon](#entry-layer-ribbon).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `string` | Not supplied | Width<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | Not supplied | Minimum width<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | Not supplied | Maximum width<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | Not supplied | Height<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | Not supplied | Minimum height<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | Not supplied | Maximum height<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | Not supplied | Dimensions<br>Shorthand |
| `content` | `functionOrAny` | Not supplied | Content |
| `entryAnimation` | `string` | `jam-from-top 250ms 400ms cubic-bezier(0.5,0.5,0.55,1.68) both` | Entry animation |
| `exitAnimation` | `string` | `jam-from-top 200ms ease-in reverse both` | Exit animation |
| `style` | `string` | `fishtail` | Position<br>Shorthand<br>Options: `fishtail`, `pendant`, `flat`, `slanted` |
| `indent` | `numberOrString` | Not supplied | Notch depth<br>Unit: `rem` |
| `background` | `string` | `var(--jam-ac-color) linear-gradient(to bottom, hsla(0,0%,100%,0.15), hsla(0,0%,0%,0.2))` | Background |

Bookmark-shaped ribbon with configurable style. Supports fishtail, pendant, flat, and slanted shapes.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Fishtail',
        styles: ['layer.ribbon.bookmark(style:fishtail;content:HOT;indent:20%)']
    },
    {
        type: 'card',
        cap: 'Slanted',
        styles: ['layer.ribbon.bookmark(style:slanted;content:SALE;background:gold)']
    },
    {
        type: 'card',
        cap: 'Pendant',
        styles: ['layer.ribbon.bookmark(style:pendant;content:TOP;indent:25%)']
    }
];
```
