# common.gap

<!-- Generated from native authoring; do not edit. -->

[English](gap.md)

`Styles.gap.*` — row and column gap spacing.

---

## Variants

### `gap`

<a id="entry-gap"></a>

间距

设置布局项之间的间距。

设置共用 gap，或单独设置行间距和列间距。

用于支持 gap 的布局；margin 控制外部间距，padding 控制内部间距。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `gap` → `row` → `col`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `gap` | `string` | 外边距<br>支持简写<br>`{"cssKey":"gap"}` |
| `row` | `string` | 行间距<br>`{"cssKey":"rowGap"}` |
| `col` | `string` | 列间距<br>`{"cssKey":"columnGap"}` |

Sets the CSS gap between rows and columns.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(display:flex)', 'gap(row:0.5rem;col:1rem)'],
        components: [
            { type: 'label', cap: 'One' },
            { type: 'label', cap: 'Two' }
        ]
    }
];
```

### Token scale presets

`gap.xxs`, `gap.xs`, `gap.s`, `gap.m`, `gap.l`, `gap.xl`, and `gap.xxl` set both axes from the matching `--jam-space-*` token.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(display:flex)', 'gap.m'],
        components: [
            { type: 'label', cap: 'One' },
            { type: 'label', cap: 'Two' }
        ]
    }
];
```

### `row` and `col`

The atomic paths `gap.row(value)` and `gap.col(value)` set one axis only.



## `gap.l`

<a id="entry-gap-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `gap.m`

<a id="entry-gap-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `gap.s`

<a id="entry-gap-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `gap.xl`

<a id="entry-gap-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `gap.xs`

<a id="entry-gap-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `gap.col`

<a id="entry-gap-col"></a>

列间距

将 `value` 写入 `column-gap`。

需要一起配置多个相关属性时，使用覆盖范围更广的 gap 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 列间距 |

## `gap.row`

<a id="entry-gap-row"></a>

行间距

将 `value` 写入 `row-gap`。

需要一起配置多个相关属性时，使用覆盖范围更广的 gap 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 行间距 |

## `gap.xxl`

<a id="entry-gap-xxl"></a>

超大

gap.xxl、margin.xxl 和 padding.xxl 使用 xxl 间距变量；text.size.xxl 使用 xxl 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `gap.xxs`

<a id="entry-gap-xxs"></a>

超小

gap.xxs、margin.xxs 和 padding.xxs 使用 xxs 间距变量；text.size.xxs 使用 xxs 字号变量。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。
