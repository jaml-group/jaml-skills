# common.flex

<!-- Generated from native authoring; do not edit. -->

[中文](flex.zh.md)

`Styles.flex.*` — flexbox container properties.

---

## Variants

### `flex`

<a id="entry-flex"></a>

Flex

Configure flex participation, direction, wrapping, and spacing.

Sets flex, flex-wrap, flex-direction, and gap without establishing display:flex.

Use layout.flex when the target should become a flex container; flex itself also includes the item flex shorthand.

Choose the path for the intended host, slotted content, or slot wrapper; a slot wrapper and the content assigned to it are different targets.

Positional order: `flex` → `wrap` → `direction` → `gap`.

| Argument | Type | Contract |
| --- | --- | --- |
| `flex` | `string` | Flex<br>The flex property is shorthand for flex-grow, flex-shrink, and flex-basis. Its default is 0 1 auto; the last two properties are optional.<br>Shorthand<br>`{"cssKey":"flex"}` |
| `wrap` | `string` | Wrap<br>The flex-wrap property controls whether a flex container uses one or multiple lines and how those lines wrap.<br>Options: `nowrap` — No wrapping, `wrap` — Wrap, `wrap-reverse` — Reverse wrapping<br>`{"cssKey":"flexWrap"}` |
| `direction` | `string` | Direction<br>The flex-direction property determines the direction of the main axis, which controls how items are arranged.<br>Options: `row` — Horizontal, `row-reverse` — Reverse horizontal, `column` — Vertical, `column-reverse` — Reverse vertical<br>`{"cssKey":"flexDirection"}` |
| `gap` | `string` | Gap<br>The gap property sets the spacing between flex items.<br>`{"cssKey":"gap"}` |

Sets flexbox layout properties on a container element.

```javascript jaml-playground
export default [
    {
        type: 'wrapper',
        styles: ['flex(direction:row;gap:1rem)'],
        components: [
            { type: 'label', cap: 'Item 1' },
            { type: 'label', cap: 'Item 2' }
        ]
    }
];
```

For managed divider elements between flex children, combine `flex(...)` with [`group.divider`](../group.md#groupdivider). The former `flex.seperator` variant has been removed.
