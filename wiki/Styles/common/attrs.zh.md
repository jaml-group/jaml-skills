# common.attrs

<!-- Generated from native authoring; do not edit. -->

[English](attrs.md)

`Styles.attrs` — set arbitrary HTML attributes on the element.

---

## Variants

### `attrs`

<a id="entry-attrs"></a>

属性

为路径选中的目标设置 DOM 属性。

参数条目变为 kebab-case 属性名；跳过 null 或 undefined 值。

属性、类和 DOM 特性插件保留先前的值，以便移除样式时恢复；异步目标查找会检查该次应用是否仍然有效。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

直接传入属性条目；工厂转发整个参数字典，不解包 attrs 子对象。

位置参数顺序: `attrs`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `attrs` | `any` | 属性 |

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
