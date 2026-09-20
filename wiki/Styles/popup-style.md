# popup

`Styles.popup.*` -- popup overlay elements for tooltips, context menus, and floating panels.

No extended style variants. Shared layout and positioning styles are used. Popups are typically created imperatively via `papaya.show()` or `element.popup()`.

```json jaml-playground
[
    {
        "type": "popup",
        "styles": ["css(background:var(--jam-ac-color);color:white;padding:0.5rem 1rem)"],
        "components": [
            { "type": "label", "cap": "Hello!" }
        ]
    }
]
```
