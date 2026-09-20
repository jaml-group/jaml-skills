# `Plugins.observe`

---

## `observe.child`

Observes direct child elements being added or removed using `MutationObserver`. It does not watch nested descendants: `observeChild()` uses `{ childList: true }` without `subtree`. For content whose descendants render asynchronously, use a lifecycle-owned observer with `subtree: true` when the direct-child contract is insufficient; disconnect it when unplugged.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `childAdded` | `(el: HTMLElement) => void` | Called when a child is added | — |
| `childRemoved` | `(el: HTMLElement) => void` | Called when a child is removed | — |
| `childChanged` | `(added: Node[], removed: Node[]) => void` | Called on any child mutation | Receives arrays of added and removed nodes |
| `filter` | `(node: Node) => boolean` | Filter which nodes to observe | Default: `node instanceof HTMLElement` |

```javascript jaml-playground
export default {
  type: 'container',
  plugins: [
    Plugins.observe.child({
      childAdded: (el) => nutmeg.info(`Child added: ${el.tagName}`),
      childRemoved: (el) => nutmeg.warn(`Child removed: ${el.tagName}`)
    })
  ],
  components: [
    { type: 'button', cap: 'Add child', onclick: 'this.parentElement.appendChild(document.createElement("div"))' }
  ]
}
```

---

## `observe.intersection`

Observes child elements entering or leaving the viewport using `IntersectionObserver`. Automatically observes new children as they are added via an internal `MutationObserver`.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `showing` | `(el: HTMLElement) => void` | Called when a child becomes visible | — |
| `hiding` | `(el: HTMLElement) => void` | Called when a child leaves the viewport | — |
| `adding` | `(el: HTMLElement, io: IntersectionObserver) => void` | Custom observe hook when a child is added | If omitted, calls `io.observe(el)` |
| `removing` | `(el: HTMLElement, io: IntersectionObserver) => void` | Custom unobserve hook when a child is removed | If omitted, calls `io.unobserve(el)` |
| `option` | `IntersectionObserverInit` | Standard IntersectionObserver options | e.g. `{ threshold: 0.5 }` |
| `filter` | `(node: Node) => boolean` | Filter which nodes to observe | Default: `node instanceof HTMLElement` |

```javascript jaml-playground
export default {
  type: 'container',
  styles: ['css(height:20rem;overflow-y:auto)'],
  plugins: [
    Plugins.observe.intersection({
      showing: (el) => el.style.opacity = '1',
      hiding: (el) => el.style.opacity = '0.3',
      option: { threshold: 0.5 }
    })
  ],
  components: [
    { type: 'wrapper', cap: 'Item 1', styles: ['css(height:10rem)'] },
    { type: 'wrapper', cap: 'Item 2', styles: ['css(height:10rem)'] },
    { type: 'wrapper', cap: 'Item 3', styles: ['css(height:10rem)'] },
    { type: 'wrapper', cap: 'Item 4', styles: ['css(height:10rem)'] }
  ]
}
```
