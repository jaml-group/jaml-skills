# terrainMaterial

<!-- Generated from native authoring; do not edit. -->

[English](terrainMaterial.md)

## `terrainMaterial`

<a id="entry-terrainmaterial"></a>

为三维地形图添加切线空间法线细节。

简单地图将图像映射到 DEM 采样点中心的完整范围。区域地图在实体模式下将图像应用于共享地形表面，在线框模式下应用于重点区域。可选的 JSON 元数据文件用于将图像与共享地形对齐。高程着色独立控制色调。

用于具有 DEM 的 map-3d。烘焙图像时使用该地形的采样网格和高程比例。

法线图像的加载独立于地形就绪状态。图像缺失或无效时，继续使用常规地形材质。移除插件时会释放对应的材质请求。

位置参数顺序: `normalMap` → `normalMapMetadata`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `normalMap` | `string` | 北向上的切线空间法线图像 URL。 |
| `normalMapMetadata` | `string` | 区域地图可选的 JSON 元数据文件 URL。将 crs 设为 EPSG:4326、normalSpace 设为 tangent、flipY 设为 true。bounds 按 [西边界经度, 南边界纬度, 东边界经度, 北边界纬度] 顺序填写，范围须覆盖共享地形 DEM 的采样点中心。 |
