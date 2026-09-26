# common.flex

`Styles.flex.*` — flexbox container properties.

---

## Variants

### `flex`

Sets flexbox layout properties on a container element.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style flex`.

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
