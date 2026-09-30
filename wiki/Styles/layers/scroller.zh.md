# layer.scroller

<!-- Generated from native authoring; do not edit. -->

[English](scroller.md)

`Styles.layer.scroller.*` — auto-scrolling background layer effects.

---

## Variants

### `scroller`

<a id="entry-layer-scroller"></a>

滚动装饰

在宿主内容后使用重复背景。

创建两个相差半个周期的背景图层。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `image` → `position` → `size` → `repeat` → `attachment` → `color` → `background`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `down` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `image` | `arrayOrString` | 未提供 | 图片<br>`{"cssKey":"backgroundImage"}` |
| `position` | `arrayOrString` | 未提供 | 位置<br>`{"cssKey":"backgroundPosition"}` |
| `size` | `arrayOrString` | 未提供 | 尺寸<br>`{"cssKey":"backgroundSize"}` |
| `repeat` | `arrayOrString` | 未提供 | 重复<br>`{"cssKey":"backgroundRepeat"}` |
| `attachment` | `string` | 未提供 | 背景附着方式<br>`{"cssKey":"backgroundAttachment"}` |
| `color` | `string` | 未提供 | 背景色<br>`{"cssKey":"backgroundColor"}` |
| `background` | `arrayOrString` | 未提供 | 背景色<br>支持简写<br>`{"cssKey":"background"}` |

Auto-scrolling background. Two background copies (primary and secondary) cycle to create a seamless scroll effect.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller(direction:up;scroll:true;duration:12000;color:var(--jam-ac-color);opacity:0.08)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Scrolling up' }]
    },
    {
        type: 'wrapper',
        styles: ['layer.scroller(direction:left;scroll:true;duration:8000;color:hsla(0,0%,100%,0.05))', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Scrolling left' }]
    }
];
```

### `scroller.text`

<a id="entry-layer-scroller-text"></a>

文字

在宿主内容后使用重复文字跑马灯。

创建两个文字图层；auto duration 根据内容字符串长度调整。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。文字为循环而复制；关键可读内容应放在宿主中，而不是依赖移动的装饰副本。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `string` | `Hello World` | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `down` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `auto` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |

Scrolling text content. Splits text characters and scrolls them across the background.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.text(content:JAM UI;scroll:true;direction:up;duration:auto;opacity:0.1)', 'css(position:relative;width:20rem;height:20rem;padding:1rem;font-size:2rem)'],
        components: [{ type: 'label', cap: 'Scrolling text' }]
    }
];
```

### `scroller.particles`

<a id="entry-layer-scroller-particles"></a>

粒子

在宿主内容后使用重复的粒子场。

创建两个可作为整体图层移动的粒子画布；逐粒子的 onTick 动画保持独立。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `down` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | 未提供 | 尺寸范围 |
| `blurRange` | `array` | 未提供 | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | 未提供 | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | 未提供 | 形状 |
| `distribution` | `string` | `random` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | 未提供 | 颜色范围 |
| `satuRange` | `array` | 未提供 | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | 未提供 | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | 未提供 | 因子范围 |
| `allowOverflowY` | `boolean` | 未提供 | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | 未提供 | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | 未提供 | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Scrolling particle system. Configurable particles that animate across the background.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.particles(scroll:true;direction:up;duration:10000;countRange:[10,20];sizeRange:[4,12];shape:circle;alphaRange:[0.2,0.6])', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Particle scroll' }]
    }
];
```

### `scroller.bubbles`

<a id="entry-layer-scroller-bubbles"></a>

气泡

在宿主内容后使用上升气泡装饰。

使用气泡形状、向上方向和柔和的透明粒子范围创建两个放大的粒子画布。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `css` | `dictionaryOrString` | `{"height":"400%"}` | CSS |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `up` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | `["5%","10%"]` | 尺寸范围 |
| `blurRange` | `array` | `[0,"5%"]` | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | `bubble` | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | 未提供 | 形状 |
| `distribution` | `string` | `random` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | 未提供 | 颜色范围 |
| `satuRange` | `array` | 未提供 | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | `[0,0.5]` | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | `[0.9,1]` | 因子范围 |
| `allowOverflowY` | `boolean` | 未提供 | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | 未提供 | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | 未提供 | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Scrolling bubble particles. A preset particle system with bubble-shaped particles drifting upward.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.bubbles(scroll:true;duration:16000)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Bubbles' }]
    }
];
```

### `scroller.stripy`

<a id="entry-layer-scroller-stripy"></a>

条纹

在宿主内容后使用移动条纹。

创建两个条纹背景，默认调整移动方向的尺寸以对齐条纹重复。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。条纹对齐在图层创建时测量宿主尺寸；选择角度和宽度时应考虑预期移动方向。

位置参数顺序: `alignStripy` → `convertWidth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `deg` → `color` → `width` → `gap` → `stops` → `fixed`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `alignStripy` | `boolean` | `true` | 自动对齐 |
| `convertWidth` | `boolean` | `true` | 转换宽度 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `down` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `deg` | `number` | `135` | 角度<br>Unit: `deg` |
| `color` | `string` | `var(--jam-ac-color)` | 颜色 |
| `width` | `string` | `5%` | 宽度 |
| `gap` | `string` | 未提供 | 间距 |
| `stops` | `array` | `["transparent","0.15rem","hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)","0.15rem"]` | 颜色和宽度 |
| `fixed` | `boolean` | `false` | 固定 |

Scrolling stripy (striped) background. Alternating colored stripes that scroll seamlessly.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.stripy(scroll:true;direction:right;duration:8000;deg:45;width:3rem)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Stripy scroll' }]
    }
];
```

### `scroller.grid`

<a id="entry-layer-scroller-grid"></a>

网格

在宿主内容后使用移动的装饰网格。

使用通用网格构建器创建两个网格背景。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `deg` → `color` → `width` → `gap` → `gapX` → `gapY` → `size`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `down` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `deg` | `numberOrString` | `90` | 角度<br>Unit: `deg` |
| `color` | `string` | `var(--jam-ac-color)` | 颜色 |
| `width` | `string` | `0.0625rem` | 宽度 |
| `gap` | `string` | `3.125rem` | 间距 |
| `gapX` | `string` | 未提供 | X轴间距 |
| `gapY` | `string` | 未提供 | Y轴间距 |
| `size` | `string` | 未提供 | 宽度 |

Scrolling grid background. A repeating grid pattern that scrolls.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.scroller.grid(scroll:true;direction:down;duration:12000;gap:2rem)', 'css(position:relative;width:20rem;height:20rem)'],
        components: [{ type: 'label', cap: 'Grid scroll' }]
    }
];
```
