# common.hide / show

<!-- Generated from native authoring; do not edit. -->

[中文](hide.zh.md)

`Styles.hide` and `Styles.show` — visibility toggling.

---

## Variants

### `hide`

<a id="entry-hide"></a>

Hide

Hide the DOM target selected by the full style path.

Adds jam-hide to the resolved host or slot target.

Use the host or slot path for DOM visibility; ECharts hide helpers have separate chart-option contracts.

This is presentation hiding, not component destruction or data removal.

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

Show

Remove the framework hide class from the selected DOM target.

Removes jam-hide while preserving prior class membership for style teardown.

This does not force visibility when another stylesheet, attribute, ancestor, or chart option still hides the content.

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
