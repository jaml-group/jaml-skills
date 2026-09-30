# common.attrs

<!-- Generated from native authoring; do not edit. -->

[中文](attrs.zh.md)

`Styles.attrs` — set arbitrary HTML attributes on the element.

---

## Variants

### `attrs`

<a id="entry-attrs"></a>

Properties

Set DOM attributes on the path-selected target.

Argument entries become kebab-case attribute names; null or undefined values are skipped.

Property, class, and attribute plugins retain prior values for style removal; asynchronous target lookup checks that the application is still active.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Pass the actual attribute entries; the factory forwards the entire argument dictionary and does not unwrap an attrs subobject.

Positional order: `attrs`.

| Argument | Type | Contract |
| --- | --- | --- |
| `attrs` | `any` | Properties |

Accepts any number of HTML attribute name-value pairs to set on the element.

Each key names the attribute to apply.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Attributed',
        styles: ['attrs(data-testid:my-label;aria-label:My Label)']
    }
];
```
