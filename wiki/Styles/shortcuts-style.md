# shortcuts

`Styles.shortcuts.*` -- keyboard shortcuts popup element.

No extended style variants. The shortcuts element is a popup-based button group triggered on hover.

```json jaml-playground
[
    {
        "type": "shortcuts",
        "components": [
            { "type": "button", "cap": "Ctrl+S", "onclick": "function() { /* save */ }" },
            { "type": "button", "cap": "Ctrl+Z", "onclick": "function() { /* undo */ }" }
        ]
    }
]
```
