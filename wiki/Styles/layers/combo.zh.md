# layer.combo

<!-- Generated from native authoring; do not edit. -->

[English](combo.md)

`Styles.layer.combo.*` — composite layer effects combining multiple spinners or masked backgrounds.

For `combo.spinner.roulette`, `.radar` and `.reddit`, omitted `spin` keeps the preset motion; `spin:false` stops rotation throughout the composite. This does not stop independent animation effects. Preset directions, geometry and fixed timings remain intentional; compose individual spinners when each layer needs independent control.

---

## Variants

### `combo.spinner.roulette`

<a id="entry-layer-combo-spinner-roulette"></a>

轮盘

将分段环、彗星和轨道圆点组合成一个装饰性活动图案。

组合反向旋转的 frets 和 comet 图层，以及使用固定较短轨道周期的圆点。

为宿主提供可测量的高度，供组合中的旋转图层使用，并加载框架图层样式。

创建多个子图层；撤销组合样式的所有权时移除其拥有的图层，而不是宿主。

组合图案符合需求时使用此预设。每个环需要独立几何设置或运动时，组合各个 layer.spinner 变体。

省略 spin 时保留预设运动；spin:false 禁用所有组成图层的旋转。预设方向、几何和固定时间设置仍优先于其他调用方值。独立动画效果、应用忙碌状态和状态文本仍由调用方负责。

位置参数顺序: `fretWidth` → `fretGap` → `fretCount` → `fretBackground` → `fretFrom` → `fretColors` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `cometLength` → `tailColor` → `headColor` → `cometBackground` → `cometBlur` → `cometFrom` → `roundHead` → `roundTail` → `animateLength`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `fretWidth` | `numberOrString` | `1.5` | 分段宽度<br>单位默认是deg |
| `fretGap` | `numberOrString` | `10.5` | 分段间距<br>单位默认是deg |
| `fretCount` | `number` | 未提供 | 分段数量 |
| `fretBackground` | `string` | `var(--jam-ac-color)` | 背景<br>可以是颜色或者图片/渐变 |
| `fretFrom` | `number` | 未提供 | 起始<br>单位是deg |
| `fretColors` | `array` | 未提供 | 分段颜色<br>为不同 fret 分段指定颜色，数量受 fretCount 限制。 |
| `outer` | `number` | 未提供 | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `75` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | 未提供 | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | `1rem` | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | 未提供 | 旋转<br>省略时保留预设运动，或传入 false 停止整个组合的旋转。其他值不会覆盖预设固定的方向。这不禁用独立的动画效果。<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `cometLength` | `number` | `100` | 弧长 |
| `tailColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | 尾色 |
| `headColor` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 1.5), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 15), 0.85)` | 头色 |
| `cometBackground` | `string` | 未提供 | 背景<br>可以是颜色或者图片/渐变,一旦设置,头尾颜色就失效了 |
| `cometBlur` | `number` | `1px` | 模糊<br>Unit: `px` |
| `cometFrom` | `number` | `0` | 起始<br>单位是deg |
| `roundHead` | `boolean` | `true` | 圆头 |
| `roundTail` | `boolean` | `false` | 圆尾 |
| `animateLength` | `booleanOrArray` | `false` | 弧长动画 |

Roulette-style spinner combining frets, comet, and orbit spinners.

Combines `spinner.frets` (reversed, mid:80), `spinner.comet` (mid:80, normal direction), and `spinner.orbit` (single sphere, mid:80).

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Roulette',
        styles: ['layer.combo.spinner.roulette(duration:4000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `combo.spinner.radar`

<a id="entry-layer-combo-spinner-radar"></a>

雷达

显示类似雷达的装饰性活动图案。

组合旋转的填充彗星扫掠、移动的径向标记和同心分段环。

为宿主提供可测量的高度，供组合中的旋转图层使用，并加载框架图层样式。

创建多个子图层；撤销组合样式的所有权时移除其拥有的图层，而不是宿主。

组合图案符合需求时使用此预设。每个环需要独立几何设置或运动时，组合各个 layer.spinner 变体。

省略 spin 时保留预设运动；spin:false 禁用所有组成图层的旋转。预设方向、几何和固定时间设置仍优先于其他调用方值。独立动画效果、应用忙碌状态和状态文本仍由调用方负责。

位置参数顺序: `cometLength` → `tailColor` → `headColor` → `cometBackground` → `cometBlur` → `cometFrom` → `roundHead` → `roundTail` → `animateLength` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `cometLength` | `number` | `100` | 弧长 |
| `tailColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | 尾色 |
| `headColor` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 1.5), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 15), 0.85)` | 头色 |
| `cometBackground` | `string` | 未提供 | 背景<br>可以是颜色或者图片/渐变,一旦设置,头尾颜色就失效了 |
| `cometBlur` | `number` | `0` | 模糊<br>Unit: `px` |
| `cometFrom` | `number` | `0` | 起始<br>单位是deg |
| `roundHead` | `boolean` | `true` | 圆头 |
| `roundTail` | `boolean` | `false` | 圆尾 |
| `animateLength` | `booleanOrArray` | `false` | 弧长动画 |
| `outer` | `number` | 未提供 | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `75` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | 未提供 | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | `1rem` | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | 未提供 | 旋转<br>省略时保留预设运动，或传入 false 停止整个组合的旋转。其他值不会覆盖预设固定的方向。这不禁用独立的动画效果。<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Radar-style spinner combining comet and multiple frets layers.

Creates a radar sweep with concentric rings. Uses `spinner.comet` for the sweep line and multiple `spinner.frets` for concentric circles.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Radar',
        styles: ['layer.combo.spinner.radar(duration:3000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `combo.spinner.reddit`

<a id="entry-layer-combo-spinner-reddit"></a>

Reddit

显示围绕中心圆盘的双环轨道图案。

组合两个分段环和成对轨道圆点，以不同的固定速度运行，中心圆盘保持静止。

为宿主提供可测量的高度，供组合中的旋转图层使用，并加载框架图层样式。

创建多个子图层；撤销组合样式的所有权时移除其拥有的图层，而不是宿主。

组合图案符合需求时使用此预设。每个环需要独立几何设置或运动时，组合各个 layer.spinner 变体。

省略 spin 时保留预设运动；spin:false 禁用所有组成图层的旋转。预设方向、几何和固定时间设置仍优先于其他调用方值。独立动画效果、应用忙碌状态和状态文本仍由调用方负责。

位置参数顺序: `cometLength` → `tailColor` → `headColor` → `cometBackground` → `cometBlur` → `cometFrom` → `roundHead` → `roundTail` → `animateLength` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `cometLength` | `number` | `100` | 弧长 |
| `tailColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | 尾色 |
| `headColor` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 1.5), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 15), 0.85)` | 头色 |
| `cometBackground` | `string` | 未提供 | 背景<br>可以是颜色或者图片/渐变,一旦设置,头尾颜色就失效了 |
| `cometBlur` | `number` | `0` | 模糊<br>Unit: `px` |
| `cometFrom` | `number` | `0` | 起始<br>单位是deg |
| `roundHead` | `boolean` | `true` | 圆头 |
| `roundTail` | `boolean` | `false` | 圆尾 |
| `animateLength` | `booleanOrArray` | `false` | 弧长动画 |
| `outer` | `number` | 未提供 | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `75` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | 未提供 | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | `1rem` | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | 未提供 | 旋转<br>省略时保留预设运动，或传入 false 停止整个组合的旋转。其他值不会覆盖预设固定的方向。这不禁用独立的动画效果。<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Multi-layered Reddit-style spinner.

Combines two pairs of frets + orbit layers at different radii and a central background dot.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Reddit',
        styles: ['layer.combo.spinner.reddit(duration:5000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `combo.masked`

<a id="entry-layer-combo-masked"></a>

背景

在独立装饰图层上使用调用方提供的 CSS 背景。

在创建的图层上写入背景的图像、位置、尺寸、重复、附着、颜色及简写属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

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

Background layer with an optional caller-supplied mask. Only `combo.masked.stripy` supplies a fade mask automatically. The base variant keeps combo-layer classes and needs explicit layer geometry; set the host position and the layer’s `css` as below. For a full-size background with native geometry, use `layer.background` with an explicit mask.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['css(position:relative)', "layer.combo.masked(color:var(--jam-ac-color);opacity:0.15;mask:linear-gradient(90deg,hsl(0 0% 0%),transparent);css:{position:'absolute',inset:0,display:'block',pointerEvents:'none'})"],
        components: [{ type: 'label', cap: 'Masked bg' }]
    }
];
```

### `combo.masked.stripy`

<a id="entry-layer-combo-masked-stripy"></a>

条纹

添加沿装饰渐隐的条纹。

委托背景条纹图层处理，并预设强调色着色、条纹宽度以及垂直于条纹角度的线性遮罩。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

此预设在展开调用方参数后覆盖 color、width 和 mask。需要完全控制时，使用 layer.background.stripy 并显式指定 mask。

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

Stripy background with a gradient mask. The stripes are masked by a linear gradient for a fade effect.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.combo.masked.stripy(deg:45)'],
        components: [{ type: 'label', cap: 'Masked stripy' }]
    }
];
```

## `layer.combo.masked.grid`

<a id="entry-layer-combo-masked-grid"></a>

网格

在独立装饰图层上使用装饰网格。

结合两条垂直相交的重复线性渐变；两个轴的线间距可分别设置。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

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

## `layer.combo.masked.size`

<a id="entry-layer-combo-masked-size"></a>

尺寸

在独立装饰图层上设置背景图像尺寸。

在创建的图层上设置 CSS background-size 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 尺寸 |

## `layer.combo.masked.tint`

<a id="entry-layer-combo-masked-tint"></a>

色调

在独立装饰图层上使用轻微着色的表面。

根据 tint 强度计算相对于强调色、适应主题的背景颜色。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时请显式配置 mask。直接使用 masked 路径会保留 combo-layer 类；该路径不添加背景的全尺寸几何设置和 background-host 标记。必要时显式配置图层 css 几何属性。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `intense`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `intense` | `number` | `0.015` | 强度<br>支持简写 |

## `layer.combo.masked.chess`

<a id="entry-layer-combo-masked-chess"></a>

棋盘

在独立装饰图层上使用棋盘图案。

用两到四种颜色构建重复的锥形渐变图案；图块在两个轴上的尺寸均为配置方格尺寸的两倍。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

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

## `layer.combo.masked.color`

<a id="entry-layer-combo-masked-color"></a>

背景色

在独立装饰图层上使用纯色背景填充。

在创建的图层上设置 CSS background-color 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `string` | 背景色 |

## `layer.combo.masked.image`

<a id="entry-layer-combo-masked-image"></a>

图片

在独立装饰图层上使用图像或渐变背景。

在创建的图层上设置 CSS background-image 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 图片 |

## `layer.combo.masked.lower`

<a id="entry-layer-combo-masked-lower"></a>

较低

在独立装饰图层上使用 lower 表面色调。

使用 lower 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.higher`

<a id="entry-layer-combo-masked-higher"></a>

较高

在独立装饰图层上使用 higher 表面色调。

使用 higher 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.lowest`

<a id="entry-layer-combo-masked-lowest"></a>

最低

在独立装饰图层上使用 lowest 表面色调。

使用 lowest 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.repeat`

<a id="entry-layer-combo-masked-repeat"></a>

重复

在独立装饰图层上设置背景平铺行为。

在创建的图层上设置 CSS background-repeat 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 重复 |

## `layer.combo.masked.ribbon`

<a id="entry-layer-combo-masked-ribbon"></a>

彩带

在独立装饰图层上使用缎带形背景。

将背景裁剪为带凹口的横向缎带，并绘制强调色渐变。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。此样式裁剪的是背景；角落附着的内容装饰应使用 layer.ribbon 或 layer.ribbon.bookmark。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.bubbles`

<a id="entry-layer-combo-masked-bubbles"></a>

梦幻泡泡

需要滚动动画时，请使用 `Styles.layer.scroller.bubbles`。

在独立装饰图层上使用随机装饰气泡。

构建静态的径向渐变叠层，随机设置位置、尺寸、柔和程度和相对强调色调整的颜色。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。此变体是生成的 CSS 图像，不是动画画布。尺寸换算会读取图层高度；需要单个粒子动画时应选用 canvas.particles。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

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

## `layer.combo.masked.crystal`

<a id="entry-layer-combo-masked-crystal"></a>

水晶

在独立装饰图层上使用水晶般的强调色表面。

添加 crystal 背景类，其多层渐变在常规和深色显示下有所不同。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.default`

<a id="entry-layer-combo-masked-default"></a>

默认

在独立装饰图层上使用默认表面填充。

使用默认表面颜色令牌填充背景。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.highest`

<a id="entry-layer-combo-masked-highest"></a>

最高

在独立装饰图层上使用 highest 表面色调。

使用 highest 表面填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.neutral`

<a id="entry-layer-combo-masked-neutral"></a>

中性

在独立装饰图层上使用中性填充。

使用 neutral 颜色令牌填充背景。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.primary`

<a id="entry-layer-combo-masked-primary"></a>

主色

在独立装饰图层上使用 primary 主题角色。

使用 primary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.elevated`

<a id="entry-layer-combo-masked-elevated"></a>

抬升

在独立装饰图层上使用抬升表面填充。

使用 elevated 颜色令牌填充背景。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.glassify`

<a id="entry-layer-combo-masked-glassify"></a>

玻璃

在独立装饰图层上使用磨砂玻璃般的表面。

结合半透明表面、放大的径向高光和背景模糊。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。背景模糊会改变图层后方内容的呈现；可见效果取决于该背景及浏览器支持。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.gradient`

<a id="entry-layer-combo-masked-gradient"></a>

渐变

在独立装饰图层上使用可配置的渐变填充。

按渐变类型、几何参数和色标构建背景图像。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

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

## `layer.combo.masked.position`

<a id="entry-layer-combo-masked-position"></a>

位置

在独立装饰图层上设置背景位置。

在创建的图层上设置 CSS background-position 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `arrayOrString` | 位置 |

## `layer.combo.masked.tertiary`

<a id="entry-layer-combo-masked-tertiary"></a>

第三色

在独立装饰图层上使用 tertiary 主题角色。

使用 tertiary 默认填充。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时请显式配置 mask。直接使用 masked 路径会保留 combo-layer 类；该路径不添加背景的全尺寸几何设置和 background-host 标记。必要时显式配置图层 css 几何属性。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.secondary`

<a id="entry-layer-combo-masked-secondary"></a>

次色

在独立装饰图层上使用 secondary 主题角色。

使用 secondary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.attachment`

<a id="entry-layer-combo-masked-attachment"></a>

背景附着方式

在独立装饰图层上设置背景附着行为。

在创建的图层上设置 CSS background-attachment 属性。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。单个背景原子属性不会提供图像所需的其他属性。需要这些属性共同作用时，应在同一图层上配置完整背景。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `value`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
| `value` | `string` | 背景附着方式 |

## `layer.combo.masked.quaternary`

<a id="entry-layer-combo-masked-quaternary"></a>

第四色

在独立装饰图层上使用 quaternary 主题角色。

使用 quaternary 默认填充。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |

## `layer.combo.masked.gradient.aurora`

<a id="entry-layer-combo-masked-gradient-aurora"></a>

极光

在独立装饰图层上使用极光般的定向高光。

使用从透明过渡到强调色光晕的线性渐变。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `number` | `-15` | 角度<br>Unit: `deg` |

## `layer.combo.masked.gradient.corner`

<a id="entry-layer-combo-masked-gradient-corner"></a>

角落

在独立装饰图层上使用带明暗效果的角落。

使用含大片透明区域和彩色角落的线性渐变。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `deg`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `deg` | `number` | `166` | 角度<br>Unit: `deg` |

## `layer.combo.masked.gradient.concave`

<a id="entry-layer-combo-masked-gradient-concave"></a>

凹面

在独立装饰图层上使用凹面高光。

使用靠近角落的放大径向渐变，形成凹面般的外观。

使用具有有效几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠关系取决于宿主及所选变体。

创建独立子图层；撤销其样式时移除创建的图层，而非宿主。

通过图层自身的参数或 css 配置一个图层。应用另一个图层样式会创建另一个子元素，而不会更新第一个图层。

combo.masked 形式不会为此变体注入遮罩；需要时应显式配置 mask。直接 masked 路径保留 combo-layer 类，但不会添加背景全尺寸几何设置或背景宿主标记。需要时应显式配置图层 css 的几何尺寸。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `class` | `string` | 类 |
| `content` | `any` | 内容 |
