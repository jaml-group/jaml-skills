# subRouter

<!-- Generated from native authoring; do not edit. -->

[English](subRouter.md)

## `subRouter`

<a id="entry-subrouter"></a>

嵌套元素路由

在最近的父级路由下安装子路由；找不到父级时使用全局路由。

使用 type 选择路由实现，将 routes 之外的其余构造参数转交给路由器，并在子路由上注册传入的路由规则。

关联父级并被动初始化子路由；移除时清理路由关联、销毁子路由并刷新父级路由监听。

参数转发至 `jam.AbstractRouter`；未声明字段的类型、默认值和补全尚不可用。空参数表不表示拒绝参数。
