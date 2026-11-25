# Layer styles

<!-- Generated from native authoring; do not edit. -->

[English](layer.md)

Layer styles append children to the host element, usually with `slot="layer"`, and project them through its shadow layer slot. Geometry and stacking depend on the variant and `zIndex`; the slot alone does not place every layer behind foreground content.

---

## How layers work

Layer nodes belong to the host's light DOM; the shadow slot controls where they are projected. Choose a background, overlay, border or other layer according to the effect and its stacking contract.

Background-layer example:

```
┌─────────────────────────────┐
│  <slot name="layer">         │  ← layer DOM nodes render here
│    [spinner / canvas / ...]  │
│  </slot>                     │
│                              │
│  main content                │  ← cap, icon, value, children
│  (renders on top)            │
└─────────────────────────────┘
```

---

## Rules

### 1. Host needs non-static positioning

Most layer elements are **absolute-positioned**. The host element must have a positioned context — `position: relative` (recommended) or `position: absolute`. Without it, the layer collapses to `0×0` or positions against an unintended ancestor.

```json
{
  "type": "wrapper",
  "styles": [
    "css(position:relative;width:20rem;height:10rem)",
    "layer.canvas.particles(countRange:[20,40])"
  ]
}
```

### 2. Order: size first, layer last

For layers that measure the host when applied, establish sizing and spacing first. This is useful composition order, not a universal ordering requirement:

```
['css(width:20rem;height:20rem)', 'layer.spinner.wave']
```

Set the intended host dimensions explicitly when the effect needs a stable drawing area.

### 3. Keep structural and decorative intent clear

A readable composition can group structural styles before decorative layers and interaction styles. This ordering does not determine paint order; the layer variant and its stacking properties do:

```
recommended order:
  size / padding / margin  →  layout  →  colors / backgrounds  →  layer  →  interact
```

### 4. Square target for circular effects

Use equal `width` and `height` for circular spinner effects when a round result is intended. Scroller patterns can use rectangular hosts:

```json
{ "styles": ["css(width:10rem;height:10rem)", "layer.spinner.wave"] }
```

---

## Layer reference

Layer styles and loading guidance:

| Group               | Doc                           | Description                                                   |
| ------------------- | ----------------------------- | ------------------------------------------------------------- |
| `layer.spinner.*`   | [spinner](./spinner.md)       | Animated spinner/loader effects                               |
| `layer.scroller.*`  | [scroller](./scroller.md)     | Auto-scrolling background patterns                            |
| `layer.canvas.*`    | [canvas](./canvas.md)         | Canvas particle system                                        |
| `layer.follower.*`  | [follower](./follower.md)     | Cursor-following decorative effects (spotlight, glow, shadow) |
| Loading indicators  | [loader](./loader.md)         | Use public spinner layers; the application owns loading state |
| `layer.glare.*`     | [glare](./glare.md)           | Light glare and reflections                                   |
| `layer.watermark.*` | [watermark](./watermark.md)   | Watermark and icon overlays                                   |
| `layer.ribbon.*`    | [ribbon](./ribbon.md)         | Corner ribbon decorations                                     |
| `layer.combo.*`     | [combo](./combo.md)           | Composite spinner/masked combos                               |
| `layer.chart`       | [chart](./chart.md)           | ECharts integration layer                                     |
| `layer.background`  | [background](./background.md) | Background layer                                              |
| `layer.border`      | [border](./border.md)         | Border layer                                                  |
| `layer.css`         | [css](./css.md)               | Arbitrary CSS layer                                           |
| `layer.crosshair`   | [crosshair](./crosshair.md)   | Crosshair locator anchored to the host                        |
| `layer.overlay`     | [overlay](./overlay.md)       | Content overlay layer                                         |

## `layer.glow`

<a id="entry-layer-glow"></a>

发光边缘

为有形状的表面边缘从内外两侧发光，形成霓虹轮廓。

添加全尺寸、不响应指针的图层（zIndex 0）。外层先应用通用的 filter 和 dropShadow 效果，再应用 drop-shadow(offsetX offsetY blur color)。默认的两个内部元素分别将填充（默认透明）裁剪为形状，将描边（默认强调色）裁剪为描边环。自定义 content 会替换这两个元素。

宿主需设置 position:relative。使用 Styles.shape(...) 或 Styles.shape.chamfer(...) 发布 --jam-shape，也可直接传入 shape。切角形状还会发布 --jam-shape-ring。传入 ring 可指定自定义描边轮廓。

与 Styles.shape.chamfer 搭配用于切角面板。宿主不带 filter，因此裁剪为 var(--jam-shape) 并带 backdrop-filter 的背景图层仍可模糊宿主后方内容。

若要让发光向外延伸，请保持宿主和边缘图层不裁剪。自由形状无描边环时，发光仅来自已绘制的填充。默认填充透明，效果不可见。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `shape` → `ring` → `fill` → `stroke` → `color` → `blur` → `offsetX` → `offsetY`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `zIndex` | `number` | `0` |  |
| `dropShadow` | `boolean` | `false` |  |
| `boxShadow` | `string` | 未提供 |  |
| `mask` | `string` | 未提供 |  |
| `filter` | `string` | 未提供 |  |
| `padding` | `string` | 未提供 |  |
| `borderRadius` | `string` | 未提供 |  |
| `transform` | `string` | 未提供 |  |
| `border` | `string` | 未提供 |  |
| `clipPath` | `string` | 未提供 |  |
| `animation` | `string` | 未提供 |  |
| `opacity` | `number` | 未提供 |  |
| `css` | `dictionaryOrString` | 未提供 |  |
| `depth` | `number` | 未提供 |  |
| `class` | `string` | 未提供 |  |
| `attrs` | `dictionary` | 未提供 |  |
| `rotateX` | `number` | 未提供 |  |
| `rotateY` | `number` | 未提供 |  |
| `translateY` | `numberOrString` | 未提供 |  |
| `slot` | `string` | 未提供 |  |
| `content` | `any` | `<span class="jam-edge-fill" style="position:absolute;inset:0;clip-path:var(--jam-edge-shape);background:var(--jam-edge-fill)"></span><span class="jam-edge-ring" style="position:absolute;inset:0;clip-path:var(--jam-edge-ring);background:var(--jam-edge-stroke)"></span>` |  |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` |  |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` |  |
| `shape` | `string` | `var(--jam-shape, none)` | 形状：填充所跟随的 clip-path，默认取宿主的 --jam-shape |
| `ring` | `string` | `var(--jam-shape-ring, polygon(0 0, 0 0, 0 0))` | 描边环：描边所跟随的 clip-path，默认取宿主的 --jam-shape-ring |
| `fill` | `string` | `transparent` | 形状内的填充色 |
| `stroke` | `string` | `var(--jam-ac-color)` | 描边环的颜色 |
| `color` | `string` | `hsla(var(--jam-ac-h), var(--jam-ac-s), var(--jam-ac-l), 0.45)` | 发光或阴影颜色 |
| `blur` | `string` | `0.5rem` | 发光或阴影的模糊半径 |
| `offsetX` | `string` | `0rem` | 阴影水平偏移 |
| `offsetY` | `string` | `0rem` | 阴影垂直偏移 |

## `layer.shade`

<a id="entry-layer-shade"></a>

形状阴影

让有形状的表面（如不规则模态框或切角卡片）投下柔和阴影。

添加全尺寸、不响应指针的图层（zIndex -1）。外层先应用通用的 filter 和 dropShadow 效果，再应用 drop-shadow(offsetX offsetY blur color)。默认的两个内部元素以 fill（默认表面色）绘制形状，并以可选的 stroke 绘制描边环。自定义 content 会替换这两个元素。

宿主需设置 position:relative。使用 Styles.shape(...) 或 Styles.shape.chamfer(...) 发布 --jam-shape，也可直接传入 shape。切角形状还会发布 --jam-shape-ring。传入 ring 可指定自定义描边轮廓。

与 Styles.shape({ path, box: true }) 搭配可得到随宿主缩放的形状，也可与 Styles.shape.chamfer 搭配。宿主保持不裁剪，以便形状外的阴影可见。

若要让投影向外延伸，请保持宿主和边缘图层不裁剪。自由形状无描边环时，阴影图层绘制填充轮廓，投影来自该填充。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `shape` → `ring` → `fill` → `stroke` → `color` → `blur` → `offsetX` → `offsetY`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `zIndex` | `number` | `-1` |  |
| `dropShadow` | `boolean` | `false` |  |
| `boxShadow` | `string` | 未提供 |  |
| `mask` | `string` | 未提供 |  |
| `filter` | `string` | 未提供 |  |
| `padding` | `string` | 未提供 |  |
| `borderRadius` | `string` | 未提供 |  |
| `transform` | `string` | 未提供 |  |
| `border` | `string` | 未提供 |  |
| `clipPath` | `string` | 未提供 |  |
| `animation` | `string` | 未提供 |  |
| `opacity` | `number` | 未提供 |  |
| `css` | `dictionaryOrString` | 未提供 |  |
| `depth` | `number` | 未提供 |  |
| `class` | `string` | 未提供 |  |
| `attrs` | `dictionary` | 未提供 |  |
| `rotateX` | `number` | 未提供 |  |
| `rotateY` | `number` | 未提供 |  |
| `translateY` | `numberOrString` | 未提供 |  |
| `slot` | `string` | 未提供 |  |
| `content` | `any` | `<span class="jam-edge-fill" style="position:absolute;inset:0;clip-path:var(--jam-edge-shape);background:var(--jam-edge-fill)"></span><span class="jam-edge-ring" style="position:absolute;inset:0;clip-path:var(--jam-edge-ring);background:var(--jam-edge-stroke)"></span>` |  |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` |  |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` |  |
| `shape` | `string` | `var(--jam-shape, none)` | 形状：填充所跟随的 clip-path，默认取宿主的 --jam-shape |
| `ring` | `string` | `var(--jam-shape-ring, polygon(0 0, 0 0, 0 0))` | 描边环：描边所跟随的 clip-path，默认取宿主的 --jam-shape-ring |
| `fill` | `string` | `var(--jam-color-surface-default)` | 形状内的填充色 |
| `stroke` | `string` | `transparent` | 描边环的颜色 |
| `color` | `string` | `hsla(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.5), 10%, calc(var(--jam-lumi-a-base) + var(--jam-lumi-a-dev) * 24))` | 发光或阴影颜色 |
| `blur` | `string` | `1rem` | 发光或阴影的模糊半径 |
| `offsetX` | `string` | `0rem` | 阴影水平偏移 |
| `offsetY` | `string` | `0.375rem` | 阴影垂直偏移 |

## `layer.progress`

<a id="entry-layer-progress"></a>

进度图层

通过宿主上的半透明填充显示实际进度。

在图层插槽中创建原生 progress 元素，使用所配置的 value 和 indeterminate 模式。基础形式根据所配置的 inset 覆盖宿主。垂直样式可以改变填充方向。

为宿主提供可用几何尺寸，并根据应用状态更新 value 或 indeterminate。值遵循 progress 元素约定：数字比例或百分比字符串。

保存所创建的 progress 子节点，并在插件拆卸时销毁它，同时清除宿主和子节点的插件数据。

用于与应用工作关联的确定或不确定进度；不表示进度值时选择装饰性旋转图层。styles 用于定制所创建的 progress 子节点。

图层不会发现待完成工作，也不会自行更新其值。不确定模式保留已存储的值，供恢复确定模式时使用。

位置参数顺序: `value` → `indeterminate` → `vertical` → `inset` → `opacity` → `color` → `styles`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `value` | `numberOrString` | `0` | 进度 |
| `indeterminate` | `boolean` | `false` | 不确定进度 |
| `vertical` | `boolean` | `false` | 垂直 |
| `inset` | `string` | `0` | 内缩 |
| `opacity` | `number` | `0.25` | 透明度 |
| `color` | `string` | 未提供 | 颜色 |
| `styles` | `array` | `[]` | 进度条样式 |

## `layer.progress.bar`

<a id="entry-layer-progress-bar"></a>

底部进度条

通过宿主底部的细条显示实际进度。

在图层插槽中创建原生 progress 元素，使用所配置的 value 和 indeterminate 模式。条形形式设置固定高度并底部对齐。垂直样式可以改变填充方向。

为宿主提供可用几何尺寸，并根据应用状态更新 value 或 indeterminate。值遵循 progress 元素约定：数字比例或百分比字符串。

保存所创建的 progress 子节点，并在插件拆卸时销毁它，同时清除宿主和子节点的插件数据。

用于与应用工作关联的确定或不确定进度；不表示进度值时选择装饰性旋转图层。styles 用于定制所创建的 progress 子节点。

图层不会发现待完成工作，也不会自行更新其值。不确定模式保留已存储的值，供恢复确定模式时使用。

位置参数顺序: `value` → `indeterminate` → `vertical` → `inset` → `opacity` → `color` → `styles` → `height`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `value` | `numberOrString` | `0` | 进度 |
| `indeterminate` | `boolean` | `false` | 不确定进度 |
| `vertical` | `boolean` | `false` | 垂直 |
| `inset` | `string` | `0` | 内缩 |
| `opacity` | `number` | `1` | 透明度 |
| `color` | `string` | 未提供 | 颜色 |
| `styles` | `array` | `[]` | 进度条样式 |
| `height` | `string` | `0.25rem` | 高度 |
