# `Plugins.popup`

<!-- Generated from native authoring; do not edit. -->

[English](popup.md)

## `popup.more`

<a id="entry-popup-more"></a>

直属子项的更多操作

为原生容器中指定的直属子项提供尾部操作菜单。

按单个目标类名匹配，可带前导点。现有子项和后续新增子项各获得一个原生 extra 插槽按钮。静止时使用 display:none，悬停或聚焦时占用标题空间，弹窗打开时保持显示；无悬停或粗指针设备始终显示。同步 getcontent(target) 在每次打开时返回原生 JAML 内容或节点。click2Hide 沿用原生下拉弹窗默认值与事件顺序，不包装回调。 默认将下拉弹窗右边缘与触发按钮对齐，禁用基于光标的弹窗与箭头对齐；可通过原生选项覆盖。

使用支持行内 extra 插槽的原生直属子项；目标需可聚焦以便键盘发现。菜单操作需提供可访问名称与 role=menuitem。

仅拥有注入的按钮以及每次插件应用的一个弹窗。移除、容器重新挂载和卸载会同步子项生命周期；替换及待打开状态的清理不会关闭更新的弹窗。保留调用方 extra 内容与 onchildadd 回调。

仅处理直属子项，不监听仅类名发生的变化。不提供异步内容协议或标题遮罩。重叠目标类应使用单一插件所有者。其他选项转发给 PapayaPopup；应用身份、权限和操作逻辑留在 getcontent。

位置参数顺序: `target` → `getcontent` → `click2Hide` → `clickElsewhere2Hide`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `target` | `string` | 标识适用直属子项的单个类名。 |
| `getcontent` | `function` | 每次打开时接收当前子项并返回弹窗内容的同步回调。 |
| `click2Hide` | `boolean` | 转发原生点击关闭选项；省略时保留下拉弹窗默认 false 及现有回调顺序。 |
| `clickElsewhere2Hide` | `boolean` | 转发原生外部点击关闭选项；省略时保留 true。 |

## `popup.submenu`

<a id="entry-popup-submenu"></a>

嵌套弹出菜单

悬停 100 毫秒后打开，提前离开取消。点击及 ArrowRight/Enter/Space 立即打开。离开项目时创建安全三角形，最多保护 300 毫秒且不续期。返回项目或进入子菜单移除保护。点击三角形关闭该子菜单分支并消耗点击。超时只移除保护。默认向右展开并顶部对齐，可通过原生定位选项覆盖。 启用 click2Hide 时，子菜单操作项在回调后关闭全部祖先弹窗；打开下一级子菜单的项目不会关闭祖先菜单。顶部对齐会计入首项的内部偏移。

应用于 PapayaPopup 内的菜单内容。提供原生菜单项，每个菜单使用一个子菜单控制器。子菜单内容可应用同一插件实现嵌套。

父菜单开始隐藏、销毁、项目移除及卸载插件时取消任务并关闭后代。Escape/ArrowLeft 关闭当前子菜单并恢复项目焦点。键盘操作清除三角形保护。 每次打开均创建新弹窗。正常关闭先播放收起动画再销毁，所有祖先弹窗和已开始关闭的分支均可完成动画。尚未显示的弹窗及强制清理立即销毁。

位置参数顺序: `target` → `getcontent` → `triangleDebug`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `target` | `string` | 未提供 | 菜单容器内用于打开子菜单的项目类名。 |
| `getcontent` | `function` | 未提供 | 同步 getcontent(item) 返回原生页描语言内容或节点。 |
| `triangleDebug` | `boolean` | `false` | 使用 var(--jam-color-primary-mask) 显示裁剪的指针保护区域，默认关闭。 |

Popup plugins attach tooltip, help, floating-tip, or more-action popups. Each variant owns its target discovery and interaction lifecycle while native popup infrastructure handles display and dismissal.

---

## `popup.tip`

<a id="entry-popup-tip"></a>

悬停显示详情

使用 tip 弹出层配置显示委托式悬停提示。

观察匹配 selector 或 tip 属性的 mouseover 目标，读取提供的内容或属性内容，并复用一个拥有的弹出层。除非指定 subTip:false，否则子提示内容可替换正在显示的主提示；返回主目标时恢复其原始内容。

安装在容纳目标的元素上，并标注预期目标。

重复应用于同一宿主不会重复添加委托监听器。卸载时移除此监听器并销毁拥有的弹出层，包括待显示的弹出层。

匹配直接检查事件目标，而不是其最近的匹配祖先。子提示替换需要主弹出层已经显示。需要时另行提供可通过焦点访问的帮助。

位置参数顺序: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `tipAttr` | `string` | `jam-tip` | 用于读取提示内容的属性名。 |
| `subTip` | `boolean` | 未提供 | 主弹出层显示期间启用子提示替换。省略或 true 时启用；false 时禁用。 |
| `subTipAttr` | `string` | `jam-sub-tip` | 子提示内容的属性名。 |
| `selector` | `string` | 未提供 | 显示提示的元素选择器。 |
| `content` | `functionOrString` | 未提供 | 静态或动态计算的提示内容。 |
| `showDelay` | `number` | 未提供 | 显示前的延迟（毫秒）。 |
| `hideDelay` | `number` | 未提供 | 隐藏前的延迟（毫秒）。 |
| `type` | `string` | 未提供 | 弹出层配置类型。 |
| `onshow` | `function` | 未提供 | 弹出层显示时的回调。 |
| `dynamic` | `boolean` | 未提供 | 保持内容和位置动态更新。 |
| `position` | `string` | 未提供 | 弹出层位置。 |
| `bias` | `numberOrString` | 未提供 | 弹出层位置偏移。 |
| `snapTo` | `string` | 未提供 | 吸附目标。<br>选项: `cursor`, `target` |
| `autoFlip` | `boolean` | 未提供 | 允许自动翻转位置。 |
| `focus` | `boolean` | `false` |  |

Shows a tooltip popup on hover when the cursor enters an element with a `jam-tip` attribute (configurable via `tipAttr`). Sub-tip replacement is enabled when `subTip` is omitted or true; `subTip:false` disables it. A sub-tip target with a `jam-sub-tip` attribute updates an already showing main popup without closing it. Returning to the main target restores its original content. Matching tests the event target itself, so a nested label or icon does not inherit a matching ancestor’s tip automatically.

The show callback receives the event detail.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: ['popup.tip(subTip:true;showDelay:200)'],
    components: [
        {
            type: 'checkbox',
            cap: 'Admin',
            tip: 'Grants full system access.',
            data: [
                { name: 'read', value: 1, tip: 'View content' },
                { name: 'write', value: 2, tip: 'Edit content' },
                { name: 'delete', value: 3, tip: 'Remove content' }
            ]
        }
    ]
};
```

---

## `popup.floatingTip`

<a id="entry-popup-floatingtip"></a>

悬浮提示

使用 floatingTip 弹出层配置显示委托式悬停提示。

观察匹配 selector 或 tip 属性的 mouseover 目标，读取提供的内容或属性内容，并复用一个拥有的弹出层。除非指定 subTip:false，否则子提示内容可替换正在显示的主提示；返回主目标时恢复其原始内容。

安装在容纳目标的元素上，并标注预期目标。

重复应用于同一宿主不会重复添加委托监听器。卸载时移除此监听器并销毁拥有的弹出层，包括待显示的弹出层。

匹配直接检查事件目标，而不是其最近的匹配祖先。子提示替换需要主弹出层已经显示。需要时另行提供可通过焦点访问的帮助。

位置参数顺序: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus`.

公共参数: [popup.tip](#entry-popup-tip).

A floating tooltip variant that follows the cursor. No arrow. Type defaults to `PopupType.floatingTip`. Accepts all the same args as `popup.tip`.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [Plugins.popup.floatingTip({ showDelay: 100 })],
    components: [
        {
            type: 'indicator',
            cap: 'Hover me',
            value: 42,
            tip: 'This tip follows your cursor'
        }
    ]
};
```

---

## `popup.title`

<a id="entry-popup-title"></a>

悬停title替换

用框架悬停弹出层替换原生 title 提示。

捕获带 title 目标上的 mouseenter，暂时清空原生 title，并在拥有的弹出层中显示其文本。移动到另一个带 title 的目标时，先恢复前一个目标。

离开或卸载当前目标时，恢复被抑制的 title。卸载插件时也恢复当前 title、移除监听器并销毁拥有的弹出层，取消待显示内容。重新应用同一实例不会重复添加监听器；不同宿主保留独立状态。

恢复时保留较新的非空 title 或已移除的 title 属性。外部再次赋予相同空 title 的操作无法与插件抑制区分。悬停提示本身不提供键盘或焦点帮助。

位置参数顺序: `showDelay`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `showDelay` | `number` | `2000` | 显示前的延迟（毫秒）。 |

Replaces a target’s native `title` tooltip with a framework popup. It temporarily suppresses the title and restores it on leave, target unmount, target switch or plugin removal. A newer nonempty title or a removed title attribute is preserved. An external assignment of the same empty title cannot be distinguished from the plugin’s suppression.

Removing the plugin detaches its listeners and destroys its popup, including pending display. Repeated application does not duplicate listeners. Use `popup.tip` for explicit tip content and provide keyboard/focus-accessible help when the product requires it.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: ['popup.title(showDelay:200)'],
    components: [
        {
            type: 'button',
            cap: 'Save',
            attrs: { title: 'Save all changes to the server (Ctrl+S)' }
        }
    ]
};
```

---

## `popup.helper`

<a id="entry-popup-helper"></a>

帮助信息

显示附加到原生标题的帮助文本。

cap 触发方式为帮助标题添加装饰并处理点击。label 触发方式创建可聚焦的问号标签，在悬停或聚焦时显示帮助，并跟踪标题和帮助变化。

使用具有 cap 插槽和帮助内容的原生元素。

卸载时移除监听器、辅助标签和弹出层。

用户需要独立且可通过键盘聚焦的帮助入口时，选择 trigger label。

位置参数顺序: `trigger` → `showDelay` → `hideDelay` → `position` → `bias` → `autoFlip` → `container`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `trigger` | `string` | `cap` | 点击标题或悬停问号标签。<br>选项: `cap`, `label` |
| `showDelay` | `number` | 未提供 | 显示前的延迟（毫秒）。 |
| `hideDelay` | `number` | 未提供 | 隐藏前的延迟（毫秒）。 |
| `position` | `string` | 未提供 | 弹出层位置。 |
| `bias` | `numberOrString` | `-10` | 弹出层位置偏移。 |
| `autoFlip` | `boolean` | 未提供 | 允许自动翻转位置。 |
| `container` | `functionOrString` | 未提供 | 弹出层容器解析函数。 |

Shows help content on click. Listens for clicks on `[jam-help] > [slot="cap"]` elements and displays the `jam-help` attribute content in a popup. Accepts additional `PapayaPopup` configuration args.

```javascript jaml-playground
export default {
    type: 'input',
    cap: 'API Key',
    help: 'Your API key can be found in the dashboard under Settings → API Keys. Keep it secret!',
    plugins: ['popup.helper']
};
```

---

## Dynamic tooltip

A tooltip that updates its content on `mousemove`, snaps to cursor, and stays at a fixed position:

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['size.fullsize', 'background.grid(gap:3rem;width:0.1rem)'],
    tip: 'move cursor',
    onmousemove(e) {
        document.getElementById('jam-popup-tip')?.setContent(
            jame({
                type: 'indicator',
                value: `X: ${e.pageX}, Y: ${e.pageY}`,
                style: { whiteSpace: 'nowrap' }
            })
        );
    },
    plugins: [
        Plugins.popup.tip({
            dynamic: true,
            position: 'bottom-right',
            bias: jam.rem(1),
            snapTo: 'cursor',
            autoFlip: false
        })
    ]
};
```
