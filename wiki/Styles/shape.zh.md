# shape

<!-- Generated from native authoring; do not edit. -->

[English](shape.md)

## `shape`

<a id="entry-shape"></a>

形状

为表面定义唯一轮廓，使其填充、边缘与阴影遵循同一形状。

在宿主上以 --jam-shape 发布轮廓。在元素自身的 styles 中，box:true 会将 0–1 单位的 SVG 路径数据（M、L、H、V、C、S、Q、T、A、Z，绝对或相对）按宿主尺寸缩放，并在尺寸变化时更新轮廓。仅在 clip:true 时裁剪宿主。

通过 layer.glow、layer.shade，或背景图层上的 clip-path: var(--jam-shape) 读取轮廓。宿主保持不裁剪，可让焦点环、准星括角与边缘图层保持完整。在主题样式配方中，使用 box:false 并传入 CSS clip-path 值，或使用 Styles.shape.chamfer。

自由形状发布 `--jam-shape`，并清除继承的描边环。`layer.glow` 沿已绘制的填充发光，`layer.shade` 绘制填充轮廓。未启用 `box` 时，`path()` 使用绝对像素。

位置参数顺序: `path` → `box` → `clip`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `path` | `string` | 未提供 | 轮廓：任意 clip-path 值；box 为 true 时为 0–1 单位的 SVG 路径数据<br>支持简写 |
| `box` | `boolean` | `false` | 在元素自身的样式中，以 0–1 盒单位（objectBoundingBox）让 path 随宿主尺寸缩放 |
| `clip` | `boolean` | `false` | 同时将宿主裁剪为该形状 |

## `shape.chamfer`

<a id="entry-shape-chamfer"></a>

切角形状

为表面的填充、描边和发光定义切角轮廓。

发布 --jam-shape（在所选角上带 45° 切角的多边形）与 --jam-shape-ring（沿轮廓、指定宽度的 even-odd 多边形）。描边环的斜边与直边保持相同宽度。仅在 clip:true 时裁剪宿主。

与 layer.glow 搭配得到发光轮廓，与 layer.shade 搭配得到投影；将半透明背景图层裁剪为 var(--jam-shape) 可得到玻璃效果。紧凑控件需要自身绘制跟随切角时使用 clip:true。

clip:true 时，盒外的 outline 焦点环会被裁剪；请用内收的 outline-offset 或边缘图层在切角内绘制焦点。

位置参数顺序: `corners` → `cut` → `width` → `clip`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `corners` | `string` | `tl tr br bl` | 切角位置：以空格分隔的 tl、tr、br、bl，默认四角 |
| `cut` | `string` | `0.625rem` | 沿每条边的切角尺寸 |
| `width` | `string` | `var(--jam-border-width-xs)` | 所发布描边环的宽度 |
| `clip` | `boolean` | `false` | 同时将宿主裁剪为该形状 |
