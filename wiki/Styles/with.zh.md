# with

<!-- Generated from native authoring; do not edit. -->

[English](with.md)

## `with.tint`

<a id="entry-with-tint"></a>

色调

为受支持的宿主应用主题的浅染表面效果。

添加 jam-bg-tint；样式表提供配套的表面和前景，并适配兼容的按钮或标签状态。

背景特征规则作用于带有 jam 或 slot 属性的宿主。

需要前景和背景协调时，使用此配套表面效果；仅需填充时，使用背景预设。

这些样式仅作用于局部。可复用的配色和尺寸体系由主题变量管理；应用预设不会重新定义主题。

## `with.accent`

<a id="entry-with-accent"></a>

主题强调色

应用完整路径指定的 primary 前景色、强调色表面或强调色背景下的文本样式。

color.primary 设置 primary 前景色变量和 colored 类；with.accent 添加 accent-background 类，在受支持的宿主上提供表面及匹配的前景色；on.accent 应用强调色背景下的文本变量。

前景色强调使用 color.primary；填充控件或表面使用 with.accent；内容位于已有强调色表面上时使用 on.accent。

这些路径共享元数据，但不能互换，也不重新定义主题变量。

## `with.elevation`

<a id="entry-with-elevation"></a>

抬升

为受支持的宿主应用主题的抬升表面效果。

添加 jam-bg-elevated；样式表提供配套的表面和前景，并适配兼容的按钮或标签状态。

背景特征规则作用于带有 jam 或 slot 属性的宿主。

需要前景和背景协调时，使用此配套表面效果；仅需填充时，使用背景预设。

这些样式仅作用于局部。可复用的配色和尺寸体系由主题变量管理；应用预设不会重新定义主题。
