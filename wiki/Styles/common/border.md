# common.border

<!-- Generated from native authoring; do not edit. -->

[中文](border.zh.md)

`Styles.border.*` — border styling.

---

## Variants

### `border`

<a id="entry-border"></a>

Border

Set border appearance and corner geometry.

Maps sides, widths, styles, colors, and radii to CSS border properties.

A width or color alone does not establish a visible border style; combine with a style or use a semantic border preset.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `width` → `topWidth` → `rightWidth` → `bottomWidth` → `leftWidth` → `style` → `topStyle` → `rightStyle` → `bottomStyle` → `leftStyle` → `radius` → `topLeftRadius` → `topRightRadius` → `bottomRightRadius` → `bottomLeftRadius` → `color` → `topColor` → `rightColor` → `bottomColor` → `leftColor` → `border` → `image` → `imageSource` → `imageSlice` → `imageWidth` → `imageOutset` → `imageRepeat`.

| Argument | Type | Contract |
| --- | --- | --- |
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
| `border` | `string` | Border<br>Shorthand<br>`{"cssKey":"border"}` |
| `image` | `string` | Border image |
| `imageSource` | `string` | Image source<br>`{"cssKey":"borderImageSource"}` |
| `imageSlice` | `string` | Image slice<br>`{"cssKey":"borderImageSlice"}` |
| `imageWidth` | `string` | Image width<br>`{"cssKey":"borderImageWidth"}` |
| `imageOutset` | `string` | Image outset<br>`{"cssKey":"borderImageOutset"}` |
| `imageRepeat` | `string` | Image repeat<br>`{"cssKey":"borderImageRepeat"}` |

Applies border width, style, color, and border-radius to an element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['border(width:0.125rem;style:solid;color:var(--jam-ac-color);radius:0.5rem)']
    }
];
```

The `radius` and `width` arguments accept the semantic scale names. They resolve through `--jam-border-radius-*` and `--jam-border-width-*` respectively.

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Theme geometry',
    styles: ['border(radius:l;width:s;style:solid;color:primary)']
};
```

### Semantic border presets

These no-argument presets apply a solid `--jam-border-width-xs` border whose color follows the active theme.

| Path                | Color token                     | Description                |
| ------------------- | ------------------------------- | -------------------------- |
| `border.highest`    | `--jam-color-surface-highest`   | Highest surface border     |
| `border.higher`     | `--jam-color-surface-higher`    | Higher surface border      |
| `border.default`    | `--jam-color-surface-default`   | Default surface border     |
| `border.lower`      | `--jam-color-surface-lower`     | Lower surface border       |
| `border.lowest`     | `--jam-color-surface-lowest`    | Lowest surface border      |
| `border.subtle`     | `--jam-color-outline-subtle`    | Subtle outline border      |
| `border.muted`      | `--jam-color-outline-muted`     | Muted outline border       |
| `border.faint`      | `--jam-color-outline-faint`     | Faint outline border       |
| `border.primary`    | `--jam-color-primary-subtle`    | Primary semantic border    |
| `border.secondary`  | `--jam-color-secondary-subtle`  | Secondary semantic border  |
| `border.tertiary`   | `--jam-color-tertiary-subtle`   | Tertiary semantic border   |
| `border.quaternary` | `--jam-color-quaternary-subtle` | Quaternary semantic border |

### Border-width presets

`border.xs`, `border.s`, `border.m`, `border.l`, and `border.xl` set only the border width from the matching `--jam-border-width-*` token. Apply one after a semantic border preset when both color and a wider stroke are needed.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['border.primary', 'border.m'],
        components: [{ type: 'label', cap: 'Primary border' }]
    }
];
```

## `border.l`

<a id="entry-border-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.m`

<a id="entry-border-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.s`

<a id="entry-border-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.xl`

<a id="entry-border-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.xs`

<a id="entry-border-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.color`

<a id="entry-border-color"></a>

Border color

Sets `border-color` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Border color |

## `border.faint`

<a id="entry-border-faint"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.image`

<a id="entry-border-image"></a>

Border image

Expose the border image argument through the generated atomic style.

The current border image argument has no cssKey, while the atom factory uses cssKey as the output property.

Do not rely on this atom to set border-image in this baseline. Use css with borderImage, or the mapped imageSource/imageSlice/imageWidth/imageOutset/imageRepeat atoms.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Border image |

## `border.lower`

<a id="entry-border-lower"></a>

Lower

background.lower selects the surface.lower fill token; border.lower adds a solid border using surface.lower and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.muted`

<a id="entry-border-muted"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.style`

<a id="entry-border-style"></a>

Border style

Sets `border-style` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Border style |

## `border.width`

<a id="entry-border-width"></a>

Border width

Sets `border-width` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Border width |

## `border.higher`

<a id="entry-border-higher"></a>

Higher

background.higher selects the surface.higher fill token; border.higher adds a solid border using surface.higher and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.lowest`

<a id="entry-border-lowest"></a>

Lowest

background.lowest selects the surface.lowest fill token; border.lowest adds a solid border using surface.lowest and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.radius`

<a id="entry-border-radius"></a>

Border radius

Sets `border-radius` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Border radius |

## `border.subtle`

<a id="entry-border-subtle"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.default`

<a id="entry-border-default"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `border.highest`

<a id="entry-border-highest"></a>

Highest

background.highest selects the surface.highest fill token; border.highest adds a solid border using surface.highest and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.primary`

<a id="entry-border-primary"></a>

Primary

background.primary selects the primary.default fill token; border.primary adds a solid border using primary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.tertiary`

<a id="entry-border-tertiary"></a>

Tertiary

background.tertiary selects the tertiary.default fill token; border.tertiary adds a solid border using tertiary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.topColor`

<a id="entry-border-topcolor"></a>

Top border color

Sets `border-top-color` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Top border color |

## `border.topStyle`

<a id="entry-border-topstyle"></a>

Top border style

Sets `border-top-style` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Top border style |

## `border.topWidth`

<a id="entry-border-topwidth"></a>

Top border width

Sets `border-top-width` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Top border width |

## `border.leftColor`

<a id="entry-border-leftcolor"></a>

Left border color

Sets `border-left-color` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Left border color |

## `border.leftStyle`

<a id="entry-border-leftstyle"></a>

Left border style

Sets `border-left-style` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Left border style |

## `border.leftWidth`

<a id="entry-border-leftwidth"></a>

Left border width

Sets `border-left-width` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Left border width |

## `border.secondary`

<a id="entry-border-secondary"></a>

Secondary

background.secondary selects the secondary.default fill token; border.secondary adds a solid border using secondary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.imageSlice`

<a id="entry-border-imageslice"></a>

Image slice

Sets `border-image-slice` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Image slice |

## `border.imageWidth`

<a id="entry-border-imagewidth"></a>

Image width

Sets `border-image-width` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Image width |

## `border.quaternary`

<a id="entry-border-quaternary"></a>

Quaternary

background.quaternary selects the quaternary.default fill token; border.quaternary adds a solid border using quaternary.subtle and the xs border-width token.

Choose background for a fill or border for an edge; the two families do not have the same CSS effect.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `border.rightColor`

<a id="entry-border-rightcolor"></a>

Right border color

Sets `border-right-color` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Right border color |

## `border.rightStyle`

<a id="entry-border-rightstyle"></a>

Right border style

Sets `border-right-style` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Right border style |

## `border.rightWidth`

<a id="entry-border-rightwidth"></a>

Right border width

Sets `border-right-width` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Right border width |

## `border.bottomColor`

<a id="entry-border-bottomcolor"></a>

Bottom border color

Sets `border-bottom-color` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Bottom border color |

## `border.bottomStyle`

<a id="entry-border-bottomstyle"></a>

Bottom border style

Sets `border-bottom-style` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Bottom border style |

## `border.bottomWidth`

<a id="entry-border-bottomwidth"></a>

Bottom border width

Sets `border-bottom-width` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Bottom border width |

## `border.imageOutset`

<a id="entry-border-imageoutset"></a>

Image outset

Sets `border-image-outset` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Image outset |

## `border.imageRepeat`

<a id="entry-border-imagerepeat"></a>

Image repeat

Sets `border-image-repeat` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Image repeat |

## `border.imageSource`

<a id="entry-border-imagesource"></a>

Image source

Sets `border-image-source` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Image source |

## `border.topLeftRadius`

<a id="entry-border-topleftradius"></a>

Top left radius

Sets `border-top-left-radius` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Top left radius |

## `border.topRightRadius`

<a id="entry-border-toprightradius"></a>

Top right radius

Sets `border-top-right-radius` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Top right radius |

## `border.bottomLeftRadius`

<a id="entry-border-bottomleftradius"></a>

Bottom left radius

Sets `border-bottom-left-radius` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Bottom left radius |

## `border.bottomRightRadius`

<a id="entry-border-bottomrightradius"></a>

Bottom right radius

Sets `border-bottom-right-radius` from `value`.

Use the broader border style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Bottom right radius |
