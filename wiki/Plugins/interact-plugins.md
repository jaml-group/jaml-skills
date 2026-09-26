# `Plugins.interact`

---

## `interact.draggable`

Makes an element a drag source for HTML5 native drag-and-drop. If a `selector` is provided, child elements matching it become draggable instead.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin interact.draggable`.

A selector makes matching children draggable instead of the host element.

```javascript jaml-playground
export default {
  type: 'wrapper',
  cap: 'Drag Source',
  styles: ['css(padding:1rem)'],
  plugins: [
    Plugins.interact.draggable({
      data: () => JSON.stringify({ id: 'item-1', name: 'Widget' })
    })
  ],
  components: [
    { type: 'badge', cap: 'Drag me', icon: '↕' }
  ]
}
```

---

## `interact.droppable`

Makes an element a drop target for HTML5 native drag-and-drop.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin interact.droppable`.

The data handler receives the drag data.

```javascript jaml-playground
export default {
  type: 'wrapper',
  cap: 'Drop Zone',
  styles: ['css(padding:2rem;border:2px dashed #aaa;border-radius:1rem)'],
  plugins: [
    Plugins.interact.droppable({
      prompt: 'Drop items here',
      dataHandler: (data) => {
        nutmeg.success('Received: ' + data)
      }
    })
  ]
}
```
