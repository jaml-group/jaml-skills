# layer.watermark

<!-- Generated from native authoring; do not edit. -->

[English](watermark.md)

`Styles.layer.watermark.*` — watermark and icon overlay layer effects.

---

## Variants

### `watermark`

<a id="entry-layer-watermark"></a>

水印

在宿主内容后添加浅淡的文字水印。

创建水印图层和绝对定位的文字 span，使用通用文字样式设置及可选的 span 样式覆盖。

使用具有可用几何尺寸的宿主，并加载框架图层样式。图层尺寸和堆叠取决于宿主及所选变体。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

使用 text 或文字回调提供装饰签名。使用 layer.watermark.icon 从宿主图标插槽生成标记。

水印是浅淡的装饰子节点，不是防篡改机制。其回调在创建时提供内容，不会自动订阅应用数据变化。

位置参数顺序: `font` → `size` → `weight` → `style` → `decoration` → `spacing` → `shadow` → `align` → `whitespace` → `lineheight` → `userselect` → `indent` → `caretColor` → `color` → `text`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `font` | `string` | 未提供 | 字体族<br>`{"cssKey":"fontFamily"}` |
| `size` | `string` | 未提供 | 大小<br>`{"cssKey":"fontSize"}` |
| `weight` | `string` | 未提供 | 字重<br>选项: `normal` — 正常, `bold` — 粗体<br>`{"cssKey":"fontWeight"}` |
| `style` | `dictionary` | 未提供 | 样式 |
| `decoration` | `string` | 未提供 | 装饰<br>选项: `none` — 无, `underline` — 下划线<br>`{"cssKey":"textDecoration"}` |
| `spacing` | `string` | 未提供 | 间距<br>`{"cssKey":"letterSpacing"}` |
| `shadow` | `string` | 未提供 | 阴影<br>`{"cssKey":"textShadow"}` |
| `align` | `string` | 未提供 | 对齐<br>选项: `left` — 左对齐, `center` — 居中, `right` — 右对齐<br>`{"cssKey":"textAlign"}` |
| `whitespace` | `string` | 未提供 | 空白处理<br>选项: `normal` — 正常, `nowrap` — 不换行, `pre` — 保留空白<br>`{"cssKey":"whiteSpace"}` |
| `lineheight` | `string` | 未提供 | 行高<br>选项: `normal` — 正常, `1` — 紧凑, `1.5` — 松散<br>`{"cssKey":"lineHeight"}` |
| `userselect` | `string` | 未提供 | 用户选择<br>选项: `auto` — 自动, `none` — 无<br>`{"cssKey":"userSelect"}` |
| `indent` | `string` | 未提供 | 缩进<br>`{"cssKey":"textIndent"}` |
| `caretColor` | `string` | 未提供 | 光标颜色<br>`{"cssKey":"caretColor"}` |
| `color` | `string` | `hsl(var(--jam-ac-h), calc(var(--jam-ac-s) * 0.15), calc(var(--jam-lumi-o-base) + var(--jam-lumi-o-dev) * 5))` | 文本颜色<br>`{"cssKey":"color"}` |
| `text` | `functionOrString` | `watermark` | 文本<br>支持简写 |

Text watermark overlay. Renders translucent text over the element.

Use the `style` dictionary for CSS on the watermark text span, for example `{ opacity: 0.2 }` in JavaScript.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['layer.watermark(text:CONFIDENTIAL;size:1.5rem;weight:bold)'],
        components: [{ type: 'label', cap: 'Confidential document' }]
    },
    {
        type: 'card',
        styles: ['layer.watermark(text:DRAFT;color:hsl(0 75% 45%);size:2rem)'],
        components: [{ type: 'label', cap: 'Draft version' }]
    }
];
```

### `watermark.icon`

<a id="entry-layer-watermark-icon"></a>

图标水印

将宿主图标映射为大型浅淡水印。

在图标插槽变化时读取第一个分配的图标插槽元素，然后创建 emoji 或字体图标标记。渐变、尺寸和位置设置控制其外观。

使用提供图标插槽且已连接就绪的框架宿主。宿主需要分配图标，此图层才能显示标记。

有新的源图标可用时，图标插槽回调替换上一次生成的图标；图层拆卸移除子节点装饰。

图标派生装饰使用此样式，调用方提供的文字使用 layer.watermark。宿主图标仍是图标身份的来源。

这不是独立的图标选择器。Emoji 使用灰度或反色处理；字体图标渲染依赖框架图标字体样式。

位置参数顺序: `style` → `bottom` → `right` → `invert` → `gradient` → `size`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `style` | `string` | `fas` | 非 emoji 图标水印的 Font Awesome 样式类：far、fad、fas 或 fal。Emoji 水印则使用其文字。<br>选项: `far`, `fad`, `fas`, `fal` |
| `bottom` | `numberOrString` | 未提供 | 底部 |
| `right` | `numberOrString` | 未提供 | 右侧 |
| `invert` | `boolean` | 未提供 | emoji反转 |
| `gradient` | `booleanOrString` | 未提供 | 渐变 |
| `size` | `string` | `6em` | 尺寸 |

Icon/emoji watermark with gradient and inversion options. Copies the host element's `icon` slot into a decorative layer; set the host `icon` param to an icon name or emoji.

```javascript jaml-playground
export default [
    {
        type: 'card',
        icon: '🔒',
        styles: ['layer.watermark.icon(size:4em;bottom:1rem;right:1rem)'],
        components: [{ type: 'label', cap: 'Secure content' }]
    },
    {
        type: 'card',
        icon: '⭐',
        styles: ['layer.watermark.icon(gradient:true;size:5em)'],
        components: [{ type: 'label', cap: 'Featured' }]
    }
];
```
