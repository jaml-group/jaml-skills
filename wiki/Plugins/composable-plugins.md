# `Plugins.composable`

---

## `composable.composable`

A dashboard composition engine that renders an editable grid-based layout. Cards (widgets) can be dragged, resized, and closed by end users. Layout configuration is persisted to localStorage and auto-loaded on subsequent visits.

Internally creates a `CurrantComposable` instance and registers routes for each page configuration via `rambutan.addRoutes()`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `config` | `PageInfo[]` | Array of page configurations with cards | If not provided, loaded from localStorage by default |

Each page config supports:

| Field | Type | Description | Notes |
|---|---|---|---|
| `path` | `string` | Route path for the page | — |
| `name` | `string` | Display name | — |
| `icon` | `string` | Page icon | — |
| `size` | `number[]` | Grid dimensions | Default: `[24, 12]` |
| `gap` | `number` | Grid gap | — |
| `cards` | `object[]` | Array of card definitions | — |

Each card in `cards`:

| Field | Type | Description |
|---|---|---|
| `id` | `string` | Unique card identifier |
| `resource` | `object \| string` | JAML config object or URL to lazy-load |
| `coord` | `object` | `{ rowStart, colStart, rowSpan, colSpan }` grid position |
| `src` | `string` | Iframe source URL (alternative to `resource`) |

Every rendered card is assigned `stylize: 'tile'`, so it receives the active theme's tile role styling regardless of whether it comes from an inline resource, a lazy-loaded resource, or an iframe.

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['size.fullsize'],
  plugins: [
    Plugins.composable.composable({
      config: [{
        path: '/dashboard',
        name: 'Dashboard',
        size: [24, 12],
        cards: [
          {
            id: 'card-1',
            resource: {
              type: 'card',
              cap: 'Revenue',
              components: [
                { type: 'indicator', value: 128450, unit: 'USD',
                  formatter: (v) => `$${v.toLocaleString()}` }
              ]
            },
            coord: { rowStart: 0, colStart: 0, rowSpan: 4, colSpan: 6 }
          },
          {
            id: 'card-2',
            resource: {
              type: 'card',
              cap: 'Users',
              components: [
                { type: 'indicator', value: 3842, icon: '👥' }
              ]
            },
            coord: { rowStart: 0, colStart: 6, rowSpan: 4, colSpan: 6 }
          }
        ]
      }]
    })
  ]
}
```
