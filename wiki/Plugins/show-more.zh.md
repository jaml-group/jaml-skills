# `Plugins.showMore`

<!-- Generated from native authoring; do not edit. -->

[English](show-more.md)

## Show more rows

<a id="entry-showmore"></a>

每次点击显示更多原生行

用于先显示较短列表，再通过“显示更多”逐批展示已有行。

每组直接同级节点最初显示 limit 个符合条件的叶子行。每次点击“显示更多”以 step 个符合条件的叶子行为基础批次。默认所有逻辑叶子行均符合条件，包括 children: [] 的节点。非叶子父节点始终保留。eligible 回调返回 false 的叶子行始终可见，且不计入额度或标题总数。符合条件的叶子行全部可见后显示“收起”，点击后恢复 limit。初始状态和每批显示后，若剩余隐藏行少于 minHidden，将一并显示。设置 minHidden: 2 可避免只隐藏一行。初始即全部可见的组不显示操作控件；较大的组展开后保留“收起”。标题显示实际新增数量，包括一并显示的尾部行。筛选期间不限制数量，清除筛选后恢复保留的可见数量。展开或收起不改变排序和选择。

挂载到原生 table 或 tree（包括 radio 和 checkbox 子类型）。按逻辑行计数，支持原生固定行高虚拟化。替换数据时应保持行和父节点键稳定。每个 table 或 tree 只能挂载一个 showMore。

可见数量由插件实例持有，数据更新时按父节点键保留，删除组时清理。移除插件将移除数量限制；不提供持久化或外部控制器。 追加行时使用已累计的可见数量；最后一批不足 step 时，不会为之后追加的行预留额度。

分组、排序、筛选、折叠和虚拟化仍由原生行组件负责。树形方向键导航需要 keyboardNavigation: true；table 不因此获得树形行导航。展开与收起是可通过键盘操作的控件，不是可选数据行。数据获取和持久化由应用负责；可用 moreCap 和 lessCap 定制领域措辞或本地化，标题按文本显示。 启用树形键盘导航时，激活“显示更多”将焦点移至首个新显示行；“收起”将焦点返回保留的操作控件。隐藏行不参与导航。disabled 或 readOnly 组件不响应展开和收起。

仅按数量逐步展示已加载数据，不处理 CSS 溢出、文本截断、网络分页或通用容器子组件限制。Styles.overflow 使用几何溢出状态，不计算逻辑行。

位置参数顺序: `limit` → `step` → `eligible` → `moreCap` → `lessCap` → `minHidden`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `limit` | `number` | `5` | 每组同级节点最初显示的符合条件的叶子行数量；有限值向下取整且至少为 1，非有限值使用 5 |
| `step` | `number` | `5` | 每次点击额外显示的基础叶子行数量；minHidden 可使较小尾部一并显示。有限值向下取整且至少为 1，非有限值使用 5 |
| `eligible` | `function` | 未提供 | 可选的纯同步回调 (key, table) => boolean，仅对原生逻辑叶子行调用。key 是字符串或数字行键；返回 false 的叶子行始终可见且不计入展开数量，省略时所有叶子行均计入。应用策略可通过稳定行键查询元数据；table.getRow(key) 返回原生单元格，不是原始输入对象。重新投影数据时重新判断条件；仅修改外部条件元数据后，调用 table.refreshRowDisclosure()。不要在回调内修改数据或插件归属。 |
| `moreCap` | `any` | 未提供 | “显示更多”标题：字符串支持 {count}（下一批数量）、{remaining}（隐藏数量）和 {total}（全部符合条件的叶子行数量），或接收 {parent, total, remaining, step} 的回调。step 是下一批数量；省略时使用本地化默认标题。parent 为字符串或数字类型的父节点键，根级同级节点为 undefined；total 为该组符合条件的叶子行总数。 |
| `lessCap` | `any` | 未提供 | “收起”标题，支持与 moreCap 相同的字符串占位符或状态回调；省略时使用本地化默认标题。 全部显示时 remaining 和 step 均为 0。 |
| `minHidden` | `number` | `1` | 值得保持隐藏的最少叶子行数量；初始状态和每批显示后，小于此值的尾部自动显示。设为 2 可避免只隐藏一行。默认 1；有限值向下取整且至少为 1，非有限值使用 1 |

```javascript jaml-playground
const sessionKeys = new Set(Array.from({ length: 12 }, (_, index) => `session-${index}`));

export default {
    type: 'tree-radio',
    keyboardNavigation: true,
    style: { height: '18rem', width: '100%' },
    styles: [Styles.tree.fixednodeheight({ height: '2.5rem', animation: false })],
    plugins: [Plugins.showMore({ limit: 5, step: 3, moreCap: 'Show {count} more sessions ({remaining} remaining)', lessCap: 'Show fewer sessions', eligible: (key) => sessionKeys.has(key) })],
    data: [{ id: 'empty-group', name: 'Empty workspace', children: [] }, ...Array.from(sessionKeys, (key, index) => ({ id: key, name: `Session ${index + 1}` }))]
};
```
