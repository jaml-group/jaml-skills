# common.align

<!-- Generated from native authoring; do not edit. -->

[English](align.md)

`Styles.align.*` — flexbox alignment for individual children.

---

## Variants

### `align`

<a id="entry-align"></a>

对齐

在现有布局中对齐元素或内容。

align 简写将水平和垂直方向的词展开为 justify 和 align 属性；显式设置的单独属性优先。省略垂直方向词时默认为 center。

目标必须处于所选对齐属性能产生效果的布局中。

此辅助函数不建立 grid 或 flex 显示模式，主轴和交叉轴仍由布局解释。

位置参数顺序: `alignSelf` → `alignItems` → `alignContent` → `justifySelf` → `justifyItems` → `justifyContent` → `align`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `alignSelf` | `string` | 自身交叉轴对齐<br>align-self 覆盖单个元素的 align-items 对齐设置。在 Grid 中，使元素在其网格区域内对齐；在 Flexbox 中，使元素沿交叉轴（垂直于 flex 排列方向的轴）对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"alignSelf"}` |
| `alignItems` | `string` | 子元素交叉轴对齐<br>align-items 为直接子元素统一设置默认的 align-self。在 Flexbox 中控制交叉轴对齐；在 Grid 中控制元素在各自网格区域内的块轴对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"alignItems"}` |
| `alignContent` | `string` | 内容空间分配（align-content）<br>align-content 沿 Flexbox 的交叉轴分配各行之间及周围的空间，或沿 Grid 的块轴分配各轨道之间及周围的空间。<br>选项: `flex-start` — 起始, `center` — 居中, `flex-end` — 结束, `space-between` — 两端间隔, `space-around` — 环绕间隔, `space-evenly` — 均匀间隔<br>`{"cssKey":"alignContent"}` |
| `justifySelf` | `string` | 自身主轴对齐<br>justify-self 设置单个盒子在布局容器中相应轴上的对齐方式。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"justifySelf"}` |
| `justifyItems` | `string` | 子元素主轴对齐<br>justify-items 为各元素设置默认的 justify-self，使元素沿相应轴在各自盒子内对齐。<br>选项: `stretch` — 拉伸, `center` — 居中, `baseline` — 基线, `flex-end` — 结束, `flex-start` — 起始<br>`{"cssKey":"justifyItems"}` |
| `justifyContent` | `string` | 主轴内容空间分配<br>justify-content 沿 Flex 容器的主轴或 Grid 容器的行轴，分配元素之间及周围的空间。<br>选项: `flex-start` — 起始, `center` — 居中, `flex-end` — 结束, `space-between` — 两端间隔, `space-around` — 环绕间隔, `space-evenly` — 均匀间隔<br>`{"cssKey":"justifyContent"}` |
| `align` | `string` | 对齐<br>align 是同时设置 align-items 和 align-content 的简写。<br>支持简写<br>选项: `left-top` — 左上, `center-top` — 中上, `right-top` — 右上, `left-middle` — 左中, `center-middle` — 居中, `right-middle` — 右中, `left-bottom` — 左下, `center-bottom` — 中下, `right-bottom` — 右下, `around-top` — 环绕间隔，上对齐, `around-middle` — 环绕间隔，中对齐, `around-bottom` — 环绕间隔，下对齐, `evenly-top` — 均匀间隔，上对齐, `evenly-middle` — 均匀间隔，中对齐, `evenly-bottom` — 均匀间隔，下对齐, `between-top` — 两端间隔，上对齐, `between-middle` — 两端间隔，中对齐, `between-bottom` — 两端间隔，下对齐 |

Sets alignment properties for flex/grid children.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Centered',
        styles: ['align(alignSelf:center)']
    }
];
```
