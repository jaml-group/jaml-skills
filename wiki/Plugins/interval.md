# ImbuInterval — Smarter setInterval

`ImbuInterval` is a managed interval timer with pause/resume and optional alignment to clock boundaries. Use `jam.setInterval` and its paired helpers in the browser, or import them from `@jam/jam-ui`. They do not replace the browser’s `window.setInterval` or share its handler IDs.

Construction and resuming start a tick without waiting for the interval; `fixedRate: true` may defer its callback through the framework scheduler. Returned promises are not awaited; applications own asynchronous overlap, error handling and cancellation.

## Managed timer API

| Function                                                            | Signature                                                                                          | Description                                                |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `jam.setInterval(callback, interval, fixedRate?, alignToInterval?)` | `(callback: Function, interval: number, fixedRate?: boolean, alignToInterval?: boolean) => number` | Create a managed interval. Returns a handler ID (integer). |
| `jam.clearInterval(handler)`                                        | `(handler: number) => void`                                                                        | Stop and remove the interval.                              |
| `jam.pauseInterval(handler)`                                        | `(handler: number) => void`                                                                        | Pause the interval without removing it.                    |
| `jam.runInterval(handler)`                                          | `(handler: number) => void`                                                                        | Resume a paused interval.                                  |

All managed handlers are stored in `jam.ImbuInterval.cache` — a `Map<number, ImbuInterval>`. Always clear them with the matching managed helper. Module usage can import `ImbuInterval` and the helper functions from `@jam/jam-ui`.

## Constructor

```typescript signature
new ImbuInterval(callback: Function, interval: number, fixedRate?: boolean, alignToInterval?: boolean)
```

| Parameter         | Type       | Default | Description                                                                                                                                                    |
| ----------------- | ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `callback`        | `Function` | —       | The function to call at each interval tick.                                                                                                                    |
| `interval`        | `number`   | —       | Interval duration in milliseconds.                                                                                                                             |
| `fixedRate`       | `boolean`  | `false` | When `true`, defer invocation through the framework scheduler (normally a microtask; synchronous in sync mode). It does not await promises or prevent overlap. |
| `alignToInterval` | `boolean`  | `false` | When `true`, schedule subsequent ticks toward clock boundaries. The initial and resume invocation still happen immediately.                                    |

## Instance Methods

| Method     | Signature    | Description                                                 |
| ---------- | ------------ | ----------------------------------------------------------- |
| `pause()`  | `() => void` | Pause the interval (clears the pending `setTimeout`).       |
| `run()`    | `() => void` | Invoke now and continue scheduling. Call only while paused. |
| `finish()` | `() => void` | Pause the interval and remove it from the static cache.     |

## Properties

| Property    | Type      | Description                                                                                                                      |
| ----------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `io`        | `number`  | Unique handler ID assigned on construction.                                                                                      |
| `interval`  | `number`  | The interval duration in ms.                                                                                                     |
| `fixedRate` | `boolean` | Whether callback invocation uses the framework scheduler.                                                                        |
| `paused`    | `boolean` | Get/set the paused state. Setting to `true` clears the pending timeout; setting to `false` invokes now and continues scheduling. |

## How It Works

`ImbuInterval` schedules one timeout after each invocation. With `fixedRate: false`, a synchronous callback runs before that timeout is scheduled. With `fixedRate: true`, callback invocation uses the framework scheduler, but the next timeout is scheduled without waiting for asynchronous work. Neither mode serializes returned promises.

Pause or finish cancels the currently scheduled timeout; it does not cancel an already queued callback or work started by the callback. Resuming an already running timer can create another schedule, so resume only a paused timer. When callbacks run synchronously, avoid pausing or finishing inside the callback: that invocation still schedules its next timeout afterward.

When `alignToInterval` is `true`, the delay after an invocation targets the next clock boundary; browser scheduling can still run it late:

```
alignToInterval = true, interval = 1000
Time.now() = 10:00:00.300
Initial callback at 10:00:00.300
Next tick scheduled for 10:00:01.000
```

## Examples

### Basic interval

```ts
const handler = jam.setInterval(() => {
    console.log('Tick');
}, 1000);

// Later: stop it
jam.clearInterval(handler);
```

### Avoid overlapping asynchronous work

For an application-provided asynchronous operation, explicitly skip ticks while it is in flight:

```ts
let inFlight = false;
const handler = jam.setInterval(() => {
    if (inFlight) {
        return;
    }
    inFlight = true;
    Promise.resolve()
        .then(() => doExpensiveWork())
        .catch((error) => console.error(error))
        .finally(() => {
            inFlight = false;
        });
}, 1000);

// Stops future scheduled ticks; cancel the operation separately if needed.
jam.clearInterval(handler);
```

### Clock-aligned timing

Run immediately, then aim for each half-minute boundary (:00 and :30):

```ts
jam.setInterval(
    () => {
        updateClockDisplay();
    },
    30000,
    false,
    true /* alignToInterval */
);
```

### Pause and resume

```ts
const handler = jam.setInterval(() => {
    pollServer();
}, 5000);

// Pause when user goes idle
jam.pauseInterval(handler);

// Resume when user returns
jam.runInterval(handler);
```

### Using the ImbuInterval class directly

```ts
import { ImbuInterval } from '@jam/jam-ui';

const interval = new ImbuInterval(
    () => console.log('Tick'),
    2000,
    false, // fixedRate
    true // alignToInterval
);

interval.pause();
interval.run();
interval.finish(); // removes from cache
```

### Checking paused state

```ts
const handler = jam.setInterval(myCallback, 1000);
console.log(jam.ImbuInterval.cache.get(handler)?.paused); // false
jam.pauseInterval(handler);
console.log(jam.ImbuInterval.cache.get(handler)?.paused); // true
```
