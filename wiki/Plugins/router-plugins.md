# `Plugins.router` / `Plugins.subRouter`

Full client-side SPA routing for top-level and nested route outlets. `Plugins.router` installs a root router on an element. `Plugins.subRouter` installs a passive child router under the nearest `.jam-router-installed` ancestor or the global `rambutan`.

---

## Router args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Router mode | `'history'` or `'hash'`. Defaults to the current `AbstractRouter.type` (initially `'history'`) |
| `routes` | `Route[]` | Array of route configurations | — |
| `resources` | `string[]` | Global JS/CSS resources to load for all routes | Loaded once on first navigation |
| `syncTitle` | `boolean` | Sync document title with route title | Default: `false` |
| `beforeSwitch` | `Function` | Called before any route switch | — |
| `afterSwitch` | `Function` | Called after any route switch | — |
| `beforeRender` | `Function` | Called before route render | — |
| `afterRender` | `Function` | Called after route render | — |
| `passive` | `boolean` | Resolve only through a parent router | Used internally by `subRouter` |

## `Plugins.subRouter` args

| Arg | Type | Description | Notes |
|---|---|---|---|
| `type` | `string` | Router mode | Defaults to the parent router type |
| `routes` | `Route[]` | Child route configurations | Registered before passive init |
| `resources` | `string[]` | Global resources for this subrouter | — |
| `syncTitle` | `boolean` | Sync document title with route title | Default: `false` |
| `beforeSwitch` | `Function` | Called before child route switch | — |
| `afterSwitch` | `Function` | Called after child route switch | — |
| `beforeRender` | `Function` | Called before child route render | — |
| `afterRender` | `Function` | Called after child route render | — |

## Route options

| Field | Type | Description | Notes |
|---|---|---|---|
| `path` | `string` | URL path, supports `:param` segments and `:param(.*)` catch-alls | Must start with `/`; `''` is allowed for an index route |
| `name` | `string` | Display name | — |
| `title` | `string` | Browser tab title | Used when `syncTitle` is enabled |
| `icon` | `string` | Route icon | — |
| `render` | `Function` | Called when route activates; `this.container` is the outlet | Must be idempotent |
| `resources` | `string[]` | JS/CSS files to lazy-load for this route | Loaded on enter, unloaded on leave |
| `broker` | `string` | Named broker for route-scoped messaging | Default: derived from path |
| `params` | `Dictionary` | Default parameters for the route | — |
| `preserveParams` | `boolean \| number` | Persist render params across navigations | Number = TTL in ms, boolean = 7 days |
| `syncParams` | `string[]` | Parameter keys to sync via messenger | — |
| `group` | `string` | Route group for organization | — |
| `onEnter` | `Function` | Called when entering the route | — |
| `onLeave` | `Function` | Called when leaving the route | — |
| `subRouter` | `AbstractRouter` | Runtime child router for this route | Set by `Plugins.subRouter` |
| `hide` | `boolean` | Hide from navigation UI | — |
| `styles` | `StyleOption[]` | Styles applied during this route | — |

## Navigation

Navigate the router that owns the outlet. `Plugins.router` exposes its instance as `element.jamrouter`; the application-level `rambutan` singleton is a separate owner:

```javascript
const outlet = document.getElementById('route-outlet');
outlet.jamrouter.switchTo('/users/42');
// Use rambutan.switchTo(...) for routes registered on the global router.
```

## Example

These are application integration examples. Mount them in an app that gives this router ownership of the URL and provides its initial route; do not install another root router inside a documentation playground that already owns routing.

```javascript
export default {
  type: 'container',
  id: 'route-outlet',
  styles: ['size.fullsize'],
  plugins: [
    Plugins.router({
      type: 'history',
      routes: [
        {
          path: '/',
          name: 'Home',
          render: function() {
            jaml(this.container, {
              type: 'wrapper',
              cap: 'Home Page',
              components: [
                { type: 'indicator', cap: 'Welcome', value: 'Dashboard' }
              ]
            })
          }
        },
        {
          path: '/users/:id',
          name: 'User Detail',
          render: function(params) {
            const userId = params.id
            jaml(this.container, {
              type: 'wrapper',
              cap: `User ${userId}`,
              components: [
                { type: 'indicator', cap: 'ID', value: userId }
              ]
            })
          }
        }
      ]
    })
  ]
}
```

### Nested route outlet

```javascript
export default {
  type: 'container',
  plugins: [
    Plugins.router({
      routes: [
        {
          path: '/settings/:section(.*)',
          name: 'Settings',
          render() {
            jaml(this.container, {
              type: 'container',
              plugins: [
                Plugins.subRouter({
                  routes: [
                    { path: '', name: 'General', render() { jaml(this.container, { type: 'label', cap: 'General' }) } },
                    { path: '/profile', name: 'Profile', render() { jaml(this.container, { type: 'label', cap: 'Profile' }) } }
                  ]
                })
              ]
            })
          }
        }
      ]
    })
  ]
}
```
