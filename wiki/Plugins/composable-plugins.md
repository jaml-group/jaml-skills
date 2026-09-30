# `Plugins.composable`

<!-- Generated from native authoring; do not edit. -->

[中文](composable-plugins.zh.md)

---

## `composable.composable`

<a id="entry-composable-composable"></a>

Composable layout editing

Install a configuration-driven dashboard/card composition.

Loads a supplied configuration array or the stored configuration, builds a CurrantComposable instance and registers generated routes on the global router.

Requires the composable configuration shape and global router; resource cards may load declared modules.

This is an application composition facility with shared/global state, not a small local layout decorator. There is no matching route-removal callback in this plugin.

Positional order: `config`.

| Argument | Type | Contract |
| --- | --- | --- |
| `config` | `any` | Composable layout configuration |

A dashboard composition engine that renders an editable grid-based layout. Cards (widgets) can be dragged, resized, and closed by end users. Layout configuration is persisted to localStorage and auto-loaded on subsequent visits.

Internally creates a `CurrantComposable` instance and registers routes for each page configuration via `rambutan.addRoutes()`.

When configuration is omitted, it is loaded from localStorage.

Each page config supports:

| Field   | Type       | Description               | Notes               |
| ------- | ---------- | ------------------------- | ------------------- |
| `path`  | `string`   | Route path for the page   | —                   |
| `name`  | `string`   | Display name              | —                   |
| `icon`  | `string`   | Page icon                 | —                   |
| `size`  | `number[]` | Grid dimensions           | Default: `[24, 12]` |
| `gap`   | `number`   | Grid gap                  | —                   |
| `cards` | `object[]` | Array of card definitions | —                   |

Each card in `cards`:

| Field      | Type               | Description                                              |
| ---------- | ------------------ | -------------------------------------------------------- |
| `id`       | `string`           | Unique card identifier                                   |
| `resource` | `object \| string` | JAML config object or URL to lazy-load                   |
| `coord`    | `object`           | `{ rowStart, colStart, rowSpan, colSpan }` grid position |
| `src`      | `string`           | Iframe source URL (alternative to `resource`)            |

Every rendered card is assigned `stylize: 'tile'`, so it receives the active theme's tile role styling regardless of whether it comes from an inline resource, a lazy-loaded resource, or an iframe.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['size.fullsize'],
    plugins: [
        Plugins.composable.composable({
            config: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    size: [24, 12],
                    cards: [
                        {
                            id: 'card-1',
                            resource: {
                                type: 'card',
                                cap: 'Revenue',
                                components: [{ type: 'indicator', value: 128450, unit: 'USD', formatter: (v) => `$${v.toLocaleString()}` }]
                            },
                            coord: { rowStart: 0, colStart: 0, rowSpan: 4, colSpan: 6 }
                        },
                        {
                            id: 'card-2',
                            resource: {
                                type: 'card',
                                cap: 'Users',
                                components: [{ type: 'indicator', value: 3842, icon: '👥' }]
                            },
                            coord: { rowStart: 0, colStart: 6, rowSpan: 4, colSpan: 6 }
                        }
                    ]
                }
            ]
        })
    ]
};
```
