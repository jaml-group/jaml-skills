# SaigonScroll — Virtual Scrolling Plugin

A virtual scrolling engine that renders only visible rows (plus a configurable padding buffer) within a scrollable container. Ideal for large lists, grids, and tables where rendering all rows would be prohibitively expensive.

---

## Style Usage

```json jaml-playground
{
  "type": "table",
  "styles": ["interact.virtualScroll(height:2.5rem;padding:5)"],
  "data": [["col1"], ["row1"]]
}
```

---

## Interface

### `LazyChild`

```ts
interface LazyChild {
  buildDom(): HTMLElement;   // Called when the row scrolls into view
  dom?: HTMLElement;         // Set by buildDom — cached DOM reference
  row: number;               // Row index (1-based)
}
```

Each row is represented by a `LazyChild` that lazily creates its DOM via `buildDom()`. The engine calls `buildDom` only when the row enters the visible viewport.

---

## Constructor

```typescript signature
new SaigonScroll(option: SaigonScrollOption)
```

### SaigonScrollOption (extends `RequiredPartial<SaigonScroll, 'fixHeight' | 'getChildrenByRow' | 'getRowNum'>`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `container` | `HTMLElement` | — | The scrollable container element. Required. |
| `fixHeight` | `number` | `0` | Fixed row height in px. Required. Used to calculate visible rows. |
| `getChildrenByRow` | `(container: HTMLElement, row: number) => LazyChild[]` | — | Factory for a given row's children. Required. |
| `getRowNum` | `(container: HTMLElement) => number` | — | Returns total number of rows. Required. |
| `scrollTarget` | `HTMLElement` | `container` | Element that receives the scroll event. Use a child if the container has a separate scroll-body. |
| `throttle` | `number` | `10` | Throttle interval (ms) for scroll callback. |
| `padding` | `number` | `0` | Extra rows rendered above and below the visible range as a buffer. |
| `startRow` | `number` | `1` | Initial row to begin rendering from. |

---

## Instance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `container` | `HTMLElement` | — | Scrollable container. |
| `scrollTarget` | `HTMLElement` | `container` | Scroll event target. |
| `fixHeight` | `number` | `0` | Row height in px. |
| `throttle` | `number` | `10` | Scroll throttle ms. |
| `padding` | `number` | `0` | Buffer rows. |
| `startRow` | `number` | `1` | First visible row. |
| `scrollingDown` | `boolean` | `true` | Whether the user is scrolling downward. |
| `rowCapacity` | `number` | `0` | Number of rows that fit in the visible area. Computed on init. |
| `colCapacity` | `number` | `0` | Column capacity (for grid layouts). |
| `virtual` | `boolean` | `true` | Set to `false` to draw all rows and bypass scroll-window calculations. |

### Computed Properties

| Property | Description |
|----------|-------------|
| `endRow` | Last visible row: `startRow + rowCapacity`. |
| `paddedStartRow` | First buffered row: `max(1, startRow - padding)`. |
| `paddedEndRow` | Last buffered row: `min(totalRows, endRow + padding)`. |

---

## Instance Methods

### `init(): this`

Start the virtual scroll engine. Attaches scroll and resize listeners and performs the initial lazy draw. Returns `this` for chaining.

```typescript signature
init(): this
```

### `destroy(): void`

Tear down — removes scroll and resize listeners.

```typescript signature
destroy(): void
```

### `lazyDraw(scrolling: boolean): Promise<void>`

Manually trigger a draw cycle: removes children outside the padded range and appends children inside it.

```typescript signature
lazyDraw(scrolling: boolean): Promise<void>
```

| Param | Type | Description |
|-------|------|-------------|
| `scrolling` | `boolean` | Whether this draw is triggered by scrolling (affects DOM scheduling). |

### `appendRow(row: number, scrolling: boolean): void`

Build and append all children for a specific row.

```typescript signature
appendRow(row: number, scrolling: boolean): void
```

### `append(child: LazyChild, scrolling: boolean): void`

Append a single `LazyChild`'s DOM to the container. Builds the DOM if needed.

### `remove(child: LazyChild): void`

Remove a single `LazyChild`'s DOM from the container.

### `calcRowCapacity(): number`

Calculate how many rows fit in the visible area (based on `scrollTarget.clientHeight / fixHeight`).

### `shouldDraw(row: number): boolean`

Returns `true` if the row is within the padded range and within total row count.

### `shouldRemove(row: number): boolean`

Returns `true` if the row is outside the padded range.

---

## Callbacks (assigned to instance)

### `scrollCallback`

Throttled scroll handler. Recalculates `startRow` based on `scrollTop / fixHeight` and triggers `lazyDraw`. Automatically bound via `makeThrottle`.

### `resizeCallback`

Handles container resize. Recalculates `rowCapacity` and triggers `lazyDraw` if capacity changed.

---

## Imperative Examples

```ts
import { SaigonScroll } from 'jam-ui';

class MyItem implements LazyChild {
  dom?: HTMLElement;
  constructor(public row: number, private text: string) {}

  buildDom(): HTMLElement {
    const div = document.createElement('div');
    div.className = 'virtual-row';
    div.textContent = `${this.text} (row ${this.row})`;
    this.dom = div;
    return div;
  }
}

// Create 10,000 rows of data
const allData: MyItem[] = Array.from({ length: 10000 }, (_, i) =>
  new MyItem(i + 1, `Item ${i + 1}`)
);

const vs = new SaigonScroll({
  container: document.getElementById('scroll-container')!,
  fixHeight: 40,
  padding: 5,
  throttle: 16,
  getChildrenByRow: (container, row) => {
    const item = allData[row - 1];
    return item ? [item] : [];
  },
  getRowNum: () => allData.length
});

vs.init();

// Later, tear down
// vs.destroy();
```

### Table-style virtual scroll

```ts
const vs = new SaigonScroll({
  container: document.getElementById('table-body')!,
  scrollTarget: document.getElementById('table-wrapper')!,
  fixHeight: 36,
  padding: 3,
  getChildrenByRow: (container, row) => {
    const data = dataset[row - 1];
    const cells = data.map(value => {
      const td = document.createElement('td');
      td.textContent = value;
      return { buildDom: () => td, dom: td, row };
    });
    return cells;
  },
  getRowNum: () => dataset.length
});

vs.init();
```

---

## Style Examples

```json jaml-playground
{
  "type": "table",
  "styles": ["interact.virtualScroll(height:2.5rem;padding:5)"],
  "data": [["col1"], ["row1"]]
}
```

With table-specific overrides:

```javascript
// Table with fixed layout and virtual scroll enabled
```

`appendRow(row, scrolling)` and `lazyDraw(scrolling)` return promises that resolve after the requested rows are appended. With `virtual: false`, the padded range covers all rows.
