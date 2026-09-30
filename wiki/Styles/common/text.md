# common.text

<!-- Generated from native authoring; do not edit. -->

[中文](text.zh.md)

`Styles.text.*` -- font and text styling.

---

## Variants

### `text`

<a id="entry-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family<br>Shorthand<br>`{"cssKey":"fontFamily"}` |
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

Applies font and text CSS properties to an element.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Hello',
        styles: ['text(size:1.5rem;weight:bold;color:var(--jam-ac-color))']
    }
];
```

### `number`

<a id="entry-text-number"></a>

Digits

Improve numeric text presentation using the selected preset.

text.digit enables lining and tabular numerals in the current font. text.number instead selects DINPro, a slightly enlarged size, and bold weight.

The current font must support numeric variants for digit; number needs DINPro available for its intended face.

These presets do not parse or format numeric values, and number is not an alias for digit.

Number-specific font styling (DINPro, bold, 1.025em).

### `time`

<a id="entry-text-time"></a>

Time

Apply a compact monospace treatment suitable for time-like text.

Sets generic monospace, a slightly enlarged font size, bold weight, and tightened letter spacing.

This is typography only; it does not format a value or update a clock.

Monospace time display styling (monospace, bold, 1.1em, tighter letter spacing).

### `digit`

<a id="entry-text-digit"></a>

Digits

Improve numeric text presentation using the selected preset.

text.digit enables lining and tabular numerals in the current font. text.number instead selects DINPro, a slightly enlarged size, and bold weight.

The current font must support numeric variants for digit; number needs DINPro available for its intended face.

These presets do not parse or format numeric values, and number is not an alias for digit.

Uses lining, tabular numerals so digits share a stable width. No args.

### `ui`

<a id="entry-text-ui"></a>

UI font

Use the theme UI font family.

Sets font-family from sys.typography.fontFamily.ui on the selected target.

Use for ordinary interface text; use text.mono or text.digit for their distinct font or numeric-variant intent.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

Uses the active theme's `--jam-typography-font-family-ui` font family. No args.

### `mono`

<a id="entry-text-mono"></a>

Monospace

Select the browser generic monospace font family.

The root text.mono extension applies text with font set to monospace.

Nested text.mono presets use the theme monospace token instead; this root extension does not follow that token.

At the root, `text.mono` sets the CSS generic `monospace` font family.

### Contextual text presets

Nested common-text namespaces such as `cap.text` and `value.text` expose token-backed presets. Their `.mono` path uses `--jam-typography-font-family-mono`, and `.size.xxs`, `.size.xs`, `.size.s`, `.size.m`, `.size.l`, `.size.xl`, `.size.xxl`, `.size.3xl`, and `.size.4xl` use the matching `--jam-typography-font-size-*` token.

The root API is intentionally different: `text.size` is the single-value atom, not a preset namespace. Use `text.size(value:xs)` or `text(size:xs)` at the root; `text.size.xs` is only available under a contextual common-text namespace such as `cap.text.size.xs`.

### Individual property atoms

Each `text` arg is also available as a standalone style. For example:

-   `text.font(value:monospace)` -- sets font family
-   `text.size(value:1.5rem)` or `text.size(value:xs)` -- sets font size
-   `text.weight(value:bold)` -- sets font weight
-   `text.style(value:italic)` -- sets font style
-   `text.decoration(value:underline)` -- sets text decoration
-   `text.spacing(value:0.1em)` -- sets letter spacing
-   `text.shadow(value:1px 1px 2px black)` -- sets text shadow
-   `text.align(value:center)` -- sets text alignment
-   `text.whitespace(value:nowrap)` -- sets white-space handling
-   `text.lineheight(value:1.5)` -- sets line height
-   `text.userselect(value:none)` -- sets user select
-   `text.indent(value:2em)` -- sets text indent
-   `text.caretColor(value:red)` -- sets caret color
-   `text.color(value:red)` -- sets text color

Each atom variant accepts a single `value` argument.

## `text.font`

<a id="entry-text-font"></a>

Font family

Sets `font-family` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Font family |

## `text.size`

<a id="entry-text-size"></a>

Size

Sets `font-size` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Size |

## `text.align`

<a id="entry-text-align"></a>

Alignment

Sets `text-align` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Alignment |

## `text.color`

<a id="entry-text-color"></a>

Text color

Sets `color` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Text color |

## `text.style`

<a id="entry-text-style"></a>

Style

Sets `font-style` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Style |

## `text.indent`

<a id="entry-text-indent"></a>

Indent

Sets `text-indent` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Indent |

## `text.shadow`

<a id="entry-text-shadow"></a>

Shadow

Sets `text-shadow` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Shadow |

## `text.weight`

<a id="entry-text-weight"></a>

Font weight

Sets `font-weight` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Font weight |

## `text.spacing`

<a id="entry-text-spacing"></a>

Gap

Sets `letter-spacing` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Gap |

## `text.caretColor`

<a id="entry-text-caretcolor"></a>

Caret color

Sets `caret-color` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Caret color |

## `text.decoration`

<a id="entry-text-decoration"></a>

Decoration

Sets `text-decoration` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Decoration |

## `text.lineheight`

<a id="entry-text-lineheight"></a>

Line height

Sets `line-height` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Line height |

## `text.userselect`

<a id="entry-text-userselect"></a>

User selection

Sets `user-select` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | User selection |

## `text.whitespace`

<a id="entry-text-whitespace"></a>

Whitespace

Sets `white-space` from `value`.

Use the broader text style when several related properties should be configured together.

Positional order: `value`.

| Argument | Type | Contract |
| --- | --- | --- |
| `value` | `string` | Whitespace |
