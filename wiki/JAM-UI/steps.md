# steps

**Class:** `ShaddockSteps` · **Type:** `steps` · **Extends:** [`list`](./list.md)

Use `steps` for instructions in order or for the stages of a process. Use a [checklist](./list.md#checklists) when readers need to tick off tasks.

## Records

Supply a flat `data` array of records. Give each a stable `id` and a caption in `name` or `cap`. IDs compare as strings, so `7` and `"7"` collide. Omit `children` from the records.

| Param     | Type                       | Default | Description                                                                                   |
| --------- | -------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `data`    | `ListRecord[]`             | `[]`    | Ordered records with optional `status`.                                                       |
| `cap`     | `string`                   | —       | Caption above the sequence.                                                                   |
| `current` | `string \| number \| null` | `null`  | ID of the current stage, independent of status. Use `null` to clear it.                       |
| `connect` | `boolean`                  | `true`  | Include the default marker rails. Set `false` at initialization to omit them.                 |
| `itemDef` | `object`                   | —       | Item cell definition. Set it before assigning `data`. See [rich items](./list.md#rich-items). |

Replace `data` when records change. See [shared record update rules](./list.md#updating-records).

## How-to instructions

Omit `status` from every record for how-to instructions. The element shows numbered markers with accent rings and the default rails. How-to steps have no status captions.

<!-- generated-reply-demo:ordered:start -->

````text
```text jamll-content
{ type: 'steps', cap: 'Reset the router', data: [{ id: 'unplug', name: 'Unplug the router for 30 seconds' }, { id: 'plug', name: 'Plug it back in and wait for the light to turn steady' }, { id: 'connect', name: 'Reconnect your device to the network' }] }
```
````

<!-- generated-reply-demo:ordered:end -->

## Progress

To report progress, give at least one record a `status`. The whole sequence then displays localized status captions, and records without a status display `wait`. Use `status` for the visual state and its standard caption. Put the exact stage wording or a blocker detail in `name`. A `process` step shows a spinner. `current` highlights the viewed step independently of status, and its incoming rail flows. Motion stops under reduced motion.

| `status`  | Caption (en) | Colour  |
| --------- | ------------ | ------- |
| `wait`    | Waiting      | normal  |
| `process` | In progress  | success |
| `finish`  | Completed    | success |
| `warning` | Warning      | warn    |
| `error`   | Error        | error   |
| `skipped` | Skipped      | mute    |

<!-- generated-reply-demo:progress:start -->

````text
```text jamll-content
{ type: 'steps', cap: 'Order 4821', current: 'address', data: [{ id: 'placed', name: 'Placed', status: 'finish' }, { id: 'packed', name: 'Packed', status: 'finish' }, { id: 'address', name: 'Address verification', status: 'process' }, { id: 'dispatch', name: 'Dispatch — blocked until the address is confirmed', status: 'warning' }, { id: 'delivery', name: 'Delivery — waiting for dispatch', status: 'wait' }] }
```
````

<!-- generated-reply-demo:progress:end -->

`steps.horizontal` places the sequence in one row that scrolls inside the element and fades the edge that hides steps. Give it a width.

`steps.winding` alternates markers from side to side. Combine it with `steps.horizontal` for a strip whose markers alternate up and down.

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

Steps inherit table presentation styles, which are also available under `steps.*`.

| Style                                                         | Effect                                                                                          |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `steps.horizontal`                                            | One scrolling row. Needs the complete sequence: no virtualization or Show more.                 |
| `steps.winding`                                               | Alternating marker positions, vertical or with `steps.horizontal`.                              |
| [`steps.connected`](../Styles/steps.md#entry-steps-connected) | Default rails between markers. Set `connect: false` when initializing the element to omit them. |
| `table.gridline`                                              | Item boundaries.                                                                                |
| `table.stripy`                                                | Alternating item backgrounds.                                                                   |

See the [steps style reference](../Styles/steps.md) for arguments and prerequisites.

---

## Limits

Screen-reader acceptance and browsers other than Chromium are unverified. In light mode, coloured status captions measure about 3.8:1 contrast and numerals on their tint about 3.2:1.
