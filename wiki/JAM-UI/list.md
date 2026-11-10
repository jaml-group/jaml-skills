# list and list-todo

**Class:** `LettuceList` · **Types:** `list`, `list-todo` · **Extends:** [`table`](./table.md)

Native collections of records. `list` shows items and `list-todo` adds a completion checkbox to each item. They own item presentation and roles. Checklist items also own native checkbox keyboard interaction.

| Content                                     | Choose                                           |
| ------------------------------------------- | ------------------------------------------------ |
| Instructions to follow in order             | [how-to `steps`](./steps.md#how-to-instructions) |
| Unordered items or grouped items            | `list`                                           |
| Tasks the reader can tick off               | `list-todo`                                      |
| Progress of a process: done, running, error | [`steps`](./steps.md#progress)                   |
| Records compared across several fields      | [`table`](./table.md)                            |

---

## Records

Give each record an `id` (string or number) and a caption in `name` (or `cap`). The `id` keys the item across updates and joins saved results; other fields stay on the record. IDs compare as strings and must be unique across the hierarchy, so `7` and `"7"` collide. Records and `children` arrays must be acyclic. Supply a boolean when setting a task's `finish`; an omitted value displays as unfinished without eagerly adding that field to the record. Item columns are fixed, so `dataDef` and `theads` are not accepted; configure the item cell with `itemDef`.

| Param            | Type           | Default | Description                                                                                                            |
| ---------------- | -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------- |
| `data`           | `ListRecord[]` | `[]`    | The records. In `list` and `list-todo`, a record with nonempty `children` is a group header; `children: []` is a leaf. |
| `cap`            | `string`       | —       | Caption above the collection.                                                                                          |
| `updateViaValue` | `boolean`      | `false` | `list-todo`: `data` is the catalogue and `value` holds saved results joined by `id`.                                   |
| `itemDef`        | `object`       | —       | Item cell definition with `ontdbuild(td)` and `onitemupdate(td, record)` for rich items.                               |

---

## Lists

`list` renders a bullet before each item; `list.ordered` numbers them instead.

### Checklists

`list-todo` gives each item a checkbox; `finish: true` marks it done. Its `value` is the flat array of leaf records with their current `finish`, so a peer can bind it like any input value.

<!-- generated-reply-demo:checklist:start -->

````text
```text jamll-content
{ type: 'list-todo', cap: 'Launch checklist', styles: ['options.disc'], data: [{ id: 'copy', name: 'Final copy approved', finish: true }, { id: 'qa', name: 'QA pass on mobile', finish: true }, { id: 'notes', name: 'Release notes published' }, { id: 'announce', name: 'Announcement scheduled' }] }
```
````

<!-- generated-reply-demo:checklist:end -->

Use [`options.disc`](../Styles/options-style.md#entry-options-disc) for round checklist controls.

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

## Styles

Lists inherit table presentation styles, which are also available under `list.*`.

| Style            | Effect                                                      |
| ---------------- | ----------------------------------------------------------- |
| `list.ordered`   | Numbers items in list order.                                |
| `list.compact`   | Tighter rows; task rows stay operable and long labels wrap. |
| `table.gridline` | Item boundaries.                                            |
| `table.stripy`   | Alternating item backgrounds.                               |

See the [list style reference](../Styles/list.md) for arguments and prerequisites.

---

## Updating records

Configure `itemDef` before the first data assignment. Replace `data` to append or update records: inherited `addRows` and `setRow` are rejected. Transform records before assignment or after readback; assigning `modifier` or `accessor` is rejected. Inherited row selection stays disabled (`checkType: 'none'`); use `list-todo` completion for checkable tasks.

## Rich items

Use `itemDef.ontdbuild(td)` to add persistent content to an item, placing it in a native slot such as `extra` so value updates keep it, and `itemDef.onitemupdate(td, record)` to refresh it when the record's fields change. A keyed refresh retains the item and its descendants, so content set only in `ontdbuild` does not follow later data.

---

## Limits

Screen-reader acceptance and browsers other than Chromium are unverified.
