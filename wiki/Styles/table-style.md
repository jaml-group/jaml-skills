# table

<!-- Generated from native authoring; do not edit. -->

[中文](table-style.zh.md)

`Styles.table.*` -- data table elements with rows, columns, sorting, scrolling, and interaction features.

---

## Element styling

### Automatic base behavior

The element installs its internal base style automatically. Use public styles for appearance; no `_basic` entry is needed in authored JAML.

Auto-recalculates the table layout (column widths, row sizes) when the container is resized. Applied automatically.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['css(height:18rem;width:24rem)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 },
            { name: 'Charlie', score: 92 }
        ]
    }
];
```

### `table.stretchrow`

<a id="entry-table-stretchrow"></a>

Stretch rows

Stretch native table/tree rows within the body layout.

Adds stretch-row for the native table template’s row-sizing rule.

This is sizing, not fixed-height virtualization; choose fixedrowheight/fixednodeheight when virtualization is required.

Stretches table rows to fill the available container height, distributing empty space evenly.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.stretchrow'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.stripy`

<a id="entry-table-stripy"></a>

Zebra stripes

Apply alternating row surfaces to a table or tree.

Adds stripy and exposes independent odd/even cell background variables.

Positional order: `odd` → `even`.

| Argument | Type | Contract |
| --- | --- | --- |
| `odd` | `string` | Odd-row background |
| `even` | `string` | Even-row background |

Applies zebra-stripe alternating background colors to rows for improved readability.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.stripy(odd:#f8f8f8;even:#ffffff)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 },
            { name: 'Charlie', score: 92 }
        ]
    }
];
```

### `table.gridline`

<a id="entry-table-gridline"></a>

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

Adds grid lines between rows and/or columns.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.gridline(rowWidth:1;colWidth:1;neck:none)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.bento`

<a id="entry-table-bento"></a>

Bento table

Separate table/tree cells with tile-like spacing.

Adds bento and writes margin and radius variables consumed by the native table styling.

The public argument is spelled borderRaidus in this version; preserve that spelling when calling it.

Positional order: `margin` → `borderRaidus`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `margin` | `numberOrString` | `var(--jam-space-xs)` | Margin<br>Unit: `rem` |
| `borderRaidus` | `numberOrString` | `var(--jam-border-radius-s)` | Corner radius<br>Unit: `rem` |

Separates table cells into rounded bento-style blocks.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.bento'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.headless`

<a id="entry-table-headless"></a>

No table header

Hide the table header visually.

Adds hide-thead; the native table stylesheet hides the thead slot while retaining the column definitions and table data. The neck slot remains visible.

Keep the meaning of columns accessible when removing visible headings.

Renders the table without a visible header row. Header cells are hidden while data remains intact.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.headless'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.xscrollable`

<a id="entry-table-xscrollable"></a>

Horizontal scrolling

Scroll a wide native table horizontally while preserving its header alignment.

Adds x-scrollable, forwards frozen-column counts to the table and couples header/body horizontal scrolling.

Use the native table with columns and a constrained viewport; the style relies on its header/body slots.

Positional order: `freezeLeft` → `freezeRight`.

| Argument | Type | Contract |
| --- | --- | --- |
| `freezeLeft` | `number` | Freeze left columns |
| `freezeRight` | `number` | Freeze right columns |

Enables horizontal scrolling for wide tables with support for frozen (locked) columns on either side.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.xscrollable(freezeLeft:1)'],
        data: [
            { name: 'Alice', math: 95, physics: 88, chemistry: 91 },
            { name: 'Bob', math: 87, physics: 84, chemistry: 79 }
        ]
    }
];
```

### `table.fixedrowheight`

<a id="entry-table-fixedrowheight"></a>

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

Enables virtual scrolling for large datasets by fixing row heights to a specific value. Supports animated entry effects.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.fixedrowheight(height:2.5rem;animation:fade-in-;duration:300)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.hovermarker`

<a id="entry-table-hovermarker"></a>

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

Highlights the hovered row, column, or cell with a locator outline.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.hovermarker(type:row;glow:3)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.hoverhighlight`

<a id="entry-table-hoverhighlight"></a>

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

Applies a highlight background color to the hovered row and optionally to the hovered column.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.hoverhighlight(color:rgba(0,120,255,0.08);column:true)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.showrownum`

<a id="entry-table-showrownum"></a>

Automatic table row numbers

Display row sequence markers beside native table rows.

Adds show-rownum plus the selected pill/plain/stroke variant and optional marker padding.

These are display sequence numbers, not stable record identities.

Positional order: `padding` → `style`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | Not supplied | Left spacing<br>Unit: `em` |
| `style` | `string` | `pill` | Style<br>Options: `pill` — Pill, `plain` — Plain, `stroke` — Stroke |

Displays automatic row numbers in a dedicated column before the data columns.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.showrownum(style:pill)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.showscrollprogress`

<a id="entry-table-showscrollprogress"></a>

Scroll progress

Show body-scroll position as a thin table progress bar.

Creates a native progress element in the table neck and updates it from the body slot’s scroll progress; removal releases the bar and listener.

Shows scroll position, not data-loading or pagination completion.

Positional order: `height` → `color`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `height` | `numberOrString` | `0.1` | Height<br>Unit: `rem` |
| `color` | `string` | Not supplied | Color |

Shows a progress bar at the top of the table body that tracks vertical scroll position.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.showscrollprogress(height:0.15rem;color:var(--jam-ac-color))'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.showpageinfo`

<a id="entry-table-showpageinfo"></a>

Show page information

Identify the reserved page-information entry.

The current entry has an empty plugin list and produces no page information.

Do not choose this as a working pagination/status feature. Compose page information explicitly from the table pagination state.

Reserved no-op in this version: it has no plugins and produces no page information. Compose status from the table's actual pagination state. Do not choose this marker as a working pagination feature.

### `table.markdown`

<a id="entry-table-markdown"></a>

markdown

Use the table’s Markdown presentation.

Adds markdown for the native table Markdown stylesheet.

This does not parse arbitrary Markdown into table data; supply the normal native table model.

Applies markdown-friendly styling to the table, adapting header and cell appearance for markdown-rendered content.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.markdown'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.thead`

<a id="entry-table-thead"></a>

Table header style

Customize a native table header surface.

Applies a header image and/or color-derived background, foreground and hover/active variables.

Prefer the token-based accent, tint or elevated header preset when it matches the design intent.

Positional order: `color` → `image`.

| Argument | Type | Contract |
| --- | --- | --- |
| `color` | `string` | Color |
| `image` | `string` | Background image |

Customizes table header background color or image. Sub-variants provide preset header tinting.

The header treatment also computes readable text and hover/active colors.

Sub-variants:

-   **`table.thead.hide`** — hides the table header
-   **`table.thead.tint`** — tinted header preset
-   **`table.thead.accent`** — accent-colored header preset
-   **`table.thead.elevated`** — elevated header preset

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.thead(color:primary)', 'table.gridline(neck:none)'],
        data: [
            { name: 'Alice', score: 95 },
            { name: 'Bob', score: 87 }
        ]
    }
];
```

### `table.autopercent`

<a id="entry-table-autopercent"></a>

Table column percentages

Automatically select progress cells for percentage-named columns.

When the style activates, waiting for theadsset readiness if needed, tests the current header captions with matcher and changes matching header cell types to progress.

This mutates header types without converting values. It does not subscribe to later theadsset events, so rebuilding headers alone does not re-run the conversion.

Positional order: `matcher`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `matcher` | `string` | `(占比\|百分比\|%)` | Matcher |

Automatically converts cells containing percentage-like text into progress bar indicators.

```javascript jaml-playground
export default [
    {
        type: 'table',
        styles: ['table.autopercent'],
        data: [
            { name: 'Completion', 占比: 75 },
            { name: 'Progress', 占比: 42 }
        ]
    }
];
```

Row details share grid lines, stripe backgrounds, and bento borders with data rows. Fixed-row-height tables render the full visible body while a detail panel is expanded so its height can remain natural. See [row details](../JAM-UI/table.md#row-details-and-nested-rows).

## `table.grid`

<a id="entry-table-grid"></a>

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

## `table.text`

<a id="entry-table-text"></a>

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

## `table.color`

<a id="entry-table-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `table.inline`

<a id="entry-table-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `table.td.text`

<a id="entry-table-td-text"></a>

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

## `table.th.text`

<a id="entry-table-th-text"></a>

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

## `table.td.color`

<a id="entry-table-td-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `table.th.color`

<a id="entry-table-th-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `table.icon.text`

<a id="entry-table-icon-text"></a>

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

## `table.td.inline`

<a id="entry-table-td-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `table.text.mono`

<a id="entry-table-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `table.th.inline`

<a id="entry-table-th-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `table.thead.hide`

<a id="entry-table-thead-hide"></a>

Hide table header

Hide the table header visually.

Adds hide-thead; the native table stylesheet hides the thead slot while retaining the column definitions and table data. The neck slot remains visible.

Keep the meaning of columns accessible when removing visible headings.

## `table.thead.tint`

<a id="entry-table-thead-tint"></a>

Tinted table header

Use the tint semantic surface for a table header.

Adds the tint header class; native CSS sets its normal, hover and active theme-token colors.

## `table.tdslot.text`

<a id="entry-table-tdslot-text"></a>

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

## `table.thslot.text`

<a id="entry-table-thslot-text"></a>

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

## `table.color.accent`

<a id="entry-table-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `table.tdslot.color`

<a id="entry-table-tdslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `table.thead.accent`

<a id="entry-table-thead-accent"></a>

Accent-colored table header

Use the accent semantic surface for a table header.

Adds the accent header class; native CSS sets its normal, hover and active theme-token colors.

## `table.thslot.color`

<a id="entry-table-thslot-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `table.tdslot.inline`

<a id="entry-table-tdslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `table.tdslot.layout`

<a id="entry-table-tdslot-layout"></a>

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

## `table.thslot.inline`

<a id="entry-table-thslot-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `table.thslot.layout`

<a id="entry-table-thslot-layout"></a>

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

## `table.capslot.layout`

<a id="entry-table-capslot-layout"></a>

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

## `table.thead.elevated`

<a id="entry-table-thead-elevated"></a>

Elevated table header

Use the elevated semantic surface for a table header.

Adds the elevated header class; native CSS sets its normal, hover and active theme-token colors.

## `table.background.tint`

<a id="entry-table-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `table.iconslot.layout`

<a id="entry-table-iconslot-layout"></a>

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

## `table.sortbutton.text`

<a id="entry-table-sortbutton-text"></a>

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

## `table.extraslot.layout`

<a id="entry-table-extraslot-layout"></a>

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

## `table.labelslot.layout`

<a id="entry-table-labelslot-layout"></a>

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

## `table.sortbutton.color`

<a id="entry-table-sortbutton-color"></a>

Notes: [`color`](common/color.md#entry-color).

Positional order: `h` → `s` → `l` → `a` → `color`.

| Argument | Type | Contract |
| --- | --- | --- |
| `h` | `numberOrString` | Hue |
| `s` | `numberOrString` | Saturation |
| `l` | `numberOrString` | Lightness |
| `a` | `numberOrString` | Opacity |
| `color` | `string` | Color<br>Shorthand |

## `table.sortbutton.inline`

<a id="entry-table-sortbutton-inline"></a>

Inline layout

Opt the selected target into its framework inline presentation.

Adds jam-inline to the path-selected target.

The selected component or target stylesheet must implement the inline class.

This is a class convention, not an unconditional inline display declaration.

## `table.text.size.l`

<a id="entry-table-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `table.text.size.m`

<a id="entry-table-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `table.text.size.s`

<a id="entry-table-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `table.td.text.mono`

<a id="entry-table-td-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `table.text.size.xl`

<a id="entry-table-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `table.text.size.xs`

<a id="entry-table-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `table.th.text.mono`

<a id="entry-table-th-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `table.text.size.3xl`

<a id="entry-table-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.text.size.4xl`

<a id="entry-table-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.text.size.xxl`

<a id="entry-table-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `table.text.size.xxs`

<a id="entry-table-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `table.td.color.accent`

<a id="entry-table-td-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `table.th.color.accent`

<a id="entry-table-th-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `table.tdslot.text.mono`

<a id="entry-table-tdslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `table.thslot.text.mono`

<a id="entry-table-thslot-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `table.td.background.tint`

<a id="entry-table-td-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `table.th.background.tint`

<a id="entry-table-th-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `table.tdslot.color.accent`

<a id="entry-table-tdslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `table.thslot.color.accent`

<a id="entry-table-thslot-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `table.sortbutton.text.mono`

<a id="entry-table-sortbutton-text-mono"></a>

Monospace

Use the theme monospace font family on the path-selected target.

Nested text.mono presets select sys.typography.fontFamily.mono.

The root text.mono extension instead uses the generic monospace family.

## `table.tdslot.background.tint`

<a id="entry-table-tdslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `table.thslot.background.tint`

<a id="entry-table-thslot-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `table.sortbutton.color.accent`

<a id="entry-table-sortbutton-color-accent"></a>

Strong color

Choose strong foreground emphasis or an accent foreground according to the path.

color.strong uses the strong foreground token; nested color.accent uses the primary foreground token and adds the colored class.

These are different roles. The root color.accent path has a separate color-profile behavior and is not part of this shared preset group.

## `table.sortbutton.background.tint`

<a id="entry-table-sortbutton-background-tint"></a>

Tint

Sets background-color from sys.color.tint.default.

Pair the fill with a foreground role appropriate to that surface. Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

## `table.td.text.size.l`

<a id="entry-table-td-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `table.td.text.size.m`

<a id="entry-table-td-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `table.td.text.size.s`

<a id="entry-table-td-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `table.th.text.size.l`

<a id="entry-table-th-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `table.th.text.size.m`

<a id="entry-table-th-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `table.th.text.size.s`

<a id="entry-table-th-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `table.td.text.size.xl`

<a id="entry-table-td-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `table.td.text.size.xs`

<a id="entry-table-td-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `table.th.text.size.xl`

<a id="entry-table-th-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `table.th.text.size.xs`

<a id="entry-table-th-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `table.td.text.size.3xl`

<a id="entry-table-td-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.td.text.size.4xl`

<a id="entry-table-td-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.td.text.size.xxl`

<a id="entry-table-td-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `table.td.text.size.xxs`

<a id="entry-table-td-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `table.th.text.size.3xl`

<a id="entry-table-th-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.th.text.size.4xl`

<a id="entry-table-th-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.th.text.size.xxl`

<a id="entry-table-th-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `table.th.text.size.xxs`

<a id="entry-table-th-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `table.tdslot.text.size.l`

<a id="entry-table-tdslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `table.tdslot.text.size.m`

<a id="entry-table-tdslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `table.tdslot.text.size.s`

<a id="entry-table-tdslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `table.thslot.text.size.l`

<a id="entry-table-thslot-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `table.thslot.text.size.m`

<a id="entry-table-thslot-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `table.thslot.text.size.s`

<a id="entry-table-thslot-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `table.tdslot.text.size.xl`

<a id="entry-table-tdslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `table.tdslot.text.size.xs`

<a id="entry-table-tdslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `table.thslot.text.size.xl`

<a id="entry-table-thslot-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `table.thslot.text.size.xs`

<a id="entry-table-thslot-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `table.tdslot.text.size.3xl`

<a id="entry-table-tdslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.tdslot.text.size.4xl`

<a id="entry-table-tdslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.tdslot.text.size.xxl`

<a id="entry-table-tdslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `table.tdslot.text.size.xxs`

<a id="entry-table-tdslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `table.thslot.text.size.3xl`

<a id="entry-table-thslot-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.thslot.text.size.4xl`

<a id="entry-table-thslot-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.thslot.text.size.xxl`

<a id="entry-table-thslot-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `table.thslot.text.size.xxs`

<a id="entry-table-thslot-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.

## `table.sortbutton.text.size.l`

<a id="entry-table-sortbutton-text-size-l"></a>

Large

text.size.l uses the l typography size token.

## `table.sortbutton.text.size.m`

<a id="entry-table-sortbutton-text-size-m"></a>

Medium

text.size.m uses the m typography size token.

## `table.sortbutton.text.size.s`

<a id="entry-table-sortbutton-text-size-s"></a>

Small

text.size.s uses the s typography size token.

## `table.sortbutton.text.size.xl`

<a id="entry-table-sortbutton-text-size-xl"></a>

Extra large

text.size.xl uses the xl typography size token.

## `table.sortbutton.text.size.xs`

<a id="entry-table-sortbutton-text-size-xs"></a>

Extra small

text.size.xs uses the xs typography size token.

## `table.sortbutton.text.size.3xl`

<a id="entry-table-sortbutton-text-size-3xl"></a>

Triple extra large

Apply the theme 3xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.3xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.sortbutton.text.size.4xl`

<a id="entry-table-sortbutton-text-size-4xl"></a>

Quadruple extra large

Apply the theme 4xl typography size to the selected content.

Sets font-size from sys.typography.fontSize.4xl.

Combine with the appropriate font, line height, and wrapping behavior; changing font size changes text metrics and can affect wrapping and layout.

## `table.sortbutton.text.size.xxl`

<a id="entry-table-sortbutton-text-size-xxl"></a>

Extra extra large

text.size.xxl uses the xxl typography size token.

## `table.sortbutton.text.size.xxs`

<a id="entry-table-sortbutton-text-size-xxs"></a>

Extra extra small

text.size.xxs uses the xxs typography size token.
