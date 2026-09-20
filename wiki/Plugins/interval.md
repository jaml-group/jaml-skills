# ImbuInterval — Smarter setInterval

`ImbuInterval` is a managed interval timer that replaces `window.setInterval` / `window.clearInterval`. It provides pause/resume, fixed-rate execution (prevents callback overlap), and optional alignment to the interval boundary.

## Global Function API

| Function                         | Signature                                                    | Description                                        |
|----------------------------------|--------------------------------------------------------------|----------------------------------------------------|
| `setInterval(callback, interval, fixedRate?, alignToInterval?)` | `(callback: Function, interval: number, fixedRate?: boolean, alignToInterval?: boolean) => number` | Create a managed interval. Returns a handler ID (integer). |
| `clearInterval(handler)`         | `(handler: number) => void`                                  | Stop and remove the interval.                      |
| `pauseInterval(handler)`         | `(handler: number) => void`                                  | Pause the interval without removing it.            |
| `runInterval(handler)`           | `(handler: number) => void`                                  | Resume a paused interval.                          |

All handlers are managed in `ImbuInterval.cache` — a `Map<number, ImbuInterval>`.

## Constructor

```typescript signature
new ImbuInterval(callback: Function, interval: number, fixedRate?: boolean, alignToInterval?: boolean)
```

| Parameter         | Type        | Default  | Description                                              |
|-------------------|-------------|----------|----------------------------------------------------------|
| `callback`        | `Function`  | —        | The function to call at each interval tick.              |
| `interval`        | `number`    | —        | Interval duration in milliseconds.                       |
| `fixedRate`       | `boolean`   | `false`  | When `true`, the callback is invoked via `asyncCall` to prevent overlapping executions. |
| `alignToInterval` | `boolean`   | `false`  | When `true`, the first tick aligns to the next even interval boundary (e.g., on the second). |

## Instance Methods

| Method     | Signature    | Description                                               |
|------------|--------------|-----------------------------------------------------------|
| `pause()`  | `() => void` | Pause the interval (clears the pending `setTimeout`).     |
| `run()`    | `() => void` | Resume the interval (schedules the next tick).            |
| `finish()` | `() => void` | Pause the interval and remove it from the static cache.   |

## Properties

| Property  | Type        | Description                                              |
|-----------|-------------|----------------------------------------------------------|
| `io`      | `number`    | Unique handler ID assigned on construction.              |
| `interval`| `number`    | The interval duration in ms.                             |
| `fixedRate`| `boolean`  | Whether fixed-rate mode is enabled.                      |
| `paused`  | `boolean`   | Get/set the paused state. Setting to `true` clears the pending timeout; setting to `false` schedules the next tick. |

## How It Works

Unlike `setInterval` (which schedules fixed-interval callbacks regardless of callback duration), `ImbuInterval` uses a chain of `setTimeout` calls — each tick schedules the next. This prevents overlapping callbacks. When `fixedRate` is `true`, the callback is wrapped with `asyncCall` so that any returned promise is awaited before the next tick.

When `alignToInterval` is `true`, the timing offset is adjusted so that the first tick fires at the next time boundary:

```
alignToInterval = true, interval = 1000
Time.now() = 10:00:00.300
First tick scheduled at 10:00:01.000
```

## Examples

### Basic interval

```ts
const handler = setInterval(() => {
  console.log('Tick');
}, 1000);

// Later: stop it
clearInterval(handler);
```

### Fixed-rate animation loop

The callback will not be invoked again until the previous invocation completes:

```ts
const handler = setInterval(async () => {
  await doExpensiveWork();
}, 1000, true /* fixedRate */);
```

### Clock-aligned timing

Fire on the second boundary (every 30 seconds on the :00 and :30 marks):

```ts
setInterval(() => {
  updateClockDisplay();
}, 30000, false, true /* alignToInterval */);
```

### Pause and resume

```ts
const handler = setInterval(() => {
  pollServer();
}, 5000);

// Pause when user goes idle
pauseInterval(handler);

// Resume when user returns
runInterval(handler);
```

### Using the ImbuInterval class directly

```ts
const interval = new ImbuInterval(
  () => console.log('Tick'),
  2000,
  false,  // fixedRate
  true    // alignToInterval
);

interval.pause();
interval.run();
interval.finish(); // removes from cache
```

### Checking paused state

```ts
const handler = setInterval(myCallback, 1000);
console.log(ImbuInterval.cache.get(handler)?.paused); // false
pauseInterval(handler);
console.log(ImbuInterval.cache.get(handler)?.paused); // true
```
