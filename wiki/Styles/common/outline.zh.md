# common.outline

<!-- Generated from native authoring; do not edit. -->

[English](outline.md)

`Styles.outline.*` — outline sub-properties.

---

## Variants

### `outline`

<a id="entry-outline"></a>

轮廓

添加或调整目标周围的轮廓。

设置轮廓的宽度、样式、颜色、偏移或简写。

外部强调环使用 outline；除宽度或颜色外，还应提供可见的样式。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `width` → `style` → `color` → `offset` → `outline`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `width` | `string` | 轮廓宽度<br>`{"cssKey":"outlineWidth"}` |
| `style` | `string` | 轮廓样式<br>选项: `none` — 无, `solid` — 实线, `dashed` — 虚线, `dotted` — 点线, `double` — 双线, `groove` — 3D 凹槽, `ridge` — 3D 凸脊, `inset` — 3D 内嵌, `outset` — 3D 外凸<br>`{"cssKey":"outlineStyle"}` |
| `color` | `string` | 轮廓颜色<br>`{"cssKey":"outlineColor"}` |
| `offset` | `string` | 轮廓偏移<br>`{"cssKey":"outlineOffset"}` |
| `outline` | `string` | 轮廓<br>支持简写 |

Applies outline width, style, color, and offset to an element.

The outline shorthand overrides its individual fields.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Focused',
        styles: ['outline(width:2px;style:solid;color:var(--jam-ac-color))']
    }
];
```
