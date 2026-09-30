# theme

<!-- Generated from native authoring; do not edit. -->

[English](theme.md)

## `theme.dark`

<a id="entry-theme-dark"></a>

深色模式

强制局部深色 color-scheme 上下文。

为宿主和兼容后代节点应用深色 luminosity、color-scheme 和 color-profile 调整。

浅色和深色样式共享局部所有权跟踪。移除最新拥有者时，恢复剩余拥有者，或先前的局部模式或当前继承模式，以及先前的内联 color-scheme 声明和其优先级。移除较早拥有者时保留较新拥有者生效。可区分的外部模式或内联 color-scheme 变化会被保留；外部接管模式时，过期拥有者退出所有权管理。

用于局部模式边界；主题令牌仍是调色板和尺度值的可复用来源。

外部写入相同值时，无法将其与样式自身的值区分。清理保留共享的文档亮度样式表，并对新获得所有权的 shadow 上下文使用现有拆卸机制；这不会在所有亮度上下文之间建立完全隔离。

## `theme.light`

<a id="entry-theme-light"></a>

浅色模式

强制局部浅色 color-scheme 上下文。

为宿主和兼容后代节点应用浅色 luminosity、color-scheme 和 color-profile 调整。

浅色和深色样式共享局部所有权跟踪。移除最新拥有者时，恢复剩余拥有者，或先前的局部模式或当前继承模式，以及先前的内联 color-scheme 声明和其优先级。移除较早拥有者时保留较新拥有者生效。可区分的外部模式或内联 color-scheme 变化会被保留；外部接管模式时，过期拥有者退出所有权管理。

外部写入相同值时，无法将其与样式自身的值区分。清理保留共享的文档亮度样式表，并对新获得所有权的 shadow 上下文使用现有拆卸机制；这不会在所有亮度上下文之间建立完全隔离。
