# LimeLog — Logging Utility

`LimeLog` is a structured logging utility that wraps `console.*` methods with timestamped, level-based prefixes. It is exposed globally as `lime`, which additionally acts as a `Proxy` that accepts any valid [W3C CSS color name](https://www.w3.org/TR/css-color-3/#svg-color) as a method — useful for color-coded debug output.

## Log Levels

Log levels are defined on `LimeLog.LEVEL` and control which messages are emitted.

| Level   | `value` | Name       |
|---------|---------|------------|
| PROMPT  | `0`     | `PROMPT`   |
| DEBUG   | `1`     | `DEBUG`    |
| TRACE   | `2`     | `TRACE`    |
| INFO    | `2`     | `INFO`     |
| WARN    | `3`     | `WARN`     |
| ERROR   | `4`     | `ERROR`    |

Messages with a level value below the current `logLevel` are still dispatched (the level controls prefix behaviour); `debugMode` gates prompter output and the `unreachable` helper.

## Global API: `lime.*`

| Method / Property    | Type / Signature                       | Description                                                |
|----------------------|----------------------------------------|------------------------------------------------------------|
| `lime.log(...args)`  | `(...args: any[]) => void`             | Log at INFO level with timestamp prefix.                   |
| `lime.info(...args)` | `(...args: any[]) => void`             | Log at INFO level.                                         |
| `lime.warn(...args)` | `(...args: any[]) => void`             | Log at WARN level.                                         |
| `lime.error(...args)`| `(...args: any[]) => void`             | Log at ERROR level.                                        |
| `lime.debug(...args)`| `(...args: any[]) => void`             | Log at DEBUG level.                                        |
| `lime.trace(...args)`| `(...args: any[]) => void`             | Log at TRACE level.                                        |
| `lime.prompt(...args)`| `(...args: any[]) => void`            | Log at PROMPT level; no-op unless `debugMode && development` mode. |
| `lime.print(...args)`| `(...args: any[]) => void`             | Plain `console.log` without prefix.                        |
| `lime.unreachable()` | `(...args: any[]) => void`             | Triggers `debugger` in debug mode, then logs at ERROR level.|

## Static Configuration

| Property                        | Type                  | Description                                              |
|---------------------------------|-----------------------|----------------------------------------------------------|
| `LimeLog.logLevel`              | `number \| Level`     | Get / set the current log level. Setting with a number looks up the closest `Level`. |
| `LimeLog.debugMode`             | `boolean`             | Convenience getter/setter. Sets level to `DEBUG` (true) or `INFO` (false). |

## Color-name Proxy Behaviour

When `lime` is called with a property name that is a valid W3C CSS color name (e.g. `lime.limegreen(...)`), the proxy intercepts the call and renders the arguments with a coloured background badge at PROMPT level:

```js
lime.limegreen('Server started on port', 8080);
// => [2025-06-15 10:30:00.123][PROMPT][module.js] Server started on port 8080
//    (rendered with a limegreen-tinted background badge via chroma-js)
```

## Constructor

```typescript signature
new LimeLog(logger?: string)
```

If no `logger` name is provided, the calling file path is automatically inferred from the stack trace.

## Exported Helpers

Named exports are also available for direct import:

```ts
import { log, info, warn, error, debug, trace, unreachable, print } from 'jam-ui/plugins/LimeLog';
```

## Examples

### Basic usage

```ts
// Global singleton
lime.log('Application started');
lime.info('Loading module', moduleName);
lime.warn('Deprecated API used');
lime.error('Failed to connect', err);

// DEBUG level (only visible when debugMode is on)
lime.debug('State tree:', state);
```

### Toggling debug mode

```ts
// Enable debug mode
LimeLog.debugMode = true;
lime.debug('This will now appear');

// Use numeric level
LimeLog.logLevel = 3; // WARN
lime.info('Hidden');       // not shown (info < warn)
lime.warn('Visible');      // shown
lime.error('Also visible');
```

### Using unreachable

```ts
function exhaustiveCheck(x: never): never {
  return lime.unreachable('Unexpected value:', x);
}
```

### Color-coded debug markers

```ts
lime.crimson('Critical path entered');
lime.seagreen('Optimization applied');
lime.goldenrod('Timer fired');
```

### Creating a scoped logger

New instances can be created for a specific module:

```ts
const logger = new LimeLog('MyModule');
logger.info('Module initialised');
```
