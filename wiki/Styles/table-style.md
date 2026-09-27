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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.stripy`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.gridline`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.bento`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.xscrollable`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.fixedrowheight`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.hovermarker`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.hoverhighlight`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.showrownum`.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.showscrollprogress`.

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

Reserved no-op in this version: it has no plugins and produces no page information. Compose status from the table's actual pagination state. Do not choose this marker as a working pagination feature.

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.thead`.

The header treatment also computes readable text and hover/active colors.

Sub-variants:

-   **`table.thead.hide`** — hides the table header
-   **`table.thead.tint`** — tinted header preset
-   **`table.thead.accent`** — accent-colored header preset
-   **`table.thead.elevated`** — elevated header preset

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

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style table.autopercent`.

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
