# common.hide / show

<!-- Generated from native authoring; do not edit. -->

[English](hide.md)

`Styles.hide` and `Styles.show` — visibility toggling.

---

## Variants

### `hide`

<a id="entry-hide"></a>

隐藏

隐藏由完整样式路径选中的 DOM 目标。

为解析得到的宿主或插槽目标添加 jam-hide。

通过宿主或插槽路径控制 DOM 可见性；ECharts 的 hide 辅助函数具有独立的图表选项契约。

此样式仅隐藏显示，不会销毁组件或移除数据。

Hides an element using CSS visibility or display. No args.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Hidden on mobile',
        styles: ['hide']
    }
];
```

### `show`

<a id="entry-show"></a>

显示

从选中的 DOM 目标上移除框架隐藏类。

移除 jam-hide，同时保留之前的类成员状态以便样式拆除。

其他样式表、属性、祖先或图表选项仍隐藏内容时，此样式不强制其可见。

Reverses a hide style to make the element visible again. No args.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Always visible',
        styles: ['show']
    }
];
```
