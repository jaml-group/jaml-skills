# common.flex

`Styles.flex.*` — flexbox container properties.

---

## Variants

### `flex`

Sets flexbox layout properties on a container element.

| Arg | Type | Description | Notes |
|---|---|---|---|
| `flex` | `string` | Flex shorthand (grow shrink basis) | e.g. `1 0 auto` |
| `direction` | `string` | Flex direction | `row`, `column`, `row-reverse`, `column-reverse` |
| `wrap` | `string` | Flex wrap | `nowrap`, `wrap`, `wrap-reverse` |
| `gap` | `string` | Gap between items | e.g. `1rem` |

```json jaml-playground
[
    {
        "type": "wrapper",
        "styles": ["flex(direction:row;gap:1rem)"],
        "components": [
            { "type": "label", "cap": "Item 1" },
            { "type": "label", "cap": "Item 2" }
        ]
    }
]
```

For managed divider elements between flex children, combine `flex(...)` with [`group.divider`](../group.md#groupdivider). The former `flex.seperator` variant has been removed.
