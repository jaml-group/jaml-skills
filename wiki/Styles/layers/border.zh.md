# layer.border

<!-- Generated from native authoring; do not edit. -->

[English](border.md)

`Styles.layer.border` — border layer with common border options.

Wraps `common/border` options in a layer context. Supports per-side width, style, color, border-radius per corner, and border-image properties.

---

## Args

<a id="entry-layer-border"></a>

边框

绘制独立样式的边框，避免将宿主边框用作装饰。

在铺满宿主且不接收指针事件的子图层上写入所配置的 CSS 边框属性。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

需要可见轮廓时设置边框样式和宽度；仅指定宽度或颜色可能使 CSS 边框不可见。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `width` → `topWidth` → `rightWidth` → `bottomWidth` → `leftWidth` → `style` → `topStyle` → `rightStyle` → `bottomStyle` → `leftStyle` → `radius` → `topLeftRadius` → `topRightRadius` → `bottomRightRadius` → `bottomLeftRadius` → `color` → `topColor` → `rightColor` → `bottomColor` → `leftColor` → `image` → `imageSource` → `imageSlice` → `imageWidth` → `imageOutset` → `imageRepeat`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `border` | `string` | 边框<br>支持简写<br>`{"cssKey":"border"}` |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `width` | `string` | 边框宽度<br>`{"cssKey":"borderWidth"}` |
| `topWidth` | `string` | 上边框宽度<br>`{"cssKey":"borderTopWidth"}` |
| `rightWidth` | `string` | 右边框宽度<br>`{"cssKey":"borderRightWidth"}` |
| `bottomWidth` | `string` | 下边框宽度<br>`{"cssKey":"borderBottomWidth"}` |
| `leftWidth` | `string` | 左边框宽度<br>`{"cssKey":"borderLeftWidth"}` |
| `style` | `string` | 边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderStyle"}` |
| `topStyle` | `string` | 上边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderTopStyle"}` |
| `rightStyle` | `string` | 右边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderRightStyle"}` |
| `bottomStyle` | `string` | 下边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderBottomStyle"}` |
| `leftStyle` | `string` | 左边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderLeftStyle"}` |
| `radius` | `string` | 圆角半径<br>`{"cssKey":"borderRadius"}` |
| `topLeftRadius` | `string` | 左上角半径<br>`{"cssKey":"borderTopLeftRadius"}` |
| `topRightRadius` | `string` | 右上角半径<br>`{"cssKey":"borderTopRightRadius"}` |
| `bottomRightRadius` | `string` | 右下角半径<br>`{"cssKey":"borderBottomRightRadius"}` |
| `bottomLeftRadius` | `string` | 左下角半径<br>`{"cssKey":"borderBottomLeftRadius"}` |
| `color` | `string` | 边框颜色<br>`{"cssKey":"borderColor"}` |
| `topColor` | `string` | 上边框颜色<br>`{"cssKey":"borderTopColor"}` |
| `rightColor` | `string` | 右边框颜色<br>`{"cssKey":"borderRightColor"}` |
| `bottomColor` | `string` | 下边框颜色<br>`{"cssKey":"borderBottomColor"}` |
| `leftColor` | `string` | 左边框颜色<br>`{"cssKey":"borderLeftColor"}` |
| `image` | `string` | 边框图片 |
| `imageSource` | `string` | 图片源<br>`{"cssKey":"borderImageSource"}` |
| `imageSlice` | `string` | 图片切片<br>`{"cssKey":"borderImageSlice"}` |
| `imageWidth` | `string` | 图片宽度<br>`{"cssKey":"borderImageWidth"}` |
| `imageOutset` | `string` | 图片外延<br>`{"cssKey":"borderImageOutset"}` |
| `imageRepeat` | `string` | 图片重复<br>`{"cssKey":"borderImageRepeat"}` |

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.border(width:0.125rem;color:var(--jam-ac-color);style:solid)'],
        components: [{ type: 'label', cap: 'Accent border' }]
    },
    {
        type: 'card',
        styles: ['layer.border(width:2px;style:dashed;color:gray;radius:0.5rem)'],
        components: [{ type: 'label', cap: 'Dashed rounded' }]
    },
    {
        type: 'card',
        styles: ['layer.border(topWidth:3px;topColor:red;bottomWidth:3px;bottomColor:blue)'],
        components: [{ type: 'label', cap: 'Top & bottom only' }]
    }
];
```

## `layer.border.l`

<a id="entry-layer-border-l"></a>

大

对独立边框图层使用 l 主题宽度。

仅根据 l 宽度令牌写入 border-width；不指定边框样式或颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

仅宽度处理需要在同一图层上设置边框样式才能可见；单独应用 layer.border 样式会创建另一个子节点。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.m`

<a id="entry-layer-border-m"></a>

中等

对独立边框图层使用 m 主题宽度。

仅根据 m 宽度令牌写入 border-width；不指定边框样式或颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

仅宽度处理需要在同一图层上设置边框样式才能可见；单独应用 layer.border 样式会创建另一个子节点。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.s`

<a id="entry-layer-border-s"></a>

小

对独立边框图层使用 s 主题宽度。

仅根据 s 宽度令牌写入 border-width；不指定边框样式或颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

仅宽度处理需要在同一图层上设置边框样式才能可见；单独应用 layer.border 样式会创建另一个子节点。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.xl`

<a id="entry-layer-border-xl"></a>

极大

对独立边框图层使用 xl 主题宽度。

仅根据 xl 宽度令牌写入 border-width；不指定边框样式或颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

仅宽度处理需要在同一图层上设置边框样式才能可见；单独应用 layer.border 样式会创建另一个子节点。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.xs`

<a id="entry-layer-border-xs"></a>

极小

对独立边框图层使用 xs 主题宽度。

仅根据 xs 宽度令牌写入 border-width；不指定边框样式或颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

仅宽度处理需要在同一图层上设置边框样式才能可见；单独应用 layer.border 样式会创建另一个子节点。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.faint`

<a id="entry-layer-border-faint"></a>

小

在独立图层上绘制浅淡的主题轮廓。

使用浅淡轮廓颜色令牌和特小宽度设置完整的实线边框。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

此预设同时提供边框样式和颜色；它不等同于具有相同描述的仅宽度预设。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.lower`

<a id="entry-layer-border-lower"></a>

较低

使用 lower 主题角色绘制独立轮廓。

使用 lower 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.muted`

<a id="entry-layer-border-muted"></a>

小

在独立图层上绘制柔和的主题轮廓。

使用柔和轮廓颜色令牌和特小宽度设置完整的实线边框。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

此预设同时提供边框样式和颜色；它不等同于具有相同描述的仅宽度预设。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.higher`

<a id="entry-layer-border-higher"></a>

较高

使用 higher 主题角色绘制独立轮廓。

使用 higher 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.lowest`

<a id="entry-layer-border-lowest"></a>

最低

使用 lowest 主题角色绘制独立轮廓。

使用 lowest 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.subtle`

<a id="entry-layer-border-subtle"></a>

极小

在独立图层上绘制轻微的主题轮廓。

使用轻微轮廓颜色令牌和特小宽度设置完整的实线边框。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

此预设同时提供边框样式和颜色；它不等同于具有相同描述的仅宽度预设。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.default`

<a id="entry-layer-border-default"></a>

中等

在独立图层上绘制默认主题轮廓。

使用默认表面颜色令牌和特小宽度设置完整的实线边框。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

此预设同时提供边框样式和颜色；它不等同于具有相同描述的仅宽度预设。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.highest`

<a id="entry-layer-border-highest"></a>

最高

使用 highest 主题角色绘制独立轮廓。

使用 highest 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.primary`

<a id="entry-layer-border-primary"></a>

主色

使用 primary-subtle 主题角色绘制独立轮廓。

使用 primary-subtle 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.tertiary`

<a id="entry-layer-border-tertiary"></a>

第三色

使用 tertiary-subtle 主题角色绘制独立轮廓。

使用 tertiary-subtle 颜色令牌和特小 border-width 令牌设置完整的实线边框。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

这是轮廓，不是背景填充。它使用完整的边框简写，而不是只指定宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.secondary`

<a id="entry-layer-border-secondary"></a>

次色

使用 secondary-subtle 主题角色绘制独立轮廓。

使用 secondary-subtle 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.border.quaternary`

<a id="entry-layer-border-quaternary"></a>

第四色

使用 quaternary-subtle 主题角色绘制独立轮廓。

使用 quaternary-subtle 颜色令牌和超小边框宽度令牌设置完整的实线边框。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

这是轮廓，不是背景填充。它使用完整的 border 简写，而非仅选择宽度。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
