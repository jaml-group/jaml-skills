# extraslot

<!-- Generated from native authoring; do not edit. -->

[中文](extraslot.zh.md)

## `extraslot.text`

<a id="entry-extraslot-text"></a>

Notes: [`text`](common/text.md#entry-text).

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

## `extraslot.color`

<a id="entry-extraslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `extraslot.inline`

<a id="entry-extraslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `extraslot.hover2show`

<a id="entry-extraslot-hover2show"></a>

Show on hover

Reveal extra-slot actions on hover.

Adds show-on-hover and left/right placement classes and sets the extra action row direction.

Requires content in the host extra slot.

Provide another accessible way to reach essential actions; this preset is hover presentation.

Positional order: `position` → `reverse` → `duration`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `position` | `string` | `right` | Position<br>Options: `left`, `right`, `inline` |
| `reverse` | `boolean` | `false` | Reverse |
| `duration` | `number` | `120` | Unit: `ms` |

## `extraslot.text.mono`

<a id="entry-extraslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `extraslot.color.accent`

<a id="entry-extraslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `extraslot.background.tint`

<a id="entry-extraslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `extraslot.text.size.l`

<a id="entry-extraslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `extraslot.text.size.m`

<a id="entry-extraslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `extraslot.text.size.s`

<a id="entry-extraslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `extraslot.text.size.xl`

<a id="entry-extraslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `extraslot.text.size.xs`

<a id="entry-extraslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `extraslot.text.size.3xl`

<a id="entry-extraslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `extraslot.text.size.4xl`

<a id="entry-extraslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `extraslot.text.size.xxl`

<a id="entry-extraslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `extraslot.text.size.xxs`

<a id="entry-extraslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
