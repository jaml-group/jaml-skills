# layer.canvas

<!-- Generated from native authoring; do not edit. -->

[English](canvas.md)

`Styles.layer.canvas.*` — canvas-based particle and visual effects.

All three particle variants rebuild after resize, dark-mode, global accent-color, and element-color changes. Rebuilds are debounced by 100 ms so generated colors and geometry stay current without redundant work.

---

## Particle shapes reference

The `shape` option accepts any key from the table below, a custom function, an HTML string, or the special value `'random'`.

| Shape       | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| `circle`    | Solid circle                                                                          |
| `square`    | Solid square                                                                          |
| `triangle`  | 3-sided polygon                                                                       |
| `rhombus`   | 4-sided polygon                                                                       |
| `hexagon`   | 6-sided polygon                                                                       |
| `star`      | 6-pointed star                                                                        |
| `pentagram` | 5-pointed star                                                                        |
| `tetragram` | 4-pointed star                                                                        |
| `diamond`   | 2-pointed diamond (via drawStar with 2 spikes)                                        |
| `heart`     | Heart shape, `factor` controls depth                                                  |
| `snowflake` | 6-branch snowflake (stroked, not filled)                                              |
| `spindle`   | Spindle/teardrop shape                                                                |
| `sprinkle`  | Rounded rectangle (confetti sprinkle)                                                 |
| `raindrop`  | Raindrop/teardrop                                                                     |
| `bubble`    | Radial gradient bubble, `factor` controls center alpha, `blur` controls edge softness |
| `spade`     | Spade playing-card symbol                                                             |
| `club`      | Club playing-card symbol                                                              |
| `clover`    | 3-leaf clover                                                                         |
| `flower`    | Multi-petal flower, `factor` controls petal count (4-16)                              |
| `butterfly` | Butterfly with two wings, `factor` controls wing spread (0-1)                         |
| `fish`      | Fish shape with tail and eye                                                          |
| `footprint` | Animal footprint pad with 4 toes                                                      |
| `random`    | Picks a random shape (excludes `square`) each time                                    |

**Custom function shapes** — pass a function with the signature:

```
function(ctx: CanvasRenderingContext2D, size: number, color: chroma.Color, factor: number) => void
```

The function draws centered at `(0, 0)`. It may optionally return a post-processing function that runs after `ctx.save()`/`restore()`.

**HTML string shapes** — pass an HTML string (e.g. `'<svg>...</svg>'` or `'<img src=...>'`). The element is rendered to a cached canvas and drawn as an image.

---

## onTick callback API

When `onTick` is provided, the canvas runs an animation loop and calls the callback every frame with cursor interaction data.

```
onTick(particle, progress, iterator, cursor, particles)
```

| Param       | Type     | Description                                                                                        |
| ----------- | -------- | -------------------------------------------------------------------------------------------------- |
| `particle`  | `object` | The particle object. Mutable properties can be changed each frame to animate the particle.         |
| `progress`  | `number` | Animation progress for this particle, 0-1 (eased by `animaEasing` and `animaDirection`).           |
| `iterator`  | `number` | Current iteration count for this particle's animation (increments each time the duration elapses). |
| `cursor`    | `object` | Cursor/pointer data relative to the element (see below).                                           |
| `particles` | `array`  | All particle objects in the scene.                                                                 |

**`this` context** — the callback is called with `this` set to the element the particles are rendered on. Use `this.clientWidth`, `this.clientHeight`, etc.

### Particle object (`particle`)

Mutable properties (assign new values each frame to animate):

| Property   | Type               | Description                                                                                                                    |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `x`        | `number`           | X position (px)                                                                                                                |
| `y`        | `number`           | Y position (px)                                                                                                                |
| `vx`       | `number`           | Not part of the built-in type, but can be added dynamically for velocity-based animation                                       |
| `vy`       | `number`           | Not part of the built-in type, but can be added dynamically for velocity-based animation                                       |
| `opacity`  | `number`           | Opacity multiplier (0-1, composited with `alpha`)                                                                              |
| `size`     | `number`           | Particle size (px)                                                                                                             |
| `rotation` | `number`           | Rotation (degrees)                                                                                                             |
| `scaleX`   | `number`           | Horizontal scale factor                                                                                                        |
| `scaleY`   | `number`           | Vertical scale factor                                                                                                          |
| `factor`   | `number`           | Shape-specific factor (petal count, wing spread, heart depth, etc.)                                                            |
| `index`    | `number`           | Particle index (0-based)                                                                                                       |
| `initial`  | `object`           | **Read-only.** Snapshot of the initial values (`x`, `y`, `size`, `rotation`, `scaleX`, `scaleY`, `opacity`, `factor`, `blur`). |
| `color`    | `chroma.Color`     | The particle color                                                                                                             |
| `alpha`    | `number`           | Base alpha (composited with `opacity`)                                                                                         |
| `blur`     | `number`           | Blur radius (px)                                                                                                               |
| `originX`  | `number \| string` | Transform origin X (px or `'50%'`)                                                                                             |
| `originY`  | `number \| string` | Transform origin Y (px or `'50%'`)                                                                                             |

### Cursor data (`cursor`)

Computed each frame from `jam.cursorPos` relative to the element's bounding rect:

| Property | Type     | Description                                                                |
| -------- | -------- | -------------------------------------------------------------------------- |
| `x`      | `number` | Cursor X relative to element (px from left edge)                           |
| `y`      | `number` | Cursor Y relative to element (px from top edge)                            |
| `dist`   | `number` | Distance from cursor to this particle (px)                                 |
| `deg`    | `number` | Angle from this particle toward the cursor (degrees, 0 = right, 90 = down) |

Cursor interaction is **always** computed when `onTick` is provided — no separate flag is needed.

### Per-property easing with `jam.easeProgress`

The `progress` passed to `onTick` is already transformed by `animaEasing` and `animaDirection`. Calling `jam.easeProgress` on it applies a second transformation. For independent per-property curves, set `animaEasing: 'linear'` and `animaDirection: 'normal'` on the particle style, then apply each desired curve inside `onTick`:

```
jam.easeProgress(progress, iterator, easing, direction?, scale?)
```

| Param       | Type     | Description                                                                                                                                                 |
| ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `progress`  | `number` | The eased progress value from `onTick` (0–1)                                                                                                                |
| `iterator`  | `number` | The iteration count from `onTick`                                                                                                                           |
| `easing`    | `string` | Easing name: `'linear'`, `'sineInOut'`, `'overshoot'`, `'bouncing'`, `'crisp'`, `'boing'`, `'easeOut'`, etc. (full list in [animation.md](../animation.md)) |
| `direction` | `string` | Playback direction: `'normal'`, `'reverse'`, `'alternate'`, `'alternate-reverse'`. Default: `'normal'`                                                      |
| `scale`     | `number` | Scale factor for the total progress range. Default: `1`                                                                                                     |

This unlocks independent animation of position, opacity, rotation, and scale — each with its own feel:

```javascript
onTick(particle, progress, iterator, cursor) {
    // Position: smooth back-and-forth
    const posEase = jam.easeProgress(progress, iterator, 'sineInOut', 'alternate');
    particle.x = particle.initial.x + posEase * 120;

    // Opacity: quick snap at start
    particle.opacity = 0.3 + jam.easeProgress(progress, iterator, 'crisp') * 0.7;

    // Rotation: bouncy overshoot
    particle.rotation = jam.easeProgress(progress, iterator, 'overshoot') * 360;
}
```

---

## Interactive example: custom shapes + cursor following

```javascript jaml-playground
export default jaml.wrapper({
    styles: [
        'size.fullsize',
        'css(background:#02040a;width:100%;height:100%)',
        Styles.layer.canvas.particles({
            countRange: [20, 80],
            distribution: 'halton',
            sizeRange: [20, 30],
            alphaRange: [0.5, 1],
            hueRange: [-70, 70],
            // Custom shape: glowing head + gradient tail
            shape: function (ctx, size, color, factor) {
                const pulse = 1 + Math.sin(Date.now() * 0.01) * 0.1;
                const head = size * 0.2 * pulse;
                const tail = size * (1 + factor);
                // Gradient tail
                const grad = ctx.createLinearGradient(0, 0, 0, tail);
                grad.addColorStop(0, color);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.moveTo(-head, 0);
                ctx.bezierCurveTo(-head, tail * 0.5, 0, tail, 0, tail);
                ctx.bezierCurveTo(0, tail, head, tail * 0.5, head, 0);
                ctx.fill();
                // Bright nucleus
                ctx.beginPath();
                ctx.arc(0, 0, head, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
                // Outer glow
                ctx.beginPath();
                ctx.arc(0, 0, head * 2, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.2;
                ctx.fill();
                ctx.globalAlpha = 1;
            },
            // Steering + screen wrap behavior
            onTick(particle, progress, iterator, cursor) {
                if (particle.vx === undefined) {
                    particle.vx = (Math.random() - 0.5) * 2;
                    particle.vy = (Math.random() - 0.5) * 2;
                }
                const near = cursor.dist < 500 && cursor.x >= 0 && cursor.y >= 0;
                if (near) {
                    // Steer toward cursor
                    const rad = (cursor.deg * Math.PI) / 180;
                    particle.vx += (Math.cos(rad) * 6 - particle.vx) * 0.05;
                    particle.vy += (Math.sin(rad) * 6 - particle.vy) * 0.05;
                    particle.factor = Math.min(1, particle.factor + 0.05);
                } else {
                    // Drift
                    particle.vx += Math.sin(progress + particle.index) * 0.02;
                    particle.vy += Math.cos(progress + particle.index) * 0.02;
                    particle.vx *= 0.98;
                    particle.vy *= 0.98;
                    particle.factor = Math.max(0, particle.factor - 0.01);
                }
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.rotation = (Math.atan2(particle.vy, particle.vx) * 180) / Math.PI + 90;
                // Screen wrap
                if (particle.x < -60) particle.x = this.clientWidth + 60;
                if (particle.x > this.clientWidth + 60) particle.x = -60;
                if (particle.y < -60) particle.y = this.clientHeight + 60;
                if (particle.y > this.clientHeight + 60) particle.y = -60;
            }
        })
    ]
});
```

---

## Variants

### `canvas.particles`

<a id="entry-layer-canvas-particles"></a>

粒子

使用可配置的粒子图像或逐粒子运动。

在具有尺寸的画布中构建粒子形状。每次动画绘制前，onTick 接收粒子状态、归一化进度、迭代次数、指针信息和粒子集合。

为宿主提供可测量的宽高，并使用支持二维画布上下文的浏览器。

在初始尺寸设置、后续尺寸变化以及深色模式、强调色、颜色事件后重建。重建会取消上一次粒子动画；正在运行的画布循环会在画布断开连接时自行取消。

纯 CSS 图像可使用 layer.background.bubbles 或 layer.background.gradient。使用 layer.scroller.particles 移动重复的粒子画布，或使用 onTick 更新单个粒子。

只有 onTick 为函数时才启用粒子运动；仅设置 duration 和 easing 不会使粒子产生动画。随机重建可能改变其排列。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | 未提供 | 尺寸范围 |
| `blurRange` | `array` | 未提供 | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | 未提供 | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | 未提供 | 形状 |
| `distribution` | `string` | `random` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | 未提供 | 颜色范围 |
| `satuRange` | `array` | 未提供 | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | 未提供 | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | 未提供 | 因子范围 |
| `allowOverflowY` | `boolean` | 未提供 | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | 未提供 | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | 未提供 | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Configurable particle system. Renders particles with customizable shapes, colors, sizes, and animation on a canvas layer.

See the shapes table and `onTick` callback contract above for particle composition.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.canvas.particles(countRange:[20,40];sizeRange:[4,12];distribution:random;alphaRange:[0.3,0.8];hueRange:[0,360];satuRange:[0.5,1];lumiRange:[0.4,0.6])', 'css(position:relative;width:20rem;height:10rem)'],
        cap: 'Particles'
    },
    {
        type: 'wrapper',
        styles: ['layer.canvas.particles(countRange:[10,20];shape:star;distribution:gaussian;sizeRange:[8,16];alphaRange:[0.5,1])', 'css(position:relative;width:20rem;height:10rem)'],
        cap: 'Star particles'
    }
];
```

### `canvas.gradient`

<a id="entry-layer-canvas-gradient"></a>

渐变

使用柔和的多色画布背景。

绘制大型模糊三角形、方形和圆形，并叠加相对于强调色的颜色。

为宿主提供可测量的宽高，并使用支持二维画布上下文的浏览器。

在初始尺寸设置、后续尺寸变化以及深色模式、强调色、颜色事件后重建。重建会取消上一次粒子动画；正在运行的画布循环会在画布断开连接时自行取消。

纯 CSS 图像可使用 layer.background.bubbles 或 layer.background.gradient。使用 layer.scroller.particles 移动重复的粒子画布，或使用 onTick 更新单个粒子。

只有 onTick 为函数时才启用粒子运动；仅设置 duration 和 easing 不会使粒子产生动画。随机重建可能改变其排列。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `countRange` | `array` | `[10,10]` | 个数 |
| `sizeRange` | `array` | `["32%","64%"]` | 尺寸范围 |
| `blurRange` | `array` | `["15%","25%"]` | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | 未提供 | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | `["triangle","square","circle"]` | 形状 |
| `distribution` | `string` | `random` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | `[-180,180]` | 颜色范围 |
| `satuRange` | `array` | `[1,2]` | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | `[0.2,0.4]` | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | 未提供 | 因子范围 |
| `allowOverflowY` | `boolean` | `true` | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | `true` | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | `-20%` | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Gradient particle preset. Large, overlapping, blurred particles creating a gradient-like effect.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.canvas.gradient', 'css(position:relative;width:20rem;height:20rem;padding:1rem)'],
        cap: 'Gradient particles'
    }
];
```

### `canvas.sprinkles`

<a id="entry-layer-canvas-sprinkles"></a>

散点装饰

使用密集的撒点纹理。

使用撒点形状的粒子、填充分布和较小的网格间隙；外观由同一粒子渲染器生成。

为宿主提供可测量的宽高，并使用支持二维画布上下文的浏览器。

在初始尺寸设置、后续尺寸变化以及深色模式、强调色、颜色事件后重建。重建会取消上一次粒子动画；正在运行的画布循环会在画布断开连接时自行取消。

纯 CSS 图像可使用 layer.background.bubbles 或 layer.background.gradient。使用 layer.scroller.particles 移动重复的粒子画布，或使用 onTick 更新单个粒子。

只有 onTick 为函数时才启用粒子运动；仅设置 duration 和 easing 不会使粒子产生动画。随机重建可能改变其排列。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | `[12,12]` | 尺寸范围 |
| `blurRange` | `array` | 未提供 | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | `sprinkle` | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | 未提供 | 形状 |
| `distribution` | `string` | `fill` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | `[-180,180]` | 颜色范围 |
| `satuRange` | `array` | `[1,2]` | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | `[0.5,0.5]` | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | 未提供 | 因子范围 |
| `allowOverflowY` | `boolean` | `true` | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | `true` | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | `3` | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Sprinkle/confetti particle preset. Small sprinkle-shaped particles in a fill distribution.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layer.canvas.sprinkles(countRange:[20,40];sizeRange:[4,12])', 'css(position:relative;width:20rem;height:10rem)'],
        cap: 'Sprinkles'
    },
    {
        type: 'wrapper',
        styles: ['layer.canvas.sprinkles(countRange:[50,80];sizeRange:[4,8];hueRange:[0,120])', 'css(position:relative;width:20rem;height:10rem)'],
        cap: 'Green sprinkles'
    }
];
```

---

## `layer.scroller.*` particle variant defaults

The scroller layer exposes particle variants with the following defaults (in addition to all `canvas.particles` options):

### `scroller.particles`

<a id="entry-layer-scroller-particles"></a>

粒子

在宿主内容后使用重复的粒子场。

创建两个可作为整体图层移动的粒子画布；逐粒子的 onTick 动画保持独立。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `down` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | 未提供 | 尺寸范围 |
| `blurRange` | `array` | 未提供 | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | 未提供 | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | 未提供 | 形状 |
| `distribution` | `string` | `random` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | 未提供 | 颜色范围 |
| `satuRange` | `array` | 未提供 | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | 未提供 | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | 未提供 | 因子范围 |
| `allowOverflowY` | `boolean` | 未提供 | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | 未提供 | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | 未提供 | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Inherits all `canvas.particles` args plus scroller args:

### `scroller.bubbles`

<a id="entry-layer-scroller-bubbles"></a>

气泡

在宿主内容后使用上升气泡装饰。

使用气泡形状、向上方向和柔和的透明粒子范围创建两个放大的粒子画布。scroll true 启用无限的定向 CSS 循环；fromStart 改变初始相位。

为宿主提供可用几何尺寸，并加载框架图层样式。显式启用 scroll，并选择具有对应循环动画的方向：up、down、left 或 right。

拥有两个子图层；移除组合样式时移除其装饰。粒子变体还使用画布渲染器生命周期。

用于装饰性运动。用户控制的内容导航应使用滚动容器；这些样式不改变 scrollTop 或 scrollLeft。

scroll 默认为 false。此样式用循环动画覆盖每个子节点的动画，本身不添加宿主裁剪；请明确选择宿主 overflow。

位置参数顺序: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

公共参数: [layer.overlay](overlay.zh.md#entry-layer-overlay).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `css` | `dictionaryOrString` | `{"height":"400%"}` | CSS |
| `class` | `string` | 未提供 | 类 |
| `content` | `any` | 未提供 | 内容 |
| `entryAnimation` | `string` | `unset` | 入场动画 |
| `fromStart` | `boolean` | `false` | 从开始 |
| `direction` | `string` | `up` | 方向 |
| `scroll` | `boolean` | `false` | 滚动 |
| `duration` | `numberOrString` | `10000` | 滚动时间 |
| `easing` | `string` | `linear` | 缓动 |
| `countRange` | `array` | 未提供 | 个数 |
| `sizeRange` | `array` | `["5%","10%"]` | 尺寸范围 |
| `blurRange` | `array` | `[0,"5%"]` | 模糊范围 |
| `rotateRange` | `array` | 未提供 | 旋转范围 |
| `shape` | `functionOrString` | `bubble` | 形状<br>选项: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | 未提供 | 形状 |
| `distribution` | `string` | `random` | 分布<br>选项: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | 未提供 | 颜色范围 |
| `satuRange` | `array` | 未提供 | 饱和度范围 |
| `lumiRange` | `array` | 未提供 | 亮度范围 |
| `alphaRange` | `array` | `[0,0.5]` | 透明度范围 |
| `circular` | `boolean` | 未提供 | 圆形 |
| `angleRange` | `array` | 未提供 | 角度范围 |
| `radiusRange` | `array` | 未提供 | 半径范围 |
| `factorRange` | `array` | `[0.9,1]` | 因子范围 |
| `allowOverflowY` | `boolean` | 未提供 | 允许 Y 轴溢出 |
| `allowOverflowX` | `boolean` | 未提供 | 允许 X 轴溢出 |
| `gridType` | `string` | 未提供 | 网格类型<br>选项: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | 未提供 | 网格间距 |
| `durationRange` | `array` | 未提供 | 持续时间范围 |
| `delayRange` | `array` | 未提供 | 延迟时间范围 |
| `animaEasing` | `string` | 未提供 | 缓动函数<br>选项: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | 未提供 | 动画方向<br>选项: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | 未提供 | 帧率<br>选项: `30`, `60`, `120`, `240` |
| `onTick` | `function` | 未提供 | 动画帧回调 |

Bubble particle preset with upward drift:

The `bubble` shape uses `factor` as `centerAlpha` — the alpha of the bright center spot in its radial gradient — and `blur` as the edge feather radius.

### `scroller.stripy` and `scroller.grid`

These variants use background-based rendering rather than particles, but share the same scroller arguments (`direction`, `scroll`, `duration`, `easing`, `fromStart`).

---

## Particle shape showcase

The `onTick` callback + custom shapes unlock rich visual effects. These examples are trimmed from real community demos.

### Fish school (shape: `'fish'`)

Uses `onTick` to create a 3D swimming illusion — fish flip direction at stroke ends via `scaleX`, wiggle subtly, and swim along their rotation angle:

```javascript jaml-playground
export default jaml.wrapper({
    styles: [
        'size.fullsize',
        'css(background:linear-gradient(to bottom,#48D1CC,#0D47A1);width:100%;height:100%)',
        Styles.layer.canvas.particles({
            shape: 'fish',
            countRange: [60, 80],
            sizeRange: [25, 50],
            hueRange: [-180, 180],
            rotateRange: [-5, 5],
            durationRange: [2000, 3000],
            onTick(particle, progress, iterator) {
                const _alt = jam.easeProgress(progress, iterator, 'sineInOut', 'alternate');
                // Flip at stroke ends — fish turns sideways at progress=0 and progress=1
                const _phase = (progress + iterator - 0.5) * Math.PI;
                const _turn = Math.cos(_phase);
                particle.scaleX = Math.sign(_turn) * Math.pow(Math.abs(_turn), 0.4);
                // Swim forward along rotation
                const _rad = particle.initial.rotation * (Math.PI / 180);
                particle.x = particle.initial.x + Math.cos(_rad) * _alt * 120;
                particle.y = particle.initial.y + Math.sin(_rad) * _alt * 120;
                particle.opacity = 0.3 + Math.abs(_turn) * 0.7;
                // Body wiggle
                particle.rotation = particle.initial.rotation + Math.sin((progress + iterator) * Math.PI * 8) * 10;
            }
        })
    ]
});
```

### Floating flowers (shape: `'flower'`)

Flowers bloom with overshoot easing while alternating particles rotate in opposite directions. This example changes shape and rotation; it does not move particles in response to the cursor:

```javascript jaml-playground
export default jaml.wrapper({
    styles: [
        'size.fullsize',
        'css(width:100%;height:100%)',
        Styles.layer.canvas.particles({
            shape: 'flower',
            countRange: [20, 80],
            sizeRange: [16, 48],
            hueRange: [-180, 180],
            durationRange: [3000, 6000],
            factorRange: [0, 1],
            onTick(particle, progress, iterator, cursor) {
                // Petal bloom controlled by factor
                particle.factor = jam.easeProgress(progress, iterator, 'overshoot', 'alternate');
                // Rotating petal animation
                particle.rotation = (particle.index % 2 ? 1 : -1) * jam.easeProgress(progress, iterator, 'linear') * 360;
            }
        })
    ]
});
```

### Kanji horror (shape: a Chinese character)

Shows that `shape` can be any string — it renders as text via Canvas `fillText()`. Uses `fontFamily` for calligraphy fonts, `blurRange` for ghostly blur, `canvas: true` for interaction:

```javascript jaml-playground
export default jaml.wrapper({
    styles: [
        'size.fullsize',
        'css(width:100%;height:100%)',
        Styles.layer.canvas.particles({
            shape: '啊',
            countRange: [15, 25],
            sizeRange: [48, 96],
            fontFamily: 'kai,kaiti',
            blurRange: [2, 8],
            alphaRange: [0.2, 0.8],
            distribution: 'gaussian',
            frameRate: 30,
            onTick(particle, progress, iterator) {
                // Ghostly opacity pulse
                particle.opacity = particle.initial.opacity;
                if (particle.index % 2 === 0) {
                    particle.opacity += jam.easeProgress(progress, iterator, 'linear', 'alternate');
                }
                // Slow rotation
                particle.rotation = Math.min(particle.size * 0.02, iterator % 10) * Math.sin(progress * Math.PI);
                // Subtle cursor pull + random shake
                particle.x = particle.initial.x - (Math.random() - 0.5) * particle.size * 0.1;
                particle.y = particle.initial.y - (Math.random() - 0.5) * particle.size * 0.1;
            }
        })
    ]
});
```
