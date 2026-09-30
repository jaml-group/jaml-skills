# common.mask

<!-- Generated from native authoring; do not edit. -->

[English](mask.md)

`Styles.mask.*` -- CSS mask-image properties.

---

## Variants

### `mask`

<a id="entry-mask"></a>

遮罩

使用 CSS 遮罩图像遮罩已渲染的目标。

通过标准样式应用路径将 mask 映射到 mask-image。

生成渐隐效果使用 mask.gradient，可见绘制使用背景样式。

此辅助样式不配置遮罩位置、重复或尺寸；需要这些属性时使用 css。

位置参数顺序: `mask`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `mask` | `string` | 遮罩<br>支持简写<br>`{"cssKey":"maskImage"}` |

Applies a CSS mask image to an element.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Masked',
        styles: ['mask(mask:linear-gradient(black, transparent))']
    }
];
```

### `gradient`

<a id="entry-mask-gradient"></a>

渐变

根据路径生成用于背景绘制或遮罩的渐变。

background.gradient 写入 background-image；mask.gradient 写入 mask-image。两者都根据指定的 type、arg 和 stops 构建 CSS 渐变文本。

背景渐变用于可见颜色，遮罩渐变用于使渲染目标渐隐；两者效果不同。

提供符合渐变类型的 arg。共享构建器检查类型名中小写的 linear，因此 repeatingLinear 应通过 arg 指定角度，不应依赖 deg。

位置参数顺序: `deg` → `arg` → `stops` → `type`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `deg` | `numberOrString` | `calc(var(--jam-background-deg var(--jam-mask-deg, 180deg)) - 90deg)` | 角度<br>Unit: `deg` |
| `arg` | `string` | 未提供 | 位置参数 |
| `stops` | `array` | `["black","transparent 60%"]` | 渐变色标 |
| `type` | `string` | `linear` | 样式<br>选项: `linear` — 线性, `radial` — 径向, `conic` — 锥形, `repeatingLinear` — 重复线性, `repeatingRadial` — 重复径向, `repeatingConic` — 重复锥形 |

Applies a gradient mask to the element.
