# table

**Class:** `TomatoTable` · **Type:** `"table"` · **Extends:** `AbstractOptionElement`

A feature-rich data table with column headers, sorting, filtering, frozen columns, row selection (radio/checkbox), drag-to-select rows, hover indicators, and custom cell rendering.

| Type shorthand | Selection behavior |
|---|---|
| `"table"` (default) | No row selection |
| `"table-radio"` | Single-row selection via radio |
| `"table-checkbox"` | Multi-row selection via checkbox |

---

## JAML usage

```json jaml-playground
{
  "type": "table",
  "cap": "Users",
  "data": [
    { "name": "Alice",   "role": "Admin", "score": 98 },
    { "name": "Bob",     "role": "User",  "score": 72 },
    { "name": "Charlie", "role": "User",  "score": 85 }
  ]
}
```

### Theme style variant

Set the inherited native `variant` param to opt into the active theme's alternate table recipe. The built-in recipe accents the header and shows row numbers; a theme may replace that selector with its own treatment.

```json
{ "type": "table", "variant": "standard", "data": [{ "name": "Alice" }] }
```

See [Theme Style Variants](../Theme/theme.md#theme-style-variants).

---

## Params

Inherits all params from [AbstractOptionElement](./JAM-UI.md#section-3--abstractoptionelement).

| Param | Type | Default | Description |
|---|---|---|---|
| `theads` / `dataDef` / `columns` | `ThOption[]` | auto-detected | Column header definitions. Auto-detected from data keys if not provided. See column config below. |
| `click2Check` | `boolean` | `false` | Clicking a row selects it (same as clicking the row's checkbox/radio). |
| `valueIndex` | `number` | `-1` | Column index to use as the row value. `-1` uses the whole row. |
| `freezeLeft` | `number` | `0` | Number of columns to freeze on the left (sticky positioning). |
| `freezeRight` | `number` | `0` | Number of columns to freeze on the right (sticky positioning). |
| `startRow` | `number` | `1` | Starting row number for paginated display. Setting this auto-enables `paginated`. |
| `hoveringRow` | `number` | — | Get/set the currently hovered row index. |
| `hoveringCol` | `number` | — | Get/set the currently hovered column index. |
| `rowHolder` | `HTMLElement \| string` | — | Custom element injected as a row background/holder. |
| `colHolder` | `HTMLElement \| string` | — | Custom element injected as a column background/holder. |
| `rowDecor` | `HTMLElement \| string` | — | Row decoration element (e.g. highlight bar). |
| `colDecor` | `HTMLElement \| string` | — | Column decoration element. |
| `widthAdjustLimit` | `number` | `20` | Minimum column width (px) for user drag-to-resize. |

### Row hooks

| Hook | Signature | Description |
|---|---|---|
| `ontdbuild` | `(td: TomatoTd) => void` | Called when a cell DOM is built — use to customize cell content/style. |
| `ontdclick` | `(td: TomatoTd) => void` | Called when any cell is clicked. |
| `onrowclick` | `(rowValue: any[]) => void` | Called when a row is clicked. Receives the row data array. |
| `onsortclick` | `(th: TomatoTh, asc: boolean \| null) => void` | Called when a column sort header is clicked. |

---

## Column headers (`ThOption`)

Columns are defined via the `theads` param, or auto-detected from data keys when theads is not provided.

| Field | Type | Default | Description |
|---|---|---|---|
| `cap` | `string` | — | Column header label text. |
| `key` | `string` | — | Data key to read from each row object when data is an array of objects. |
| `width` | `string` | — | Column width (CSS value, e.g. `'120px'`, `'2fr'`, `'minmax(80px, auto)'`). |
| `align` | `string` | `'left'` | Cell text alignment: `'left'`, `'center'`, `'right'`. |
| `type` | `string` | `'text'` | Cell content type: `'text'`, `'number'`, `'datetime'`, or a JAM-UI element type for custom cell rendering. |
| `sortable` | `boolean` | `true` | Show sort buttons in the column header. |
| `sort` | `string` | `'none'` | Initial sort direction: `'none'`, `'ascend'`, `'descend'`. |
| `sortMethod` | `Function` | — | Custom sort comparator function. |
| `filterable` | `boolean` | `false` | Enable filter dropdown in the column header. |
| `mergable` | `boolean \| 'noLimit'` | `false` | Merge cells with identical consecutive values in this column. |
| `isKey` | `boolean` | `false` | Mark this column as the primary key (used for row identity tracking). |
| `showAtWidth` | `number` | — | Hide column when the table is narrower than this value (in px). |
| `formatter` | `Function` | — | Transform cell value for display. Can return a string or a JAML element option object via `jame()` to render interactive components (e.g. `jame({ type: 'checkbox', ... })`). |
| `menu` | `Dictionary` | — | Map raw values to display labels (value-to-label mapping). |
| `hidden` | `boolean` | `false` | Hide the column entirely. |
| `hide` | `boolean` | `false` | Alias for hidden. |
| `order` | `number` | — | Column display order index. |

---

## dataDef as JAML

Each entry in `dataDef` (a `ThOption`) serves dual purpose: column header configuration and JAML cell construction options. The table separates control keys used for the column header from the remaining keys, which are forwarded as JAML element parameters to each cell in that column.

**Control keys** (extracted from `ThOption` and used for column header behavior):

`type`, `width`, `align`, `sort`, `sortable`, `sortPriority`, `mergable`, `filterable`, `filter`, `menu`, `key`, `colIdx`, `order`, `showAtWidth`, `ontdbuild`, `table`, `value`, `id`, `styles`

**Forwarded params** (everything else in the `ThOption` is passed to each cell's DOM element):

When `type` is a JAM-UI element type (e.g. `"indicator"`, `"switch"`, `"checkbox"`, `"button"`, `"progress"`), every cell in that column is constructed as that element type. The remaining keys from the `dataDef` entry are set as params on that element via `ElementFactory`. This enables rich interactive columns without custom rendering logic.

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Rich Columns',
  dataDef: [
    { cap: 'Name', key: 'name' },
    {
      cap: 'Active',
      key: 'active',
      type: 'switch',
      onvaluechange: function (value) {
        // each cell is a <jam-switch> element
        // `this` refers to the switch element
        console.log('Toggled:', value, 'at row:', this.jamtd.pKey);
      }
    },
    {
      cap: 'Status',
      key: 'status',
      type: 'indicator',
      styles: [
        'indicator.circle',
        'color.stateMap({colors:{good:"green",bad:"red"}})'
      ],
      valueStates: {
        good: (value) => value === 'good',
        bad: (value) => value === 'bad'
      }
    }
  ],
  data: [
    { name: 'Alice', active: true, status: 'good' },
    { name: 'Bob', active: false, status: 'bad' }
  ]
}
```

In the example above:
- The `Active` column uses `type: 'switch'`, so each cell is a `<jam-switch>`. The `onvaluechange` handler and any other non-control params are forwarded to the switch element.
- The `Status` column uses `type: 'indicator'`, so each cell is a `<jam-indicator>`. `valueStates` derives `good` or `bad` from the cell value, and the `color.stateMap` style maps that state to the indicator's accent color.

### formatter returning JAML elements

The `formatter` function in a `ThOption` can return not just a string label, but a full JAML element option object via `jame()`. This allows cell values to be rendered as interactive components dynamically.

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Actions',
  dataDef: [
    { cap: 'Name', key: 'name' },
    {
      cap: 'Actions',
      key: 'actions',
      formatter: function(value, rowData) {
        // Return a JAML element option, not just a string
        return jame({
          type: 'checkbox',
          cap: value,
          onvaluechange: function() {
            console.log('Row:', this.jamtd.pKey, 'Action:', value);
          }
        });
      }
    }
  ],
  data: [
    { name: 'Alice', actions: 'Approve' },
    { name: 'Bob', actions: 'Review' }
  ]
}
```

### Using `ontdbuild` for custom cell setup

The `ontdbuild` callback fires after each cell's DOM is constructed, giving access to the cell's `TomatoTd` instance and its bound methods (see Table cell API below).

### Column-level `styles`

The `styles` property on a `ThOption` registers a scoped stylesheet class for that column. Cells in the column receive a `cid-{colIdx}` class. This is processed by `registerExternalStyles('childStyles', ...)` in the table constructor.

---

## `rowProfile` — row states

`table.rowProfile` is a `Map<PKey, RowState>` tracking state per row key.

| RowState | Description |
|---|---|
| `'default'` | Normal, unmodified row |
| `'new'` | Row added during data update |
| `'expired'` | Row removed during data update |
| `'updated'` | Row value changed during data update |
| `'checked'` | Row is selected (checkbox/radio) |

---

## Slots

| Slot | Binder | Description |
|---|---|---|
| `label` | — | Table title area (icon + cap) via `Templates.label`. |
| `thead` | — | Column header row. Auto-populated from `theads`. |
| `tneck` | — | Slot between thead and tbody (for custom filter rows, etc.). |
| `tbody` | default, binder | Table body. Auto-populated from `data`. |
| `tfoot` | — | Table footer row. |

---

## Instance methods

### Data & display

| Method | Description |
|---|---|
| `table.redraw()` | Rebuild thead and tbody from current data/theads. Debounced 50ms. |
| `table.clear(theadOnly?)` | Clear the table. Pass `true` to clear only headers. |
| `table.recalculateSize()` | Recalculate column widths to fit content. |
| `table.adjustWidth(col, delta)` | Manually adjust a column's width by `delta` pixels. |

### Row/column access

| Method | Description |
|---|---|
| `table.getRow(pKey)` | Get all cells (`TomatoTd[]`) for a row by primary key. |
| `table.getDrawedRow(pKey)` | Get only rendered cells for a row. |
| `table.getColumn(colIdx)` | Get all cells for a column by index. |
| `table.getDrawedColumn(colIdx)` | Get only rendered cells for a column. |
| `table.locateTd(pKey, colIdx)` | Find a specific cell element by row key and column index. |

### Selection

| Method | Description |
|---|---|
| `table.getCheckedRows()` | Get full row data for all checked rows. |
| `table.getCheckedValue()` | Get the values of checked rows (based on `valueIndex`). |
| `table.setCheckedRows(pKeys)` | Programmatically set which rows are checked by primary key. |
| `table.toggleCheckRow(pKey, force?, updateValue?)` | Toggle check state of a specific row. `updateValue` defaults to `false`; pass `true` to synchronize the input value and its change notification. |

### Sorting & filtering

| Method | Description |
|---|---|
| `table.sortTable(th?)` | Sort by a column. If no `th` is passed, re-applies current sorters. |
| `table.filter(condition)` | Apply a `(value, row) => boolean` callback. Without a column, `value` is `undefined` and `row` is the array of cell values. Use `filter(colIdx, condition)` to receive that column's value, or pass a `Map<number, FilterCallback>`. |
| `table.resetFilter()` | Clear all active filters. |

---

## Table cell API

### Accessors bound to cell DOM elements

When cells are built via `ElementFactory` based on the column `type`, the following accessors are bound to each cell's DOM element via `Object.defineProperties` (see `TomatoTh.bindMethods`, lines 391-436). Inside element callbacks (`onvaluechange`, `formatter`, `onclick`, etc.), these are accessible as `this.col(...)`, `this.rowData`, etc.

| Property | Type | Description |
|---|---|---|
| `this.jamtd` | `TomatoTd` | The current table cell data object. Provides access to `value`, `pKey`, `colIdx`, `th`, `table`, `row`, `col`, `dom`, and other cell properties. |
| `this.col(colIdx)` | `function` | Get the value from another column in the **same row** by column index. Example: `this.col(0)` returns the first column's value. |
| `this.row(pKey)` | `function` | Get the value from another row in the **same column** by primary key. Example: `this.row(2)` returns this column's value for the row with pKey `2`. |
| `this.params` | `Dictionary` | The column's full `ThOption` params (all keys from the `dataDef` entry excluding control keys). |
| `this.rowData` | `Dictionary` | The current row's data as a key-value object, keyed by column `cap` / `name` / `key`. |
| `this.colHolder` | `HTMLElement` | The column holder element (background/styling element injected behind this column). |
| `this.colDecor` | `HTMLElement` | The column decor element (e.g. a highlight bar at the column edge). |
| `this.rowHolder` | `HTMLElement` | The row holder element (background/styling element injected behind this row). |
| `this.rowDecor` | `HTMLElement` | The row decor element (e.g. a highlight bar at the row edge). |
| `this.cmpt` | `Component` | The JAML `Component` that built the table (useful for creating scoped stylesheets). |
| `this.model` | `Model` | The root JAML `Model` instance. |

### TomatoTd properties

Each cell is a `TomatoTd` instance, accessible via `this.jamtd` or the return value of methods like `table.locateTd()`. Key properties:

| Property | Type | Description |
|---|---|---|
| `td.value` | `any` | Get or set the cell's displayed value. Setting triggers DOM update via `setParams()`. |
| `td.pKey` / `td.rowIdx` | `PKey` | The row's primary key — a numeric index by default, or a composite string key when `isKey` columns are defined. |
| `td.colIdx` | `number` | The column's index in the original `dataDef` array. |
| `td.th` | `TomatoTh` | The column header object for this cell's column. |
| `td.table` | `TomatoTable` | The parent table instance. |
| `td.checked` | `boolean` | Get or set whether the row is checked (for checkbox/radio tables). |
| `td.row` | `number` | Visual row position (1-based, after filtering and sorting). |
| `td.col` | `number` | Visual column position (1-based, after column reordering and hiding). |
| `td.rowspan` | `number` | Row span for merged cells. |
| `td.colspan` | `number` | Column span for merged cells. |
| `td.dom` | `HTMLElement` | The cell's DOM element. |
| `td.holder` | `HTMLElement` | The row holder element for this cell. |
| `td.decor` | `HTMLElement` | The row decor element for this cell. |
| `td.state` | `RowState` | The row's state from `table.rowProfile`: `'default'`, `'new'`, `'expired'`, `'updated'`, or `'checked'`. |
| `td.mergedWithUpper` | `boolean` | Whether this cell is merged with the cell above it (used by `mergable`). |
| `td.upperTd` | `TomatoTd` | The cell directly above this one in the same column (for merge traversal). |
| `td.lowerTd` | `TomatoTd` | The cell directly below this one in the same column. |
| `td.leftTd` | `TomatoTd` | The cell to the left in the same row. |
| `td.rightTd` | `TomatoTd` | The cell to the right in the same row. |
| `td.mergedWith` | `TomatoTd[]` | Array of all `TomatoTd` instances in the same merged block (includes this cell). |

### Additional table properties

| Property | Type | Description |
|---|---|---|
| `table.rowTotal` | `number` | Total number of visible (non-filtered, non-excluded) rows. |
| `table.sortedPKeys` | `PKey[]` | Array of all row primary keys in current sort order. |
| `table.pKeys2Draw` | `PKey[]` | Array of row keys currently visible after filtering and sort. |
| `table.th2Draw` | `TomatoTh[]` | Array of column headers currently visible (not hidden, sorted by `order`). |
| `table.colIndices2Draw` | `number[]` | Indices of currently visible columns in draw order. |

---

## Examples

### Column definitions with sorting and filtering

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Employees',
  theads: [
    { cap: 'Name',  key: 'name',  sortable: true },
    { cap: 'Role',  key: 'role',  filterable: true },
    { cap: 'Score', key: 'score', sortable: true, type: 'number' }
  ],
  data: [
    { name: 'Alice',   role: 'Admin', score: 98 },
    { name: 'Bob',     role: 'User',  score: 72 },
    { name: 'Carol',   role: 'Admin', score: 85 }
  ]
}
```

### Row selection with checkbox (drag-to-select)

```json jaml-playground
{
  "type": "table-checkbox",
  "cap": "Select Items",
  "click2Check": true,
  "theads": [
    { "cap": "ID",   "key": "id",   "isKey": true },
    { "cap": "Name", "key": "name" }
  ],
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" },
    { "id": 3, "name": "Carol" }
  ],
  "valueIndex": 0
}
```

### Frozen columns and custom cell styling (ontdbuild)

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Scoreboard',
  freezeLeft: 1,
  freezeRight: 1,
  theads: [
    { cap: '#',         key: 'rank', width: '50px' },
    { cap: 'Name',      key: 'name', width: '120px' },
    { cap: 'Score',     key: 'score', width: '80px', align: 'right' },
    { cap: 'Status',    key: 'status', width: '100px' },
    { cap: 'Actions',   key: 'actions', width: '100px' }
  ],
  data: [
    { rank: 1, name: 'Alice', score: 98, status: 'Pass', actions: '...' },
    { rank: 2, name: 'Bob',   score: 72, status: 'Retake', actions: '...' }
  ],
  ontdbuild: function(td) {
    if (td.colIdx === 2) {
      const score = td.value
      if (score >= 90) td.dom.style.color = 'green'
      else if (score < 75) td.dom.style.color = 'red'
    }
  }
}
```

### Merged cells and pagination

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Orders',
  startRow: 1,
  theads: [
    { cap: 'Category', key: 'cat', mergable: true },
    { cap: 'Item',     key: 'item' },
    { cap: 'Price',    key: 'price', align: 'right' }
  ],
  data: [
    { cat: 'Electronics', item: 'Laptop',  price: 1299 },
    { cat: 'Electronics', item: 'Mouse',   price: 29 },
    { cat: 'Books',       item: 'Novel',   price: 15 },
    { cat: 'Books',       item: 'Guide',   price: 25 }
  ]
}
```

### Row click handler with custom data

```javascript jaml-playground
export default {
  type: 'table',
  cap: 'Inventory',
  data: [
    { name: 'Widget A', stock: 42, sku: 'W-001' },
    { name: 'Widget B', stock: 15, sku: 'W-002' }
  ],
  onrowclick: function(rowData) {
    console.log('Row clicked:', rowData)
    // rowData is the array of cell values for the clicked row
  }
}
```

---

## Notes

- Primary keys (`pKeys`) are computed from row indices or from columns marked `isKey` in the theads definition.
- The `checkAll` switch in the header toggles all visible rows. It appears in `indeterminate` state when a subset of rows is checked.
- Sorting and filtering are applied cumulatively. Filters use `Map<number, FilterCallback>` by column index.
- When `mergable` is set on a column, consecutive rows (after sorting) with the same value are visually merged into a single cell.
- Column widths are user-adjustable via drag handles between headers. `widthAdjustLimit` sets the minimum width in px.
- The `alternateDraw` hook (from `AbstractElement`) can be assigned for custom rendering strategies (e.g., virtual scrolling).

## Grouped headers

Set `group` on adjacent `dataDef` entries to place them under one shared header. Ungrouped columns span the header rows. Equal adjacent labels merge within each frozen or scrolling section; a frozen-column boundary splits a group.

```json jaml-playground
{
  "type": "table",
  "dataDef": [
    { "key": "name", "cap": "Name" },
    { "key": "load", "cap": "Load", "group": "Operation" },
    { "key": "status", "cap": "Status", "group": "Operation" }
  ],
  "data": [{ "name": "Station A", "load": 72, "status": "Online" }]
}
```

## Row details and nested rows

`onrowdetailbuild(container, pKey)` builds a detail panel on its first expansion. The panel is retained through folding so input state survives reopening, and released when the row is removed. The detail uses the free columns after any cells spanning from earlier rows.

```javascript jaml-playground
export default {
  type: 'table',
  styles: ['table.gridline'],
  dataDef: [
    { key: 'id', cap: 'ID', isKey: true },
    { key: 'name', cap: 'Name' },
    { key: 'detail', cap: 'Details', type: 'wrapper', components: [{ usage: 'toggleRowDetail' }] }
  ],
  data: [{ id: 'station-a', name: 'Station A' }],
  onrowdetailbuild(container, pKey) {
    jam.render(container, { type: 'input-textarea', cap: `Notes for ${pKey}`, rows: 3 });
  }
}
```

Object rows can contain a `children` array. Define stable primary keys with `isKey`, and place a `toggleRowChildren` or `toggleRowChildrenIcon` usage in the node column. Sorting keeps descendants under their parents. Filtering reveals matching descendants with their ancestors; expansion is held while filters are active.

| Method / event | Description |
|---|---|
| `canExpandRow(pKey)` | Whether a visible row has a detail builder and free columns for its panel |
| `isRowExpanded(pKey)` / `toggleRowDetail(pKey, force?)` | Inspect or change detail expansion; toggle returns the resulting state |
| `getRowDetail(pKey)` | Get the retained lazy detail object, if created |
| `hasExpandedRowDetails` | Whether a visible detail panel is expanded |
| `hasRowChildren(pKey)` / `getRowLevel(pKey)` | Inspect the hierarchy; root level is zero |
| `isRowChildrenExpanded(pKey)` / `toggleRowChildren(pKey, force?)` | Inspect or change descendant visibility |
| `rowdetailchange` / `rowchildrenchange` | Events with `{ pKey, expanded }` in `event.detail` |
| `getCheckedOptions()` | Selected rows as arrays of `{ name, value }` cell options |
| `getCheckedDoms()` | Selected rows' rendered cell DOMs |

`table.fixedrowheight` temporarily renders the full visible body while details are expanded, allowing panels to use their natural height. Virtual scrolling resumes when all visible detail panels are folded. Grid lines, stripes, and bento styling also apply to detail panels.
