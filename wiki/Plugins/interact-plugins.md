# `Plugins.interact`

---

## `interact.draggable`

Makes an element a drag source for HTML5 native drag-and-drop. If a `selector` is provided, child elements matching it become draggable instead.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `data` | `Function` | Returns data to attach to the drag event | — |
| `selector` | `string` | CSS selector for child draggable elements | If set, children matching the selector are made draggable instead of the element itself |
| `dragstart` | `Function` | Called on drag start | — |
| `dragend` | `Function` | Called on drag end | — |

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

| Arg | Type | Description | Notes |
|---|---|---|---|
| `dataHandler` | `Function` | Called to process dropped data | Receives the drag data as argument |
| `handler` | `Function` | Called when a draggable enters the drop zone | — |
| `accept` | `Function \| any` | Filter for acceptable drag data | — |
| `prompt` | `string` | Prompt text shown on drag-over | — |

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
