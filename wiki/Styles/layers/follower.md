# layer.follower

`Styles.layer.follower.*` provides decorative layers with optional pointer following. Enable `follow: true` for pointer tracking; read the generated profile for behavior and limitations. Compare [selection, hover and host decoration](../../choosing-native-capabilities.md#selection-and-hover) before choosing this family.

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
