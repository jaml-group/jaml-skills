# layer.crosshair

<!-- Generated from native authoring; do not edit. -->

[English](crosshair.md)

`Styles.layer.crosshair` — crosshair locator overlay anchored to the host.

Displays a crosshair corner-bracket locator around the host element. Mouse entry and movement trigger its breathing behavior; leaving returns it to a steady state. The locator stays on the host rather than following cursor coordinates. For cursor-following decoration, use a [layer.follower](./follower.md) variant with `follow: true`.

---

## Args

<a id="entry-layer-crosshair"></a>

准心

用固定在宿主上的角框装饰响应指针活动，不跟随指针坐标。

创建以宿主为目标的 crosshair 定位标记。鼠标进入和移动时触发呼吸效果；鼠标离开时恢复稳定状态。

用于需要标示边界的宿主，并加载框架定位标记样式。

crosshair 子元素卸载时会移除其安装在宿主上的鼠标监听器。

在悬停目标之间移动的标记使用 hover.crosshair；选中项使用 check.frame；跟随指针的装饰使用 layer.follower 变体，并将 follow 设为 true。

不会选中宿主、移动应用内容，也不提供键盘或焦点行为。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `number` | 未提供 | 大小 |
| `width` | `numberOrString` | `auto` | 边框宽度 |
| `bias` | `number` | `0` | 边框距离 |
| `glow` | `number` | `5` | 发光 |
| `radius` | `numberOrString` | `auto` | 圆角半径<br>auto：自动适配元素；数值表示半径，单位为 px。 |
| `delay` | `number` | `0` | 延迟 |
| `breathe` | `boolean` | `false` | 呼吸 |
| `container` | `any` | 未提供 | 容器 |
| `clipTarget` | `any` | 未提供 | 裁剪目标 |
| `easing` | `string` | 未提供 | 动画缓动 |
| `duration` | `number` | 未提供 | 动画时长 |

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layer.crosshair(glow:6;easing:bouncing;duration:400)'],
        components: [{ type: 'label', cap: 'Hover for breathing crosshair' }]
    },
    {
        type: 'container',
        styles: ['layer.crosshair(glow:0;width:2;radius:8)'],
        components: [{ type: 'label', cap: 'Sharp crosshair' }]
    }
];
```
