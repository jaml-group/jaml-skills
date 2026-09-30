# `Plugins.router` / `Plugins.subRouter`

<!-- Generated from native authoring; do not edit. -->

[English](router-plugins.md)

Full client-side SPA routing for top-level and nested route outlets. `Plugins.router` installs a root router on an element. `Plugins.subRouter` installs a passive child router under the nearest `.jam-router-installed` ancestor or the global `rambutan`.

---

## Router args

<a id="entry-router"></a>

元素路由

在调用方提供的内容宿主上接入由 URL 驱动的路由解析。

提供 type 时使用该值；未提供时沿用共享的 AbstractRouter type。hash 选择哈希路由，其他值选择历史路由；提供的 type 也会修改该共享默认值。其余选项继续转发，并设置宿主、添加标记、初始化路由器。

路由内容决定视觉呈现；插件本身不创建导航栏或页面设计。

提供合适的内容宿主、路由及内容配置，并确定 URL 模式。基于历史记录的部署需要兼容的服务器回退行为。

移除时销毁所拥有的路由器，并清除宿主的路由引用、标记和插件数据。路由器销毁时会移除其路由/加载监听器及所拥有的子路由状态。

按底层 jam.AbstractRouter 约定提供路由和加载策略。明确导航控件与嵌套内容的归属；此元数据采用开放转发结构。

撤销不会恢复共享路由类型、浏览器 URL/历史记录或宿主原有内容。开放字段可被接受，并不代表会校验所有路由字段，或保证取消所有应用任务。

参数转发至 `jam.AbstractRouter`；未声明字段的类型、默认值和补全尚不可用。空参数表不表示拒绝参数。

hosts: `HTMLElement`.

states: `plug`, `unplug`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-router`

Arguments are forwarded to `jam.AbstractRouter` through an open contract. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

See the [routing guide](./router.md) for route definitions and navigation behavior.

## `Plugins.subRouter` args

Arguments are forwarded to `jam.AbstractRouter` through an open contract. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

See the [routing guide](./router.md) for route definitions and navigation behavior.

## Route options

| Field            | Type                | Description                                                      | Notes                                                   |
| ---------------- | ------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| `path`           | `string`            | URL path, supports `:param` segments and `:param(.*)` catch-alls | Must start with `/`; `''` is allowed for an index route |
| `name`           | `string`            | Display name                                                     | —                                                       |
| `title`          | `string`            | Browser tab title                                                | Used when `syncTitle` is enabled                        |
| `icon`           | `string`            | Route icon                                                       | —                                                       |
| `render`         | `Function`          | Called when route activates; `this.container` is the outlet      | Must be idempotent                                      |
| `resources`      | `string[]`          | JS/CSS files to lazy-load for this route                         | Loaded on enter, unloaded on leave                      |
| `broker`         | `string`            | Named broker for route-scoped messaging                          | Default: derived from path                              |
| `params`         | `Dictionary`        | Default parameters for the route                                 | —                                                       |
| `preserveParams` | `boolean \| number` | Persist render params across navigations                         | Number = TTL in ms, boolean = 7 days                    |
| `syncParams`     | `string[]`          | Parameter keys to sync via messenger                             | —                                                       |
| `group`          | `string`            | Route group for organization                                     | —                                                       |
| `onEnter`        | `Function`          | Called when entering the route                                   | —                                                       |
| `onLeave`        | `Function`          | Called when leaving the route                                    | —                                                       |
| `subRouter`      | `AbstractRouter`    | Runtime child router for this route                              | Set by `Plugins.subRouter`                              |
| `hide`           | `boolean`           | Hide from navigation UI                                          | —                                                       |
| `styles`         | `StyleOption[]`     | Styles applied during this route                                 | —                                                       |

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
