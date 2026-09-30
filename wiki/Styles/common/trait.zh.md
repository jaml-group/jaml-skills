# common.trait

<!-- Generated from native authoring; do not edit. -->

[English](trait.md)

Element-scoped `*.is.*` plus `Styles.with.*`, `Styles.no(...)`, and `Styles.on.*` — semantic class helpers used by the runtime style and theme systems.

Traits are named visual or structural roles. Use them when the class is part of a shared styling vocabulary, not as a one-off selector. For arbitrary class names and custom descendant rules, use [common.clazz](./clazz.md).

---

## Variants

### `is`

<a id="entry-is"></a>

应用类型类

为路径选中的目标应用指定名称的框架特征。

将路径中紧邻 is 之前的片段追加到 type 参数后，构建特征类。因此，嵌套路径会生成针对特定目标的类。

需要匹配的样式表实现最终的类。

根路径 is 没有前置片段，当前会生成 jam-{type}-undefined 类。若不需要针对特定目标的后缀，应使用 clazz 指定明确的类名。生成的类须有对应样式表实现；此样式不会创建组件行为。

位置参数顺序: `type`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `type` | `string` | 类型<br>支持简写 |

Adds an identity trait. Use it under an element or slot style namespace. `is(type)` composes the supplied type with the parent style path, e.g. `button.is(action)` adds `jam-action-button`.

Element-scoped preset path:

| Path               | Class         |
| ------------------ | ------------- |
| `label.is.subgrid` | `jam-subgrid` |

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Grid item',
        styles: ['label.is.subgrid']
    }
];
```

### `with`

<a id="entry-with"></a>

应用 with-* 类

为选定目标应用指定的 with 特征。

根据 type 参数构建 jam-with- 类。

目标样式表必须实现该具体特征。

任意名称不会自行产生行为；具体外观或生命周期有要求时，使用专用预设。

位置参数顺序: `type`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `type` | `string` | 类型<br>支持简写 |

Adds a positive treatment trait. Generic `with(type)` adds `jam-with-{type}`; preset paths use the framework treatment names.

| Path             | Class             |
| ---------------- | ----------------- |
| `with.accent`    | `jam-bg-accent`   |
| `with.tint`      | `jam-bg-tint`     |
| `with.elevation` | `jam-bg-elevated` |

```javascript jaml-playground
export default [
    {
        type: 'badge',
        cap: 'Live',
        content: 'Online',
        styles: ['with.accent']
    }
];
```

### `no`

<a id="entry-no"></a>

应用 no-* 类

为选中的目标应用指定名称的 no 特征。

根据 type 参数构建 jam-no- 类。

目标样式表必须实现该特定特征。

任意名称不会创建行为；关注具体外观或生命周期时，使用专门的预设。

位置参数顺序: `type`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `type` | `string` | 类型<br>支持简写 |

Adds a negative trait as `jam-no-{type}`. It is available both as `Styles.no(type)` and through common element and slot style namespaces, for example `button.no(icon)` or `cap.no(wrap)`.

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Text only',
        styles: ['button.no(icon)']
    }
];
```

### `on`

<a id="entry-on"></a>

应用 on-* 类

将命名的 on 特征应用到所选目标。

根据 type 参数构建 jam-on- 类。

目标样式表必须实现该特定特征。

任意名称不会创建行为；需要具体外观或生命周期时使用专用预设。

位置参数顺序: `type`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `type` | `string` | 类型<br>支持简写 |

Declares the surface context an element is rendered on. Generic `on(type)` adds `jam-on-{type}`; preset paths configure the framework's foreground color profile for common contexts.

| Path        | Class           |
| ----------- | --------------- |
| `on.accent` | `jam-on-accent` |
| `on.light`  | `jam-on-light`  |
| `on.dark`   | `jam-on-dark`   |

```javascript jaml-playground
export default [
    {
        type: 'card',
        cap: 'On primary',
        styles: ['background(color:var(--jam-color-primary-default))', 'on.accent']
    }
];
```

---

## Theme recipe traits

Runtime trait helpers produce `jam-*` classes. Theme recipe traits use the same vocabulary, but recipe paths declare traits on a node with `-[trait]`, such as `button-withacbg.backgroundColor`. See [Theme Recipe](../../Theme/recipe.md#nodes) for the import/export grammar.

## `is.subgrid`

<a id="entry-is-subgrid"></a>

子网格

将子元素标记为框架子网格布局的参与项。

添加 jam-subgrid；layout-subgrid 样式表使其使用 grid 显示模式，并按配置的子网格列数设置跨列范围。

用于提供列数的 layout.subgrid 宿主之下。

此标记本身不建立父级网格，也不提供列数。
