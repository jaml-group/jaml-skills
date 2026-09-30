# hover

<!-- Generated from native authoring; do not edit. -->

[中文](hover.zh.md)

<a id="entry-hover"></a>

Hover styles

Apply CSS for the hover state of the target selected by the style path.

The style uses a rule selector ending in :hover; it changes presentation and does not activate the state.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `width` → `height` → `minWidth` → `minHeight` → `maxWidth` → `maxHeight` → `padding` → `paddingTop` → `paddingRight` → `paddingBottom` → `paddingLeft` → `margin` → `marginTop` → `marginRight` → `marginBottom` → `marginLeft` → `gap` → `color` → `background` → `backgroundColor` → `border` → `borderRadius` → `opacity` → `overflow` → `transform` → `transition` → `whiteSpace` → `zIndex` → `setProperty` → `removeProperty` → `getPropertyValue` → `selector` → `method` → `direct` → `cssText` → `state`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | CSS display mode for the styled target, such as block, flex, grid or none. |
| `position` | `string` | CSS positioning mode for the styled target, such as relative, absolute, fixed or sticky. |
| `width` | `string` | CSS width of the styled target; use a CSS length, percentage or supported sizing keyword. |
| `height` | `string` | CSS height of the styled target; use a CSS length, percentage or supported sizing keyword. |
| `minWidth` | `string` | CSS minimum width constraint for the styled target. |
| `minHeight` | `string` | CSS minimum height constraint for the styled target. |
| `maxWidth` | `string` | CSS maximum width constraint for the styled target. |
| `maxHeight` | `string` | CSS maximum height constraint for the styled target. |
| `padding` | `string` | CSS inner spacing shorthand, accepting one to four side values. |
| `paddingTop` | `string` | CSS inner spacing at the top edge. |
| `paddingRight` | `string` | CSS inner spacing at the right edge. |
| `paddingBottom` | `string` | CSS inner spacing at the bottom edge. |
| `paddingLeft` | `string` | CSS inner spacing at the left edge. |
| `margin` | `string` | CSS outer spacing shorthand, accepting one to four side values. |
| `marginTop` | `string` | CSS outer spacing at the top edge. |
| `marginRight` | `string` | CSS outer spacing at the right edge. |
| `marginBottom` | `string` | CSS outer spacing at the bottom edge. |
| `marginLeft` | `string` | CSS outer spacing at the left edge. |
| `gap` | `string` | CSS spacing between grid or flex items; one value sets both axes and two values set row then column spacing. |
| `color` | `string` | CSS foreground color of the styled target; use a color value or a supported foreground token. |
| `background` | `string` | CSS background shorthand for the styled target, including supported fill tokens or explicit images and colors. |
| `backgroundColor` | `string` | CSS background color of the styled target; use a color value or supported fill token. |
| `border` | `string` | CSS border shorthand for width, style and color; supported border tokens are resolved by property context. |
| `borderRadius` | `string` | CSS corner rounding for the styled target; accepts supported radius tokens or CSS radius values. |
| `opacity` | `string` | CSS opacity of the styled target and its rendered contents, from transparent to opaque. |
| `overflow` | `string` | CSS overflow behavior for content outside the styled target; use one value or separate horizontal and vertical values. |
| `transform` | `string` | CSS transform applied to the styled target, such as translate, rotate or scale. |
| `transition` | `string` | CSS transition shorthand describing properties, duration, timing function and delay. |
| `whiteSpace` | `string` | CSS handling of whitespace and line wrapping in the styled target. |
| `zIndex` | `string` | CSS stacking order for the styled target, subject to its stacking context. |
| `setProperty` | `string` | Compatibility entry named setProperty from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `removeProperty` | `string` | Compatibility entry named removeProperty from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `getPropertyValue` | `string` | Compatibility entry named getPropertyValue from a style declaration method. It is not a CSS declaration or a callable JAML operation; do not pass it as a style argument. |
| `selector` | `string` | Selector<br>Automatically created from the style path by default. |
| `method` | `string` | Application method<br>Automatically selected from the style path by default.<br>Options: `vars` — vars — Variables — valueOrigin: `name`, `rule` — rule — Rules — valueOrigin: `name`, `props` — props — Properties — valueOrigin: `name` |
| `direct` | `boolean` | Direct children only<br>Child selectors use direct children unless the effective direct value is false, which selects descendants. |
| `cssText` | `functionOrString` | CSS content<br>A string or a function returning a dictionary or string.<br>Shorthand |
| `state` | `string` | State<br>Options: `hover` — Hover, `active` — Active, `focus` — Focus, `disabled` — Disabled, `visited` — Visited, `checked` — Checked, `indeterminate` — Indeterminate, `before` — before pseudo-element, `after` — after pseudo-element |

`Styles.hover.*` — hover-triggered visual effects applied to any element.

---

## Common arguments

<a id="common-args-hover-frame"></a>

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `size` | `number` | Not supplied | Size |
| `width` | `numberOrString` | `3` | Border width |
| `bias` | `number` | `0` | Border distance |
| `glow` | `number` | `5` | Glow |
| `radius` | `numberOrString` | `auto` | Border radius<br>auto: fit the element automatically; a numeric value specifies the radius in px. |
| `delay` | `number` | `0` | Delay |
| `breathe` | `boolean` | `false` | Breathing |
| `container` | `any` | Not supplied | Container |
| `clipTarget` | `any` | Not supplied | Clipping target |
| `easing` | `string` | Not supplied | Animation easing |
| `duration` | `number` | Not supplied | Animation duration |

## Variants

### `hover.frame`

<a id="entry-hover-frame"></a>

Frame

Use frame to highlight a hovered element without changing selection.

Marks the host as a locator target and, after connected readiness, installs parent hover handling. A shared locator follows the hovered marked element and hides when that target emits mouseleave or unmount.

Provide a connected host with a parent and the framework locator styles.

Use check styles for persistent selection feedback and layer.crosshair for a host-anchored breathing decoration; hover locators only follow the current hover target.

The locator is shared across calls, so do not assume independent simultaneous markers or independent option settings across hosts. Hover feedback supplies no selection state, keyboard activation or focus semantics.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

Common arguments: [hover.frame](#common-args-hover-frame).

Shows a frame locator around the element on mouseenter. The locator matches the target's border-radius and can glow, breathe, or animate with custom easing.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.frame(glow:10;breathe:true;easing:bouncing)'],
        components: [{ type: 'label', cap: 'Hover for frame' }]
    },
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.frame(glow:0;width:3;radius:12)'],
        components: [{ type: 'label', cap: 'Sharp frame, no glow' }]
    }
];
```

### `hover.shade`

<a id="entry-hover-shade"></a>

Shadow

Use shade to highlight a hovered element without changing selection.

Marks the host as a locator target and, after connected readiness, installs parent hover handling. A shared locator follows the hovered marked element and hides when that target emits mouseleave or unmount.

Provide a connected host with a parent and the framework locator styles.

Use check styles for persistent selection feedback and layer.crosshair for a host-anchored breathing decoration; hover locators only follow the current hover target.

The locator is shared across calls, so do not assume independent simultaneous markers or independent option settings across hosts. Hover feedback supplies no selection state, keyboard activation or focus semantics.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

Common arguments: [hover.frame](#common-args-hover-frame).

Shows a shaded locator behind the element on mouseenter. Same args as `frame`.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.shade(glow:8)'],
        components: [{ type: 'label', cap: 'Hover for shade' }]
    }
];
```

### `hover.crosshair`

<a id="entry-hover-crosshair"></a>

Crosshair

Use corner brackets to highlight a hovered element without changing selection.

Marks the host as a locator target and, after connected readiness, installs parent hover handling. A shared locator follows the hovered marked element and hides when that target emits mouseleave or unmount.

Provide a connected host with a parent and the framework locator styles.

Use check styles for persistent selection feedback and layer.crosshair for a host-anchored breathing decoration; hover locators only follow the current hover target.

The locator is shared across calls, so do not assume independent simultaneous markers or independent option settings across hosts. Hover feedback supplies no selection state, keyboard activation or focus semantics.

Positional order: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration`.

Common arguments: [hover.frame](#common-args-hover-frame).

Additions and overrides:

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `breathe` | `boolean` | `true` | Breathing |
| `easing` | `string` | `ease-in-out` | Animation easing |

Shows a crosshair corner-bracket locator on mouseenter. Same args as `frame` with `breathe` default `true`, `easing` default `'ease-in-out'`.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.crosshair(glow:6;duration:300)'],
        components: [{ type: 'label', cap: 'Hover for crosshair' }]
    }
];
```

### `hover.parallax`

<a id="entry-hover-parallax"></a>

Parallax

Add pointer-driven depth to a host.

Delegates hover transforms to PineappleParallax after connection and removes its hover effect on unplug.

A decorative pointer effect, not camera navigation; use interact.panNZoom for panning and zooming content.

Positional order: `intensity` → `maxDepth` → `inward` → `pan` → `startAngles`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `intensity` | `number` | `3` | Intensity |
| `maxDepth` | `number` | `3` | Maximum depth |
| `inward` | `boolean` | `false` | Inward |
| `pan` | `boolean` | `false` | Translation |
| `startAngles` | `array` | Not supplied | Start angle |

3D parallax tilt effect on mouse move. Add `pp-depth` attributes to children to control depth layers.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Tilt me',
        styles: ['hover.parallax(intensity:5;maxDepth:5)', 'css(padding:2rem)']
    },
    {
        type: 'card',
        cap: 'Inward tilt',
        styles: ['hover.parallax(inward:true;pan:true)', 'css(padding:2rem)']
    }
];
```

### `hover.dynamicbg`

<a id="entry-hover-dynamicbg"></a>

Dynamic background

Add a moving background hover treatment.

Adds the hover-dynamicbg class consumed by the hover stylesheet.

Shows an animated dynamic background on hover. No args.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.dynamicbg'],
        components: [{ type: 'label', cap: 'Hover for animated bg' }]
    }
];
```

### `hover.withbg`

<a id="entry-hover-withbg"></a>

Background

Add a hover background using the native surface treatment.

Adds the hover-withbg class, allowing the role/accent stylesheet to choose the hover surface.

Shows a solid background on hover. No args.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['css(padding:1rem)', 'hover.withbg'],
        components: [{ type: 'label', cap: 'Hover for bg' }]
    }
];
```

### `hover.highlightcap`

<a id="entry-hover-highlightcap"></a>

Highlight caption

Highlight a caption when its host is hovered.

Prepares a cap layer and adjusts/restores cap styling for non-button elements; button hosts use their existing presentation.

Requires an existing cap slot.

The owned layer is removed and saved caption styles are restored when unplugged.

Highlights the `cap` slot text on hover by inserting a background layer behind it. Does not apply to `BananaButton` elements. No args.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Hover to highlight me',
        styles: ['hover.highlightcap', 'css(padding:0.5rem)']
    }
];
```

### `hover.brighter`

<a id="entry-hover-brighter"></a>

Brighten

Increase brightness and saturation on hover.

Adds hover-brighter and exposes b and s as effect variables.

Use for decorative pointer feedback alongside an independently defined action.

Positional order: `b` → `s`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `b` | `number` | `1.04` | Lightness |
| `s` | `number` | `1.1` | Saturation |

Brightness and saturation boost on hover.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Brighten on hover',
        styles: ['hover.brighter(b:1.15;s:1.3)']
    },
    {
        type: 'button',
        cap: 'Subtle brighten',
        styles: ['hover.brighter']
    }
];
```

### `hover.toShowAll`

<a id="entry-hover-toshowall"></a>

Show all

Reveal clipped text on pointer hover.

Detects overflow on the selected target, copies its text and selected styles into a body-level label, and removes the label on mouse leave.

The popup contains text content, not a live copy of controls; essential content needs keyboard-accessible presentation as well.

Positional order: `selector` → `align`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `selector` | `string` | Not supplied | Selector |
| `align` | `string` | `center` | Alignment<br>Options: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `top`, `bottom`, `left`, `center`, `right` |

Shows a floating label clone of truncated text on hover. Useful for table cells or labels with `overflow: hidden` / `text-overflow: ellipsis`.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'This is a very long text that will be truncated due to overflow hidden style',
        styles: ['hover.toShowAll(align:top)', 'css(width:10rem;overflow:hidden;textOverflow:ellipsis;whiteSpace:nowrap)']
    }
];
```

### `hover.bouncing`

<a id="entry-hover-bouncing"></a>

Bounce

Add hover bounce feedback.

Adds the hover-bouncing class; it does not install a click handler.

Bounce animation on hover. No args.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Bounce on hover',
        styles: ['hover.bouncing']
    }
];
```

---

## Combo example

Combine `hover.parallax` with `interact.movable` for an interactive card:

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['props(width:30rem)', 'interact.movable', 'hover.parallax'],
        components: [
            {
                type: 'indicator',
                cap: 'Movable parallax card',
                styles: ['indicator.tips', 'auto.badge']
            }
        ]
    }
];
```
