# terrainStrokes

<!-- Generated from native authoring; do not edit. -->

[English](terrainStrokes.md)

## `terrainStrokes`

<a id="entry-terrainstrokes"></a>

设置区域三维地图的轮廓线、路线和网格样式。

位置参数顺序: `outline` → `route` → `grid`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `outline` | `dictionary` | 区域轮廓线的颜色、不透明度和宽度。 |
| `route` | `dictionary` | 设置 Lychee 路线的颜色、不透明度和宽度。宽度为视图适配后的三维管线完整直径，可使用以 rem 为单位的数字或带 rem 单位的字符串，默认值为 0.1875rem。设为 0 时隐藏管线和普通端点圆点，同时保留连接。 |
| `grid` | `dictionary` | 地图网格的颜色和不透明度。 |
