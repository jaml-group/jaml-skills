# RaspberryRequest — HTTP Request Engine

`RaspberryRequest` (exposed globally as `raspberry`) is a unified HTTP request engine supporting two built-in backends: `fetch` (native `fetch` API) and `axios` (when the Axios library is loaded). It provides content-type auto-detection, caching, batch requests, mock fallback, and custom engine registration.

## Global API: `raspberry.*`

| Method / Property              | Description                                                         |
|--------------------------------|---------------------------------------------------------------------|
| `raspberry.use(type)`          | Switch request engine — `'fetch'` or `'axios'`.                     |
| `raspberry.request(option)`    | Send a single or batch HTTP request. Returns a `Promise<any>`.      |
| `raspberry.setHandlers(handlers)` | Set custom data transformation handlers (array of functions).   |
| `raspberry.optionBuilder`      | Callback to transform the option before each request.               |
| `raspberry.codeMessageHandler` | Default handler for HTTP code-based error messages.                 |
| `raspberry.textDataHandler`    | Default handler for text-based response data.                       |
| `raspberry.shouldUseMock(method)` | Set a predicate function that returns `true` to use mock fallback. |
| `raspberry.register(type, requestClazz)` | Register a custom request engine by name. Accepts an `AbstractRequest` subclass or a function used as `makeRequest()`. |

## RequestOption

| Field        | Type                        | Description                                                   | Notes                                         |
|--------------|-----------------------------|---------------------------------------------------------------|-----------------------------------------------|
| `url`        | `string`                    | The request URL.                                              | Required.                                     |
| `method`     | `string`                    | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.).           | Default: `'GET'`.                             |
| `type`       | `string`                    | Override the request engine type for this call.               | e.g. `'fetch'` or `'axios'`. Defaults to the globally configured type. |
| `data`       | `any`                       | Request body.                                                 | Objects are JSON-stringified (not GET); `FormData` sent as-is. |
| `params`     | `Record<string, any>`       | URL query parameters.                                         | Merged into the URL.                          |
| `headers`    | `Record<string, string>`    | Custom HTTP headers.                                          | Keys are train-cased automatically.           |
| `timeout`    | `number`                    | Request timeout in ms.                                        | Only used by axios backend.                   |
| `responseType` | `'blob'`                  | Force a Blob response instead of content-type auto-detection. | Supported by fetch and axios; included in the request cache identity. |
| `urls`       | `(string \| Partial<RequestOption>)[]` | Batch URLs — `request()` sends all in parallel.      | Each item is either a URL string or a partial option that is merged with the parent. |
| `transform`  | `(results: any[]) => any`   | Transform function called with all results after batch fetch. | Only for `urls` batch requests.               |
| `onsuccess`  | `(results: any[]) => any`   | Success callback after transform.                             | Only for `urls` batch requests.               |
| `mock`       | `() => any`                 | Mock response function.                                       | Called when `shouldUseMock` returns true.     |

## Content-Type Handling

The engine auto-detects response content type and parses accordingly:

| Content-Type                          | Parsed As            |
|---------------------------------------|----------------------|
| `application/json`                    | `response.json()`    |
| `application/x-www-form-urlencoded`   | `Object.fromEntries(new URLSearchParams(...))` |
| `multipart/form-data`                 | `response.formData()`|
| `application/xml` / `text/xml`        | `DOMParser` → XML document |
| `text/*`                              | Text (with JSON auto-detection) |
| Binary types (pdf, zip, doc, image, audio, video, etc.) | `Blob` |

Set `responseType: 'blob'` to bypass content-type auto-detection. The fetch backend calls `response.blob()` immediately, while the axios backend passes `responseType: 'blob'` through to axios.

## Batch Requests (`urls`)

When `option.urls` is provided, the engine sends all requests in parallel via `Promise.all`. The `url`, `transform`, and `onsuccess` fields from the parent option are omitted from individual sub-requests, allowing per-URL overrides.

```ts
raspberry.request({
  method: 'GET',
  headers: { Authorization: 'Bearer token' },
  urls: [
    '/api/users',
    '/api/posts',
    { url: '/api/comments', params: { limit: 10 } }
  ],
  transform: ([users, posts, comments]) => ({ users, posts, comments }),
  onsuccess: (data) => console.log('All data:', data)
});
```

## Mock Fallback

```ts
raspberry.shouldUseMock((error) => {
  return error.message.includes('NetworkError');
});

raspberry.request({
  url: '/api/data',
  mock: () => ({ id: 1, name: 'Mock User' })
});
```

## Global Configuration

```ts
// Set engine to axios (requires axios to be loaded globally)
raspberry.use('axios');

// Register a custom engine
raspberry.register('my-engine', async function() {
  // this is the AbstractRequest instance
  return fetch(this.url).then((res) => res.json())
});

// Set a global option builder
raspberry.optionBuilder = (option) => {
  option.headers = option.headers || {};
  option.headers['X-CSRF-Token'] = getCsrfToken();
  return option;
};
```

## Examples

### Basic GET request

```ts
raspberry.request({
  url: '/api/users',
  method: 'GET',
  params: { page: 1, limit: 20 }
}).then((users) => {
  console.log('Users:', users);
});
```

### POST with JSON body

```ts
raspberry.request({
  url: '/api/users',
  method: 'POST',
  data: { name: 'Alice', email: 'alice@example.com' },
  headers: { 'Content-Type': 'application/json' }
});
```

### Form data upload

```ts
const formData = new FormData();
formData.append('file', fileInput.files[0]);

raspberry.request({
  url: '/api/upload',
  method: 'POST',
  data: formData
});
```

### URL-encoded form

```ts
raspberry.request({
  url: '/api/login',
  method: 'POST',
  data: { username: 'alice', password: 'secret' },
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});
```

### Binary file download

```ts
raspberry.request({
  url: '/api/download/report.pdf',
  method: 'GET',
  responseType: 'blob'
}).then((blob) => {
  const url = URL.createObjectURL(blob);
  window.open(url);
});
```

### Error handling

```ts
raspberry.request({ url: '/api/protected' }).catch((error) => {
  console.error('Request failed:', error.status, error.message);
});
```
