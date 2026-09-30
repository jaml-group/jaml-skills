# layer.canvas

<!-- Generated from native authoring; do not edit. -->

[中文](canvas.zh.md)

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

particles

Use configurable particle imagery or per-particle motion.

Builds particle shapes in a sized canvas. onTick receives particle state, normalized progress, iteration, pointer information and the particle collection before each animated draw.

Give the host measurable width and height and use a browser with a 2D canvas context.

Rebuilds after initial resize setup, later resize events and dark-mode/accent/color events. Rebuilding cancels the previous particle animation; an active canvas loop cancels itself when its canvas is disconnected.

Use layer.background.bubbles or layer.background.gradient for CSS-only imagery. Use layer.scroller.particles to move a repeating particle canvas, or onTick to update individual particles.

Particle motion is enabled only when onTick is a function; duration and easing settings alone do not animate particles. Randomized rebuilding can change their arrangement.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | Not supplied | Size range |
| `blurRange` | `array` | Not supplied | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | Not supplied | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | Not supplied | Shape |
| `distribution` | `string` | `random` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | Not supplied | Color range |
| `satuRange` | `array` | Not supplied | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | Not supplied | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | Not supplied | Factor range |
| `allowOverflowY` | `boolean` | Not supplied | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | Not supplied | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | Not supplied | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

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

gradient

Use a soft multicolor canvas backdrop.

Draws large blurred triangles, squares and circles with overlapping accent-relative colors.

Give the host measurable width and height and use a browser with a 2D canvas context.

Rebuilds after initial resize setup, later resize events and dark-mode/accent/color events. Rebuilding cancels the previous particle animation; an active canvas loop cancels itself when its canvas is disconnected.

Use layer.background.bubbles or layer.background.gradient for CSS-only imagery. Use layer.scroller.particles to move a repeating particle canvas, or onTick to update individual particles.

Particle motion is enabled only when onTick is a function; duration and easing settings alone do not animate particles. Randomized rebuilding can change their arrangement.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `countRange` | `array` | `[10,10]` | Count |
| `sizeRange` | `array` | `["32%","64%"]` | Size range |
| `blurRange` | `array` | `["15%","25%"]` | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | Not supplied | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | `["triangle","square","circle"]` | Shape |
| `distribution` | `string` | `random` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | `[-180,180]` | Color range |
| `satuRange` | `array` | `[1,2]` | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | `[0.2,0.4]` | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | Not supplied | Factor range |
| `allowOverflowY` | `boolean` | `true` | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | `true` | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | `-20%` | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

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

sprinkles

Use a dense sprinkle texture.

Uses sprinkle-shaped particles with fill distribution and a small grid gap; appearance comes from the same particle renderer.

Give the host measurable width and height and use a browser with a 2D canvas context.

Rebuilds after initial resize setup, later resize events and dark-mode/accent/color events. Rebuilding cancels the previous particle animation; an active canvas loop cancels itself when its canvas is disconnected.

Use layer.background.bubbles or layer.background.gradient for CSS-only imagery. Use layer.scroller.particles to move a repeating particle canvas, or onTick to update individual particles.

Particle motion is enabled only when onTick is a function; duration and easing settings alone do not animate particles. Randomized rebuilding can change their arrangement.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | `[12,12]` | Size range |
| `blurRange` | `array` | Not supplied | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | `sprinkle` | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | Not supplied | Shape |
| `distribution` | `string` | `fill` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | `[-180,180]` | Color range |
| `satuRange` | `array` | `[1,2]` | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | `[0.5,0.5]` | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | Not supplied | Factor range |
| `allowOverflowY` | `boolean` | `true` | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | `true` | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | `3` | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

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

particles

Use a repeating particle field behind host content.

Creates two particle canvases that can travel as whole layers; per-particle onTick animation remains separate. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `down` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | Not supplied | Size range |
| `blurRange` | `array` | Not supplied | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | Not supplied | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | Not supplied | Shape |
| `distribution` | `string` | `random` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | Not supplied | Color range |
| `satuRange` | `array` | Not supplied | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | Not supplied | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | Not supplied | Factor range |
| `allowOverflowY` | `boolean` | Not supplied | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | Not supplied | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | Not supplied | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

Inherits all `canvas.particles` args plus scroller args:

### `scroller.bubbles`

<a id="entry-layer-scroller-bubbles"></a>

bubbles

Use rising bubble decoration behind host content.

Creates two enlarged particle canvases using bubble shapes, upward direction and soft transparent particle ranges. scroll true enables infinite directional CSS cycling; fromStart changes the initial phase.

Give the host usable geometry and load the framework layer styles. Enable scroll explicitly and choose a direction with a matching cycle animation: up, down, left or right.

Owns two child layers; removal of the composed style removes their decorations. Particle variants also use the canvas renderer lifecycle.

Use for decorative movement. Choose a scrolling container for user-controlled content navigation; these styles do not change scrollTop or scrollLeft.

scroll defaults to false. The style overrides each child animation with its cycle animation and does not itself add host clipping; choose host overflow deliberately.

Positional order: `zIndex` → `dropShadow` → `boxShadow` → `mask` → `filter` → `padding` → `borderRadius` → `transform` → `border` → `clipPath` → `animation` → `opacity` → `css` → `depth` → `class` → `attrs` → `rotateX` → `rotateY` → `translateY` → `slot` → `content` → `entryAnimation` → `exitAnimation` → `fromStart` → `direction` → `scroll` → `duration` → `easing` → `countRange` → `sizeRange` → `blurRange` → `rotateRange` → `shape` → `shapes` → `distribution` → `hueRange` → `satuRange` → `lumiRange` → `alphaRange` → `circular` → `angleRange` → `radiusRange` → `factorRange` → `allowOverflowY` → `allowOverflowX` → `gridType` → `gridGap` → `durationRange` → `delayRange` → `animaEasing` → `animaDirection` → `frameRate` → `onTick`.

Common arguments: [layer.overlay](overlay.md#entry-layer-overlay).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `css` | `dictionaryOrString` | `{"height":"400%"}` | CSS |
| `class` | `string` | Not supplied | Class |
| `content` | `any` | Not supplied | Content |
| `entryAnimation` | `string` | `unset` | Entry animation |
| `fromStart` | `boolean` | `false` | Start from the beginning |
| `direction` | `string` | `up` | Direction |
| `scroll` | `boolean` | `false` | Scrolling |
| `duration` | `numberOrString` | `10000` | Scroll duration |
| `easing` | `string` | `linear` | Easing |
| `countRange` | `array` | Not supplied | Count |
| `sizeRange` | `array` | `["5%","10%"]` | Size range |
| `blurRange` | `array` | `[0,"5%"]` | Blur range |
| `rotateRange` | `array` | Not supplied | Rotation range |
| `shape` | `functionOrString` | `bubble` | Shape<br>Options: `snowflake`, `tetragram`, `pentagram`, `star`, `triangle`, `rhombus`, `square`, `hexagon`, `circle`, `raindrop`, `spindle`, `sprinkle`, `bubble`, `heart`, `spade`, `club`, `diamond`, `clover`, `flower`, `butterfly`, `fish`, `footprint` |
| `shapes` | `array` | Not supplied | Shape |
| `distribution` | `string` | `random` | Distribution<br>Options: `random`, `halton`, `gaussian`, `fill` |
| `hueRange` | `array` | Not supplied | Color range |
| `satuRange` | `array` | Not supplied | Saturation range |
| `lumiRange` | `array` | Not supplied | Lightness range |
| `alphaRange` | `array` | `[0,0.5]` | Opacity range |
| `circular` | `boolean` | Not supplied | Circular |
| `angleRange` | `array` | Not supplied | Angle range |
| `radiusRange` | `array` | Not supplied | Radius range |
| `factorRange` | `array` | `[0.9,1]` | Factor range |
| `allowOverflowY` | `boolean` | Not supplied | Allow overflow on the Y axis |
| `allowOverflowX` | `boolean` | Not supplied | Allow overflow on the X axis |
| `gridType` | `string` | Not supplied | Grid type<br>Options: `honeycomb`, `square`, `isometric` |
| `gridGap` | `numberOrString` | Not supplied | Grid spacing |
| `durationRange` | `array` | Not supplied | Duration range |
| `delayRange` | `array` | Not supplied | Delay range |
| `animaEasing` | `string` | Not supplied | Easing function<br>Options: `linear`, `ease`, `easeIn`, `easeOut`, `easeInOut`, `boing`, `urging`, `bouncing`, `decelerate`, `accelerate`, `smooth`, `sine`, `sineIn`, `sineOut`, `sineInOut`, `crisp`, `overshoot`, `runup`, `quartOut`, `velvet`, `gear`, `plateau` |
| `animaDirection` | `string` | Not supplied | Animation direction<br>Options: `normal`, `reverse`, `alternate`, `alternate-reverse` |
| `frameRate` | `number` | Not supplied | Frame rate<br>Options: `30`, `60`, `120`, `240` |
| `onTick` | `function` | Not supplied | Animation frame callback |

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
