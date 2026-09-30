# sync

<!-- Generated from native authoring; do not edit. -->

[English](sync.md)

`Styles.sync` listens to framework `resize` events on its host and calls a callback with resolved target and source elements. Use it when one element needs to copy a computed dimension from another; prefer normal flex/grid layout when that already expresses the relationship.

## Arguments

<a id="entry-sync"></a>

同步样式

在宿主尺寸变化时协调两个解析得到的元素。

从 self、parent、root 或所选父级内的选择器解析 source 和 target，然后安排在重绘前执行回调。

两个元素都必须成功解析；提供负责所需同步的回调。

使用一个宿主作为尺寸变化触发器，并防止回调写入导致失控的尺寸变化循环。

它观察宿主尺寸变化事件，而不是 source 的任意变化。移除样式会阻止已排队的重绘回调运行；自定义回调已经执行的写入仍由调用方负责。

位置参数顺序: `target` → `source` → `parent` → `callback`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `target` | `string` | 未提供 | 目标选择器 |
| `source` | `string` | 未提供 | 源选择器 |
| `parent` | `string` | `self` | 父选择器<br>选项: `self`, `parent`, `root` |
| `callback` | `functionOrString` | 未提供 | 回调 |

The callback receives `(target, source)`, with the styled host as `this`.

JavaScript is clearest for a custom copying callback.

Both source and target must resolve. The callback runs before the next repaint after the host's resize notification; this is not an independent observer of every possible source mutation.

```javascript jaml-playground
export default {
    type: 'wrapper',
    components: [
        { type: 'label', id: 'sync-source', cap: 'Width source', style: 'width:12rem' },
        {
            type: 'label',
            cap: 'Mirrored width',
            styles: [
                Styles.sync({
                    source: '#sync-source',
                    target: 'self',
                    parent: 'parent',
                    callback(target, source) {
                        target.style.width = getComputedStyle(source).width;
                    }
                })
            ]
        }
    ]
};
```

To mirror height, copy `getComputedStyle(source).height` into `target.style.height` in the same callback.

## Convenience variants

<a id="entry-sync-size"></a>

同步尺寸

将所选的计算尺寸从解析得到的源复制到解析得到的目标。

将 source、target 和 parent 选择参数传递给 sync，然后在宿主尺寸变化触发时，通过具有所有权的内联尺寸设置复制计算后的 width 和/或 height。

移除时通过共享属性所有权机制恢复此次应用拥有的尺寸设置，并阻止已排队的更新在移除后运行。

source 和 target 都必须成功解析。宿主尺寸变化事件触发复制；它不会独立观察 source 的每次变化。内置尺寸回调替换 callback 参数；自定义回调使用 sync。

位置参数顺序: `target` → `source` → `parent` → `callback` → `width` → `height`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `target` | `string` | 未提供 | 目标选择器 |
| `source` | `string` | 未提供 | 源选择器 |
| `parent` | `string` | `self` | 父选择器<br>选项: `self`, `parent`, `root` |
| `callback` | `functionOrString` | 未提供 | 回调 |
| `width` | `boolean` | `true` | 同步宽度 |
| `height` | `boolean` | `true` | 同步高度 |

`sync.size` resolves configured selectors and copies computed width and/or height on the host’s resize trigger. It owns the copied inline sizing and restores its contribution on removal; queued updates from the removed application no longer run. Its built-in size callback replaces the `callback` argument. Use `sync` for custom synchronization; writes made by that callback remain caller-owned.

```javascript jaml-playground
export default {
    type: 'wrapper',
    components: [
        { type: 'label', id: 'size-source', cap: 'Width source', styles: ['css(width:12rem)'] },
        {
            type: 'label',
            cap: 'Mirrored width',
            styles: ['sync.size(source:#size-source;target:self;parent:parent;height:false)']
        }
    ]
};
```

`sync.width` and `sync.height` remain prebuilt style instances with captured values and unset source/target selectors. Use `sync.size` to select elements; do not call these presets as parameterized factories.

## `sync.width`

<a id="entry-sync-width"></a>

同步尺寸

表示由路径命名的仅宽度或仅高度同步预设。

sync.width 和 sync.height 是从 sync.size 派生的预构建样式实例，禁用另一个维度。

这些是具有捕获值的预构建样式实例，不是可配置的工厂。其捕获的 source 和 target 未设置；使用带显式选择器的 sync.size 进行尺寸同步。

位置参数顺序: `parent` → `width` → `height`.

| 参数 | 契约 |
| --- | --- |
| `parent` | 此预构建尺寸预设捕获的作用域值，不是可配置的选择器参数。使用显式指定 source、target 和 parent 的 sync.size 进行尺寸同步。 |
| `width` | 此预构建预设捕获的宽度复制标志。sync.width 启用宽度复制，sync.height 禁用宽度复制；这不是可调用的配置参数。 |
| `height` | 此预构建预设捕获的高度复制标志。sync.height 启用高度复制，sync.width 禁用高度复制；这不是可调用的配置参数。 |

## `sync.height`

<a id="entry-sync-height"></a>

同步尺寸

表示由路径命名的仅宽度或仅高度同步预设。

sync.width 和 sync.height 是从 sync.size 派生的预构建样式实例，禁用另一个维度。

这些是具有捕获值的预构建样式实例，不是可配置的工厂。其捕获的 source 和 target 未设置；使用带显式选择器的 sync.size 进行尺寸同步。

位置参数顺序: `parent` → `height` → `width`.

| 参数 | 契约 |
| --- | --- |
| `parent` | 此预构建尺寸预设捕获的作用域值，不是可配置的选择器参数。使用显式指定 source、target 和 parent 的 sync.size 进行尺寸同步。 |
| `height` | 此预构建预设捕获的高度复制标志。sync.height 启用高度复制，sync.width 禁用高度复制；这不是可调用的配置参数。 |
| `width` | 此预构建预设捕获的宽度复制标志。sync.width 启用宽度复制，sync.height 禁用宽度复制；这不是可调用的配置参数。 |
