# common.clazz

<!-- Generated from native authoring; do not edit. -->

[中文](clazz.zh.md)

`Styles.clazz` — raw CSS class helper.

For semantic trait classes such as `is.major`, `with.accent`, and element-scoped `no(...)`, see [common.trait](./trait.md).

---

## Variants

### `clazz`

<a id="entry-clazz"></a>

Class

Apply reusable framework classes and optional descendant styles.

Class names gain the jam- prefix when absent; a leading minus removes a class. descStyles registers a class-scoped global style only if that selector is not already registered.

Class changes retain the previous class membership for removal of the style application.

Use a stable class name for a reused visual contract; use local property styles for a one-off adjustment.

Class removal does not itself unregister the descStyles global registration.

Positional order: `clazz` → `descStyles` → `revertKey`.

| Argument | Type | Contract |
| --- | --- | --- |
| `clazz` | `string` | Class<br>Shorthand |
| `descStyles` | `dictionary` | Descendant styles |
| `revertKey` | `string` | Revert key |

Adds arbitrary CSS classes to the element. Accepts one or more class names.

Descendant styles are registered as a global rule for the class.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Custom',
        styles: ['clazz(my-custom-class)']
    }
];
```
