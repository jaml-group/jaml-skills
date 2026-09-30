# layer.border

<!-- Generated from native authoring; do not edit. -->

[中文](border.zh.md)

`Styles.layer.border` — border layer with common border options.

Wraps `common/border` options in a layer context. Supports per-side width, style, color, border-radius per corner, and border-image properties.

---

## Args

<a id="entry-layer-border"></a>

Border

Draw a separately styled border without using the host border for decoration.

Writes the configured CSS border properties on a full-size, pointer-transparent child layer.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Set a border style and width when a visible outline is required; width or color alone may leave the CSS border invisible.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `width` → `topWidth` → `rightWidth` → `bottomWidth` → `leftWidth` → `style` → `topStyle` → `rightStyle` → `bottomStyle` → `leftStyle` → `radius` → `topLeftRadius` → `topRightRadius` → `bottomRightRadius` → `bottomLeftRadius` → `color` → `topColor` → `rightColor` → `bottomColor` → `leftColor` → `image` → `imageSource` → `imageSlice` → `imageWidth` → `imageOutset` → `imageRepeat`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `border` | `string` | Border<br>Shorthand<br>`{"cssKey":"border"}` |
| `class` | `string` | Class |
| `content` | `any` | Content |
| `width` | `string` | Border width<br>`{"cssKey":"borderWidth"}` |
| `topWidth` | `string` | Top border width<br>`{"cssKey":"borderTopWidth"}` |
| `rightWidth` | `string` | Right border width<br>`{"cssKey":"borderRightWidth"}` |
| `bottomWidth` | `string` | Bottom border width<br>`{"cssKey":"borderBottomWidth"}` |
| `leftWidth` | `string` | Left border width<br>`{"cssKey":"borderLeftWidth"}` |
| `style` | `string` | Border style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"borderStyle"}` |
| `topStyle` | `string` | Top border style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"borderTopStyle"}` |
| `rightStyle` | `string` | Right border style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"borderRightStyle"}` |
| `bottomStyle` | `string` | Bottom border style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"borderBottomStyle"}` |
| `leftStyle` | `string` | Left border style<br>Options: `none` — None, `solid` — Solid, `dashed` — Dashed, `dotted` — Dotted, `double` — Double, `groove` — 3D groove, `ridge` — 3D ridge, `inset` — 3D inset, `outset` — 3D outset<br>`{"cssKey":"borderLeftStyle"}` |
| `radius` | `string` | Border radius<br>`{"cssKey":"borderRadius"}` |
| `topLeftRadius` | `string` | Top left radius<br>`{"cssKey":"borderTopLeftRadius"}` |
| `topRightRadius` | `string` | Top right radius<br>`{"cssKey":"borderTopRightRadius"}` |
| `bottomRightRadius` | `string` | Bottom right radius<br>`{"cssKey":"borderBottomRightRadius"}` |
| `bottomLeftRadius` | `string` | Bottom left radius<br>`{"cssKey":"borderBottomLeftRadius"}` |
| `color` | `string` | Border color<br>`{"cssKey":"borderColor"}` |
| `topColor` | `string` | Top border color<br>`{"cssKey":"borderTopColor"}` |
| `rightColor` | `string` | Right border color<br>`{"cssKey":"borderRightColor"}` |
| `bottomColor` | `string` | Bottom border color<br>`{"cssKey":"borderBottomColor"}` |
| `leftColor` | `string` | Left border color<br>`{"cssKey":"borderLeftColor"}` |
| `image` | `string` | Border image |
| `imageSource` | `string` | Image source<br>`{"cssKey":"borderImageSource"}` |
| `imageSlice` | `string` | Image slice<br>`{"cssKey":"borderImageSlice"}` |
| `imageWidth` | `string` | Image width<br>`{"cssKey":"borderImageWidth"}` |
| `imageOutset` | `string` | Image outset<br>`{"cssKey":"borderImageOutset"}` |
| `imageRepeat` | `string` | Image repeat<br>`{"cssKey":"borderImageRepeat"}` |

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.border(width:0.125rem;color:var(--jam-ac-color);style:solid)'],
        components: [{ type: 'label', cap: 'Accent border' }]
    },
    {
        type: 'card',
        styles: ['layer.border(width:2px;style:dashed;color:gray;radius:0.5rem)'],
        components: [{ type: 'label', cap: 'Dashed rounded' }]
    },
    {
        type: 'card',
        styles: ['layer.border(topWidth:3px;topColor:red;bottomWidth:3px;bottomColor:blue)'],
        components: [{ type: 'label', cap: 'Top & bottom only' }]
    }
];
```

## `layer.border.l`

<a id="entry-layer-border-l"></a>

Large

Use the l theme width for a separate border layer.

Writes only border-width from the l width token; it does not select a border style or color.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Width-only treatments need a border style on the same layer to become visible; a separate layer.border style creates a separate child.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.m`

<a id="entry-layer-border-m"></a>

Medium

Use the m theme width for a separate border layer.

Writes only border-width from the m width token; it does not select a border style or color.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Width-only treatments need a border style on the same layer to become visible; a separate layer.border style creates a separate child.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.s`

<a id="entry-layer-border-s"></a>

Small

Use the s theme width for a separate border layer.

Writes only border-width from the s width token; it does not select a border style or color.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Width-only treatments need a border style on the same layer to become visible; a separate layer.border style creates a separate child.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.xl`

<a id="entry-layer-border-xl"></a>

Extra large

Use the xl theme width for a separate border layer.

Writes only border-width from the xl width token; it does not select a border style or color.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Width-only treatments need a border style on the same layer to become visible; a separate layer.border style creates a separate child.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.xs`

<a id="entry-layer-border-xs"></a>

Extra small

Use the xs theme width for a separate border layer.

Writes only border-width from the xs width token; it does not select a border style or color.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

Width-only treatments need a border style on the same layer to become visible; a separate layer.border style creates a separate child.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.faint`

<a id="entry-layer-border-faint"></a>

Small

Draw a faint theme outline on a separate layer.

Sets a full solid border with the faint outline color token and extra-small width.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This preset supplies both border style and color; it is not equivalent to the width-only preset with a shared description.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.lower`

<a id="entry-layer-border-lower"></a>

Lower

Draw a separate outline using the lower theme role.

Sets a full solid border using the lower color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.muted`

<a id="entry-layer-border-muted"></a>

Small

Draw a muted theme outline on a separate layer.

Sets a full solid border with the muted outline color token and extra-small width.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This preset supplies both border style and color; it is not equivalent to the width-only preset with a shared description.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.higher`

<a id="entry-layer-border-higher"></a>

Higher

Draw a separate outline using the higher theme role.

Sets a full solid border using the higher color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.lowest`

<a id="entry-layer-border-lowest"></a>

Lowest

Draw a separate outline using the lowest theme role.

Sets a full solid border using the lowest color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.subtle`

<a id="entry-layer-border-subtle"></a>

Extra small

Draw a subtle theme outline on a separate layer.

Sets a full solid border with the subtle outline color token and extra-small width.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This preset supplies both border style and color; it is not equivalent to the width-only preset with a shared description.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.default`

<a id="entry-layer-border-default"></a>

Medium

Draw a default theme outline on a separate layer.

Sets a full solid border with the default surface color token and extra-small width.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This preset supplies both border style and color; it is not equivalent to the width-only preset with a shared description.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.highest`

<a id="entry-layer-border-highest"></a>

Highest

Draw a separate outline using the highest theme role.

Sets a full solid border using the highest color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.primary`

<a id="entry-layer-border-primary"></a>

Primary

Draw a separate outline using the primary-subtle theme role.

Sets a full solid border using the primary-subtle color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.tertiary`

<a id="entry-layer-border-tertiary"></a>

Tertiary

Draw a separate outline using the tertiary-subtle theme role.

Sets a full solid border using the tertiary-subtle color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.secondary`

<a id="entry-layer-border-secondary"></a>

Secondary

Draw a separate outline using the secondary-subtle theme role.

Sets a full solid border using the secondary-subtle color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |

## `layer.border.quaternary`

<a id="entry-layer-border-quaternary"></a>

Quaternary

Draw a separate outline using the quaternary-subtle theme role.

Sets a full solid border using the quaternary-subtle color token and the extra-small border-width token.

Use a host with usable geometry and load the framework layer styles. Layer dimensions and stacking depend on the host and the chosen variant.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

This is an outline, not a background fill. It uses a full border shorthand rather than only selecting a width.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Contract |
| --- | --- | --- |
| `class` | `string` | Class |
| `content` | `any` | Content |
