# navigation

<!-- Generated from native authoring; do not edit. -->

[English](navigation.md)

## `navigation`

<a id="entry-navigation"></a>

由实时数据所有者驱动的上一项和下一项控件

为实时集合、吸附滚动容器、分页所有者或预览器组合可用鼠标和键盘操作的导航控件，不复制其选择模型。

创建两个原生 ghost 按钮，每次激活时重新读取可用状态，仅在可用时调用 previous 或 next。缺失状态或 enabled:false 会禁用按钮并清空预加载候选。默认到边界停止；wrap 仅向所有者传达循环请求，实际循环由所有者实现。插件不保存集合顺序或选中项。

挂载到可容纳控件的 HTMLElement，并提供同步读取所有者当前状态的 navigate 回调。通过 subscribe 通知外部变化及所有者销毁；虚拟列表中单个触发项的卸载不等于所有者销毁。

subscribe 接收 refresh 和 detach 回调并返回清理函数。detach 释放来源回调及订阅、禁用控件，但不关闭已经打开的预览。卸载插件会销毁其按钮并移除控件容器。初始状态及 onstate 会在构造期间同步发送。

实时有序集合使用 collectionNavigation({items,current,key,select,subscribe})；从零开始的分页使用 pageNavigation({page,pages,select,subscribe})；原生滚动及吸附几何使用 scrollNavigation({target,orientation,targets,subscribe})。将返回的选项传给 Plugins.navigation，或覆盖 navigate。排序、过滤、选择及生命周期仍由来源所有者负责。预览器通过同一状态契约读取可选的当前 item 和按距离由近到远排列的预加载候选。

回调是同步的；异步所有者先返回当前状态，完成操作后刷新订阅。不要捕获复制后的集合快照。插件不读取内容、不处理应用权限、不自行分页数据，也不添加触摸手势。集合排除当前项时禁用导航，不自行选择替代项。

位置参数顺序: `navigate` → `subscribe` → `orientation` → `wrap` → `previousLabel` → `nextLabel` → `onstate`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `navigate` | `function` | 未提供 | 必需回调 ({action:'state'\|'previous'\|'next',wrap:boolean}) => state \| undefined。状态包含 previous/next 布尔值、可选 enabled、可选 item 和可选 preload:{previous:items[],next:items[]}；候选按距离由近到远排列。所有者执行移动并返回操作后的当前状态。 |
| `subscribe` | `function` | 未提供 | 可选 (refresh,detach) => unsubscribe。可用状态、相邻项或选择变化后调用 refresh；来源视图销毁时调用 detach。返回用于移除此订阅的清理函数。 |
| `orientation` | `string` | `horizontal` | 控件布局：默认 horizontal 水平排列，或 vertical 垂直排列。导航含义由来源回调决定。<br>选项: `horizontal`, `vertical` |
| `wrap` | `boolean` | `false` | 向来源回调传递循环偏好，默认为 false。集合、分页和滚动适配器在自身边界实现循环。 |
| `previousLabel` | `string` | 未提供 | 上一项按钮的纯文本无障碍标签；省略时使用本地化默认值。 |
| `nextLabel` | `string` | 未提供 | 下一项按钮的纯文本无障碍标签；省略时使用本地化默认值。 |
| `onstate` | `function` | 未提供 | 可选的同步状态观察回调，包含初始构造及禁用、解绑状态。消费者可用 item 选择预览内容，用预加载候选安排后台工作。首次回调执行时，不要假定外部控制器变量已完成赋值。 |

hosts: `HTMLElement`.

states: `plug`, `unplug`.
