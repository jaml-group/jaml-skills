# common.filter

<!-- Generated from native authoring; do not edit. -->

[中文](filter.zh.md)

`Styles.filter.*` — CSS filter property.

---

## Variants

### `filter`

<a id="entry-filter"></a>

Filter

Apply visual filters to the target or its backdrop.

Sets filter and backdrop-filter independently.

Backdrop filtering needs visible content behind the target and a background that lets the effect show.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `filter` → `backdrop`.

| Argument | Type | Contract |
| --- | --- | --- |
| `filter` | `string` | Filter<br>Shorthand<br>`{"cssKey":"filter"}` |
| `backdrop` | `string` | Backdrop filter<br>Shorthand<br>`{"cssKey":"backdropFilter"}` |

Applies CSS filter and backdrop-filter effects. Accepts raw CSS filter function strings.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Blurred',
        styles: ['filter(filter:blur(2px) grayscale(0.5))']
    }
];
```
