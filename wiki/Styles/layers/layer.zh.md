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
