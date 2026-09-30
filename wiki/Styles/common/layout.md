# common.layout

<!-- Generated from native authoring; do not edit. -->

[中文](layout.zh.md)

`Styles.layout.*` — CSS layout properties and layout helpers.

---

## Variants

### `layout`

<a id="entry-layout"></a>

Layout

Adjust layout properties without switching to a specialized layout preset.

Sets display, position, order, overflow, gap, stacking, box sizing, transform, and transition when provided.

Use layout.grid or layout.flex for their specialized layout contracts; coordinate transform and overflow with motion or scroll owners.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `display` → `position` → `order` → `overflow` → `gap` → `zIndex` → `boxSizing` → `transform` → `transition`.

| Argument | Type | Contract |
| --- | --- | --- |
| `display` | `string` | Display mode |
| `position` | `string` | Position |
| `order` | `number` | Order<br>`{"cssKey":"order"}` |
| `overflow` | `string` | Overflow<br>`{"cssKey":"overflow"}` |
| `gap` | `numberOrString` | Gap |
| `zIndex` | `number` | Layer order<br>`{"cssKey":"zIndex"}` |
| `boxSizing` | `string` | Box sizing<br>`{"cssKey":"boxSizing"}` |
| `transform` | `string` | Transform<br>`{"cssKey":"transform"}` |
| `transition` | `string` | Transition<br>`{"cssKey":"transition"}` |

Base layout properties.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout(display:flex;gap:1rem)']
    }
];
```

### `layout.basic`

<a id="entry-layout-basic"></a>

Basic

Apply the legacy basic layout marker.

Adds the layout class.

This entry does not implement measuring or layout logic. No dedicated native consumer for this marker was found; choose explicit layout/size styles, or label.atTop for label placement, rather than relying on the name.

Adds `jam-layout` CSS class for basic layout styling. No args.

### `layout.grid`

<a id="entry-layout-grid"></a>

Grid

Use an explicit equal-track grid for a known row/column arrangement.

Sets grid counts and track variables; size supplies rows then columns. withHeader reserves an automatic first row.

Load the framework stylesheet and distinguish the container layout from child placement.

Place gridpos or gridsize on child items. Use autogrid for size-driven wrapping and flex for a one-dimensional row or column.

It arranges supplied children; it does not create application regions or assign data positions.

Positional order: `rows` → `cols` → `gap` → `padding` → `size` → `withHeader`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `rows` | `numberOrString` | Not supplied | Row count |
| `cols` | `numberOrString` | Not supplied | Column count |
| `gap` | `numberOrString` | Not supplied | Gap |
| `padding` | `numberOrString` | Not supplied | Padding |
| `size` | `array` | Not supplied | Row/column counts<br>Row/column counts<br>Shorthand |
| `withHeader` | `boolean` | `false` | Include a header |

CSS grid with explicit row/column counts.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout.grid(rows:2;cols:3;gap:0.5rem)']
    }
];
```

### `layout.autogrid`

<a id="entry-layout-autogrid"></a>

Automatic grid

Use size-driven grid repetition for repeated cards or tiles.

Builds CSS repeat tracks from repeat and sizing arguments. Its default repeat is auto-fill; a numeric repeat fixes a count rather than adapting the column count automatically.

Load the framework stylesheet and distinguish the container layout from child placement.

Use width or minWidth/maxWidth to express track sizing. Use layout.grid when explicit row/column coordinates are required.

This is CSS grid repetition, not masonry or content-aware packing. Numeric repeat selects a fixed count; verify track sizing against the available space.

Positional order: `repeat` → `withHeader` → `width` → `minWidth` → `maxWidth` → `height` → `minHeight` → `maxHeight` → `size`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `repeat` | `numberOrString` | `auto-fill` | Track repeat count |
| `withHeader` | `boolean` | `false` | Include a header |
| `width` | `string` | Not supplied | Width<br>`{"cssKey":"width"}` |
| `minWidth` | `string` | Not supplied | Minimum width<br>`{"cssKey":"minWidth"}` |
| `maxWidth` | `string` | Not supplied | Maximum width<br>`{"cssKey":"maxWidth"}` |
| `height` | `string` | Not supplied | Height<br>`{"cssKey":"height"}` |
| `minHeight` | `string` | Not supplied | Minimum height<br>`{"cssKey":"minHeight"}` |
| `maxHeight` | `string` | Not supplied | Maximum height<br>`{"cssKey":"maxHeight"}` |
| `size` | `string` | Not supplied | Dimensions<br>Shorthand |

Auto-fill grid — columns auto-wrap based on available width. A numeric `repeat` selects a fixed column count instead.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout.autogrid(width:10rem)']
    }
];
```

### `layout.gridpos`

<a id="entry-layout-gridpos"></a>

Grid position

Use explicit starting grid lines and spans for one child inside a grid.

Maps left/top to column/row starts and width/height to column/row spans.

Load the framework stylesheet and distinguish the container layout from child placement.

Apply to a child of layout.grid or another explicit CSS grid; use gridsize when only spans are needed.

The parent must provide grid layout. It does not position the parent or create tracks; supply meaningful start/span values.

Positional order: `left` → `top` → `width` → `height`.

| Argument | Type | Contract |
| --- | --- | --- |
| `left` | `numberOrString` | Left |
| `top` | `numberOrString` | Top |
| `width` | `numberOrString` | Column span |
| `height` | `numberOrString` | Row span |

Position a child within a parent grid.

### `layout.gridsize`

<a id="entry-layout-gridsize"></a>

Grid spans

Use row and column spans for a child while leaving its starting position to grid placement.

Sets grid-row-end and grid-column-end spans from height and width.

Load the framework stylesheet and distinguish the container layout from child placement.

Apply to a grid child; use gridpos when explicit start lines are also required.

It has no grid-placement effect without a grid parent and does not create tracks.

Positional order: `width` → `height`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `width` | `numberOrString` | `1` | Column span |
| `height` | `numberOrString` | `1` | Row span |

Set grid child size via row/column span.

### `layout.flex`

<a id="entry-layout-flex"></a>

Flex

Use a row or column flow with flexible alignment and wrapping.

Combines flex and alignment arguments on a flex container. Framework styles enable wrapping unless overridden.

Load the framework stylesheet and distinguish the container layout from child placement.

Use grid or autogrid when two-dimensional track relationships matter. Keep shell regions and scrolling with the chosen page/application layout.

It does not create children, semantic roles or route/content hosts.

Positional order: `flex` → `wrap` → `direction` → `gap` → `alignSelf` → `alignItems` → `alignContent` → `justifySelf` → `justifyItems` → `justifyContent` → `align`.

| Argument | Type | Contract |
| --- | --- | --- |
| `flex` | `string` | Flex<br>The flex property is shorthand for flex-grow, flex-shrink, and flex-basis. Its default is 0 1 auto; the last two properties are optional.<br>Shorthand<br>`{"cssKey":"flex"}` |
| `wrap` | `string` | Wrap<br>The flex-wrap property controls whether a flex container uses one or multiple lines and how those lines wrap.<br>Options: `nowrap` — No wrapping, `wrap` — Wrap, `wrap-reverse` — Reverse wrapping<br>`{"cssKey":"flexWrap"}` |
| `direction` | `string` | Direction<br>The flex-direction property determines the direction of the main axis, which controls how items are arranged.<br>Options: `row` — Horizontal, `row-reverse` — Reverse horizontal, `column` — Vertical, `column-reverse` — Reverse vertical<br>`{"cssKey":"flexDirection"}` |
| `gap` | `string` | Gap<br>The gap property sets the spacing between flex items.<br>`{"cssKey":"gap"}` |
| `alignSelf` | `string` | Self alignment on the cross axis<br>align-self overrides align-items for an individual item. In Grid, it aligns the item within its grid area; in Flexbox, it aligns the item on the cross axis, perpendicular to the flex direction.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"alignSelf"}` |
| `alignItems` | `string` | Child alignment on the cross axis<br>align-items sets the default align-self for direct children as a group. In Flexbox, it controls cross-axis alignment; in Grid, it controls block-axis alignment within each grid area.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"alignItems"}` |
| `alignContent` | `string` | Content distribution (align-content)<br>align-content distributes space between and around flex lines on the cross axis, or grid tracks on the block axis.<br>Options: `flex-start` — Start, `center` — Center, `flex-end` — End, `space-between` — Space between, `space-around` — Space around, `space-evenly` — Space evenly<br>`{"cssKey":"alignContent"}` |
| `justifySelf` | `string` | Self alignment on the main axis<br>justify-self aligns an individual box on the appropriate axis within its layout container.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"justifySelf"}` |
| `justifyItems` | `string` | Child alignment on the main axis<br>justify-items sets the default justify-self for items, aligning them on the appropriate axis within their boxes.<br>Options: `stretch` — Stretch, `center` — Center, `baseline` — Baseline, `flex-end` — End, `flex-start` — Start<br>`{"cssKey":"justifyItems"}` |
| `justifyContent` | `string` | Main-axis content distribution<br>justify-content distributes space between and around items on a flex container's main axis or a grid container's inline axis.<br>Options: `flex-start` — Start, `center` — Center, `flex-end` — End, `space-between` — Space between, `space-around` — Space around, `space-evenly` — Space evenly<br>`{"cssKey":"justifyContent"}` |
| `align` | `string` | Alignment<br>align is shorthand for setting align-items and align-content together.<br>Shorthand<br>Options: `left-top` — Top left, `center-top` — Top center, `right-top` — Top right, `left-middle` — Middle left, `center-middle` — Center, `right-middle` — Middle right, `left-bottom` — Bottom left, `center-bottom` — Bottom center, `right-bottom` — Bottom right, `around-top` — Space around, top, `around-middle` — Space around, middle, `around-bottom` — Space around, bottom, `evenly-top` — Space evenly, top, `evenly-middle` — Space evenly, middle, `evenly-bottom` — Space evenly, bottom, `between-top` — Space between, top, `between-middle` — Space between, middle, `between-bottom` — Space between, bottom |

Flexbox container. Combines flex and align args.

Accepts all args from [flex](./flex.md) and [align](./align.md).

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layout.flex(direction:row;gap:1rem;alignItems:center)']
    }
];
```

### `layout.autoalign`

<a id="entry-layout-autoalign"></a>

Automatic alignment

Align wrapped children into common grid tracks.

Measures rendered rows on resize, computes shared column spans and optionally proportional row tracks, then invokes a function-valued afterAlign callback.

Requires measurable native children; use an explicit grid when deterministic authored tracks are preferable.

Positional order: `afterAlign` → `scaledRows`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `afterAlign` | `functionOrString` | Not supplied | After alignment<br>Shorthand |
| `scaledRows` | `boolean` | `true` | Scale rows |

Measures wrapped rows and assigns shared grid tracks. Compose `layout.alignlabel` explicitly when field labels should align; use `layout.flex(direction:column)` for vertical stacking.

Use `afterAlign` for work that depends on completed alignment.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        cap: 'Form',
        styles: ['layout.autoalign', 'layout.alignlabel'],
        components: [
            { type: 'input', cap: 'Name' },
            { type: 'input', cap: 'Email' }
        ]
    }
];
```

### `layout.alignlabel`

<a id="entry-layout-alignlabel"></a>

Align labels

Align native form labels to a shared measured width.

On resize, measures eligible child label slots and writes the maximum label width; top labels and overflowing children are skipped.

Use native child elements exposing label slots; measurement requires rendered layout.

Aligns labels with form inputs for consistent left edges. Listens to `resize` events and adjusts label widths.

No args.

> **Form pattern:** For forms, use `layout.autoalign` + `layout.alignlabel` together on the form wrapper. `autoalign` measures wrapped rows and assigns shared grid tracks; `alignlabel` aligns their labels. Choose `layout.flex` with an explicit column direction when vertical stacking is the requirement.

### `layout.autoheight`

<a id="entry-layout-autoheight"></a>

Automatic height

Return a resizable element to automatic height when a resize gesture ends.

Adds the jam-autoheight attribute. At resize completion, DamsonDragNDrop sets the resized element’s inline height to auto when the element or one of its descendants has this attribute.

This is a resize-end marker; it does not continuously measure content or control label placement.

Adds `jam-autoheight`. When a resize gesture ends, the native resize helper resets the resized element’s height to `auto` if the element or a descendant has this marker. It does not continuously measure content.

### `layout.takeupspace`

<a id="entry-layout-takeupspace"></a>

Fill remaining space

Apply the legacy remaining-space layout marker.

Adds the layout-takeupspace class.

This entry does not implement measuring or layout logic. No dedicated native consumer for this marker was found; choose explicit layout/size styles, or label.atTop for label placement, rather than relying on the name.

Adds the legacy `jam-layout-takeupspace` marker. It does not implement remaining-space sizing in this baseline; use explicit flex/grid sizing.

### `layout.odd`

<a id="entry-layout-odd"></a>

Odd

Color odd render positions in a layout.

Applies the alternating-color variable to descendants whose jam-pos marker matches the chosen parity.

Requires render-position markers from a compatible layout/group style; this does not compute positions itself.

Styles descendants whose existing `jam-pos` markers contain `odd`. It does not create those render-position markers.

### `layout.even`

<a id="entry-layout-even"></a>

Even

Color even render positions in a layout.

Applies the alternating-color variable to descendants whose jam-pos marker matches the chosen parity.

Requires render-position markers from a compatible layout/group style; this does not compute positions itself.

Styles descendants whose existing `jam-pos` markers contain `even`. It does not create those render-position markers.

### `layout.labelAtTop`

<a id="entry-layout-labelattop"></a>

Align labels at the top

Apply the legacy child labels above content marker.

Adds the child-label-attop class.

This entry does not implement measuring or layout logic. No dedicated native consumer for this marker was found; choose explicit layout/size styles, or label.atTop for label placement, rather than relying on the name.

Adds the legacy `jam-child-label-attop` marker without a native positioning consumer in this baseline. Apply `label.atTop` to the actual native field elements.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Name',
        styles: ['label.atTop']
    }
];
```

### `layout.able`

<a id="entry-layout-able"></a>

Composable layout editing

Position configured dashboard cards in a grid.

Reads config.size as columns/rows and config.gap, then applies configured card coordinates to matching child ids initially and on childadded.

Requires config with size and cards; each card must identify its child.

Prefer layout.grid with explicit child placement for ordinary authored layouts; this entry serves the composable configuration model.

Positional order: `config`.

| Argument | Type | Contract |
| --- | --- | --- |
| `config` | `any` | Composable layout configuration |

Configurable card layout via a config object.

### `layout.overflow`

<a id="entry-layout-overflow"></a>

Overflow and animation clipping

Choose overflow policy and optionally clip content around mount-triggered entry animations.

A truthy all overrides x/y. With truthy animaDelay, mount adds jam-no-overflow; bubbling animationend events restart a debounce that removes the marker after the delay only if it was absent when this style was applied.

Overflow is applied as CSS; temporary clipping hides content outside the host.

Use on a host that receives the expected mount and animationend events. Clipping is not immediately applied when attaching to an already-mounted host.

Teardown removes installed listeners and plugin data, and removes the temporary clipping marker only if it was absent before application. A marker that existed before application is preserved. Already-queued debounce work may still run, but its application-identity check makes it inert.

Compose with an entry animation that actually emits animationend. Specify all or per-axis policies; x and y default to auto.

The delay starts after animationend, not mount. Without an end event clipping can remain; descendant events are not filtered and animationcancel is not handled.

Positional order: `all` → `x` → `y` → `animaDelay`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `all` | `string` | Not supplied | Both axes; shorthand argument<br>Shorthand<br>Options: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `x` | `string` | `auto` | Horizontal overflow<br>Options: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `y` | `string` | `auto` | Vertical overflow<br>Options: `auto`, `hidden`, `visible`, `scroll`, `clip` |
| `animaDelay` | `number` | Not supplied | Animation clipping delay in milliseconds<br>The delay starts after animationend. Teardown removes listeners and the clipping marker added by this application, preserves a pre-existing marker, and makes an already-queued debounce inert without cancelling its timer. |

hosts: `HTMLElement`.

states: `mount`, `animationend`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-layout-overflow`

Overflow control with animation-aware delay.

`animaDelay` starts after a bubbling `animationend`, rather than measuring the animation from mount. Mount adds temporary clipping; each end event restarts the delay. Teardown removes its listeners and any clipping marker it introduced, preserves a pre-existing marker, and makes queued debounce work inert. Without an end event clipping can remain while the style is active.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['layout.overflow(hidden)', 'layout.overflow(animaDelay:400)']
    }
];
```

### `layout.keep.size`

<a id="entry-layout-keep-size"></a>

Keep size

Keep a measured size stable after content settles.

Waits for awaiter or the configured delay, then captures size before repaint; removal releases the captured dimension constraint.

Choose an explicit awaiter when readiness is known. The deferred callback has no cancellation guard, so removing the style before it resolves can still apply the size lock.

Positional order: `delay` → `awaiter`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `delay` | `number` | `20` | Delay |
| `awaiter` | `promiseOrString` | Not supplied | Awaiter |

Persists element size across re-renders. Sub-variants:

-   **`layout.keep.height`** — persist height only
-   **`layout.keep.width`** — persist width only

No args.

### `layout.navigator`

<a id="entry-layout-navigator"></a>

Navigation

Use an overflow fallback for an existing button-group navigation strip.

On resize, checks vertical overflow and moves the first descendant button group between inline placement and a burger-triggered popup.

Provide a descendant jam-buttongroup and constrained host geometry. Use buttongroup-radio when the navigation needs one selected value.

Bind the selected value to routing or content switching separately. This helper changes presentation of the supplied group; it does not create routes.

The implementation assumes a button group exists and moves that node. It does not provide a complete accessible tabs contract or infer selection mode from navigation appearance.

Responsive navigation helper. When a child `jam-buttongroup` overflows vertically, it moves the group into a popup opened by a burger button. When space returns, the group is restored inline.

No args.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layout.navigator', 'css(height:3rem;overflow:hidden)'],
        components: [
            {
                type: 'buttongroup-radio',
                data: [
                    { name: 'Overview', value: 'overview' },
                    { name: 'Reports', value: 'reports' },
                    { name: 'Settings', value: 'settings' }
                ]
            }
        ]
    }
];
```

### `layout.subgrid`

<a id="entry-layout-subgrid"></a>

Subgrid list

Align nested list rows to a common column grid.

Makes the host a grid; descendants with CSS class jam-subgrid span cols tracks and inherit the host column tracks through CSS subgrid.

Add the CSS class jam-subgrid to the intended nested row containers and use a browser with CSS subgrid support.

Positional order: `cols`.

| Argument | Type | Contract |
| --- | --- | --- |
| `cols` | `number` | Column count<br>Shorthand |

Marks a container as a subgrid list and sets the number of subgrid columns.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['layout.subgrid(3)'],
        components: [
            { type: 'label', cap: 'A' },
            { type: 'label', cap: 'B' },
            { type: 'label', cap: 'C' }
        ]
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'wrapper',
    cap: 'Form',
    styles: ['layout.autoalign', 'layout.alignlabel'],
    components: [
        { type: 'input', cap: 'Name', defaultValue: '' },
        { type: 'input', cap: 'Email', defaultValue: '' },
        { type: 'button-cta', cap: 'Submit' }
    ]
};
```

## `layout.page`

<a id="entry-layout-page"></a>

Flowing page layout

Use for content-led document pages that should grow with their contents.

Adds the layout-page class: a relative column flex layout with full width, automatic height and visible overflow.

The layout arranges content; it does not choose a visual theme or create page regions.

Load the framework stylesheet and provide the page contents. The host should participate in document flow.

Uses the ordinary reversible class plugin; it has no observer or custom lifecycle callback.

Supply children yourself. Direct main-style or layout-content children remain auto-sized with visible overflow; avoid conflicting fixed-height or clipping rules.

It does not fill the viewport, build a shell or choose inner scroll owners. The application owns those decisions.

hosts: `HTMLElement`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-layout-page`

## `layout.lazyload`

<a id="entry-layout-lazyload"></a>

Build children lazily by viewport while retaining their state

Build vertical component content as the viewport approaches it.

Uses LoquatLazyLoad to progressively build unseen children, park offscreen rendered DOM with measured spacers and preserve visited component state.

Requires a component-owned container and a scroll target that is the host or an ancestor. Only one child-rendering style may own a container.

Use for variable-height content. Use grid.virtualScroll for regular fixed-height grid rows.

Defers rendering, not data fetching; retained children still consume memory.

Positional order: `buffer` → `scrollTarget`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `buffer` | `number` | `400` | Preload distance beyond the viewport (px) |
| `scrollTarget` | `string` | Not supplied | Scroll target |

## `layout.application`

<a id="entry-layout-application"></a>

Bounded application layout

Use for a bounded workspace shell with author-supplied regions and an explicit scroll owner.

Adds a grid shell and classes for viewport, frame and scroll mode. content makes the designated main/content region scroll; regions hides its overflow so the author can provide inner scrollers.

The default grid reserves sidebar, header, content and footer areas. frame switches to a row layout with a column frame region.

Provide a bounded-height parent unless viewport is true. Load the framework stylesheet and supply children carrying the expected role classes.

Uses reversible class plugins; it does not construct, destroy or observe regions.

Direct children use jam-sidebar-style, jam-header-style, jam-main-style or jam-layout-content, and jam-footer-style. With frame true, place header/main/footer inside jam-frame-style. In regions mode explicitly size and enable scrolling on inner regions.

The style does not infer regions, create children or automatically make each region scroll. A tabs/navigation builder and application routing remain separate responsibilities.

Positional order: `viewport` → `scroll` → `frame`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `viewport` | `boolean` | `false` | Fill the viewport |
| `scroll` | `string` | `content` | Scrolling region policy<br>Options: `content` — Content scrolls, `regions` — Regions scroll independently |
| `frame` | `boolean` | `false` | Use a content frame |

hosts: `HTMLElement`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-layout-application`

## `layout.keep.width`

<a id="entry-layout-keep-width"></a>

Keep width

Keep a measured width stable after content settles.

Waits for awaiter or the configured delay, then captures width before repaint; removal releases the captured dimension constraint.

Choose an explicit awaiter when readiness is known. The deferred callback has no cancellation guard, so removing the style before it resolves can still apply the size lock.

Positional order: `delay` → `awaiter`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `delay` | `number` | `20` | Delay |
| `awaiter` | `promiseOrString` | Not supplied | Awaiter |

## `layout.keep.height`

<a id="entry-layout-keep-height"></a>

Keep height

Keep a measured height stable after content settles.

Waits for awaiter or the configured delay, then captures height before repaint; removal releases the captured dimension constraint.

Choose an explicit awaiter when readiness is known. The deferred callback has no cancellation guard, so removing the style before it resolves can still apply the size lock.

Positional order: `delay` → `awaiter`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `delay` | `number` | `20` | Delay |
| `awaiter` | `promiseOrString` | Not supplied | Awaiter |
