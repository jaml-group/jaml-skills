# SaigonScroll — Virtual Scrolling Plugin

A row-window engine that mounts visible rows and an optional buffer, and removes rows outside that range. Prefer the native table/style integration for ordinary JAML. Direct engine use requires an application-owned layout that preserves total scroll extent and positions each mounted row; the engine does not create spacers or a complete list layout.

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
    buildDom(): HTMLElement; // Called when the row scrolls into view
    dom?: HTMLElement; // Set by buildDom — cached DOM reference
    row: number; // Row index (1-based)
}
```

Each row is represented by a `LazyChild` that lazily creates its DOM via `buildDom()`. The base engine calls `buildDom` when an included row has no cached `dom`, including rows in the padding buffer. Keep each `LazyChild` object stable across queries and assign its `dom` in `buildDom`; returning a node alone does not populate the cache.

---

## Constructor

```typescript signature
new SaigonScroll(option: SaigonScrollOption)
```

### SaigonScrollOption (extends `RequiredPartial<SaigonScroll, 'fixHeight' | 'getChildrenByRow' | 'getRowNum'>`)

| Option             | Type                                                   | Default      | Description                                                                                                                 |
| ------------------ | ------------------------------------------------------ | ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `container`        | `HTMLElement`                                          | —            | The scrollable container element. Required.                                                                                 |
| `fixHeight`        | `number`                                               | `0`          | Fixed row height in CSS pixels. Supply a positive measured value.                                                           |
| `gap`              | `number`                                               | `0`          | Gap between rows in CSS pixels; included in row pitch and capacity.                                                         |
| `getChildrenByRow` | `(container: HTMLElement, row: number) => LazyChild[]` | —            | Factory for a given row's children. Required.                                                                               |
| `getRowNum`        | `(container: HTMLElement) => number`                   | —            | Returns total number of rows. Required.                                                                                     |
| `scrollTarget`     | `HTMLElement`                                          | Not supplied | Set explicitly, even when it is the same element as `container`. Receives scroll events and supplies viewport measurements. |
| `throttle`         | `number`                                               | `10`         | Throttle interval (ms) for scroll callback.                                                                                 |
| `padding`          | `number`                                               | `0`          | Extra rows rendered above and below the visible range as a buffer.                                                          |
| `startRow`         | `number`                                               | `1`          | Initial row to begin rendering from.                                                                                        |

---

## Instance Properties

| Property        | Type          | Default      | Description                                                                                     |
| --------------- | ------------- | ------------ | ----------------------------------------------------------------------------------------------- |
| `container`     | `HTMLElement` | —            | Scrollable container.                                                                           |
| `scrollTarget`  | `HTMLElement` | Not supplied | Explicit scroll event and measurement target.                                                   |
| `fixHeight`     | `number`      | `0`          | Row height in CSS pixels.                                                                       |
| `gap`           | `number`      | `0`          | Gap between rows in CSS pixels.                                                                 |
| `throttle`      | `number`      | `10`         | Scroll throttle ms.                                                                             |
| `padding`       | `number`      | `0`          | Buffer rows.                                                                                    |
| `startRow`      | `number`      | `1`          | First visible row.                                                                              |
| `scrollingDown` | `boolean`     | `true`       | Whether the user is scrolling downward.                                                         |
| `rowCapacity`   | `number`      | `0`          | Number of rows that fit in the visible area. Calculated on the first draw or a resize callback. |
| `colCapacity`   | `number`      | `0`          | Column capacity (for grid layouts).                                                             |
| `virtual`       | `boolean`     | `true`       | Set to `false` to draw all rows and bypass scroll-window calculations.                          |

### Computed Properties

| Property         | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `endRow`         | Last visible row: `startRow + rowCapacity`.            |
| `paddedStartRow` | First buffered row: `max(1, startRow - padding)`.      |
| `paddedEndRow`   | Last buffered row: `min(totalRows, endRow + padding)`. |

---

## Instance Methods

### `init(): this`

Attach the scroll listener to `scrollTarget` and a `resize` event listener to `container`. Returns `this` for chaining. Call `await lazyDraw(false)` explicitly for the initial draw. Plain DOM elements do not emit framework resize events automatically; the integration must forward relevant size changes to `resizeCallback`.

```typescript signature
init(): this
```

### `destroy(): void`

Remove the scroll and resize listeners. This does not remove rendered rows or cancel row insertions already scheduled by `lazyDraw(true)`; the application owns its host and draw lifetime.

```typescript signature
destroy(): void
```

### `lazyDraw(scrolling: boolean): Promise<void>`

Manually trigger a draw cycle: removes children outside the padded range and appends children inside it.

```typescript signature
lazyDraw(scrolling: boolean): Promise<void>
```

| Param       | Type      | Description                                                           |
| ----------- | --------- | --------------------------------------------------------------------- |
| `scrolling` | `boolean` | Whether this draw is triggered by scrolling (affects DOM scheduling). |

### `appendRow(row: number, scrolling: boolean): Promise<void>`

Build and append children for a row if it is still included when the work runs. With `scrolling: true`, insertion is delayed by `throttle`; the returned promise settles after that work.

```typescript signature
appendRow(row: number, scrolling: boolean): Promise<void>
```

### `append(child: LazyChild, scrolling: boolean): void`

Append a single `LazyChild`'s DOM to the container. Builds the DOM if needed.

### `remove(child: LazyChild): void`

Remove a single `LazyChild`'s DOM from the container.

### `calcRowCapacity(): number`

Calculate how many rows fit in the visible area (based on `Math.ceil(scrollTarget.clientHeight / (fixHeight + gap))`).

### `shouldDraw(row: number): boolean`

Returns `true` if the row is within the padded range and within total row count.

### `shouldRemove(row: number): boolean`

Returns `true` if the row is outside the padded range.

---

## Callbacks (assigned to instance)

### `scrollCallback`

Throttled scroll handler. Recalculates `startRow` as `Math.floor(scrollTop / (fixHeight + gap)) + 1` and triggers `lazyDraw`. Automatically bound via `makeThrottle`.

### `resizeCallback`

Handles container resize. Recalculates `rowCapacity` and triggers `lazyDraw` if capacity changed.

---

## Direct integration

The following adapter assumes the application has already created a bounded scroll viewport, preserved the total scroll extent, and positioned its stable row objects at their logical row offsets. Supply `fixHeight` and `gap` as measured CSS pixels at this API boundary. Author the surrounding layout in `rem`; this is an integration fragment, not a standalone virtual-list example.

```ts
import { type LazyChild, SaigonScroll } from '@jam/jam-ui';

async function mountRows(container: HTMLElement, scrollTarget: HTMLElement, rows: LazyChild[][], fixHeight: number, gap = 0) {
    const _scroll = new SaigonScroll({
        container,
        scrollTarget,
        fixHeight,
        gap,
        padding: 5,
        throttle: 16,
        getChildrenByRow: (target, row) => rows[row - 1] ?? [],
        getRowNum: () => rows.length
    });

    _scroll.init();
    await _scroll.lazyDraw(false);
    return _scroll;
}
```

Each child’s `row` is one-based, and repeated queries must return the same child objects. When viewport geometry changes, forward the change through the native resize event or call `scroll.resizeCallback()`. When data changes, update the integration’s row identities, geometry and total extent before redrawing. Stop scheduling new draws and account for any pending draw promises before releasing the host; then call `scroll.destroy()` and remove application-owned observation and layout resources.

For native tables, use the [fixed row-height style](../Styles/table-style.md#entry-table-fixedrowheight), which supplies the table’s cell lookup and layout integration. Do not attach a second engine to a table already owned by that style.

`appendRow(row, scrolling)` and `lazyDraw(scrolling)` return promises that resolve after their requested insertion work. With `virtual: false`, the padded range covers all rows.
