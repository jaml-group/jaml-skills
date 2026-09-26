# layer.follower

`Styles.layer.follower.*` — cursor-following decorative layer elements. Uses `MelonMove` for smooth trailing motion. Each variant adds a `<div class="outer"><div class="inner"></div></div>` to the layer slot.

---

## Common args

All follower variants share these base args:

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.follower.spotlight`.

---

## Variants

### `follower.spotlight`

A spotlight/glow effect that follows the cursor inside the host.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.follower.spotlight`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Spotlight",
        "styles": ["layer.follower.spotlight(follow:true;size:30)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `follower.edge`

A glowing edge/rim effect that follows the cursor. The inner element fills a percentage of the host.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.follower.edge`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Golden Edge",
        "styles": ["layer.follower.edge(follow:true)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```

### `follower.shadow`

A cursor-reactive shadow that shifts opposite to the cursor direction.

Arguments, defaults and options: [generated catalog](../../API/index.md#find-any-exported-path). Catalog lookup: `style layer.follower.shadow`.

```json jaml-playground
[
    {
        "type": "wrapper",
        "cap": "Shadow",
        "styles": ["layer.follower.shadow(follow:true)", "css(position:relative;width:10rem;height:10rem)"]
    }
]
```
