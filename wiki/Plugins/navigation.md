# navigation

<!-- Generated from native authoring; do not edit. -->

[中文](navigation.zh.md)

## `navigation`

<a id="entry-navigation"></a>

Previous and next controls backed by a live owner

Compose reusable pointer and keyboard-operable controls for a live collection, snap scroller, pagination owner or previewer without duplicating its selection model.

Creates two native ghost buttons, rereads availability on activation and dispatches previous or next only when available. Missing state or enabled:false disables both controls and clears preload candidates. Ends stop by default; wrap is a request to the owner, which implements the actual wrap behavior. The plugin does not store collection order or selection.

Attach to an HTMLElement that can contain the controls. Supply a synchronous navigate callback reading current owner state. Use subscribe to publish external changes and owner destruction; individual virtualized trigger removal is not owner destruction.

subscribe receives refresh and detach callbacks and returns cleanup. Detach releases the source callback/subscription and disables the controls without closing an existing preview. Unplug destroys owned buttons and removes the control container. Initial state and onstate delivery are synchronous during construction.

Use collectionNavigation({items,current,key,select,subscribe}) for live ordered items, pageNavigation({page,pages,select,subscribe}) for zero-based pages, or scrollNavigation({target,orientation,targets,subscribe}) for native scroll/snap geometry. Pass the resulting options to Plugins.navigation, or override navigate. The source owner remains responsible for sorting, filtering, selection and lifecycle. Previewers consume optional current item and nearest-first preload candidates from the same state contract.

Callbacks are synchronous; asynchronous owners return their current state and refresh subscribers after completion. Do not close over a copied collection. This plugin does not fetch content, apply application permissions, paginate data itself or add touch gestures. A removed current collection item disables navigation without selecting a replacement.

Positional order: `navigate` → `subscribe` → `orientation` → `wrap` → `previousLabel` → `nextLabel` → `onstate`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `navigate` | `function` | Not supplied | Required callback ({action:'state'\|'previous'\|'next',wrap:boolean}) => state \| undefined. State contains previous/next booleans, optional enabled, optional item and optional preload:{previous:items[],next:items[]}; candidate arrays are nearest first. The owner performs movement and returns its resulting current state. |
| `subscribe` | `function` | Not supplied | Optional (refresh,detach) => unsubscribe. Call refresh after changes affecting availability, neighbours or selection; call detach when the originating view is destroyed. Return cleanup that removes this subscription. |
| `orientation` | `string` | `horizontal` | Control layout: horizontal row by default or vertical column. The source callback determines navigation meaning.<br>Options: `horizontal`, `vertical` |
| `wrap` | `boolean` | `false` | Forward wrapping preference to the source callback; false by default. The collection/page/scroll adapters implement wrap at their boundaries. |
| `previousLabel` | `string` | Not supplied | Literal accessible label for the previous button. Omit for the localized default. |
| `nextLabel` | `string` | Not supplied | Literal accessible label for the next button. Omit for the localized default. |
| `onstate` | `function` | Not supplied | Optional synchronous state observer, including initial construction and disabled/detached state. Consumers may use item to select preview content and preload candidates to schedule background work. Do not assume a controller variable has been assigned before the first callback. |

hosts: `HTMLElement`.

states: `plug`, `unplug`.
