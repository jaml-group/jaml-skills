# switch

`Styles.switch.*` — toggle switch elements for binary on/off states.

---

## Variants

### `switch.darkmode`
Dark mode toggle switch variant. Hides the label slot and uses a moon/sun icon indicator appropriate for theme switching.

```json jaml-playground
[
    {
        "type": "switch",
        "cap": "Dark Mode",
        "styles": ["switch.darkmode"]
    }
]
```

### `switch.invert`
Inverts the switch — the toggle track color is reversed so the "on" state appears visually as the default side. Use for agreement/terms checkboxes where the checked state should be the expected default.

```json jaml-playground
[
    {
        "type": "switch",
        "cap": "I agree to the Terms of Service",
        "defaultValue": false,
        "styles": ["switch.invert"]
    }
]
```
