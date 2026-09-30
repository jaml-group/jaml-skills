# hover

<!-- Generated from native authoring; do not edit. -->

[English](hover.md)

<a id="entry-hover"></a>

悬停样式

为样式路径选中的目标应用 hover 状态的 CSS。

使用以 :hover 结尾的规则选择器；只改变外观，不使目标进入该状态。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `padding` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `border` → `borderRadius` → `opacity` → `overflow` → `transform` → `transition` → `whiteSpace` → `zIndex` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText` → `state`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `display` | `string` | 应用样式的目标的 CSS display 模式，例如 block、flex、grid 或 none。 |
| `position` | `string` | 应用样式的目标的 CSS 定位模式，例如 relative、absolute、fixed 或 sticky。 |
| `width` | `string` | 应用样式的目标的 CSS 宽度；使用 CSS 长度、百分比或受支持的尺寸关键字。 |
| `height` | `string` | 应用样式的目标的 CSS 高度；使用 CSS 长度、百分比或受支持的尺寸关键字。 |
| `minWidth` | `string` | 应用样式的目标的 CSS 最小宽度约束。 |
| `minHeight` | `string` | 应用样式的目标的 CSS 最小高度约束。 |
| `maxWidth` | `string` | 应用样式的目标的 CSS 最大宽度约束。 |
| `maxHeight` | `string` | 应用样式的目标的 CSS 最大高度约束。 |
| `padding` | `string` | CSS 内边距简写，接受一至四个边的值。 |
| `paddingTop` | `string` | 顶部边缘的 CSS 内边距。 |
| `paddingRight` | `string` | 右侧边缘的 CSS 内边距。 |
| `paddingBottom` | `string` | 底部边缘的 CSS 内边距。 |
| `paddingLeft` | `string` | 左侧边缘的 CSS 内边距。 |
| `margin` | `string` | CSS 外边距简写，接受一至四个边的值。 |
| `marginTop` | `string` | 顶部边缘的 CSS 外边距。 |
| `marginRight` | `string` | 右侧边缘的 CSS 外边距。 |
| `marginBottom` | `string` | 底部边缘的 CSS 外边距。 |
| `marginLeft` | `string` | 左侧边缘的 CSS 外边距。 |
| `gap` | `string` | 网格或 flex 项之间的 CSS 间距；一个值设置两个轴，两个值依次设置行间距和列间距。 |
| `color` | `string` | 应用样式的目标的 CSS 前景颜色；使用颜色值或受支持的前景令牌。 |
| `background` | `string` | 应用样式的目标的 CSS 背景简写，包括受支持的填充令牌或显式图像和颜色。 |
| `backgroundColor` | `string` | 应用样式的目标的 CSS 背景颜色；使用颜色值或受支持的填充令牌。 |
| `border` | `string` | CSS 边框宽度、样式和颜色的简写；受支持的边框令牌根据属性上下文解析。 |
| `borderRadius` | `string` | 应用样式的目标的 CSS 圆角；接受受支持的圆角令牌或 CSS 圆角值。 |
| `opacity` | `string` | 应用样式的目标及其已渲染内容的 CSS 不透明度，范围从透明到不透明。 |
| `overflow` | `string` | 应用样式的目标之外的内容的 CSS 溢出行为；使用一个值，或分别指定水平和垂直值。 |
| `transform` | `string` | 应用于目标的 CSS transform，例如 translate、rotate 或 scale。 |
| `transition` | `string` | 描述属性、持续时间、时间函数和延迟的 CSS transition 简写。 |
| `whiteSpace` | `string` | 应用样式的目标内的 CSS 空白和换行处理。 |
| `zIndex` | `string` | 应用样式的目标的 CSS 堆叠顺序，受其堆叠上下文约束。 |
| `setProperty` | `string` | 来自样式声明方法的兼容入口 setProperty。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `removeProperty` | `string` | 来自样式声明方法的兼容入口 removeProperty。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `getPropertyValue` | `string` | 来自样式声明方法的兼容入口 getPropertyValue。它不是 CSS 声明或可调用的 JAML 操作；不要将其作为样式参数传入。 |
| `selector` | `string` | 选择器<br>默认根据样式路径自动创建。 |
| `method` | `string` | 应用方式<br>默认根据样式路径自动选择。<br>选项: `vars` — vars — 变量 — valueOrigin: `name`, `rule` — rule — 规则 — valueOrigin: `name`, `props` — props — 属性 — valueOrigin: `name` |
| `direct` | `boolean` | 仅作用于直接孩子<br>子元素选择器默认匹配直接子元素；有效 direct 值为 false 时，匹配所有后代元素。 |
| `cssText` | `functionOrString` | CSS 内容<br>可以是字符串，也可以是返回字典或字符串的函数。<br>支持简写 |
| `state` | `string` | 状态<br>选项: `hover` — 悬停, `active` — 激活, `focus` — 聚焦, `disabled` — 禁用, `visited` — 已访问, `checked` — 选中, `indeterminate` — 不确定状态, `before` — before 伪元素, `after` — after 伪元素 |

`Styles.hover.*` — hover-triggered visual effects applied to any element.

---

## Common arguments

<a id="common-args-hover-frame"></a>

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `number` | 未提供 | 大小 |
| `width` | `numberOrString` | `3` | 边框宽度 |
| `bias` | `number` | `0` | 边框距离 |
| `glow` | `number` | `5` | 发光 |
| `radius` | `numberOrString` | `auto` | 圆角半径<br>auto：自动适配元素；数值表示半径，单位为 px。 |
| `delay` | `number` | `0` | 延迟 |
| `breathe` | `boolean` | `false` | 呼吸 |
| `container` | `any` | 未提供 | 容器 |
| `clipTarget` | `any` | 未提供 | 裁剪目标 |
| `easing` | `string` | 未提供 | 动画缓动 |
| `duration` | `number` | 未提供 | 动画时长 |

## Variants

### `hover.frame`

<a id="entry-hover-frame"></a>

框

用边框突出显示悬停元素，不改变选择状态。

将宿主标记为定位目标，并在连接就绪后为父级安装悬停处理。共享的定位标记会跟随当前悬停的已标记元素；该目标触发 mouseleave 或 unmount 时隐藏。

提供已连接且有父级的宿主，并加载框架定位标记样式。

持续显示选择状态时使用 check 样式；固定在宿主上的呼吸装饰使用 layer.crosshair。悬停定位标记只跟随当前悬停目标。

定位标记由各次调用共享，不要假定多个标记能独立同时显示，或各宿主的选项设置互不影响。悬停反馈不提供选择状态、键盘激活或焦点语义。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

公共参数: [hover.frame](#common-args-hover-frame).

Shows a frame locator around the element on mouseenter. The locator matches the target's border-radius and can glow, breathe, or animate with custom easing.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.frame(glow:10;breathe:true;easing:bouncing)'],
        components: [{ type: 'label', cap: 'Hover for frame' }]
    },
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.frame(glow:0;width:3;radius:12)'],
        components: [{ type: 'label', cap: 'Sharp frame, no glow' }]
    }
];
```

### `hover.shade`

<a id="entry-hover-shade"></a>

阴影

用背景底色突出显示悬停元素，不改变选择状态。

将宿主标记为定位目标，并在连接就绪后为父级安装悬停处理。共享的定位标记会跟随当前悬停的已标记元素；该目标触发 mouseleave 或 unmount 时隐藏。

提供已连接且有父级的宿主，并加载框架定位标记样式。

持续显示选择状态时使用 check 样式；固定在宿主上的呼吸装饰使用 layer.crosshair。悬停定位标记只跟随当前悬停目标。

定位标记由各次调用共享，不要假定多个标记能独立同时显示，或各宿主的选项设置互不影响。悬停反馈不提供选择状态、键盘激活或焦点语义。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

公共参数: [hover.frame](#common-args-hover-frame).

Shows a shaded locator behind the element on mouseenter. Same args as `frame`.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.shade(glow:8)'],
        components: [{ type: 'label', cap: 'Hover for shade' }]
    }
];
```

### `hover.crosshair`

<a id="entry-hover-crosshair"></a>

准心

用角框突出显示悬停元素，不改变选择状态。

将宿主标记为定位目标，并在连接就绪后为父级安装悬停处理。共享的定位标记会跟随当前悬停的已标记元素；该目标触发 mouseleave 或 unmount 时隐藏。

提供已连接且有父级的宿主，并加载框架定位标记样式。

持续显示选择状态时使用 check 样式；固定在宿主上的呼吸装饰使用 layer.crosshair。悬停定位标记只跟随当前悬停目标。

定位标记由各次调用共享，不要假定多个标记能独立同时显示，或各宿主的选项设置互不影响。悬停反馈不提供选择状态、键盘激活或焦点语义。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

公共参数: [hover.frame](#common-args-hover-frame).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `breathe` | `boolean` | `true` | 呼吸 |
| `easing` | `string` | `ease-in-out` | 动画缓动 |

Shows a crosshair corner-bracket locator on mouseenter. Same args as `frame` with `breathe` default `true`, `easing` default `'ease-in-out'`.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.crosshair(glow:6;duration:300)'],
        components: [{ type: 'label', cap: 'Hover for crosshair' }]
    }
];
```

### `hover.parallax`

<a id="entry-hover-parallax"></a>

视差

为宿主添加由指针驱动的纵深效果。

连接完成后将悬停变换交给 PineappleParallax，拔除时移除其悬停效果。

这是装饰性的指针效果，不是相机导航；平移和缩放内容可使用 interact.panNZoom。

位置参数顺序: `intensity` → `maxDepth` → `inward` → `pan` → `startAngles`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `intensity` | `number` | `3` | 强度 |
| `maxDepth` | `number` | `3` | 最大深度 |
| `inward` | `boolean` | `false` | 内向 |
| `pan` | `boolean` | `false` | 平移 |
| `startAngles` | `array` | 未提供 | 起始角度 |

3D parallax tilt effect on mouse move. Add `pp-depth` attributes to children to control depth layers.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Tilt me',
        styles: ['hover.parallax(intensity:5;maxDepth:5)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Inward tilt',
        styles: ['hover.parallax(inward:true;pan:true)', 'css(padding:2rem)']
    }
];
```

### `hover.dynamicbg`

<a id="entry-hover-dynamicbg"></a>

动态背景

添加会移动的悬停背景效果。

添加由悬停样式表使用的 hover-dynamicbg 类。

Shows an animated dynamic background on hover. No args.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.dynamicbg'],
        components: [{ type: 'label', cap: 'Hover for animated bg' }]
    }
];
```

### `hover.withbg`

<a id="entry-hover-withbg"></a>

背景

使用原生表面效果添加悬停背景。

添加 hover-withbg 类，由角色或强调色样式表选择悬停表面。

Shows a solid background on hover. No args.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.withbg'],
        components: [{ type: 'label', cap: 'Hover for bg' }]
    }
];
```

### `hover.highlightcap`

<a id="entry-hover-highlightcap"></a>

高亮标题

在宿主被悬停时突出显示标题。

为非按钮元素准备 cap 图层，并调整或恢复 cap 样式；按钮宿主使用已有的呈现方式。

需要已有的 cap 插槽。

拔除时移除所拥有的图层，并恢复保存的标题样式。

Highlights the `cap` slot text on hover by inserting a background layer behind it. Does not apply to `BananaButton` elements. No args.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Hover to highlight me',
        styles: ['hover.highlightcap', 'css(padding:0.5rem)']
    }
];
```

### `hover.brighter`

<a id="entry-hover-brighter"></a>

变亮

在悬停时提高亮度和饱和度。

添加 hover-brighter 类，并将 b 和 s 暴露为效果变量。

可作为装饰性的指针反馈，与另行定义的操作配合使用。

位置参数顺序: `b` → `s`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `b` | `number` | `1.04` | 亮度 |
| `s` | `number` | `1.1` | 饱和度 |

Brightness and saturation boost on hover.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Brighten on hover',
        styles: ['hover.brighter(b:1.15;s:1.3)']
    },
    {
        type: 'button',
        cap: 'Subtle brighten',
        styles: ['hover.brighter']
    }
];
```

### `hover.toShowAll`

<a id="entry-hover-toshowall"></a>

显示全部

指针悬停时显示被裁剪的文本。

检测选定目标是否溢出，将其文本及部分样式复制到位于 body 下的 label，并在鼠标离开时移除该 label。

弹出内容是文本，不是控件的实时副本；必要内容还需提供键盘可访问的呈现方式。

位置参数顺序: `selector` → `align`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `selector` | `string` | 未提供 | 选择器 |
| `align` | `string` | `center` | 对齐<br>选项: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `top`, `bottom`, `left`, `center`, `right` |

Shows a floating label clone of truncated text on hover. Useful for table cells or labels with `overflow: hidden` / `text-overflow: ellipsis`.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'This is a very long text that will be truncated due to overflow hidden style',
        styles: ['hover.toShowAll(align:top)', 'css(width:10rem;overflow:hidden;textOverflow:ellipsis;whiteSpace:nowrap)']
    }
];
```

### `hover.bouncing`

<a id="entry-hover-bouncing"></a>

弹跳

添加悬停弹跳反馈。

添加 hover-bouncing 类；不安装点击处理器。

Bounce animation on hover. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Bounce on hover',
        styles: ['hover.bouncing']
    }
];
```

---

## Combo example

Combine `hover.parallax` with `interact.movable` for an interactive card:

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['props(width:30rem)', 'interact.movable', 'hover.parallax'],
        components: [
            {
                type: 'indicator',
                cap: 'Movable parallax card',
                styles: ['indicator.tips', 'auto.badge']
            }
        ]
    }
];
```
