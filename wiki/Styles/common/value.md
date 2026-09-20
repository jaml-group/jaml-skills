# common.value

`Styles.value.*` — value-slot roles and value-related behavior for input elements.

---

## Variants

### `value.asAttr`

Syncs the element's value to its `value` HTML attribute on every `valuechange` event via `setAttribute('value', ...)`.

```json jaml-playground
[
    {
        "type": "input",
        "cap": "Synced to attr",
        "styles": ["value.asAttr"]
    }
]
```

### Value role presets

These paths add a semantic class to the host. Native and theme styles consume the class as a complete optical recipe for the value and its unit, so the exact size, weight, line height, opacity, and color context can vary by theme.

| Path | Class | Role |
|---|---|---|
| `value.major` | `jam-value-major` | Largest, most prominent value |
| `value.main` | `jam-value-main` | Primary value |
| `value.sub` | `jam-value-sub` | Supporting value |
| `value.minor` | `jam-value-minor` | Least prominent value |

All four paths accept the same optional argument:

| Arg | Type | Description | Notes |
|---|---|---|---|
| `opacity` | `number` | Value opacity for the selected role | Optional; native CSS falls back to `1` |

The argument writes `--jam-value-major-opacity`, `--jam-value-main-opacity`, `--jam-value-sub-opacity`, or `--jam-value-minor-opacity` for the selected path.

```json jaml-playground
[
    {
        "type": "indicator-number",
        "cap": "Output",
        "value": 86.4,
        "unit": "MW",
        "styles": ["value.major"]
    }
]
```
