# `Plugins.composable`

<!-- Generated from native authoring; do not edit. -->

[English](composable-plugins.md)

---

## `composable.composable`

<a id="entry-composable-composable"></a>

组态化

安装由配置驱动的仪表盘或卡片组合。

加载提供的配置数组或已存储的配置，构建 CurrantComposable 实例，并在全局路由器上注册生成的路由。

需要可组合配置结构和全局路由器；资源卡片可能加载声明的模块。

这是具有共享或全局状态的应用组合设施，不是小型局部布局装饰器。此插件没有对应的路由移除回调。

位置参数顺序: `config`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `config` | `any` | 组态化配置 |

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
