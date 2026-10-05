# Optional terminal surface

`@jam/terminal-surface` hosts the non-React xterm emulator inside a native JAML container. Choose it for an interactive terminal screen that needs ANSI parsing, cursor movement and terminal input. Use native JAML buttons, labels and layout around the screen. A code editor or Markdown renderer is not a terminal substitute.

This is a separately delivered development extension, not a built-in element or a promise attached to the core framework version. Load its JavaScript and xterm stylesheet before use. The verified engine pair is xterm 6.0.0 and addon-fit 0.11.0. Loading the extension does not create a process or connect a transport.

## Ownership

The surface owns its emulator, ordered parser work, local geometry and listeners. The application owns process/session identity, transport, render acknowledgements, permission to send input, retention, clipboard actions and process close. Mounting the JAML container creates a disabled screen only.

In an explicit-connect application, selecting a terminal may show metadata without creating or mounting a transport view. An explicit Connect action obtains control. Forward all text `onData` events while that connection remains authorized, including emulator protocol replies; ordinary blur must not suppress them. Disconnect, control loss, transport loss, navigation and hiding can revoke that intent and detach the transport while retaining the process. Reconnect and process Close are separate application actions. Do not infer permission from focus or from a retained writable flag alone.

A disconnected retained screen is stale. If neither the Host nor another connected controller answers terminal queries, a program may wait or time out while disconnected. Keeping a process alive does not guarantee its progress.

## Creation and registration

The module exports `createTerminalSurface(host, options)` and `registerTerminalSurface(jam)`. The first creates an imperative surface in a measurable host; the second registers the `terminalSurface` plugin in `Plugins`. Registration is required before constructing a JAML option that uses the plugin. Keep one surface owner per host.

The options/plugin arguments are:

| Argument                       | Meaning                                                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `label`                        | Accessible terminal label; default `Terminal`.                                                                           |
| `scrollback`                   | Retained emulator history rows; default `1000`. Supply the application's actual limit.                                   |
| `theme`                        | Resolved xterm theme color values, not token names or unresolved CSS variables.                                          |
| `onData(data)`                 | Outbound text when input is enabled, including protocol replies. It does not distinguish typing from terminal responses. |
| `onSelectionChange(selection)` | Current selected text after the engine reports a selection change.                                                       |
| `onReady(surface)`             | Plugin callback for the newly mounted surface. Repeated mounts create distinct surfaces.                                 |
| `onDispose(surface)`           | Plugin callback identifying the surface that has been released. Clear references by identity.                            |

The plugin owns mount/unmount/destroy cleanup. Direct callers must call `dispose()` themselves. Callbacks are synchronous. Errors from `onData` or `onSelectionChange` are reported through the browser error channel without interrupting parsing; an `onReady` failure cleans up its own surface without disposing a newer replacement. Container removal never implies process close. External data goes directly into surface methods; do not interpolate it into JAML definitions or executable code.

This integration fragment requires a loaded core, the optional ESM module and its stylesheet, and a mounted `host` for the model. The application resolves the module URL from its delivered assets. It intentionally creates only a screen:

```javascript
const { registerTerminalSurface } = await import(terminalSurfaceModuleUrl);
registerTerminalSurface(jam);

let currentSurface;
const model = new jam.Model({
    type: 'container',
    styles: ['css(display:block;width:100%;height:20rem)'],
    plugins: [
        Plugins.terminalSurface({
            label: 'Terminal screen',
            scrollback: 1000,
            onReady(surface) {
                currentSurface = surface;
            },
            onDispose(surface) {
                if (currentSurface === surface) {
                    currentSurface = undefined;
                }
            }
        })
    ]
});
model.render(host);
// After the plugin's onReady callback, the application can supply a snapshot.
// model.destroy() releases the screen; the transport/process has its own owner.
```

## Surface operations

| Method                                  | Contract                                                                                                                                                                      |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `replaceSnapshot({ data, cols, rows })` | Supersedes older public operations, waits behind parser work already in flight, resets at the supplied geometry and parses the replacement screen.                            |
| `write(data)`                           | Parses text output in order. Data is terminal output, not HTML or executable JAML.                                                                                            |
| `cancelPending()`                       | Cancels outstanding operation results; parsing already in flight cannot be retracted. Use a new snapshot to establish replacement content or dispose to abandon the emulator. |
| `setInputEnabled(enabled)`              | Gates all outbound text. Starts disabled; disabling also blurs. Enabling does not focus automatically.                                                                        |
| `focus()` / `blur()`                    | Controls keyboard focus separately from input permission and transport ownership; disabled screens can still receive focus.                                                   |
| `getSelection()`                        | Returns selected text for an application-owned copy action. It does not write to the clipboard.                                                                               |
| `measure()`                             | Proposes dimensions for the current measured viewport, or returns `undefined`; does not resize or contact the Host.                                                           |
| `getDimensions()`                       | Reads the current emulator dimensions.                                                                                                                                        |
| `resize({ cols, rows })`                | Orders an explicit local resize behind parser work; does not resize a PTY.                                                                                                    |
| `setTheme(theme)`                       | Applies resolved colors through the engine's supported theme API in order.                                                                                                    |
| `dispose()`                             | Disables input, settles pending operations as disposed and releases owned resources.                                                                                          |

`replaceSnapshot`, `write`, `resize` and `setTheme` return a Promise resolving to `{ status: 'completed' }` or `{ status: 'cancelled', reason: 'superseded' | 'cancelled' | 'disposed' }`. Invalid input and engine failures reject. A completed write means parser completion, not browser paint or Host admission. A canceled result must not acknowledge a new transport frame. Keep an application generation/identity check around completion and only acknowledge the exact still-current revision. Cancellation does not promise to erase bytes already parsed or release a stalled parser barrier. Later operations wait for the real parser callback; dispose and create a fresh surface if the engine stops progressing. Cancellation alone does not disable input.

Fit after a snapshot completes at its authoritative dimensions. The application clamps measured dimensions to its Host limits, applies a local resize and sends a PTY resize only for a visible writable owner. Disconnected screens and read-only viewers must not drive PTY geometry. The surface does not install an automatic resize or theme observer; the application supplies those updates and disposes its observers.

## Theme, terminal protocols and limits

Resolve foreground/background, cursor and selection colors from the application's active theme at the point of use. The surface does not import a palette or subscribe to global theme state. Supply new resolved values after theme or swatch changes.

xterm remains the sole ANSI/OSC parser. Changing its theme establishes new default colors and can replace program-supplied palette overrides; do not assume overrides survive a theme update. OSC reset behavior follows the engine's current defaults. A screen snapshot does not establish restoration of every terminal-program palette or browser-only state.

The extension adds no OSC clipboard action or trusted title markup. OSC 8 link activation uses an inert supported engine handler, so it does not prompt or navigate; no automatic link-detection addon is loaded. Terminal strings still represent terminal control input: this is not an isolation boundary for a process. Clipboard and navigation policy belong to the application.

`setInputEnabled(false)` suppresses emulator-generated protocol replies as well as user input. While authorized and enabled, text `onData` remains active when the terminal is blurred. Legacy binary mouse reports are not forwarded as text; the existing text callback is not a binary transport API.

Use the engine's selection behavior and an explicit native Copy action where appropriate. Preserve shell Ctrl+C behavior. IME, paste, platform shortcuts, keyboard exit, assistive technology and full-screen program interactions need application-level acceptance; simulated input checks do not establish operating-system IME compatibility. Disable input and invalidate the old connection before navigation. Disabling input is not a promise to flush an in-progress IME composition; dispose and recreate the surface when abandoning composition across connection changes rather than immediately re-enabling the old emulator. No real-PTY, multi-client, cross-browser or large-output performance guarantee is implied by the extension's native browser checks.
