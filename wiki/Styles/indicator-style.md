# indicator style variants

<!-- Generated from native authoring; do not edit. -->

[中文](indicator-style.zh.md)

**Element:** `jam-indicator` · **Type:** `element`

---

## Slots

| Slot    | Type    | Description             |
| ------- | ------- | ----------------------- |
| `icon`  | slotted | Icon content            |
| `cap`   | slotted | Label text              |
| `value` | slotted | Value display (default) |
| `unit`  | slotted | Unit label              |

---

## Style variants

### `indicator.bigicon`

<a id="entry-indicator-bigicon"></a>

Large icon

Emphasize an indicator with a large icon.

Spans the icon across two grid rows and exposes its size; the caption and value remain separate slots.

Positional order: `size`.

| Argument | Type | Contract |
| --- | --- | --- |
| `size` | `number` | Icon size<br>Unit: `rem` |

Large icon display — increases the icon size.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Revenue',
        value: 42000,
        icon: '💰',
        styles: ['indicator.bigicon(size:3)']
    },
    {
        type: 'indicator',
        cap: 'Users',
        value: '1.2k',
        icon: '👤',
        styles: ['indicator.bigicon(size:2)']
    }
];
```

### `indicator.tips`

<a id="entry-indicator-tips"></a>

Tips

Use an indicator as a prominent explanatory tip.

Changes to a padded wrapping inline-flex layout with an enlarged wrapping value and hides the unit.

This is an inline presentation, not a popup tooltip plugin.

Tooltip-style display — minimal presentation suitable for overlay hints. No args.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Info',
        value: 'New update available',
        styles: ['indicator.tips']
    }
];
```

### `indicator.tweening`

<a id="entry-indicator-tweening"></a>

Easing

Animate numeric indicator value changes.

Uses valuechange old/new values to update the displayed content, either digit by digit or by numeric interpolation.

Use numeric values and a compatible numeric formatter.

The style takes manual control of displayed content. It does not retain cancellation handles or restore that flag on unplug; frequent replacement or overlapping updates need separate verification.

Positional order: `easing` → `duration` → `digitduration` → `maxduration` → `perdigit`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `easing` | `arrayOrString` | `easeOut` | Easing function<br>Options: `linear` — Linear, `ease` — Smooth, `easeIn` — Fade in, `easeOut` — Fade out, `easeInOut` — Ease in and out |
| `duration` | `number` | Not supplied | Overall duration<br>Takes precedence over the per-digit duration; when set, all digit changes use this duration |
| `digitduration` | `number` | `50` | Per-digit duration<br>When the overall duration is unset, the duration is the largest digit change multiplied by the time per ±1 step, capped by maxduration; this applies when perdigit is enabled. |
| `maxduration` | `number` | `400` | Maximum duration |
| `perdigit` | `boolean` | `true` | Change digit by digit |

Animated number transitions — smoothly animates the value from its old to new state with per-digit or overall easing.

Overall duration takes priority over per-digit timing.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Score',
        value: 12345,
        styles: ['indicator.tweening(easing:easeOut;duration:800)']
    },
    {
        type: 'indicator',
        cap: 'Counter',
        value: 9876,
        styles: ['indicator.tweening(perdigit:true;digitduration:100)']
    }
];
```

### `indicator.tweening.dial`

<a id="entry-indicator-tweening-dial"></a>

Dial

Display numeric changes as rolling digit dials.

Builds per-digit tracks in the value slot, chooses duration from digit-index distance and updates their CSS positions; removal restores normal formatted content.

Use a numeric indicator and compatible digit sequence/format.

This is a numeric display effect; arbitrary text and overlapping timeout cleanup are not guaranteed.

Positional order: `duration` → `digitduration` → `maxduration` → `easing` → `hideLeading0` → `height` → `width` → `background` → `borderRadius` → `border` → `boxShadow` → `margin` → `masklength` → `maskImage` → `digits`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `duration` | `number` | Not supplied | Overall duration<br>Takes precedence over the per-digit duration; when set, all digit changes use this duration |
| `digitduration` | `number` | `150` | Per-digit duration<br>When the overall duration is unset, each dial changes independently; its duration is the number of ±1 steps multiplied by this value, capped by maxduration. |
| `maxduration` | `number` | `400` | Maximum duration |
| `easing` | `arrayOrString` | `[0.4,0,0.2,1]` | Easing function<br>Options: `linear` — Linear, `ease` — Smooth, `easeIn` — Fade in, `easeOut` — Fade out, `easeInOut` — Ease in and out |
| `hideLeading0` | `boolean` | `true` | Hide leading zeros |
| `height` | `numberOrString` | Not supplied | Dial height<br>Unit: `rem` |
| `width` | `numberOrString` | Not supplied | Dial width<br>Unit: `rem` |
| `background` | `string` | Not supplied | Dial background |
| `borderRadius` | `numberOrString` | Not supplied | Dial border radius<br>Unit: `rem` |
| `border` | `string` | Not supplied | Dial border |
| `boxShadow` | `string` | Not supplied | Shadow |
| `margin` | `numberOrString` | Not supplied | Margin<br>Unit: `rem` |
| `masklength` | `numberOrString` | Not supplied | Mask<br>Unit: `%` |
| `maskImage` | `string` | Not supplied | Mask |
| `digits` | `arrayOrString` | `0123456789` | Content |

Dial-wheel digit animation — each digit is rendered on a spinning wheel that rolls to the target value.

Overall duration takes priority over per-digit timing. `maskImage` is an alternative to `masklength`.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Count',
        value: 1337,
        styles: ['indicator.tweening.dial(height:2;width:1.2;background:#333;borderRadius:0.2;margin:0.1)']
    },
    {
        type: 'indicator',
        cap: 'Price',
        value: 4999,
        styles: ['indicator.tweening.dial(hideLeading0:false;digitduration:200)']
    }
];
```

### `indicator.clock`

<a id="entry-indicator-clock"></a>

Clock

Render an indicator value as an analog or digital clock.

Builds a clock layer from the current timestamp and updates hand angles/date text on valuechange; clicks toggle presentation variants.

Supply timestamp values and an external update source if the clock must tick.

Removal removes the clock layer and value listener; this implementation does not restore setContentManually.

The style does not start a timer. A zero timestamp is ignored, and the legacy clock display has fixed date-language fragments.

Positional order: `type` → `labelall` → `square` → `continuous` → `digits` → `showdate`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | `analog` | Type<br>Options: `analog` — Analog, `digital` — Digits |
| `labelall` | `boolean` | `false` | Show all labels |
| `square` | `boolean` | `false` | Square |
| `continuous` | `boolean` | `false` | Continuous |
| `digits` | `boolean` | `false` | Digits |
| `showdate` | `boolean` | `false` | Show date |

Analog or digital clock display rendered inside the indicator. Supports toggling between modes, showing labels, date, and continuous second hand.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        value: 1700000000000,
        styles: ['indicator.clock(type:analog;labelall:true;showdate:true)']
    },
    {
        type: 'indicator',
        value: 1700000000000,
        styles: ['indicator.clock(type:digital;square:true)']
    }
];
```

### `indicator.inline`

<a id="entry-indicator-inline"></a>

Inline

Present a compact inline metric.

Places icon, caption, value and unit in a horizontal grid aligned to the baseline.

Inline grid layout — arranges icon, cap, value, and unit in a single row with automatic grid columns. No args.

Related layout trait variants:

| Variant                  | Description                                                                  |
| ------------------------ | ---------------------------------------------------------------------------- |
| `indicator.vertical`     | Stack indicator slots vertically                                             |
| `indicator.valueTop`     | Place the value before the cap/content flow                                  |
| `indicator.unitTop`      | Place the unit on the top row and span the value across both content columns |
| `indicator.trailingIcon` | Place the icon after the cap/value text                                      |
| `indicator.lefted`       | Left-align indicator content                                                 |
| `indicator.useArea`      | Opt into named grid areas for the icon, cap, value, unit, and extra slots    |
| `indicator.useLabel`     | Display the combined label slot and lay out its icon/caption together        |

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        icon: '⚡',
        cap: 'Status:',
        value: 'Connected',
        styles: ['indicator.inline']
    },
    {
        type: 'indicator',
        icon: 'arrow-right',
        cap: 'Next step',
        value: 'Profile',
        styles: ['indicator.trailingIcon', 'indicator.lefted']
    }
];
```

### `indicator.unitTop`

<a id="entry-indicator-unittop"></a>

Unit at the top

Place an indicator unit beside the caption above the value.

Moves the unit to the first grid row and expands the value across two columns.

Places the unit on the top row beside the caption and lets the value span the two content columns below. No args.

### `indicator.useArea`

<a id="entry-indicator-usearea"></a>

Use area

Address indicator slots through named grid areas.

Assigns icon, caption, value, unit and extra content to i, c, v, u and e grid areas.

Use the native slot content and area-based grid styling when the default positional layout needs adjustment.

Opts into the named grid-area layout `'i c c e' / '_ v u e'`, mapping the icon, cap, value, unit, and extra slots to `i`, `c`, `v`, `u`, and `e`. Use it when descendant styles need those area names; the default indicator layout uses numeric grid placement. No args.

### `indicator.useLabel`

<a id="entry-indicator-uselabel"></a>

Use label

Lay out an indicator through its combined label slot.

Displays the label slot as inline-flex and resets icon/caption area placement while adapting indicator columns.

Displays the indicator's combined label slot as an inline flex group spanning the caption columns. The icon and caption then flow inside that group instead of occupying independent grid areas. No args.

### `indicator.centered`

<a id="entry-indicator-centered"></a>

Center

Center an indicator metric and its surrounding slots.

Applies centered grid alignment, adjusting columns for hosts with or without an icon/unit.

Centered content layout — aligns all content to the center of the indicator. No args.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Total',
        value: '100%',
        styles: ['indicator.centered']
    }
];
```

### `indicator.datetime`

<a id="entry-indicator-datetime"></a>

Date and time

Format a date/time indicator with a display pattern.

Adds the datetime class and passes pattern into element parameters.

Use the appropriate native date/time indicator type and provide a date-compatible value; the style alone does not select that type.

Positional order: `pattern`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `pattern` | `string` | `<p>yyyy-MM-dd</p><p>HH:mm:ss</p>` | Format |

Date/time display with custom formatting pattern. Renders the value using the given HTML template.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Updated',
        value: 1700000000000,
        styles: ['indicator.datetime(pattern:<p>yyyy/MM/dd</p><p>HH:mm</p>)']
    },
    {
        type: 'indicator',
        cap: 'Event',
        value: 1700000000000,
        styles: ['indicator.datetime']
    }
];
```

### `indicator.jaml`

<a id="entry-indicator-jaml"></a>

JAML Logo

Display the native JAML wordmark treatment.

Adds logo and JAML variant classes; logo styling hides the normal value slot and draws the mark.

JAML logo mark — displays the JAML branding mark. No args.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        styles: ['indicator.jaml']
    }
];
```

### `indicator.jamui`

<a id="entry-indicator-jamui"></a>

JAM-UI Logo

Display the native Jam-UI wordmark treatment.

Adds logo and Jam-UI variant classes; logo styling hides the normal value slot and draws the mark.

JAM-UI logo mark — displays the JAM-UI branding mark. No args.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        styles: ['indicator.jamui']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'indicator',
    cap: 'Score',
    value: 12345,
    styles: ['indicator.tweening(easing:easeOut;duration:800)']
};
```

## `indicator.sub`

<a id="entry-indicator-sub"></a>

Indicator sub row

Place supporting content, such as a comparison line or tags, under an indicator's caption and value.

Apply it to a child in the indicator's layer slot. The child takes its own row from the caption column to the end and follows the indicator's alignment; its own typography is unchanged. For a muted sub-caption, also add cap.sub to a label, which then fades to 0.65 opacity. With row 'below', the default, it follows the value; with 'above' it sits between the caption and the value. With indicator.valueTop, the value stays in the first row and 'above' children follow the caption instead. Children in the same row setting follow source order.

The child must be a direct child of an indicator with slot: 'layer'.

Positional order: `row`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `row` | `string` | `below` | Row: 'below' places the child after the value, 'above' between the caption and the value<br>Shorthand<br>Options: `below`, `above` |

## `indicator.grid`

<a id="entry-indicator-grid"></a>

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

## `indicator.text`

<a id="entry-indicator-text"></a>

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

## `indicator.color`

<a id="entry-indicator-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `indicator.lefted`

<a id="entry-indicator-lefted"></a>

Left aligned

Align an indicator metric toward the leading edge.

Applies the lefted grid template and aligns the value to the start.

## `indicator.valueTop`

<a id="entry-indicator-valuetop"></a>

Value at the top

Place the metric above its caption.

Moves the indicator icon, value and unit to the first grid row.

## `indicator.vertical`

<a id="entry-indicator-vertical"></a>

Vertical

Select the vertical variant implemented by the target component.

Adds jam-vertical. Badge, button, button group, indicator, options, and progress styles each interpret it in their own component layout.

Use the matching component path and component structure.

A shared class does not imply equal geometry or a generic rotation; progress orientation and stacked caption/value layouts are distinct uses.

## `indicator.trailingIcon`

<a id="entry-indicator-trailingicon"></a>

Trailing icon

Place the icon after the caption/metric content.

Adds trailing-icon; label and indicator stylesheets position their own icon slots accordingly.

## `indicator.icon.text`

<a id="entry-indicator-icon-text"></a>

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

## `indicator.text.mono`

<a id="entry-indicator-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `indicator.unit.text`

<a id="entry-indicator-unit-text"></a>

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

## `indicator.unit.color`

<a id="entry-indicator-unit-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `indicator.unit.inline`

<a id="entry-indicator-unit-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `indicator.color.accent`

<a id="entry-indicator-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `indicator.unitslot.text`

<a id="entry-indicator-unitslot-text"></a>

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

## `indicator.capslot.layout`

<a id="entry-indicator-capslot-layout"></a>

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

## `indicator.unitslot.color`

<a id="entry-indicator-unitslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `indicator.valueslot.text`

<a id="entry-indicator-valueslot-text"></a>

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

## `indicator.background.tint`

<a id="entry-indicator-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `indicator.iconslot.layout`

<a id="entry-indicator-iconslot-layout"></a>

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

## `indicator.unitslot.inline`

<a id="entry-indicator-unitslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `indicator.unitslot.layout`

<a id="entry-indicator-unitslot-layout"></a>

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

## `indicator.valueslot.color`

<a id="entry-indicator-valueslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `indicator.valueslot.inline`

<a id="entry-indicator-valueslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `indicator.valueslot.layout`

<a id="entry-indicator-valueslot-layout"></a>

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

## `indicator.text.size.l`

<a id="entry-indicator-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `indicator.text.size.m`

<a id="entry-indicator-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `indicator.text.size.s`

<a id="entry-indicator-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `indicator.text.size.xl`

<a id="entry-indicator-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `indicator.text.size.xs`

<a id="entry-indicator-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `indicator.text.size.3xl`

<a id="entry-indicator-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.text.size.4xl`

<a id="entry-indicator-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.text.size.xxl`

<a id="entry-indicator-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `indicator.text.size.xxs`

<a id="entry-indicator-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `indicator.unit.text.mono`

<a id="entry-indicator-unit-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `indicator.unit.color.accent`

<a id="entry-indicator-unit-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `indicator.unitslot.text.mono`

<a id="entry-indicator-unitslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `indicator.valueslot.text.mono`

<a id="entry-indicator-valueslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `indicator.unit.background.tint`

<a id="entry-indicator-unit-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `indicator.unitslot.color.accent`

<a id="entry-indicator-unitslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `indicator.valueslot.color.accent`

<a id="entry-indicator-valueslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `indicator.unitslot.background.tint`

<a id="entry-indicator-unitslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `indicator.valueslot.background.tint`

<a id="entry-indicator-valueslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `indicator.unit.text.size.l`

<a id="entry-indicator-unit-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `indicator.unit.text.size.m`

<a id="entry-indicator-unit-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `indicator.unit.text.size.s`

<a id="entry-indicator-unit-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `indicator.unit.text.size.xl`

<a id="entry-indicator-unit-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `indicator.unit.text.size.xs`

<a id="entry-indicator-unit-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `indicator.unit.text.size.3xl`

<a id="entry-indicator-unit-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.unit.text.size.4xl`

<a id="entry-indicator-unit-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.unit.text.size.xxl`

<a id="entry-indicator-unit-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `indicator.unit.text.size.xxs`

<a id="entry-indicator-unit-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `indicator.unitslot.text.size.l`

<a id="entry-indicator-unitslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `indicator.unitslot.text.size.m`

<a id="entry-indicator-unitslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `indicator.unitslot.text.size.s`

<a id="entry-indicator-unitslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `indicator.unitslot.text.size.xl`

<a id="entry-indicator-unitslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `indicator.unitslot.text.size.xs`

<a id="entry-indicator-unitslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `indicator.valueslot.text.size.l`

<a id="entry-indicator-valueslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `indicator.valueslot.text.size.m`

<a id="entry-indicator-valueslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `indicator.valueslot.text.size.s`

<a id="entry-indicator-valueslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `indicator.unitslot.text.size.3xl`

<a id="entry-indicator-unitslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.unitslot.text.size.4xl`

<a id="entry-indicator-unitslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.unitslot.text.size.xxl`

<a id="entry-indicator-unitslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `indicator.unitslot.text.size.xxs`

<a id="entry-indicator-unitslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `indicator.valueslot.text.size.xl`

<a id="entry-indicator-valueslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `indicator.valueslot.text.size.xs`

<a id="entry-indicator-valueslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `indicator.valueslot.text.size.3xl`

<a id="entry-indicator-valueslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.valueslot.text.size.4xl`

<a id="entry-indicator-valueslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `indicator.valueslot.text.size.xxl`

<a id="entry-indicator-valueslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `indicator.valueslot.text.size.xxs`

<a id="entry-indicator-valueslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
