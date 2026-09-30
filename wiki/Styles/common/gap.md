# common.gap

<!-- Generated from native authoring; do not edit. -->

[中文](gap.zh.md)

`Styles.gap.*` — row and column gap spacing.

---

## Variants

### `gap`

<a id="entry-gap"></a>

Gap

Set spacing between layout items.

Sets shared gap or independent row and column gaps.

Use in a layout that supports gaps; margins serve outside spacing and padding serves inside spacing.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `gap` → `row` → `col`.

| Argument | Type | Contract |
| --- | --- | --- |
| `gap` | `string` | Margin<br>Shorthand<br>`{"cssKey":"gap"}` |
| `row` | `string` | Row gap<br>`{"cssKey":"rowGap"}` |
| `col` | `string` | Column gap<br>`{"cssKey":"columnGap"}` |

Sets the CSS gap between rows and columns.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(display:flex)', 'gap(row:0.5rem;col:1rem)'],
        components: [
            { type: 'label', cap: 'One' },
            { type: 'label', cap: 'Two' }
        ]
    }
];
```

### Token scale presets

`gap.xxs`, `gap.xs`, `gap.s`, `gap.m`, `gap.l`, `gap.xl`, and `gap.xxl` set both axes from the matching `--jam-space-*` token.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(display:flex)', 'gap.m'],
        components: [
            { type: 'label', cap: 'One' },
            { type: 'label', cap: 'Two' }
        ]
    }
];
```

### `row` and `col`

The atomic paths `gap.row(value)` and `gap.col(value)` set one axis only.



## `gap.l`

<a id="entry-gap-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `gap.m`

<a id="entry-gap-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `gap.s`

<a id="entry-gap-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `gap.xl`

<a id="entry-gap-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `gap.xs`

<a id="entry-gap-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `gap.col`

<a id="entry-gap-col"></a>

Column gap

Sets `column-gap` from `value`.

Use the broader gap style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Column gap |

## `gap.row`

<a id="entry-gap-row"></a>

Row gap

Sets `row-gap` from `value`.

Use the broader gap style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Row gap |

## `gap.xxl`

<a id="entry-gap-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `gap.xxs`

<a id="entry-gap-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
