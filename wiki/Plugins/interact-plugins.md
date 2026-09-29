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
            data: () => ({ id: 'item-1', name: 'Widget' })
        })
    ],
    components: [{ type: 'badge', cap: 'Drag me', icon: '↕' }]
};
```

---

## `interact.droppable`

Makes an element a drop target for HTML5 native drag-and-drop.

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `plugin interact.droppable`.

`accept(event)` inspects a `DragEvent` during `dragenter` to decide whether to show the drop curtain. `dataHandler(data)` receives decoded data after a drop on that curtain; `handler(event)` then receives the event with decoded `event.data`. Normal functions receive the drop-zone element as `this`. MIME arrays, `false` and other non-function `accept` values currently accept all drags; use a function for filtering. The acceptance prompt is not an authorization boundary or a second payload check at drop time.

The producer returns an object; the draggable helper serializes it. This example permits JSON drag types and validates the decoded record before changing app state. The second source is deliberately rejected by the payload handler even though its MIME type is accepted. Server-side validation, authorization and persistence remain separate application responsibilities.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { received: 'Nothing received' },
    components: [
        {
            type: 'button',
            cap: 'Drag valid item',
            plugins: [Plugins.interact.draggable({ data: () => ({ kind: 'item', id: 'item-1' }) })]
        },
        {
            type: 'button',
            cap: 'Drag invalid item',
            plugins: [Plugins.interact.draggable({ data: () => ({ kind: 'other' }) })]
        },
        {
            type: 'container',
            cap: 'Drop here',
            styles: ['css(padding:2rem;border:2px dashed hsl(0 0% 65%);border-radius:1rem)'],
            plugins: [
                Plugins.interact.droppable({
                    accept(event) {
                        return Array.from(event.dataTransfer?.types ?? []).includes('application/json');
                    },
                    dataHandler(data) {
                        if (data?.kind !== 'item' || typeof data.id !== 'string') {
                            return;
                        }
                        this.vars.received = data.id;
                    }
                })
            ]
        },
        { type: 'label', cap: '{{received}}' }
    ]
};
```
