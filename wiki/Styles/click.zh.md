# click

<!-- Generated from native authoring; do not edit. -->

[English](click.md)

`Styles.click.*` — click-triggered behaviors.

---

## Variants

### `click.toFront`

<a id="entry-click-tofront"></a>

点击置顶

在父级堆叠上下文中，将已定位的内容移到前方。

立即将宿主前移；连接就绪后安装 mousedown 监听器，在后续按下鼠标时再次前移。在父级下的可排序后代之间设置内联 z-index 和排序/置顶标记。

改变堆叠顺序，不移动 DOM 节点，也不更换其父级。

提供合适的定位和共享堆叠上下文，并使框架 z-index 主题变量可用。

拆卸时移除 mousedown 监听器和 sortable 标记，使剩余的 sortable 提升到前面，并清除插件数据。待执行的连接就绪回调不能重新安装过期监听器。不恢复先前的内联 z-index 值。

可用于已定位的同级卡片或窗口；布局、父级变更及模态焦点需单独管理。

这不是全局置顶或焦点锁定的模态管理器。已置顶节点会提前返回；任意更换父级的情况不会自动协调。

hosts: `HTMLElement`.

states: `mousedown`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-click-toFront`

Raises the host immediately and on `mousedown` within its parent stacking context. Removing the style detaches its listener and prevents pending connection readiness from reinstalling it; prior inline z-index values are not restored. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Click to bring to front',
        styles: ['click.toFront']
    },
    {
        type: 'card',
        cap: 'Also comes to front',
        styles: ['click.toFront']
    }
];
```

### `click.able`

<a id="entry-click-able"></a>

可点击按钮外观

为自定义宿主提供框架的可点击按钮外观，交互语义由应用负责。

组合 clickable 类与 stylize=button；不安装激活处理函数。

指针、悬停和按下状态的外观由主题与框架样式表提供。

宿主需具备预期的交互及无障碍语义；加载主题和框架样式。

常规类插件和属性插件会跟踪并恢复其外观改动。

若目标控件是按钮，优先使用原生按钮。使用自定义宿主时，需自行提供激活、焦点和语义属性。

样式不会添加键盘激活、tabIndex、无障碍角色、禁用行为或点击回调。

hosts: `HTMLElement`.

states: `hover`, `active`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-click-able`

Makes the element appear clickable — adds `cursor: pointer` via `.jam-clickable` class and applies button stylize via the `stylize` attribute. No args.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Clickable label',
        styles: ['click.able']
    },
    {
        type: 'card',
        cap: 'Clickable card',
        styles: ['click.able']
    }
];
```

### `click.bouncing`

<a id="entry-click-bouncing"></a>

悬停与按压弹跳

为控件提供悬停和按压弹跳反馈。

添加 hover-bouncing 与 active-bouncing 类，由框架样式表提供视觉效果。

视觉反馈不会安装点击操作。

Adds a bounce animation on click. Adds both `.jam-hover-bouncing` and `.jam-active-bouncing` classes. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Bounce on click',
        styles: ['click.bouncing']
    },
    {
        type: 'card',
        cap: 'Bouncing card',
        styles: ['click.bouncing']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Clickable',
    styles: ['click.able', 'click.toFront']
};
```
