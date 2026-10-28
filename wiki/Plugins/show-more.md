# `Plugins.showMore`

<!-- Generated from native authoring; do not edit. -->

[中文](show-more.zh.md)

## Show more rows

<a id="entry-showmore"></a>

Reveal more native rows per click

Use for a short initial list with a Show more action that reveals another batch of existing rows.

Initially shows limit eligible leaf rows per direct sibling group. Each Show more click reveals a base batch of step additional eligible leaves in that group. By default every logical leaf is eligible, including a node with children: []. Nonleaf parents always remain available. An eligible callback returning false keeps that leaf visible without counting it toward the limit or caption totals. Once all eligible leaves are revealed, Show less resets the group to limit. A hidden tail smaller than minHidden is revealed automatically, both initially and after each batch. Set minHidden: 2 to avoid hiding just one row. Initial groups that fit this rule have no control; larger expanded groups retain Show less. Captions report the actual reveal count, including any absorbed tail. Active filtering bypasses the limit; clearing the filter restores the retained visible count. Disclosure preserves row ordering and selection.

Attach to a native table or tree, including radio and checkbox variants. Counts come from logical rows, so native fixed-height virtualization remains supported. Use stable row and parent keys when replacing data. Only one showMore owner may attach to a table or tree.

Visible counts belong to this plugin instance and are retained by parent key during data updates. Removed groups are pruned. Unplugging removes the disclosure behavior; no persistence or external controller is provided. Newly appended rows use the accumulated visible count; a partial final batch gives no unused credit for later additions.

The native row owner controls grouping, sorting, filtering, folding and virtualization. Tree arrow-key navigation requires keyboardNavigation: true; table does not acquire tree row navigation. Disclosure actions are keyboard-operable controls, not selectable data rows. Application code owns fetching and persistence. Customize moreCap and lessCap for domain wording or localization; captions render as text. With tree keyboard navigation, activating Show more focuses the first revealed row; Show less returns focus to the surviving control. Hidden rows leave the navigation projection. Disabled or readOnly hosts do not activate disclosure.

This is count-based disclosure of loaded data, not CSS overflow, text truncation, network pagination or a generic container-child limiter. Styles.overflow consumes geometric overflow state and does not count logical rows.

Positional order: `limit` → `step` → `eligible` → `moreCap` → `lessCap` → `minHidden`.

| Argument | Type | Default | Contract |
| --- | --- | --- | --- |
| `limit` | `number` | `5` | Initial number of visible eligible leaf rows per sibling group; finite values are floored and clamped to at least 1, nonfinite values use 5 |
| `step` | `number` | `5` | Base additional eligible leaf rows revealed per click; minHidden may include a short final tail. Finite values are floored and clamped to at least 1, nonfinite values use 5 |
| `eligible` | `function` | Not supplied | Optional pure synchronous (key, table) => boolean, called only for native logical leaves. key is the string/number row key; false keeps the leaf visible and excludes it from disclosure counts. Omitted includes every leaf. Use a stable-key metadata lookup for application policy; table.getRow(key) returns native cells, not the original input object. Data reprojection reevaluates eligibility; after changing external eligibility metadata alone, call table.refreshRowDisclosure(). Do not mutate data or plugin ownership inside the callback. |
| `moreCap` | `any` | Not supplied | Show more caption: string with {count} for the next batch, {remaining} for hidden leaves and {total} for all eligible leaves; or callback receiving {parent, total, remaining, step}. step is the next batch size. Omit for the localized default. parent is the string/number parent key, or undefined for root siblings; total counts eligible leaves in that sibling group. |
| `lessCap` | `any` | Not supplied | Show less caption, accepting the same string placeholders or state callback as moreCap. Omit for the localized default. When fully revealed, remaining and step are zero. |
| `minHidden` | `number` | `1` | Minimum eligible rows worth keeping hidden; smaller tails reveal automatically initially and after each batch. Use 2 to avoid a singleton tail. Defaults to 1; finite values are floored and clamped to at least 1, nonfinite values use 1 |

```javascript jaml-playground
const sessionKeys = new Set(Array.from({ length: 12 }, (_, index) => `session-${index}`));

export default {
    type: 'tree-radio',
    keyboardNavigation: true,
    style: { height: '18rem', width: '100%' },
    styles: [Styles.tree.fixednodeheight({ height: '2.5rem', animation: false })],
    plugins: [Plugins.showMore({ limit: 5, step: 3, moreCap: 'Show {count} more sessions ({remaining} remaining)', lessCap: 'Show fewer sessions', eligible: (key) => sessionKeys.has(key) })],
    data: [{ id: 'empty-group', name: 'Empty workspace', children: [] }, ...Array.from(sessionKeys, (key, index) => ({ id: key, name: `Session ${index + 1}` }))]
};
```
