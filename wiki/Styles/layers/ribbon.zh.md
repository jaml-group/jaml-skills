# layer.ribbon

<!-- Generated from native authoring; do not edit. -->

[English](ribbon.md)

`Styles.layer.ribbon.*` — corner ribbon decorations and tooltip triggers.

---

## Variants

### `ribbon`

<a id="entry-layer-ribbon"></a>

带角标

在宿主角落附加小型内容装饰。

创建 ribbon 图层，其 content 可以是 Node、类似 HTML 的内容或回调结果；top、right 和 radius 将其放置在右上角附近。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

使用 content 指定装饰内容；使用 layer.ribbon.bookmark 添加裁剪的书签背景，或使用 layer.ribbon.tiptrigger 添加信息标记。

这是附加装饰，不是布局区域。确保宿主的 overflow 允许显示超出其边界的部分。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `top` → `right` → `radius`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `functionOrAny` | `<jam-indicator styles="indicator.jaml">JAML®</jam-indicator>` | 内容 |
| `top` | `numberOrString` | 未提供 | 顶部 |
| `right` | `numberOrString` | 未提供 | 右侧 |
| `radius` | `numberOrString` | 未提供 | 圆角 |

Corner ribbon element. Displays a ribbon with content in the corner of an element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Featured',
        styles: ['layer.ribbon(content:NEW;radius:0.5rem;top:0.5rem)']
    }
];
```

### `ribbon.tiptrigger`

<a id="entry-layer-ribbon-tiptrigger"></a>

tip触发器

jam-tip插件使用的触发器

在宿主角落附加紧凑的信息提示触发器。

创建信息标记 ribbon，并将 tip 文本写入其 jam-tip 属性，供框架提示处理使用。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

配合框架提示设施和简短的 tip 文本使用；此样式设置触发器属性，不自行创建提示内容。

这是附加装饰，不是布局区域。确保宿主的 overflow 允许显示超出其边界的部分。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `top` → `right` → `radius` → `tip`.

公共参数: [layer.ribbon](#entry-layer-ribbon).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `content` | `functionOrAny` | `<div class="jam-layer-tiptrigger-i">i</div>` | 内容 |
| `tip` | `string` | `` | 提示信息 |

Ribbon used as a tooltip trigger (used by the `jam-tip` plugin). Same args as `ribbon` plus a `tip` property.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Hover for info',
        styles: ['layer.ribbon.tiptrigger(tip:This is a helpful tip;radius:0.5rem)']
    }
];
```

### `ribbon.bookmark`

<a id="entry-layer-ribbon-bookmark"></a>

书签

为宿主附加书签形装饰。

添加可配置的书签轮廓：fishtail、pendant、slanted 或 flat。默认入场从上方滑入，退场则反向运动。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

使用 style 和 size 设置书签形状，使用 content 设置标签或图标。需要缎带形表面时使用 layer.background.ribbon。

这是附加装饰，不是布局区域。确保宿主的 overflow 允许显示超出其边界的部分。

位置参数顺序: `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `top` → `right` → `radius` → `style` → `indent` → `background`.

公共参数: [layer.ribbon](#entry-layer-ribbon).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `width` | `string` | 未提供 | 宽度<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | 未提供 | 最小宽度<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | 未提供 | 最大宽度<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | 未提供 | 高度<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | 未提供 | 最小高度<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | 未提供 | 最大高度<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | 未提供 | 尺寸<br>支持简写 |
| `content` | `functionOrAny` | 未提供 | 内容 |
| `entryAnimation` | `string` | `jam-from-top 250ms 400ms cubic-bezier(0.5,0.5,0.55,1.68) both` | 入场动画 |
| `exitAnimation` | `string` | `jam-from-top 200ms ease-in reverse both` | 出场动画 |
| `style` | `string` | `fishtail` | 位置<br>支持简写<br>选项: `fishtail`, `pendant`, `flat`, `slanted` |
| `indent` | `numberOrString` | 未提供 | 切口深度<br>Unit: `rem` |
| `background` | `string` | `var(--jam-ac-color) linear-gradient(to bottom, hsla(0,0%,100%,0.15), hsla(0,0%,0%,0.2))` | 背景 |

Bookmark-shaped ribbon with configurable style. Supports fishtail, pendant, flat, and slanted shapes.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Fishtail',
        styles: ['layer.ribbon.bookmark(style:fishtail;content:HOT;indent:20%)']
    },
    {
        type: 'card',
        cap: 'Slanted',
        styles: ['layer.ribbon.bookmark(style:slanted;content:SALE;background:gold)']
    },
    {
        type: 'card',
        cap: 'Pendant',
        styles: ['layer.ribbon.bookmark(style:pendant;content:TOP;indent:25%)']
    }
];
```
