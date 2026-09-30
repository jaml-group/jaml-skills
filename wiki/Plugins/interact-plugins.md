# `Plugins.interact`

<!-- Generated from native authoring; do not edit. -->

[中文](interact-plugins.zh.md)

---

## `interact.draggable`

<a id="entry-interact-draggable"></a>

Draggable

Use native HTML drag-and-drop to transfer data from a host or matching descendants.

Enables browser dragging and writes a truthy data callback result as application/json. With selector, it prepares existing matching descendants; for each beforechildadd event, it checks only the first child and prepares it if it matches.

Provide a browser drag source and a data callback returning the intended payload. Selector-based future-child discovery depends on the host emitting beforechildadd.

Pair with interact.droppable for data transfer. Use the interact.movable style to reposition a host, or interact.sortable to reorder peer items.

It does not move layout coordinates or update collection order. A pre-existing draggable host is left unchanged. Teardown clears draggable state but the helper does not remove its previously registered drag listeners.

Positional order: `data` → `selector` → `dragstart` → `dragend`.

| Argument | Type | Contract |
| --- | --- | --- |
| `data` | `function` | Data |
| `selector` | `string` | Selector |
| `dragstart` | `function` | Drag start |
| `dragend` | `function` | Drag end |

Makes an element a drag source for HTML5 native drag-and-drop. If a `selector` is provided, child elements matching it become draggable instead.

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

<a id="entry-interact-droppable"></a>

Drop target

Use a native browser drop target to receive data and run application handlers.

Registers a drop zone and displays a curtain prompt for accepted drags. Dropping on that curtain passes data decoded from application/json or text/plain to dataHandler; handler receives the drop event with that payload exposed through its data property.

Use a browser drop flow with a visible target. accept runs on dragenter with a DragEvent to decide whether to show the prompt curtain; it is not a payload validator or a second authorization check at drop time. Non-function accept values currently fall back to accepting drags.

Pair with interact.draggable for in-app data transfer. Its data callback returns the record; serialization is handled by the draggable helper. Let dataHandler validate the received payload and update application state. Server validation, authorization and persistence remain application/backend responsibilities; use sortable for peer reordering.

This is not a file importer or a security boundary. It does not automatically move nodes, persist data or provide keyboard drag-and-drop. Unplug removes the drop-zone registration; document drag listeners remain shared.

Positional order: `dataHandler` → `handler` → `accept` → `prompt`.

| Argument | Type | Contract |
| --- | --- | --- |
| `dataHandler` | `function` | (data: any) => void, with the drop-zone element as this for a normal function. Receives decoded application/json, otherwise text/plain, after a drop on the prompt curtain. Validate the payload shape before using it. |
| `handler` | `function` | (event: DragEvent & { data: any }) => void, with the drop-zone element as this for a normal function. Runs after dataHandler; event.data exposes the decoded payload. |
| `accept` | `functionOrAny` | (event: DragEvent) => boolean, with the drop-zone element as this for a normal function. Inspect event.dataTransfer types during dragenter; this is not decoded payload data. Omitted and non-function values (including MIME arrays and false) accept all drags. |
| `prompt` | `string` | Tips |

Makes an element a drop target for HTML5 native drag-and-drop.

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
