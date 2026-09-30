# layer.chart

<!-- Generated from native authoring; do not edit. -->

[中文](chart.zh.md)

`Styles.layer.chart` — ECharts integration layer. Renders a chart as a background or overlay layer.

---

## Args

<a id="entry-layer-chart"></a>

Chart layer

Embed a small decorative chart behind host content.

Creates a chart of the requested type inside the layer and forwards data, dataUrl and chart styles; then appends compact grid and hidden axes, split lines, tooltip, legend, title and labels.

Provide a supported chart type and its data, load the framework chart runtime, and give the host usable size. Supplying aspectRatio clears the default layer width so height can determine its size.

Creates a separate child layer; reverting its style ownership removes the created layer rather than the host.

Configure one layer through its own arguments or css. Applying another layer style creates another child rather than updating the first layer.

The appended hidden-chrome styles follow caller styles, and the layer is pointer-transparent. Use a standalone chart element for interactive data exploration.

Positional order: `type` → `data` → `dataUrl` → `styles` → `width` → `height` → `aspectRatio` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `alignSelf` → `alignItems` → `alignContent` → `justifySelf` → `justifyItems` → `justifyContent` → `align`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `type` | `string` | Not supplied | Chart type<br>Options: `line`, `pie`, `bar`, `scatter`, `radar`, `tree`, `treemap`, `sunburst`, `boxplot`, `candlestick`, `heatmap`, `map`, `parallel`, `sankey`, `funnel`, `gauge`, `pictorialBar`, `themeRiver`, `custom` |
| `data` | `array` | Not supplied | Data |
| `dataUrl` | `string` | Not supplied | Data URL |
| `styles` | `array` | `[]` | Style |
| `width` | `string` | `100%` | Width |
| `height` | `string` | `100%` | Height |
| `aspectRatio` | `string` | Not supplied | Aspect ratio |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `alignSelf` | `string` | Not supplied | Self alignment on the cross axis<br>align-self overrides align-items for an individual item. In Grid, it aligns the item within its grid area; in Flexbox, it aligns the item on the cross axis, perpendicular to the flex direction.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"alignSelf"}` |
| `alignItems` | `string` | Not supplied | Child alignment on the cross axis<br>align-items sets the default align-self for direct children as a group. In Flexbox, it controls cross-axis alignment; in Grid, it controls block-axis alignment within each grid area.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"alignItems"}` |
| `alignContent` | `string` | Not supplied | Content distribution (align-content)<br>align-content distributes space between and around flex lines on the cross axis, or grid tracks on the block axis.<br>Options: `flex-start` — Start, `center` — Center, `flex-end` — End, `space-between` — Space between, `space-around` — Space around, `space-evenly` — Space evenly<br>`{"cssKey":"alignContent"}` |
| `justifySelf` | `string` | Not supplied | Self alignment on the main axis<br>justify-self aligns an individual box on the appropriate axis within its layout container.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"justifySelf"}` |
| `justifyItems` | `string` | Not supplied | Child alignment on the main axis<br>justify-items sets the default justify-self for items, aligning them on the appropriate axis within their boxes.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"justifyItems"}` |
| `justifyContent` | `string` | Not supplied | Main-axis content distribution<br>justify-content distributes space between and around items on a flex container's main axis or a grid container's inline axis.<br>Options: `flex-start` — Start, `center` — Center, `flex-end` — End, `space-between` — Space between, `space-around` — Space around, `space-evenly` — Space evenly<br>`{"cssKey":"justifyContent"}` |
| `align` | `string` | Not supplied | Alignment<br>align is shorthand for setting align-items and align-content together.<br>Shorthand<br>Options: `left-top` — Top left, `center-top` — Top center, `right-top` — Top right, `left-middle` — Middle left, `center-middle` — Center, `right-middle` — Middle right, `left-bottom` — Bottom left, `center-bottom` — Bottom center, `right-bottom` — Bottom right, `around-top` — Space around, top, `around-middle` — Space around, middle, `around-bottom` — Space around, bottom, `evenly-top` — Space evenly, top, `evenly-middle` — Space evenly, middle, `evenly-bottom` — Space evenly, bottom, `between-top` — Space between, top, `between-middle` — Space between, middle, `between-bottom` — Space between, bottom |

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```javascript jaml-playground
export default [
    {
        type: 'indicator',
        cap: 'Line chart',
        styles: ["layer.chart(type:line;data:[{name:'Trend',data:[120,200,150,80,70,110,130]}];width:100%;height:100%)"]
    },
    {
        type: 'indicator',
        cap: 'Pie chart',
        styles: ["layer.chart(type:pie;data:[{name:'Share',data:[{value:40,name:'A'},{value:30,name:'B'},{value:30,name:'C'}]}])"]
    }
];
```
