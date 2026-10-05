# auto

<!-- Generated from native authoring; do not edit. -->

[English](auto.md)

`Styles.auto.*` — automatic behaviors triggered on mount or data change.

---

## Variants

### `auto.badge`

<a id="entry-auto-badge"></a>

徽章

将方括号内的标题和值文本转为内联徽章。

扫描现有文本节点，并将匹配的方括号表达式替换为 jam-badge 标记；dir 控制垂直排列类。

使用父级标记可被改写的稳定内容。

转换只改写一次父元素的 innerHTML，可能替换已有子节点；不提供逆向转换或变更观察器。

位置参数顺序: `sep` → `dir`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `sep` | `string` | `:` | 分隔符 |
| `dir` | `string` | `horizontal` | 方向 |

Auto-replaces `[cap:value]` text patterns in the element's text content with inline `<jam-badge>` elements. The text before `sep` becomes the `cap` slot and the text after it becomes the `value` slot. Walks the DOM tree and replaces matching text nodes.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: '[status:active] [priority:high]',
        styles: ['auto.badge']
    },
    {
        type: 'label',
        cap: '[status:active] [priority:high]',
        styles: ["auto.badge(sep:':';dir:vertical)"]
    }
];
```

### `auto.adjustFont`

<a id="entry-auto-adjustfont"></a>

自动调整字体大小

使文本适应目标的可用尺寸。

立即执行，并通过动画帧节流在配置的宿主事件上执行；可选的后代选择器指定文本目标。

需要可测量的文本，以及已确定且不是 normal 的行高。

应用样式前设置目标尺寸和行高；必要时除 resize 外，还应选择内容变化的触发事件。

此样式测量文本布局，而非任意复杂子元素的几何结构。拆除会移除监听器和标记类，但不恢复之前的内联字号。

位置参数顺序: `min` → `max` → `target` → `triggers` → `bias` → `heightAdjust`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `min` | `number` | `10` | 最小尺寸<br>单位为 px。 |
| `max` | `numberOrString` | 未提供 | 最大尺寸<br>单位为 px。 |
| `target` | `string` | 未提供 | 目标选择器 |
| `triggers` | `array` | `["resize"]` | 触发器 |
| `bias` | `dictionary` | 未提供 | 偏移 |
| `heightAdjust` | `number` | 未提供 | 高度调整<br>以字号的比例表示。文本垂直底部对齐时，行高和字体设计可能造成底部溢出；此参数用于补偿。 |

Auto-scales font size so text fits within the container without overflow. Listens to resize events (and custom triggers) and adjusts incrementally.

Height adjustment compensates for line-height and font vertical alignment.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'This text will auto-scale to fit inside the container',
        styles: ['auto.adjustFont(min:8;max:32)', 'css(width:15rem;overflow:hidden)']
    }
];
```

### `auto.focus`

<a id="entry-auto-focus"></a>

自动聚焦

在挂载后聚焦元素，并在卸载时将焦点返回先前自动聚焦的元素。

在重绘后安排聚焦；可选的正则表达式在 value 中定位选择范围。

宿主必须可聚焦。选择范围还需要字符串形式的 value，以及支持 setSelectionRange 的 agent。

挂载时安装焦点和卸载监听器；样式拆除移除这些监听器。

此样式负责焦点移动，因此应避免与其他自动聚焦控制器竞争。

位置参数顺序: `selection`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `selection` | `regexp` | 选择<br>使用正则表达式。 |

Auto-focuses the element on mount. Manages a focus stack — when this element unmounts, focus returns to the previous element in the stack. If `selection` is provided, selects the matching portion of the value.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Focused on mount',
        value: 'Select this word please',
        styles: ['auto.focus(selection:/this/)']
    },
    {
        type: 'input',
        cap: 'Focused, no selection',
        styles: ['auto.focus']
    }
];
```

### `auto.moveAlong`

<a id="entry-auto-movealong"></a>

跟随移动

使元素随目标元素的位置移动。

在挂载和延迟后，定期测量目标中心点，并通过 MelonMove 更新平移；已有移动辅助对象时复用它。

目标选择器必须在延迟后能匹配目标；以冒号开头的选择器相对于宿主解析。

卸载宿主、拆卸样式或销毁宿主时，清除正在运行的 interval、移动类及变量、拥有的 checkpoint，以及此样式创建的移动辅助对象。样式仍然安装时，后续挂载会开始一次新的设置。

将 transform 和移动的管理职责留给此样式，或有意识地与其他移动插件协调。

延迟设置和待完成的移动操作会检查其应用是否仍是当前应用；过期的完成操作不会更新宿主。这使后续操作失效，而不是取消任意 promise。现有的移动辅助对象会被复用，不由此样式移除。

位置参数顺序: `target` → `delay` → `throttle` → `frontZIndex` → `backZIndex`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `target` | `string` | 未提供 | 目标选择器<br>支持简写 |
| `delay` | `number` | `100` | 延迟 |
| `throttle` | `number` | `25` | 节流 |
| `frontZIndex` | `numberOrString` | `1000` | 前置 z-index |
| `backZIndex` | `numberOrString` | `auto` | 后置 z-index |

`auto.moveAlong` and `auto.scrollAlong` clean their active setup on unmount, style teardown or host destruction and can set up again on remount. Delayed setup ignores obsolete applications. Movement also guards pending move completions; scroll synchronization cancels its owned frame and timeout and removes only its own temporary marker. These guards do not cancel arbitrary promises.

Makes the element follow another element's screen position. Uses `MelonMove` for smooth animation. Toggles `jam-at-front` class when passing certain angles for z-index management.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['css(position:relative)'],
        components: [
            { type: 'label', cap: 'Reference', id: 'ref' },
            {
                type: 'label',
                cap: 'Following',
                styles: ['auto.moveAlong(target:#ref)']
            }
        ]
    }
];
```

### `auto.scrollAlong`

<a id="entry-auto-scrollalong"></a>

跟随滚动

使可滚动目标跟随另一个元素的相对滚动位置。

在延迟挂载后，监听来源的 scroll 事件，将滚动百分比复制到宿主或 scrollTarget；使用标记避免相互反馈。

两个选择器都必须能匹配目标，且目标端必须具有可滚动范围。

卸载宿主、拆卸样式或销毁宿主时，移除源滚动监听器，取消拥有的动画帧和 timeout，并仅在此次设置添加了滚动标记时移除它。延迟设置检查其应用身份；后续挂载可开始一次全新的设置。

同步复制百分比，而不是像素。源滚动事件发生前不会执行初始复制。过期的延迟设置和已排队回调不能更新已移除或被替换的应用；底层延迟 promise 不会被取消。

位置参数顺序: `target` → `scrollTarget` → `delay`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `target` | `string` | 未提供 | 目标选择器<br>支持简写 |
| `scrollTarget` | `string` | 未提供 | 滚动目标选择器 |
| `delay` | `number` | `100` | 延迟 |

Synchronizes the scroll position of two elements. When the target scrolls, the scroll target mirrors its scroll percentage.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['css(display:flex;gap:1rem)'],
        components: [
            {
                type: 'container',
                id: 'source-scroll',
                styles: ['css(height:10rem;overflow-y:auto)', 'css(width:50%)'],
                components: [{ type: 'label', cap: 'Scroll here\n\nLine 1\nLine 2\nLine 3\nLine 4\nLine 5' }]
            },
            {
                type: 'container',
                styles: ['auto.scrollAlong(target:#source-scroll)', 'css(height:10rem;overflow-y:auto)', 'css(width:50%)'],
                components: [{ type: 'label', cap: 'Mirrored scroll\n\nLine A\nLine B\nLine C\nLine D\nLine E' }]
            }
        ]
    }
];
```

### `auto.hideIf.empty`

<a id="entry-auto-hideif-empty"></a>

为空时隐藏

宿主基于选项且数据为空时隐藏它。

在初次连接和 optionchange 时判断，根据宿主数据切换 jam-hide。

使用符合选项数据和 optionchange 契约的宿主。

此样式检查数据是否为空，不检查渲染的子元素数量。移除事件监听器不会恢复先前的隐藏类。

Auto-hides the element when its `data` is empty or null. Listens to `optionchange` events. For option-based elements (`AbstractOptionElement`). No args.

```javascript jaml-playground
export default [
    {
        type: 'select',
        cap: 'Items',
        styles: ['auto.hideIf.empty'],
        data: []
    }
];
```

### `auto.hideIf.valueIs0`

<a id="entry-auto-hideif-valueis0"></a>

值为 0 时隐藏

宿主类似输入控件且值缺失或为数字零时隐藏它。

在初次连接和 valuechange 时判断，当值为 null、undefined 或数字 0 时切换 jam-hide。

使用提供 value 和 valuechange 的宿主。

字符串 "0" 不匹配数字零。移除事件监听器不会恢复先前的隐藏类。

Auto-hides the element when its `value` is `0` or `null`. Listens to `valuechange` events. For input elements (`AbstractInputElement`). No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Enter 0 to hide',
        styles: ['auto.hideIf.valueIs0']
    }
];
```

### `auto.keepScrollPosition`

<a id="entry-auto-keepscrollposition"></a>

保持滚动位置

返回已挂载的内容时恢复稳定的滚动位置。

像素模式在路由变化或卸载时保存偏移，并在可选延迟及视口准备后恢复。bookmark 委托模式在生命周期边界或显式 save 时保存应用 JSON；read/save/prepare 不执行恢复滚动。

两种模式都需要稳定的宿主 id。委托模式必须提供 connect 和 capture，不能结合 selector 或 delay。定向 prepare 还需要唯一可测量的原生 lazy 宿主和显式正数 estimatedHeight；详见滚动工具契约。

卸载或移除会取消准备并使委托 store 失效；新准备取代旧准备。像素模式自动监听用户导航；委托调用方提供 AbortSignal。connect 返回的函数负责断开清理；capture 返回 undefined 时保留原存储。

像素模式用于精确的已加载前缀准备。bookmark 模式结合 store.prepare(request, signal) 可在保持延迟构建的同时恢复语义行或末尾；应用解析行身份、分页和可见性，在用户或导航意图变化时中止，并立即写入返回的 top。参见 [滚动准备](../utils.md#targeted-lazy-scroll-preparation)。

位置参数顺序: `selector` → `delay` → `bookmark`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `selector` | `string` | 目标选择器 |
| `delay` | `function` | 延迟 |
| `bookmark` | `dictionary` | 可选委托模式：{ connect(store, element), capture(element) }。store 提供 read、save 和 prepare；应用解释书签并写入准备好的滚动位置。 |

Pixel mode persists and restores offsets using session storage. Optional `bookmark` mode delegates semantic identity and scrolling to the application; see [targeted lazy preparation](../utils.md#targeted-lazy-scroll-preparation).

> **Note:** The element must have an `id` attribute for the storage key.

```javascript jaml-playground
export default [
    {
        type: 'container',
        id: 'scrollable-list',
        styles: ['auto.keepScrollPosition', 'css(height:20rem;overflow-y:auto)'],
        components: [{ type: 'label', cap: 'Scroll position remembered' }]
    }
];
```

### `auto.colored`

<a id="entry-auto-colored"></a>

自动着色

将宿主颜色配置用于其图标和内部 agent 的前景色。

添加 jam-auto-colored；样式表针对 jam-colorprofile 下兼容的图标和暴露的 agent 部分应用样式。

宿主需要颜色配置，以及对应的图标或 agent 结构。

此样式不选择颜色配置，也不为每个后代重新着色。

Auto-applies accent color tint to the element. **Requires a `color` param** on the element — without it, nothing visible happens.

The element's `color` parameter supplies the tint source.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Tinted',
        color: 'blue',
        styles: ['auto.colored']
    },
    {
        type: 'card',
        cap: 'Colored card',
        styles: ['auto.colored']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'select',
    cap: 'Items',
    styles: ['auto.hideIf.empty'],
    data: []
};
```
