# common.margin

<!-- Generated from native authoring; do not edit. -->

[中文](margin.zh.md)

`Styles.margin.*` -- margin sub-properties.

---

## Variants

### `margin`

<a id="entry-margin"></a>

Margin

Set spacing outside the target box.

Sets the margin shorthand and optional individual sides.

Use gap for shared inter-item spacing; use side margins when the target itself needs asymmetric outside space.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `margin` → `top` → `right` → `bottom` → `left`.

| Argument | Type | Contract |
| --- | --- | --- |
| `margin` | `string` | Margin<br>Shorthand<br>`{"cssKey":"margin"}` |
| `top` | `string` | Top margin<br>`{"cssKey":"marginTop"}` |
| `right` | `string` | Right margin<br>`{"cssKey":"marginRight"}` |
| `bottom` | `string` | Bottom margin<br>`{"cssKey":"marginBottom"}` |
| `left` | `string` | Left margin<br>`{"cssKey":"marginLeft"}` |

Sets margin spacing on individual sides of an element.

The margin shorthand overrides individual side values.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Spaced',
        styles: ['margin(top:1rem;bottom:0.5rem)']
    }
];
```

### Token scale presets

`margin.xxs`, `margin.xs`, `margin.s`, `margin.m`, `margin.l`, `margin.xl`, and `margin.xxl` set all sides from the matching `--jam-space-*` token.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Token-spaced',
        styles: ['margin.m']
    }
];
```

### `top`

<a id="entry-margin-top"></a>

Top margin

Sets `margin-top` from `value`.

Use the broader margin style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Top margin |

Sets only the top margin.

### `right`

<a id="entry-margin-right"></a>

Right margin

Sets `margin-right` from `value`.

Use the broader margin style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Right margin |

Sets only the right margin.

### `bottom`

<a id="entry-margin-bottom"></a>

Bottom margin

Sets `margin-bottom` from `value`.

Use the broader margin style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Bottom margin |

Sets only the bottom margin.

### `left`

<a id="entry-margin-left"></a>

Left margin

Sets `margin-left` from `value`.

Use the broader margin style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Left margin |

Sets only the left margin.



## `margin.l`

<a id="entry-margin-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `margin.m`

<a id="entry-margin-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `margin.s`

<a id="entry-margin-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `margin.xl`

<a id="entry-margin-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `margin.xs`

<a id="entry-margin-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `margin.xxl`

<a id="entry-margin-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `margin.xxs`

<a id="entry-margin-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
