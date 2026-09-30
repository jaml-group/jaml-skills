# common.border

<!-- Generated from native authoring; do not edit. -->

[English](border.md)

`Styles.border.*` — border styling.

---

## Variants

### `border`

<a id="entry-border"></a>

边框

设置边框外观和圆角几何结构。

将各边、宽度、样式、颜色和圆角映射到 CSS border 属性。

单独的宽度或颜色不建立可见的边框样式；应结合样式设置，或使用语义化边框预设。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `width` → `topWidth` → `rightWidth` → `bottomWidth` → `leftWidth` → `style` → `topStyle` → `rightStyle` → `bottomStyle` → `leftStyle` → `radius` → `topLeftRadius` → `topRightRadius` → `bottomRightRadius` → `bottomLeftRadius` → `color` → `topColor` → `rightColor` → `bottomColor` → `leftColor` → `border` → `image` → `imageSource` → `imageSlice` → `imageWidth` → `imageOutset` → `imageRepeat`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `string` | 边框宽度<br>`{"cssKey":"borderWidth"}` |
| `topWidth` | `string` | 上边框宽度<br>`{"cssKey":"borderTopWidth"}` |
| `rightWidth` | `string` | 右边框宽度<br>`{"cssKey":"borderRightWidth"}` |
| `bottomWidth` | `string` | 下边框宽度<br>`{"cssKey":"borderBottomWidth"}` |
| `leftWidth` | `string` | 左边框宽度<br>`{"cssKey":"borderLeftWidth"}` |
| `style` | `string` | 边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderStyle"}` |
| `topStyle` | `string` | 上边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderTopStyle"}` |
| `rightStyle` | `string` | 右边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderRightStyle"}` |
| `bottomStyle` | `string` | 下边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderBottomStyle"}` |
| `leftStyle` | `string` | 左边框样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"borderLeftStyle"}` |
| `radius` | `string` | 圆角半径<br>`{"cssKey":"borderRadius"}` |
| `topLeftRadius` | `string` | 左上角半径<br>`{"cssKey":"borderTopLeftRadius"}` |
| `topRightRadius` | `string` | 右上角半径<br>`{"cssKey":"borderTopRightRadius"}` |
| `bottomRightRadius` | `string` | 右下角半径<br>`{"cssKey":"borderBottomRightRadius"}` |
| `bottomLeftRadius` | `string` | 左下角半径<br>`{"cssKey":"borderBottomLeftRadius"}` |
| `color` | `string` | 边框颜色<br>`{"cssKey":"borderColor"}` |
| `topColor` | `string` | 上边框颜色<br>`{"cssKey":"borderTopColor"}` |
| `rightColor` | `string` | 右边框颜色<br>`{"cssKey":"borderRightColor"}` |
| `bottomColor` | `string` | 下边框颜色<br>`{"cssKey":"borderBottomColor"}` |
| `leftColor` | `string` | 左边框颜色<br>`{"cssKey":"borderLeftColor"}` |
| `border` | `string` | 边框<br>支持简写<br>`{"cssKey":"border"}` |
| `image` | `string` | 边框图片 |
| `imageSource` | `string` | 图片源<br>`{"cssKey":"borderImageSource"}` |
| `imageSlice` | `string` | 图片切片<br>`{"cssKey":"borderImageSlice"}` |
| `imageWidth` | `string` | 图片宽度<br>`{"cssKey":"borderImageWidth"}` |
| `imageOutset` | `string` | 图片外延<br>`{"cssKey":"borderImageOutset"}` |
| `imageRepeat` | `string` | 图片重复<br>`{"cssKey":"borderImageRepeat"}` |

Applies border width, style, color, and border-radius to an element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['border(width:0.125rem;style:solid;color:var(--jam-ac-color);radius:0.5rem)']
    }
];
```

The `radius` and `width` arguments accept the semantic scale names. They resolve through `--jam-border-radius-*` and `--jam-border-width-*` respectively.

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Theme geometry',
    styles: ['border(radius:l;width:s;style:solid;color:primary)']
};
```

### Semantic border presets

These no-argument presets apply a solid `--jam-border-width-xs` border whose color follows the active theme.

| Path                | Color token                     | Description                |
| ------------------- | ------------------------------- | -------------------------- |
| `border.highest`    | `--jam-color-surface-highest`   | Highest surface border     |
| `border.higher`     | `--jam-color-surface-higher`    | Higher surface border      |
| `border.default`    | `--jam-color-surface-default`   | Default surface border     |
| `border.lower`      | `--jam-color-surface-lower`     | Lower surface border       |
| `border.lowest`     | `--jam-color-surface-lowest`    | Lowest surface border      |
| `border.subtle`     | `--jam-color-outline-subtle`    | Subtle outline border      |
| `border.muted`      | `--jam-color-outline-muted`     | Muted outline border       |
| `border.faint`      | `--jam-color-outline-faint`     | Faint outline border       |
| `border.primary`    | `--jam-color-primary-subtle`    | Primary semantic border    |
| `border.secondary`  | `--jam-color-secondary-subtle`  | Secondary semantic border  |
| `border.tertiary`   | `--jam-color-tertiary-subtle`   | Tertiary semantic border   |
| `border.quaternary` | `--jam-color-quaternary-subtle` | Quaternary semantic border |

### Border-width presets

`border.xs`, `border.s`, `border.m`, `border.l`, and `border.xl` set only the border width from the matching `--jam-border-width-*` token. Apply one after a semantic border preset when both color and a wider stroke are needed.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['border.primary', 'border.m'],
        components: [{ type: 'label', cap: 'Primary border' }]
    }
];
```

## `border.l`

<a id="entry-border-l"></a>

大

gap.l、margin.l 和 padding.l 使用 l 间距变量；text.size.l 使用 l 字号变量；border.l 只设置边框宽度；shadow.l 和 shadow.primary.l 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.m`

<a id="entry-border-m"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.s`

<a id="entry-border-s"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.xl`

<a id="entry-border-xl"></a>

极大

gap.xl、margin.xl 和 padding.xl 使用 xl 间距变量；text.size.xl 使用 xl 字号变量；border.xl 只设置边框宽度；shadow.xl 和 shadow.primary.xl 设置盒阴影。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.xs`

<a id="entry-border-xs"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.color`

<a id="entry-border-color"></a>

边框颜色

将 `value` 写入 `border-color`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 边框颜色 |

## `border.faint`

<a id="entry-border-faint"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.image`

<a id="entry-border-image"></a>

边框图片

通过生成的原子样式暴露边框 image 参数。

当前边框 image 参数没有 cssKey，而原子样式工厂使用 cssKey 作为输出属性。

当前基线中，不要依赖此原子样式设置 border-image。可通过 css 使用 borderImage，或使用已映射的 imageSource/imageSlice/imageWidth/imageOutset/imageRepeat 原子样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 边框图片 |

## `border.lower`

<a id="entry-border-lower"></a>

较低

background.lower 选择 surface.lower 填充变量；border.lower 使用 surface.lower 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.muted`

<a id="entry-border-muted"></a>

小

gap.s、margin.s 和 padding.s 使用 s 间距变量；text.size.s 使用 s 字号变量；border.s 只设置边框宽度；shadow.s 和 shadow.primary.s 设置盒阴影；shadow.text.s 和 shadow.text.primary.s 设置文本阴影；border.faint 和 border.muted 设置 xs 宽度的实线轮廓角色边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.style`

<a id="entry-border-style"></a>

边框样式

将 `value` 写入 `border-style`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 边框样式 |

## `border.width`

<a id="entry-border-width"></a>

边框宽度

将 `value` 写入 `border-width`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 边框宽度 |

## `border.higher`

<a id="entry-border-higher"></a>

较高

background.higher 选择 surface.higher 填充变量；border.higher 使用 surface.higher 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.lowest`

<a id="entry-border-lowest"></a>

最低

background.lowest 选择 surface.lowest 填充变量；border.lowest 使用 surface.lowest 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.radius`

<a id="entry-border-radius"></a>

圆角半径

将 `value` 写入 `border-radius`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 圆角半径 |

## `border.subtle`

<a id="entry-border-subtle"></a>

极小

gap.xs、margin.xs 和 padding.xs 使用 xs 间距变量；text.size.xs 使用 xs 字号变量；border.xs 只设置边框宽度；shadow.xs 和 shadow.primary.xs 设置盒阴影；shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影；border.subtle 设置 xs 宽度的实线 outline-subtle 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.default`

<a id="entry-border-default"></a>

中等

gap.m、margin.m 和 padding.m 使用 m 间距变量；text.size.m 使用 m 字号变量；border.m 只设置边框宽度；shadow.m 和 shadow.primary.m 设置盒阴影；shadow.text.m 和 shadow.text.primary.m 设置文本阴影；border.default 设置 xs 宽度的实线 surface-default 边框。

先选择属性族，再选择尺度或角色。间距、字体、边框和阴影使用相同后缀，不代表尺寸相同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。仅设置边框宽度的预设需要已有的可见边框样式。

## `border.highest`

<a id="entry-border-highest"></a>

最高

background.highest 选择 surface.highest 填充变量；border.highest 使用 surface.highest 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.primary`

<a id="entry-border-primary"></a>

主色

background.primary 选择 primary.default 填充变量；border.primary 使用 primary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.tertiary`

<a id="entry-border-tertiary"></a>

第三色

background.tertiary 选择 tertiary.default 填充变量；border.tertiary 使用 tertiary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.topColor`

<a id="entry-border-topcolor"></a>

上边框颜色

将 `value` 写入 `border-top-color`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 上边框颜色 |

## `border.topStyle`

<a id="entry-border-topstyle"></a>

上边框样式

将 `value` 写入 `border-top-style`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 上边框样式 |

## `border.topWidth`

<a id="entry-border-topwidth"></a>

上边框宽度

将 `value` 写入 `border-top-width`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 上边框宽度 |

## `border.leftColor`

<a id="entry-border-leftcolor"></a>

左边框颜色

将 `value` 写入 `border-left-color`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 左边框颜色 |

## `border.leftStyle`

<a id="entry-border-leftstyle"></a>

左边框样式

将 `value` 写入 `border-left-style`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 左边框样式 |

## `border.leftWidth`

<a id="entry-border-leftwidth"></a>

左边框宽度

将 `value` 写入 `border-left-width`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 左边框宽度 |

## `border.secondary`

<a id="entry-border-secondary"></a>

次色

background.secondary 选择 secondary.default 填充变量；border.secondary 使用 secondary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.imageSlice`

<a id="entry-border-imageslice"></a>

图片切片

将 `value` 写入 `border-image-slice`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 图片切片 |

## `border.imageWidth`

<a id="entry-border-imagewidth"></a>

图片宽度

将 `value` 写入 `border-image-width`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 图片宽度 |

## `border.quaternary`

<a id="entry-border-quaternary"></a>

第四色

background.quaternary 选择 quaternary.default 填充变量；border.quaternary 使用 quaternary.subtle 和 xs 边框宽度变量添加实线边框。

填充选择 background，边缘选择 border；两者的 CSS 效果不同。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `border.rightColor`

<a id="entry-border-rightcolor"></a>

右边框颜色

将 `value` 写入 `border-right-color`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 右边框颜色 |

## `border.rightStyle`

<a id="entry-border-rightstyle"></a>

右边框样式

将 `value` 写入 `border-right-style`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 右边框样式 |

## `border.rightWidth`

<a id="entry-border-rightwidth"></a>

右边框宽度

将 `value` 写入 `border-right-width`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 右边框宽度 |

## `border.bottomColor`

<a id="entry-border-bottomcolor"></a>

下边框颜色

将 `value` 写入 `border-bottom-color`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 下边框颜色 |

## `border.bottomStyle`

<a id="entry-border-bottomstyle"></a>

下边框样式

将 `value` 写入 `border-bottom-style`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 下边框样式 |

## `border.bottomWidth`

<a id="entry-border-bottomwidth"></a>

下边框宽度

将 `value` 写入 `border-bottom-width`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 下边框宽度 |

## `border.imageOutset`

<a id="entry-border-imageoutset"></a>

图片外延

将 `value` 写入 `border-image-outset`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 图片外延 |

## `border.imageRepeat`

<a id="entry-border-imagerepeat"></a>

图片重复

将 `value` 写入 `border-image-repeat`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 图片重复 |

## `border.imageSource`

<a id="entry-border-imagesource"></a>

图片源

将 `value` 写入 `border-image-source`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 图片源 |

## `border.topLeftRadius`

<a id="entry-border-topleftradius"></a>

左上角半径

将 `value` 写入 `border-top-left-radius`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 左上角半径 |

## `border.topRightRadius`

<a id="entry-border-toprightradius"></a>

右上角半径

将 `value` 写入 `border-top-right-radius`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 右上角半径 |

## `border.bottomLeftRadius`

<a id="entry-border-bottomleftradius"></a>

左下角半径

将 `value` 写入 `border-bottom-left-radius`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 左下角半径 |

## `border.bottomRightRadius`

<a id="entry-border-bottomrightradius"></a>

右下角半径

将 `value` 写入 `border-bottom-right-radius`。

需同时配置多个相关属性时，使用完整的 border 样式。

位置参数顺序: `value`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `value` | `string` | 右下角半径 |
