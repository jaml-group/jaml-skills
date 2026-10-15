# common.mask

<!-- Generated from native authoring; do not edit. -->

[English](mask.md)

`Styles.mask.*` -- CSS mask-image properties.

---

## Scroll edge fades

<a id="entry-mask-overflow"></a>

溢出边缘渐隐

测量样式目标自身，只在仍有内容的物理边缘渐隐。默认渐隐长度为 1.5rem，listenScroll 为 true。设为 false 时保留初次、尺寸及浅层 DOM 子树内容变化测量，但不订阅滚动事件。将文本省略号改为 clip，不改变 overflow 或换行设置。 dynamic:true 时，size 为最大长度：起始边使用 size × min(1, p / threshold)，末尾使用 size × min(1, (1 - p) / threshold)，每个轴使用归一化物理进度。无溢出的边始终为零，默认仍为固定长度。 dynamic:true 且提供 distance 时，各边改用 size × min(1, edgeDistance / distance)，长度换算为 CSS 像素。因此无论内容长度如何，滚动固定距离即可达到完整渐隐；省略时保留 threshold 比例行为。

与其他观察者共享目标观察器及至多一个滚动监听器。卸载元素释放本次订阅，移除样式插件时也移除遮罩样式；保留其他使用者；最后一个需要滚动的订阅移除后停止滚动监听。

应用到实际裁剪文本框或滚动视口，并设置有界尺寸及裁剪或滚动方式。自动持有观察订阅，无需另加 interact.scrollWatcher。每个目标重置自身渐隐变量。

遮罩影响整个目标，可能包括原生滚动条。listenScroll:false 不观察仅由滚动引起的变化。作为运行时样式应用到实际元素，不通过子目标、影子槽和 agent 样式菜单提供，不暴露公开回调接口。 threshold 限制在 0–1；零表示溢出边立即使用完整长度，非有限值回退到 0.1。这是渐变距离比例，不是最小渐隐长度。 distance 为零或负值时，溢出边立即使用完整长度；换算结果非有限时回退到 threshold。使用 rem 或 px 等明确长度。

位置参数顺序: `size` → `listenScroll` → `dynamic` → `threshold` → `distance`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `numberOrString` | `1.5` | 渐隐长度；数值使用 rem<br>Unit: `rem`<br>支持简写 |
| `listenScroll` | `boolean` | `true` | 监听原生滚动事件 |
| `dynamic` | `boolean` | `false` | 随边缘距离或进度调整渐隐长度，默认 false |
| `threshold` | `number` | `0.1` | 渐隐达到 size 所需的滚动比例，默认 0.1 |
| `distance` | `numberOrString` | 未提供 | 可选固定渐变距离，如 3rem 或 48px；数值使用 rem；dynamic:true 时优先于 threshold<br>Unit: `rem` |

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(display:block;width:20rem;max-width:100%;height:12rem;overflow:auto;padding:0)', 'mask.overflow'],
    components: [
        {
            type: 'container',
            styles: ['css(display:flex;flex-direction:column;width:32rem;gap:1rem;padding:1.5rem)'],
            components: Array.from({ length: 12 }, (_, index) => ({ type: 'label', cap: `Scroll to discover item ${index + 1}` }))
        }
    ]
};
```

Use `mask.overflow(size:1.5rem)` on a scrolling viewport, or `mask.overflow(size:1.5rem;listenScroll:false)` on bounded clipped text. The shorthand measures its own target, replaces ellipsis with clipping, resets all four edge variables, and owns a shared watcher subscription. It preserves authored overflow, wrapping and dimensions. Scroll listening defaults to true; disabling it retains initial and layout/content updates. Do not also add a watcher unless another consumer requires it.

Use `mask.overflow(size:1.5rem;dynamic:true;distance:3rem)` for a fade that reaches full length after fixed travel, even in very long content. Explicit pixels are supported too: `distance:48px`; bare numbers use rem. Each physical edge uses `size × min(1, edgeDistance / distance)`. Distance overrides threshold when supplied; zero or negative distance means immediate full fade on overflowing edges, and a nonfinite conversion falls back to threshold.

Without distance, `mask.overflow(size:1.5rem;dynamic:true;threshold:0.1)` preserves percentage-based adaptive fades. The fade grows from zero to the maximum `size` over the first 10% of physical scroll progress; the opposite fade shrinks over the last 10%. At 5% progress the start fade is half-size; through the middle both overflowing edges use full size. Each axis is independent, including RTL/reversed origins. The existing progress callback API retains its raw values. This recipe uses normalized state internally.

For a custom mask recipe, apply the mask to the actual scrolling viewport and publish its own state with `interact.scrollWatcher`, or `event.scrollProgress({ updateAttr: true })` when progress events are needed. Use [overflow direction styles](./overflow.md) to set each edge fade width only while content remains beyond that edge. No extra scroll handler or JavaScript mask-position synchronization is needed.

For four directions, combine horizontal and vertical gradients with `mask-composite: intersect`. Explicitly reset all four custom edge widths to zero on each scroller so nested scrollers cannot inherit an outer fade; fallback values alone do not stop inheritance. Keep default edge widths at zero and set only the matching direction to a small `rem` length. At the beginning only the far edge fades; in the middle both ends fade; at the end the reached edge becomes clear.

A mask affects the entire painted scroller, including its background and potentially its native scrollbar. This simple composition accepts that tradeoff; overlay scrollbar behavior varies by browser and platform. A mask on the moving content would move with it. Avoid extra viewport layers merely to preserve scrollbar appearance. Keep borders and stationary controls on an existing unmasked parent when needed. Do not change measured geometry in response to overflow state.

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
