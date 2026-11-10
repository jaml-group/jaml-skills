# steps

<!-- Generated from native authoring; do not edit. -->

[中文](steps.zh.md)

## `steps.grid`

<a id="entry-steps-grid"></a>

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

## `steps.text`

<a id="entry-steps-text"></a>

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

## `steps.bento`

<a id="entry-steps-bento"></a>

Bento table

Separate table/tree cells with tile-like spacing.

Adds bento and writes margin and radius variables consumed by the native table styling.

The public argument is spelled borderRaidus in this version; preserve that spelling when calling it.

Positional order: `margin` → `borderRaidus`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `margin` | `numberOrString` | `var(--jam-space-xs)` | Margin<br>Unit: `rem` |
| `borderRaidus` | `numberOrString` | `var(--jam-border-radius-s)` | Corner radius<br>Unit: `rem` |

## `steps.color`

<a id="entry-steps-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `steps.thead`

<a id="entry-steps-thead"></a>

Table header style

Customize a native table header surface.

Applies a header image and/or color-derived background, foreground and hover/active variables.

Prefer the token-based accent, tint or elevated header preset when it matches the design intent.

Positional order: `color` → `image`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Color |
| `image` | `string` | Background image |

## `steps.inline`

<a id="entry-steps-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `steps.stripy`

<a id="entry-steps-stripy"></a>

Zebra stripes

Apply alternating row surfaces to a table or tree.

Adds stripy and exposes independent odd/even cell background variables.

Positional order: `odd` → `even`.

| Argument | Type | Contract |
| --- | --- | --- |
| `odd` | `string` | Odd-row background |
| `even` | `string` | Even-row background |

## `steps.winding`

<a id="entry-steps-winding"></a>

Winding steps

Show a sequence as a winding path that alternates from side to side.

Offsets every other marker across the sequence and centres its label and any status on the outer side. Combine with steps.horizontal for a strip whose markers alternate up and down.

## `steps.gridline`

<a id="entry-steps-gridline"></a>

Grid lines

Draw row/column borders around table or tree cells.

Applies gridline, neck treatment and separate inner/outer border variables through native table CSS.

Use bento for separated tiles or stripy for alternating row surfaces; this preset does not change the data model.

Positional order: `rowWidth` → `colWidth` → `color` → `outlineWidth` → `outlineColor` → `neck`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `rowWidth` | `numberOrString` | Not supplied | Row divider width<br>Unit: `px` |
| `colWidth` | `numberOrString` | Not supplied | Column<br>Unit: `px` |
| `color` | `string` | Not supplied | Color |
| `outlineWidth` | `numberOrString` | Not supplied | Outer frame<br>Unit: `px` |
| `outlineColor` | `string` | Not supplied | Outer frame color |
| `neck` | `string` | `small` | Connector neck<br>Options: `auto`, `small`, `none` |

## `steps.headless`

<a id="entry-steps-headless"></a>

No table header

Hide the table header visually.

Adds hide-thead; the native table stylesheet hides the thead slot while retaining the column definitions and table data. The neck slot remains visible.

Keep the meaning of columns accessible when removing visible headings.

## `steps.markdown`

<a id="entry-steps-markdown"></a>

markdown

Use the table’s Markdown presentation.

Adds markdown for the native table Markdown stylesheet.

This does not parse arbitrary Markdown into table data; supply the normal native table model.

## `steps.connected`

<a id="entry-steps-connected"></a>

Connected steps

Join neighbouring step markers with lines.

Draws a curved line from each marker to the next, which follows layout and status changes and flows into the current step. Steps apply it by default; set connect: false on the steps to leave it out.

connect is read when the steps initialize; changing it later has no effect.

## `steps.horizontal`

<a id="entry-steps-horizontal"></a>

Horizontal steps

Show the steps in a single row that scrolls when it runs out of space.

Places each caption and any status below its numbered marker. Tracks grow to fit their content and the row scrolls inside the component when needed.

Use with a complete sequence. Row virtualization and Show more require vertical layout.

## `steps.showrownum`

<a id="entry-steps-showrownum"></a>

Automatic table row numbers

Display row sequence markers beside native table rows.

Adds show-rownum plus the selected pill/plain/stroke variant and optional marker padding.

These are display sequence numbers, not stable record identities.

Positional order: `padding` → `style`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | Not supplied | Left spacing<br>Unit: `em` |
| `style` | `string` | `pill` | Style<br>Options: `pill` — Pill, `plain` — Plain, `stroke` — Stroke |

## `steps.stretchrow`

<a id="entry-steps-stretchrow"></a>

Stretch rows

Stretch native table/tree rows within the body layout.

Adds stretch-row for the native table template’s row-sizing rule.

This is sizing, not fixed-height virtualization; choose fixedrowheight/fixednodeheight when virtualization is required.

## `steps.autopercent`

<a id="entry-steps-autopercent"></a>

Table column percentages

Automatically select progress cells for percentage-named columns.

When the style activates, waiting for theadsset readiness if needed, tests the current header captions with matcher and changes matching header cell types to progress.

This mutates header types without converting values. It does not subscribe to later theadsset events, so rebuilding headers alone does not re-run the conversion.

Positional order: `matcher`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `matcher` | `string` | `(占比\|百分比\|%)` | Matcher |

## `steps.hovermarker`

<a id="entry-steps-hovermarker"></a>

Hover marker

Add a moving hover marker to a table.

Tracks native cells and shows a horizontal axis, vertical axis or cell-frame locator; leaving clears the marker and hover coordinates.

Requires the native table/tree body and cell metadata.

Removal detaches hover listeners and removes the owned locator.

A visual hover marker does not select rows or persist a current cell.

Positional order: `type` → `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | `row` | Marker type<br>Options: `row` — Row, `column` — Column, `td` — Cell |
| `size` | `number` | Not supplied | Size |
| `width` | `numberOrString` | `auto` | Border width |
| `bias` | `number` | `0` | Border distance |
| `glow` | `number` | `0` | Glow |
| `radius` | `numberOrString` | `auto` | Border radius<br>auto: fit the element automatically; a numeric value specifies the radius in px. |
| `delay` | `number` | `0` | Delay |
| `breathe` | `boolean` | `false` | Breathing |
| `container` | `any` | Not supplied | Container |
| `clipTarget` | `any` | Not supplied | Clipping target |
| `easing` | `string` | Not supplied | Animation easing |
| `duration` | `number` | Not supplied | Animation duration |

## `steps.xscrollable`

<a id="entry-steps-xscrollable"></a>

Horizontal scrolling

Scroll a wide native table horizontally while preserving its header alignment.

Adds x-scrollable, forwards frozen-column counts to the table and couples header/body horizontal scrolling.

Use the native table with columns and a constrained viewport; the style relies on its header/body slots.

Positional order: `freezeLeft` → `freezeRight`.

| Argument | Type | Contract |
| --- | --- | --- |
| `freezeLeft` | `number` | Freeze left columns |
| `freezeRight` | `number` | Freeze right columns |

## `steps.showpageinfo`

<a id="entry-steps-showpageinfo"></a>

Show page information

Identify the reserved page-information entry.

The current entry has an empty plugin list and produces no page information.

Do not choose this as a working pagination/status feature. Compose page information explicitly from the table pagination state.

## `steps.fixedrowheight`

<a id="entry-steps-fixedrowheight"></a>

Fixed row height

Virtualize fixed-height table rows.

Uses the native table row provider and body scroll slot with SaigonScroll; reserves row height and can animate mounted cells. Expanded detail rows disable the fixed virtual path.

Requires a bounded body viewport and stable configured row height. Use only with vertical steps. Horizontal steps require the full sequence and reject fixed-height virtualization in either composition order.

Set animation to a supported animation-name string or false; true is not supported. Variable-height expanded details suspend fixed-row virtualization.

Positional order: `scrollTarget` → `height` → `throttle` → `padding` → `getChildrenByRow` → `getRowNum` → `animation` → `easing` → `duration` → `tileduration` → `tilerandom` → `defaultDirection`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `scrollTarget` | `string` | Not supplied | Scroll target |
| `height` | `numberOrString` | `2.5` | Line height<br>Unit: `rem`<br>Shorthand |
| `throttle` | `number` | Not supplied | Throttle |
| `padding` | `number` | Not supplied | Overscan rows |
| `getChildrenByRow` | `function` | Not supplied | Get children for a row |
| `getRowNum` | `function` | Not supplied | Get row count |
| `animation` | `booleanOrString` | `fade-in-` | Animation |
| `easing` | `string` | `ease` | Easing<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `duration` | `number` | `400` | Animation duration<br>Unit: `ms` |
| `tileduration` | `number` | `0` | Tile animation duration |
| `tilerandom` | `boolean` | `false` | Randomize tiles |
| `defaultDirection` | `string` | `up` | Default direction<br>Options: `up`, `down`, `right`, `left` |

## `steps.hoverhighlight`

<a id="entry-steps-hoverhighlight"></a>

Hover highlighting

Highlight the row under the pointer, optionally including its column.

Tracks native cell metadata into hoveringRow/hoveringCol and sets hover/active color variables; leaving the host clears the tracked position.

Use native table/tree cells carrying their row/column metadata.

This is hover feedback, not row selection or keyboard navigation.

Positional order: `color` → `active` → `overlay` → `column`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.15), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 5), 0.025)` | Color<br>Shorthand |
| `active` | `string` | Not supplied | Active color |
| `overlay` | `boolean` | `true` | Overlay |
| `column` | `boolean` | `false` | Highlight the column too |

## `steps.showscrollprogress`

<a id="entry-steps-showscrollprogress"></a>

Scroll progress

Show body-scroll position as a thin table progress bar.

Creates a native progress element in the table neck and updates it from the body slot’s scroll progress; removal releases the bar and listener.

Shows scroll position, not data-loading or pagination completion.

Positional order: `height` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `height` | `numberOrString` | `0.1` | Height<br>Unit: `rem` |
| `color` | `string` | Not supplied | Color |

## `steps.td.text`

<a id="entry-steps-td-text"></a>

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

## `steps.th.text`

<a id="entry-steps-th-text"></a>

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

## `steps.td.color`

<a id="entry-steps-td-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `steps.th.color`

<a id="entry-steps-th-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `steps.icon.text`

<a id="entry-steps-icon-text"></a>

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

## `steps.td.inline`

<a id="entry-steps-td-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `steps.th.inline`

<a id="entry-steps-th-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `steps.thead.hide`

<a id="entry-steps-thead-hide"></a>

Hide table header

Hide the table header visually.

Adds hide-thead; the native table stylesheet hides the thead slot while retaining the column definitions and table data. The neck slot remains visible.

Keep the meaning of columns accessible when removing visible headings.

## `steps.thead.tint`

<a id="entry-steps-thead-tint"></a>

Tinted table header

Use the tint semantic surface for a table header.

Adds the tint header class; native CSS sets its normal, hover and active theme-token colors.

## `steps.tdslot.text`

<a id="entry-steps-tdslot-text"></a>

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

## `steps.thslot.text`

<a id="entry-steps-thslot-text"></a>

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

## `steps.color.accent`

<a id="entry-steps-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `steps.tdslot.color`

<a id="entry-steps-tdslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `steps.thead.accent`

<a id="entry-steps-thead-accent"></a>

Accent-colored table header

Use the accent semantic surface for a table header.

Adds the accent header class; native CSS sets its normal, hover and active theme-token colors.

## `steps.thslot.color`

<a id="entry-steps-thslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `steps.tdslot.inline`

<a id="entry-steps-tdslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `steps.tdslot.layout`

<a id="entry-steps-tdslot-layout"></a>

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

## `steps.thslot.inline`

<a id="entry-steps-thslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `steps.thslot.layout`

<a id="entry-steps-thslot-layout"></a>

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

## `steps.capslot.layout`

<a id="entry-steps-capslot-layout"></a>

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

## `steps.thead.elevated`

<a id="entry-steps-thead-elevated"></a>

Elevated table header

Use the elevated semantic surface for a table header.

Adds the elevated header class; native CSS sets its normal, hover and active theme-token colors.

## `steps.background.tint`

<a id="entry-steps-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `steps.iconslot.layout`

<a id="entry-steps-iconslot-layout"></a>

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

## `steps.sortbutton.text`

<a id="entry-steps-sortbutton-text"></a>

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

## `steps.extraslot.layout`

<a id="entry-steps-extraslot-layout"></a>

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

## `steps.labelslot.layout`

<a id="entry-steps-labelslot-layout"></a>

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

## `steps.sortbutton.color`

<a id="entry-steps-sortbutton-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `steps.sortbutton.inline`

<a id="entry-steps-sortbutton-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `steps.text.size.l`

<a id="entry-steps-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `steps.text.size.m`

<a id="entry-steps-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `steps.text.size.s`

<a id="entry-steps-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `steps.text.size.xl`

<a id="entry-steps-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `steps.text.size.xs`

<a id="entry-steps-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `steps.text.size.3xl`

<a id="entry-steps-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.text.size.4xl`

<a id="entry-steps-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.text.size.xxl`

<a id="entry-steps-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `steps.text.size.xxs`

<a id="entry-steps-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `steps.td.color.accent`

<a id="entry-steps-td-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `steps.th.color.accent`

<a id="entry-steps-th-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `steps.td.background.tint`

<a id="entry-steps-td-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `steps.th.background.tint`

<a id="entry-steps-th-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `steps.tdslot.color.accent`

<a id="entry-steps-tdslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `steps.thslot.color.accent`

<a id="entry-steps-thslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `steps.tdslot.background.tint`

<a id="entry-steps-tdslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `steps.thslot.background.tint`

<a id="entry-steps-thslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `steps.sortbutton.color.accent`

<a id="entry-steps-sortbutton-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `steps.sortbutton.background.tint`

<a id="entry-steps-sortbutton-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `steps.td.text.size.l`

<a id="entry-steps-td-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `steps.td.text.size.m`

<a id="entry-steps-td-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `steps.td.text.size.s`

<a id="entry-steps-td-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `steps.th.text.size.l`

<a id="entry-steps-th-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `steps.th.text.size.m`

<a id="entry-steps-th-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `steps.th.text.size.s`

<a id="entry-steps-th-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `steps.td.text.size.xl`

<a id="entry-steps-td-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `steps.td.text.size.xs`

<a id="entry-steps-td-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `steps.th.text.size.xl`

<a id="entry-steps-th-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `steps.th.text.size.xs`

<a id="entry-steps-th-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `steps.td.text.size.3xl`

<a id="entry-steps-td-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.td.text.size.4xl`

<a id="entry-steps-td-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.td.text.size.xxl`

<a id="entry-steps-td-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `steps.td.text.size.xxs`

<a id="entry-steps-td-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `steps.th.text.size.3xl`

<a id="entry-steps-th-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.th.text.size.4xl`

<a id="entry-steps-th-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.th.text.size.xxl`

<a id="entry-steps-th-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `steps.th.text.size.xxs`

<a id="entry-steps-th-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `steps.tdslot.text.size.l`

<a id="entry-steps-tdslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `steps.tdslot.text.size.m`

<a id="entry-steps-tdslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `steps.tdslot.text.size.s`

<a id="entry-steps-tdslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `steps.thslot.text.size.l`

<a id="entry-steps-thslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `steps.thslot.text.size.m`

<a id="entry-steps-thslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `steps.thslot.text.size.s`

<a id="entry-steps-thslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `steps.tdslot.text.size.xl`

<a id="entry-steps-tdslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `steps.tdslot.text.size.xs`

<a id="entry-steps-tdslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `steps.thslot.text.size.xl`

<a id="entry-steps-thslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `steps.thslot.text.size.xs`

<a id="entry-steps-thslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `steps.tdslot.text.size.3xl`

<a id="entry-steps-tdslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.tdslot.text.size.4xl`

<a id="entry-steps-tdslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.tdslot.text.size.xxl`

<a id="entry-steps-tdslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `steps.tdslot.text.size.xxs`

<a id="entry-steps-tdslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `steps.thslot.text.size.3xl`

<a id="entry-steps-thslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.thslot.text.size.4xl`

<a id="entry-steps-thslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.thslot.text.size.xxl`

<a id="entry-steps-thslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `steps.thslot.text.size.xxs`

<a id="entry-steps-thslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `steps.sortbutton.text.size.l`

<a id="entry-steps-sortbutton-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `steps.sortbutton.text.size.m`

<a id="entry-steps-sortbutton-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `steps.sortbutton.text.size.s`

<a id="entry-steps-sortbutton-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `steps.sortbutton.text.size.xl`

<a id="entry-steps-sortbutton-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `steps.sortbutton.text.size.xs`

<a id="entry-steps-sortbutton-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `steps.sortbutton.text.size.3xl`

<a id="entry-steps-sortbutton-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.sortbutton.text.size.4xl`

<a id="entry-steps-sortbutton-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `steps.sortbutton.text.size.xxl`

<a id="entry-steps-sortbutton-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `steps.sortbutton.text.size.xxs`

<a id="entry-steps-sortbutton-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
