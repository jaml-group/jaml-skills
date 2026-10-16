# StrawberrySocket — WebSocket Manager

`StrawberrySocket` is a WebSocket connection manager extending `AbstractConnect`. It provides an `openReady` promise and connection lifecycle hooks. Reconnection and backoff belong to the application.

## Constructor Options

```typescript signature
new StrawberrySocket(option: SocketOption)
```

`SocketOption` extends `ConnectOption` with additional WebSocket-specific fields:

| Option       | Type                          | Description                                                                                                           | Notes                                     |
| ------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `url`        | `string`                      | WebSocket server URL.                                                                                                 | Required. Inherited from `ConnectOption`. |
| `onopen`     | `(event: Event) => void`      | Called when the connection opens.                                                                                     |                                           |
| `onclose`    | `(event: CloseEvent) => void` | Called when the connection closes.                                                                                    |                                           |
| `onmessage`  | `(payload: string) => void`   | Called with raw message data. Despite the string declaration, binary messages can deliver Blob or ArrayBuffer values. |                                           |
| `ontimeout`  | `() => void`                  | Called when the connection attempt times out.                                                                         | Inherited from `ConnectOption`.           |
| `onerror`    | `(error: any) => void`        | Called when an error occurs.                                                                                          | Inherited from `ConnectOption`.           |
| `binaryType` | `BinaryType`                  | Sets `socket.binaryType` (e.g. `'arraybuffer'`).                                                                      | Optional.                                 |

## Methods

| Method                           | Signature                                                          | Description                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `connect()`                      | `() => Promise<any>`                                               | Initiate connection; the default successful result is the native WebSocket. An inherited success callback can change the result. |
| `close()`                        | `() => void`                                                       | Gracefully close the WebSocket connection.                                                                                       |
| `send(arg)`                      | `(arg: any) => Promise<void>`                                      | Send a message. Waits for `openReady` if not yet open.                                                                           |
| `abort(reason?)`                 | `(reason?: string) => void`                                        | Abort the connection and cancel reconnect timers.                                                                                |
| `addEventListener(event, cb)`    | `(event: keyof WebSocketEventMap, callback: EventHandler) => void` | Add a native WebSocket event listener.                                                                                           |
| `removeEventListener(event, cb)` | `(event: any, callback: EventHandler) => void`                     | Remove a native WebSocket event listener.                                                                                        |

## Properties

| Property     | Type                      | Description                                                   |
| ------------ | ------------------------- | ------------------------------------------------------------- |
| `socket`     | `WebSocket \| null`       | The underlying `WebSocket` instance.                          |
| `openReady`  | `Promise<void>`           | Resolves when the connection is established. Resets on close. |
| `readyState` | `number`                  | Current WebSocket ready state (or `WebSocket.CLOSED`).        |
| `binaryType` | `BinaryType \| undefined` | The binary type for received data.                            |

## Reconnection and lifetime

This runtime does not automatically reconnect or implement a retry/backoff policy. Settings named `reconnectInterval`, `maxReconnectAttempts`, `reconnectDecay` or `reconnect: true` do not enable one. The application owns retry timing, connection replacement and disposal.

`openReady` resolves for a successful opening and is replaced on close. It does not reject on every failed or aborted opening, and `send()` can remain pending if no opening occurs. It does not initiate a connection. Opening readiness is not a guarantee that the socket remains open: await `send()` and handle failures. Close or abort a started connection when its owner retires, and release application-owned retry timers and listeners.

## Examples

### Basic WebSocket connection

```ts
const socket = new StrawberrySocket({
    url: 'wss://api.example.com/ws',
    onopen: (event) => {
        console.log('Connected');
    },
    onclose: (event) => {
        console.log('Disconnected:', event.code);
    },
    onmessage: (payload) => {
        console.log('Received:', payload);
    },
    onerror: (error) => {
        console.error('Socket error:', error);
    }
});

socket.connect();
```

### Sending and receiving messages

```ts
const socket = new StrawberrySocket({
    url: 'wss://chat.example.com',
    onmessage: (payload) => {
        const msg = JSON.parse(payload);
        displayMessage(msg);
    }
});

await socket.connect();

// Objects are auto-serialized
socket.send({ type: 'join', channel: 'general' });
socket.send('plain text message');

// Sending binary data
socket.send(new Uint8Array([0x00, 0x01, 0x02]));
```

### Safe send before connection is open

For a connection that the application has already started, wait for opening before sending. The operation can still fail if the connection closes:

```ts
async function sendMessage(socket: StrawberrySocket, msg: any) {
    // This is handled internally by send(), but openReady is also exposed
    await socket.openReady;
    await socket.send(msg);
}
```

### Using native event listeners

```ts
const socket = new StrawberrySocket({ url: 'wss://example.com/ws' });
await socket.connect();

socket.addEventListener('message', (event) => {
    console.log('Native message event:', event.data);
});
```

### Aborting with custom reason

```ts
socket.abort('User navigated away');
// Closes the started connection; dispose application-owned retry timers separately
```

### Binary type configuration

```ts
const socket = new StrawberrySocket({
    url: 'wss://example.com/ws',
    binaryType: 'arraybuffer'
});
// Received binary data will be returned as ArrayBuffer
```
