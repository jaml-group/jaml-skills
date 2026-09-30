# sync

<!-- Generated from native authoring; do not edit. -->

[中文](sync.zh.md)

`Styles.sync` listens to framework `resize` events on its host and calls a callback with resolved target and source elements. Use it when one element needs to copy a computed dimension from another; prefer normal flex/grid layout when that already expresses the relationship.

## Arguments

<a id="entry-sync"></a>

Synchronize styles

Coordinate two resolved elements when the host resizes.

Resolves source and target from self, parent, root, or selectors within the selected parent, then schedules the callback before repaint.

Both elements must resolve; supply the callback that owns the desired synchronization.

Use one host as the resize trigger and keep callback writes from causing an uncontrolled resize loop.

It observes host resize events, not arbitrary changes to the source. Removing the style prevents its queued repaint callback from running; writes already made by a custom callback remain caller-owned.

Positional order: `target` → `source` → `parent` → `callback`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `target` | `string` | Not supplied | Target selector |
| `source` | `string` | Not supplied | Source selector |
| `parent` | `string` | `self` | Parent selector<br>Options: `self`, `parent`, `root` |
| `callback` | `functionOrString` | Not supplied | Callback |

The callback receives `(target, source)`, with the styled host as `this`.

JavaScript is clearest for a custom copying callback.

Both source and target must resolve. The callback runs before the next repaint after the host's resize notification; this is not an independent observer of every possible source mutation.

```javascript jaml-playground
export default {
    type: 'wrapper',
    components: [
        { type: 'label', id: 'sync-source', cap: 'Width source', style: 'width:12rem' },
        {
            type: 'label',
            cap: 'Mirrored width',
            styles: [
                Styles.sync({
                    source: '#sync-source',
                    target: 'self',
                    parent: 'parent',
                    callback(target, source) {
                        target.style.width = getComputedStyle(source).width;
                    }
                })
            ]
        }
    ]
};
```

To mirror height, copy `getComputedStyle(source).height` into `target.style.height` in the same callback.

## Convenience variants

<a id="entry-sync-size"></a>

Synchronize size

Copy selected computed dimensions from a resolved source to a resolved target.

Forwards source, target and parent selection to sync, then copies computed width and/or height using owned inline sizing on the host resize trigger.

Removal restores the sizing owned by this application through the shared property-ownership mechanism and prevents queued updates from running after removal.

Both source and target must resolve. The host resize event triggers copying; this does not independently observe every source change. The built-in size callback replaces the callback argument; use sync for a custom callback.

Positional order: `target` → `source` → `parent` → `callback` → `width` → `height`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `target` | `string` | Not supplied | Target selector |
| `source` | `string` | Not supplied | Source selector |
| `parent` | `string` | `self` | Parent selector<br>Options: `self`, `parent`, `root` |
| `callback` | `functionOrString` | Not supplied | Callback |
| `width` | `boolean` | `true` | Synchronize width |
| `height` | `boolean` | `true` | Synchronize height |

`sync.size` resolves configured selectors and copies computed width and/or height on the host’s resize trigger. It owns the copied inline sizing and restores its contribution on removal; queued updates from the removed application no longer run. Its built-in size callback replaces the `callback` argument. Use `sync` for custom synchronization; writes made by that callback remain caller-owned.

```javascript jaml-playground
export default {
    type: 'wrapper',
    components: [
        { type: 'label', id: 'size-source', cap: 'Width source', styles: ['css(width:12rem)'] },
        {
            type: 'label',
            cap: 'Mirrored width',
            styles: ['sync.size(source:#size-source;target:self;parent:parent;height:false)']
        }
    ]
};
```

`sync.width` and `sync.height` remain prebuilt style instances with captured values and unset source/target selectors. Use `sync.size` to select elements; do not call these presets as parameterized factories.

## `sync.width`

<a id="entry-sync-width"></a>

Synchronize size

Represent the width-only or height-only synchronization preset named by the path.

sync.width and sync.height are prebuilt style instances derived from sync.size with the other dimension disabled.

These are prebuilt style instances with captured values, not configurable factories. Their captured source and target are unset; use sync.size with explicit selectors for dimension synchronization.

Positional order: `parent` → `width` → `height`.

| Argument | Contract |
| --- | --- |
| `parent` | Captured scope value of this prebuilt size preset, not a configurable selector argument. Use sync.size with explicit source, target and parent for dimension synchronization. |
| `width` | Captured width-copy flag of this prebuilt preset. sync.width enables width copying and sync.height disables it; this is not a callable configuration argument. |
| `height` | Captured height-copy flag of this prebuilt preset. sync.height enables height copying and sync.width disables it; this is not a callable configuration argument. |

## `sync.height`

<a id="entry-sync-height"></a>

Synchronize size

Represent the width-only or height-only synchronization preset named by the path.

sync.width and sync.height are prebuilt style instances derived from sync.size with the other dimension disabled.

These are prebuilt style instances with captured values, not configurable factories. Their captured source and target are unset; use sync.size with explicit selectors for dimension synchronization.

Positional order: `parent` → `height` → `width`.

| Argument | Contract |
| --- | --- |
| `parent` | Captured scope value of this prebuilt size preset, not a configurable selector argument. Use sync.size with explicit source, target and parent for dimension synchronization. |
| `height` | Captured height-copy flag of this prebuilt preset. sync.height enables height copying and sync.width disables it; this is not a callable configuration argument. |
| `width` | Captured width-copy flag of this prebuilt preset. sync.width enables width copying and sync.height disables it; this is not a callable configuration argument. |
