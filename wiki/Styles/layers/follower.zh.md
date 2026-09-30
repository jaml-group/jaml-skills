# layer.follower

<!-- Generated from native authoring; do not edit. -->

[English](follower.md)

加载框架图层样式，并为宿主提供可用的几何尺寸。需要跟踪指针时，需明确启用 follow。

光晕选择 spotlight，发光边缘选择 edge，偏移阴影选择 shadow。装饰需固定在宿主上时，使用 layer.crosshair。

移动由文档鼠标事件驱动，不依赖选择状态，也不提供完整的触摸或键盘交互。边界限制、裁剪和堆叠会影响可见效果。

`Styles.layer.follower.*` provides decorative layers with optional pointer following. Enable `follow: true` for pointer tracking; read the entry below for behavior and limitations. Compare [selection, hover and host decoration](../../choosing-native-capabilities.md#selection-and-hover) before choosing this family.

---

## Common args

<a id="common-args-layer-follower-spotlight"></a>

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `zIndex` | `number` | `0` | 层级 |
| `dropShadow` | `boolean` | `false` | 投影 |
| `boxShadow` | `string` | 未提供 | 阴影 |
| `mask` | `string` | 未提供 | 遮罩 |
| `filter` | `string` | 未提供 | 滤镜 |
| `padding` | `string` | 未提供 | 内边距 |
| `borderRadius` | `string` | 未提供 | 圆角 |
| `transform` | `string` | 未提供 | 变换 |
| `border` | `string` | 未提供 | 边框 |
| `clipPath` | `string` | 未提供 | 裁剪 |
| `animation` | `string` | 未提供 | 动画 |
| `opacity` | `number` | `0.25` | 透明度<br>编辑提示（非运行时限制）: `{"step":0.1}` |
| `css` | `dictionaryOrString` | 未提供 | CSS |
| `depth` | `number` | 未提供 | 透视层深 |
| `class` | `string` | 未提供 | 类 |
| `attrs` | `dictionary` | 未提供 | 属性 |
| `rotateX` | `number` | 未提供 | X轴旋转 |
| `rotateY` | `number` | 未提供 | Y轴旋转 |
| `translateY` | `numberOrString` | 未提供 | Y轴位移 |
| `slot` | `string` | 未提供 | 插槽 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` | 入场动画 |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` | 出场动画 |
| `contain` | `boolean` | `false` | 限制在容器内 |
| `offset` | `numberOrString` | `0` | 偏移<br>Unit: `rem` |
| `size` | `numberOrString` | `20` | 大小<br>Unit: `rem` |
| `duration` | `numberOrString` | `0` | 动画时长<br>Unit: `ms` |
| `reverse` | `boolean` | `false` | 反向 |
| `speed` | `number` | `1` | 速度倍数 |
| `follow` | `boolean` | `false` | 跟随 |
| `position` | `string` | `top-left` | 位置 |

All follower variants share these base args:

---

## Variants

### `follower.spotlight`

<a id="entry-layer-follower-spotlight"></a>

探照灯

可用聚光光晕提供装饰性的指针反馈。

创建装饰图层。仅当 follow 为 true 时，指针移动才会更新图层；否则继续使用配置的位置。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position`.

公共参数: [layer.follower.spotlight](#common-args-layer-follower-spotlight).

A spotlight/glow effect that follows the cursor inside the host.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Spotlight',
        styles: ['layer.follower.spotlight(follow:true;size:30)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `follower.edge`

<a id="entry-layer-follower-edge"></a>

发光边缘

可用发光边缘提供装饰性的指针反馈。

创建装饰图层。仅当 follow 为 true 时，指针移动才会更新图层；否则继续使用配置的位置。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position` → `width` → `radius`.

公共参数: [layer.follower.spotlight](#common-args-layer-follower-spotlight).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `opacity` | `number` | 未提供 | 透明度<br>编辑提示（非运行时限制）: `{"step":0.1}` |
| `size` | `numberOrString` | `50%` | 大小<br>Unit: `rem` |
| `width` | `numberOrString` | `0.25` | 宽度<br>Unit: `rem` |
| `radius` | `numberOrString` | `0.25` | 圆角<br>Unit: `rem` |

A glowing edge/rim effect that follows the cursor. The inner element fills a percentage of the host.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Golden Edge',
        styles: ['layer.follower.edge(follow:true)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `follower.shadow`

<a id="entry-layer-follower-shadow"></a>

阴影

可用响应光标的阴影提供装饰性的指针反馈。

创建装饰图层。仅当 follow 为 true 时，指针移动才会更新图层；否则继续使用配置的位置。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `contain` → `offset` → `size` → `duration` → `reverse` → `speed` → `follow` → `position` → `color` → `offsetX` → `offsetY` → `blur`.

公共参数: [layer.follower.spotlight](#common-args-layer-follower-spotlight).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `zIndex` | `number` | `-1` | 层级 |
| `opacity` | `number` | 未提供 | 透明度<br>编辑提示（非运行时限制）: `{"step":0.1}` |
| `reverse` | `boolean` | `true` | 反向 |
| `speed` | `number` | `0.05` | 速度倍数 |
| `color` | `string` | `hsla(0, 0%, 0%, 0.2)` | 颜色 |
| `offsetX` | `numberOrString` | `0` | X 偏移<br>Unit: `rem` |
| `offsetY` | `numberOrString` | `0.5` | Y 偏移<br>Unit: `rem` |
| `blur` | `numberOrString` | `2` | 模糊<br>Unit: `px` |

A cursor-reactive shadow that shifts opposite to the cursor direction.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Shadow',
        styles: ['layer.follower.shadow(follow:true)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```
