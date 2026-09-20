# sync

`Styles.sync` listens to framework `resize` events on its host and calls a callback with resolved target and source elements. Use it when one element needs to copy a computed dimension from another; prefer normal flex/grid layout when that already expresses the relationship.

## Arguments

| Arg | Type | Description | Notes |
|---|---|---|---|
| `source` | `string` | Element to read | CSS selector or `self`, `parent`, `root` |
| `target` | `string` | Element to update | CSS selector or `self`, `parent`, `root` |
| `parent` | `string` | Selector lookup scope | Default `self`; also `parent` or `root` |
| `callback` | `function \| string` | Receives `(target, source)` with the styled host as `this` | JavaScript is clearest for custom copying |

Both source and target must resolve. The callback runs before the next repaint after the host's resize notification; this is not an independent observer of every possible source mutation.

```javascript jaml-playground
export default {
  type: 'wrapper',
  components: [
    { type: 'label', id: 'sync-source', cap: 'Width source', style: 'width:12rem' },
    {
      type: 'label',
      cap: 'Mirrored width',
      styles: [Styles.sync({
        source: '#sync-source',
        target: 'self',
        parent: 'parent',
        callback(target, source) {
          target.style.width = getComputedStyle(source).width;
        }
      })]
    }
  ]
};
```

To mirror height, copy `getComputedStyle(source).height` into `target.style.height` in the same callback.

## Convenience variants

`sync.size` declares width/height switches, and `sync.width` / `sync.height` are preconfigured style instances. In this compatibility baseline, use the explicit callback above when synchronizing dimensions between configured selectors; the convenience forms do not provide that behavior. Do not call `sync.width(...)` or `sync.height(...)` as parameterized factories.
