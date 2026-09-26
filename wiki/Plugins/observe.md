# `Plugins.observe`

---

## `observe.child`

Observes direct child elements being added or removed using `MutationObserver`. It does not watch nested descendants: `observeChild()` uses `{ childList: true }` without `subtree`. For content whose descendants render asynchronously, use a lifecycle-owned observer with `subtree: true` when the direct-child contract is insufficient; disconnect it when unplugged.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin observe.child`.

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
  components: [
    { type: 'button', cap: 'Add child', onclick: 'this.parentElement.appendChild(document.createElement("div"))' }
  ]
}
```

---

## `observe.intersection`

Observes child elements entering or leaving the viewport using `IntersectionObserver`. Automatically observes new children as they are added via an internal `MutationObserver`.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin observe.intersection`.

`showing(child)` and `hiding(child)` receive the affected element. Custom `adding(child, observer)` and `removing(child, observer)` hooks receive the child and the `IntersectionObserver` and own its registration. The node filter selects observed mutations; without a custom filter, only HTML elements are accepted.

Without custom adding/removing callbacks, the plugin observes added elements and unobserves removed elements.

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
