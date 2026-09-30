# common.filter

<!-- Generated from native authoring; do not edit. -->

[English](filter.md)

`Styles.filter.*` — CSS filter property.

---

## Variants

### `filter`

<a id="entry-filter"></a>

滤镜

对目标或其后方背景应用视觉滤镜。

单独设置 filter 和 backdrop-filter。

背景滤镜需要目标后方有可见内容，且目标背景能让效果显现。

根据预期目标选择宿主、插槽内容或插槽包装元素的路径；插槽包装元素与分配给它的内容是不同的目标。

位置参数顺序: `filter` → `backdrop`.

| 参数 | 类型 | 契约 |
| --- | --- | --- |
| `filter` | `string` | 滤镜<br>支持简写<br>`{"cssKey":"filter"}` |
| `backdrop` | `string` | 背景滤镜<br>支持简写<br>`{"cssKey":"backdropFilter"}` |

Applies CSS filter and backdrop-filter effects. Accepts raw CSS filter function strings.

```javascript jaml-playground
export default [
    {
        type: 'label',
        cap: 'Blurred',
        styles: ['filter(filter:blur(2px) grayscale(0.5))']
    }
];
```
