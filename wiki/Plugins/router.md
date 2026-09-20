# RambutanRouter — SPA Router

`RambutanRouter` is a single-page application router supporting hash-based and history-based routing. It is exposed globally as `rambutan` via a `Proxy` that delegates property access to the underlying `AbstractRouter` instance.

The router supports path parameters, route lifecycle hooks, pre-render resource loading, URL parameter syncing via the messenger system, and parameter preservation across navigations.

## Global API: `rambutan.*`

| Property / Method                     | Description                                                                          |
|---------------------------------------|--------------------------------------------------------------------------------------|
| `rambutan.use(type)`                  | Switch routing mode — `'history'` (default) or `'hash'`.                             |
| `rambutan.routes`                     | Get/set the routes map. Setting accepts `Record<string, Route>` or `Route[]`.        |
| `rambutan.addRoute(route)`            | Add a single route definition.                                                        |
| `rambutan.addRoutes(routes)`          | Add multiple route definitions at once. Returns `this` for chaining.                 |
| `rambutan.removeRoute(path)`          | Remove a route by its path.                                                           |
| `rambutan.switchTo(path, params?)`    | Navigate to the given path with optional parameters.                                  |
| `rambutan.setParams(value, quietly?)` | Update URL parameters. When `quietly: true`, saves params without resolving.          |
| `rambutan.updateParams(value)`        | Silently update URL parameters (calls `setParams` with `quietly: true`).              |
| `rambutan.currPath`                   | The current route path string.                                                        |
| `rambutan.currRoute`                  | The current `Route` object.                                                           |
| `rambutan.prevRoute`                  | The previous `Route` object (before the last navigation).                             |
| `rambutan.currParams`                 | Get the current route's render parameters.                                            |
| `rambutan.type`                       | Returns the active router type: `'history'` or `'hash'`.                              |
| `rambutan.routeData`                  | Array of `RouteData` for building navigation UI.                                      |
| `rambutan.routeDataSnapshot`          | `{ routes, current }`, where `routes` is available navigation data and `current` is current breadcrumb route data. |
| `rambutan.nestedRouteData`            | Nested route data structure (grouped by path segments) for hierarchical navigation.   |
| `rambutan.getCurrentRouteData()`      | Current route chain across root router and subrouters.                                |
| `rambutan.getRouteData(parentPath?, pathOrRoutes?)` | Route data for all routes, siblings under `parentPath`, or a supplied route collection. |
| `rambutan.getNestedRouteData(path?)`  | Nested route data, optionally scoped to a path.                                       |
| `rambutan.getRoutePathKey(path)`      | Mango key used to publish the active subroute path for a matched route.               |
| `rambutan.currMatch`                  | Current match object: `{ route, params, ownParams, matchedPath, subPath }`.           |
| `rambutan.resolveCurrent()`           | Resolve the current URL path immediately.                                             |
| `rambutan.resolveCurrentSubRouter(params?)` | Resolve the active child router for the current match.                           |
| `rambutan.is(path, params?)`          | Check if the current route matches the given path and params.                         |
| `rambutan.getHash()`                  | Get the current URL hash.                                                             |
| `rambutan.setHash(hash, quietly?)`    | Set the URL hash.                                                                     |
| `rambutan.resolvePath(path)`          | Resolve a relative path against the current `rootPath`.                               |
| `rambutan.rootPath`                   | Get/set the base path. Auto-detects from `<base>` tag.                                |
| `rambutan.registerTo(rootpath)`       | Register the router under a specific base path (must end with `/`).                   |
| `rambutan.syncTitle`                  | Get/set whether to automatically sync `document.title` with the route name.           |
| `rambutan.container`                  | The container element (or selector) where route content is rendered.                  |
| `rambutan.resources`                  | Global resources loaded before any route render.                                      |
| `rambutan.beforeSwitch`               | Hook called before route switch.                                                      |
| `rambutan.afterSwitch`                | Hook called after route switch.                                                       |
| `rambutan.beforeRender`               | Hook called before route render.                                                      |
| `rambutan.afterRender`                | Hook called after route render.                                                       |
| `rambutan.pathWatcher`                | Mango key for path change watcher.                                                    |

## Route Definition

| Field             | Type                        | Description                                                  |
|-------------------|-----------------------------|--------------------------------------------------------------|
| `path`            | `string`                    | Route path starting with `/`. Supports `:param` and `:param(.*)` placeholders; `''` is allowed for index routes.|
| `name`            | `string`                    | Human-readable route name.                                   |
| `title`           | `string`                    | Document title (used when `syncTitle` is enabled).           |
| `icon`            | `string`                    | Icon identifier for navigation UI.                           |
| `hide`            | `boolean`                   | Hide this route from navigation.                             |
| `render`          | `Function`                  | Render function called with `(router, params)`. Must be idempotent. |
| `resources`       | `string[]`                  | URLs of scripts/modules to load before rendering.            |
| `params`          | `Dictionary`                | Default parameters for the route.                            |
| `preserveParams`  | `boolean \| number`         | Persist render params across navigations. `true` = 7 days TTL. Number = TTL in ms. |
| `syncParams`      | `string[]`                  | Parameter keys to sync via the messenger bus.                |
| `broker`          | `string`                    | Messenger broker name (defaults to path without leading `/`).|
| `group`           | `string`                    | Group name for organizing routes in navigation.              |
| `onEnter`         | `(router, params) => void`  | Called when entering this route (before resource load).      |
| `onLeave`         | `(router, params) => void`  | Called when leaving this route.                              |
| `subRouter`       | `AbstractRouter`            | Runtime child router attached by a nested route outlet.      |
| `styles`          | `StyleOption[]`             | Additional styles for this route in navigation.              |

## Path Parameters

Parameters are defined in the route path using `:paramName` syntax:

```ts
rambutan.addRoute({
  path: '/users/:id',
  name: 'User Detail',
  render: (router, params) => {
    console.log('User ID:', params.id); // extracted from URL
  }
});

// Navigate: rambutan.switchTo('/users/42');
// params.id will be '42'
```

## Route Lifecycle Hooks

The navigation lifecycle follows this order:

1. `currRoute.onLeave()` — called on the previous route
2. `rambutan.beforeSwitch()` — global before-switch hook
3. `currRoute.onEnter()` — called on the new route
4. Resource loading (scripts/modules from `resources` and `rambutan.resources`)
5. Initial theme readiness (`await jam.themeReady`)
6. `rambutan.beforeRender()` — global before-render hook
7. Route rendering (`render()` / `moduleRender()`)
8. `rambutan.afterRender()` — global after-render hook
9. `rambutan.afterSwitch()` — global after-switch hook
10. `syncParams` — parameter values are published to the messenger

## preserveParams

When `preserveParams` is set on a route, any parameters passed during rendering are saved and automatically restored on subsequent navigations to that route. Parameters are persisted via `milo.set()` with a default TTL of 7 days when `preserveParams: true`, or a custom TTL when a number is provided (in milliseconds).

## syncParams

When `syncParams` is an array of parameter keys, those parameter values are published to the messenger bus under their key names. This allows other components to react to parameter changes without direct coupling to the router.

## Examples

### Basic setup with history mode

```ts
rambutan.use('history');
rambutan.container = '#app';

rambutan.addRoutes([
  {
    path: '/',
    name: 'Home',
    render: () => jaml('#app', { type: 'text', value: 'Welcome' })
  },
  {
    path: '/about',
    name: 'About',
    render: () => jaml('#app', { type: 'text', value: 'About page' })
  }
]);
```

### Path parameters and onEnter/onLeave hooks

```ts
rambutan.addRoute({
  path: '/products/:category/:id',
  name: 'Product Detail',
  title: 'Product',
  params: { tab: 'details' },
  onEnter: (router, params) => {
    console.log('Entering product:', params.category, params.id);
  },
  onLeave: (router, params) => {
    saveFormState(params.id);
  },
  render: (router, { category, id, tab }) => {
    jaml('#app', {
      type: 'container',
      components: [
        { type: 'text', value: `Category: ${category}, Product: ${id}` },
        { type: 'tabs', value: tab }
      ]
    });
  }
});

// Navigate: rambutan.switchTo('/products/electronics/42', { tab: 'specs' });
```

### Navigation with switchTo

```ts
// Simple navigation
rambutan.switchTo('/about');

// Navigation with parameters
rambutan.switchTo('/users/99', { section: 'profile' });
```

### Building a navigation UI from route data

```ts
const data = rambutan.routeData;
// data = [
//   { icon: 'home', name: 'Home', value: '/', params: {}, group: undefined, switchable: true },
//   { icon: 'info', name: 'About', value: '/about', params: {}, group: undefined, switchable: true }
// ]

// Hierarchical navigation
const nested = rambutan.nestedRouteData;

// Breadcrumb/current route chain
const current = rambutan.routeDataSnapshot.current;
```

### Using syncParams for cross-component communication

```ts
rambutan.addRoute({
  path: '/dashboard/:view',
  name: 'Dashboard',
  syncParams: ['view'],
  render: (router, { view }) => {
    // The 'view' parameter is published to the messenger
    // Other components can subscribe to 'view' changes
  }
});
```

### Preserving parameters across navigations

```ts
rambutan.addRoute({
  path: '/editor',
  name: 'Editor',
  preserveParams: true, // 7-day persistence
  // Or: preserveParams: 3600000 (1 hour)
  render: (router, params) => {
    // params.draft is restored on return
  }
});

rambutan.switchTo('/editor', { draft: 'my-document' });
// Navigate away and back: draft parameter is restored
```

### Resources and module loading

```ts
rambutan.addRoute({
  path: '/admin',
  name: 'Admin Panel',
  resources: ['/modules/admin-panel.mjs'],
  render: (router, params) => {
    // render() is called after resources are loaded
    // The .mjs module can export a `render` function or a `default` component
  }
});
```

### Checking current route

```ts
if (rambutan.is('/dashboard')) {
  console.log('Currently on dashboard');
}

if (rambutan.currPath === '/users' && rambutan.currParams.role === 'admin') {
  showAdminControls();
}
```
