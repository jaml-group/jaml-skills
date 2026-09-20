# StrawberrySocket — WebSocket Manager

`StrawberrySocket` is a WebSocket connection manager extending `AbstractConnect`. It provides automatic reconnection, a `openReady` promise for safe message sending, and structured lifecycle hooks.

## Constructor Options

```typescript signature
new StrawberrySocket(option: SocketOption)
```

`SocketOption` extends `ConnectOption` with additional WebSocket-specific fields:

| Option       | Type                        | Description                                              | Notes                                      |
|-------------|-----------------------------|----------------------------------------------------------|--------------------------------------------|
| `url`       | `string`                    | WebSocket server URL.                                    | Required. Inherited from `ConnectOption`.   |
| `onopen`    | `(event: Event) => void`    | Called when the connection opens.                        |                                            |
| `onclose`   | `(event: CloseEvent) => void`| Called when the connection closes.                      |                                            |
| `onmessage` | `(payload: string) => void` | Called with the raw message data (string).               |                                            |
| `ontimeout` | `() => void`                | Called when the connection attempt times out.            | Inherited from `ConnectOption`.             |
| `onerror`   | `(error: any) => void`      | Called when an error occurs.                             | Inherited from `ConnectOption`.             |
| `binaryType`| `BinaryType`                | Sets `socket.binaryType` (e.g. `'arraybuffer'`).         | Optional.                                   |

## Methods

| Method                        | Signature                                    | Description                                               |
|-------------------------------|----------------------------------------------|-----------------------------------------------------------|
| `connect()`                   | `() => Promise<this>`                        | Initiate the WebSocket connection (inherited).            |
| `close()`                     | `() => void`                                 | Gracefully close the WebSocket connection.                |
| `send(arg)`                   | `(arg: any) => Promise<void>`                | Send a message. Waits for `openReady` if not yet open.    |
| `abort(reason?)`              | `(reason?: string) => void`                  | Abort the connection and cancel reconnect timers.         |
| `addEventListener(event, cb)` | `(event: keyof WebSocketEventMap, callback: EventHandler) => void` | Add a native WebSocket event listener.  |
| `removeEventListener(event, cb)` | `(event: any, callback: EventHandler) => void` | Remove a native WebSocket event listener.             |

## Properties

| Property    | Type                    | Description                                                    |
|-------------|-------------------------|----------------------------------------------------------------|
| `socket`    | `WebSocket \| null`     | The underlying `WebSocket` instance.                           |
| `openReady` | `Promise<void>`         | Resolves when the connection is established. Resets on close.  |
| `readyState`| `number`                | Current WebSocket ready state (or `WebSocket.CLOSED`).         |
| `binaryType`| `BinaryType \| undefined`| The binary type for received data.                             |

## Auto-reconnect

Auto-reconnection behaviour is inherited from `AbstractConnect`:

- `reconnectInterval`: delay between reconnect attempts (default `3000` ms).
- `maxReconnectAttempts`: maximum number of reconnect attempts (default `10`).
- `reconnectDecay`: multiplier applied to the interval after each attempt.
- `reconnect`: set to `true` (default) to enable auto-reconnect.

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

The `openReady` promise ensures messages are never sent on a closed socket:

```ts
async function sendMessage(socket: StrawberrySocket, msg: any) {
  // This is handled internally by send(), but openReady is also exposed
  await socket.openReady;
  socket.send(msg);
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
// Closes the socket and clears all reconnect timers
```

### Binary type configuration

```ts
const socket = new StrawberrySocket({
  url: 'wss://example.com/ws',
  binaryType: 'arraybuffer'
});
// Received binary data will be returned as ArrayBuffer
```
