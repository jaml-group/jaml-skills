# common.value

<!-- Generated from native authoring; do not edit. -->

[中文](value.zh.md)

`Styles.value.*` — value-slot roles and value-related behavior for input elements.

---

## Variants

### `value.asAttr`

<a id="entry-value-asattr"></a>

As an attribute

Expose a caption or value to attribute-based styling.

Copies cap on capslotchange, or value on valuechange, into the corresponding host attribute.

This is event-driven reflection, not a two-way binding or an initial synchronization guarantee.

Syncs the element's value to its `value` HTML attribute on every `valuechange` event via `setAttribute('value', ...)`.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Synced to attr',
        styles: ['value.asAttr']
    }
];
```

### Value role presets

These paths add a semantic class to the host. Native and theme styles consume the class as a complete optical recipe for the value and its unit, so the exact size, weight, line height, opacity, and color context can vary by theme.

| Path          | Class             | Role                          |
| ------------- | ----------------- | ----------------------------- |
| `value.major` | `jam-value-major` | Largest, most prominent value |
| `value.main`  | `jam-value-main`  | Primary value                 |
| `value.sub`   | `jam-value-sub`   | Supporting value              |
| `value.minor` | `jam-value-minor` | Least prominent value         |

All four paths accept the same optional argument:

The argument writes `--jam-value-major-opacity`, `--jam-value-main-opacity`, `--jam-value-sub-opacity`, or `--jam-value-minor-opacity` for the selected path.

```javascript jaml-playground
export default [
    {
        type: 'indicator-number',
        cap: 'Output',
        value: 86.4,
        unit: 'MW',
        styles: ['value.major']
    }
];
```

## `value.sub`

<a id="entry-value-sub"></a>

Sub-value

Use the sub metric emphasis level.

Applies token-based l/medium typography to the direct value slot and adjusts its unit sizing, with an optional opacity override.

Requires a JAML host with value content; the preset does not compute or format a value.

Positional order: `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `opacity` | `number` | Opacity |

## `value.main`

<a id="entry-value-main"></a>

Main value

Use the main metric emphasis level.

Applies token-based xl/semibold typography to the direct value slot and adjusts its unit sizing, with an optional opacity override.

Requires a JAML host with value content; the preset does not compute or format a value.

Positional order: `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `opacity` | `number` | Opacity |

## `value.text`

<a id="entry-value-text"></a>

Notes: [`text`](text.md#entry-text).

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color<br>`{"cssKey":"color"}` |

## `value.color`

<a id="entry-value-color"></a>

Notes: [`color`](color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `value.major`

<a id="entry-value-major"></a>

Primary value

Use the major metric emphasis level.

Applies token-based 4xl/bold typography to the direct value slot and adjusts its unit sizing, with an optional opacity override.

Requires a JAML host with value content; the preset does not compute or format a value.

Positional order: `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `opacity` | `number` | Opacity |

## `value.minor`

<a id="entry-value-minor"></a>

Secondary value

Use the minor metric emphasis level.

Applies token-based m/regular typography to the direct value slot and adjusts its unit sizing, with an optional opacity override.

Requires a JAML host with value content; the preset does not compute or format a value.

Positional order: `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `opacity` | `number` | Opacity |

## `value.inline`

<a id="entry-value-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `value.grouped`

<a id="entry-value-grouped"></a>

Grouped digits

Make large numbers easier to read with thousands separators.

Turns on grouping for number and percent default formatting: the value is rounded to decimalPos, as with toFixed when it is set, then written with the current locale's separators, such as 1,284. A locale change re-renders it.

Requires an input-capable host using its default number or percent formatter; a custom formatter takes precedence.

## `value.text.mono`

<a id="entry-value-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `value.color.accent`

<a id="entry-value-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `value.background.tint`

<a id="entry-value-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `value.text.size.l`

<a id="entry-value-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `value.text.size.m`

<a id="entry-value-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `value.text.size.s`

<a id="entry-value-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `value.text.size.xl`

<a id="entry-value-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `value.text.size.xs`

<a id="entry-value-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `value.text.size.3xl`

<a id="entry-value-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `value.text.size.4xl`

<a id="entry-value-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `value.text.size.xxl`

<a id="entry-value-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `value.text.size.xxs`

<a id="entry-value-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
