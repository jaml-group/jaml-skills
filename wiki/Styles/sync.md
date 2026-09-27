# sync

`Styles.sync` listens to framework `resize` events on its host and calls a callback with resolved target and source elements. Use it when one element needs to copy a computed dimension from another; prefer normal flex/grid layout when that already expresses the relationship.

## Arguments

Arguments, defaults and options: [generated catalog](../API/index.md#find-any-exported-path). Catalog lookup: `style sync`.

The callback receives `(target, source)`, with the styled host as `this`.

JavaScript is clearest for a custom copying callback.

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

`sync.size` resolves configured selectors and copies computed width and/or height on the host’s resize trigger. It owns the copied inline sizing and restores its contribution on removal; queued updates from the removed application no longer run. Its built-in size callback replaces the `callback` argument. Use `sync` for custom synchronization; writes made by that callback remain caller-owned.

```json jaml-playground
{
  "type": "wrapper",
  "components": [
    { "type": "label", "id": "size-source", "cap": "Width source", "styles": ["css(width:12rem)"] },
    {
      "type": "label",
      "cap": "Mirrored width",
      "styles": ["sync.size(source:#size-source;target:self;parent:parent;height:false)"]
    }
  ]
}
```

`sync.width` and `sync.height` remain prebuilt style instances with captured values and unset source/target selectors. Use `sync.size` to select elements; do not call these presets as parameterized factories.
