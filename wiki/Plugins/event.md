# `Plugins.event`

<!-- Generated from native authoring; do not edit. -->

[中文](event.zh.md)

---

## `event.scrollProgress`

<a id="entry-event-scrollprogress"></a>

Scroll progress

Publish scroll position and active section through the messenger.

Resolves a scroll target, creates a messenger, and broadcasts fractional progress plus the last anchor above the configured gap under derived keys.

Use a measurable scroll target. The plugin reuses the host component messenger’s broker when present; otherwise it resolves the named broker, defaulting to mango, and creates that broker when needed.

Unplug removes the listener, published keys and owned messenger.

The anchor publication is a DOM element and occurs only when an anchor is found; this plugin does not render a progress indicator.

Positional order: `key` → `broker` → `target` → `throttle` → `anchorSelector` → `gap`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `key` | `string` | Not supplied | Event key |
| `broker` | `string` | Not supplied | Message broker |
| `target` | `any` | Not supplied | Target |
| `throttle` | `number` | `20` | Throttle |
| `anchorSelector` | `string` | Not supplied | Anchor selector |
| `gap` | `number` | `50` | Gap |

Tracks the scroll progress of a target element and publishes it to the messenger as a percentage (0–1). Also detects the last visible anchor element above the scroll position.

Progress is broadcast on a messenger key derived from the element's identity, and the last above anchor (if `anchorSelector` is set) is broadcast on a companion `-anchor` key. Both keys are cleaned up on unplug.

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
