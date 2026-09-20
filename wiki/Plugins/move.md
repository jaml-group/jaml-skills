# MelonMove — Geometry Positioning Plugin

A geometry-based positioning engine that places an element relative to a target (snap target) within a container, with automatic overflow detection and flip positioning. Used extensively by tooltips, popovers, dropdowns, and context menus.

---

## Style Usage

```json jaml-playground
{
  "type": "badge",
  "cap": "Following",
  "styles": ["auto.moveAlong(target:#leader;delay:100)"]
}
```

```javascript
// hover.spotlight(position:top;bias:4;autoFlip:true)
```

---

## The `Position` Map

Named positions mapping to relative coordinates (values are fractions 0–1 of the target rect):

| Name | `x` | `y` | Description |
|------|-----|-----|-------------|
| `top` | `0.5` (center) | `0` (top) | Centered above the target. |
| `bottom` | `0.5` (center) | `1` (bottom) | Centered below the target. |
| `left` | `0` (left) | `0.5` (center) | Centered to the left of the target. |
| `right` | `1` (right) | `0.5` (center) | Centered to the right of the target. |
| `top-left` | `0` (left) | `0` (top) | Above-left of the target. |
| `top-right` | `1` (right) | `0` (top) | Above-right of the target. |
| `bottom-left` | `0` (left) | `1` (bottom) | Below-left of the target. |
| `bottom-right` | `1` (right) | `1` (bottom) | Below-right of the target. |
| `center` | `0.5` (center) | `0.5` (center) | Centered on the target. |

---

## Types

```ts
type UpdatedCoords = {
  abs: Coord;       // { x, y } absolute position (offsetLeft, offsetTop)
  delta: Coord;     // { x, y } delta from origin
  brAbs: Coord;     // { x, y } distance from container bottom-right edge
};

type MoveCallback = (coords: UpdatedCoords, move: MelonMove) => void;
```

---

## Constructor

```typescript signature
new MelonMove(opt: ReadyOptions)
```

### ReadyOptions

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `object` | `RectType \| HTMLElement` | — | The element to position. Required. |
| `desc` | `string` | `'mm'` | Debug identifier. |
| `target` | `RectType \| Coord \| HTMLElement` | — | The snap target to position relative to. |
| `container` | `RectType \| HTMLElement` | — | The containing boundary for overflow detection. |
| `bias` | `number` | `0` | Gap (px) between the positioned element and the snap target. |
| `followCursor` | `boolean` | `false` | When `true`, the snap target is treated as a dynamic cursor position. |
| `allowOverflow` | `boolean` | `false` | When `false`, the element is clamped inside the container. |
| `position` | `keyof typeof Position \| Coord` | `'center'` | Preferred position relative to the target. |
| `debug` | `boolean \| number` | `false` | Enable visual debug overlays. A number sets the display duration in ms. |
| `autoFlip` | `boolean` | `true` | Automatically flip to an opposite position when overflow is detected. On the first move, flipping is always attempted regardless of this flag. |
| `oncontchange` | `MoveCallback` | — | Called when the container changes (via `set()`), triggering a re-position. |

---

## Instance Methods

### `set(opt: SetOptions): this`

Update configuration and recalculate position. Returns `this` for chaining.

```typescript signature
set(opt: SetOptions): this
```

#### SetOptions (extends Partial<ReadyOptions>)

All `ReadyOptions` fields are optional plus:

| Option | Type | Description |
|--------|------|-------------|
| `dest` | `Coord` | Explicit destination coordinate, overrides snap-target-based calculation. |

Calling `set()` re-evaluates all internal geometry; if the container changes, the `oncontchange` callback fires with updated coordinates.

### `move(callback: MoveCallback): this`

Calculate the final position and execute the callback (via `beforeNextRepaint`) with the computed coordinates.

```typescript signature
move(callback: MoveCallback): this
```

| Param | Type | Description |
|-------|------|-------------|
| `callback` | `MoveCallback` | Receives `UpdatedCoords` and the `MelonMove` instance. |

### `getRect(): Rect`

Returns the current position rectangle (absolute within the container).

### `getCentroid(): Coord`

Returns the center point `{ x, y }` of the positioned element.

### `getContRect(): Rect`

Returns the container bounding rectangle.

### `getSnapRect(): Rect`

Returns the snap target bounding rectangle.

### `getActualPosition(): Coord`

Returns the actual applied position coordinates (may differ from the preferred position if auto-flip occurred).

### `getOppositePosition(): Coord`

Returns the inverse of the actual position (e.g., `bottom` → `top`).

### `getAlteredDest(): Coord`

Returns the offset between the calculated destination and where the element actually landed (after clamping/flipping).

---

## Static Methods

### `MelonMove.hasMove(el)`

```typescript signature
static hasMove(el: HTMLElement): el is HTMLElement & { jammove: MelonMove }
```

Checks if a `MelonMove` instance is stored on the element.

### `MelonMove.getFrom(el)`

```typescript signature
static getFrom(el: HTMLElement): MelonMove | undefined
```

Retrieve the `MelonMove` instance stored on the element.

### `MelonMove.removeFrom(el)`

```typescript signature
static removeFrom(el: HTMLElement): void
```

Remove the stored `MelonMove` instance from the element.

### `MelonMove.buildFor(el)`

```typescript signature
static buildFor(el: HTMLElement): MelonMove
```

Create and store a new `MelonMove` instance on the element, using `el.offsetParent` as the container.

---

## Helper Function

### `ready(opt: ReadyOptions): MelonMove`

Shorthand for `new MelonMove(opt)`.

---

## Imperative Examples

```ts
import { MelonMove, Position, ready } from 'jam-ui';

// Basic positioning
const mm = new MelonMove({
  object: document.getElementById('tooltip')!,
  target: document.getElementById('trigger')!,
  container: document.getElementById('viewport')!,
  position: 'bottom',
  bias: 8,
  autoFlip: true
});

mm.move((coords) => {
  el.style.left = coords.abs.x + 'px';
  el.style.top = coords.abs.y + 'px';
});

// Re-position on scroll/resize
mm.set({ position: 'top', bias: 4 });
mm.move((coords) => {
  el.style.transform = `translate(${coords.abs.x}px, ${coords.abs.y}px)`;
});

// With debug overlays
const mm2 = ready({
  object: popupEl,
  target: triggerEl,
  container: viewportEl,
  position: 'right',
  debug: 3000  // show debug rects for 3 seconds
});

mm2.move((coords) => {
  Object.assign(popupEl.style, {
    left: coords.abs.x + 'px',
    top: coords.abs.y + 'px'
  });
});

// Follow cursor
const mm3 = new MelonMove({
  object: floatingEl,
  target: { x: 0, y: 0 },  // Coord — triggers followCursor mode
  container: document.body,
  position: 'bottom-right',
  bias: 12,
  followCursor: true
});

// Static helpers
MelonMove.buildFor(myEl);
if (MelonMove.hasMove(myEl)) {
  const mm4 = MelonMove.getFrom(myEl)!;
  mm4.set({ position: 'left', bias: 10 });
  mm4.move((c) => applyPosition(c));
}
```

---

## Style Examples

```json jaml-playground
{
  "type": "container",
  "style": "position:relative;width:22rem;height:10rem",
  "components": [
    { "type": "button", "id": "move-demo-target", "cap": "Drag target", "styles": ["interact.movable"] },
    { "type": "badge", "cap": "Follower", "styles": ["auto.moveAlong(target:#move-demo-target;throttle:25)"] }
  ]
}
```

```javascript
// hover.spotlight(position:top-left;bias:6;autoFlip:true;followCursor:true)
```
