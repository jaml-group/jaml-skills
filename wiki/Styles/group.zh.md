# group

<!-- Generated from native authoring; do not edit. -->

[English](group.md)

`Styles.group.*` — content presentation and layout presets.

---

## Variants

### `group.bento`

<a id="entry-group-bento"></a>

Bento 模块

为分组中的子项提供独立的块状表面。

添加 bento-group 类，并将内边距、边框、背景和阴影变量传给分组样式表。

可配合原生 grid 或 flex 布局；此样式提供表面外观，不提供数据或导航。

当前 borderRadius 赋值使用了拼写错误的变量；依赖该覆盖值前需验证其效果。

位置参数顺序: `padding` → `borderStyle` → `borderColor` → `borderRadius` → `backgroundColor` → `backgroundImage` → `boxShadow`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `numberOrString` | 内边距<br>Unit: `rem` |
| `borderStyle` | `string` | 边框样式<br>选项: `solid`, `dashed`, `dotted` |
| `borderColor` | `string` | 边框颜色 |
| `borderRadius` | `numberOrString` | 边框圆角<br>Unit: `rem` |
| `backgroundColor` | `string` | 背景颜色 |
| `backgroundImage` | `string` | 背景图片 |
| `boxShadow` | `string` | 阴影 |

Bento-grid layout. Adds `.jam-bento-group` and styles its children from the active theme's `bento` component tokens. Explicit args override those values for one group.

The 1.4.0 runtime wrote `--jam-bento-broder-radius` for the radius override, while the native recipe consumed `--jam-bento-border-radius`; account for that compatibility difference when maintaining older themes.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['group.bento'],
        components: [
            { type: 'card', cap: 'Card 1' },
            { type: 'card', cap: 'Card 2' },
            { type: 'card', cap: 'Card 3' }
        ]
    }
];
```

### `group.gridline`

<a id="entry-group-gridline"></a>

网格线

在分组子项周围绘制相连的网格边框。

应用 gridline 变量，并在尺寸变化时重新计算用于内外边框的渲染位置标记。

子项需已完成布局；grid 或 flex 定位需另行选择。

位置参数顺序: `padding` → `width` → `style` → `rowStyle` → `rowWidth` → `colWidth` → `colStyle` → `color` → `radius` → `backgroundColor` → `outerWidth` → `outerColor` → `outerRadius` → `outerStyle`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `numberOrString` | 内边距<br>Unit: `rem` |
| `width` | `numberOrString` | 宽度<br>Unit: `px` |
| `style` | `string` | 样式<br>选项: `solid`, `dashed`, `dotted` |
| `rowStyle` | `string` | 行样式<br>选项: `solid`, `dashed`, `dotted` |
| `rowWidth` | `numberOrString` | 行分隔线宽度<br>Unit: `px` |
| `colWidth` | `numberOrString` | 列<br>Unit: `px` |
| `colStyle` | `string` | 列样式<br>选项: `solid`, `dashed`, `dotted` |
| `color` | `string` | 颜色 |
| `radius` | `numberOrString` | 圆角<br>Unit: `rem` |
| `backgroundColor` | `string` | 背景颜色 |
| `outerWidth` | `numberOrString` | 外框<br>Unit: `px` |
| `outerColor` | `string` | 外框颜色 |
| `outerRadius` | `numberOrString` | 外框圆角<br>Unit: `rem` |
| `outerStyle` | `string` | 外框样式<br>选项: `solid`, `dashed`, `dotted` |

Grid line separators between children. Adds `.jam-gridline-group` and recalculates child positions on resize. Explicit args override the active theme's `gridline` component tokens for one group.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['group.gridline(color:var(--jam-color-primary-subtle);width:2)'],
        components: [
            { type: 'label', cap: 'Item A' },
            { type: 'label', cap: 'Item B' },
            { type: 'label', cap: 'Item C' }
        ]
    },
    {
        type: 'container',
        styles: ['group.gridline'],
        components: [
            { type: 'label', cap: 'Default color' },
            { type: 'label', cap: 'Item 2' }
        ]
    }
];
```

### `group.stripy`

<a id="entry-group-stripy"></a>

奇偶交替

在已渲染的分组中交替使用不同表面。

应用奇偶背景变量，并在尺寸变化时重新计算渲染位置标记。

表格单元格可使用 table.stripy；此预设装饰分组子项。

位置参数顺序: `padding` → `borderRadius` → `odd` → `even`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `padding` | `numberOrString` | 内边距<br>Unit: `rem` |
| `borderRadius` | `numberOrString` | 边框圆角<br>Unit: `rem` |
| `odd` | `string` | 奇数 |
| `even` | `string` | 偶数 |

Alternating odd/even child styling. Adds `.jam-stripy-group` and recalculates odd/even positions on resize. Explicit args override the active theme's `stripy` component tokens for one group.

The native recipe starts with zero gap, but the value is not forced with `!important`, so a caller-applied gap can override it.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['group.stripy'],
        components: [
            { type: 'label', cap: 'Row 1 (odd)' },
            { type: 'label', cap: 'Row 2 (even)' },
            { type: 'label', cap: 'Row 3 (odd)' },
            { type: 'label', cap: 'Row 4 (even)' }
        ]
    }
];
```

### `group.divider`

<a id="entry-group-divider"></a>

分割

使用原生分隔线分隔分组的直接子内容。

在符合条件的直接子项之前维护分隔线元素，随子项增删及方向变化同步更新。图层子项和分隔线子项被排除。

通过宿主上的共享所有权保留一组分隔线；最后一个所有者移除时，会断开观察并销毁所拥有的分隔线。

绘制单元格边框可使用 group.gridline；divider 会创建实际的子元素。

位置参数顺序: `padding` → `direction` → `length` → `width` → `color` → `opacity`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `padding` | `numberOrString` | 未提供 | 内边距<br>Unit: `rem` |
| `direction` | `string` | `horizontal` | 方向<br>支持简写<br>选项: `horizontal`, `vertical` |
| `length` | `numberOrString` | 未提供 | 大小 |
| `width` | `numberOrString` | 未提供 | 宽度 |
| `color` | `string` | 未提供 | 颜色 |
| `opacity` | `number` | 未提供 | 透明度 |

Inserts visible divider elements between existing children and keeps them synchronized as children are added or removed. Adds `.jam-divider-group`. Explicit visual args override the active theme's `divider` component tokens for one group.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['flex(direction:row;gap:0.75rem)', 'group.divider(vertical)'],
        components: [
            { type: 'label', cap: 'Clean design' },
            { type: 'button', cap: 'Submit' }
        ]
    }
];
```

`group.divider` replaces both the removed `group.divided` name and the removed `flex.seperator` variant.

## Built-in tile profiles

Jam-UI attaches group styles to two numbered tile/list profiles. Set the tile's native `variant` param to `1` for striping or `2` for dividers. Themes may replace either exact selector with another group style; see [Theme Stylesheets](../Theme/stylesheets.md#variant-selectors).

## Migration from `Styles.stylize`

`Styles.stylize.*` remains as a deprecated compatibility namespace. New code should use these mappings:

| Deprecated           | Replacement      |
| -------------------- | ---------------- |
| `stylize.bento`      | `group.bento`    |
| `stylize.gridline`   | `group.gridline` |
| `stylize.oddeven`    | `group.stripy`   |
| `stylize.minimalism` | `group.divider`  |

Markdown and JSON are no longer style plugins. Their renderers set the runtime profiles `stylize: 'markdown'` and `stylize: 'json'`; see [Theme Stylize](../Theme/stylize.md#renderer-profiles).

---

## Usage

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['group.bento'],
    components: [
        { type: 'card', cap: 'Card 1' },
        { type: 'card', cap: 'Card 2' }
    ]
};
```
