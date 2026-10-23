# common.grid

<!-- Generated from native authoring; do not edit. -->

[中文](grid.zh.md)

`Styles.grid.*` — CSS grid container properties.

---

## Variants

### `grid`

<a id="entry-grid"></a>

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
| `area` | `string` | Grid area |

The base helper maps track and area arguments to CSS grid properties. Set `display:grid` on the container separately; `grid.area` maps row/column placement on its items.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['css(display:grid)', 'grid(templateColumns:1fr 1fr 1fr;gap:1rem)'],
        components: [
            { type: 'label', cap: 'A' },
            { type: 'label', cap: 'B' },
            { type: 'label', cap: 'C' }
        ]
    }
];
```

### `grid.area`

<a id="entry-grid-area"></a>

Grid area

Uses the grid-area shorthand order; Styles.layout.gridpos instead specifies position as left/top/width/height

Place an item by grid start coordinates and spans.

Writes grid-row-start, grid-column-start, and span-based row and column ends.

The target must be a grid item; supply meaningful spans because the factory interpolates them directly.

Apply to the item, while the parent owns grid track definitions.

Positional order: `rowStart` → `colStart` → `rowSpan` → `colSpan`.

| Argument | Type | Contract |
| --- | --- | --- |
| `rowStart` | `number` | Row start |
| `colStart` | `number` | Column start |
| `rowSpan` | `number` | Row end |
| `colSpan` | `number` | Column end |

Explicit grid placement for an item using row and column start/span.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Grid item',
        styles: ['grid.area(rowStart:1;colStart:2;rowSpan:1;colSpan:2)']
    }
];
```

## `grid.resizable`

<a id="entry-grid-resizable"></a>

Resize explicit grid tracks

Adjacent tracks exchange size while preserving their pair total. The first nonzero drag converts the affected axis to proportional tracks.

Requires explicit supported grid tracks and placements, horizontal writing and LTR. Row resizing requires a bounded height.

Shares the host grid controller. Cancellation restores the pre-gesture template; cleanup preserves newer external sizing.

Responsive auto-repeat, implicit or ambiguous tracks and virtualized child layouts do not support interactive resizing. Use interact.resizable for element sizing.

Positional order: `columns` → `rows` → `minSize`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `columns` | `boolean` | `true` | Enable column boundary resizing |
| `rows` | `boolean` | `false` | Enable row boundary resizing |
| `minSize` | `numberOrString` | `1rem` | Minimum track size; numeric values use rem<br>Unit: `rem` |

## `grid.virtualScroll`

<a id="entry-grid-virtualscroll"></a>

Grid virtual scrolling with fixed row height

Virtualize a regular grid of component children.

Uses the component child-rendering controller with SaigonGrid, reserving fixed-height rows and mounting visible/buffered cells while retaining component identity.

Requires component-owned children, a positive fixed height and a bounded scroll viewport with regular grid columns.

Use layout.lazyload for variable-height vertical content and table.fixedrowheight for native table rows.

The grid controller owns cell positions; arbitrary per-cell row spans and freeform placement do not fit its regular row model.

Positional order: `height` → `gap` → `buffer` → `scrollTarget`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `height` | `numberOrString` | `2.5rem` | Line height<br>Unit: `rem`<br>Shorthand |
| `gap` | `numberOrString` | Not supplied | Grid gap<br>Unit: `rem` |
| `buffer` | `number` | `2` | Rows retained outside the viewport |
| `scrollTarget` | `string` | Not supplied | Scroll target |
