# layer.overlay

<!-- Generated from native authoring; do not edit. -->

[English](overlay.md)

`Styles.layer.overlay` — semi-transparent overlay layer.

Adds a positioned overlay with optional content on top of the element.

---

## Args

<a id="entry-layer-overlay"></a>

覆盖层

使用可选的内容覆盖层覆盖宿主。

将提供的内容居中显示在宿主上方，在尺寸变化处理时复制父级圆角，并对较矮的覆盖层采用紧凑处理。非空内容会添加内缩虚线框。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

通过图层自身的参数或 css 配置该图层。再次应用图层样式会创建另一个子节点，而不是更新第一个图层。

覆盖层子节点不接收指针事件；此样式不创建模态对话框、不移动焦点，也不管理应用加载状态。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `zIndex` | `number` | 未提供 | 层级 |
| `dropShadow` | `boolean` | `false` | 投影 |
| `boxShadow` | `string` | 未提供 | 阴影 |
| `mask` | `string` | 未提供 | 遮罩 |
| `filter` | `string` | 未提供 | 滤镜 |
| `padding` | `string` | 未提供 | 内边距 |
| `borderRadius` | `string` | 未提供 | 圆角 |
| `transform` | `string` | 未提供 | 变换 |
| `border` | `string` | 未提供 | 边框 |
| `clipPath` | `string` | 未提供 | 裁剪 |
| `animation` | `string` | 未提供 | 动画 |
| `opacity` | `number` | 未提供 | 透明度<br>编辑提示（非运行时限制）: `{"step":0.1}` |
| `css` | `dictionaryOrString` | 未提供 | CSS |
| `depth` | `number` | 未提供 | 透视层深 |
| `class` | `string` | 未提供 | 类名 |
| `attrs` | `dictionary` | 未提供 | 属性 |
| `rotateX` | `number` | 未提供 | X轴旋转 |
| `rotateY` | `number` | 未提供 | Y轴旋转 |
| `translateY` | `numberOrString` | 未提供 | Y轴位移 |
| `slot` | `string` | 未提供 | 插槽 |
| `content` | `any` | 未提供 | 文本 |
| `entryAnimation` | `string` | `fade-in 200ms ease-in-out both` | 入场动画 |
| `exitAnimation` | `string` | `fade-out 200ms ease-in-out both` | 出场动画 |

Standard layer args also apply: `zIndex`, `opacity`, `mask`, `filter`, `padding`, `borderRadius`, `entryAnimation`, `exitAnimation`, etc.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Decorative overlay',
        styles: ['layer.overlay(content:Hello World;opacity:0.8)']
    },
    {
        type: 'card',
        cap: 'Minimal overlay',
        styles: ['layer.overlay(content:⚠;class:warning;opacity:0.9)']
    }
];
```
