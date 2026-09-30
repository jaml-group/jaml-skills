# layer.glare

<!-- Generated from native authoring; do not edit. -->

[English](glare.md)

`Styles.layer.glare.*` — light glare and reflection layer effects.

---

## Variants

### `glare.spot`

<a id="entry-layer-glare-spot"></a>

光斑

添加柔和的反射聚光。

使用椭圆形径向高光，支持顶部或底部放置以及由深度控制的视差平移。

加载框架图层样式，并为宿主提供可测量的几何尺寸。响应指针的眩光需要视差行为更新宿主的偏移和眩光变量。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

将眩光与宿主表面和视差行为组合；眩光样式提供装饰，视差负责指针运动。

眩光图层本身不安装指针跟踪。其宿主标记会裁剪溢出内容，因此应考虑超出宿主的内容或装饰。

位置参数顺序: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `numberOrString` | 未提供 | size |
| `position` | `string` | `top` | position<br>选项: `top`, `bottom` |
| `glareDepth` | `number` | `40` | glareDepth |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Spotlight glare decoration positioned at the top or bottom. This style does not install mouse tracking. For pointer following use `layer.follower.spotlight(follow:true)`.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Spot glare',
        styles: ['layer.glare.spot(position:top;glareDepth:30)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Bottom spot',
        styles: ['layer.glare.spot(position:bottom;glareDepth:50)', 'css(padding:2rem)']
    }
];
```

### `glare.reflect`

<a id="entry-layer-glare-reflect"></a>

反射

添加玻璃般的反射表面。

选择线性反射带或放大的径向反射图像，并根据视差偏移进行平移。

加载框架图层样式，并为宿主提供可测量的几何尺寸。响应指针的眩光需要视差行为更新宿主的偏移和眩光变量。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

将眩光与宿主表面和视差行为组合；眩光样式提供装饰，视差负责指针运动。

眩光图层本身不安装指针跟踪。其宿主标记会裁剪溢出内容，因此应考虑超出宿主的内容或装饰。

位置参数顺序: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `type`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `numberOrString` | 未提供 | size |
| `position` | `string` | `top` | position<br>选项: `top`, `bottom` |
| `glareDepth` | `number` | `5` | glareDepth |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `type` | `string` | `linear` | type<br>支持简写<br>选项: `linear`, `radial` |

Linear or radial reflection effect.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Reflect',
        styles: ['layer.glare.reflect(type:linear;position:top)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Radial reflect',
        styles: ['layer.glare.reflect(type:radial;position:bottom)', 'css(padding:2rem)']
    }
];
```

### `glare.gloss`

<a id="entry-layer-glare-gloss"></a>

光泽

添加弯曲的光泽高光。

构建带径向遮罩的白色圆角彗星弧，并添加标记供视差眩光处理使用。

加载框架图层样式，并为宿主提供可测量的几何尺寸。响应指针的眩光需要视差行为更新宿主的偏移和眩光变量。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

将眩光与宿主表面和视差行为组合；眩光样式提供装饰，视差负责指针运动。

此样式由 spinner.comet 组合而成，不安装指针跟踪。其弧形几何与其他眩光变体不同；调用方参数应用于预设值之后。

位置参数顺序: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `numberOrString` | 未提供 | size |
| `position` | `string` | `top` | position<br>选项: `top`, `bottom` |
| `glareDepth` | `number` | `0` | glareDepth |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Gloss/sheen effect. Uses a comet spinner internally to create a sweeping gloss highlight.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Glossy',
        styles: ['layer.glare.gloss(position:top;glareDepth:30)', 'css(padding:2rem)']
    }
];
```

### `glare.metal`

<a id="entry-layer-glare-metal"></a>

金属

添加金属光泽或径向光纹。

count 为零时使用旋转的线性高光，count 为正数时使用重复的锥形光纹。

加载框架图层样式，并为宿主提供可测量的几何尺寸。响应指针的眩光需要视差行为更新宿主的偏移和眩光变量。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

将眩光与宿主表面和视差行为组合；眩光样式提供装饰，视差负责指针运动。

眩光图层本身不安装指针跟踪。其宿主标记会裁剪溢出内容，因此应考虑超出宿主的内容或装饰。

位置参数顺序: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `count`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `numberOrString` | 未提供 | size |
| `position` | `string` | `top` | position<br>选项: `top`, `bottom` |
| `glareDepth` | `number` | `0` | glareDepth |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `count` | `number` | `0` | count<br>支持简写 |

Metallic glare with configurable streak count.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Metal',
        styles: ['layer.glare.metal(count:6;position:top)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Brushed metal',
        styles: ['layer.glare.metal(count:12;position:bottom)', 'css(padding:2rem)']
    }
];
```

### `glare.light`

<a id="entry-layer-glare-light"></a>

灯管

添加明亮的反射光带效果。

使用成对倾斜矩形高光和宽泛光晕；平移响应眩光深度。

加载框架图层样式，并为宿主提供可测量的几何尺寸。响应指针的眩光需要视差行为更新宿主的偏移和眩光变量。

创建独立的子图层；撤销其样式所有权时移除所创建的图层，而不是宿主。

将眩光与宿主表面和视差行为组合；眩光样式提供装饰，视差负责指针运动。

眩光图层本身不安装指针跟踪。其宿主标记会裁剪溢出内容，因此应考虑超出宿主的内容或装饰。

位置参数顺序: `size` → `position` → `glareDepth` → `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `numberOrString` | 未提供 | size |
| `position` | `string` | `top` | position<br>选项: `top`, `bottom` |
| `glareDepth` | `number` | `96` | glareDepth |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |

Tube light effect. A bright elongated light glow.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Light tube',
        styles: ['layer.glare.light(position:top;glareDepth:80)', 'css(padding:2rem)']
    }
];
```
