# layer.spinner

<!-- Generated from native authoring; do not edit. -->

[English](spinner.md)

使用百分比尺寸时，宿主需有可测量的高度；加载框架图层样式。需要旋转时，需明确启用 spin。

视觉变体的选择与应用忙碌或进度状态分别管理。由应用决定何时添加或移除图层；需要显示可量化进度时，使用进度元素。

这些是装饰图层，不检测待处理任务、报告进度、播报状态或禁用控件。spin 默认为 false；粒子和变体中的可选动画仍可能独立运行。

`Styles.layer.spinner.*` provides decorative activity layers. Read [activity versus progress](../../choosing-native-capabilities.md#decorative-activity-and-actual-progress) before using them as loading UI; the entries below describe each variant’s activation and sizing requirements.

---

## Variants

### `spinner.background`

<a id="entry-layer-spinner-background"></a>

背景

可用环形背景提供装饰性的活动反馈。

构建带遮罩的背景图层；spin 控制其旋转。

位置参数顺序: `background` → `backgroundMask` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `background` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.33)` | 背景 |
| `backgroundMask` | `string` | 未提供 | 背景遮罩 |
| `outer` | `number` | 未提供 | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `75` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | 未提供 | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | `4rem` | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | `false` | 旋转<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Rotating background layer. Spins a ring around the element.

Choose either `mid` or the separate inner/outer positioning controls.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Loading',
        styles: ['layer.spinner.background(spin:normal;duration:8000;width:3rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Slow spin',
        styles: ['layer.spinner.background(background:var(--jam-ac-color);spin:reverse;duration:15000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.frets`

<a id="entry-layer-spinner-frets"></a>

分段圆环

可用分段圆环提供装饰性的活动反馈。

根据 fret 设置构建锥形渐变分段圆环；spin 控制其旋转。

位置参数顺序: `fretWidth` → `fretGap` → `fretCount` → `fretBackground` → `fretFrom` → `fretColors` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `fretWidth` | `numberOrString` | 未提供 | 分段宽度<br>单位默认是deg |
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
| `spin` | `booleanOrString` | `false` | 旋转<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Segmented fret/guitar-fret spinner with individually colored segments.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Fret spinner',
        styles: ['layer.spinner.frets(fretCount:8;fretWidth:3;spin:normal;duration:6000;width:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Colorful frets',
        styles: ['layer.spinner.frets(fretCount:6;fretColors:[red,orange,yellow,green,blue,purple];spin:normal;duration:8000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.comet`

<a id="entry-layer-spinner-comet"></a>

彗星

可用彗星弧线提供装饰性的活动反馈。

构建可控制头部和尾部的渐变弧线。spin 控制旋转；animateLength 独立启用反复变化的弧长动画。

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
| `spin` | `booleanOrString` | `false` | 旋转<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Comet-tail spinner with a glowing head and fading tail.

A comet background overrides the head/tail colors when supplied.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Comet',
        styles: ['layer.spinner.comet(cometLength:80;spin:normal;duration:4000;width:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Pulsing comet',
        styles: ['layer.spinner.comet(animateLength:true;spin:normal;width:1.5rem)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.orbit`

<a id="entry-layer-spinner-orbit"></a>

轨道

可用沿轨道运动的圆点提供装饰性的活动反馈。

构建沿径向排列的圆点图像和可选的轨道。spin 控制图层旋转。

位置参数顺序: `showOrbit` → `orbitColor` → `orbitFrom` → `sphereCount` → `sphereRadius` → `sphereBackground` → `sphereColor` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `showOrbit` | `boolean` | `true` | 显示轨道 |
| `orbitColor` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.33)` | 颜色 |
| `orbitFrom` | `number` | `0` | 起始<br>单位是deg |
| `sphereCount` | `number` | `3` | 球数 |
| `sphereRadius` | `numberOrString` | `0.75` | 球半径<br>Unit: `rem` |
| `sphereBackground` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.5)` | 球背景 |
| `sphereColor` | `string` | `hsl(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l))` | 球颜色 |
| `outer` | `number` | 未提供 | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `75` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | 未提供 | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | `0.2rem` | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | `false` | 旋转<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Orbital spinner with spheres orbiting on a circular track.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Orbit',
        styles: ['layer.spinner.orbit(sphereCount:3;duration:3000;spin:normal)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Single sphere',
        styles: ['layer.spinner.orbit(sphereCount:1;sphereRadius:1.2rem;spin:normal;duration:2000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.object`

<a id="entry-layer-spinner-object"></a>

物体

对象

可用环形排列的重复对象或文字提供装饰性的活动反馈。

依次优先使用 text 字符、objectJAML、objectHTML 创建重复内容。spin 控制绕环运动；内容和旋转设置仍由调用方管理。

位置参数顺序: `objectCount` → `objectHTML` → `objectJAML` → `objectRotation` → `objectGap` → `objectFrom` → `objectDelay` → `text` → `objectSize` → `fontStyle` → `colorMap` → `colorMode` → `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `objectCount` | `number` | `3` | 物体数 |
| `objectHTML` | `arrayOrString` | `<div></div>` | HTML |
| `objectJAML` | `dictionary` | 未提供 | JAML |
| `objectRotation` | `numberOrString` | `0` | 自转<br>自转的duration,正数顺方向自转,负数逆方向自转,"auto"看起来不转 |
| `objectGap` | `number` | 未提供 | 间距<br>单位是deg哦 |
| `objectFrom` | `number` | `0` | 起始<br>单位是deg |
| `objectDelay` | `number` | `200` | 延时<br>每个物体动画的延迟,会乘以顺序 |
| `text` | `string` | 未提供 | 文本 |
| `objectSize` | `numberOrString` | 未提供 | 大小<br>Unit: `rem` |
| `fontStyle` | `string` | `font-size:1.6rem` | 字体样式 |
| `colorMap` | `array` | 未提供 | 颜色范围 |
| `colorMode` | `string` | `lch` | 模式<br>选项: `rgb`, `lch`, `hsl`, `lab`, `lrgb` |
| `outer` | `number` | 未提供 | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `100` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | 未提供 | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | `0` | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | `false` | 旋转<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `5000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `cubic-bezier(0.65, 0.19, 0.4, 0.84)` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Object/text carousel spinner. Spins text characters, HTML, or JAML objects around a ring.

Text content takes precedence over `objectHTML` and `objectJAML`.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Text spinner',
        styles: ['layer.spinner.object(text:LOADING;duration:4000;spin:normal;fontStyle:font-size:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Object spinner',
        styles: ['layer.spinner.object(objectCount:6;objectHTML:[⚡,🔥,💧,🌪️,❄️,🌈];duration:5000;spin:normal;objectSize:2rem)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

### `spinner.particles`

<a id="entry-layer-spinner-particles"></a>

粒子

可用环形粒子效果提供装饰性的活动反馈。

在尺寸调整设置过程中，按配置的内外半径创建 canvas 粒子效果；粒子动画与 spin 旋转分别运行。

位置参数顺序: `outer` → `mid` → `inner` → `size` → `width` → `spin` → `duration` → `delay` → `easing` → `animateDeg` → `fixedBackground` → `radialMask` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `outer` | `number` | `90` | 外边缘<br>外侧的边,单位是%,与中边参数互斥,若和内边同时设定则不需要指定宽度 |
| `mid` | `number` | `75` | 中间边缘<br>中边,单位是%,与外边/内边参数互斥,需要配合宽度使用 |
| `inner` | `number` | `70` | 内边缘<br>内边,单位是%,与中边参数互斥,若和外边同时指定,则不需要指定宽度 |
| `size` | `string` | `100%` | 尺寸<br>如果绑定元素不是正方形,spinner就会变成椭圆,如果不想这样,需要指定不是百分比的size |
| `width` | `string` | 未提供 | 宽度<br>若指定宽度,则外边/中边/内边3者指定1个即可 |
| `spin` | `booleanOrString` | `false` | 旋转<br>选项: `false` — 无, `normal` — 顺时针, `reverse` — 逆时针 |
| `duration` | `number` | `10000` | 时长 |
| `delay` | `number` | `0` | 延迟 |
| `easing` | `string` | `linear` | 缓动 |
| `animateDeg` | `booleanOrNumber` | `false` | 动画旋转角度 |
| `fixedBackground` | `boolean` | `false` | 固定背景 |
| `radialMask` | `arrayOrString` | 未提供 | 径向遮罩<br>径向遮罩,由[有,无,有,无]的长度数组组成,长度支持任意单位 |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
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
| `circular` | `boolean` | `true` | 圆形 |
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

Particle system spinner. Renders configurable particles in a circular layout.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Particles',
        styles: ['layer.spinner.particles(countRange:[8,16];sizeRange:[4,12];circular:true;spin:normal;duration:6000)', 'css(position:relative;width:10rem;height:10rem)']
    },
    {
        type: 'indicator',
        cap: 'Sprinkles',
        styles: ['layer.spinner.particles(shape:sprinkle;countRange:[20,30];sizeRange:[6,10];circular:true;spin:normal;duration:4000)', 'css(position:relative;width:10rem;height:10rem)']
    }
];
```

---

## Interactive spinner with reactive controls

Orbit spinner controlled by live input bindings — count, speed, colors, and animation toggle:

```javascript jaml-playground
export default jaml.container(
    { styles: [Styles.layout.autoalign, 'css(gap:0.5rem)'] },
    [
        jaml.indicator('Orbit Spinner', {
            styles: [
                'css(position:relative;width:100%;height:10rem;backgroundColor:{{bg}};border-radius:1rem)',
                Styles.layer.spinner.orbit({
                    spin: '{{spin}}',
                    css: { aspectRatio: '1 / 1', width: 'auto', zIndex: 1 },
                    sphereColor: '{{fg}}',
                    duration: '{{duration}}',
                    sphereCount: '{{count}}'
                })
            ]
        }),
        jaml.input.number('Orbit Count', '{{count}}', { min: 0 }),
        jaml.input.number('Duration', '{{duration}}', { min: 0, step: 500 }),
        jaml.switch('Spin', '{{spin}}'),
        jaml.input.color('Sphere Color', '{{fg}}'),
        jaml.input.color('Background', '{{bg}}')
    ],
    { vars: { fg: jam.colorSet[2].css(), bg: jam.ac[3](1, 0.5, jam.lumiO(44)), duration: 2000, spin: true, count: 3 } }
);
```
