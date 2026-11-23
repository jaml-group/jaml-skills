# terrainMaterial

<!-- Generated from native authoring; do not edit. -->

[English](terrainMaterial.md)

## `terrainMaterial`

<a id="entry-terrainmaterial"></a>

设置区域地形的材质预设，并为三维地形添加可选的切线空间法线细节。

简单地图将图像映射到 DEM 采样点中心的完整范围。区域地图在实体模式下将图像应用于共享地形表面，在线框模式下应用于重点区域。可选的 JSON 元数据文件用于将图像与共享地形对齐。高程着色独立控制色调。

用于具有 DEM 的 map3d。若提供法线贴图，请使用该地形的采样网格和高程比例烘焙。

法线图像的加载独立于地形就绪状态。图像缺失或无效时，保留地形材质预设，仅省略法线细节。移除插件时会释放对应的材质请求。

位置参数顺序: `normalMap` → `normalMapMetadata` → `finish` → `surface` → `side` → `bottom` → `bevel` → `colors` → `tuner` → `grayed` → `context` → `elevationHighlight`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `normalMap` | `string` | 北向上的切线空间法线图像 URL。 |
| `normalMapMetadata` | `string` | 区域地图可选的 JSON 元数据文件 URL。将 crs 设为 EPSG:4326、normalSpace 设为 tangent、flipY 设为 true。bounds 按 [西边界经度, 南边界纬度, 东边界经度, 北边界纬度] 顺序填写，范围须覆盖共享地形 DEM 的采样点中心。 |
| `finish` | `string` | 重点地形的材质预设。contours 用分层等高线构成地形，各层之间留空。区域地图还可选择 matte、alabaster、gloss、gemstone、jello、clay 或 wireframe。将地图的 backgroundMode 设为 contours 可为背景地形选择等高线。显式设置的 surface、side、bottom 和 bevel 会覆盖预设中的对应值。 |
| `surface` | `dictionary` |  |
| `side` | `dictionary` |  |
| `bottom` | `dictionary` | 区域地图中重点区域底面的样式。opacity 取值为 0 到 1，并与调色板颜色的不透明度相乘。 |
| `bevel` | `dictionary` | 设置 colored 或 grayed 板块的默认倒角。每层可将 scope 设为 off、perimeter 或 slab，将 topRadius 和 bottomRadius 设为底座厚度的比例，并使用 flatOnly。底部倒角仅在 Flat 模式绘制。 |
| `colors` | `array` | 着色区域的有序调色板，使用可解析的纯色或颜色令牌。当前配色方法为各区域分配颜色。调色板的 Alpha 值与板块不透明度相乘。 |
| `tuner` | `functionOrString` | 着色调色板使用的命名调色器或回调，规则与 Styles.echarts.map 相同。 |
| `grayed` | `dictionary` | 设置灰显区域的有序调色板、可选的 tuner 和整体 opacity。调色板使用可解析的纯色或颜色令牌，单色可使用 color。solid 和 wireframe 各自设置对应模式的颜色和不透明度。 |
| `context` | `dictionary` |  |
| `elevationHighlight` | `number` |  |
