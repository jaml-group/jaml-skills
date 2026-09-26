# `Plugins.event`

---

## `event.scrollProgress`

Tracks the scroll progress of a target element and publishes it to the messenger as a percentage (0–1). Also detects the last visible anchor element above the scroll position.

Progress is broadcast on a messenger key derived from the element's identity, and the last above anchor (if `anchorSelector` is set) is broadcast on a companion `-anchor` key. Both keys are cleaned up on unplug.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin event.scrollProgress`.

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
}
```
