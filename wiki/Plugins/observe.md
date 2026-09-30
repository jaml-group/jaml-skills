# `Plugins.observe`

<!-- Generated from native authoring; do not edit. -->

[中文](observe.zh.md)

---

## `observe.child`

<a id="entry-observe-child"></a>

Observe direct child changes

React to subsequent direct-child additions and removals without owning the child UI.

Observes childList only. By default only HTMLElement nodes pass the filter. Added/removed callbacks receive the node with this=node; changed receives filtered arrays with this=root.

No visual output; callbacks may update application presentation.

Use a DOM host with MutationObserver available and callbacks appropriate for the accepted nodes.

Stores the MutationObserver on plug and disconnects it on unplug, then removes plugin data.

A supplied filter replaces the default and must handle every node. Scan existing children yourself if needed; this plugin neither enumerates them initially nor observes descendant or attribute changes.

Callbacks are per mutation record; changed can receive empty arrays and the filter may run repeatedly. Do not treat this as subtree observation or automatic child lifecycle management.

Positional order: `childAdded` → `childRemoved` → `childChanged` → `filter`.

| Argument | Type | Contract |
| --- | --- | --- |
| `childAdded` | `function` | Callback for an added child |
| `childRemoved` | `function` | Callback for a removed child |
| `childChanged` | `function` | Callback for the added and removed sets |
| `filter` | `function` | Predicate selecting observed nodes |

hosts: `HTMLElement`.

states: `childList`.

Developer examples require a matching Playground that serves these fixtures:

- `#/testground?jaml=intent-observe-child`

Observes direct child elements being added or removed using `MutationObserver`. It does not watch nested descendants: `observeChild()` uses `{ childList: true }` without `subtree`. For content whose descendants render asynchronously, use a lifecycle-owned observer with `subtree: true` when the direct-child contract is insufficient; disconnect it when unplugged.

`childAdded(child)` and `childRemoved(child)` receive the changed element. `childChanged(addedNodes, removedNodes)` receives both arrays. The node filter controls which mutations are observed; without a custom filter, only HTML elements are accepted.

The child-change callback receives arrays of added and removed nodes.

```javascript jaml-playground
export default {
    type: 'container',
    plugins: [
        Plugins.observe.child({
            childAdded: (el) => nutmeg.info(`Child added: ${el.tagName}`),
            childRemoved: (el) => nutmeg.warn(`Child removed: ${el.tagName}`)
        })
    ],
    components: [{ type: 'button', cap: 'Add child', onclick: 'this.parentElement.appendChild(document.createElement("div"))' }]
};
```

---

## `observe.intersection`

<a id="entry-observe-intersection"></a>

Intersection observer

Observe visibility of child elements within a scrolling/root region.

Observes existing direct children and later child mutations, calling showing/hiding on intersection changes. Custom adding/removing callbacks receive the observer and take over observe/unobserve responsibility.

Unplug disconnects both intersection and mutation observers.

filter applies to mutation observation, not the initial enumeration of root.children. This reports visibility; it does not itself defer rendering or fetch content.

Positional order: `showing` → `hiding` → `adding` → `removing` → `option` → `filter`.

| Argument | Type | Contract |
| --- | --- | --- |
| `showing` | `function` | Show callback |
| `hiding` | `function` | Hide callback |
| `adding` | `function` | Add callback |
| `removing` | `function` | Removal callback |
| `option` | `dictionary` | IntersectionObserver options |
| `filter` | `function` | Node filter |

Observes child elements entering or leaving the viewport using `IntersectionObserver`. Automatically observes new children as they are added via an internal `MutationObserver`.

`showing(child)` and `hiding(child)` receive the affected element. Custom `adding(child, observer)` and `removing(child, observer)` hooks receive the child and the `IntersectionObserver` and own its registration. The node filter selects observed mutations; without a custom filter, only HTML elements are accepted.

Without custom adding/removing callbacks, the plugin observes added elements and unobserves removed elements.

```javascript jaml-playground
export default {
    type: 'container',
    styles: ['css(height:20rem;overflow-y:auto)'],
    plugins: [
        Plugins.observe.intersection({
            showing: (el) => (el.style.opacity = '1'),
            hiding: (el) => (el.style.opacity = '0.3'),
            option: { threshold: 0.5 }
        })
    ],
    components: [
        { type: 'wrapper', cap: 'Item 1', styles: ['css(height:10rem)'] },
        { type: 'wrapper', cap: 'Item 2', styles: ['css(height:10rem)'] },
        { type: 'wrapper', cap: 'Item 3', styles: ['css(height:10rem)'] },
        { type: 'wrapper', cap: 'Item 4', styles: ['css(height:10rem)'] }
    ]
};
```
