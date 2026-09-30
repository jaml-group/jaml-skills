# common.padding

<!-- Generated from native authoring; do not edit. -->

[中文](padding.zh.md)

`Styles.padding.*` — padding sub-properties.

---

## Variants

### `padding`

<a id="entry-padding"></a>

Padding

Set spacing inside the target box.

Sets padding shorthand and optional individual sides.

Choose the content or slot-wrapper path according to which box should gain inside space.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `padding` → `top` → `right` → `bottom` → `left`.

| Argument | Type | Contract |
| --- | --- | --- |
| `padding` | `string` | Padding<br>Shorthand<br>`{"cssKey":"padding"}` |
| `top` | `string` | Top padding<br>`{"cssKey":"paddingTop"}` |
| `right` | `string` | Right padding<br>`{"cssKey":"paddingRight"}` |
| `bottom` | `string` | Bottom padding<br>`{"cssKey":"paddingBottom"}` |
| `left` | `string` | Left padding<br>`{"cssKey":"paddingLeft"}` |

Sets padding spacing on individual sides of an element.

The padding shorthand overrides individual side values.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['padding(top:1rem;left:1rem;right:1rem;bottom:0.5rem)']
    }
];
```

### Token scale presets

`padding.xxs`, `padding.xs`, `padding.s`, `padding.m`, `padding.l`, `padding.xl`, and `padding.xxl` set all sides from the matching `--jam-space-*` token.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Token-spaced',
        styles: ['padding.m']
    }
];
```

## `padding.l`

<a id="entry-padding-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `padding.m`

<a id="entry-padding-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `padding.s`

<a id="entry-padding-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `padding.xl`

<a id="entry-padding-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `padding.xs`

<a id="entry-padding-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `padding.xxl`

<a id="entry-padding-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `padding.xxs`

<a id="entry-padding-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
