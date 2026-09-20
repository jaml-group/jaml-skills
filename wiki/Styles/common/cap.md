# common.cap

`Styles.cap.*` — caption-slot helpers and semantic caption roles.

---

## Variants

### `cap.*`

Common styles nested under `cap` target the element's `cap` slot. For example, `cap.color.strong` changes the caption foreground without changing the host element.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Styled caption",
        "styles": ["cap.color.strong"]
    }
]
```

### `cap.asAttr`

Mirrors the current caption to the host's `cap` HTML attribute whenever the `capslotchange` event fires.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Attribute caption",
        "styles": ["cap.asAttr"]
    }
]
```

### Caption role presets

These paths add a semantic class to the host. Native and theme styles consume the class as a complete caption recipe, so the exact size, weight, line height, opacity, and color context can vary by theme.

| Path | Class | Role |
|---|---|---|
| `cap.main` | `jam-cap-main` | Primary caption |
| `cap.sub` | `jam-cap-sub` | Supporting caption |

Both paths accept the same optional argument:

| Arg | Type | Description | Notes |
|---|---|---|---|
| `opacity` | `number` | Caption opacity for the selected role | Optional; native CSS falls back to `1` |

The argument writes `--jam-cap-main-opacity` or `--jam-cap-sub-opacity` for the selected path.

```json jaml-playground
[
    {
        "type": "card",
        "cap": "Primary caption",
        "styles": ["cap.main"]
    }
]
```
