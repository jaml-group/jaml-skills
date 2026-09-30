# on

<!-- Generated from native authoring; do not edit. -->

[English](on.md)

## `on.dark`

<a id="entry-on-dark"></a>

深色背景上

为现有深色表面上的内容调整前景角色。

添加 jam-on-dark，通过对应的文字组合更新文字颜色变量，并选择默认前景。

周围表面已存在时使用；需要改变局部配色模式时使用主题模式样式。

这是文字上下文特征，不绘制表面，也不切换主题模式。

## `on.light`

<a id="entry-on-light"></a>

浅色背景上

为现有浅色表面上的内容调整前景角色。

添加 jam-on-light，通过对应的文字组合更新文字颜色变量，并选择默认前景。

周围表面已存在时使用；需要改变局部配色模式时使用主题模式样式。

这是文字上下文特征，不绘制表面，也不切换主题模式。

## `on.accent`

<a id="entry-on-accent"></a>

主题强调色

应用完整路径指定的 primary 前景色、强调色表面或强调色背景下的文本样式。

color.primary 设置 primary 前景色变量和 colored 类；with.accent 添加 accent-background 类，在受支持的宿主上提供表面及匹配的前景色；on.accent 应用强调色背景下的文本变量。

前景色强调使用 color.primary；填充控件或表面使用 with.accent；内容位于已有强调色表面上时使用 on.accent。

这些路径共享元数据，但不能互换，也不重新定义主题变量。
