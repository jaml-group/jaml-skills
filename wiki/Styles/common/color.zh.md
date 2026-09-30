# common.color

<!-- Generated from native authoring; do not edit. -->

[English](color.md)

`Styles.color.*` — semantic foreground colors and HSL color adjustments.

---

## Variants

### `color`

<a id="entry-color"></a>

颜色

为路径选中的目标设置前景色。

通过依赖路径的样式方式转发 color 和可选的颜色通道参数。

使用语义化颜色预设实现随主题变化的前景色角色；根路径 color.accent 具有独立的颜色配置契约。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `h` → `s` → `l` → `a` → `color`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `h` | `numberOrString` | 色相 |
| `s` | `numberOrString` | 饱和度 |
| `l` | `numberOrString` | 亮度 |
| `a` | `numberOrString` | 透明度 |
| `color` | `string` | 颜色<br>支持简写<br>`{"cssKey":"color"}` |

Adjusts an element's color via hue shift, saturation, lightness, and alpha multipliers.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Tinted',
        styles: ['color(h:30;s:1.2;l:1.1)']
    }
];
```

### Semantic foreground presets

These no-argument paths set `color` from the active theme rather than binding the element to a literal color.

| Path               | Color token                 | Description                    |
| ------------------ | --------------------------- | ------------------------------ |
| `color.default`    | `--jam-color-fg-default`    | Default foreground             |
| `color.strong`     | `--jam-color-fg-strong`     | Strong foreground              |
| `color.subtle`     | `--jam-color-fg-subtle`     | Subtle foreground              |
| `color.muted`      | `--jam-color-fg-muted`      | Muted foreground               |
| `color.faint`      | `--jam-color-fg-faint`      | Faint foreground               |
| `color.primary`    | `--jam-color-fg-primary`    | Primary semantic foreground    |
| `color.secondary`  | `--jam-color-fg-secondary`  | Secondary semantic foreground  |
| `color.tertiary`   | `--jam-color-fg-tertiary`   | Tertiary semantic foreground   |
| `color.quaternary` | `--jam-color-fg-quaternary` | Quaternary semantic foreground |

`color.primary`, `color.secondary`, `color.tertiary`, and `color.quaternary` also add the `.jam-colored` marker so parent role recipes do not overwrite the explicit semantic foreground.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Theme-aware emphasis',
        styles: ['color.strong']
    }
];
```

### Contrast foreground presets

The `color.on.*` namespace supplies foregrounds designed for the matching colored background. These are distinct from `color.primary|secondary|tertiary|quaternary`, which use the `fg.*` family on ordinary surfaces. `color.on` itself is a namespace and is not callable.

| Path                  | Color token                 | Intended background     |
| --------------------- | --------------------------- | ----------------------- |
| `color.on.primary`    | `--jam-color-on-primary`    | `background.primary`    |
| `color.on.secondary`  | `--jam-color-on-secondary`  | `background.secondary`  |
| `color.on.tertiary`   | `--jam-color-on-tertiary`   | `background.tertiary`   |
| `color.on.quaternary` | `--jam-color-on-quaternary` | `background.quaternary` |

These dotted names are native style paths. Inside compact CSS, use the corresponding undotted values: `css(color:onprimary)`, `css(color:onsecondary)`, `css(color:ontertiary)`, and `css(color:onquaternary)`.

```javascript jaml-playground
export default [
    {
        type: 'card',
        styles: ['background.primary', 'color.on.primary'],
        components: [{ type: 'label', cap: 'On primary' }]
    }
];
```

### `accent`

<a id="entry-color-accent"></a>

主题强调色

为组件或普通宿主设置局部强调色。

使用提供的 color，或根据强调色参数生成颜色；设置 AbstractElement.color 或直接应用强调色变量，并在移除时清除该强调色。

共享语义优先使用语义主题颜色；来自可复用业务数据的强调色可使用已注册的配色。

位置参数顺序: `color` → `h` → `s` → `l` → `temp` → `bias` → `seq`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `color` | `string` | 未提供 | 颜色<br>支持简写 |
| `h` | `number` | 未提供 | 色相 |
| `s` | `number` | 未提供 | 饱和度 |
| `l` | `number` | 未提供 | 亮度 |
| `temp` | `string` | 未提供 | 色温<br>选项: `warm` — 暖色, `cool` — 冷色 |
| `bias` | `number` | 未提供 | 偏移 |
| `seq` | `boolean` | `false` | 序列 |

Sets the accent color on an element (supports AbstractElement color system).

```javascript jaml-playground
export default [
    {
        type: 'button',
        cap: 'Accented',
        styles: ['color.accent(color:#ff6600)']
    }
];
```

### `syncWithMap`

<a id="entry-color-syncwithmap"></a>

同步地图颜色

使地图标注的强调色与其所在区域匹配。

找到最近的 jam-map，等待 draw 就绪，根据 geo 区域解析 jam-coord，并应用该区域的 areaColor，去除透明度。

需要地图祖先、匹配的区域名称和 areaColor。

卸载宿主、拆卸样式或销毁宿主时，使待执行的绘制就绪工作失效，并仅在此次设置应用了强调色时移除它。样式仍然安装时，重新挂载会执行一次新的查找。

这是挂载时的查找，不订阅后续地图重新着色。

After draw readiness resolves on the nearest parent `jam-map`, matches the element’s `jam-coord` to a region and applies its `itemStyle.areaColor` at full opacity. This is a lookup for each mount, not a subscription to recoloring. Unmount or teardown invalidates pending readiness work and removes the accent only if this setup applied one. No args.

### `valueMap`

<a id="entry-color-valuemap"></a>

值映射

将数值编码为色阶上的强调色。

在 valuechange 和初次应用时，根据 valueRange 归一化宿主值，并使用选定 mode 求值由 colorRange 构建的 Chroma 色阶。

提供数值和非零范围；配色应能有效表达数据含义。

位置参数顺序: `valueRange` → `colorRange` → `mode`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `valueRange` | `array` | `[0,100]` | 值范围 |
| `colorRange` | `array` | `["red","green"]` | 颜色范围 |
| `mode` | `string` | `lch` | 模式<br>选项: `rgb`, `lch`, `hsl`, `lab`, `lrgb` |

Maps input values to colors on a scale.

```javascript jaml-playground
export default [
    {
        type: 'input',
        cap: 'Mapped',
        styles: ['color.valueMap(valueRange:[0,100];colorRange:[red,green];mode:lch)']
    }
];
```

### `stateMap`

<a id="entry-color-statemap"></a>

状态映射

将离散的元素状态映射为强调色。

在 statechange 和初次应用时，若当前状态是 colors 中的键，则应用调整后的颜色。

未映射的状态保留当前强调色。harmony 参数已声明，但此回调不读取它。

位置参数顺序: `colors` → `harmony`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `colors` | `dictionary` | 未提供 | 颜色映射<br>支持简写 |
| `harmony` | `boolean` | `true` | 颜色和谐 |

Maps element state to accent colors.

```javascript jaml-playground
export default {
    type: 'indicator',
    cap: 'Score',
    value: 72,
    valueStates: {
        pass: 'value >= 60',
        failed: 'value < 60'
    },
    styles: ["color.stateMap({colors:{pass:'green',failed:'red'}})"]
};
```

`valueStates` derives `pass` or `failed`; `color.stateMap` listens for that state and applies the corresponding accent color. Define every reachable state in the color map so an unmapped state does not retain the previous accent.

## `color.faint`

<a id="entry-color-faint"></a>

极弱化色

使用主题的 faint 前景色角色。

根据 sys.color.fg.faint 设置 color。

将前景色角色与合适的表面组合；前景色预设不绘制背景。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.muted`

<a id="entry-color-muted"></a>

弱化色

使用主题的 muted 前景色角色。

根据 sys.color.fg.muted 设置 color。

将前景色角色与合适的表面组合；前景色预设不绘制背景。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.strong`

<a id="entry-color-strong"></a>

强调色

根据路径选择强调的前景色或强调色前景。

color.strong 使用 strong 前景色变量；嵌套的 color.accent 使用 primary 前景色变量，并添加 colored 类。

两者是不同的角色。根路径 color.accent 具有独立的颜色配置行为，不属于此共享预设组。

## `color.subtle`

<a id="entry-color-subtle"></a>

次要色

根据路径选择低调的前景色或具有 secondary 语义角色的前景色。

color.subtle 使用 subtle 前景色变量；color.secondary 使用 secondary 前景色变量，并添加 colored 类。

subtle 表示前景强调程度，secondary 表示语义颜色角色；两者不是别名。

## `color.default`

<a id="entry-color-default"></a>

默认颜色

使用主题的默认前景色角色。

根据 sys.color.fg.default 设置 color。

将前景色角色与合适的表面组合；前景色预设不绘制背景。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.primary`

<a id="entry-color-primary"></a>

主题强调色

应用完整路径指定的 primary 前景色、强调色表面或强调色背景下的文本样式。

color.primary 设置 primary 前景色变量和 colored 类；with.accent 添加 accent-background 类，在受支持的宿主上提供表面及匹配的前景色；on.accent 应用强调色背景下的文本变量。

前景色强调使用 color.primary；填充控件或表面使用 with.accent；内容位于已有强调色表面上时使用 on.accent。

这些路径共享元数据，但不能互换，也不重新定义主题变量。

## `color.tertiary`

<a id="entry-color-tertiary"></a>

第三色

使用主题的 tertiary 前景色角色。

根据 sys.color.fg.tertiary 设置 color，并添加 colored 类。

将前景色角色与合适的表面组合；前景色预设不绘制背景。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.secondary`

<a id="entry-color-secondary"></a>

次要色

根据路径选择低调的前景色或具有 secondary 语义角色的前景色。

color.subtle 使用 subtle 前景色变量；color.secondary 使用 secondary 前景色变量，并添加 colored 类。

subtle 表示前景强调程度，secondary 表示语义颜色角色；两者不是别名。

## `color.quaternary`

<a id="entry-color-quaternary"></a>

第四色

使用主题的 quaternary 前景色角色。

根据 sys.color.fg.quaternary 设置 color，并添加 colored 类。

将前景色角色与合适的表面组合；前景色预设不绘制背景。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.on.primary`

<a id="entry-color-on-primary"></a>

主色上的前景色

选择适用于 primary 表面角色的前景色。

根据 sys.color.on.primary 设置 color。

与 background.primary 或等效主题角色配合；此预设不创建该表面。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.on.tertiary`

<a id="entry-color-on-tertiary"></a>

第三色上的前景色

选择适用于 tertiary 表面角色的前景色。

根据 sys.color.on.tertiary 设置 color。

与 background.tertiary 或等效主题角色配合；此预设不创建该表面。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.on.secondary`

<a id="entry-color-on-secondary"></a>

次色上的前景色

选择适用于 secondary 表面角色的前景色。

根据 sys.color.on.secondary 设置 color。

与 background.secondary 或等效主题角色配合；此预设不创建该表面。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。

## `color.on.quaternary`

<a id="entry-color-on-quaternary"></a>

第四色上的前景色

选择适用于 quaternary 表面角色的前景色。

根据 sys.color.on.quaternary 设置 color。

与 background.quaternary 或等效主题角色配合；此预设不创建该表面。

这些是局部样式应用。可复用的调色板和色阶修改属于主题变量；应用预设不重新定义主题。
