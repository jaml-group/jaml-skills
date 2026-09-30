# common.background

<!-- Generated from native authoring; do not edit. -->

[English](background.md)

`Styles.background.*` — background styling with extended variants.

---

## Variants

### `background`

<a id="entry-background"></a>

背景

为路径选中的目标设置背景绘制。

组合 image、position、size、repeat、attachment、color 或 CSS background 简写。

简单填充使用 background.color 或语义化预设；需要保留无关的背景细分属性时，应避免使用简写。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `image` → `position` → `size` → `repeat` → `attachment` → `color` → `background`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `image` | `arrayOrString` | 图片<br>`{"cssKey":"backgroundImage"}` |
| `position` | `arrayOrString` | 位置<br>`{"cssKey":"backgroundPosition"}` |
| `size` | `arrayOrString` | 尺寸<br>`{"cssKey":"backgroundSize"}` |
| `repeat` | `arrayOrString` | 重复<br>`{"cssKey":"backgroundRepeat"}` |
| `attachment` | `string` | 背景附着方式<br>`{"cssKey":"backgroundAttachment"}` |
| `color` | `string` | 背景色<br>`{"cssKey":"backgroundColor"}` |
| `background` | `arrayOrString` | 背景色<br>支持简写<br>`{"cssKey":"background"}` |

Base background with color, image, size, position, and repeat.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.primary', 'color.on.primary'],
        components: [{ type: 'label', cap: 'Solid background' }]
    }
];
```

### Semantic background presets

These no-argument paths set a theme-owned colored or surface background. When a colored family is used as the background, pair it with the matching `color.on.*` foreground.

| Path                    | Color token                      | Description                   |
| ----------------------- | -------------------------------- | ----------------------------- |
| `background.primary`    | `--jam-color-primary-default`    | Primary colored background    |
| `background.secondary`  | `--jam-color-secondary-default`  | Secondary colored background  |
| `background.tertiary`   | `--jam-color-tertiary-default`   | Tertiary colored background   |
| `background.quaternary` | `--jam-color-quaternary-default` | Quaternary colored background |
| `background.neutral`    | `--jam-color-neutral-default`    | Neutral colored background    |
| `background.elevated`   | `--jam-color-elevated-default`   | Elevated surface treatment    |
| `background.highest`    | `--jam-color-surface-highest`    | Highest surface level         |
| `background.higher`     | `--jam-color-surface-higher`     | Higher surface level          |
| `background.default`    | `--jam-color-surface-default`    | Default surface level         |
| `background.lower`      | `--jam-color-surface-lower`      | Lower surface level           |
| `background.lowest`     | `--jam-color-surface-lowest`     | Lowest surface level          |

### `tint`

<a id="entry-background-tint"></a>

色调

应用根路径上由强调色派生的染色填充。

使用局部强调色和明度辅助函数计算背景色，可调整强度。

根路径 background.tint 扩展不同于嵌套的 background.tint 预设，后者选择主题的 tint-default 变量。此扩展不修改主题变量。

位置参数顺序: `intense`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `intense` | `number` | `0.015` | 强度<br>支持简写 |

Applies a computed tint using the accent color. This established root path is an intensity effect; the compact CSS value `background:tint` instead resolves directly to `--jam-color-tint-default`. See [css / state-prefixed CSS](css.md#property-aware-token-values).

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.tint(intense:0.02)'],
        components: [{ type: 'label', cap: 'Tinted' }]
    }
];
```

### `crystal`

<a id="entry-background-crystal"></a>

水晶

绘制基于强调色的水晶式渐变表面。

添加 crystal 背景类，叠加线性和径向渐变，并在 dark 祖先下使用不同规则。

与清晰可读的前景色角色及合适尺寸组合；效果使用 background-image，而非子图层。

Crystal effect via a CSS class (`background-crystal`). No arguments.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.crystal()'],
        components: [{ type: 'label', cap: 'Crystal' }]
    }
];
```

### `glassify`

<a id="entry-background-glassify"></a>

玻璃

创建半透明的玻璃式表面。

设置半透明背景、径向高光图像、背景位置和缩放，以及背景模糊。

目标后方需要有可见内容，背景模糊才能体现效果。

此辅助函数仅提供绘制属性，不创建图层、不建立布局，也不保证前景对比度。

Glass morphism background with blur and opacity. No arguments; applies preset glass styles.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.glassify()'],
        components: [{ type: 'label', cap: 'Glass morphism' }]
    }
];
```

### `gradient`

<a id="entry-background-gradient"></a>

渐变

根据路径生成用于背景绘制或遮罩的渐变。

background.gradient 写入 background-image；mask.gradient 写入 mask-image。两者都根据指定的 type、arg 和 stops 构建 CSS 渐变文本。

背景渐变用于可见颜色，遮罩渐变用于使渲染目标渐隐；两者效果不同。

提供符合渐变类型的 arg。共享构建器检查类型名中小写的 linear，因此 repeatingLinear 应通过 arg 指定角度，不应依赖 deg。

位置参数顺序: `deg` → `arg` → `stops` → `type`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `deg` | `numberOrString` | 未提供 | 角度<br>Unit: `deg` |
| `arg` | `string` | 未提供 | 位置参数 |
| `stops` | `array` | `["hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.28), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 46), 0.65)","50%","hsla(calc(var(--jam-ac-h) * 1.2), calc(var(--jam-ac-s) * 0.42), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 45), 0.95)","hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.43), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 44), 0.45)"]` | 渐变色标 |
| `type` | `string` | `linear` | 样式<br>选项: `linear` — 线性, `radial` — 径向, `conic` — 锥形, `repeatingLinear` — 重复线性, `repeatingRadial` — 重复径向, `repeatingConic` — 重复锥形 |

Standard gradient background.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient(deg:180;type:linear)'],
        components: [{ type: 'label', cap: 'Gradient bg' }]
    }
];
```

### `gradient.corner`

<a id="entry-background-gradient-corner"></a>

角落

应用装饰性的角落渐变预设。

设置线性背景渐变，使表面的大部分保持透明，并强调倾斜的角落。

透明部分需要显露特定表面时，与基础背景色组合。

此样式写入 background-image；应与其他 background-image 样式协调。

位置参数顺序: `deg`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `deg` | `number` | `166` | 角度<br>Unit: `deg` |

Corner gradient with a subtle highlight angle.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient.corner(deg:160)'],
        components: [{ type: 'label', cap: 'Corner gradient' }]
    }
];
```

### `gradient.aurora`

<a id="entry-background-gradient-aurora"></a>

极光

应用装饰性的极光渐变预设。

设置从透明渐变到强调色的线性背景渐变，可调整角度。

透明部分需要显露特定表面时，与基础背景色组合。

此样式写入 background-image；应与其他 background-image 样式协调。

位置参数顺序: `deg`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `deg` | `number` | `-15` | 角度<br>Unit: `deg` |

Aurora-like gradient with a shallow angle.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient.aurora(deg:-15)'],
        components: [{ type: 'label', cap: 'Aurora' }]
    }
];
```

### `gradient.concave`

<a id="entry-background-gradient-concave"></a>

凹面

应用装饰性的凹面渐变预设。

设置基于强调色的径向渐变，放大背景尺寸并偏移位置。

透明部分需要显露特定表面时，与基础背景色组合。

此样式写入 background-image；应与其他 background-image 样式协调。

Concave / depth gradient with a radial shadow effect. No arguments.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['background.gradient.concave()'],
        components: [{ type: 'label', cap: 'Concave' }]
    }
];
```

### `stripy`

<a id="entry-background-stripy"></a>

条纹

绘制重复的条纹图案。

构建重复线性渐变条带；同时提供时，color 和 width 优先于显式 stops。fixed 选择固定的背景附着方式。

此样式还发布背景角度变量，供配合的效果使用。

此样式绘制条纹，不创建覆盖图层，也不管理布局。

位置参数顺序: `deg` → `color` → `width` → `gap` → `stops` → `fixed`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `deg` | `number` | `135` | 角度<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)` | 颜色 |
| `width` | `string` | 未提供 | 宽度 |
| `gap` | `string` | 未提供 | 间距 |
| `stops` | `array` | `["transparent","0.15rem","hsla(var(--jam-ac-h), var(--jam-ac-s), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 40), 0.25)","0.15rem"]` | 颜色和宽度 |
| `fixed` | `boolean` | `false` | 固定 |

Striped pattern background.

Explicit stops override the color/width/gap composition.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.stripy(deg:135;color:var(--jam-ac-color);width:0.25rem)'],
        components: [{ type: 'label', cap: 'Stripes' }]
    }
];
```

### `bubbles`

<a id="entry-background-bubbles"></a>

梦幻泡泡

需要滚动动画时，请使用 `Styles.layer.scroller.bubbles`。

绘制由渐变气泡组成的装饰图案。

构建随机的径向渐变，并在应用时根据宿主高度计算气泡尺寸。

宿主需要可测量的高度以转换尺寸。

此样式生成背景绘制，不生成气泡 DOM 或动画；不会安装尺寸变化时重新生成的监听器。

位置参数顺序: `bubbleSize` → `bubbleCount` → `countRange` → `sizeRange` → `blurRange` → `alphaRange` → `hueRange` → `satuRange` → `lumiRange` → `allowOverflowY` → `allowOverflowX`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
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

Bubble pattern background using multiple radial gradients.

An explicit bubble count overrides the count range.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.bubbles(bubbleSize:1;bubbleCount:15)'],
        components: [{ type: 'label', cap: 'Bubbles' }]
    }
];
```

### `ribbon`

<a id="entry-background-ribbon"></a>

彩带

为目标提供带有缺口的彩带外形和强调色渐变。

设置多边形 clip-path 和基于强调色的水平背景图像。

裁剪作用于整个渲染目标，包括内容。应为固定尺寸的缺口留出空间。

Ribbon pattern with a clipped polygon shape and gradient. No arguments.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.ribbon()'],
        components: [{ type: 'label', cap: 'Ribbon' }]
    }
];
```

### `grid`

<a id="entry-background-grid"></a>

网格

绘制网格线，不添加布局轨道或 DOM。

构建两个相互垂直的重复线性渐变；线宽、间距和可选的整体单元尺寸决定图案。

用作视觉背景。实际子元素定位使用网格布局辅助函数。

提供的 size 转为减去线宽后的 gap。

位置参数顺序: `deg` → `color` → `width` → `gap` → `gapX` → `gapY` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `deg` | `numberOrString` | `90` | 角度<br>Unit: `deg` |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.1), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 10), 0.075)` | 颜色 |
| `width` | `string` | `0.0625rem` | 宽度 |
| `gap` | `string` | `3.125rem` | 间距 |
| `gapX` | `string` | 未提供 | X轴间距 |
| `gapY` | `string` | 未提供 | Y轴间距 |
| `size` | `string` | 未提供 | 宽度 |

Grid pattern background with perpendicular lines.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.grid(gap:3rem;color:rgba(255,255,255,0.1);width:1px)'],
        components: [{ type: 'label', cap: 'Grid pattern' }]
    }
];
```

### `chess`

<a id="entry-background-chess"></a>

棋盘

绘制重复的棋盘格背景。

根据配置的颜色构建重复锥形图案，并将图块尺寸设为 size 的两倍。

用于装饰图案或类似透明背景的底纹；将 background-image 的管理职责留给此图案，或显式组合图像层。

位置参数顺序: `color` → `color2` → `color3` → `color4` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.5), var(--jam-ac-l), 0.05)` | 颜色 |
| `color2` | `string` | `transparent` | 颜色2 |
| `color3` | `string` | 未提供 | 颜色3 |
| `color4` | `string` | 未提供 | 颜色4 |
| `size` | `string` | `25%` | 宽度 |

Checkerboard pattern background.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.chess(color:var(--jam-ac-color);color2:transparent;size:25%)'],
        components: [{ type: 'label', cap: 'Checkerboard' }]
    }
];
```

## `background.size`

<a id="entry-background-size"></a>

尺寸

将 `value` 写入 `background-size`。

需要同时配置多个相关属性时，使用完整的 background 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `arrayOrString` | 尺寸 |

## `background.color`

<a id="entry-background-color"></a>

背景色

将 `value` 写入 `background-color`。

需要同时配置多个相关属性时，使用完整的 background 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 背景色 |

## `background.image`

<a id="entry-background-image"></a>

图片

将 `value` 写入 `background-image`。

需要同时配置多个相关属性时，使用完整的 background 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `arrayOrString` | 图片 |

## `background.lower`

<a id="entry-background-lower"></a>

较低

background.lower 选择 surface.lower 填充变量；border.lower 使用 surface.lower 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.higher`

<a id="entry-background-higher"></a>

较高

background.higher 选择 surface.higher 填充变量；border.higher 使用 surface.higher 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.lowest`

<a id="entry-background-lowest"></a>

最低

background.lowest 选择 surface.lowest 填充变量；border.lowest 使用 surface.lowest 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.repeat`

<a id="entry-background-repeat"></a>

重复

将 `value` 写入 `background-repeat`。

需要同时配置多个相关属性时，使用完整的 background 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `arrayOrString` | 重复 |

## `background.default`

<a id="entry-background-default"></a>

默认

根据 sys.color.surface.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.highest`

<a id="entry-background-highest"></a>

最高

background.highest 选择 surface.highest 填充变量；border.highest 使用 surface.highest 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.neutral`

<a id="entry-background-neutral"></a>

中性

根据 sys.color.neutral.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.primary`

<a id="entry-background-primary"></a>

主色

background.primary 选择 primary.default 填充变量；border.primary 使用 primary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.elevated`

<a id="entry-background-elevated"></a>

抬升

根据 sys.color.elevated.default 设置 background-color。

将填充与适合该表面的前景色角色配合使用。根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.position`

<a id="entry-background-position"></a>

位置

将 `value` 写入 `background-position`。

需要同时配置多个相关属性时，使用完整的 background 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `arrayOrString` | 位置 |

## `background.tertiary`

<a id="entry-background-tertiary"></a>

第三色

background.tertiary 选择 tertiary.default 填充变量；border.tertiary 使用 tertiary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.secondary`

<a id="entry-background-secondary"></a>

次色

background.secondary 选择 secondary.default 填充变量；border.secondary 使用 secondary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `background.attachment`

<a id="entry-background-attachment"></a>

背景附着方式

将 `value` 写入 `background-attachment`。

需要同时配置多个相关属性时，使用完整的 background 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 背景附着方式 |

## `background.quaternary`

<a id="entry-background-quaternary"></a>

第四色

background.quaternary 选择 quaternary.default 填充变量；border.quaternary 使用 quaternary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。
