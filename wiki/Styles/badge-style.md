# badge style variants

<!-- Generated from native authoring; do not edit. -->

[中文](badge-style.zh.md)

**Element:** `jam-badge` · **Type:** `element`

---

## CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--font-size` | `0.75em` | Base font size |
| `--outer-padding` | `0.5em` | Outer padding |
| `--inner-padding` | `0.25em` | Inner padding between cap and content |
| `--cross-padding` | `0em` | Cross-axis padding |
| `--shadowed` | `var(--jam-cta-text-shadow)` | Text shadow |
| `--carved` | `var(--jam-text-shadow-carved)` | Carved text shadow |

---

## Slots

| Slot | Type | Description |
|---|---|---|
| `icon` | slotted | Icon content (left-most) |
| `cap` | slotted | Label text |
| `content` | slotted | Main content (default slot) |
| `extra` | slotted | Extra action area |

---

## Style variants

### `badge.vertical`

<a id="entry-badge-vertical"></a>

Vertical

Select the vertical variant implemented by the target component.

Adds jam-vertical. Badge, button, button group, indicator, options, and progress styles each interpret it in their own component layout.

Use the matching component path and component structure.

A shared class does not imply equal geometry or a generic rotation; progress orientation and stacked caption/value layouts are distinct uses.

Vertical layout — stacks cap above content instead of side-by-side. No args.

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'Status',
        content: 'Online',
        styles: ['badge.vertical']
    }
];
```

### `badge.ghost`

<a id="entry-badge-ghost"></a>

Ghost

Apply a ghost class marker.

Adds jam-ghost to a badge; the badge stylesheet owns the presentation.

Use on a badge with its expected caption and value slots.

The badge-specific ghost stylesheet block is empty in this source baseline; do not rely on a visible ghost treatment from this marker alone.

Ghost / transparent style with no background fill. No args.

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'Beta',
        content: 'v1.2',
        styles: ['badge.ghost']
    }
];
```

### `badge.code`

<a id="entry-badge-code"></a>

Code

Apply a code-like badge with theme monospace typography and compact inline spacing.

Adds jam-code to a badge; the badge stylesheet owns the presentation.

Use on a badge with its expected caption and value slots.

This is a visual preset and does not parse, generate, or format the badge content.

Code / monospace typography style. No args.

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'const',
        content: 'active = true',
        styles: ['badge.code']
    }
];
```

### `badge.stamp`

<a id="entry-badge-stamp"></a>

Stamp

Apply a stamp-like badge with a current-color border, caption separator, and bold value.

Adds jam-stamp to a badge; the badge stylesheet owns the presentation.

Use on a badge with its expected caption and value slots.

This is a visual preset and does not parse, generate, or format the badge content.

Stamp / seal style with a bordered appearance. No args.

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'APPROVED',
        content: '2025-01-15',
        styles: ['badge.stamp']
    }
];
```

### `badge.datetime`

<a id="entry-badge-datetime"></a>

Date and time

Apply a date/time badge treatment with emphasized caption and adjusted value typography.

Adds jam-datetime to a badge; the badge stylesheet owns the presentation.

Use on a badge with its expected caption and value slots.

This is a visual preset and does not parse, generate, or format the badge content.

Date-time display style. No args.

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'Updated',
        content: '2025-01-15 14:30',
        styles: ['badge.datetime']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'badge',
    cap: 'Status',
    content: 'Active',
    styles: ['badge.ghost', 'badge.vertical']
};
```

## `badge.grid`

<a id="entry-badge-grid"></a>

Notes: [`grid`](common/grid.md#entry-grid).

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

## `badge.text`

<a id="entry-badge-text"></a>

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

## `badge.color`

<a id="entry-badge-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `badge.inline`

<a id="entry-badge-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `badge.icon.text`

<a id="entry-badge-icon-text"></a>

Notes: [`text`](common/text.md#entry-text).

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

## `badge.text.mono`

<a id="entry-badge-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `badge.color.accent`

<a id="entry-badge-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `badge.content.text`

<a id="entry-badge-content-text"></a>

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

## `badge.content.color`

<a id="entry-badge-content-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `badge.capslot.layout`

<a id="entry-badge-capslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

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

## `badge.content.inline`

<a id="entry-badge-content-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `badge.valueslot.text`

<a id="entry-badge-valueslot-text"></a>

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

## `badge.background.tint`

<a id="entry-badge-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `badge.iconslot.layout`

<a id="entry-badge-iconslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

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

## `badge.valueslot.color`

<a id="entry-badge-valueslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `badge.extraslot.layout`

<a id="entry-badge-extraslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

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

## `badge.labelslot.layout`

<a id="entry-badge-labelslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

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

## `badge.valueslot.inline`

<a id="entry-badge-valueslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `badge.valueslot.layout`

<a id="entry-badge-valueslot-layout"></a>

Notes: [`layout`](common/layout.md#entry-layout).

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

## `badge.text.size.l`

<a id="entry-badge-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `badge.text.size.m`

<a id="entry-badge-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `badge.text.size.s`

<a id="entry-badge-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `badge.text.size.xl`

<a id="entry-badge-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `badge.text.size.xs`

<a id="entry-badge-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `badge.text.size.3xl`

<a id="entry-badge-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `badge.text.size.4xl`

<a id="entry-badge-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `badge.text.size.xxl`

<a id="entry-badge-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `badge.text.size.xxs`

<a id="entry-badge-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `badge.content.text.mono`

<a id="entry-badge-content-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `badge.content.color.accent`

<a id="entry-badge-content-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `badge.valueslot.color.accent`

<a id="entry-badge-valueslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `badge.content.background.tint`

<a id="entry-badge-content-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `badge.valueslot.background.tint`

<a id="entry-badge-valueslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `badge.content.text.size.l`

<a id="entry-badge-content-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `badge.content.text.size.m`

<a id="entry-badge-content-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `badge.content.text.size.s`

<a id="entry-badge-content-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `badge.content.text.size.xl`

<a id="entry-badge-content-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `badge.content.text.size.xs`

<a id="entry-badge-content-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `badge.content.text.size.3xl`

<a id="entry-badge-content-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `badge.content.text.size.4xl`

<a id="entry-badge-content-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `badge.content.text.size.xxl`

<a id="entry-badge-content-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `badge.content.text.size.xxs`

<a id="entry-badge-content-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `badge.valueslot.text.size.l`

<a id="entry-badge-valueslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `badge.valueslot.text.size.m`

<a id="entry-badge-valueslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `badge.valueslot.text.size.s`

<a id="entry-badge-valueslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `badge.valueslot.text.size.xl`

<a id="entry-badge-valueslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `badge.valueslot.text.size.xs`

<a id="entry-badge-valueslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `badge.valueslot.text.size.3xl`

<a id="entry-badge-valueslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `badge.valueslot.text.size.4xl`

<a id="entry-badge-valueslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `badge.valueslot.text.size.xxl`

<a id="entry-badge-valueslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `badge.valueslot.text.size.xxs`

<a id="entry-badge-valueslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
