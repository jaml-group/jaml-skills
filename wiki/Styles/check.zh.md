# check

<!-- Generated from native authoring; do not edit. -->

[English](check.md)

使用提供选中项、valuechange 和定位器方法的选项宿主，例如 radio、checkbox、buttongroup-radio 或 buttongroup-checkbox。普通 buttongroup 没有选择模式，应明确选择 radio 或 checkbox 子类型。第一个选中项提供定位目标。

由原生选项元素负责选择，并将其值绑定到应用状态。原生选中态已经可见；仅在需要不同视觉效果时添加一种 check 定位器。

这是一个视觉标记，不会为每个选中项创建标记。它不实现 tabs 键盘导航、ARIA 标签页语义或面板切换。

`Styles.check.*` optionally adds one visual locator for the first checked option reported by an option host. Native radio/button-group selection is already visible without these styles. Use `check.*` only for a different checked-state treatment. The native element owns selection; use an explicit radio/checkbox subtype when needed. On valuechange, the locator follows the first checked item and hides when no item is checked. Read the entry below for timing and selection prerequisites. For owner selection and a single-choice composition, see [Choose native capabilities](../choosing-native-capabilities.md#selection-and-hover).

---

## Common arguments

<a id="common-args-check-frame"></a>

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `size` | `number` | 未提供 | 大小 |
| `width` | `numberOrString` | 运行时决定 (number) | 边框宽度 |
| `bias` | `number` | `0` | 边框距离 |
| `glow` | `number` | `false` | 发光 |
| `radius` | `numberOrString` | 运行时决定 (number) | 圆角半径<br>auto：自动适配元素；数值表示半径，单位为 px。 |
| `delay` | `number` | `200` | 延迟 |
| `breathe` | `boolean` | `false` | 呼吸 |
| `container` | `any` | 未提供 | 容器 |
| `clipTarget` | `any` | 未提供 | 裁剪目标 |
| `easing` | `string` | `bouncing` | 动画缓动 |
| `duration` | `number` | `400` | 动画时长 |
| `css` | `dictionaryOrString` | 未提供 | CSS |

## Variants

### `check.frame`

<a id="entry-check-frame"></a>

框架

当选项元素已负责选择状态时，用边框标记当前选中项。

在 valuechange 时定位第一个选中的 DOM 项；没有选中项时隐藏现有定位器。首次创建定位器前使用配置的延迟；此样式不改变选中值。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

公共参数: [check.frame](#common-args-check-frame).

Frame locator around the checked option.

```javascript jaml-playground
export default [
    {
        type: 'radio',
        cap: 'Select one',
        styles: ['check.frame(glow:4;duration:300;breathe:true)'],
        data: [
            { name: 'Option A', value: 'a' },
            { name: 'Option B', value: 'b' }
        ]
    },
    {
        type: 'radio',
        cap: 'Sharp frame',
        styles: ['check.frame(glow:0;radius:4;width:2)'],
        data: [
            { name: 'Option X', value: 'x' },
            { name: 'Option Y', value: 'y' }
        ]
    }
];
```

### `check.shade`

<a id="entry-check-shade"></a>

阴影

当选项元素已负责选择状态时，用背景底色标记当前选中项。

在 valuechange 时定位第一个选中的 DOM 项；没有选中项时隐藏现有定位器。首次创建定位器前使用配置的延迟；此样式不改变选中值。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

公共参数: [check.frame](#common-args-check-frame).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `width` | `numberOrString` | `auto` | 边框宽度 |
| `bias` | `number` | 运行时决定 (number) | 边框距离 |

Shaded background behind the checked option. Same args as `frame`, with `bias` default `'0.25rem'`.

```javascript jaml-playground
export default [
    {
        type: 'select',
        cap: 'Pick one',
        styles: ['check.shade(duration:200)'],
        data: [
            { name: 'Apple', value: 'a' },
            { name: 'Banana', value: 'b' },
            { name: 'Cherry', value: 'c' }
        ]
    }
];
```

### `check.underscore`

<a id="entry-check-underscore"></a>

下划线

当选项元素已负责选择状态时，用下划线标记当前选中项。

在 valuechange 时定位第一个选中的 DOM 项；没有选中项时隐藏现有定位器。首次创建定位器前使用配置的延迟；此样式不改变选中值。

由原生选项元素负责选择，此样式仅提供可选外观。优先使用命名参数：check.underscore(width:3;glow:5)。位置参数顺序为 size、width、bias、glow、radius、delay、breathe、container、clipTarget、easing、duration、css；前两位不是 width 和 glow。数字尺寸使用 px，delay 和 duration 使用 ms；省略参数保留运行时解析的默认值。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

公共参数: [check.frame](#common-args-check-frame).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `width` | `numberOrString` | 运行时决定 (number) | 下划线粗细，不是长度。传入以 px 为单位的数字，或 auto（取选中目标的边框宽度，至少 2 px）。默认值为运行时换算为像素的 0.25 rem；opaque 数字 defaultMetadata 表示计算所得默认值，不代表缺失或必填参数。 |
| `glow` | `number` | `false` | 发光模糊半径，单位 px。正数启用，0 关闭；解析后的默认值 false 同样关闭发光，这是运行时默认值，不表示必须传入布尔值。 |

Optional underline below the checked option. Same args as `frame`, with `width` default `'0.25rem'`. This is a visual treatment, not a tab/panel or keyboard contract.

```javascript jaml-playground
export default [
    {
        type: 'radio',
        cap: 'Pick one',
        styles: ['check.underscore(duration:300;easing:ease-in-out)'],
        data: [
            { name: 'Tab 1', value: '1' },
            { name: 'Tab 2', value: '2' },
            { name: 'Tab 3', value: '3' }
        ]
    }
];
```

### `check.pipe`

<a id="entry-check-pipe"></a>

管道

当选项元素已负责选择状态时，用侧边条标记当前选中项。

在 valuechange 时定位第一个选中的 DOM 项；没有选中项时隐藏现有定位器。首次创建定位器前使用配置的延迟；此样式不改变选中值。

位置参数顺序: `size` → `width` → `bias` → `glow` → `radius` → `delay` → `breathe` → `container` → `clipTarget` → `easing` → `duration` → `css`.

公共参数: [check.frame](#common-args-check-frame).

新增与覆盖:

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `bias` | `number` | 运行时决定 (number) | 边框距离 |

Side pipe indicator on the checked option. Same args as `frame`, with `width` default `'0.25rem'`, `bias` default `'0.25rem'`.

```javascript jaml-playground
export default [
    {
        type: 'radio',
        cap: 'Select item',
        styles: ['check.pipe(glow:3;duration:250)'],
        data: [
            { name: 'Item 1', value: '1' },
            { name: 'Item 2', value: '2' }
        ]
    }
];
```

---

## Usage

```javascript jaml-playground
export default {
    type: 'radio',
    cap: 'Select one',
    styles: ['check.frame(glow:4;duration:300)'],
    data: [
        { name: 'Option A', value: 'a' },
        { name: 'Option B', value: 'b' }
    ]
};
```

---

## Combos

Multiple check styles (shade, underscore, pipe) with icons in a single component tree:

```javascript jaml-playground
export default jaml.wrapper({ styles: ['wrapper.vertical', 'group.gridline', 'layout.alignlabel'], optionsStyles: ['options.hidebox'] }, [
    jaml.radio('Themes', {
        styles: ['check.shade'],
        data: [
            { name: 'Light', icon: '☀️' },
            { name: 'Dark', icon: '🌙' },
            { name: 'System', icon: '💻' }
        ]
    }),
    jaml.radio('Tab', {
        styles: ['check.underscore'],
        data: [
            { name: 'Overview', icon: '🏠' },
            { name: 'Activity', icon: '📈' },
            { name: 'Settings', icon: '⚙️' }
        ]
    }),
    jaml.radio('Priority', {
        styles: ['check.pipe', 'options.vertical'],
        data: [
            { name: 'Low', icon: '🟢' },
            { name: 'Medium', icon: '🟡' },
            { name: 'High', icon: '🔴' }
        ]
    })
]);
```
