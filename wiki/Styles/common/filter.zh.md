# common.filter

<!-- Generated from native authoring; do not edit. -->

[English](filter.md)

`Styles.filter.*` — CSS filter property.

---

## Variants

### `filter`

<a id="entry-filter"></a>

滤镜

对目标或其后方背景应用视觉滤镜。

单独设置 filter 和 backdrop-filter。

背景滤镜需要目标后方有可见内容，且目标背景能让效果显现。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `filter` → `backdrop`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `filter` | `string` | 滤镜<br>支持简写<br>`{"cssKey":"filter"}` |
| `backdrop` | `string` | 背景滤镜<br>支持简写<br>`{"cssKey":"backdropFilter"}` |

Applies CSS filter and backdrop-filter effects. Accepts raw CSS filter function strings.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Blurred',
        styles: ['filter(filter:blur(2px) grayscale(0.5))']
    }
];
```

## `filter.lens`

<a id="entry-filter-lens"></a>

镜头变形

让包装元素及其内容一起向内弯曲。

将实时的包装元素捕获到画布。中央纵向压缩，两侧保持原高度，额外绘制的背景填满上下边缘。

使用正常文档流中的包装元素，通过内联 CSS 明确设置尺寸，或让它填满已有尺寸的父元素。效果依赖 HTML-in-Canvas、WebGL 2、画布几何更新及保留状态的 DOM 移动。

画布跟随包装元素内联样式中设置的尺寸。通过 `showIf` 隐藏包装元素时，画布退出布局，重新显示时恢复。移动仍连接到文档的包装元素会释放旧渲染器，并在目标位置创建新渲染器。卸载元素或撤销样式时释放渲染器和 WebGL 上下文。

将需要一起弯曲的 HUD 或其他内容放在包装元素内。

捕获不可用、缩放比例无效、上下文丢失或启用强制颜色时，包装元素正常渲染。内容移动时可能重绘整个表面。指针仍使用平面坐标，在上下边缘附近可能与绘制位置偏离。

位置参数顺序: `centerScale`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `centerScale` | `number` | `0.94` | 中央的纵向缩放比例。使用大于 0 且不超过 1 的有限数值。默认为 0.94，设为 1 时包装元素保持平直。 |
