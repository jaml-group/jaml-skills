# LycheeLine — SVG Connection Lines

`LycheeLine` draws SVG connections between elements or explicit `EndiveElement` magnets. It is exposed globally as `lychee` for owner-to-owner connections; the exported class provides lower-level route, layout, and endpoint-editing APIs.

## Global API: `lychee.*`

| Method | Description |
|---|---|
| `lychee.connect(startEl, endEl, options?)` | Create or update the connection between two `AbstractElement` owners. |
| `lychee.disconnect(startEl, endEl, animatedly?)` | Remove the connection between two owners. |
| `lychee.redraw(el, options?)` | Redraw every connection attached to one owner. |
| `lychee.redraw(startEl, endEl, options?)` | Redraw one owner-to-owner connection. |
| `lychee.remove(el, animatedly?)` | Remove every connection attached to one owner. |
| `lychee.remove(startEl, endEl, animatedly?)` | Remove one owner-to-owner connection. |
| `lychee.removeAll(animatedly?)` | Remove all connections. |
| `lychee.redrawAll()` | Redraw all connections. |

## `LineOption`

| Option | Type | Default | Description |
|---|---|---|---|
| `color` | `string` | Accent-derived | Line color. |
| `width` | `number` | `2` | Line width in pixels. |
| `hoverColor` | `string` | Accent-derived when removable | Highlighted line color. |
| `hoverWidth` | `number` | `width * 1.5` when removable | Highlighted line width. |
| `hitWidth` | `number` | `0` | Extra invisible pointer target width in pixels. |
| `type` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Stroke type. `style` remains as a deprecated alias. |
| `shadow` | `ShadowToken \| ShadowValue \| false` | `false` | Optional SVG drop shadow. |
| `container` | `HTMLElement \| string` | Common ancestor | Stable container for the SVG layer. |
| `path` | `'polyline' \| 'catmullRom' \| 'smooth'` | `'catmullRom'` | Route interpolation. |
| `endTangent` | `'center' \| 'edge' \| 'path'` | `'center'` | How endpoint marker tangents are resolved. |
| `tension` | `number` | `0.5` | Catmull-Rom curve tension. |
| `lengthFactor` | `number` | `0.6` | Smooth-path control-point distance factor. |
| `angleFactor` | `number` | `80` | Smooth-path control offset for steep angles. |
| `startSymbol` / `endSymbol` | `SymbolType` | `'none'` | Endpoint marker. |
| `startSymbolSize` / `endSymbolSize` | `number` | `6` | Marker size. |
| `startGap` / `endGap` | `number` | `0` | Endpoint gap in pixels. Markers may increase it. |
| `animation` | `boolean \| 'default' \| 'reverse'` | `false` | Animate the dash flow; `'reverse'` flips its direction. |
| `label` | `string` | — | Text displayed on the line. |
| `labelPosition` | `LabelPositionKey` | `'cm'` | Label placement shortcode. |
| `labelColor` | `string` | Line color | Label color. |
| `labelSize` | `number` | `12` | Label font size in pixels. |
| `labelShadow` | `string` | — | Label `text-shadow`. |
| `labelOffsetX` / `labelOffsetY` | `number` | `0` | Label offset in pixels. |
| `labelSpacing` | `number` | `0` | Label letter spacing. |
| `labelStroke` | `string \| boolean` | — | Stroke color; `true` selects a contrasting color. |
| `anchors` | `AnchorPairKey` | `'auto'` | Owner anchor pair shortcode. |
| `startAnchor` / `endAnchor` | `string` | `'auto'` | Named side or percentage coordinate such as `'50% 100%'`. |
| `midpoints` | `readonly { along: number; across: number }[]` | `[]` | Route points relative to the endpoint baseline. |
| `removable` | `boolean` | `false` | Show the close control on hover. |
| `enterDelay` | `number` | `150` | Hover activation delay in milliseconds. |
| `leaveDelay` | `number` | `250` | Hover deactivation delay in milliseconds. |
| `onclose` | `() => void` | — | Handle the close control. Supplying it enables `removable` unless explicitly disabled. |
| `onremove` | `() => void` | — | Called after the line is removed. |

`SymbolType` is `'none' | 'arrow' | 'triangle' | 'tripleLine' | 'dot' | 'circle' | 'bar' | 'hollowArrow'`.

`LabelPositionKey` combines vertical `u`/`c`/`l` with horizontal `s`/`m`/`e`: `us`, `um`, `ue`, `cs`, `cm`, `ce`, `ls`, `lm`, or `le`.

`AnchorPairKey` is `tt`, `tb`, `bt`, `bb`, `ll`, `lr`, `rl`, `rr`, or `auto`, where each letter selects top, bottom, left, or right.

## Instance API

`lychee.connect(...)`, `LycheeLine.connect(...)`, and `LycheeLine.connectMagnets(...)` return a `LycheeLine`, which extends `EventTarget`.

| Member | Description |
|---|---|
| `highlight(active?)` | Apply or clear hover presentation. |
| `setVisible(visible)` | Show or hide the line layer. |
| `getRoute()` / `setRoute(route)` | Read or replace relative route midpoints. |
| `getRoutePoints()` | Return the current route as container-local coordinates. |
| `toRelativePoint(point)` | Convert a container-local coordinate into `{ along, across }`. |
| `getEndpointMagnet(side)` / `setEndpointMagnet(side, magnet)` | Read or rebind a start/end magnet. |
| `beginEndpointEdit(mode, side?)` | Start a constrained endpoint edit and return `update`, `commit`, and `cancel` controls. Modes are `'ced'` and `'eod'`. |
| `getMiddleSegmentLayout()` | Return upright position/rotation metadata for the middle segment. |
| `getClosestRouteSegmentIndex(point)` | Find the closest route segment. |
| `getLayout(at?)` | Return upright position/rotation metadata at a normalized path location. Default `0.5`. |
| `redraw(options?)` / `setOption(options)` | Redraw or replace processed options. |
| `remove(animatedly?)` | Remove the line and release its SVG resources. |

Lines emit `redraw`, `endpointchange`, and `remove`. The `endpointchange` event detail contains `side`, `magnet`, and `previousMagnet`.

### Magnet connections

Use `LycheeLine.connectMagnets(startMagnet, endMagnet, options?, directionResolver?)` when endpoints are existing `EndiveElement` instances with `type: 'magnet'`. Unlike owner connections, magnet connections do not auto-create or auto-place their endpoints.

## Endpoint creation editor

`LycheeLineEditor` manages the drag-to-connect lifecycle for a new line endpoint:

```ts
const editor = LycheeLineEditor.create(sourceMagnet, {
  container: canvas,
  type: 'dashed',
  endSymbol: 'arrow'
}, {
  resolveDrop: (event, line) => findDropMagnet(event),
  onchange: ({ reason, magnet, previousMagnet }) => {
    console.log(reason, magnet, previousMagnet);
  }
});
```

The required `resolveDrop(event, line)` callback returns the target magnet, or `undefined` to roll back. Options also accept `endpoint`, `onchange`, and `rollbackDuration`. The editor exposes `handle`, `line`, `sourceMagnet`, `endpointMagnet`, and `isConnected`, plus `connect(magnet)`, `reset(animatedly?, notify?)`, and `destroy()`.

## Examples

```ts
const line = lychee.connect(source, target, {
  type: 'dashed',
  path: 'smooth',
  endTangent: 'path',
  endSymbol: 'arrow',
  animation: true,
  label: 'depends on'
});

line.setRoute([
  { along: 0.35, across: -40 },
  { along: 0.7, across: 24 }
]);

const layout = line.getLayout(0.5);
lychee.disconnect(source, target, true);
```
