# interact

<!-- Generated from native authoring; do not edit. -->

[English](interact.md)

`Styles.interact.*` — interaction behaviors applied to any element.

---

## Variants

### `interact.movable`

<a id="entry-interact-movable"></a>

可移动元素

通过现有移动辅助方法启用宿主的指针移动操作。

将提供的参数原样传给 jam.makeMovable；不添加参数结构中的默认值。

移动行为由辅助方法提供；此样式不提供专门控件或键盘界面。

提供合适的已挂载或已连接宿主，并按辅助方法的约定确定几何、操作柄及边界限制。

在挂载时运行，或对已挂载的框架宿主或已连接的普通元素立即运行。卸载宿主、拆卸样式或销毁宿主时，对当前设置调用 makeUnmovable；样式仍然安装时，重新挂载可再次启用移动。

审慎地与宿主布局及堆叠行为组合。这个开放的目录结构未描述转发参数的具体字段。

禁用移动不会恢复先前坐标，也不会移除共享的全局手势处理器。键盘交互、无障碍支持、几何约束和应用位置持久化仍由调用方负责。

参数转发至 `jam.makeMovable`；未声明字段的类型、默认值和补全尚不可用。空参数表不表示拒绝参数。

hosts: `HTMLElement`.

states: `mount`, `unmount`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-interact-movable`

Movement and resize helpers are disabled on unmount, style teardown or host destruction. Resize disable removes its `passiveresize`, `resize` and `moveend` callbacks and invalidates old debounce/completion work. Shared passive-observer ownership is unchanged. Previous coordinates and dimensions are not restored; persistence and accessible alternatives remain application responsibilities.

Makes the element draggable via `DamsonDragNDrop`. Use `handle` to restrict the drag start area; `contain` constrains movement to the parent bounds.

Arguments are forwarded to `jam.makeMovable` through an open contract. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Drag me',
        styles: ['interact.movable(contain:true)']
    },
    {
        type: 'card',
        cap: 'Free drag',
        styles: ['interact.movable']
    }
];
```

### `interact.resizable`

<a id="entry-interact-resizable"></a>

可调整大小的元素

通过现有尺寸调整辅助方法启用宿主的指针调整尺寸操作。

将提供的参数原样传给 jam.makeResizable；不添加参数结构中的默认值。

调整尺寸由辅助方法管理；此样式不会创建完整的无障碍尺寸调节控件。

提供合适的已挂载或已连接宿主、有意义的尺寸及位置约束，以及辅助方法所需的操作柄或边界设置。

在挂载时或对已挂载或已连接的宿主运行。卸载宿主、拆卸样式或销毁宿主时调用 makeUnresizable。禁用时移除此尺寸调整实例的 passiveresize、resize 和 moveend 监听器；过期的防抖和动画完成后续操作不能重置已移除或替代的实例。

使尺寸约束与父级布局保持一致。转发参数的具体字段不属于这个开放结构；编辑器接受某个字段，不代表运行时该字段有效。

禁用不会恢复原始尺寸。已排队的防抖或 animationEnd promise 仍可能完成，但其过期的后续操作不会产生作用。共享的被动 ResizeObserver 所有权不变；即使目标曾是唯一的尺寸调整目标，禁用也不会停止观察它。键盘控制、无障碍支持和尺寸持久化仍由调用方负责。

参数转发至 `jam.makeResizable`；未声明字段的类型、默认值和补全尚不可用。空参数表不表示拒绝参数。

hosts: `HTMLElement`.

states: `mount`, `unmount`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-interact-resizable`

Makes the element resizable by edge and corner drag handles.

Arguments are forwarded to `jam.makeResizable` through an open contract. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Resize me',
        styles: ['interact.resizable']
    },
    {
        type: 'card',
        cap: 'Horizontal only',
        styles: ['interact.resizable(horizontalOnly:true;contain:true)']
    }
];
```

### `interact.expandable`

<a id="entry-interact-expandable"></a>

可展开

将一个面板扩展到相邻兄弟元素的空间中。

根据 direction 选择前一个或后一个兄弟元素，添加可选的切换按钮和尺寸调整边缘，并可按宿主 id 保存展开状态和尺寸。

需要相邻兄弟元素和可测量的父元素；saveState 需要 id。

移除时释放尺寸调整、监听器和按钮，并移除展开相关类。

这是成对面板的交互，不是任意浮层。resizable 对象会被视为启用调整大小，但此包装不会转发其中的自定义字段。

位置参数顺序: `direction` → `resizeThreshold` → `default` → `button` → `saveState` → `resizable`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `direction` | `string` | `left` | 方向<br>支持简写<br>选项: `top`, `right`, `bottom`, `left` |
| `resizeThreshold` | `number` | `50` | 兄弟元素尺寸小于此阈值时自动展开 |
| `default` | `string` | 未提供 | 默认尺寸占比 |
| `button` | `dictionaryOrBoolean` | `true` | 按钮 |
| `saveState` | `boolean` | `false` | 保存状态 |
| `resizable` | `dictionaryOrBoolean` | `true` | 可调整大小 |

Adds an expand/collapse toggle between this element and its adjacent sibling. Expands to 100% in the given direction, shrinking the sibling. Persists state in `localStorage` (by element `id`). Requires the element to have an `id`.

```javascript jaml-playground
export default [
    {
        type: 'container',
        id: 'sidebar',
        styles: ['interact.expandable(direction:right;default:30%)'],
        components: [{ type: 'label', cap: 'Expandable sidebar' }]
    }
];
```

### `interact.closable`

<a id="entry-interact-closable"></a>

可关闭

为宿主添加关闭控件。

创建关闭按钮，并将图标插槽的双击操作关联到该按钮；默认回调移除最近的可关闭宿主。

关闭时需要更新应用状态或请求确认，应提供 callback。

位置参数顺序: `callback`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `callback` | `function` | 运行时决定 (function) | 回调 |

Adds a close (&times;) button. Double-clicking the icon slot also triggers close.

The close callback receives the styled element. Without a custom callback, closing removes its nearest `.jam-closable` ancestor.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Close me',
        styles: ['interact.closable'],
        components: [{ type: 'label', cap: 'Click the X or double-click the icon' }]
    }
];
```

### `interact.resettable`

<a id="entry-interact-resettable"></a>

可重置

为可重置元素添加重置操作。

创建额外的重置按钮，在宿主满足 resettable 接口时调用 reset()。

要求宿主提供 reset() 契约；按钮不会定义默认值。

Adds a reset button that restores the element's `defaultValue`. Requires the element to implement `IResettable`. No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Edit then reset',
        styles: ['interact.resettable']
    }
];
```

### `interact.clearable`

<a id="entry-interact-clearable"></a>

可清除

为可清空元素添加清空操作。

创建额外的清空按钮，仅在宿主满足 clearable 接口时调用 clear()。

宿主必须实现 clear()。

旧版按钮的标题使用固定文本；本地化应用应核对或替换此文字。

Adds a clear button that sets the element's value to `null`. Requires the element to implement `IClearable`. No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Type then clear',
        styles: ['interact.clearable']
    }
];
```

### `interact.removable`

<a id="entry-interact-removable"></a>

可移除

添加移除条目的操作。

创建移除按钮；onremove 同步返回 false 时阻止移除，否则移除宿主。

不会等待异步 promise 来决定是否阻止移除。应在回调中同步应用数据和持久化状态。

位置参数顺序: `onremove`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `onremove` | `function` | 移除回调 |

Adds the `jam-removable` CSS class and a remove button. The button stops event propagation and calls the `onremove` callback (if provided).

The remove-button callback runs with the styled host as `this` and no positional arguments. Return `false` from `onremove` to cancel removal.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Removable item',
        styles: ["interact.removable(onremove:function(el) { console.log('removing', el) })"]
    }
];
```

### `interact.scrollX`

<a id="entry-interact-scrollx"></a>

鼠标横向滚动

用纵向滚轮手势滚动横向内容条。

安装非被动、带节流的 wheel 监听器，阻止默认滚动，并将纯纵向滚动增量转换为平滑的横向移动。

宿主必须存在横向溢出。

此样式会消耗滚轮事件；嵌套滚动和触控板需要进行交互检查。

Converts vertical mouse wheel input to horizontal scrolling via `scrollBy({ left, behavior: 'smooth' })`. No args.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.scrollX', 'css(overflow-x:auto;whiteSpace:nowrap;width:20rem)'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' },
            { type: 'label', cap: 'Item 3' },
            { type: 'label', cap: 'Item 4' },
            { type: 'label', cap: 'Item 5' }
        ]
    }
];
```

### `interact.virtualScroll`

<a id="entry-interact-virtualscroll"></a>

虚拟滚动

通过 SaigonScroll 对固定高度的 DOM 行进行虚拟化。

为宿主和解析得到的滚动目标创建 SaigonScroll，传入提供的行提供器和固定行高。它安装滚动和尺寸变化监听器；此通用样式不执行初始绘制。

提供 getRowNum 和 getChildrenByRow 回调、稳定行高及可测量的滚动目标。返回的行子节点必须提供 row、buildDom()，并在构建后提供 dom。调用方必须提供行定位和完整的可滚动范围。

移除时分离 SaigonScroll 监听器，但在宿主上保留实例；再次将此样式附加到该宿主时，不会创建或初始化替代实例。

组件网格使用 grid.virtualScroll，高度可变的纵向组件使用 layout.lazyload，原生表格行使用 table.fixedrowheight。

位置参数顺序: `scrollTarget` → `height` → `throttle` → `padding` → `getChildrenByRow` → `getRowNum`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `scrollTarget` | `string` | 未提供 | 滚动目标 |
| `height` | `numberOrString` | `2.5` | 行高<br>Unit: `rem`<br>支持简写 |
| `throttle` | `number` | 未提供 | 节流 |
| `padding` | `number` | 未提供 | 额外渲染行数 |
| `getChildrenByRow` | `function` | 未提供 | 获取子元素 |
| `getRowNum` | `function` | 未提供 | 获取行数 |

Virtual scrolling for large lists using `SaigonScroll`. Renders only visible rows for performance.

Provide `getChildrenByRow(container, row)` to supply a row’s children and `getRowNum(container)` to report the total row count.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.virtualScroll(height:3;throttle:16)', 'css(height:20rem)']
    }
];
```

### `interact.scrollWatcher`

<a id="entry-interact-scrollwatcher"></a>

滚动激活

呈现滚动容器是否已离开其起始位置。

延迟后监听解析得到的目标，并在宿主上切换 jam-x-scrolled 和 jam-y-scrolled。

卸载宿主、拆卸样式或销毁宿主时，解绑实际解析得到的滚动目标。延迟设置和节流回调检查应用身份，因此过期工作不会产生作用；重新挂载可建立新的监听器。

声明的 clazz 参数未被使用。滚动发生前不计算初始状态。拆卸时保留最后的 jam-x-scrolled 和 jam-y-scrolled 类，不恢复其先前值。

位置参数顺序: `clazz` → `delay` → `target`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `clazz` | `string` | `jam-scrolled` | 激活类名 |
| `delay` | `number` | `100` | 延迟 |
| `target` | `string` | 未提供 | 目标 |

Scroll watching unbinds its resolved target and ignores obsolete delayed/throttled work on teardown. The declared `clazz` argument is unused, and the last scroll-state classes remain in place.

Toggles CSS classes on the host element based on the scroll position of a target element. Adds `jam-x-scrolled` when scrolled horizontally and `jam-y-scrolled` when scrolled vertically. Use with `descStyles` to apply visual treatments to scrolled states.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.scrollWatcher', 'css(overflow:auto;width:20rem;height:8rem)'],
        components: [
            {
                type: 'label',
                cap: 'Scrollable content',
                styles: ['css(display:block;width:32rem;height:14rem)']
            }
        ]
    }
];
```

### `interact.zoomable`

<a id="entry-interact-zoomable"></a>

可缩放

添加类似最大化/还原的控件。

创建缩放按钮和标签插槽双击触发器；默认回调通过位置过渡切换宿主的几何尺寸。

每次有效挂载时安装标签插槽的双击监听器，并在卸载宿主、拆卸样式或销毁宿主时移除它。拆卸时移除此样式拥有的缩放按钮。

此样式改变类似窗口的布局尺寸；内容视角的平移缩放应使用 interact.panNZoom。

位置参数顺序: `callback` → `gap`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `callback` | `function` | 运行时决定 (function) | 回调 |
| `gap` | `numberOrString` | `0` | 间距<br>Unit: `px`<br>支持简写 |

Adds a zoom-in button. Double-clicking the label slot toggles zoom via `positionFlip`.

The zoom callback receives `(element, gap)`. Without a custom callback, it toggles CSS zoom with a FLIP animation.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Zoom me',
        styles: ['interact.zoomable(gap:16)']
    }
];
```

### `interact.panNZoom`

<a id="entry-interact-pannzoom"></a>

可缩放

平移和缩放内容表面。

挂载时根据缩放范围和步长安装 Pear 平移和缩放行为。卸载宿主、拆卸样式或销毁宿主时移除两者；样式仍然应用时，重新挂载可再次安装它们。

用于空间内容；interact.zoomable 则在常规尺寸和展开尺寸之间切换类似窗口的宿主。

位置参数顺序: `minScale` → `maxScale` → `scaleStep`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `minScale` | `number` | `0.5` | 最小缩放比例 |
| `maxScale` | `number` | `5` | 最大缩放比例 |
| `scaleStep` | `number` | `0.01` | 缩放步长 |

Pan via drag + cursor-aware zoom via mouse wheel using `PearPanNZoom`.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.panNZoom(minScale:0.25;maxScale:10;scaleStep:0.02)', 'css(width:30rem;height:20rem;overflow:hidden)'],
        components: [{ type: 'label', cap: 'Drag to pan, scroll to zoom' }]
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Movable Panel',
    styles: ['interact.movable', 'interact.resizable', 'interact.closable'],
    components: [{ type: 'label', cap: 'Drag me by the title' }]
};
```

## `interact.sortable`

<a id="entry-interact-sortable"></a>

孩子拖拽排序

对匹配的直接子项启用拖拽排序，并可在共享同一 group 的容器间转移。

管理拖拽预览，并在放下时提交子项顺序。顺序或容器变化时，change 接收来源、目标、原索引和新索引及项目列表。

提供含匹配直接子项的容器，并合理设置 handle/avoid。仅在需要容器间转移时使用共享的非空 group。

用 change 同步应用数据顺序。自由定位使用 movable；浏览器原生数据传递使用 draggable/droppable。

重新排列渲染元素不会持久化应用模型。键盘排序及无障碍播报需由应用另行实现。

位置参数顺序: `selector` → `group` → `placement` → `overlap` → `handle` → `avoid` → `scroll` → `scrollMargin` → `scrollSpeed` → `change`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `selector` | `string` | `*` | 排序孩子选择器 |
| `group` | `string` | 未提供 | 允许跨容器排序的组名 |
| `placement` | `string` | `live` | 实时移动占位或释放时排序<br>选项: `live`, `deferred` |
| `overlap` | `number` | 未提供 | 拖拽物体覆盖比例(0~1)，超过1-此值确认所在区域 |
| `handle` | `string` | 未提供 | 孩子拖拽手柄选择器 |
| `avoid` | `string` | 未提供 | 不触发拖拽的选择器 |
| `scroll` | `boolean` | `true` | 边缘自动滚动 |
| `scrollMargin` | `number` | `48` | 边缘滚动范围(px) |
| `scrollSpeed` | `number` | `600` | 最大滚动速度(px/s) |
| `change` | `function` | 未提供 | 排序提交回调 |

Reorders matching direct children by dragging. Containers with the same nonempty `group` accept transfers. The plugin changes DOM order; persist application data in `change` when needed.

Omit `group` to keep items within their container. Live placement moves the placeholder; deferred placement commits on release. The change callback receives `{ item, from, to, oldIndex, newIndex, fromItems, toItems }`; transfers notify both containers.

```javascript jaml-playground
export default {
    type: 'wrapper',
    styles: ['interact.sortable', 'animation.flipchild(duration:200)'],
    components: [
        { type: 'label', cap: 'Drag: Planning' },
        { type: 'label', cap: 'Drag: Building' },
        { type: 'label', cap: 'Drag: Checking' }
    ]
};
```
