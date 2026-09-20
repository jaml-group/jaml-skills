# DamsonDragNDrop — Drag-and-Drop Engine

A comprehensive drag-and-drop engine supporting moving (dragging to reposition) and resizing (dragging edges/corners). It also provides native HTML5 drag-and-drop helpers for draggable/droppable interactions.

---

## Style Usage

```json jaml-playground
{
  "type": "card",
  "styles": ["interact.movable", "interact.resizable"]
}
```

---

## Types

```ts
type DndState = 'default' | 'ready' | 'start' | 'dragging';

type HandlePos = 'top' | 'right' | 'bottom' | 'left';

type DndEvent = {
  x: number;            // pageX
  y: number;            // pageY
  dx: number;           // delta x since last event
  dy: number;           // delta y since last event
  ox: number;           // total offset x from origin
  oy: number;           // total offset y from origin
  lockAxis?: 'x' | 'y' | 'none';
  rect?: Rect;          // current rect (resize only)
  deltaRect?: Rect;     // rect deltas (resize only)
  origEvent: MouseEvent;
  target: HTMLElement;
  stopPropagation: () => void;
};
```

---

## Constructor

```typescript signature
new DamsonDragNDrop(el: HTMLElement, option: Partial<DamsonDragNDrop>)
```

| Arg | Type | Default | Description |
|-----|------|---------|-------------|
| `el` | `HTMLElement` | — | Target element for drag/resize. |
| `option.type` | `'move' \| 'resize'` | `'move'` | Whether the instance handles moving or resizing. |

---

## Instance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `HTMLElement` | — | The element being dragged/resized. |
| `type` | `'move' \| 'resize'` | `'move'` | Behaviour mode. |
| `state` | `DndState` | `'default'` | Current drag state. |
| `delay` | `number` | `0` | Delay in ms before drag activates (mousedown threshold). |
| `lockAxis` | `'x' \| 'y' \| 'none'` | `'none'` | Constrain movement to one axis. |
| `snap` | `boolean` | `false` | Snap movable instances to nearby snap-enabled peers within 5 px. |
| `snapShape` | `'rect' \| 'point'` | `'rect'` | Use edge/center anchors or a centroid anchor for snapping. |
| `snapContainer` | `HTMLElement \| undefined` | parent element | Container whose movable descendants are snap candidates. |
| `gap` | `number` | `12` | Edge detection radius in px (resize only). |
| `scale` | `number` | `1` | Current zoom scale of the target element. |
| `cursor` | `string` | `'move'` | CSS cursor when the element is draggable. |
| `draggingCursor` | `string` | `'move'` | CSS cursor during active dragging. |
| `handle` | `string \| undefined` | `undefined` | CSS selector for the drag handle element. |
| `avoid` | `string \| undefined` | `undefined` | CSS selector for elements that should NOT initiate drag. |
| `preventClick` | `boolean \| number` | `true` | Whether to suppress click events after dragging. When a number, acts as a pixel threshold. |
| `contain` | `boolean` | `false` | Whether to constrain the element within its parent. |
| `minWidth` | `number` | `0` | Minimum resize width. |
| `minHeight` | `number` | `0` | Minimum resize height. |
| `edges` | `{ [key in HandlePos]: boolean }` | `{ left: true, right: true, top: true, bottom: true }` | Which edges trigger resize. Decorated with `@mergable()`. |
| `container` | `Rect \| Element \| string \| undefined` | — | Constrain container (setter accepts a `Rect`, `Element`, or CSS selector string). |
| `last` | `Coord` | `{ x: 0, y: 0 }` | Last mouse position. |
| `orig` | `Coord` | `{ x: 0, y: 0 }` | Mouse position at drag start. |
| `lastRect` | `Rect` | — | Last bounding rect. |
| `cursorBkp` | `string \| null` | `null` | Backup of the original cursor style. |
| `currEdges` | `HandlePos[]` | `[]` | Currently active resize edges. |

---

## Callbacks

All receive a `DndEvent`:

| Callback | Signature | Fires |
|----------|-----------|-------|
| `start` | `(e: DndEvent) => void` | Drag starts (after delay threshold, if any). |
| `drag` | `(e: DndEvent) => void` | Mouse move during active drag. |
| `end` | `(e: DndEvent) => void` | Mouse up after drag. |
| `abort` | `(e: DndEvent) => void` | Mouse up without sufficient movement (resize only). |
| `dblclick` | `(e: DndEvent) => void` | Double-click on a resize edge. |

---

## Static Methods

### `DamsonDragNDrop.enable(el, type, option)`

Enable drag/resize on an element. Adds CSS classes `jam-dnd` and `jam-{move|resize}able`.

```typescript signature
static enable(el: HTMLElement, type: 'move' | 'resize', option: Partial<DamsonDragNDrop>): void
```

### `DamsonDragNDrop.disable(el, type)`

```typescript signature
static disable(el: HTMLElement, type: 'move' | 'resize'): void
```

### `DamsonDragNDrop.isDnd(el)`

```typescript signature
static isDnd(el: EventTarget | null): boolean
```

Returns `true` if the element has the `jam-dnd` class.

### `DamsonDragNDrop.isHandle(el)`

```typescript signature
static isHandle(el: EventTarget | null): boolean
```

Returns `true` if the element has both `jam-dnd` and `jam-handle` classes.

### `DamsonDragNDrop.findTarget(el, type)`

```typescript signature
static findTarget(el: EventTarget | null, type: 'move' | 'resize'): Element | null
```

Walks up the DOM to find the nearest `.jam-dnd.jam-{move|resize}able` ancestor.

### `DamsonDragNDrop.get(el, type?)`

```typescript signature
static get(el: Element | null, type: 'move' | 'resize' = 'move'): DamsonDragNDrop | undefined
```

Return the active move/resize controller for a target or its configured handle.

### Edge Detection (`withinEdges`)

```typescript signature
withinEdges(e: MouseEvent): HandlePos[] | undefined
```

Returns the active handle edges near the mouse position, scaled by the current zoom level.

---

## High-Level Helpers

### `beginElementMove(el, detail)`

Begin a coordinated move lifecycle without installing a pointer listener. It emits `movestart` immediately and returns `move(offset, event)`, `end(event)`, and `cancel()` controls. Owned magnets and descendants observing movement receive matching `moving`, `moveend`, or `movecancel` events.

### `makeMovable(el, option?)`

Make an element draggable via CSS transform or `left`/`top` positioning.

```typescript signature
makeMovable(el: HTMLElement, option?: MovableOption): void
```

#### MovableOption

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `contain` | `boolean` | `false` | Constrain within parent. |
| `movestart` | `(e: DndEvent) => void` | — | Callback when movement starts. |
| `moving` | `(e: { x, y, dx, dy }) => void \| boolean` | — | Callback during movement. Return `false` to prevent the move. |
| `moveend` | `(e: DndEvent) => void` | — | Callback when movement ends. |
| `useTransform` | `boolean \| 'auto'` | `true` | Use CSS transform vs. `left`/`top`. `'auto'` infers from existing styles. |
| `manuallyApply` | `boolean` | `false` | When `true`, the caller is responsible for applying the position. |

### `makeUnmovable(el)`

```typescript signature
makeUnmovable(el: HTMLElement): void
```

### `makeResizable(el, option?)`

Make an element resizable by dragging its edges or corners.

```typescript signature
makeResizable(el: HTMLElement, option?: ResizableOption): void
```

#### ResizableOption

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `horizontalOnly` | `boolean` | `false` | Restrict resize to horizontal only (left/right edges). |
| `verticalOnly` | `boolean` | `false` | Restrict resize to vertical only (top/bottom edges). |
| `contain` | `boolean` | `false` | Constrain within parent. |
| `resizestart` | `(e: DndEvent \| { width, height }) => void` | — | Callback when resize starts. |
| `resizing` | `(e: DndEvent \| { width, height }) => void \| boolean` | — | Callback during resize. Return `false` to prevent the resize. |
| `resizeend` | `(e: DndEvent \| { width, height, prevWidth, prevHeight }) => void` | — | Callback when resize ends. |
| `reset` | `(e: DndEvent) => void` | — | Called on double-click (resets to original size). |
| `useTransform` | `boolean \| 'auto'` | `true` | Use CSS transform vs. `left`/`top`. |
| `edges` | `{ left, right, top, bottom }` | all `true` | Active resize edges. |

### `makeUnresizable(el)`

```typescript signature
makeUnresizable(el: HTMLElement): void
```

### `makeDraggable(el, option?)`

Make an element natively HTML5-draggable.

```typescript signature
makeDraggable(el: HTMLElement, option?: DraggableOption): void
```

#### DraggableOption

| Option | Type | Description |
|--------|------|-------------|
| `data` | `Callable<any[], Dictionary>` | Data to attach to the drag event (set as `application/json`). |
| `dragstart` | `(e: DragEvent) => void` | Native `dragstart` callback. |
| `dragend` | `(e: DragEvent) => void` | Native `dragend` callback. |

### `makeUndraggable(el)`

```typescript signature
makeUndraggable(el: HTMLElement): void
```

### `makeDroppable(target, option?)`

Register a drop zone for HTML5 drag-and-drop.

```typescript signature
makeDroppable(target: HTMLElement | string, option?: DroppableOption): void
```

#### DroppableOption

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `handler` | `EventHandler` | `() => {}` | Drop event handler. |
| `dataHandler` | `(data: any) => void` | `() => {}` | Receives the parsed drop data. |
| `prompt` | `string` | `'Drop here'` | Text shown in the drop overlay. |
| `accept` | `string[] \| ((e: DragEvent) => boolean)` | `(e) => true` | Accepted MIME types or a validation function. |

### `makeUndroppable(target)`

```typescript signature
makeUndroppable(target: HTMLElement | string): void
```

---

## Imperative Examples

```ts
import {
  makeMovable, makeResizable,
  makeDraggable, makeDroppable
} from 'jam-ui';

// Movable element
makeMovable(document.getElementById('drag-me')!, {
  contain: true,
  movestart(pos) { console.log('start at', pos); },
  moving(pos) {
    console.log('moving to', pos.x, pos.y);
    // return false to cancel
  },
  moveend(pos) { console.log('ended at', pos); }
});

// Resizable panel
makeResizable(document.getElementById('panel')!, {
  minWidth: 100,
  minHeight: 100,
  edges: { left: true, right: true, bottom: true, top: false },
  resizestart(size) { console.log('initial size', size); },
  resizing(size) { console.log('new size', size); },
  resizeend(detail) { console.log('resize done', detail); },
  reset() { console.log('double-click reset'); }
});

// HTML5 drag-and-drop
makeDraggable(document.getElementById('source')!, {
  data: () => ({ id: 'source-1', type: 'item' }),
  dragstart(e) { console.log('drag start', e); }
});

makeDroppable(document.getElementById('dropzone')!, {
  accept: ['application/json'],
  prompt: 'Drop item here',
  dataHandler(data) { console.log('received', data); }
});
```

---

## Style Examples

```json jaml-playground
{
  "type": "card",
  "cap": "Drag me",
  "styles": ["interact.movable"]
}
```

```json jaml-playground
{
  "type": "card",
  "cap": "Resize me",
  "styles": ["interact.resizable"]
}
```
