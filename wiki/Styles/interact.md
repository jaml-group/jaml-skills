# interact

<!-- Generated from native authoring; do not edit. -->

[中文](interact.zh.md)

`Styles.interact.*` — interaction behaviors applied to any element.

---

## Variants

### `interact.foldable`

<a id="entry-interact-foldable"></a>

Independent foldable region

Register one region with an ancestor layout.accordion and control it through its foldable handle.

The styled HTMLElement exposes element.foldable.fold(), unfold() and toggle(), each returning boolean acceptance, plus read-only folded and size. size is the current logical track extent in CSS pixels, not the animated surface rectangle. Non-bubbling foldchange events carry detail:{folded}; non-bubbling foldresize events carry detail:{size,folded}. A duplicate fold/unfold request is accepted without another foldchange. External buttons may call the same handle.

Requires layout.accordion on the explicit-template grid owner. The region must occupy exactly one track on axis; subgrid descendants may resolve to one ancestor track through definite placement. Use nonnegative CSS lengths for foldSize, minSize, maxSize and resizeThreshold; maxSize must be at least minSize. An invalid or absent owner makes fold/unfold requests return false. Capped fractional axes accept definite length/percentage, fr and minmax(length,fr) tracks; intrinsic or calculated track definitions are unsupported there. An authored minimum above maxSize takes precedence; avoid that conflict. saveState:true requires a stable id on this child, not merely its parent.

The children and their state remain mounted during folding. Every folded host is inert and aria-hidden, including a painted nonzero foldSize strip; a zero-size fold is also visually hidden. Unfold restores owned presentation and authored expanded overflow/minima. Parent style removal resets the live session. With saveState:true and a stable child id, a new Foldable instance (including after reload) restores the committed expanded size preference from localStorage; open/fold intent remains authored. Cancelled drags, temporary geometry and mode changes do not overwrite saved preferences. Invalid saved data or unavailable storage falls back to authored sizes. Subgrid peers sharing the same ancestor track share folded state and size.

Author the expanded preference in the parent’s grid template, then put minSize/maxSize and resizeThreshold on this region. A flexible preference remains proportional below its cap. During threshold dragging, the selected region may cross authored and plugin expanded minima; release below resizeThreshold folds and retains its pre-drag preference, while release above it restores expanded limits. Escape cancels the drag. External rail controls belong beside this host, not inside it. See layout.accordion for the complete parent/child example.

edge chooses the resize handle side, not the animation origin. Interior regions use center squeeze entry/exit; outer regions use the associated edge, while neighboring regions use layout FLIP. Optional hover activation is not implemented. resizable:false removes the drag handle; resizable:{hide:true} hides only its indicator. Folded controls cannot reopen their own inert host: provide an external control.

Positional order: `axis` → `edge` → `foldSize` → `minSize` → `maxSize` → `resizeThreshold` → `folded` → `saveState` → `resizable`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `axis` | `string` | `columns` | Managed track axis.<br>Options: `columns`, `rows` |
| `edge` | `string` | Not supplied | Resize handle side; interior regions normally use the following boundary and the last region uses the preceding boundary.<br>Options: `left`, `right`, `top`, `bottom` |
| `foldSize` | `string` | `0rem` | Track extent while folded; a nonzero visible strip remains inert. |
| `minSize` | `string` | `0rem` | Minimum expanded extent; combines with an authored minmax minimum. |
| `maxSize` | `string` | Not supplied | Maximum expanded extent, not the preferred size; flexible regions remain proportional below this cap. |
| `resizeThreshold` | `string` | `0rem` | Release below this extent to fold after dragging; zero disables threshold folding. |
| `folded` | `boolean` | `false` | Initial folded state when first registering the region. |
| `saveState` | `boolean` | `false` | Persist the committed expanded size preference across reloads, keyed by stable child id and axis; does not persist folded state. Default false. |
| `resizable` | `dictionaryOrBoolean` | `true` | Enable resizing; false disables the handle, or {hide:true} hides its indicator. |

```javascript jaml-playground
export default {
    type: 'container',
    components: [
        { type: 'label', cap: 'The rail stays interactive while navigation and inspector fold independently.' },
        {
            type: 'container',
            id: 'folding-example',
            styles: [Styles.layout.accordion({ cols: '4rem 12rem minmax(12rem,1fr) 10rem', rows: 'minmax(0,1fr)' }), 'css(height:14rem;width:100%;gap:0.5rem)'],
            components: [
                {
                    type: 'container',
                    styles: ['css(grid-column:1;display:flex;flex-direction:column;gap:0.5rem;background:ac4)'],
                    components: [
                        {
                            type: 'button',
                            cap: 'Nav',
                            onclick() {
                                this.closest('#folding-example').querySelector('#folding-navigation').foldable.toggle();
                            }
                        },
                        {
                            type: 'button',
                            cap: 'Info',
                            onclick() {
                                this.closest('#folding-example').querySelector('#folding-inspector').foldable.toggle();
                            }
                        }
                    ]
                },
                {
                    type: 'wrapper-vertical',
                    id: 'folding-navigation',
                    cap: 'Navigation',
                    styles: ['css(grid-column:2;min-width:0;overflow:auto;background:ac1)', Styles.interact.foldable({ foldSize: '2rem', minSize: '6rem', maxSize: '20rem', resizeThreshold: '3rem' })],
                    components: [{ type: 'input', cap: 'Filter', value: 'Retained navigation value', styles: ['label.atTop', 'size.fullwidth'] }]
                },
                {
                    type: 'container',
                    styles: ['css(grid-column:3;min-width:0;overflow:auto;background:ac5)'],
                    components: [{ type: 'label', cap: 'Main content receives the remaining space. The visible folded strip is inert; use the rail to reopen it.' }]
                },
                {
                    type: 'wrapper-vertical',
                    id: 'folding-inspector',
                    cap: 'Inspector',
                    styles: ['css(grid-column:4;min-width:0;overflow:auto;background:ac3)', Styles.interact.foldable({ minSize: '6rem', maxSize: '16rem', resizeThreshold: '3rem' })],
                    components: [{ type: 'input', cap: 'Notes', value: 'Retained inspector value', styles: ['label.atTop', 'size.fullwidth'] }]
                }
            ]
        }
    ]
};
```

### `interact.movable`

<a id="entry-interact-movable"></a>

Movable element

Enable pointer-driven movement of a host through the existing movement helper.

Forwards supplied arguments unchanged to jam.makeMovable; no argument profile defaults are added.

Movement is provided by the helper; this style supplies no dedicated control or keyboard UI.

Provide an appropriate mounted/connected host and the needed geometry, handle and containment choices from the helper contract.

Runs on mount, or immediately for an already-mounted framework host or connected ordinary element. Unmount, style teardown or host destruction calls makeUnmovable for the active setup; remount can enable it again while the style remains installed.

Compose with the host layout and any stacking behavior deliberately. Detailed forwarded fields are not described by this open catalog schema.

Disabling movement does not restore previous coordinates or remove shared global gesture handlers. Keyboard interaction, accessibility, geometry constraints and application position persistence remain caller responsibilities.

Arguments are forwarded to `jam.makeMovable`. Undeclared fields have no inferred types, defaults or completion; an empty argument table does not reject arguments.

hosts: `HTMLElement`.

states: `mount`, `unmount`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-interact-movable`

Movement and resize helpers are disabled on unmount, style teardown or host destruction. Resize disable removes its `passiveresize`, `resize` and `moveend` callbacks and invalidates old debounce/completion work. Observation remains active for other subscribers and stops after the last callback is removed. See [shared passive resize](../JAM-UI/JAM-UI.md#shared-passive-resize) for subscription, measurements and runtime prerequisites. Previous coordinates and dimensions are not restored; persistence and accessible alternatives remain application responsibilities.

Makes the element draggable via `DamsonDragNDrop`. Use `handle` to restrict the drag start area; `contain` constrains movement to the parent bounds.

Arguments are forwarded to `jam.makeMovable` through an open contract. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Drag me',
        styles: ['interact.movable(contain:true)']
    },
    {
        type: 'card',
        cap: 'Free drag',
        styles: ['interact.movable']
    }
];
```

### `interact.resizable`

<a id="entry-interact-resizable"></a>

Resizable element

Enable pointer-driven host resizing through the existing resizing helper.

Forwards supplied arguments unchanged to jam.makeResizable; no argument profile defaults are added.

The helper manages resizing; the style does not create a complete accessible resize control.

Provide an appropriate mounted/connected host, meaningful size/position constraints and helper-specific handle or containment settings.

Runs on mount or an already-mounted/connected host. Unmount, style teardown or host destruction calls makeUnresizable. Disable removes this resize instance’s passiveresize, resize and moveend listeners; obsolete debounce and animation-completion continuations cannot reset a removed or replacement instance.

Keep sizing constraints consistent with parent layout. Detailed forwarded fields remain outside this open schema; editor acceptance does not prove their runtime validity.

Disabling does not restore original dimensions. A queued debounce or animationEnd promise may still finish, but its obsolete continuation is inert. Passive resize observation is shared. Disable releases this subscription and unobserves the target only when no callbacks remain; final Jam element destruction also releases observation. See the shared passive resize contract for runtime prerequisites. Keyboard controls, accessibility and size persistence remain caller responsibilities.

Arguments are forwarded to `jam.makeResizable`. Undeclared fields have no inferred types, defaults or completion; an empty argument table does not reject arguments.

hosts: `HTMLElement`.

states: `mount`, `unmount`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-interact-resizable`

Makes the element resizable by edge and corner drag handles.

Arguments are forwarded to `jam.makeResizable` through an open contract. Field-level completion and inferred types/defaults are not yet available; the empty runtime profile does not reject forwarded options.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Resize me',
        styles: ['interact.resizable']
    },
    {
        type: 'card',
        cap: 'Horizontal only',
        styles: ['interact.resizable(horizontalOnly:true;contain:true)']
    }
];
```

### `interact.expandable`

<a id="entry-interact-expandable"></a>

Expandable

Expand one panel into an adjacent sibling’s space.

Chooses a previous/next sibling from direction and adds an optional toggle button and resize edge. Outside accordion, saveState:true persists through localStorage: flex requires the styled element’s own id; legacy grid uses the parent id first, falling back to the element id, together with the axis. A parent-only id passes the prerequisite check but does not enable flex persistence.

Requires an adjacent sibling and measurable parent. Passing saveState:true requires a stable element or parent id, including inside accordion where storage handling is bypassed; omit irrelevant legacy options there. Outside accordion, persistence is opt-in. Inside accordion, the neighboring track must have interact.foldable.

Removal releases resize/listener/button ownership and removes expansion classes.

Outside accordion this is a paired-panel interaction, not an overlay. Inside layout.accordion, the neighboring interact.foldable owns folded state, preferred size, min/max and threshold behavior; expandable’s legacy default, saveState and resizeThreshold are bypassed. Its button calls the neighboring foldable API and resizing uses the shared grid owner. Configure initial state and bounds on foldable; configure expanded preference in the parent template.

Positional order: `direction` → `resizeThreshold` → `default` → `button` → `saveState` → `resizable`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `direction` | `string` | `left` | Direction<br>Shorthand<br>Options: `top`, `right`, `bottom`, `left` |
| `resizeThreshold` | `number` | `50` | Expand automatically when the sibling size is below this threshold |
| `default` | `string` | Not supplied | Default size proportion |
| `button` | `dictionaryOrBoolean` | `true` | Button |
| `saveState` | `boolean` | `false` | Save state |
| `resizable` | `dictionaryOrBoolean` | `true` | Resizable |

Adds a toggle between this element and its adjacent sibling. Outside accordion, optional `saveState:true` enables `localStorage` persistence: flex requires the styled element’s own `id`; legacy grid uses the parent `id` (falling back to the element `id`) together with the axis. A parent-only `id` passes the initial prerequisite check but does not enable flex persistence. Inside accordion, configure the neighboring `interact.foldable` and the parent template; its legacy `default`, `saveState` and `resizeThreshold` options do not govern that track.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(display:flex;width:100%;height:10rem)'],
    components: [
        { type: 'container', styles: ['css(width:30%;min-width:0;background:ac1)'], components: [{ type: 'label', cap: 'Paired sidebar' }] },
        {
            type: 'container',
            id: 'paired-example-main',
            styles: ['css(width:70%;min-width:0;background:ac5)', Styles.interact.expandable({ direction: 'left', default: '70%', resizable: true })],
            components: [{ type: 'label', cap: 'Use the boundary toggle or resize handle. State is not persisted unless saveState is enabled with an id.' }]
        }
    ]
};
```

### `interact.closable`

<a id="entry-interact-closable"></a>

Closable

Add a close affordance to a host.

Creates a named close button and wires icon-slot double-click to it; the default callback removes the nearest closable host.

Provide callback when closing must update application state or request confirmation.

Positional order: `callback` → `label`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `callback` | `function` | Runtime-determined (function) | Callback<br>Shorthand |
| `label` | `functionOrString` | Not supplied | Accessible close-button name: string or (host) => string. Defaults to translated Close; refreshed on locale change. |

Adds a close (&times;) button. Double-clicking the icon slot also triggers close.

The close callback receives the styled element. Without a custom callback, closing removes its nearest `.jam-closable` ancestor.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Close me',
        styles: ['interact.closable'],
        components: [{ type: 'label', cap: 'Click the X or double-click the icon' }]
    }
];
```

### `interact.resettable`

<a id="entry-interact-resettable"></a>

Resettable

Add a reset action to a resettable element.

Creates an extra reset button which calls reset() when the host satisfies the resettable interface.

Requires a host reset() contract; the button does not define the default value.

Adds a reset button that restores the element's `defaultValue`. Requires the element to implement `IResettable`. No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Edit then reset',
        styles: ['interact.resettable']
    }
];
```

### `interact.clearable`

<a id="entry-interact-clearable"></a>

Clearable

Add a clear action to a clearable element.

Creates an extra clear button that calls clear() only when the host satisfies the clearable interface.

The host must implement clear().

The legacy button title is fixed text; localized applications should verify or replace that caption.

Adds a clear button that sets the element's value to `null`. Requires the element to implement `IClearable`. No args.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Type then clear',
        styles: ['interact.clearable']
    }
];
```

### `interact.removable`

<a id="entry-interact-removable"></a>

Removable

Add a removable-item action.

Creates a remove button; a synchronous onremove result of false vetoes removal, otherwise the host is removed.

An asynchronous promise is not awaited as a veto. Keep application data and persistence synchronized in the callback.

Positional order: `onremove`.

| Argument | Type | Contract |
| --- | --- | --- |
| `onremove` | `function` | Removal callback |

Adds the `jam-removable` CSS class and a remove button. The button stops event propagation and calls the `onremove` callback (if provided).

The remove-button callback runs with the styled host as `this` and no positional arguments. Return `false` from `onremove` to cancel removal.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Removable item',
        styles: ["interact.removable(onremove:function(el) { console.log('removing', el) })"]
    }
];
```

### `interact.scrollX`

<a id="entry-interact-scrollx"></a>

Horizontal mouse-wheel scrolling

Use a vertical wheel gesture to scroll a horizontal strip.

Installs a non-passive throttled wheel listener that prevents default scrolling and converts vertical-only deltas into smooth horizontal movement.

The host must have horizontal overflow.

This consumes the wheel event; nested scrolling and trackpads need interaction checks.

Converts vertical mouse wheel input to horizontal scrolling via `scrollBy({ left, behavior: 'smooth' })`. No args.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.scrollX', 'css(overflow-x:auto;whiteSpace:nowrap;width:20rem)'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' },
            { type: 'label', cap: 'Item 3' },
            { type: 'label', cap: 'Item 4' },
            { type: 'label', cap: 'Item 5' }
        ]
    }
];
```

### `interact.virtualScroll`

<a id="entry-interact-virtualscroll"></a>

Virtual scrolling

Virtualize fixed-height DOM rows through SaigonScroll.

Creates a SaigonScroll for the host and resolved scroll target, passing the supplied row providers and fixed row height. It attaches scroll and resize listeners; the generic style does not perform an initial draw.

Supply getRowNum and getChildrenByRow callbacks, a stable row height, and a measurable scroll target. Returned row children must expose row, buildDom(), and dom when built. The caller must provide row positioning and the full scrollable extent.

Removal detaches SaigonScroll listeners but retains the instance on the host; attaching this style again to that host does not create or initialize a replacement.

Use grid.virtualScroll for component grids, layout.lazyload for variable-height vertical components and table.fixedrowheight for native table rows.

Positional order: `scrollTarget` → `height` → `throttle` → `padding` → `getChildrenByRow` → `getRowNum`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `scrollTarget` | `string` | Not supplied | Scroll target |
| `height` | `numberOrString` | `2.5` | Line height<br>Unit: `rem`<br>Shorthand |
| `throttle` | `number` | Not supplied | Throttle |
| `padding` | `number` | Not supplied | Overscan rows |
| `getChildrenByRow` | `function` | Not supplied | Get children for a row |
| `getRowNum` | `function` | Not supplied | Get row count |

Virtual scrolling for large lists using `SaigonScroll`. Renders only visible rows for performance.

Provide `getChildrenByRow(container, row)` to supply a row’s children and `getRowNum(container)` to report the total row count.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.virtualScroll(height:3;throttle:16)', 'css(height:20rem)']
    }
];
```

### `interact.scrollWatcher`

<a id="entry-interact-scrollwatcher"></a>

Scroll activation

Expose remaining scrollable edges while preserving the legacy scrolled classes.

After delay (100 ms by default), measures the resolved target immediately and on scroll, resize and light-DOM content changes. Publishes space-separated left/right/top/bottom tokens in jam-overflow on the host; removes the attribute when there is no overflow. Physical edges support horizontal-tb LTR/RTL and reversed flex origins. jam-x-scrolled and jam-y-scrolled retain their raw positive-offset meaning.

Unmount, teardown or destruction cancels scheduled work and disconnects listeners and observers. Overlapping applications use the latest active owner; final cleanup restores the previous jam-overflow value unless externally replaced. The last legacy scroll classes remain. Remount resolves the target again.

The declared clazz argument remains unused. Overflow styles consume their selected target's own attribute; they do not install observation. Slot and agent overflow styles are not supported. Half-pixel edge tolerance suppresses rounding noise. Avoid overflow-state CSS that changes measured geometry. Shadow trees below the measured target are not traversed.

Positional order: `clazz` → `delay` → `target` → `listenScroll`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `clazz` | `string` | `jam-scrolled` | Active class |
| `delay` | `number` | `100` | Delay |
| `target` | `string` | Not supplied | Target |
| `listenScroll` | `boolean` | `true` | Listen to native scroll events; false retains initial and layout/content observation |

Measures the resolved target initially and after scroll, resize and light-DOM content changes. Set `listenScroll:false` for clipped non-scrolling content; initial and layout/content measurements remain active, but this subscription does not listen to scroll events. Default is true. Scroll listeners are shared and exist only while at least one subscriber requests them. Publishes remaining physical edges as space-separated tokens in `jam-overflow` on the host. The legacy `jam-x-scrolled` / `jam-y-scrolled` classes retain their positive-offset meaning. `overflow.css(...)` and `overflow.left/right/top/bottom.css(...)` consume the selected target’s own attribute; no observation is installed by those styles. Slot and agent paths are excluded. Teardown restores the previous attribute unless externally replaced, preserves the last legacy classes, and releases all observation. Subscriptions from this style, event.scrollProgress and table progress share one native scroll listener per target; removing one consumer leaves the others active, and the last cleanup disconnects observation. Scroll updates are immediate; layout/content invalidations are coalesced into animation frames. Descendant shadow trees are not observed; vertical writing modes are outside the supported geometry contract. The declared `clazz` argument remains unused.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.scrollWatcher', 'css(overflow:auto;width:20rem;height:8rem)'],
        components: [
            {
                type: 'label',
                cap: 'Scrollable content',
                styles: ['css(display:block;width:32rem;height:14rem)']
            }
        ]
    }
];
```

### `interact.zoomable`

<a id="entry-interact-zoomable"></a>

Zoomable

Add a maximize/restore-style control.

Creates a zoom button and label-slot double-click trigger; the default callback toggles host geometry with a position transition.

The label-slot double-click listener is installed for each active mount and removed on unmount, style teardown or host destruction. The style’s owned zoom button is removed on teardown.

This changes window-like layout size; use interact.panNZoom for a content camera.

Positional order: `callback` → `gap`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `callback` | `function` | Runtime-determined (function) | Callback |
| `gap` | `numberOrString` | `0` | Gap<br>Unit: `px`<br>Shorthand |

Adds a zoom-in button. Double-clicking the label slot toggles zoom via `positionFlip`.

The zoom callback receives `(element, gap)`. Without a custom callback, it toggles CSS zoom with a FLIP animation.

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'Zoom me',
        styles: ['interact.zoomable(gap:16)']
    }
];
```

### `interact.panNZoom`

<a id="entry-interact-pannzoom"></a>

Zoomable

Pan and zoom a content surface.

Installs Pear pan and zoom behavior on mount using the scale bounds/step. Unmount, style teardown or host destruction removes both; remount can install them again while the style remains applied.

Use for spatial content; interact.zoomable instead toggles a window-like host between normal and expanded size.

Positional order: `minScale` → `maxScale` → `scaleStep`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `minScale` | `number` | `0.5` | Minimum zoom scale |
| `maxScale` | `number` | `5` | Maximum zoom scale |
| `scaleStep` | `number` | `0.01` | Zoom step |

Pan via drag + cursor-aware zoom via mouse wheel using `PearPanNZoom`.

```javascript jaml-playground
export default [
    {
        type: 'container',
        styles: ['interact.panNZoom(minScale:0.25;maxScale:10;scaleStep:0.02)', 'css(width:30rem;height:20rem;overflow:hidden)'],
        components: [{ type: 'label', cap: 'Drag to pan, scroll to zoom' }]
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'card',
    cap: 'Movable Panel',
    styles: ['interact.movable', 'interact.resizable', 'interact.closable'],
    components: [{ type: 'label', cap: 'Drag me by the title' }]
};
```

## `interact.sortable`

<a id="entry-interact-sortable"></a>

Drag to reorder children

Use drag reordering for matching direct children, with optional transfers between containers sharing a group.

Manages the drag preview and commits child order on drop. change receives the source, destination, old/new indices and item lists when order or container changes.

Provide a container with matching direct child items and appropriate handle/avoid choices. Use a shared nonempty group only for intended transfers.

Use change to synchronize application data order. Use movable for free positioning and draggable/droppable for native browser data transfer.

Reordering rendered elements does not persist the application model. Keyboard reordering and accessible announcements require a separate application contract.

Positional order: `selector` → `group` → `placement` → `overlap` → `handle` → `avoid` → `scroll` → `scrollMargin` → `scrollSpeed` → `change`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `selector` | `string` | `*` | Selector for sortable children |
| `group` | `string` | Not supplied | Group name for transfers between containers |
| `placement` | `string` | `live` | Live placeholder movement or reordering on release<br>Options: `live`, `deferred` |
| `overlap` | `number` | Not supplied | Dragged-object overlap ratio (0~1); a region is accepted when overlap exceeds 1 minus this value |
| `handle` | `string` | Not supplied | Drag handle selector for children |
| `avoid` | `string` | Not supplied | Selector that prevents dragging |
| `scroll` | `boolean` | `true` | Automatic edge scrolling |
| `scrollMargin` | `number` | `48` | Edge scrolling margin (px) |
| `scrollSpeed` | `number` | `600` | Maximum scrolling speed (px/s) |
| `change` | `function` | Not supplied | Reorder commit callback |

Reorders matching direct children by dragging. Containers with the same nonempty `group` accept transfers. The plugin changes DOM order; persist application data in `change` when needed.

Omit `group` to keep items within their container. Live placement moves the placeholder; deferred placement commits on release. The change callback receives `{ item, from, to, oldIndex, newIndex, fromItems, toItems }`; transfers notify both containers.

```javascript jaml-playground
export default {
    type: 'wrapper',
    styles: ['interact.sortable', 'animation.flipchild(duration:200)'],
    components: [
        { type: 'label', cap: 'Drag: Planning' },
        { type: 'label', cap: 'Drag: Building' },
        { type: 'label', cap: 'Drag: Checking' }
    ]
};
```
