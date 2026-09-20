# PearPanNZoom — Pan + Zoom Plugin

Provides interactive panning (via drag) and zooming (via scroll wheel) on any HTML element. The plugin manages a CSS `translate` + `scale` transform on the target element and exposes both imperative and declarative (style-based) APIs.

---

## Style Usage

```json jaml-playground
{
  "type": "container",
  "styles": ["interact.panNZoom(minScale:0.5;maxScale:5;scaleStep:0.01)"]
}
```

---

## Constructor

```typescript signature
new PearPanNZoom(el: HTMLElement, option: Partial<PearPanNZoom>)
```

| Arg | Type | Description | Notes |
|-----|------|-------------|-------|
| `el` | `HTMLElement` | The element that will be panned/zoomed. Must have a positioned parent. | Required. The parent receives the wheel listener. |
| `option` | `Partial<PearPanNZoom>` | Partial config — see instance properties below. | Optional. Merged onto the instance via `assign`. |

---

## Instance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `target` | `HTMLElement` | — | The element being transformed. Set by constructor. |
| `parent` | `HTMLElement` | `el.parentElement` | The parent element that receives the wheel listener. |
| `minScale` | `number` | `0.5` | Minimum allowed scale. |
| `maxScale` | `number` | `5.0` | Maximum allowed scale. |
| `scaleStep` | `number` | `0.01` | Zoom increment per wheel tick. Ctrl-drags reduce sensitivity (×0.25 factor). |
| `state` | `PanZoomState` | `'default'` | Current state: `'default'` | `'panning'` | `'zooming'`. |

---

## Callbacks

All callbacks receive a `PanZoomEvent`:

```ts
type PanZoomEvent = {
  x: number;          // pageX
  y: number;          // pageY
  scale: number;      // current scale
  dx: number;         // delta x since last event
  dy: number;         // delta y since last event
  dscale: number;     // delta scale since last event
  origEvent: WheelEvent | MouseEvent;
  stopPropagation: () => void;
};
```

| Callback | Signature | Fires |
|----------|-----------|-------|
| `start` | `(e: PanZoomEvent) => void` | When drag panning begins (mousedown). |
| `pan` | `(e: PanZoomEvent) => void` | During drag panning (mousemove). |
| `zoom` | `(e: PanZoomEvent) => void` | On each wheel zoom step. |
| `end` | `(e: PanZoomEvent) => void` | When drag panning ends (mouseup). |

### Change event

When panning or zooming changes the transform, a `pannzoom` custom event fires on the target element after a 200ms debounce:

```ts
el.addEventListener('pannzoom', (e: CustomEvent) => {
  const { scale, position } = e.detail
  // scale: current scale, position: { x, y } offset
})
```

---

## Instance Methods

## Instance Methods

### `locateZoom(el?, targetScale?, duration?)`

Animate both scale and translation so that a child element's centroid is centered in the parent at the desired scale.

```typescript signature
locateZoom(el?: HTMLElement, targetScale?: number, duration?: number): void
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `el` | `HTMLElement` | `undefined` | Child element to center. If omitted only scale changes. |
| `targetScale` | `number` | current scale | Desired scale (clamped to `[minScale, maxScale]`). |
| `duration` | `number` | `350` | Animation duration in ms. |

### `recover(duration?)`

Animate back to scale `1.0` and zero translation (original state).

```typescript signature
recover(duration?: number): void
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `duration` | `number` | `350` | Animation duration in ms. |

---

## Static Methods

### `PearPanNZoom.enable(el, option?)`

Enable pan+zoom on an element. Attaches wheel listener on the parent and sets up drag-to-pan via `DamsonDragNDrop`.

```typescript signature
static enable(el: HTMLElement, option?: Partial<PearPanNZoom>): void
```

- Adds CSS class `jam-pan-n-zoom`.
- Sets `cursor: grab` (changes to `grabbing` while panning).
- Stores `jampanzoom` reference on the element.

### `PearPanNZoom.disable(el)`

Remove all pan+zoom listeners and reset inline styles.

```typescript signature
static disable(el: HTMLElement): void
```

- Removes wheel listener, destroys DnD, clears `cursor` and `transform`, removes `--jam-zoom-scale`.

---

## Static Helpers

### `makePannable(el, option?)`

Enable panning only (zoom callbacks are suppressed).

```typescript signature
makePannable(el: HTMLElement, option?: Partial<PearPanNZoom>): void
```

Equivalent to `PearPanNZoom.enable(el, merge({ zoom: undefined }, option))`.

### `makeUnpannable(el)`

```typescript signature
makeUnpannable(el: HTMLElement): void
```

Calls `PearPanNZoom.disable(el)`.

### `makeZoomable(el, option?)`

Enable zooming only (pan callbacks are suppressed).

```typescript signature
makeZoomable(el: HTMLElement, option?: Partial<PearPanNZoom>): void
```

Equivalent to `PearPanNZoom.enable(el, merge({ pan: undefined }, option))`.

### `makeUnzoomable(el)`

```typescript signature
makeUnzoomable(el: HTMLElement): void
```

Calls `PearPanNZoom.disable(el)`.

---

## Global Helpers (`pear.*`)

| Global | Signature | Description |
|--------|-----------|-------------|
| `pear.zoom` | `(el: HTMLElement, scale: number, duration?: number) => void` | Zoom to a specific scale, centering on the element itself. |
| `pear.locate` | `(el: HTMLElement, scale?: number, duration?: number) => void` | Locate a specific child element at the given scale (centers it in the viewport). |
| `pear.recover` | `(el: HTMLElement, duration?: number) => void` | Animate back to the original state (scale 1, zero translation). |

Each scans up the DOM for the nearest `.jam-pan-n-zoom` ancestor and calls the corresponding instance method.

---

## Imperative Examples

```ts
import { PearPanNZoom, makePannable, makeZoomable } from 'jam-ui';

// Full pan + zoom
PearPanNZoom.enable(document.getElementById('canvas')!, {
  minScale: 0.25,
  maxScale: 8,
  scaleStep: 0.02,
  start(e) { console.log('start pan', e); },
  zoom(e)  { console.log('zoomed to', e.scale); }
});

// Pan-only
makePannable(myEl, { minScale: 1, maxScale: 1 });

// Zoom-only
makeZoomable(myEl, { minScale: 0.5, maxScale: 3 });

// Programmatic zoom and recover
pear.zoom(document.querySelector('.node')!, 2, 300);
pear.locate(document.querySelector('.target-child')!, 3, 400);
pear.recover(document.querySelector('.node')!, 250);

// Instance methods
const pz = new PearPanNZoom(el, { minScale: 0.1, maxScale: 10 });
pz.locateZoom(someChild, 2.5, 500);
pz.recover(300);
```

---

## Style Example

```json jaml-playground
{
  "type": "container",
  "styles": ["interact.panNZoom"]
}
```

Or with all defaults explicitly set:

```json jaml-playground
{
  "type": "container",
  "styles": ["interact.panNZoom(minScale:0.5;maxScale:5;scaleStep:0.01)"]
}
```
