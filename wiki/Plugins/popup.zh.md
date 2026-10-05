# `Plugins.popup`

<!-- Generated from native authoring; do not edit. -->

[English](popup.md)

Popup plugins attach tooltip, help, or floating-tip popups to element subtrees. They listen for mouse events on matching child selectors and show a `PapayaPopup` instance.

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
