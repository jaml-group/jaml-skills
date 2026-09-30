# layer.background

<!-- Generated from native authoring; do not edit. -->

[English](background.md)

`Styles.layer.background.*` — background layer with common background options.

Wraps `common/background` options in a layer context. Supports all standard background properties plus layer positioning.

---

## Variants

### `background`

<a id="entry-layer-background"></a>

背景

在独立装饰图层上使用调用方提供的 CSS 背景。

在创建的图层上写入背景的图像、位置、尺寸、重复、附着、颜色及简写属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `image` → `position` → `size` → `repeat` → `attachment` → `color` → `background`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `image` | `arrayOrString` | 图片<br>`{"cssKey":"backgroundImage"}` |
| `position` | `arrayOrString` | 位置<br>`{"cssKey":"backgroundPosition"}` |
| `size` | `arrayOrString` | 尺寸<br>`{"cssKey":"backgroundSize"}` |
| `repeat` | `arrayOrString` | 重复<br>`{"cssKey":"backgroundRepeat"}` |
| `attachment` | `string` | 背景附着方式<br>`{"cssKey":"backgroundAttachment"}` |
| `color` | `string` | 背景色<br>`{"cssKey":"backgroundColor"}` |
| `background` | `arrayOrString` | 背景色<br>支持简写<br>`{"cssKey":"background"}` |

Basic background with standard CSS background properties.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background(color:var(--jam-ac-color);opacity:0.1)'],
        components: [{ type: 'label', cap: 'Tinted background' }]
    },
    {
        type: 'card',
        styles: ['layer.background(image:linear-gradient(45deg,red,blue);opacity:0.3)'],
        components: [{ type: 'label', cap: 'Gradient background' }]
    }
];
```

### `background.tint`

<a id="entry-layer-background-tint"></a>

色调

在独立装饰图层上使用轻微着色的表面。

根据 tint 强度计算相对于强调色、适应主题的背景颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `intense`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `intense` | `number` | `0.015` | 强度<br>支持简写 |

Subtle color tint overlay.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.tint(intense:0.03)'],
        components: [{ type: 'label', cap: 'Tinted' }]
    }
];
```

### `background.crystal`

<a id="entry-layer-background-crystal"></a>

水晶

在独立装饰图层上使用水晶般的强调色表面。

添加 crystal 背景类，其多层渐变在常规和深色显示下有所不同。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

Crystal/glass-like background effect. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.crystal'],
        components: [{ type: 'label', cap: 'Crystal' }]
    }
];
```

### `background.glassify`

<a id="entry-layer-background-glassify"></a>

玻璃

在独立装饰图层上使用磨砂玻璃般的表面。

结合半透明表面、放大的径向高光和背景模糊。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

背景模糊会改变图层后方内容的呈现；可见效果取决于该背景及浏览器支持。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

Frosted glass effect with blur and gradient.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.glassify'],
        components: [{ type: 'label', cap: 'Glass' }]
    }
];
```

### `background.gradient`

<a id="entry-layer-background-gradient"></a>

渐变

在独立装饰图层上使用可配置的渐变填充。

按渐变类型、几何参数和色标构建背景图像。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg` → `arg` → `stops` → `type`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `numberOrString` | 未提供 | 角度<br>Unit: `deg` |
| `arg` | `string` | 未提供 | 位置参数 |
| `stops` | `array` | `["hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.28), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 46), 0.65)","50%","hsla(calc(var(--jam-ac-h) * 1.2), calc(var(--jam-ac-s) * 0.42), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 45), 0.95)","hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.43), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 44), 0.45)"]` | 渐变色标 |
| `type` | `string` | `linear` | 样式<br>选项: `linear` — 线性, `radial` — 径向, `conic` — 锥形, `repeatingLinear` — 重复线性, `repeatingRadial` — 重复径向, `repeatingConic` — 重复锥形 |

Smooth multi-stop gradient background.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient'],
        components: [{ type: 'label', cap: 'Gradient' }]
    }
];
```

### `background.gradient.corner`

<a id="entry-layer-background-gradient-corner"></a>

角落

在独立装饰图层上使用带明暗效果的角落。

使用含大片透明区域和彩色角落的线性渐变。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `number` | `166` | 角度<br>Unit: `deg` |

Corner gradient from transparent to accent color.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient.corner'],
        components: [{ type: 'label', cap: 'Corner gradient' }]
    }
];
```

### `background.gradient.aurora`

<a id="entry-layer-background-gradient-aurora"></a>

极光

在独立装饰图层上使用极光般的定向高光。

使用从透明过渡到强调色光晕的线性渐变。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `number` | `-15` | 角度<br>Unit: `deg` |

Aurora-style gradient from transparent to accent.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient.aurora'],
        components: [{ type: 'label', cap: 'Aurora' }]
    }
];
```

### `background.gradient.concave`

<a id="entry-layer-background-gradient-concave"></a>

凹面

在独立装饰图层上使用凹面高光。

使用靠近角落的放大径向渐变，形成凹面般的外观。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

Concave/depressed gradient effect. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.gradient.concave'],
        components: [{ type: 'label', cap: 'Concave' }]
    }
];
```

### `background.stripy`

<a id="entry-layer-background-stripy"></a>

条纹

在独立装饰图层上使用条纹背景。

构建重复线性渐变，并可固定其背景附着方式。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

提供 color/width 时，渐变辅助函数优先用它们构建条纹；stops 是另一种构建途径。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg` → `color` → `width` → `gap` → `stops` → `fixed`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `number` | `135` | 角度<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)` | 颜色 |
| `width` | `string` | 未提供 | 宽度 |
| `gap` | `string` | 未提供 | 间距 |
| `stops` | `array` | `["transparent","0.15rem","hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)","0.15rem"]` | 颜色和宽度 |
| `fixed` | `boolean` | `false` | 固定 |

Diagonal stripe pattern.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.stripy(deg:45;width:0.5rem)'],
        components: [{ type: 'label', cap: 'Stripy' }]
    }
];
```

### `background.bubbles`

<a id="entry-layer-background-bubbles"></a>

梦幻泡泡

需要滚动动画时，请使用 `Styles.layer.scroller.bubbles`。

在独立装饰图层上使用随机装饰气泡。

构建静态的径向渐变叠层，随机设置位置、尺寸、柔和程度和相对强调色调整的颜色。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

此变体是生成的 CSS 图像，不是动画画布。尺寸换算会读取图层高度；需要单个粒子动画时应选用 canvas.particles。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `bubbleSize` → `bubbleCount` → `countRange` → `sizeRange` → `blurRange` → `alphaRange` → `hueRange` → `satuRange` → `lumiRange` → `allowOverflowY` → `allowOverflowX`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `bubbleSize` | `numberOrString` | `1` | 基础尺寸<br>Unit: `rem` |
| `bubbleCount` | `numberOrString` | 未提供 | 个数 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | 未提供 | 尺寸范围 |
| `blurRange` | `array` | 未提供 | 模糊范围 |
| `alphaRange` | `array` | 未提供 | 透明度范围 |
| `hueRange` | `array` | 未提供 | 颜色范围 |
| `satuRange` | `array` | 未提供 | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `allowOverflowY` | `boolean` | 未提供 | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | 未提供 | 允许 X 轴溢出 |

Bubble pattern overlay.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.bubbles(bubbleSize:1.5rem;bubbleCount:8)'],
        components: [{ type: 'label', cap: 'Bubbles' }]
    }
];
```

### `background.ribbon`

<a id="entry-layer-background-ribbon"></a>

彩带

在独立装饰图层上使用缎带形背景。

将背景裁剪为带凹口的横向缎带，并绘制强调色渐变。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

此样式裁剪的是背景；角落附着的内容装饰应使用 layer.ribbon 或 layer.ribbon.bookmark。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

Ribbon-shaped background with clip path. No args.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.ribbon'],
        components: [{ type: 'label', cap: 'Ribbon bg' }]
    }
];
```

### `background.grid`

<a id="entry-layer-background-grid"></a>

网格

在独立装饰图层上使用装饰网格。

结合两条垂直相交的重复线性渐变；两个轴的线间距可分别设置。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg` → `color` → `width` → `gap` → `gapX` → `gapY` → `size`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `numberOrString` | `90` | 角度<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.1), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 10), 0.075)` | 颜色 |
| `width` | `string` | `0.0625rem` | 宽度 |
| `gap` | `string` | `3.125rem` | 间距 |
| `gapX` | `string` | 未提供 | X轴间距 |
| `gapY` | `string` | 未提供 | Y轴间距 |
| `size` | `string` | 未提供 | 宽度 |

Repeating grid pattern.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.grid(gap:2rem)'],
        components: [{ type: 'label', cap: 'Grid' }]
    }
];
```

### `background.chess`

<a id="entry-layer-background-chess"></a>

棋盘

在独立装饰图层上使用棋盘图案。

用两到四种颜色构建重复的锥形渐变图案；图块在两个轴上的尺寸均为配置方格尺寸的两倍。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `color` → `color2` → `color3` → `color4` → `size`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.5), var(--jam-ac-l), 0.05)` | 颜色 |
| `color2` | `string` | `transparent` | 颜色2 |
| `color3` | `string` | 未提供 | 颜色3 |
| `color4` | `string` | 未提供 | 颜色4 |
| `size` | `string` | `25%` | 宽度 |

Checkerboard/chess pattern.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.background.chess(size:2rem)'],
        components: [{ type: 'label', cap: 'Chess' }]
    }
];
```

## `layer.background.size`

<a id="entry-layer-background-size"></a>

尺寸

在独立装饰图层上设置背景图像尺寸。

在创建的图层上设置 CSS background-size 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 尺寸 |

## `layer.background.color`

<a id="entry-layer-background-color"></a>

背景色

在独立装饰图层上使用纯色背景填充。

在创建的图层上设置 CSS background-color 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `string` | 背景色 |

## `layer.background.image`

<a id="entry-layer-background-image"></a>

图片

在独立装饰图层上使用图像或渐变背景。

在创建的图层上设置 CSS background-image 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 图片 |

## `layer.background.lower`

<a id="entry-layer-background-lower"></a>

较低

在独立装饰图层上使用 lower 表面色调。

使用 lower 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.higher`

<a id="entry-layer-background-higher"></a>

较高

在独立装饰图层上使用 higher 表面色调。

使用 higher 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.lowest`

<a id="entry-layer-background-lowest"></a>

最低

在独立装饰图层上使用 lowest 表面色调。

使用 lowest 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.repeat`

<a id="entry-layer-background-repeat"></a>

重复

在独立装饰图层上设置背景平铺行为。

在创建的图层上设置 CSS background-repeat 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 重复 |

## `layer.background.default`

<a id="entry-layer-background-default"></a>

默认

在独立装饰图层上使用默认表面填充。

使用默认表面颜色令牌填充背景。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.highest`

<a id="entry-layer-background-highest"></a>

最高

在独立装饰图层上使用 highest 表面色调。

使用 highest 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.neutral`

<a id="entry-layer-background-neutral"></a>

中性

在独立装饰图层上使用中性填充。

使用 neutral 颜色令牌填充背景。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.primary`

<a id="entry-layer-background-primary"></a>

主色

在独立装饰图层上使用 primary 主题角色。

使用 primary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.elevated`

<a id="entry-layer-background-elevated"></a>

抬升

在独立装饰图层上使用抬升表面填充。

使用 elevated 颜色令牌填充背景。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.position`

<a id="entry-layer-background-position"></a>

位置

在独立装饰图层上设置背景位置。

在创建的图层上设置 CSS background-position 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 位置 |

## `layer.background.tertiary`

<a id="entry-layer-background-tertiary"></a>

第三色

在独立装饰图层上使用 tertiary 主题角色。

使用 tertiary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.secondary`

<a id="entry-layer-background-secondary"></a>

次色

在独立装饰图层上使用 secondary 主题角色。

使用 secondary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.background.attachment`

<a id="entry-layer-background-attachment"></a>

背景附着方式

在独立装饰图层上设置背景附着行为。

在创建的图层上设置 CSS background-attachment 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `string` | 背景附着方式 |

## `layer.background.quaternary`

<a id="entry-layer-background-quaternary"></a>

第四色

在独立装饰图层上使用 quaternary 主题角色。

使用 quaternary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
