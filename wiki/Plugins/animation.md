# AvocadoAnimation — Animation Engine

A requestAnimationFrame-based animation engine powering most of jam-ui's animations. It provides a rich set of named easing curves (`TimingBeziers`), utility functions for generating easing functions, and a full animation class with lifecycle control (start, pause, resume, cancel, finish).

---

## TimingBeziers — Named Easing Curves

All easing names map to cubic-bezier control points `[x1, y1, x2, y2]`. The built-in runtime token layer converts them to complete CSS timing-function values exposed through `Tokens.timing.*` and `--jam-timing-*` during token initialization.

| Name | Control Points | Description |
|------|---------------|-------------|
| `linear` | `[0, 0, 1, 1]` | Constant speed. |
| `ease` | `[0.25, 0.1, 0.25, 1]` | CSS `ease` — slow start and end, fast middle. |
| `easeIn` | `[0.42, 0, 1, 1]` | Slow start, fast end. |
| `easeOut` | `[0, 0, 0.58, 1]` | Fast start, slow end. |
| `easeInOut` | `[0.42, 0, 0.58, 1]` | Slow start and end, fast middle. |
| `boing` | `[0.5, 0.5, 0.55, 1.68]` | Overshoot bounce with a playful spring. |
| `urging` | `[0.23, 1, 0.32, 1]` | Gentle ease-out with a subtle finish. |
| `bouncing` | `[0.44, 0.42, 0.16, 1.25]` | Bouncy deceleration. |
| `decelerate` | `[0.23, 1, 0.32, 1]` | Synonym for `urging`. |
| `accelerate` | `[0.55, 0.055, 0.675, 0.19]` | Gradual acceleration. |
| `smooth` | `[0.645, 0.045, 0.355, 1]` | Smooth natural motion. |
| `sine` | `[0.445, 0.05, 0.55, 0.95]` | Sinusoidal easing. |
| `sineIn` | `[0.47, 0, 0.745, 0.715]` | Sinusoidal ease-in. |
| `sineOut` | `[0.39, 0.575, 0.565, 1]` | Sinusoidal ease-out. |
| `sineInOut` | `[0.445, 0.05, 0.55, 0.95]` | Sinusoidal ease-in-out. |
| `crisp` | `[0.77, 0, 0.175, 1]` | Quick snap with little overshoot. |
| `overshoot` | `[0.68, -0.55, 0.265, 1.55]` | Pronounced overshoot with bounce-back. |
| `runup` | `[0.68, -0.55, 0.5, 0.5]` | Run-up before the main motion. |
| `quartOut` | `[0.165, 0.84, 0.44, 1]` | Quart-style ease-out (pronounced deceleration). |
| `velvet` | `[0.19, 1, 0.22, 1]` | Velvet-smooth ease-out. |
| `gear` | `[0.55, 0.085, 0.68, 0.53]` | Mechanical gear-like acceleration. |
| `plateau` | `[0.25, 0.5, 0.75, 0.5]` | Constant velocity with brief holds at start and end. |

---

## Types

```ts
type AnimationOption = {
  duration: number;
  direction?: PlaybackDirection;        // 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  frameRate?: number;                   // Target FPS
  frameCount?: number;                  // Total frames (overrides frameRate)
  repeat?: number | 'no-repeat' | 'infinite';
  easing?: string | [number, number, number, number];
  delay?: number;
  step: (progress: number, rawProgress?: number, iteration?: number, elapsed?: number) => void;
  done?: () => void;
};
```

---

## AvocadoAnimation Class

### Constructor

```typescript signature
new AvocadoAnimation(option: AnimationOption)
```

| Arg | Type | Default | Description |
|-----|------|---------|-------------|
| `mode.duration` | `number` | — | Animation duration in ms. Required. |
| `mode.direction` | `PlaybackDirection` | `'normal'` | Playback direction. |
| `mode.repeat` | `number \| 'no-repeat' \| 'infinite'` | `'no-repeat'` | Repeat behavior. |
| `mode.delay` | `number` | `0` | Delay before start (ms). Negative values skip ahead. |
| `mode.easing` | `string \| [number, number, number, number]` | `'linear'` | Named easing from `TimingBeziers` or custom cubic-bezier control points. |
| `mode.frameRate` | `number` | — | Target frames per second (e.g., `30`). |
| `mode.frameCount` | `number` | — | Total number of frames (overrides `frameRate` if both set). |
| `mode.step` | `(progress, rawProgress?, iteration?, elapsed?) => void` | — | Called each frame with the eased progress. Required. |
| `mode.done` | `() => void` | — | Called when animation completes. |

### Instance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `duration` | `number` | — | Animation duration in ms. |
| `direction` | `PlaybackDirection` | `'normal'` | Current playback direction. |
| `repeat` | `number \| 'no-repeat' \| 'infinite'` | `'no-repeat'` | Repeat count. |
| `delay` | `number` | `0` | Start delay in ms. |
| `easing` | `string \| [number, number, number, number]` | `'linear'` | Current easing specification. |
| `step` | `(progress, rawProgress?, iteration?, elapsed?) => void` | — | Frame callback. |
| `done` | `() => void \| undefined` | — | Completion callback. |

### Instance Methods

#### `start(): this`

Start (or restart) the animation from the beginning. Respects the `delay` property.

```typescript signature
start(): this
```

#### `pause(): this`

Pause the animation at the current frame. The elapsed time is preserved so `resume()` continues from the same position.

```typescript signature
pause(): this
```

#### `resume(): this`

Resume a paused animation.

```typescript signature
resume(): this
```

#### `cancel(): this`

Cancel the animation and reset elapsed time to zero. Does NOT fire the `done` callback.

```typescript signature
cancel(): this
```

#### `finish(): this`

Force-finish the animation: calls `cancel()` and then fires the `done` callback.

```typescript signature
finish(): this
```

---

## Utility Functions

### `cubicBezier(x1, y1, x2, y2)`

Create a cubic-bezier easing function.

```typescript signature
cubicBezier(x1: number, y1: number, x2: number, y2: number): (progress: number) => number
```

| Param | Description |
|-------|-------------|
| `x1, y1` | First control point. |
| `x2, y2` | Second control point. |

Returns an easing function `(t: number) => number` for `t` in `[0, 1]`.

If `x1 === y1 && x2 === y2`, the identity function (`t => t`) is returned as a fast path. Otherwise uses Newton's method with a binary search fallback for numerical accuracy.

### `getEasingFunc(easing)`

Resolve a named easing or control-point array to a function. Results are cached.

```typescript signature
getEasingFunc(easing: keyof typeof TimingBeziers | [number, number, number, number]): (progress: number) => number
```

Supports:
- Named easings from `TimingBeziers` (case-insensitive via `camelCase`)
- Custom `[x1, y1, x2, y2]` arrays
- `linear(...)` — piecewise linear interpolation
- `steps(n, position)` — discrete step easing (CSS `steps()`)

### `getEasingCSS(name)`

Convert a named easing or control-point array to a CSS `cubic-bezier(...)` string.

```typescript signature
getEasingCSS(name: string | number[]): string
```

| Input | Output |
|-------|--------|
| `'urging'` | `'cubic-bezier(0.23,1,0.32,1)'` |
| `[0.25, 0.1, 0.25, 1]` | `'cubic-bezier(0.25,0.1,0.25,1)'` |

### `easeProgress(progress, iteration, easing?, direction?, scale?)`

Apply easing and direction to a raw progress value.

```typescript signature
easeProgress(
  progress: number,
  iteration: number,
  easing?: string | [number, number, number, number] | ((p: number) => number),
  direction?: PlaybackDirection,
  scale?: number
): number
```

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `progress` | `number` | — | Raw progress `[0, 1]` for the current iteration. |
| `iteration` | `number` | — | Current iteration index (0-based). |
| `easing` | `string \| [number,number,number,number] \| Function` | `'linear'` | Easing to apply. |
| `direction` | `PlaybackDirection` | `'normal'` | Direction (`'reverse'`, `'alternate'`, `'alternate-reverse'`). |
| `scale` | `number` | `1` | Scale factor for multi-cycle progress. |

---

## Style Utilities

The animation utilities module provides building blocks for entry/exit animations in the style system.

### `animaArgs(overrides?)`

Get the base animation argument definitions with optional overrides.

```typescript signature
animaArgs(overrides?: Dictionary): Dictionary
```

Default arguments:

| Arg | Type | Default | Description |
|-----|------|---------|-------------|
| `duration` | `number \| string` | `200` | Duration in ms (or `seq()` / `random()` expression). |
| `easing` | `string` | `'ease-in-out'` | Easing name. |
| `delay` | `number \| string` | `0` | Delay in ms (or expression). |
| `fill` | `string` | `'backwards'` | CSS animation-fill-mode. |
| `origin` | `string` | — | CSS transform-origin. |
| `triggerSelector` | `string` | — | CSS selector for the click trigger element. |
| `beforeApply` | `Function` | — | Hook called before the animation style is applied. |
| `direction` | `string` | `'normal'` | Animation direction. |

### `getEasing(easing)`

Convert a name to its CSS `cubic-bezier(...)` string. Returns raw string values as-is.

### `buildTimeArg(delay, asString?, index?, refIndex?)`

Process `seq()` and `random()` expression strings into concrete time values.

### `getSqueezeArgs(direction)`

Get CSS custom property values for a squeeze animation in a given direction (`'top'`, `'bottom'`, `'left'`, `'right'`, `'center'`, `'middle'`).

### `buildEntryAnima(name, argOverrides?, ...plugins)`

Build a style plugin configuration for an entry animation.

### `buildExitAnima(name, argOverrides?, ...plugins)`

Build a style plugin configuration for an exit animation.

### `genieBeforeApply(type)`

Returns a `beforeApply` callback that generates a perspective-origin from the cursor position (entry) or the entry origin (exit), creating a "genie" effect.

---

## Imperative Examples

```ts
import {
  AvocadoAnimation,
  TimingBeziers,
  cubicBezier,
  getEasingFunc,
  getEasingCSS,
  easeProgress
} from 'jam-ui';

// Basic animation
const anim = new AvocadoAnimation({
  duration: 600,
  easing: 'boing',
  repeat: 'no-repeat',
  step: (progress, rawProgress, iteration, elapsed) => {
    el.style.opacity = String(progress);
    el.style.transform = `translateY(${(1 - progress) * 50}px)`;
  },
  done: () => {
    console.log('animation complete');
  }
});

anim.start();   // begin
anim.pause();   // pause mid-way
anim.resume();  // continue
anim.cancel();  // stop and reset

// Infinite loop with alternate direction
const loop = new AvocadoAnimation({
  duration: 1000,
  easing: 'sineInOut',
  direction: 'alternate',
  repeat: 'infinite',
  step: (progress) => {
    el.style.transform = `scale(${0.8 + progress * 0.4})`;
  }
});
loop.start();

// Using easing functions
const myEasing = cubicBezier(0.68, -0.55, 0.265, 1.55);  // overshoot
const t = myEasing(0.5);  // ~0.37

const linearEasing = getEasingFunc('linear');
const eased = easeProgress(0.5, 0, 'urging', 'normal');

// CSS output
const css = getEasingCSS('boing');
// → "cubic-bezier(0.5,0.5,0.55,1.68)"

// Custom cubic-bezier
getEasingCSS([0.25, 0.1, 0.25, 1]);
// → "cubic-bezier(0.25,0.1,0.25,1)"

// Custom CSS easing with linear()
const fn = getEasingFunc('linear(0, 0.25, 0.5, 0.75, 1)');
console.log(fn(0.5));  // 0.375

// Steps easing
const stepFn = getEasingFunc('steps(4, jump-end)');
console.log(stepFn(0.3));  // 0.25
console.log(stepFn(0.5));  // 0.5
```

---

## Style Example

```json jaml-playground
{
  "type": "button",
  "cap": "Animate",
  "styles": ["animation.entry.frombottom(duration:400;easing:bouncing)"]
}
```
