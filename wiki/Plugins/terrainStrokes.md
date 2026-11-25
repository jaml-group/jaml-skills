# terrainStrokes

<!-- Generated from native authoring; do not edit. -->

[中文](terrainStrokes.zh.md)

## `terrainStrokes`

<a id="entry-terrainstrokes"></a>

Style the outlines, routes and grid of a regional 3D map.

Positional order: `outline` → `route` → `grid`.

| Argument | Type | Contract |
| --- | --- | --- |
| `outline` | `dictionary` | Color, opacity and width of region outlines. |
| `route` | `dictionary` | Color, opacity and width of Lychee routes. Width is the full 3D tube diameter in the fitted view. Supply a number in rem or a rem string. The default is 0.1875rem. Zero hides the tube and ordinary endpoint dots while keeping the connection. |
| `grid` | `dictionary` | Color and opacity of the map grid. |
