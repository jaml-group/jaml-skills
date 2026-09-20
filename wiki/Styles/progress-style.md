# progress

`Styles.progress.*` -- progress bar elements for loading indicators, task completion, and status tracking.

---

## Variants

### `progress.tube`
Displays the progress bar with a tube/track style, where the filled portion sits inside a rounded track container.

```json jaml-playground
[
    {
        "type": "progress",
        "cap": "Loading",
        "value": 65,
        "styles": ["progress.tube"]
    }
]
```

### `progress.bar`
Displays the progress as a flat horizontal bar style without a surrounding track.

```json jaml-playground
[
    {
        "type": "progress",
        "cap": "Downloading",
        "value": 42,
        "styles": ["progress.bar"]
    }
]
```
