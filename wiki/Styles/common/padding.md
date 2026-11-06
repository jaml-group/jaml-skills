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

gap.l, margin.l, and padding.l use the l space token.

## `padding.m`

<a id="entry-padding-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token.

## `padding.s`

<a id="entry-padding-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token.

## `padding.xl`

<a id="entry-padding-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token.

## `padding.xs`

<a id="entry-padding-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token.

## `padding.xxl`

<a id="entry-padding-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token.

## `padding.xxs`

<a id="entry-padding-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token.
