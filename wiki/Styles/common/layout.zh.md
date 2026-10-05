# common.layout

<!-- Generated from native authoring; do not edit. -->

[English](layout.md)

`Styles.layout.*` — CSS layout properties and layout helpers.

---

## Variants

### `layout`

<a id="entry-layout"></a>

布局

调整布局属性，不切换到专门的布局预设。

按提供的参数设置 display、position、order、overflow、gap、堆叠、盒尺寸计算、transform 和 transition。

专门的布局契约使用 layout.grid 或 layout.flex；应与移动或滚动管理者协调 transform 和 overflow。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 显示方式 |
| `position` | `string` | 位置 |
| `order` | `number` | 排序<br>`{"cssKey":"order"}` |
| `overflow` | `string` | 溢出<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | 间隙 |
| `zIndex` | `number` | 层级<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | 盒模型<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | 变换<br>`{"cssKey":"transform"}` |
| `transition` | `string` | 过渡<br>`{"cssKey":"transition"}` |

Base layout properties.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout(display:flex;gap:1rem)']
    }
];
```

### `layout.basic`

<a id="entry-layout-basic"></a>

基本

应用旧有的基础布局标记。

添加 layout 类。

此入口不实现测量或布局逻辑。未发现使用此标记的专用原生处理；请选择显式布局或尺寸样式，或使用 label.atTop 放置标签，而不是依赖名称。

Adds `jam-layout` CSS class for basic layout styling. No args.

### `layout.grid`

<a id="entry-layout-grid"></a>

网格

已知行列排列时，使用明确的等尺寸轨道网格。

设置网格数量及轨道变量；size 依次提供行数、列数。withHeader 会预留高度自动的首行。

加载框架样式表，并区分容器布局与子项位置设置。

在子项上使用 gridpos 或 gridsize。按尺寸自动换行使用 autogrid；一维行列布局使用 flex。

只排列提供的子元素，不创建应用区域或分配数据位置。

位置参数顺序: `rows` → `cols` → `gap` → `padding` → `size` → `withHeader`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `rows` | `numberOrString` | 未提供 | 行数 |
| `cols` | `numberOrString` | 未提供 | 列数 |
| `gap` | `numberOrString` | 未提供 | 间隙 |
| `padding` | `numberOrString` | 未提供 | 内边距 |
| `size` | `array` | 未提供 | 行/列数<br>行/列数<br>支持简写 |
| `withHeader` | `boolean` | `false` | 是否有头部 |

CSS grid with explicit row/column counts.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout.grid(rows:2;cols:3;gap:0.5rem)']
    }
];
```

### `layout.autogrid`

<a id="entry-layout-autogrid"></a>

自动网格

为重复卡片或方块使用由尺寸驱动的网格重复排列。

根据 repeat 和尺寸参数构建 CSS 重复轨道。repeat 默认为 auto-fill；数值 repeat 固定重复数量，不会自动调整列数。

加载框架样式表，并区分容器布局与子项位置设置。

用 width 或 minWidth/maxWidth 表达轨道尺寸。需要明确的行列坐标时，使用 layout.grid。

这是 CSS 网格重复排列，不是瀑布流或按内容智能排布。数值 repeat 选择固定数量；需结合可用空间验证轨道尺寸。

位置参数顺序: `repeat` → `withHeader` → `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `repeat` | `numberOrString` | `auto-fill` | 轨道重复数量 |
| `withHeader` | `boolean` | `false` | 是否有头部 |
| `width` | `string` | 未提供 | 宽度<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | 未提供 | 最小宽度<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | 未提供 | 最大宽度<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | 未提供 | 高度<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | 未提供 | 最小高度<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | 未提供 | 最大高度<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | 未提供 | 尺寸<br>支持简写 |

Auto-fill grid — columns auto-wrap based on available width. A numeric `repeat` selects a fixed column count instead.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout.autogrid(width:10rem)']
    }
];
```

### `layout.gridpos`

<a id="entry-layout-gridpos"></a>

网格位置

为网格中的一个子项指定起始网格线及跨越数量。

将 left/top 映射为列/行起点，将 width/height 映射为列/行跨越数量。

加载框架样式表，并区分容器布局与子项位置设置。

应用于 layout.grid 或其他明确的 CSS 网格中的子项；只需指定跨越数量时，使用 gridsize。

父级必须采用网格布局。它不定位父级，也不创建轨道；需提供有意义的起点和跨越数量。

位置参数顺序: `left` → `top` → `width` → `height`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `left` | `numberOrString` | 左 |
| `top` | `numberOrString` | 上 |
| `width` | `numberOrString` | 列跨度 |
| `height` | `numberOrString` | 行跨度 |

Position a child within a parent grid.

### `layout.gridsize`

<a id="entry-layout-gridsize"></a>

网格跨度

指定子项跨越的行列数量，起始位置仍由网格放置规则决定。

根据 height 和 width 设置 grid-row-end 与 grid-column-end 的跨越数量。

加载框架样式表，并区分容器布局与子项位置设置。

应用于网格子项；还需明确起始网格线时，使用 gridpos。

没有网格父级时不会影响网格放置，也不创建轨道。

位置参数顺序: `width` → `height`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `width` | `numberOrString` | `1` | 列跨度 |
| `height` | `numberOrString` | `1` | 行跨度 |

Set grid child size via row/column span.

### `layout.flex`

<a id="entry-layout-flex"></a>

弹性

使用可灵活对齐和换行的行或列布局。

在弹性容器上组合 flex 与对齐参数。框架样式默认允许换行，除非被覆盖。

加载框架样式表，并区分容器布局与子项位置设置。

需要二维轨道关系时，使用 grid 或 autogrid。外壳区域及滚动仍由所选的页面或应用布局负责。

不创建子元素、语义角色或路由内容宿主。

位置参数顺序: `flex` → `wrap` → `direction` → `gap` → `alignSelf` → `alignItems` → `alignContent` → `justifySelf` → `justifyItems` → `justifyContent` → `align`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `flex` | `string` | 弹性<br>flex 属性是 flex-grow、flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto；后两个属性可省略。<br>支持简写<br>`{"cssKey":"flex"}` |
| `wrap` | `string` | 换行<br>flex-wrap 属性控制 flex 容器采用单行还是多行，以及多行的换行方式。<br>选项: `nowrap` — 不换行, `wrap` — 换行, `wrap-reverse` — 换行反转<br>`{"cssKey":"flexWrap"}` |
| `direction` | `string` | 方向<br>flex-direction 属性决定主轴方向，也就是项目的排列方向。<br>选项: `row` — 水平, `row-reverse` — 水平反转, `column` — 垂直, `column-reverse` — 垂直反转<br>`{"cssKey":"flexDirection"}` |
| `gap` | `string` | 间距<br>gap 属性设置弹性布局项目之间的间距。<br>`{"cssKey":"gap"}` |
| `alignSelf` | `string` | 自身交叉轴对齐<br>align-self 覆盖单个元素的 align-items 对齐设置。在 Grid 中，使元素在其网格区域内对齐；在 Flexbox 中，使元素沿交叉轴（垂直于 flex 排列方向的轴）对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"alignSelf"}` |
| `alignItems` | `string` | 子元素交叉轴对齐<br>align-items 为直接子元素统一设置默认的 align-self。在 Flexbox 中控制交叉轴对齐；在 Grid 中控制元素在各自网格区域内的块轴对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"alignItems"}` |
| `alignContent` | `string` | 内容空间分配（align-content）<br>align-content 沿 Flexbox 的交叉轴分配各行之间及周围的空间，或沿 Grid 的块轴分配各轨道之间及周围的空间。<br>选项: `flex-start` — 起始, `center` — 居中, `flex-end` — 结束, `space-between` — 两端间隔, `space-around` — 环绕间隔, `space-evenly` — 均匀间隔<br>`{"cssKey":"alignContent"}` |
| `justifySelf` | `string` | 自身主轴对齐<br>justify-self 设置单个盒子在布局容器中相应轴上的对齐方式。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"justifySelf"}` |
| `justifyItems` | `string` | 子元素主轴对齐<br>justify-items 为各元素设置默认的 justify-self，使元素沿相应轴在各自盒子内对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"justifyItems"}` |
| `justifyContent` | `string` | 主轴内容空间分配<br>justify-content 沿 Flex 容器的主轴或 Grid 容器的行轴，分配元素之间及周围的空间。<br>选项: `flex-start` — 起始, `center` — 居中, `flex-end` — 结束, `space-between` — 两端间隔, `space-around` — 环绕间隔, `space-evenly` — 均匀间隔<br>`{"cssKey":"justifyContent"}` |
| `align` | `string` | 对齐<br>align 是同时设置 align-items 和 align-content 的简写。<br>支持简写<br>选项: `left-top` — 左上, `center-top` — 中上, `right-top` — 右上, `left-middle` — 左中, `center-middle` — 居中, `right-middle` — 右中, `left-bottom` — 左下, `center-bottom` — 中下, `right-bottom` — 右下, `around-top` — 环绕间隔，上对齐, `around-middle` — 环绕间隔，中对齐, `around-bottom` — 环绕间隔，下对齐, `evenly-top` — 均匀间隔，上对齐, `evenly-middle` — 均匀间隔，中对齐, `evenly-bottom` — 均匀间隔，下对齐, `between-top` — 两端间隔，上对齐, `between-middle` — 两端间隔，中对齐, `between-bottom` — 两端间隔，下对齐 |

Flexbox container. Combines flex and align args.

Accepts all args from [flex](./flex.md) and [align](./align.md).

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layout.flex(direction:row;gap:1rem;alignItems:center)']
    }
];
```

### `layout.autoalign`

<a id="entry-layout-autoalign"></a>

自动对齐

将换行的子节点对齐到共同的网格轨道。

在尺寸变化时测量已渲染的行，计算共同的列跨度和可选的比例行轨道，然后调用函数形式的 afterAlign 回调。

需要可测量的原生子节点；希望采用确定的编写轨道时使用显式网格。

位置参数顺序: `afterAlign` → `scaledRows`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `afterAlign` | `functionOrString` | 未提供 | 对齐后<br>支持简写 |
| `scaledRows` | `boolean` | `true` | 缩放行 |

Measures wrapped rows and assigns shared grid tracks. Compose `layout.alignlabel` explicitly when field labels should align; use `layout.flex(direction:column)` for vertical stacking.

Use `afterAlign` for work that depends on completed alignment.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Form',
        styles: ['layout.autoalign', 'layout.alignlabel'],
        components: [
            { type: 'input', cap: 'Name' },
            { type: 'input', cap: 'Email' }
        ]
    }
];
```

### `layout.alignlabel`

<a id="entry-layout-alignlabel"></a>

对齐标签

将原生表单标签对齐到共同测量的宽度。

在尺寸变化时测量符合条件的子节点标签插槽，并写入最大标签宽度；跳过顶部标签和溢出的子节点。

使用提供标签插槽的原生子元素；测量需要已渲染的布局。

Aligns labels with form inputs for consistent left edges. Listens to `resize` events and adjusts label widths.

No args.

> **Form pattern:** For forms, use `layout.autoalign` + `layout.alignlabel` together on the form wrapper. `autoalign` measures wrapped rows and assigns shared grid tracks; `alignlabel` aligns their labels. Choose `layout.flex` with an explicit column direction when vertical stacking is the requirement.

### `layout.autoheight`

<a id="entry-layout-autoheight"></a>

自动高度

在调整尺寸的手势结束时，将可调整尺寸元素恢复为自动高度。

添加 jam-autoheight 属性。尺寸调整完成时，如果元素自身或其后代节点具有该属性，DamsonDragNDrop 会将被调整元素的内联 height 设置为 auto。

这是尺寸调整结束标记；它不会持续测量内容，也不控制标签位置。

Adds `jam-autoheight`. When a resize gesture ends, the native resize helper resets the resized element’s height to `auto` if the element or a descendant has this marker. It does not continuously measure content.

### `layout.takeupspace`

<a id="entry-layout-takeupspace"></a>

占用剩余空间

应用旧有的剩余空间布局标记。

添加 layout-takeupspace 类。

此入口不实现测量或布局逻辑。未发现使用此标记的专用原生处理；请选择显式布局或尺寸样式，或使用 label.atTop 放置标签，而不是依赖名称。

Adds the legacy `jam-layout-takeupspace` marker. It does not implement remaining-space sizing in this baseline; use explicit flex/grid sizing.

### `layout.odd`

<a id="entry-layout-odd"></a>

奇数

为布局中的奇数渲染位置着色。

将交替颜色变量应用到 jam-pos 标记符合所选奇偶性的后代节点。

需要由兼容的布局或分组样式提供渲染位置标记；此样式不会自行计算位置。

Styles descendants whose existing `jam-pos` markers contain `odd`. It does not create those render-position markers.

### `layout.even`

<a id="entry-layout-even"></a>

偶数

为布局中的偶数渲染位置着色。

将交替颜色变量应用到 jam-pos 标记符合所选奇偶性的后代节点。

需要由兼容的布局或分组样式提供渲染位置标记；此样式不会自行计算位置。

Styles descendants whose existing `jam-pos` markers contain `even`. It does not create those render-position markers.

### `layout.labelAtTop`

<a id="entry-layout-labelattop"></a>

标签顶部对齐

应用旧有的子标签位于内容上方标记。

添加 child-label-attop 类。

此入口不实现测量或布局逻辑。未发现使用此标记的专用原生处理；请选择显式布局或尺寸样式，或使用 label.atTop 放置标签，而不是依赖名称。

Adds the legacy `jam-child-label-attop` marker without a native positioning consumer in this baseline. Apply `label.atTop` to the actual native field elements.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Name',
        styles: ['label.atTop']
    }
];
```

### `layout.able`

<a id="entry-layout-able"></a>

组态化

将配置的仪表盘卡片放置在网格中。

读取 config.size 的列数和行数及 config.gap，然后在初始化和 childadded 时将配置的卡片坐标应用到具有匹配 id 的子节点。

需要包含 size 和 cards 的 config；每张卡片必须标识其子节点。

普通编写的布局优先使用 layout.grid 和显式子节点放置；此入口服务于可组合配置模型。

位置参数顺序: `config`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `config` | `any` | 组态化配置 |

Configurable card layout via a config object.

### `layout.overflow`

<a id="entry-layout-overflow"></a>

溢出与动画裁剪

选择溢出策略，并可在挂载时触发的入场动画期间裁剪内容。

真值 all 覆盖 x/y。animaDelay 为真值时，挂载添加 jam-no-overflow；冒泡的 animationend 事件重新启动防抖，仅在应用此样式时该标记原本不存在的情况下，才会在延迟后移除它。

通过 CSS 设置溢出；临时裁剪会隐藏宿主边界之外的内容。

宿主应接收预期的 mount 和 animationend 事件。样式附加到已挂载的宿主时，不会立即启用裁剪。

拆卸时移除已安装的监听器和插件数据，并仅在应用前不存在临时裁剪标记时移除该标记。应用前已存在的标记会被保留。已排队的防抖工作仍可能运行，但应用身份检查使其不会产生作用。

与确实会触发 animationend 的入场动画配合使用。指定 all 或分别指定两个轴的策略；x 和 y 默认均为 auto。

延迟从 animationend 之后开始，而不是从挂载开始。没有结束事件时裁剪可能持续存在；不筛除子孙元素的事件，也不处理 animationcancel。

位置参数顺序: `all` → `x` → `y` → `animaDelay`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `all` | `string` | 未提供 | 双轴（简写参数）<br>支持简写<br>选项: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `x` | `string` | `auto` | 水平溢出<br>选项: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `y` | `string` | `auto` | 垂直溢出<br>选项: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `animaDelay` | `number` | 未提供 | 动画裁剪延迟（毫秒）<br>延迟从 animationend 后开始。拆卸时移除监听器及此次应用添加的裁剪标记，保留原有标记，并使已排队的防抖不会产生作用，但不取消其计时器。 |

hosts: `HTMLElement`.

states: `mount`, `animationend`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-layout-overflow`

Overflow control with animation-aware delay.

`animaDelay` starts after a bubbling `animationend`, rather than measuring the animation from mount. Mount adds temporary clipping; each end event restarts the delay. Teardown removes its listeners and any clipping marker it introduced, preserves a pre-existing marker, and makes queued debounce work inert. Without an end event clipping can remain while the style is active.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout.overflow(hidden)', 'layout.overflow(animaDelay:400)']
    }
];
```

### `layout.keep.size`

<a id="entry-layout-keep-size"></a>

保持尺寸

在内容稳定后保持测量的尺寸不变。

等待 awaiter 或配置的延迟，然后在重绘前记录尺寸；移除时解除所记录的尺寸约束。

已知就绪条件时选择显式 awaiter。延迟回调没有取消保护，因此在其完成前移除样式仍可能应用尺寸锁定。

位置参数顺序: `delay` → `awaiter`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `delay` | `number` | `20` | 延迟 |
| `awaiter` | `promiseOrString` | 未提供 | 等待者 |

Persists element size across re-renders. Sub-variants:

-   **`layout.keep.height`** — persist height only
-   **`layout.keep.width`** — persist width only

No args.

### `layout.navigator`

<a id="entry-layout-navigator"></a>

导航

为现有按钮组导航条提供溢出时的替代呈现方式。

尺寸调整时检查垂直溢出，将第一个后代按钮组在行内位置与汉堡按钮触发的弹出层之间移动。

提供后代 jam-buttongroup，并约束宿主尺寸。导航需要单个选中值时，使用 buttongroup-radio。

另行将选中值绑定到路由或内容切换。此辅助方法只改变已提供按钮组的呈现方式，不创建路由。

实现假定按钮组已存在，并会移动该节点。它不提供完整的无障碍标签页约定，也不会从导航外观推断选择模式。

Responsive navigation helper. When a child `jam-buttongroup` overflows vertically, it moves the group into a popup opened by a burger button. When space returns, the group is restored inline.

No args.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layout.navigator', 'css(height:3rem;overflow:hidden)'],
        components: [
            {
                type: 'buttongroup-radio',
                data: [
                    { name: 'Overview', value: 'overview' },
                    { name: 'Reports', value: 'reports' },
                    { name: 'Settings', value: 'settings' }
                ]
            }
        ]
    }
];
```

### `layout.subgrid`

<a id="entry-layout-subgrid"></a>

子网格列表

将嵌套列表行对齐到共同的列网格。

将宿主设为网格；具有 CSS 类 jam-subgrid 的后代节点跨越 cols 个轨道，并通过 CSS subgrid 继承宿主列轨道。

为预期的嵌套行容器添加 CSS 类 jam-subgrid，并使用支持 CSS subgrid 的浏览器。

位置参数顺序: `cols`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `cols` | `number` | 列数<br>支持简写 |

Marks a container as a subgrid list and sets the number of subgrid columns.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layout.subgrid(3)'],
        components: [
            { type: 'label', cap: 'A' },
            { type: 'label', cap: 'B' },
            { type: 'label', cap: 'C' }
        ]
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'wrapper',
    cap: 'Form',
    styles: ['layout.autoalign', 'layout.alignlabel'],
    components: [
        { type: 'input', cap: 'Name', defaultValue: '' },
        { type: 'input', cap: 'Email', defaultValue: '' },
        { type: 'button-cta', cap: 'Submit' }
    ]
};
```

## `layout.page`

<a id="entry-layout-page"></a>

流式页面布局

用于内容主导、应随内容增长的文档页面。

添加 layout-page 类，形成相对定位的纵向弹性布局：宽度占满父级、高度自适应且溢出可见。

负责排列内容，不选择视觉主题，也不创建页面区域。

加载框架样式表并提供页面内容；宿主应参与文档流。

使用常规可撤销的类插件；没有观察器或自定义生命周期回调。

由调用方提供子元素。直接使用 jam-main-style 或 jam-layout-content 的子元素保持高度自适应与溢出可见；避免冲突的固定高度或裁剪规则。

不会填满视口、搭建应用外壳或指定内部滚动容器；这些由应用决定。

hosts: `HTMLElement`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-layout-page`

## `layout.lazyload`

<a id="entry-layout-lazyload"></a>

按视口延迟构建并保留子元素状态

在视口接近时构建纵向组件内容。

使用 LoquatLazyLoad 逐步构建尚未显示的子节点，以测量的占位空间暂存离屏已渲染 DOM，并保留已访问的组件状态。

需要组件拥有的容器，以及为宿主或其祖先的滚动目标。一个容器只能由一个子节点渲染样式拥有。

适用于可变高度内容：在有界滚动目标中使用自然高度的行容器。通过组件所有者前插或追加；removeComponent 会销毁被移出的行，停放则保留行。固定高度规则网格使用 grid.virtualScroll。

延迟渲染而非数据请求；保留的子项仍占用内存。普通前缀模式下，未访问内容向后构建，插入已访问前缀的行会同步挂载，因此前插分页应保持有界。语义恢复需要补齐历史分页时，使用已验证的 prepareScrollPosition 加载阶段，在发布分页前暂缓延迟行的构建；数据请求仍由应用负责。停放保留订阅，但隐藏的流式或交互行在恢复前沿用上次测量的占位高度。焦点和选区可阻止停放，没有活动流固定选项。保持活动流可测量，或明确接受延迟测量。修正后的开发版运行时会在相邻行构建或变高时保留已测量可见行的位置，并计入已观察到的用户滚动；依赖双向补偿前需确认已使用更新的运行时。锚点保留行顶位置，不保证变化行内部的文本位置，滚动条比例仍可能改变。输入与内容缩短导致的边界钳制在同次观测中合并时可能无法区分。分页、稳定标识、数据窗口移除和最终语义位置恢复仍由应用负责，不要叠加独立滚动恢复所有者。

位置参数顺序: `buffer` → `scrollTarget`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `buffer` | `number` | `400` | 视口外预加载距离(px) |
| `scrollTarget` | `string` | 未提供 | 滚动目标 |

## `layout.application`

<a id="entry-layout-application"></a>

有界应用布局

用于含调用方提供的区域和明确滚动主体的有界工作区外壳。

添加网格外壳，以及视口、框架与滚动模式对应的类。content 使指定的主内容区域滚动；regions 隐藏该区域的溢出，由调用方提供内部滚动容器。

默认网格预留侧边栏、页眉、内容和页脚区域；frame 切换为行布局，并在框架区域使用列布局。

viewport 不为 true 时，父级需有受约束的高度；加载框架样式表，并提供带预期角色类的子元素。

使用可撤销的类插件；不会创建、销毁或观察区域。

直接子元素使用 jam-sidebar-style、jam-header-style、jam-main-style 或 jam-layout-content，以及 jam-footer-style。frame 为 true 时，将页眉、主体、页脚放入 jam-frame-style。regions 模式下，需明确设置内部区域尺寸并启用滚动。

不会推断区域、创建子元素，也不会自动让各区域滚动。标签页或导航构建器与应用路由由其他部分负责。

位置参数顺序: `viewport` → `scroll` → `frame`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `viewport` | `boolean` | `false` | 占满视口 |
| `scroll` | `string` | `content` | 滚动区域策略<br>选项: `content` — 内容滚动, `regions` — 区域独立滚动 |
| `frame` | `boolean` | `false` | 使用内容框架 |

hosts: `HTMLElement`.

开发示例需在提供对应场景的匹配版本 Playground 中打开：

- `#/testground?jaml=intent-layout-application`

## `layout.keep.width`

<a id="entry-layout-keep-width"></a>

保持宽度

在内容稳定后保持测量的宽度不变。

等待 awaiter 或配置的延迟，然后在重绘前记录宽度；移除时解除所记录的尺寸约束。

已知就绪条件时选择显式 awaiter。延迟回调没有取消保护，因此在其完成前移除样式仍可能应用尺寸锁定。

位置参数顺序: `delay` → `awaiter`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `delay` | `number` | `20` | 延迟 |
| `awaiter` | `promiseOrString` | 未提供 | 等待者 |

## `layout.keep.height`

<a id="entry-layout-keep-height"></a>

保持高度

在内容稳定后保持测量的高度不变。

等待 awaiter 或配置的延迟，然后在重绘前记录高度；移除时解除所记录的尺寸约束。

已知就绪条件时选择显式 awaiter。延迟回调没有取消保护，因此在其完成前移除样式仍可能应用尺寸锁定。

位置参数顺序: `delay` → `awaiter`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `delay` | `number` | `20` | 延迟 |
| `awaiter` | `promiseOrString` | 未提供 | 等待者 |
