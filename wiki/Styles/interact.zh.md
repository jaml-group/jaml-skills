# interact

<!-- Generated from native authoring; do not edit. -->

[English](interact.md)

`Styles.interact.*` — interaction behaviors applied to any element.

---

## Variants

### `interact.foldable`

<a id="entry-interact-foldable"></a>

独立折叠区域

将单个区域注册到祖先 layout.accordion，并通过 foldable 句柄控制。

宿主 HTMLElement 暴露 element.foldable.fold()、unfold()、toggle()，均返回是否接受请求的布尔值，以及只读 folded 和 size。size 为当前逻辑轨道尺寸，单位是 CSS 像素，而非动画表面矩形。不冒泡的 foldchange 事件携带 detail:{folded}；不冒泡的 foldresize 事件携带 detail:{size,folded}。重复 fold/unfold 请求被接受，但不会再次触发 foldchange。外部按钮可调用同一句柄。

显式模板网格所有者必须安装 layout.accordion。区域在 axis 上必须恰好占据一个轨道；subgrid 后代可通过明确放置映射至单个祖先轨道。foldSize、minSize、maxSize、resizeThreshold 使用非负 CSS 长度，且 maxSize 不小于 minSize。所有者缺失或无效时，fold/unfold 返回 false。 设置分数轨道上限的轴支持明确长度/百分比、fr 和 minmax(length,fr) 轨道，不支持 intrinsic 或计算式轨道。作者最小值大于 maxSize 时最小值优先，应避免此冲突。 saveState:true 要求此子区域具有稳定 id，仅父元素 id 不够。

折叠期间子内容和状态保持挂载。所有折叠宿主均 inert 且 aria-hidden，包含 foldSize 非零的可见条带；零尺寸折叠还会隐藏视觉呈现。展开会恢复自身临时样式以及作者的 overflow/最小尺寸。移除父样式会重置当前会话。saveState:true 且子区域具有稳定 id 时，新 Foldable 实例（包括重新加载后）从 localStorage 恢复已提交的展开首选尺寸；展开/折叠意图仍由作者控制。取消拖动、临时几何和模式切换不会覆盖保存值。无效数据或存储不可用时使用作者尺寸。共享同一祖先轨道的 subgrid 区域共享折叠状态和尺寸。

在父网格模板中声明展开首选值，在区域上配置 minSize/maxSize 和 resizeThreshold。弹性首选值在达到上限前仍保持比例。阈值拖动期间可越过作者模板和插件的展开最小值；释放时低于 resizeThreshold 则折叠并保留拖动前首选值，否则恢复展开限制。Escape 取消拖动。外部导航栏控制应放在该宿主旁边，而非其中。完整父子示例见 layout.accordion。

edge 选择缩放手柄边，而非动画原点。内部区域使用居中 squeeze 入场/离场，边缘区域使用对应边，邻接区域使用布局 FLIP。尚未实现可选悬停激活。resizable:false 移除拖动手柄，resizable:{hide:true} 仅隐藏指示器。折叠控件无法重新展开其自身 inert 宿主，必须提供外部控制。

位置参数顺序: `axis` → `edge` → `foldSize` → `minSize` → `maxSize` → `resizeThreshold` → `folded` → `saveState` → `resizable`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `axis` | `string` | `columns` | 受管理的轨道轴。<br>选项: `columns`, `rows` |
| `edge` | `string` | 未提供 | 缩放手柄边；内部区域通常使用后侧边界，最后区域使用前侧边界。<br>选项: `left`, `right`, `top`, `bottom` |
| `foldSize` | `string` | `0rem` | 折叠轨道尺寸；非零可见条带仍为 inert。 |
| `minSize` | `string` | `0rem` | 展开最小尺寸，与作者 minmax 最小值共同生效。 |
| `maxSize` | `string` | 未提供 | 展开尺寸上限，不是首选尺寸；达到上限前弹性区域保持比例。 |
| `resizeThreshold` | `string` | `0rem` | 拖动释放时低于该尺寸则折叠；零表示禁用阈值折叠。 |
| `folded` | `boolean` | `false` | 首次注册区域时的初始折叠状态。 |
| `saveState` | `boolean` | `false` | 按稳定子区域 id 和轴持久化已提交的展开首选尺寸，重载后恢复；不保存折叠状态。默认 false。 |
| `resizable` | `dictionaryOrBoolean` | `true` | 启用缩放；false 禁用手柄，{hide:true} 仅隐藏指示器。 |

```javascript jaml-playground
export default {
    type: 'container',
    components: [
        { type: 'label', cap: 'The rail stays interactive while navigation and inspector fold independently.' },
        {
            type: 'container',
            id: 'folding-example',
            styles: [Styles.layout.accordion({ cols: '4rem 12rem minmax(12rem,1fr) 10rem', rows: 'minmax(0,1fr)' }), 'css(height:14rem;width:100%;gap:0.5rem)'],
            components: [
                {
                    type: 'container',
                    styles: ['css(grid-column:1;display:flex;flex-direction:column;gap:0.5rem;background:ac4)'],
                    components: [
                        {
                            type: 'button',
                            cap: 'Nav',
                            onclick() {
                                this.closest('#folding-example').querySelector('#folding-navigation').foldable.toggle();
                            }
                        },
                        {
                            type: 'button',
                            cap: 'Info',
                            onclick() {
                                this.closest('#folding-example').querySelector('#folding-inspector').foldable.toggle();
                            }
                        }
                    ]
                },
                {
                    type: 'wrapper-vertical',
                    id: 'folding-navigation',
                    cap: 'Navigation',
                    styles: ['css(grid-column:2;min-width:0;overflow:auto;background:ac1)', Styles.interact.foldable({ foldSize: '2rem', minSize: '6rem', maxSize: '20rem', resizeThreshold: '3rem' })],
                    components: [{ type: 'input', cap: 'Filter', value: 'Retained navigation value', styles: ['label.atTop', 'size.fullwidth'] }]
                },
                {
                    type: 'container',
                    styles: ['css(grid-column:3;min-width:0;overflow:auto;background:ac5)'],
                    components: [{ type: 'label', cap: 'Main content receives the remaining space. The visible folded strip is inert; use the rail to reopen it.' }]
                },
                {
                    type: 'wrapper-vertical',
                    id: 'folding-inspector',
                    cap: 'Inspector',
                    styles: ['css(grid-column:4;min-width:0;overflow:auto;background:ac3)', Styles.interact.foldable({ minSize: '6rem', maxSize: '16rem', resizeThreshold: '3rem' })],
                    components: [{ type: 'input', cap: 'Notes', value: 'Retained inspector value', styles: ['label.atTop', 'size.fullwidth'] }]
                }
            ]
        }
    ]
};
```

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

Movement and resize helpers are disabled on unmount, style teardown or host destruction. Resize disable removes its `passiveresize`, `resize` and `moveend` callbacks and invalidates old debounce/completion work. Observation remains active for other subscribers and stops after the last callback is removed. See [shared passive resize](../JAM-UI/JAM-UI.md#shared-passive-resize) for subscription, measurements and runtime prerequisites. Previous coordinates and dimensions are not restored; persistence and accessible alternatives remain application responsibilities.

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

禁用不会恢复原始尺寸。已排队的防抖或 animationEnd promise 仍可能完成，但其过期的后续操作不会产生作用。被动尺寸观察由订阅者共享。禁用会释放本次订阅，仅在没有剩余回调时停止观察目标；Jam 元素最终销毁时也会停止观察。运行时前提见共享被动尺寸观察说明。键盘控制、无障碍支持和尺寸持久化仍由调用方负责。

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

根据 direction 选择前一个或后一个兄弟元素，并添加可选切换按钮和尺寸调整边缘。在 accordion 外，saveState:true 通过 localStorage 持久化：flex 必须为应用样式的元素本身设置 id；旧式 grid 优先使用父级 id，否则使用元素 id，并结合轴区分状态。仅父级有 id 可以通过前置检查，但不会启用 flex 持久化。

需要相邻兄弟元素和可测量父容器。传入 saveState:true 始终需要稳定的元素或父级 id，即使在跳过存储处理的 accordion 内也如此；在该模式下应省略无关旧式选项。在 accordion 外，持久化为可选功能。在 accordion 内，邻接轨道必须安装 interact.foldable。

移除时释放尺寸调整、监听器和按钮，并移除展开相关类。

在 accordion 外这是双面板交互，而非覆盖层。在 layout.accordion 内，邻接的 interact.foldable 拥有折叠状态、首选尺寸、最小/最大值和阈值行为；expandable 的旧式 default、saveState、resizeThreshold 被跳过。按钮调用邻接 foldable API，缩放使用共享网格所有者。在 foldable 上配置初始状态和限制，在父模板中配置展开首选值。

位置参数顺序: `direction` → `resizeThreshold` → `default` → `button` → `saveState` → `resizable`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `direction` | `string` | `left` | 方向<br>支持简写<br>选项: `top`, `right`, `bottom`, `left` |
| `resizeThreshold` | `number` | `50` | 兄弟元素尺寸小于此阈值时自动展开 |
| `default` | `string` | 未提供 | 默认尺寸占比 |
| `button` | `dictionaryOrBoolean` | `true` | 按钮 |
| `saveState` | `boolean` | `false` | 保存状态 |
| `resizable` | `dictionaryOrBoolean` | `true` | 可调整大小 |

Adds a toggle between this element and its adjacent sibling. Outside accordion, optional `saveState:true` enables `localStorage` persistence: flex requires the styled element’s own `id`; legacy grid uses the parent `id` (falling back to the element `id`) together with the axis. A parent-only `id` passes the initial prerequisite check but does not enable flex persistence. Inside accordion, configure the neighboring `interact.foldable` and the parent template; its legacy `default`, `saveState` and `resizeThreshold` options do not govern that track.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(display:flex;width:100%;height:10rem)'],
    components: [
        { type: 'container', styles: ['css(width:30%;min-width:0;background:ac1)'], components: [{ type: 'label', cap: 'Paired sidebar' }] },
        {
            type: 'container',
            id: 'paired-example-main',
            styles: ['css(width:70%;min-width:0;background:ac5)', Styles.interact.expandable({ direction: 'left', default: '70%', resizable: true })],
            components: [{ type: 'label', cap: 'Use the boundary toggle or resize handle. State is not persisted unless saveState is enabled with an id.' }]
        }
    ]
};
```

### `interact.closable`

<a id="entry-interact-closable"></a>

可关闭

为宿主添加关闭控件。

创建带无障碍名称的关闭按钮，并将图标插槽双击连接到它；默认回调移除最近的可关闭宿主。

关闭时需要更新应用状态或请求确认，应提供 callback。

位置参数顺序: `callback` → `label`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `callback` | `function` | 运行时决定 (function) | 回调<br>支持简写 |
| `label` | `functionOrString` | 未提供 | 关闭按钮的无障碍名称：字符串或 (host) => string，默认使用本地化的关闭，语言切换时更新。 |

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

发布剩余可滚动边缘，并保留旧版滚动状态类。

延迟后（默认 100 毫秒）立即测量解析后的目标，并在滚动、尺寸和轻 DOM 内容变化时更新。在宿主的 jam-overflow 属性中发布以空格分隔的 left/right/top/bottom；无溢出时移除属性。物理边缘支持 horizontal-tb 下的 LTR/RTL 和反向 flex 原点。jam-x-scrolled 和 jam-y-scrolled 保留原有正偏移含义。

卸载或销毁会取消待执行任务并释放监听器和观察器。重叠应用由最后一个活动所有者发布状态；最后清理时恢复原有 jam-overflow 值，但保留后来外部替换的值。保留最后的旧版滚动类。重新挂载会重新解析目标。

clazz 参数仍未使用。overflow 样式读取所选目标自身的属性，不自动启用观察。暂不支持 slot 和 agent 的 overflow 样式。边缘使用半像素容差。避免用溢出状态样式改变被测量的几何尺寸。不遍历目标内部的后代影子树。

位置参数顺序: `clazz` → `delay` → `target` → `listenScroll`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `clazz` | `string` | `jam-scrolled` | 激活类名 |
| `delay` | `number` | `100` | 延迟 |
| `target` | `string` | 未提供 | 目标 |
| `listenScroll` | `boolean` | `true` | 监听原生滚动事件；false 仍保留初次及布局和内容变化观察 |

Measures the resolved target initially and after scroll, resize and light-DOM content changes. Set `listenScroll:false` for clipped non-scrolling content; initial and layout/content measurements remain active, but this subscription does not listen to scroll events. Default is true. Scroll listeners are shared and exist only while at least one subscriber requests them. Publishes remaining physical edges as space-separated tokens in `jam-overflow` on the host. The legacy `jam-x-scrolled` / `jam-y-scrolled` classes retain their positive-offset meaning. `overflow.css(...)` and `overflow.left/right/top/bottom.css(...)` consume the selected target’s own attribute; no observation is installed by those styles. Slot and agent paths are excluded. Teardown restores the previous attribute unless externally replaced, preserves the last legacy classes, and releases all observation. Subscriptions from this style, event.scrollProgress and table progress share one native scroll listener per target; removing one consumer leaves the others active, and the last cleanup disconnects observation. Scroll updates are immediate; layout/content invalidations are coalesced into animation frames. Descendant shadow trees are not observed; vertical writing modes are outside the supported geometry contract. The declared `clazz` argument remains unused.

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
