# common.cap

<!-- Generated from native authoring; do not edit. -->

[中文](cap.zh.md)

`Styles.cap.*` — caption-slot helpers and semantic caption roles.

---

## Variants

### `cap.*`

Common styles nested under `cap` target the element's `cap` slot. For example, `cap.color.strong` changes the caption foreground without changing the host element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Styled caption',
        styles: ['cap.color.strong']
    }
];
```

### `cap.asAttr`

<a id="entry-cap-asattr"></a>

As an attribute

Expose a caption or value to attribute-based styling.

Copies cap on capslotchange, or value on valuechange, into the corresponding host attribute.

This is event-driven reflection, not a two-way binding or an initial synchronization guarantee.

Mirrors the current caption to the host's `cap` HTML attribute whenever the `capslotchange` event fires. This uses the general [named-slot lifecycle](../../JAM-UI/JAM-UI.md#named-slot-lifecycle), including its initialization and firing limits; an in-place caption text update may not refresh this attribute.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Attribute caption',
        styles: ['cap.asAttr']
    }
];
```

### Caption role presets

These paths add a semantic class to the host. Native and theme styles consume the class as a complete caption recipe, so the exact size, weight, line height, opacity, and color context can vary by theme.

| Path       | Class          | Role               |
| ---------- | -------------- | ------------------ |
| `cap.main` | `jam-cap-main` | Primary caption    |
| `cap.sub`  | `jam-cap-sub`  | Supporting caption |

Both paths accept the same optional argument:

The argument writes `--jam-cap-main-opacity` or `--jam-cap-sub-opacity` for the selected path.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Primary caption',
        styles: ['cap.main']
    }
];
```

## `cap.sub`

<a id="entry-cap-sub"></a>

Subheading

Use the sub caption emphasis preset.

Applies token-based s caption sizing and medium weight to the direct cap slot, with an optional opacity override.

Requires a JAML host with cap content; it does not create the caption.

Positional order: `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `opacity` | `number` | Opacity |

## `cap.main`

<a id="entry-cap-main"></a>

Main heading

Use the main caption emphasis preset.

Applies token-based m caption sizing and bold weight to the direct cap slot, with an optional opacity override.

Requires a JAML host with cap content; it does not create the caption.

Positional order: `opacity`.

| Argument | Type | Contract |
| --- | --- | --- |
| `opacity` | `number` | Opacity |

## `cap.text`

<a id="entry-cap-text"></a>

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

## `cap.color`

<a id="entry-cap-color"></a>

Notes: [`color`](color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `cap.inline`

<a id="entry-cap-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `cap.text.mono`

<a id="entry-cap-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `cap.color.accent`

<a id="entry-cap-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `cap.background.tint`

<a id="entry-cap-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `cap.text.size.l`

<a id="entry-cap-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `cap.text.size.m`

<a id="entry-cap-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `cap.text.size.s`

<a id="entry-cap-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `cap.text.size.xl`

<a id="entry-cap-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `cap.text.size.xs`

<a id="entry-cap-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `cap.text.size.3xl`

<a id="entry-cap-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `cap.text.size.4xl`

<a id="entry-cap-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `cap.text.size.xxl`

<a id="entry-cap-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `cap.text.size.xxs`

<a id="entry-cap-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
