# terrainMaterial

<!-- Generated from native authoring; do not edit. -->

[中文](terrainMaterial.zh.md)

## `terrainMaterial`

<a id="entry-terrainmaterial"></a>

Add tangent-space normal detail to a 3D terrain map.

A simple map maps the image to the full DEM sample-center extent. A regional map uses the image on shared relief surfaces in Solid mode and on featured regions in Wireframe mode. The optional JSON sidecar aligns the image to the shared relief. Elevation shading controls tint independently.

Apply to a map-3d with a DEM. Bake the image against the grid and elevation scale used by that terrain.

The image loads independently of terrain readiness. A missing or invalid image leaves the regular terrain material in use. Removing the plugin releases its material request.

Positional order: `normalMap` → `normalMapMetadata`.

| Argument | Type | Contract |
| --- | --- | --- |
| `normalMap` | `string` | URL of a north-up tangent-space normal image. |
| `normalMapMetadata` | `string` | Optional JSON sidecar URL for a regional map. Set crs to EPSG:4326, normalSpace to tangent, and flipY to true. Set bounds to [west, south, east, north] in longitude and latitude so they cover the shared relief DEM sample centers. |
