# load

<!-- Generated from native authoring; do not edit. -->

[English](load.md)

## `load.prompts`

<a id="entry-load-prompts"></a>

轮播加载提示

告诉用户正在等待哪项工作。

立即显示第一条提示，之后每 1.5 秒按数组顺序循环播放。单条提示持续显示，空数组使用正常的加载提示。显式提示优先，清除显式提示后从头播放。

用于具备加载状态的原生 Jam-UI 元素。首次 URL 请求或 `setLoading(progress?)` 可启动加载。

加载结束、卸载或移除最后一个提示样式时停止定时器。更改提示时保留当前的进度指示器。

调用 `Styles.load.prompts(['正在准备地形地图…', '正在加载高程视图…'])`。默认使用旋转指示器，也可在同一元素上配合 `load.progress` 使用。参见[编写加载提示](../JAML/purpose-and-composition.md#write-captions-for-the-current-load)。

位置参数顺序: `prompts`.

| 参数 | 类型 | 默认值 | 契约 |
| --- | --- | --- | --- |
| `prompts` | `array` | `[]` | 依次排列的界面语言纯文本提示数组。每条提示都应说明正在处理的工作，并在等待的任何阶段都能理解。<br>支持简写 |

## `load.spinner`

<a id="entry-load-spinner"></a>

加载旋转指示器

在执行操作的元素上显示紧凑的忙碌指示器。

显示旋转指示器、当前提示和已提供的百分比。启用减少动态效果时停止旋转。

用于具备加载状态的原生 Jam-UI 元素。首次 URL 请求或 `setLoading(progress?)` 可启动加载。

元素管理自己的加载状态。元素恢复空闲、卸载或移除加载样式时，加载层随之移除。

每个宿主选用一种展示样式。使用 `load.prompts` 轮播提示，或在操作进入实际阶段时调用 `setLoadingText(text)`。

## `load.progress`

<a id="entry-load-progress"></a>

加载进度条

在执行操作的元素上显示工作进度。

提供进度时显示数字百分比，进度未知时显示不定进度条，并保留加载提示。展示效果遵循减少动态效果偏好。

用于具备加载状态的原生 Jam-UI 元素。首次 URL 请求或 `setLoading(progress?)` 可启动加载。

元素管理自己的加载状态。元素恢复空闲、卸载或移除加载样式时，加载层随之移除。

每个宿主选用一种展示样式。使用 `load.prompts` 轮播提示，或在操作进入实际阶段时调用 `setLoadingText(text)`。
