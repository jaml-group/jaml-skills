# common.grid

<!-- Generated from native authoring; do not edit. -->

[English](grid.md)

`Styles.grid.*` — CSS grid container properties.

---

## Variants

### `grid`

<a id="entry-grid"></a>

网格

为路径选中的目标配置网格相关参数。

将 templateColumns、templateRows、autoColumns、autoRows 和 templateAreas 映射到对应的 CSS 网格属性；gap 保持为 gap，area 使用 gridArea，除非所属路径覆盖其 CSS 键。

另行在网格容器上设置 display:grid，例如使用 css(display:grid)。使用 grid.area 显式指定网格项的行列位置。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `templateColumns` → `templateRows` → `autoColumns` → `autoRows` → `templateAreas` → `gap` → `area`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `templateColumns` | `string` | 列模板 |
| `templateRows` | `string` | 行模板 |
| `autoColumns` | `string` | 自动列 |
| `autoRows` | `string` | 自动行 |
| `templateAreas` | `string` | 模板区域 |
| `gap` | `string` | 间隙 |
| `area` | `string` | 网格区域 |

The base helper maps track and area arguments to CSS grid properties. Set `display:grid` on the container separately; `grid.area` maps row/column placement on its items.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['css(display:grid)', 'grid(templateColumns:1fr 1fr 1fr;gap:1rem)'],
        components: [
            { type: 'label', cap: 'A' },
            { type: 'label', cap: 'B' },
            { type: 'label', cap: 'C' }
        ]
    }
];
```

### `grid.area`

<a id="entry-grid-area"></a>

网格区域

按 grid-area 简写的顺序指定；Styles.layout.gridpos 则按左/上/宽/高指定位置

按网格起始坐标和跨越数量放置网格项。

写入 grid-row-start、grid-column-start，以及用 span 指定的行、列结束位置。

目标必须是网格项；工厂会直接插入跨越数量，因此应提供有意义的值。

应用于网格项；网格轨道定义由父元素负责。

位置参数顺序: `rowStart` → `colStart` → `rowSpan` → `colSpan`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `rowStart` | `number` | 行开始 |
| `colStart` | `number` | 列开始 |
| `rowSpan` | `number` | 行结束 |
| `colSpan` | `number` | 列结束 |

Explicit grid placement for an item using row and column start/span.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Grid item',
        styles: ['grid.area(rowStart:1;colStart:2;rowSpan:1;colSpan:2)']
    }
];
```

## `grid.virtualScroll`

<a id="entry-grid-virtualscroll"></a>

固定行高网格虚拟滚动

对组件子项组成的规则网格进行虚拟化。

通过组件的子项渲染控制器使用 SaigonGrid，预留固定行高，仅挂载可见单元格及缓冲区中的单元格，同时保留组件身份。

需要由组件管理的子项、大于零的固定高度，以及具有规则网格列和明确边界的滚动视口。

高度可变的纵向内容可使用 layout.lazyload；原生表格行可使用 table.fixedrowheight。

单元格位置由网格控制器管理；任意的单元格跨行和自由定位不适合其规则行模型。

位置参数顺序: `height` → `gap` → `buffer` → `scrollTarget`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `height` | `numberOrString` | `2.5rem` | 行高<br>Unit: `rem`<br>支持简写 |
| `gap` | `numberOrString` | 未提供 | 网格间隙<br>Unit: `rem` |
| `buffer` | `number` | `2` | 视口外保留行数 |
| `scrollTarget` | `string` | 未提供 | 滚动目标 |
