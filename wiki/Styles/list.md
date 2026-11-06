# list

<!-- Generated from native authoring; do not edit. -->

[中文](list.zh.md)

## `list.grid`

<a id="entry-list-grid"></a>

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

## `list.text`

<a id="entry-list-text"></a>

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

## `list.bento`

<a id="entry-list-bento"></a>

Bento table

Separate table/tree cells with tile-like spacing.

Adds bento and writes margin and radius variables consumed by the native table styling.

The public argument is spelled borderRaidus in this version; preserve that spelling when calling it.

Positional order: `margin` → `borderRaidus`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `margin` | `numberOrString` | `var(--jam-space-xs)` | Margin<br>Unit: `rem` |
| `borderRaidus` | `numberOrString` | `var(--jam-border-radius-s)` | Corner radius<br>Unit: `rem` |

## `list.color`

<a id="entry-list-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `list.thead`

<a id="entry-list-thead"></a>

Table header style

Customize a native table header surface.

Applies a header image and/or color-derived background, foreground and hover/active variables.

Prefer the token-based accent, tint or elevated header preset when it matches the design intent.

Positional order: `color` → `image`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Color |
| `image` | `string` | Background image |

## `list.inline`

<a id="entry-list-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `list.stripy`

<a id="entry-list-stripy"></a>

Zebra stripes

Apply alternating row surfaces to a table or tree.

Adds stripy and exposes independent odd/even cell background variables.

Positional order: `odd` → `even`.

| Argument | Type | Contract |
| --- | --- | --- |
| `odd` | `string` | Odd-row background |
| `even` | `string` | Even-row background |

## `list.compact`

<a id="entry-list-compact"></a>

Compact list

Fit more short records in a scan-heavy list.

Reduces row spacing while keeping task rows operable and long labels able to wrap.

## `list.ordered`

<a id="entry-list-ordered"></a>

Numbered items

Show records in their list order.

Displays a number beside each item.

## `list.gridline`

<a id="entry-list-gridline"></a>

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

## `list.headless`

<a id="entry-list-headless"></a>

No table header

Hide the table header visually.

Adds hide-thead; the native table stylesheet hides the thead slot while retaining the column definitions and table data. The neck slot remains visible.

Keep the meaning of columns accessible when removing visible headings.

## `list.markdown`

<a id="entry-list-markdown"></a>

markdown

Use the table’s Markdown presentation.

Adds markdown for the native table Markdown stylesheet.

This does not parse arbitrary Markdown into table data; supply the normal native table model.

## `list.showrownum`

<a id="entry-list-showrownum"></a>

Automatic table row numbers

Display row sequence markers beside native table rows.

Adds show-rownum plus the selected pill/plain/stroke variant and optional marker padding.

These are display sequence numbers, not stable record identities.

Positional order: `padding` → `style`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | Not supplied | Left spacing<br>Unit: `em` |
| `style` | `string` | `pill` | Style<br>Options: `pill` — Pill, `plain` — Plain, `stroke` — Stroke |

## `list.stretchrow`

<a id="entry-list-stretchrow"></a>

Stretch rows

Stretch native table/tree rows within the body layout.

Adds stretch-row for the native table template’s row-sizing rule.

This is sizing, not fixed-height virtualization; choose fixedrowheight/fixednodeheight when virtualization is required.

## `list.autopercent`

<a id="entry-list-autopercent"></a>

Table column percentages

Automatically select progress cells for percentage-named columns.

When the style activates, waiting for theadsset readiness if needed, tests the current header captions with matcher and changes matching header cell types to progress.

This mutates header types without converting values. It does not subscribe to later theadsset events, so rebuilding headers alone does not re-run the conversion.

Positional order: `matcher`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `matcher` | `string` | `(占比\|百分比\|%)` | Matcher |

## `list.hovermarker`

<a id="entry-list-hovermarker"></a>

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

## `list.xscrollable`

<a id="entry-list-xscrollable"></a>

Horizontal scrolling

Scroll a wide native table horizontally while preserving its header alignment.

Adds x-scrollable, forwards frozen-column counts to the table and couples header/body horizontal scrolling.

Use the native table with columns and a constrained viewport; the style relies on its header/body slots.

Positional order: `freezeLeft` → `freezeRight`.

| Argument | Type | Contract |
| --- | --- | --- |
| `freezeLeft` | `number` | Freeze left columns |
| `freezeRight` | `number` | Freeze right columns |

## `list.showpageinfo`

<a id="entry-list-showpageinfo"></a>

Show page information

Identify the reserved page-information entry.

The current entry has an empty plugin list and produces no page information.

Do not choose this as a working pagination/status feature. Compose page information explicitly from the table pagination state.

## `list.fixedrowheight`

<a id="entry-list-fixedrowheight"></a>

Fixed row height

Virtualize fixed-height table rows.

Uses the native table row provider and body scroll slot with SaigonScroll; reserves row height and can animate mounted cells. Expanded detail rows disable the fixed virtual path.

Requires a bounded body viewport and stable configured row height.

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

## `list.hoverhighlight`

<a id="entry-list-hoverhighlight"></a>

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

## `list.showscrollprogress`

<a id="entry-list-showscrollprogress"></a>

Scroll progress

Show body-scroll position as a thin table progress bar.

Creates a native progress element in the table neck and updates it from the body slot’s scroll progress; removal releases the bar and listener.

Shows scroll position, not data-loading or pagination completion.

Positional order: `height` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `height` | `numberOrString` | `0.1` | Height<br>Unit: `rem` |
| `color` | `string` | Not supplied | Color |

## `list.td.text`

<a id="entry-list-td-text"></a>

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

## `list.th.text`

<a id="entry-list-th-text"></a>

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

## `list.td.color`

<a id="entry-list-td-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `list.th.color`

<a id="entry-list-th-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `list.icon.text`

<a id="entry-list-icon-text"></a>

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

## `list.td.inline`

<a id="entry-list-td-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `list.th.inline`

<a id="entry-list-th-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `list.thead.hide`

<a id="entry-list-thead-hide"></a>

Hide table header

Hide the table header visually.

Adds hide-thead; the native table stylesheet hides the thead slot while retaining the column definitions and table data. The neck slot remains visible.

Keep the meaning of columns accessible when removing visible headings.

## `list.thead.tint`

<a id="entry-list-thead-tint"></a>

Tinted table header

Use the tint semantic surface for a table header.

Adds the tint header class; native CSS sets its normal, hover and active theme-token colors.

## `list.tdslot.text`

<a id="entry-list-tdslot-text"></a>

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

## `list.thslot.text`

<a id="entry-list-thslot-text"></a>

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

## `list.color.accent`

<a id="entry-list-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `list.tdslot.color`

<a id="entry-list-tdslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `list.thead.accent`

<a id="entry-list-thead-accent"></a>

Accent-colored table header

Use the accent semantic surface for a table header.

Adds the accent header class; native CSS sets its normal, hover and active theme-token colors.

## `list.thslot.color`

<a id="entry-list-thslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `list.tdslot.inline`

<a id="entry-list-tdslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `list.tdslot.layout`

<a id="entry-list-tdslot-layout"></a>

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

## `list.thslot.inline`

<a id="entry-list-thslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `list.thslot.layout`

<a id="entry-list-thslot-layout"></a>

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

## `list.capslot.layout`

<a id="entry-list-capslot-layout"></a>

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

## `list.thead.elevated`

<a id="entry-list-thead-elevated"></a>

Elevated table header

Use the elevated semantic surface for a table header.

Adds the elevated header class; native CSS sets its normal, hover and active theme-token colors.

## `list.background.tint`

<a id="entry-list-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `list.iconslot.layout`

<a id="entry-list-iconslot-layout"></a>

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

## `list.sortbutton.text`

<a id="entry-list-sortbutton-text"></a>

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

## `list.extraslot.layout`

<a id="entry-list-extraslot-layout"></a>

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

## `list.labelslot.layout`

<a id="entry-list-labelslot-layout"></a>

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

## `list.sortbutton.color`

<a id="entry-list-sortbutton-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `list.sortbutton.inline`

<a id="entry-list-sortbutton-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `list.text.size.l`

<a id="entry-list-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `list.text.size.m`

<a id="entry-list-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `list.text.size.s`

<a id="entry-list-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `list.text.size.xl`

<a id="entry-list-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `list.text.size.xs`

<a id="entry-list-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `list.text.size.3xl`

<a id="entry-list-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.text.size.4xl`

<a id="entry-list-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.text.size.xxl`

<a id="entry-list-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `list.text.size.xxs`

<a id="entry-list-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `list.td.color.accent`

<a id="entry-list-td-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `list.th.color.accent`

<a id="entry-list-th-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `list.td.background.tint`

<a id="entry-list-td-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `list.th.background.tint`

<a id="entry-list-th-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `list.tdslot.color.accent`

<a id="entry-list-tdslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `list.thslot.color.accent`

<a id="entry-list-thslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `list.tdslot.background.tint`

<a id="entry-list-tdslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `list.thslot.background.tint`

<a id="entry-list-thslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `list.sortbutton.color.accent`

<a id="entry-list-sortbutton-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `list.sortbutton.background.tint`

<a id="entry-list-sortbutton-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `list.td.text.size.l`

<a id="entry-list-td-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `list.td.text.size.m`

<a id="entry-list-td-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `list.td.text.size.s`

<a id="entry-list-td-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `list.th.text.size.l`

<a id="entry-list-th-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `list.th.text.size.m`

<a id="entry-list-th-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `list.th.text.size.s`

<a id="entry-list-th-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `list.td.text.size.xl`

<a id="entry-list-td-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `list.td.text.size.xs`

<a id="entry-list-td-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `list.th.text.size.xl`

<a id="entry-list-th-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `list.th.text.size.xs`

<a id="entry-list-th-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `list.td.text.size.3xl`

<a id="entry-list-td-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.td.text.size.4xl`

<a id="entry-list-td-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.td.text.size.xxl`

<a id="entry-list-td-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `list.td.text.size.xxs`

<a id="entry-list-td-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `list.th.text.size.3xl`

<a id="entry-list-th-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.th.text.size.4xl`

<a id="entry-list-th-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.th.text.size.xxl`

<a id="entry-list-th-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `list.th.text.size.xxs`

<a id="entry-list-th-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `list.tdslot.text.size.l`

<a id="entry-list-tdslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `list.tdslot.text.size.m`

<a id="entry-list-tdslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `list.tdslot.text.size.s`

<a id="entry-list-tdslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `list.thslot.text.size.l`

<a id="entry-list-thslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `list.thslot.text.size.m`

<a id="entry-list-thslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `list.thslot.text.size.s`

<a id="entry-list-thslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `list.tdslot.text.size.xl`

<a id="entry-list-tdslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `list.tdslot.text.size.xs`

<a id="entry-list-tdslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `list.thslot.text.size.xl`

<a id="entry-list-thslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `list.thslot.text.size.xs`

<a id="entry-list-thslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `list.tdslot.text.size.3xl`

<a id="entry-list-tdslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.tdslot.text.size.4xl`

<a id="entry-list-tdslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.tdslot.text.size.xxl`

<a id="entry-list-tdslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `list.tdslot.text.size.xxs`

<a id="entry-list-tdslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `list.thslot.text.size.3xl`

<a id="entry-list-thslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.thslot.text.size.4xl`

<a id="entry-list-thslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.thslot.text.size.xxl`

<a id="entry-list-thslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `list.thslot.text.size.xxs`

<a id="entry-list-thslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `list.sortbutton.text.size.l`

<a id="entry-list-sortbutton-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `list.sortbutton.text.size.m`

<a id="entry-list-sortbutton-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `list.sortbutton.text.size.s`

<a id="entry-list-sortbutton-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `list.sortbutton.text.size.xl`

<a id="entry-list-sortbutton-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `list.sortbutton.text.size.xs`

<a id="entry-list-sortbutton-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `list.sortbutton.text.size.3xl`

<a id="entry-list-sortbutton-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.sortbutton.text.size.4xl`

<a id="entry-list-sortbutton-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `list.sortbutton.text.size.xxl`

<a id="entry-list-sortbutton-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `list.sortbutton.text.size.xxs`

<a id="entry-list-sortbutton-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
