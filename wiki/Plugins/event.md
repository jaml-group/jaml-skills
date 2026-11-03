# `Plugins.event`

<!-- Generated from native authoring; do not edit. -->

[中文](event.zh.md)

---

## `event.scrollProgress`

<a id="entry-event-scrollprogress"></a>

Scroll progress

Publish scroll position and active section through the messenger.

Publishes fractional progress and anchors along direction (y by default, x for horizontal). With updateAttr:true, also uses the shared watcher to publish all four physical overflow directions on the plugin host, enabling overflow.css and overflow.direction.css without a separate interact.scrollWatcher. Attribute publication is disabled by default. Subscribers share one scroll listener and one observer set per target.

Use a measurable scroll target. The plugin reuses the host component messenger’s broker when present; otherwise it resolves the named broker, defaulting to mango, and creates that broker when needed.

Unplug releases its shared target subscription, published keys and owned messenger. Attribute ownership is restored when enabled; legacy scrolled classes retain their existing teardown behavior. Other subscribers keep the shared target observation alive.

The anchor publication is a DOM element and occurs only when an anchor is found; this plugin does not render a progress indicator. Progress uses raw axis offsets, so RTL, reversed origins or elastic overscroll may yield values outside 0–1. Anchor offset ordering is not normalized for reversed origins; overflow direction tokens are normalized independently.

Positional order: `key` → `broker` → `target` → `throttle` → `anchorSelector` → `gap` → `direction` → `updateAttr`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `key` | `string` | Not supplied | Progress publication key, used verbatim when nonempty. If omitted, uses the resolved target identity followed by -scroll-prog. The companion anchor key replaces a trailing -prog with -anchor, otherwise appends -anchor. |
| `broker` | `string` | Not supplied | Message broker |
| `target` | `any` | Not supplied | Target |
| `throttle` | `number` | `20` | Throttle |
| `anchorSelector` | `string` | Not supplied | Anchor selector |
| `gap` | `number` | `50` | Gap |
| `direction` | `string` | `y` | Progress and anchor axis (default y)<br>Options: `x`, `y` |
| `updateAttr` | `boolean` | `false` | Publish overflow state on the host (default false) |

Publishes fractional scroll progress along `direction: 'y'` by default; use `'x'` for horizontal progress and anchor tracking. Progress retains the raw selected-axis offset divided by its scrollable extent: it is normally 0–1, but negative-origin or elastic scrolling can produce values outside that range. Anchor lookup retains the existing offset-based calculation on the selected axis; reversed-origin anchor ordering is not normalized.

With `updateAttr: true` (default `false`), the plugin also publishes attributes through its watcher subscription: it measures `target` and publishes `jam-overflow` direction tokens on the plugin host. All four physical edges are published regardless of `direction`; that option selects only progress and anchor coordinates, so `overflow.css(...)` and `overflow.left/right/top/bottom.css(...)` work without adding a second watcher. State refreshes on scrolling and observed layout/content changes; progress broadcasts keep their existing scroll-event throttle. The event plugin, `interact.scrollWatcher` and table progress share one scroll listener per target. Unplug releases its subscription and attribute ownership, restoring the preceding overflow attribute when applicable.

A nonempty `key` is the exact progress subscription key: the example below publishes on `pageProgress` and its companion `pageProgress-anchor`. Without a key, progress uses the resolved scroll target's identity followed by `-scroll-prog`. The companion key replaces a trailing `-prog` with `-anchor`; otherwise it appends `-anchor`. Subscribe on the plugin's broker. The anchor value is the last above DOM element, when `anchorSelector` finds one. Both keys are cleaned up on unplug.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(height:20rem;overflow-y:auto)'],
    plugins: [
        Plugins.event.scrollProgress({
            key: 'pageProgress',
            anchorSelector: '.section'
        })
    ],
    components: [
        { type: 'wrapper', cap: 'Section 1', styles: ['css(height:15rem)'], class: 'section' },
        { type: 'wrapper', cap: 'Section 2', styles: ['css(height:15rem)'], class: 'section' },
        { type: 'wrapper', cap: 'Section 3', styles: ['css(height:15rem)'], class: 'section' }
    ]
};
```
