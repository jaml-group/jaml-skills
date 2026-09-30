# button style variants

<!-- Generated from native authoring; do not edit. -->

[English](button-style.md)

**Element:** `jam-button` · **Type:** `element`

---

## Slots

| Slot   | Type    | Description                 |
| ------ | ------- | --------------------------- |
| `icon` | slotted | Icon content                |
| `cap`  | slotted | Button label (default slot) |

---

## Style variants

### Ghost button

Use the `button-ghost` element type for a transparent button.

```javascript jaml-playground
export default [
    {
        type: 'button-ghost',
        cap: 'Ghost'
    }
];
```

### `button.cta`

<a id="entry-button-cta"></a>

CTA

应用旧版 cta 按钮标记。

仅添加 cta 类；不设置按钮类型。

需要受支持的 cta 按钮变体时，显式选择原生按钮类型。此标记本身不会建立该变体或其操作。

This legacy style adds a class only. Select the native `button-cta` type for the call-to-action variant; bind the action separately.

```javascript jaml-playground
export default [
    {
        type: 'button-cta',
        cap: 'Submit'
    }
];
```

### `button.close`

<a id="entry-button-close"></a>

关闭

为按钮提供常规的关闭操作符号。

添加 close-btn 类；按钮角色 CSS 在 jam-button 上绘制叉号，并隐藏常规 icon 插槽。

仅控制呈现：实际操作需另行绑定；此样式不实现该操作。

Close button (X icon style). No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '✕',
        styles: ['button.close']
    }
];
```

### `button.reset`

<a id="entry-button-reset"></a>

重置

为按钮提供常规的重置操作符号。

添加 reset-btn 类；按钮角色 CSS 在 jam-button 上绘制撤销符号，并隐藏常规 icon 插槽。

仅控制呈现：实际操作需另行绑定；此样式不实现该操作。

Reset button style. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Reset',
        styles: ['button.reset']
    }
];
```

### `button.add`

<a id="entry-button-add"></a>

添加

为按钮提供常规的添加操作符号。

添加 add-btn 类；按钮角色 CSS 在 jam-button 上绘制加号，并隐藏常规 icon 插槽。

仅控制呈现：实际操作需另行绑定；此样式不实现该操作。

Add / create button with plus icon styling. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '+',
        cap: 'Add',
        styles: ['button.add']
    }
];
```

### `button.check`

<a id="entry-button-check"></a>

勾选

为按钮提供常规的勾选操作符号。

添加 check-btn 类；按钮角色 CSS 在 jam-button 上绘制勾号，并隐藏常规 icon 插槽。

仅控制呈现：实际操作需另行绑定；此样式不实现该操作。

Check / confirm button with checkmark styling. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '✓',
        cap: 'Confirm',
        styles: ['button.check']
    }
];
```

### `button.vertical`

<a id="entry-button-vertical"></a>

垂直

选择目标组件实现的垂直变体。

添加 jam-vertical。徽章、按钮、按钮组、指示器、选项和进度样式各自在自身组件布局中解释该类。

使用匹配的组件路径和组件结构。

共享类不代表几何形态相同，也不代表通用旋转；进度方向与标题和值的堆叠布局是不同用途。

Vertical layout — stacks icon above the label. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: '⬆',
        cap: 'Upload',
        styles: ['button.vertical']
    }
];
```

### `button.pill`

<a id="entry-button-pill"></a>

药丸

使用药丸形原生按钮。

以较大的圆角添加药丸形样式，同时保留按钮行为。

Pill / rounded capsule shape. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Pill',
        styles: ['button.pill']
    }
];
```

### `button.fab`

<a id="entry-button-fab"></a>

FAB

应用旧版 fab 按钮标记。

仅添加 fab 类；不设置按钮类型。

需要受支持的 fab 按钮变体时，显式选择原生按钮类型。此标记本身不会建立该变体或其操作。

This legacy style adds a class only. Use the native `button-fab` type for the floating-action presentation and `button.round` when a circular shape is required.

```javascript jaml-playground
export default [
    {
        type: 'button-fab',
        icon: '✏',
        cap: 'Edit',
        styles: ['button.round']
    }
];
```

### `button.link`

<a id="entry-button-link"></a>

链接

应用旧版 link 按钮标记。

仅添加 link 类；不设置按钮类型。

需要受支持的 link 按钮变体时，显式选择原生按钮类型。此标记本身不会建立该变体或其操作。

This legacy style adds a class only. Use the native `button-link` type for link presentation; navigation or command handling remains explicit.

```javascript jaml-playground
export default [
    {
        type: 'button-link',
        cap: 'Learn more'
    }
];
```

### `button.blended`

<a id="entry-button-blended"></a>

混合

使用融入周围环境的低调按钮表面。

通过 blended 类设置按钮背景、悬停和激活状态的颜色变量。

与原生按钮及其已有的点击处理器配合使用。

Blended button style. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Blended',
        styles: ['button.blended']
    }
];
```

### `button.round`

<a id="entry-button-round"></a>

圆形

使用圆形按钮承载紧凑的图标操作。

添加 1:1 宽高比、圆形圆角，以及不增长的 flex 尺寸设置。

用于按钮角色的宿主，并提供可访问的操作标签。

Round button shape. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        icon: 'plus',
        styles: ['button.round']
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'wrapper',
    stylize: 'actions',
    styles: ['layout.flex'],
    components: [
        { type: 'button-cta', cap: 'Primary' },
        { type: 'button-ghost', cap: 'Ghost' },
        { type: 'button-link', cap: 'Link' }
    ]
};
```

## `button.grid`

<a id="entry-button-grid"></a>

网格

为路径选中的目标配置网格相关参数。

将 templateColumns、templateRows、autoColumns、autoRows 和 templateAreas 映射到对应的 CSS 网格属性；gap 保持为 gap，area 使用 gridArea，除非所属路径覆盖其 CSS 键。

另行在网格容器上设置 display:grid，例如使用 css(display:grid)。使用 grid.area 显式指定网格项的行列位置。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `templateColumns` | `string` | 列模板 |
| `templateRows` | `string` | 行模板 |
| `autoColumns` | `string` | 自动列 |
| `autoRows` | `string` | 自动行 |
| `templateAreas` | `string` | 模板区域 |
| `gap` | `string` | 间隙 |
| `area` | `string` | 网格区域<br>`{"cssKey":"gridArea"}` |

## `button.text`

<a id="entry-button-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | 样式<br>选项: `normal` — 正常, `italic` — 斜体<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 阴影<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | 文本颜色<br>`{"cssKey":"color"}` |

## `button.color`

<a id="entry-button-color"></a>

颜色

为路径选中的目标设置前景色。

通过依赖路径的样式方式转发 color 和可选的颜色通道参数。

使用语义化颜色预设实现随主题变化的前景色角色；根路径 color.accent 具有独立的颜色配置契约。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写 |

## `button.inline`

<a id="entry-button-inline"></a>

行内布局

使选中的目标使用框架的内联外观。

为路径选中的目标添加 jam-inline。

所选组件或目标的样式表必须实现 inline 类。

这是类名约定，不是无条件的内联显示声明。

## `button.icon.text`

<a id="entry-button-icon-text"></a>

字体族

为路径选中的目标配置字体排版。

映射字体、字号、字重、样式、装饰、间距、阴影、对齐、换行、行高、选择、缩进、光标和前景色字段；icon 路径使用自己的字体和阴影键。

字体排版选择 text，盒对齐选择 layout 或 align；包装元素需要保留几何结构时，针对插槽内容设置样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `font` | `string` | 字体族 |
| `size` | `string` | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `string` | 样式<br>选项: `normal` — 正常, `italic` — 斜体<br>`{"cssKey":"fontStyle"}` |
| `decoration` | `string` | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 阴影 |
| `align` | `string` | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | 文本颜色 |

## `button.text.mono`

<a id="entry-button-text-mono"></a>

等宽字体

为路径选中的目标使用主题的等宽字体族。

嵌套的 text.mono 预设选择 sys.typography.fontFamily.mono。

根路径 text.mono 扩展改为使用通用的 monospace 字体族。这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `button.color.accent`

<a id="entry-button-color-accent"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `button.capslot.layout`

<a id="entry-button-capslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `button.background.tint`

<a id="entry-button-background-tint"></a>

染色

根据 sys.color.tint.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `button.iconslot.layout`

<a id="entry-button-iconslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `button.extraslot.layout`

<a id="entry-button-extraslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `button.labelslot.layout`

<a id="entry-button-labelslot-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式<br>`{"cssKey":"display"}` |
| `position` | `string` | 位置<br>`{"cssKey":"position"}` |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

## `button.text.size.l`

<a id="entry-button-text-size-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `button.text.size.m`

<a id="entry-button-text-size-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `button.text.size.s`

<a id="entry-button-text-size-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `button.text.size.xl`

<a id="entry-button-text-size-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `button.text.size.xs`

<a id="entry-button-text-size-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `button.text.size.3xl`

<a id="entry-button-text-size-3xl"></a>

三倍特大

将主题的 3xl 字号应用于选中的内容。

根据 sys.typography.fontSize.3xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `button.text.size.4xl`

<a id="entry-button-text-size-4xl"></a>

四倍特大

将主题的 4xl 字号应用于选中的内容。

根据 sys.typography.fontSize.4xl 设置 font-size。

与合适的字体、行高和换行行为组合使用；改变字号会改变文本度量，并可能影响换行和布局。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `button.text.size.xxl`

<a id="entry-button-text-size-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `button.text.size.xxs`

<a id="entry-button-text-size-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。
