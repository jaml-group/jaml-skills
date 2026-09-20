# table

`Styles.table.*` -- data table elements with rows, columns, sorting, scrolling, and interaction features.

---

## Element styling

### Automatic base behavior

The element installs its internal base style automatically. Use public styles for appearance; no `_basic` entry is needed in authored JAML.

Auto-recalculates the table layout (column widths, row sizes) when the container is resized. Applied automatically.

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["css(height:18rem;width:24rem)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 },
            { "name": "Charlie", "score": 92 }
        ]
    }
]
```

### `table.stretchrow`
Stretches table rows to fill the available container height, distributing empty space evenly.

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.stretchrow"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.stripy`
Applies zebra-stripe alternating background colors to rows for improved readability.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `odd` | `string` | Background color for odd rows | — |
| `even` | `string` | Background color for even rows | — |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.stripy(odd:#f8f8f8;even:#ffffff)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 },
            { "name": "Charlie", "score": 92 }
        ]
    }
]
```

### `table.gridline`
Adds grid lines between rows and/or columns.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `rowWidth` | `number \| string` | Grid line width for rows | Unit: px |
| `colWidth` | `number \| string` | Grid line width for columns | Unit: px |
| `color` | `string` | Grid line color | — |
| `outlineWidth` | `number \| string` | Outer border width around the grid | Unit: px |
| `outlineColor` | `string` | Outer border color | Defaults to `color` |
| `neck` | `string` | Corner/neck style | Default: `'small'`. Options: `auto`, `small`, `none`, or a CSS length |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.gridline(rowWidth:1;colWidth:1;neck:none)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.bento`

Separates table cells into rounded bento-style blocks.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `margin` | `number \| string` | Space around each cell | Numbers use `rem`; default: `var(--jam-space-xs)` |
| `borderRaidus` | `number \| string` | Cell border radius | Numbers use `rem`; default: `var(--jam-border-radius-s)` |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.bento"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.headless`
Renders the table without a visible header row. Header cells are hidden while data remains intact.

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.headless"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.xscrollable`
Enables horizontal scrolling for wide tables with support for frozen (locked) columns on either side.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `freezeLeft` | `number` | Number of columns to freeze on the left | — |
| `freezeRight` | `number` | Number of columns to freeze on the right | — |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.xscrollable(freezeLeft:1)"],
        "data": [
            { "name": "Alice", "math": 95, "physics": 88, "chemistry": 91 },
            { "name": "Bob", "math": 87, "physics": 84, "chemistry": 79 }
        ]
    }
]
```

### `table.fixedrowheight`
Enables virtual scrolling for large datasets by fixing row heights to a specific value. Supports animated entry effects.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `height` | `number \| string` | Fixed row height | Default: `2.5rem`. Shorthand. |
| `padding` | `number` | Extra padding rows rendered offscreen | Default: `10` (or `0` when animation is on) |
| `animation` | `boolean \| string` | Enable entry animation | Default: `'fade-in-'` |
| `easing` | `string` | CSS easing for animations | Default: `'ease'` |
| `duration` | `number` | Animation duration in ms | Default: depends on threshold |
| `tileduration` | `number` | Tile-style staggered animation delay | Default: `0` |
| `tilerandom` | `boolean` | Randomize tile animation order | Default: `false` |
| `defaultDirection` | `string` | Default entry direction | Default: `'up'`. Options: `up`, `down`, `right`, `left` |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.fixedrowheight(height:2.5rem;animation:fade-in-;duration:300)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.hovermarker`
Highlights the hovered row, column, or cell with a locator outline.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Marker type | Default: `'row'`. Options: `row`, `column`, `td` |
| `size` | `number` | Locator corner size in px | — |
| `width` | `number \| string` | Border width | Default: `'auto'` |
| `bias` | `number` | Offset inward from edge in px | Default: `0` |
| `glow` | `number` | Glow blur radius in px | Default: `0` |
| `radius` | `number \| string` | Border radius | Default: `'auto'` |
| `delay` | `number` | Delay before showing in ms | Default: `0` |
| `breathe` | `boolean` | Enable breathing pulse | Default: `false` |
| `easing` | `string` | CSS easing for transitions | — |
| `duration` | `number` | Transition duration in ms | — |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.hovermarker(type:row;glow:3)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.hoverhighlight`
Applies a highlight background color to the hovered row and optionally to the hovered column.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Highlight background color | Shorthand. Default: computed accent |
| `active` | `string` | Active/clicked background color | — |
| `overlay` | `boolean` | Render highlight as overlay | Default: `true` |
| `column` | `boolean` | Also highlight the column | Default: `false` |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.hoverhighlight(color:rgba(0,120,255,0.08);column:true)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.showrownum`
Displays automatic row numbers in a dedicated column before the data columns.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `padding` | `number \| string` | Left padding for the row number column | Unit: em |
| `style` | `string` | Visual style of the row number | Default: `'pill'`. Options: `pill`, `plain`, `stroke` |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.showrownum(style:pill)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.showscrollprogress`
Shows a progress bar at the top of the table body that tracks vertical scroll position.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `height` | `number \| string` | Progress bar height | Default: `0.1`. Unit: rem |
| `color` | `string` | Progress bar color | — |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.showscrollprogress(height:0.15rem;color:var(--jam-ac-color))"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.showpageinfo`
Shows pagination page information. Currently a placeholder with no args. Behavior pending implementation.

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.showpageinfo"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.markdown`
Applies markdown-friendly styling to the table, adapting header and cell appearance for markdown-rendered content.

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.markdown"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.thead`
Customizes table header background color or image. Sub-variants provide preset header tinting.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `color` | `string` | Header background color | Also computes readable header text and hover/active colors |
| `image` | `string` | Header background image | CSS image value |

Sub-variants:

- **`table.thead.hide`** — hides the table header
- **`table.thead.tint`** — tinted header preset
- **`table.thead.accent`** — accent-colored header preset
- **`table.thead.elevated`** — elevated header preset

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.thead(color:primary)", "table.gridline(neck:none)"],
        "data": [
            { "name": "Alice", "score": 95 },
            { "name": "Bob", "score": 87 }
        ]
    }
]
```

### `table.autopercent`
Automatically converts cells containing percentage-like text into progress bar indicators.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `matcher` | `string` | Regex pattern to detect percentage columns | Default: `'(占比\|百分比\|%)'` |

```json jaml-playground
[
    {
        "type": "table",
        "styles": ["table.autopercent"],
        "data": [
            { "name": "Completion", "占比": 75 },
            { "name": "Progress", "占比": 42 }
        ]
    }
]
```

Row details share grid lines, stripe backgrounds, and bento borders with data rows. Fixed-row-height tables render the full visible body while a detail panel is expanded so its height can remain natural. See [row details](../JAM-UI/table.md#row-details-and-nested-rows).
