# animation

`Styles.animation.*` — entry and exit animations with configurable easing, delay, and direction. Animations are CSS-based and set via custom properties on the element.

---

## Common animation args

All entry and exit animations share these base args. Defaults differ slightly between entry and exit (exit uses `direction: 'reverse'`).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `duration` | `number \| string` | Animation duration | Default: `200`. Unit: `ms`. Accepts `seq()` and `random()` |
| `easing` | `string` | CSS easing function | Default: `'ease-in-out'`. See easing table below |
| `delay` | `number \| string` | Delay before animation starts | Default: `0`. Unit: `ms`. Accepts `seq()` and `random()` |
| `fill` | `string` | CSS animation fill mode | Default: `'backwards'` |
| `origin` | `string` | Transform origin for the animation | CSS transform-origin value |
| `direction` | `string` | Playback direction | Default: `'normal'` (entry), `'reverse'` (exit) |
| `beforeApply` | `function` | Callback run before the animation CSS is applied | Receives `(el, args)` |
| `triggerSelector` | `string` | CSS selector for a trigger element | Used by `genie` animation to determine origin |

---

## `delay` and `duration` helpers

Both `delay` and `duration` accept special computed values for staggered or randomized timing:

| Helper | Type | Description | Notes |
|---|---|---|---|
| `seq(per, offset, limit)` | `string` | Staggered delay across elements | Each element gets `offset + index * per` ms. Uses `--jam-anima-idx`. Optional `limit` caps increasing sequences or floors decreasing sequences; zero `per` ignores the limit. `per` default: `40`, `offset` default: `0` |
| `random(min, max)` | `string` | Random delay | Random value in `[min, max]` ms. `min` default: `0`, `max` default: `duration - 100` |

```javascript
Styles.animation.entry.fromleft({ delay: 'seq(50, 100)' })
Styles.animation.entry.frombottom({ delay: 'random(0, 400)' })
```

## Generic animation

### `animation`

Runs `element.animate(keyframes, options)` directly. Use this when a one-off Web Animations API keyframe sequence is more precise than an entry/exit preset.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `keyframes` | `array` | Web Animations API keyframes | Required |
| `duration` | `number` | Animation duration in ms | Default: `200` |
| `delay` | `number` | Delay before animation starts | Default: `0` |
| `easing` | `string` | CSS easing | Default: `'ease-in-out'` |
| `fill` | `string` | Fill mode | Default: `'backwards'` |
| `direction` | `string` | Playback direction | Default: `'normal'` |
| `iterations` | `number` | Iteration count | Default: `1` |
| `composite` | `string` | Composite mode | Default: `'accumulate'` |

The current generic style adapter forwards its CSS-unit delay (for example `"0ms"`) to `Element.animate`, which requires a numeric delay. Until that adapter is corrected, use native timing with explicit lifecycle cleanup for a custom sequence; entry/exit presets below use the CSS animation path.

```javascript jaml-playground
export default {
  type: 'label',
  cap: 'Pulse',
  onmount() {
    this.pulseAnimation = this.animate(
      [{ opacity: 0.4 }, { opacity: 1 }],
      { duration: 600, delay: 0, iterations: Infinity, direction: 'alternate' }
    );
  },
  onunmount() {
    this.pulseAnimation?.cancel();
  }
}
```

---

## Easing names

| Name | Bezier | Description |
|---|---|---|
| `linear` | `(0, 0, 1, 1)` | Linear |
| `ease` | `(0.25, 0.1, 0.25, 1)` | Default CSS ease |
| `easeIn` | `(0.42, 0, 1, 1)` | Ease in |
| `easeOut` | `(0, 0, 0.58, 1)` | Ease out |
| `easeInOut` | `(0.42, 0, 0.58, 1)` | Ease in-out |
| `boing` | `(0.5, 0.5, 0.55, 1.68)` | Boing bounce |
| `urging` | `(0.23, 1, 0.32, 1)` | Urging |
| `bouncing` | `(0.44, 0.42, 0.16, 1.25)` | Bouncing |
| `decelerate` | `(0.23, 1, 0.32, 1)` | Decelerate |
| `accelerate` | `(0.55, 0.055, 0.675, 0.19)` | Accelerate |
| `smooth` | `(0.645, 0.045, 0.355, 1)` | Smooth |
| `sine` | `(0.445, 0.05, 0.55, 0.95)` | Sine |
| `sineIn` | `(0.47, 0, 0.745, 0.715)` | Sine in |
| `sineOut` | `(0.39, 0.575, 0.565, 1)` | Sine out |
| `overshoot` | `(0.68, -0.55, 0.265, 1.55)` | Overshoot and settle |
| `runup` | `(0.68, -0.55, 0.5, 0.5)` | Wind-up and go |
| `quartOut` | `(0.165, 0.84, 0.44, 1)` | Quart out |
| `velvet` | `(0.19, 1, 0.22, 1)` | Velvet smooth |
| `gear` | `(0.55, 0.085, 0.68, 0.53)` | Mechanical gear |
| `plateau` | `(0.25, 0.5, 0.75, 0.5)` | Flat plateau |

You can also pass a raw `cubic-bezier()` array `[x1, y1, x2, y2]`, a `linear(...)` value, or a `steps(n, position)` value.

---

## Entry animations

All entry animations support the common animation args above plus animation-specific args.

### `animation.entry.fadein`

Fade in from transparent to opaque.

| Arg | Type | Description | Notes |
|---|---|---|---|
| — | — | — | Uses only common animation args |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Fade in",
        "styles": ["animation.entry.fadein(duration:500)"]
    }
]
```

### `animation.entry.appear`

Appear with scale + opacity.

| Arg | Type | Description | Notes |
|---|---|---|---|
| — | — | Uses the built-in scale keyframes | For configurable scale, use `animation.entry.zoom` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Appear",
        "styles": ["animation.entry.appear(duration:400)"]
    }
]
```

### `animation.entry.genie`

Genie-lamp style expand. Optionally reads a trigger element for the transform origin.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Genie",
        "styles": ["animation.entry.genie(duration:500)"]
    }
]
```

### `animation.entry.zoom`

Zoom in with a configurable starting scale.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `scale` | `number` | Starting scale | Default: `0.5` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Zoom in",
        "styles": ["animation.entry.zoom(scale:0.3;duration:400)"]
    }
]
```

### `animation.entry.feather`

Feather edge reveal — mask-based animation that gradually reveals content.

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Feather",
        "styles": ["animation.entry.feather(duration:600)"]
    }
]
```

### `animation.entry.squeeze`

Squeeze in from a configured direction.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `from` | `string` | Direction to squeeze from | Default: `'bottom'`. Options: `'top'`, `'right'`, `'bottom'`, `'left'` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Squeeze",
        "styles": ["animation.entry.squeeze(from:left;duration:300)"]
    }
]
```

### Directional slides

Slide in from each direction. No direction-specific args beyond the common set.

- **`animation.entry.fromleft`** — slide in from the left
- **`animation.entry.fromright`** — slide in from the right
- **`animation.entry.fromtop`** — slide in from the top
- **`animation.entry.frombottom`** — slide in from the bottom

```json jaml-playground
[
    {
        "type": "label",
        "cap": "From left",
        "styles": ["animation.entry.fromleft(duration:300)"]
    },
    {
        "type": "label",
        "cap": "From right",
        "styles": ["animation.entry.fromright(duration:400)"]
    }
]
```

### Directional flips

Flip in from each direction. All share arg: `perspective` (number, default: `100`, unit: `px`).

- **`animation.entry.flipupfront`** — flip up from back
- **`animation.entry.flipdownfront`** — flip down from back
- **`animation.entry.flipleftfront`** — flip from the left
- **`animation.entry.fliprightfront`** — flip from the right

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Flip up",
        "styles": ["animation.entry.flipupfront(perspective:150;duration:400)"]
    },
    {
        "type": "label",
        "cap": "Flip right",
        "styles": ["animation.entry.fliprightfront(duration:350)"]
    }
]
```

---

## Exit animations

All exit animations support the common animation args. Exit animations default to `direction: 'reverse'`.

### `animation.exit.fadeout`

Fade out from opaque to transparent. Uses only common animation args.

### `animation.exit.disappear`

Disappear with scale + opacity (reverse of appear).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `scale` | `number` | Ending scale | Default: `0.8` |

### `animation.exit.genie`

Genie-lamp style collapse. Same args as `animation.entry.genie`.

### `animation.exit.blurnout`

Blur out with a configurable blur radius and scale.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `blur` | `number` | Ending CSS `filter: blur()` | Default: `5`. Unit: `px` |
| `scale` | `number` | Ending scale | Default: `1.5` |

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Blur out",
        "styles": ["animation.exit.blurnout(blur:10;scale:1.5;duration:400)"]
    }
]
```

### `animation.exit.zoom`

Zoom out with a configurable ending scale.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `scale` | `number` | Ending scale | Default: `0.5` |

### `animation.exit.squeeze`

Squeeze out toward a configured direction.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `to` | `string` | Direction to squeeze out to | Default: `'bottom'`. Options: `'top'`, `'right'`, `'bottom'`, `'left'` |

### Directional slides

Slide out to each direction. No direction-specific args beyond the common set.

- **`animation.exit.toleft`** — slide out to the left
- **`animation.exit.toright`** — slide out to the right
- **`animation.exit.totop`** — slide out to the top
- **`animation.exit.tobottom`** — slide out to the bottom

### Directional flips

Flip out to each direction. All share arg: `perspective` (number, default: `100`, unit: `px`).

- **`animation.exit.flipupback`** — flip up to back
- **`animation.exit.flipdownback`** — flip down to back
- **`animation.exit.flipleftback`** — flip to left
- **`animation.exit.fliprightback`** — flip to right

```json jaml-playground
[
    {
        "type": "label",
        "cap": "Fade out",
        "styles": ["animation.exit.fadeout(duration:300)"]
    },
    {
        "type": "label",
        "cap": "Blur out",
        "styles": ["animation.exit.blurnout(blur:10;scale:1.5;duration:400)"]
    }
]
```

---

## `animation.flipchild`

FLIP (First, Last, Invert, Play) animation for child elements. Animates children from their old positions to new positions when the layout changes (children added, removed, shown, or hidden).

| Arg | Type | Description | Notes |
|---|---|---|---|
| `duration` | `number` | Animation duration in ms | Default: `200` |
| `delay` | `number \| string` | Delay in ms | Default: `0`. Accepts `seq()` |

```json jaml-playground
[
    {
        "type": "container",
        "styles": ["animation.flipchild(duration:300)"],
        "components": [
            { "type": "label", "cap": "Child 1" },
            { "type": "label", "cap": "Child 2" },
            { "type": "label", "cap": "Child 3" }
        ]
    }
]
```

## `animation.intersectionBlocker`

Blocks entry animation until observed children become visible through an `IntersectionObserver`. Useful for long lists or scroll-driven reveals.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `target` | `string` | Selector for observed children | Default: `':scope'`. Shorthand |
| `filter` | `function` | Node filter | Default: `node instanceof AbstractElement` |
| `option` | `dictionary` | IntersectionObserver options | — |

```javascript jaml-playground
export default {
  type: 'wrapper',
  styles: [Styles.animation.intersectionBlocker({ target: ':scope > *' })],
  components: [
    { type: 'label', cap: 'Observed child', styles: ['animation.entry.frombottom'] }
  ]
}
```

---

## Usage

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['animation.entry.frombottom(delay:seq(30);duration:400)'],
  components: [
    { type: 'label', cap: 'Animated entry' }
  ]
}
```

---

## FLIP animation

```javascript jaml-playground
function _label(i) {
  return jame(
    {
      type: 'label',
      cap: i,
      color: 'random',
      styles: [
        Styles.background.stripy,
        Styles.animation.entry.frombottom({ delay: 'seq(25)', easing: 'bouncing', duration: 400 }),
        Styles.animation.exit.squeeze({ to: 'left', duration: 200 }),
        Styles.interact.closable
      ]
    });
}

export default jaml.wrapper(
  {
    styles: [
      'layout.autogrid(repeat:4)',
      'css(position:relative;gap:1rem;overflow:auto)',
      'animation.flipchild(duration:250;fill:backwards;easing:ease;delay:seq(20))'
    ]
  },
  [
    ...new Array(12).fill(0).map((_, i) => _label(i + 1)),
    jaml.button('add', {
      onclick() {
        const w = this.ref('wrapper');
        w.appendChild(jame(_label(w.childElementCount)));
      }
    })
  ]
);
```

---

## Built-in popup keyframes

Used internally by `PopupType.dropDown` for expand/collapse transitions. The `DIR_Y` placeholder in the dropdown's animation string (`'expand-DIR_Y 300ms ease-out'`) is resolved at runtime based on the popup's position relative to its target.

| Keyframe | Trigger | Description |
|---|---|---|
| `expand-bottom` | Show | Expands downward: fades in + slides down + scales Y from 0.75 |
| `collapse-bottom` | Hide | Collapses upward: fades out + slides up + scales Y to 0.75 |
| `expand-top` | Show | Expands upward: fades in + slides up + scales Y from 0.75 |
| `collapse-top` | Hide | Collapses downward: fades out + slides down + scales Y to 0.75 |

All use `translate3d(var(--translate-x), ..., 0px) scaleY(...)` and animate both `opacity` and `transform`.

### Directional scale and FLIP events

The directional entry styles (`fromleft`, `fromright`, `fromtop`, `frombottom`) and corresponding exit styles (`toleft`, `toright`, `totop`, `tobottom`) accept `scale` alongside `distance`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `scale` | `number` | Starting entry scale or ending exit scale along the movement axis | Default: `1`, preserving translation-only motion |

`animation.flipchild` also accepts the following event lists. Before events capture positions; after events animate the resulting layout. Repeated layout changes retarget active FLIP motion.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `beforeEvents` | `string[]` | Replace capture events | Default: `beforechildremove`, `beforechildhide`, `beforechildshow`, `beforechildadd` |
| `afterEvents` | `string[]` | Replace animation events | Default: `childremoving`, `childhiding`, `childshow`, `childadded` |
| `additionalBeforeEvents` | `string[]` | Append capture events | Default: `[]` |
| `additionalAfterEvents` | `string[]` | Append animation events | Default: `[]` |
