# common.clazz

<!-- Generated from native authoring; do not edit. -->

[English](clazz.md)

`Styles.clazz` — raw CSS class helper.

For semantic trait classes such as `is.major`, `with.accent`, and element-scoped `no(...)`, see [common.trait](./trait.md).

---

## Variants

### `clazz`

<a id="entry-clazz"></a>

类

应用可复用的框架类和可选的后代样式。

类名缺少 jam- 前缀时会添加该前缀；开头的减号会移除类。descStyles 只在对应选择器尚未注册时，注册以该类为作用范围的全局样式。

类变更保留先前的类成员状态，以便移除该次样式应用时恢复。

可复用的视觉契约使用稳定类名；一次性调整使用局部属性样式。

移除类本身不会注销 descStyles 的全局注册。

位置参数顺序: `clazz` → `descStyles` → `revertKey`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `clazz` | `string` | 类<br>支持简写 |
| `descStyles` | `dictionary` | 后代样式 |
| `revertKey` | `string` | 回退键 |

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
