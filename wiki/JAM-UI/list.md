# list, list-todo and steps

**Classes:** `LettuceList` (`list`, `list-todo`) · `ShaddockSteps` (`steps`) · **Extends:** [`table`](./table.md)

Native collections of records. `list` shows items or instructions, `list-todo` adds a completion checkbox to each item, and `steps` shows the status of a sequence. They own item presentation and roles; checklist items also own native checkbox keyboard interaction. Steps display status and do not navigate between panels.

| Content                                     | Choose                     |
| ------------------------------------------- | -------------------------- |
| Instructions to follow in order             | `list` with `list.ordered` |
| Unordered items or grouped items            | `list`                     |
| Tasks the reader can tick off               | `list-todo`                |
| Progress of a process: done, running, error | `steps`                    |
| Records compared across several fields      | [`table`](./table.md)      |
| A static labelled flow without status       | [`step`](./step.md)        |

---

## Records

Give each record an `id` (string or number) and a caption in `name` (or `cap`). The `id` keys the item across updates and joins saved results; other fields stay on the record. IDs compare as strings and must be unique across the hierarchy, so `7` and `"7"` collide. Records and `children` arrays must be acyclic. Supply a boolean when setting a task's `finish`; an omitted value displays as unfinished without eagerly adding that field to the record. Item columns are fixed, so `dataDef` and `theads` are not accepted; configure the item cell with `itemDef`.

| Param            | Type               | Default | Description                                                                                                            |
| ---------------- | ------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `data`           | `ListRecord[]`     | `[]`    | The records. In `list` and `list-todo`, a record with nonempty `children` is a group header; `children: []` is a leaf. |
| `cap`            | `string`           | —       | Caption above the collection.                                                                                          |
| `updateViaValue` | `boolean`          | `false` | `list-todo`: `data` is the catalogue and `value` holds saved results joined by `id`.                                   |
| `current`        | `string \| number` | —       | `steps`: the `id` of the step being viewed, independent of its status.                                                 |
| `itemDef`        | `object`           | —       | Item cell definition with `ontdbuild(td)` and `onitemupdate(td, record)` for rich items.                               |

---

## Lists

`list` renders a bullet before each item; `list.ordered` numbers them instead.

<!-- generated-reply-demo:ordered:start -->

````text
```text jamll
{ type: 'list', cap: 'Reset the router', styles: ['list.ordered'], data: [{ id: 'unplug', name: 'Unplug the router for 30 seconds' }, { id: 'plug', name: 'Plug it back in and wait for the light to turn steady' }, { id: 'connect', name: 'Reconnect your device to the network' }] }
```
````

<!-- generated-reply-demo:ordered:end -->

### Checklists

`list-todo` gives each item a checkbox; `finish: true` marks it done. Its `value` is the flat array of leaf records with their current `finish`, so a peer can bind it like any input value.

<!-- generated-reply-demo:checklist:start -->

````text
```text jamll
{ type: 'list-todo', cap: 'Launch checklist', data: [{ id: 'copy', name: 'Final copy approved', finish: true }, { id: 'qa', name: 'QA pass on mobile', finish: true }, { id: 'notes', name: 'Release notes published' }, { id: 'announce', name: 'Announcement scheduled' }] }
```
````

<!-- generated-reply-demo:checklist:end -->

A record with nonempty `children` becomes a group header without a checkbox; its leaves keep their own completion, and the group does not complete with them.

```javascript jaml-playground
export default {
    type: 'list-todo',
    cap: 'Move house',
    data: [
        {
            id: 'pack',
            name: 'Pack',
            children: [
                { id: 'books', name: 'Books', finish: true },
                { id: 'kitchen', name: 'Kitchen' }
            ]
        },
        { id: 'utilities', name: 'Transfer utilities' }
    ]
};
```

### Saved results

With `updateViaValue: true`, `data` lists what can be done and `value` holds the saved results, matched by `id`. A toggle changes only the matching result's `finish`, or appends that record when it has none, and publishes through the ordinary two-way binding. Results without a matching item are kept. Every catalogue record needs an explicit ID in this mode. Saved `value` entries are flat records without `children`.

```javascript jaml-playground
export default {
    type: 'container',
    vars: { done: [{ id: 'site', finish: true }] },
    components: [
        {
            type: 'list-todo',
            cap: 'Builds',
            updateViaValue: true,
            value: '{{done}}',
            data: [
                { id: 'app', name: 'App build' },
                { id: 'site', name: 'Site build' }
            ]
        },
        { type: 'label', cap: "{{done.filter((record) => record.finish).length + ' of 2 done'}}" }
    ]
};
```

---

## Steps

`steps` shows a flat sequence. Each record's `status` is `wait` (default), `process`, `finish`, `warning`, `error` or `skipped`; the element draws the marker, a localized status caption and the line to the next step. `current` marks the step being viewed with a ring and bold caption without changing its status, and the line into it flows. A `process` step shows a spinner. Motion stops under reduced motion.

| `status`  | Caption (en) | Colour  |
| --------- | ------------ | ------- |
| `wait`    | Waiting      | normal  |
| `process` | In progress  | success |
| `finish`  | Completed    | success |
| `warning` | Warning      | warn    |
| `error`   | Error        | error   |
| `skipped` | Skipped      | mute    |

`steps.horizontal` places the sequence in one row that scrolls inside the element and fades the edge that hides steps. Give it a width.

<!-- generated-reply-demo:progress:start -->

````text
```text jamll
{ type: 'steps', cap: 'Order 4821', current: 'transit', style: { width: '100%' }, styles: ['steps.horizontal'], data: [{ id: 'placed', name: 'Placed', status: 'finish' }, { id: 'packed', name: 'Packed', status: 'finish' }, { id: 'transit', name: 'In transit', status: 'process' }, { id: 'delivered', name: 'Delivered' }] }
```
````

<!-- generated-reply-demo:progress:end -->

`steps.winding` alternates markers from side to side on a curved line; combine it with `steps.horizontal` for a strip whose markers alternate up and down.

```javascript jaml-playground
export default {
    type: 'steps',
    cap: 'Onboarding',
    current: 'account',
    styles: ['steps.winding'],
    data: [
        { id: 'invite', name: 'Invite accepted', status: 'finish' },
        { id: 'account', name: 'Account set up', status: 'warning' },
        { id: 'training', name: 'Training' },
        { id: 'review', name: 'First review', status: 'skipped' }
    ]
};
```

The application owns `status` and `current`; the element displays them and does not navigate.

---

## Styles

Lists and steps are tables, so table styles apply unchanged and also resolve under `list.*` and `steps.*`. Their own styles are:

| Style              | Effect                                                                          |
| ------------------ | ------------------------------------------------------------------------------- |
| `list.ordered`     | Numbers items in list order.                                                    |
| `list.compact`     | Tighter rows; task rows stay operable and long labels wrap.                     |
| `steps.horizontal` | One scrolling row. Needs the complete sequence: no virtualization or Show more. |
| `steps.winding`    | Alternating markers on a curved line, vertical or with `steps.horizontal`.      |
| `table.gridline`   | Item boundaries.                                                                |
| `table.stripy`     | Alternating item backgrounds.                                                   |

See the generated [list](../Styles/list.md) and [steps](../Styles/steps.md) style references and [table styles](../Styles/table-style.md) for the inherited paths.

---

## Updating records

Configure `itemDef` before the first data assignment. Replace `data` to append or update records: inherited `addRows` and `setRow` are rejected. Transform records before assignment or after readback; assigning `modifier` or `accessor` is rejected. Inherited row selection stays disabled (`checkType: 'none'`); use `list-todo` completion for checkable tasks.

## Rich items

Use `itemDef.ontdbuild(td)` to add persistent content to an item, placing it in a native slot such as `extra` so value updates keep it, and `itemDef.onitemupdate(td, record)` to refresh it when the record's fields change. A keyed refresh retains the item and its descendants, so content set only in `ontdbuild` does not follow later data.

---

## Limits

Screen-reader acceptance and browsers other than Chromium are unverified. In light mode, coloured status captions measure about 3.8:1 contrast and numerals on their tint about 3.2:1.
