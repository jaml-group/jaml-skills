# calendar style variants

<!-- Generated from native authoring; do not edit. -->

[中文](calendar-style.zh.md)

**Element:** `jam-calendar` · **Type:** `element`

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `ctitle` | slotted | Calendar title/header |
| `weekday` | slotted | Weekday labels |
| `date` | slotted | Date cells |

---

## Style variants

Calendar has no element-specific style variants. In 1.5.2, the former `calendar.weekendLine` variant was removed; weekend cells now receive the built-in elevated background, while the current date is marked automatically.

```javascript jaml-playground
export default [
    {
        type: 'calendar'
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'calendar'
};
```

## `calendar.grid`

<a id="entry-calendar-grid"></a>

Grid

Configure grid-related arguments for the path-selected target.

Maps templateColumns, templateRows, autoColumns, autoRows and templateAreas to their CSS grid properties; gap stays gap, and area uses gridArea unless the owning path overrides its CSS key.

Set display:grid on the grid container separately, for example with css(display:grid). Use grid.area for explicit row/column placement of its items.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| Argument | Type | Contract |
| --- | --- | --- |
| `templateColumns` | `string` | Column template |
| `templateRows` | `string` | Row template |
| `autoColumns` | `string` | Automatic columns |
| `autoRows` | `string` | Automatic rows |
| `templateAreas` | `string` | Template areas |
| `gap` | `string` | Gap |
| `area` | `string` | Grid area<br>`{"cssKey":"gridArea"}` |

## `calendar.text`

<a id="entry-calendar-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.color`

<a id="entry-calendar-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.inline`

<a id="entry-calendar-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.date.text`

<a id="entry-calendar-date-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.icon.text`

<a id="entry-calendar-icon-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `font` | `string` | Font family |
| `size` | `string` | Size<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | Font weight<br>Options: `normal` — Normal, `bold` — Bold<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | Style<br>Options: `normal` — Normal, `italic` — Italic<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | Decoration<br>Options: `none` — None, `underline` — Underline<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | Gap<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | Shadow |
| `align` | `string` | Alignment<br>Options: `left` — Left aligned, `center` — Center, `right` — Right aligned<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | Whitespace<br>Options: `normal` — Normal, `nowrap` — No wrapping, `pre` — Preserve whitespace<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | Line height<br>Options: `normal` — Normal, `1` — Compact, `1.5` — Loose<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | User selection<br>Options: `auto` — Automatic, `none` — None<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | Indent<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | Caret color<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | Text color |

## `calendar.text.mono`

<a id="entry-calendar-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.date.color`

<a id="entry-calendar-date-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.ctitle.text`

<a id="entry-calendar-ctitle-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.date.inline`

<a id="entry-calendar-date-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.color.accent`

<a id="entry-calendar-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.ctitle.color`

<a id="entry-calendar-ctitle-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.weekday.text`

<a id="entry-calendar-weekday-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.ctitle.inline`

<a id="entry-calendar-ctitle-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.dateslot.text`

<a id="entry-calendar-dateslot-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.weekday.color`

<a id="entry-calendar-weekday-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.capslot.layout`

<a id="entry-calendar-capslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.dateslot.color`

<a id="entry-calendar-dateslot-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.weekday.inline`

<a id="entry-calendar-weekday-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.background.tint`

<a id="entry-calendar-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitleslot.text`

<a id="entry-calendar-ctitleslot-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.dateslot.inline`

<a id="entry-calendar-dateslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.dateslot.layout`

<a id="entry-calendar-dateslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.iconslot.layout`

<a id="entry-calendar-iconslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.ctitleslot.color`

<a id="entry-calendar-ctitleslot-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.extraslot.layout`

<a id="entry-calendar-extraslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.labelslot.layout`

<a id="entry-calendar-labelslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.weekdayslot.text`

<a id="entry-calendar-weekdayslot-text"></a>

Font family

Configure typography on the path-selected target.

Maps font, size, weight, style, decoration, spacing, shadow, alignment, wrapping, line height, selection, indentation, caret, and foreground fields; icon paths use their own font and shadow keys.

Choose text for typography and layout or align for box alignment; target the slotted content when the wrapper should retain its geometry.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

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

## `calendar.ctitleslot.inline`

<a id="entry-calendar-ctitleslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.ctitleslot.layout`

<a id="entry-calendar-ctitleslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.weekdayslot.color`

<a id="entry-calendar-weekdayslot-color"></a>

Color

Set foreground color for the target selected by the path.

Forwards color and optional channel arguments through the path-dependent styling method.

Use semantic color presets for theme-following foreground roles; color.accent at the root has a separate color-profile contract.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `calendar.weekdayslot.inline`

<a id="entry-calendar-weekdayslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `calendar.weekdayslot.layout`

<a id="entry-calendar-weekdayslot-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode<br>`{"cssKey":"display"}` |
| `position` | `string` | Position<br>`{"cssKey":"position"}` |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

## `calendar.text.size.l`

<a id="entry-calendar-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.text.size.m`

<a id="entry-calendar-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.text.size.s`

<a id="entry-calendar-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.text.size.xl`

<a id="entry-calendar-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.text.size.xs`

<a id="entry-calendar-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.text.size.3xl`

<a id="entry-calendar-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.text.size.4xl`

<a id="entry-calendar-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.text.size.xxl`

<a id="entry-calendar-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.text.size.xxs`

<a id="entry-calendar-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.mono`

<a id="entry-calendar-date-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitle.text.mono`

<a id="entry-calendar-ctitle-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.date.color.accent`

<a id="entry-calendar-date-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.weekday.text.mono`

<a id="entry-calendar-weekday-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.dateslot.text.mono`

<a id="entry-calendar-dateslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitle.color.accent`

<a id="entry-calendar-ctitle-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.ctitleslot.text.mono`

<a id="entry-calendar-ctitleslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.date.background.tint`

<a id="entry-calendar-date-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekday.color.accent`

<a id="entry-calendar-weekday-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.dateslot.color.accent`

<a id="entry-calendar-dateslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.weekdayslot.text.mono`

<a id="entry-calendar-weekdayslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family. These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitle.background.tint`

<a id="entry-calendar-ctitle-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitleslot.color.accent`

<a id="entry-calendar-ctitleslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.weekday.background.tint`

<a id="entry-calendar-weekday-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.dateslot.background.tint`

<a id="entry-calendar-dateslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekdayslot.color.accent`

<a id="entry-calendar-weekdayslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `calendar.ctitleslot.background.tint`

<a id="entry-calendar-ctitleslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekdayslot.background.tint`

<a id="entry-calendar-weekdayslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.date.text.size.l`

<a id="entry-calendar-date-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.size.m`

<a id="entry-calendar-date-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.size.s`

<a id="entry-calendar-date-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.size.xl`

<a id="entry-calendar-date-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.size.xs`

<a id="entry-calendar-date-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.l`

<a id="entry-calendar-ctitle-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.m`

<a id="entry-calendar-ctitle-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.s`

<a id="entry-calendar-ctitle-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.size.3xl`

<a id="entry-calendar-date-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.date.text.size.4xl`

<a id="entry-calendar-date-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.date.text.size.xxl`

<a id="entry-calendar-date-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.date.text.size.xxs`

<a id="entry-calendar-date-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.xl`

<a id="entry-calendar-ctitle-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.xs`

<a id="entry-calendar-ctitle-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.l`

<a id="entry-calendar-weekday-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.m`

<a id="entry-calendar-weekday-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.s`

<a id="entry-calendar-weekday-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.3xl`

<a id="entry-calendar-ctitle-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitle.text.size.4xl`

<a id="entry-calendar-ctitle-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitle.text.size.xxl`

<a id="entry-calendar-ctitle-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitle.text.size.xxs`

<a id="entry-calendar-ctitle-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.l`

<a id="entry-calendar-dateslot-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.m`

<a id="entry-calendar-dateslot-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.s`

<a id="entry-calendar-dateslot-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.xl`

<a id="entry-calendar-weekday-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.xs`

<a id="entry-calendar-weekday-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.xl`

<a id="entry-calendar-dateslot-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.xs`

<a id="entry-calendar-dateslot-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.3xl`

<a id="entry-calendar-weekday-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekday.text.size.4xl`

<a id="entry-calendar-weekday-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekday.text.size.xxl`

<a id="entry-calendar-weekday-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekday.text.size.xxs`

<a id="entry-calendar-weekday-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.l`

<a id="entry-calendar-ctitleslot-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.m`

<a id="entry-calendar-ctitleslot-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.s`

<a id="entry-calendar-ctitleslot-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.3xl`

<a id="entry-calendar-dateslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.dateslot.text.size.4xl`

<a id="entry-calendar-dateslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.dateslot.text.size.xxl`

<a id="entry-calendar-dateslot-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.dateslot.text.size.xxs`

<a id="entry-calendar-dateslot-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.xl`

<a id="entry-calendar-ctitleslot-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.xs`

<a id="entry-calendar-ctitleslot-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.l`

<a id="entry-calendar-weekdayslot-text-size-l"></a>

Large

gap.l, margin.l, and padding.l use the l space token; text.size.l uses the l typography size token; border.l sets only border width; shadow.l and shadow.primary.l set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.m`

<a id="entry-calendar-weekdayslot-text-size-m"></a>

Medium

gap.m, margin.m, and padding.m use the m space token; text.size.m uses the m typography size token; border.m sets only border width; shadow.m and shadow.primary.m set box shadows; shadow.text.m and shadow.text.primary.m set text shadows; border.default sets a solid surface-default border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.s`

<a id="entry-calendar-weekdayslot-text-size-s"></a>

Small

gap.s, margin.s, and padding.s use the s space token; text.size.s uses the s typography size token; border.s sets only border width; shadow.s and shadow.primary.s set box shadows; shadow.text.s and shadow.text.primary.s set text shadows; border.faint and border.muted set solid outline-role borders with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.3xl`

<a id="entry-calendar-ctitleslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitleslot.text.size.4xl`

<a id="entry-calendar-ctitleslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.ctitleslot.text.size.xxl`

<a id="entry-calendar-ctitleslot-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.ctitleslot.text.size.xxs`

<a id="entry-calendar-ctitleslot-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.xl`

<a id="entry-calendar-weekdayslot-text-size-xl"></a>

Extra large

gap.xl, margin.xl, and padding.xl use the xl space token; text.size.xl uses the xl typography size token; border.xl sets only border width; shadow.xl and shadow.primary.xl set box shadows.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.xs`

<a id="entry-calendar-weekdayslot-text-size-xs"></a>

Extra small

gap.xs, margin.xs, and padding.xs use the xs space token; text.size.xs uses the xs typography size token; border.xs sets only border width; shadow.xs and shadow.primary.xs set box shadows; shadow.text.xs and shadow.text.primary.xs set text shadows; border.subtle sets a solid outline-subtle border with xs width.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.3xl`

<a id="entry-calendar-weekdayslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekdayslot.text.size.4xl`

<a id="entry-calendar-weekdayslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme.

## `calendar.weekdayslot.text.size.xxl`

<a id="entry-calendar-weekdayslot-text-size-xxl"></a>

Extra extra large

gap.xxl, margin.xxl, and padding.xxl use the xxl space token; text.size.xxl uses the xxl typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.

## `calendar.weekdayslot.text.size.xxs`

<a id="entry-calendar-weekdayslot-text-size-xxs"></a>

Extra extra small

gap.xxs, margin.xxs, and padding.xxs use the xxs space token; text.size.xxs uses the xxs typography size token.

Select the property family first, then its scale or role. Equal suffixes across spacing, typography, border, and shadow do not mean equal dimensions.

These are local style applications. Reusable palette and scale changes belong to theme tokens; applying a preset does not redefine the theme. Border-width-only presets require an existing visible border style.
