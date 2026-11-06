# common.shadow

<!-- Generated from native authoring; do not edit. -->

[English](shadow.md)

`Styles.shadow.*` -- box shadow styling.

---

## Variants

### `shadow`

<a id="entry-shadow"></a>

阴影

为选中的目标设置盒阴影。

写入 box-shadow；嵌套的文本预设改为针对 text-shadow。

使用语义化阴影预设实现随主题变化的抬升效果；阴影不预留布局空间。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `shadow`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `shadow` | `string` | 阴影<br>支持简写<br>`{"cssKey":"boxShadow"}` |

Applies a box-shadow to an element.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['shadow(0 0.25rem 0.5rem rgba(0,0,0,0.2))']
    }
];
```

### Token shadow presets

The preset paths resolve through the active theme's shadow tokens.

| Paths                                                                                                | CSS property  | Scale                             |
| ---------------------------------------------------------------------------------------------------- | ------------- | --------------------------------- |
| `shadow.xs`, `shadow.s`, `shadow.m`, `shadow.l`, `shadow.xl`                                         | `box-shadow`  | Neutral `xs` through `xl`         |
| `shadow.primary.xs`, `shadow.primary.s`, `shadow.primary.m`, `shadow.primary.l`, `shadow.primary.xl` | `box-shadow`  | Primary-colored `xs` through `xl` |
| `shadow.text.xs`, `shadow.text.s`, `shadow.text.m`                                                   | `text-shadow` | Neutral `xs` through `m`          |
| `shadow.text.primary.xs`, `shadow.text.primary.s`, `shadow.text.primary.m`                           | `text-shadow` | Primary-colored `xs` through `m`  |

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Theme shadow',
        styles: ['shadow.m']
    }
];
```

### `sphere`

<a id="entry-shadow-sphere"></a>

球形

通过成对阴影营造圆润且立体的印象。

添加 jam-shadow-sphere，其样式表组合由强调色派生的内阴影和外阴影。

此预设不将目标变为圆形，也不设置尺寸；请另行协调形状。

Applies a 3D sphere shadow preset.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['shadow.sphere', 'css(padding:1rem)'],
        components: [{ type: 'label', cap: 'Sphere shadow' }]
    }
];
```

## `shadow.l`

<a id="entry-shadow-l"></a>

大

shadow.l 和 shadow.primary.l 设置盒阴影。

## `shadow.m`

<a id="entry-shadow-m"></a>

中等

shadow.m 和 shadow.primary.m 设置盒阴影。

## `shadow.s`

<a id="entry-shadow-s"></a>

小

shadow.s 和 shadow.primary.s 设置盒阴影。

## `shadow.xl`

<a id="entry-shadow-xl"></a>

极大

shadow.xl 和 shadow.primary.xl 设置盒阴影。

## `shadow.xs`

<a id="entry-shadow-xs"></a>

极小

shadow.xs 和 shadow.primary.xs 设置盒阴影。

## `shadow.text.m`

<a id="entry-shadow-text-m"></a>

中等

shadow.text.m 和 shadow.text.primary.m 设置文本阴影。

## `shadow.text.s`

<a id="entry-shadow-text-s"></a>

小

shadow.text.s 和 shadow.text.primary.s 设置文本阴影。

## `shadow.text.xs`

<a id="entry-shadow-text-xs"></a>

极小

shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影。

## `shadow.primary.l`

<a id="entry-shadow-primary-l"></a>

大

shadow.l 和 shadow.primary.l 设置盒阴影。

## `shadow.primary.m`

<a id="entry-shadow-primary-m"></a>

中等

shadow.m 和 shadow.primary.m 设置盒阴影。

## `shadow.primary.s`

<a id="entry-shadow-primary-s"></a>

小

shadow.s 和 shadow.primary.s 设置盒阴影。

## `shadow.primary.xl`

<a id="entry-shadow-primary-xl"></a>

极大

shadow.xl 和 shadow.primary.xl 设置盒阴影。

## `shadow.primary.xs`

<a id="entry-shadow-primary-xs"></a>

极小

shadow.xs 和 shadow.primary.xs 设置盒阴影。

## `shadow.text.primary.m`

<a id="entry-shadow-text-primary-m"></a>

中等

shadow.text.m 和 shadow.text.primary.m 设置文本阴影。

## `shadow.text.primary.s`

<a id="entry-shadow-text-primary-s"></a>

小

shadow.text.s 和 shadow.text.primary.s 设置文本阴影。

## `shadow.text.primary.xs`

<a id="entry-shadow-text-primary-xs"></a>

极小

shadow.text.xs 和 shadow.text.primary.xs 设置文本阴影。
