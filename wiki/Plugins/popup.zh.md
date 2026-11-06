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

位置参数顺序: `target` → `getcontent` → `triggerStyles` → `click2Hide` → `clickElsewhere2Hide`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `target` | `string` | 标识适用直属子项的单个类名。 |
| `getcontent` | `function` | 每次打开时接收当前子项并返回弹窗内容的同步回调。 |
| `triggerStyles` | `array` |  |
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

为委托式悬停目标复用一个拥有的弹出层。默认直接匹配事件目标；hoverClosest:true 查找宿主内最近的匹配元素，并忽略同一目标内部的移动。除非指定 subTip:false，子提示可暂时替换已显示的主提示；返回时恢复主内容。 启用 dismissOn:'click' 后，行激活会取消待显示提示或开始原生隐藏；聚焦行在焦点离开前保持已关闭状态，且不会消耗下一次 Escape。

安装在容纳目标的元素上，并标注预期目标。

重复应用不会重复添加监听器。content(target, popup) 在原生延迟后同步执行；onshow 在挂载和定位就绪后启动订阅。onhidestart 停止异步任务并保留退场视觉。oncontentretire 以 replace、hide 或 destroy 为原因，对每份已创建内容执行一次最终释放，包括 onshow 前被取消的内容。插槽或子提示切换不触发最终释放。卸载移除监听器并销毁弹出层，沿用同一释放路径。 保留在 DOM 中的目标自身或其祖先变为隐藏时，取消待显示提示或沿同一生命周期隐藏已显示提示。

未启用 hoverClosest 时，嵌套后代不会继承祖先的悬停匹配。工厂未执行就没有需要释放的内容。生命周期回调接收者为 null，detail 是冻结快照，但其引用的 DOM 对象仍可变化。不支持返回 Promise 的内容工厂。子提示需要主弹出层已经显示。hoverClosest 不新增键盘帮助，也不改变焦点行为。 dismissOn:'click' 不改变行激活行为、普通点击下拉弹窗策略或焦点匹配。

位置参数顺序: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus` → `onhidestart` → `oncontentretire` → `hoverClosest` → `dismissOn`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `tipAttr` | `string` | `jam-tip` | 用于读取提示内容的属性名。 |
| `subTip` | `boolean` | 未提供 | 主弹出层显示期间启用子提示替换。省略或 true 时启用；false 时禁用。 |
| `subTipAttr` | `string` | `jam-sub-tip` | 子提示内容的属性名。 |
| `selector` | `string` | 未提供 | 显示提示的元素选择器。 |
| `content` | `functionOrString` | 未提供 | 静态内容，或在原生显示延迟后同步执行的 content(target, popup)，返回受支持的插槽内容；不支持返回 Promise。 |
| `showDelay` | `number` | 未提供 | 显示前的延迟（毫秒）。 |
| `hideDelay` | `number` | 未提供 | 隐藏前的延迟（毫秒）。 |
| `type` | `string` | 未提供 | 弹出层配置类型。 |
| `onshow` | `function` | 未提供 | 内容挂载且原生定位就绪后，接收冻结的 { target, content, container, popup } 快照。可在此开始异步订阅；使用 detail，不依赖 this（接收者为 null）。 |
| `dynamic` | `boolean` | 未提供 | 保持内容和位置动态更新。 |
| `position` | `string` | 未提供 | 弹出层位置。 |
| `bias` | `numberOrString` | 未提供 | 弹出层位置偏移。 |
| `snapTo` | `string` | 未提供 | 吸附目标。<br>选项: `cursor`, `target` |
| `autoFlip` | `boolean` | 未提供 | 允许自动翻转位置。 |
| `focus` | `boolean` | `false` |  |
| `onhidestart` | `function` | 未提供 | 开始隐藏时接收本次展示的快照。停止订阅并使异步写入失效，但保留视觉内容以完成退场动画。接收者为 null。 |
| `oncontentretire` | `function` | 未提供 | 接收展示快照及 reason（replace、hide 或 destroy），每份已创建内容恰好回调一次。在此释放内容资源，包括 onshow 前被取消的结果。接收者为 null。 |
| `hoverClosest` | `boolean` | `false` | 默认 false。true 时使用插件宿主内最近的选择器匹配元素；在其后代间移动保留显示延迟，嵌套匹配目标仍各自独立。不改变焦点行为。 |
| `dismissOn` | `string` | 未提供 | 可选的点击关闭方式。'click' 在捕获阶段处理宿主内最近匹配行的激活，仅通过原生退场路径关闭该行待显示、已显示或由焦点触发的提示。省略时保留原有行为；点击仍会执行行操作。<br>选项: `click` |

Shows a tooltip on hover over `jam-tip` targets (configurable via `tipAttr` or `selector`). By default, pointer matching tests the event target directly. Set `hoverClosest:true` to use the nearest selector match inside the plugin host: moving among one row’s labels and icons preserves the pending delay and visible presentation, while nested matching rows remain distinct targets. This option does not change focus matching or keyboard behavior.

Sub-tip replacement is enabled when `subTip` is omitted or true; `subTip:false` disables it. A `jam-sub-tip` target temporarily replaces an already showing main tip; returning restores its original content. Sub-tip swaps and direct slot updates do not retire the logical presentation.

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

### Activation and hidden targets

Set `dismissOn:'click'` to dismiss the matching tooltip when its row is activated. Omission preserves existing behavior. Capture-phase delegation resolves the nearest selector match inside the host and cancels only that row’s pending, visible or focused presentation before the row’s activation callback runs; it does not cancel the click. Pending content whose factory has not run stays uncreated. A visible tip uses native hiding and keeps its content through exit. With `focus:true`, the activated row stays dismissed until focus leaves: descendant hover does not immediately reopen it, and the tooltip does not consume the next Escape.

Retained targets that become hidden, including through a hidden ancestor, cancel pending tooltip display or dismiss the visible tooltip through native hiding. This also applies to the floating-tip and title profiles. It does not impose a visibility requirement on ordinary imperative click-dropdown presentations.

### Content lifecycle

`content(target, popup)` is synchronous and returns supported popup slot content. Native delay and target eligibility checks run first; a Promise is not a supported return. The popup keeps ownership of delay, positioning and exit animation.

- `onshow(detail)` runs after content is mounted and native positioning is ready. Start asynchronous subscriptions here.
- `onhidestart(detail)` runs when hiding begins. Stop subscriptions and invalidate pending writes, but retain the visual content for the exit animation.
- `oncontentretire(detail)` releases the logical content exactly once on committed replacement, completed hiding, or destruction. Unsubscribe defensively and dispose owned resources here, even if `onshow` never ran.

The first two callbacks receive a frozen `{ target, content, container, popup }` snapshot; retirement adds `reason: 'replace' | 'hide' | 'destroy'`. The snapshot identifies that presentation, rather than later mutable popup fields; referenced DOM objects remain live. Callbacks use a null receiver: read `detail`, not `this`.

If the factory never runs, there is no created content to retire. If its result is canceled before mounting or showing, it still receives retirement. Merely queueing a replacement does not retire the visible content; canceled exits cannot retire a successor. A temporary sub-tip or `setContent`/`reapplyContent` slot change is not a new logical content lifetime.

This JavaScript integration fragment accepts a caller-owned `EventTarget` named `updates`. The caller can publish text with `updates.dispatchEvent(new CustomEvent('change', { detail: 'Updated text' }))`. The returned plugin goes in a containing element’s `plugins` array; `.row` identifies its tooltip targets. DOM nodes and event subscriptions use standard browser APIs.

```javascript
function liveTip(updates) {
    const _owners = new WeakMap();
    const _stop = (content) => _owners.get(content)?.abort();
    return Plugins.popup.tip({
        selector: '.row',
        hoverClosest: true,
        subTip: false,
        content(target) {
            const _content = document.createElement('span');
            _content.textContent = target.textContent;
            _owners.set(_content, new AbortController());
            return _content;
        },
        onshow({ content }) {
            updates.addEventListener('change', (event) => {
                content.textContent = String(event.detail);
            }, { signal: _owners.get(content).signal });
        },
        onhidestart({ content }) {
            _stop(content);
        },
        oncontentretire({ content }) {
            _stop(content);
            _owners.delete(content);
            content.remove();
        }
    });
}
```

---

## `popup.floatingTip`

<a id="entry-popup-floatingtip"></a>

悬浮提示

使用 floatingTip 弹出层配置显示委托式悬停提示。

为委托式悬停目标复用一个拥有的弹出层。默认直接匹配事件目标；hoverClosest:true 查找宿主内最近的匹配元素，并忽略同一目标内部的移动。除非指定 subTip:false，子提示可暂时替换已显示的主提示；返回时恢复主内容。 启用 dismissOn:'click' 后，行激活会取消待显示提示或开始原生隐藏；聚焦行在焦点离开前保持已关闭状态，且不会消耗下一次 Escape。

安装在容纳目标的元素上，并标注预期目标。

重复应用不会重复添加监听器。content(target, popup) 在原生延迟后同步执行；onshow 在挂载和定位就绪后启动订阅。onhidestart 停止异步任务并保留退场视觉。oncontentretire 以 replace、hide 或 destroy 为原因，对每份已创建内容执行一次最终释放，包括 onshow 前被取消的内容。插槽或子提示切换不触发最终释放。卸载移除监听器并销毁弹出层，沿用同一释放路径。 保留在 DOM 中的目标自身或其祖先变为隐藏时，取消待显示提示或沿同一生命周期隐藏已显示提示。

未启用 hoverClosest 时，嵌套后代不会继承祖先的悬停匹配。工厂未执行就没有需要释放的内容。生命周期回调接收者为 null，detail 是冻结快照，但其引用的 DOM 对象仍可变化。不支持返回 Promise 的内容工厂。子提示需要主弹出层已经显示。hoverClosest 不新增键盘帮助，也不改变焦点行为。 dismissOn:'click' 不改变行激活行为、普通点击下拉弹窗策略或焦点匹配。

位置参数顺序: `tipAttr` → `subTip` → `subTipAttr` → `selector` → `content` → `showDelay` → `hideDelay` → `type` → `onshow` → `dynamic` → `position` → `bias` → `snapTo` → `autoFlip` → `focus` → `onhidestart` → `oncontentretire` → `hoverClosest` → `dismissOn`.

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

离开或卸载当前目标时，恢复被抑制的 title。卸载插件时也恢复当前 title、移除监听器并销毁拥有的弹出层，取消待显示内容。重新应用同一实例不会重复添加监听器；不同宿主保留独立状态。 保留在 DOM 中的 title 目标自身或其祖先变为隐藏时，原生关闭路径会取消待显示弹窗或隐藏已显示弹窗。

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
