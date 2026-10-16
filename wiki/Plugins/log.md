# LimeLog — Logging Utility

`LimeLog` wraps `console.*` methods with timestamped, level-based prefixes. The browser singleton `lime` also accepts color strings as method names for colored debug output. Access the class as `jam.LimeLog`, or import it from `@jam/jam-ui`.

## Log Levels

Log levels are defined on `LimeLog.LEVEL`. They label messages and configure debug behavior; they are not an output threshold for ordinary log methods.

| Level  | `value` | Name     |
| ------ | ------- | -------- |
| PROMPT | `0`     | `PROMPT` |
| DEBUG  | `1`     | `DEBUG`  |
| TRACE  | `2`     | `TRACE`  |
| INFO   | `2`     | `INFO`   |
| WARN   | `3`     | `WARN`   |
| ERROR  | `4`     | `ERROR`  |

Ordinary `log`, `info`, `warn`, `error`, `debug` and `trace` calls are dispatched regardless of `logLevel`; the browser console may apply its own filters. `debugMode` enables the debugger stop in `unreachable` and, together with development mode, enables `prompt`. `unreachable` still logs an error when debug mode is off and never throws by itself.

## Global API: `lime.*`

| Method / Property      | Type / Signature           | Description                                                        |
| ---------------------- | -------------------------- | ------------------------------------------------------------------ |
| `lime.log(...args)`    | `(...args: any[]) => void` | Log at INFO level with timestamp prefix.                           |
| `lime.info(...args)`   | `(...args: any[]) => void` | Log at INFO level.                                                 |
| `lime.warn(...args)`   | `(...args: any[]) => void` | Log at WARN level.                                                 |
| `lime.error(...args)`  | `(...args: any[]) => void` | Log at ERROR level.                                                |
| `lime.debug(...args)`  | `(...args: any[]) => void` | Log at DEBUG level.                                                |
| `lime.trace(...args)`  | `(...args: any[]) => void` | Log at TRACE level.                                                |
| `lime.prompt(...args)` | `(...args: any[]) => void` | Log at PROMPT level; no-op unless `debugMode && development` mode. |
| `lime.print(...args)`  | `(...args: any[]) => void` | Plain `console.log` without prefix.                                |
| `lime.unreachable()`   | `(...args: any[]) => void` | Triggers `debugger` in debug mode, then logs at ERROR level.       |

## Static Configuration

| Property            | Type              | Description                                                                                          |
| ------------------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `LimeLog.logLevel`  | `number \| Level` | Get the current `Level`; set a `Level` or an exact numeric value. Unknown numbers fall back to INFO. |
| `LimeLog.debugMode` | `boolean`         | Convenience getter/setter. Sets level to `DEBUG` (true) or `INFO` (false).                           |

## Color-based proxy behavior

A valid color string can select a colored background badge. These calls use `console.debug` with a PROMPT label, independently of `lime.prompt` gating:

```js
lime['hsl(120 61% 50%)']('Server started on port', 8080);
// => [2025-06-15 10:30:00.123][PROMPT][module.js] Server started on port 8080
//    (rendered with a tinted, translucent background badge)
```

## Constructor

```typescript signature
new LimeLog(logger?: string)
```

If no `logger` name is provided, the calling file path is automatically inferred from the stack trace.

## Exported Helpers

Named exports are also available for direct import:

```ts
import { debug, error, info, log, print, trace, unreachable, warn } from '@jam/jam-ui';
```

## Examples

### Basic usage

```ts
// Global singleton
lime.log('Application started');
lime.info('Loading module', moduleName);
lime.warn('Deprecated API used');
lime.error('Failed to connect', err);

// Dispatched to console.debug regardless of debugMode
lime.debug('State tree:', state);
```

### Toggling debug mode

```ts
// Enable debug mode
jam.LimeLog.debugMode = true;
lime.prompt('Shown in development mode with debugMode enabled');

// Use numeric level
jam.LimeLog.logLevel = 3; // WARN; disables debugMode
lime.info('Still dispatched'); // Ordinary methods are not filtered
lime.warn('Warning');
lime.error('Error');
```

### Using unreachable

```ts
function exhaustiveCheck(x: never): never {
    lime.unreachable('Unexpected value:', x);
    throw new Error('Unexpected value');
}
```

### Color-coded debug markers

```js
lime['hsl(348 83% 47%)']('Critical path entered');
lime['hsl(146 50% 36%)']('Optimization applied');
lime['hsl(43 74% 49%)']('Timer fired');
```

### Creating a scoped logger

New instances can be created for a specific module:

```ts
import { LimeLog } from '@jam/jam-ui';

const logger = new LimeLog('MyModule');
logger.info('Module initialised');
```
