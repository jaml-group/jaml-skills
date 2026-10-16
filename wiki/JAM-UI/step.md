# step

**Class:** `ShaddockStep` · **Type:** `"step"` · **Extends:** `AbstractInputElement`

A static sequence of labeled steps with arrow separators. Use it to describe a process or pipeline. It does not highlight an active step or control wizard navigation.

---

## JAML usage

```json jaml-playground
{
    "type": "step",
    "cap": "Approval Flow",
    "data": ["Start", "Review", "Approve", "Complete"]
}
```

---

## Params

Inherits all params from [AbstractInputElement](./JAM-UI.md#section-2--abstractinputelement).

| Param   | Type       | Default | Description                                                                                                                  |
| ------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `data`  | `string[]` | —       | Required array of step label strings, rendered once during initialization. Use `[]` when supplying only custom slot content. |
| `value` | `any`      | —       | Inherited stored value; changing it does not change the generated step display.                                              |

---

## Slots

| Slot             | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `step` (default) | Additional custom content. Generated `data` labels are also appended; use `data: []` to omit them. |

---

## Examples

### Basic step sequence

```json jaml-playground
{
    "type": "step",
    "cap": "Deployment Pipeline",
    "data": ["Build", "Test", "Stage", "Deploy"]
}
```

### Track progress separately from the static sequence

```javascript jaml-playground
export default {
    type: 'container',
    vars: { currentStep: 1 },
    components: [
        {
            type: 'step',
            cap: 'Document Workflow',
            data: ['Draft', 'Review', 'Published']
        },
        { type: 'indicator', cap: 'Current step', value: '{{currentStep + 1}}', unit: '/ 3' },
        {
            type: 'wrapper',
            styles: ['wrapper.buttonwrapper'],
            components: [
                {
                    type: 'button',
                    cap: 'Previous',
                    onclick: function () {
                        if (this.model.vars.currentStep > 0) {
                            this.model.vars.currentStep--;
                        }
                    }
                },
                {
                    type: 'button-cta',
                    cap: 'Next',
                    onclick: function () {
                        if (this.model.vars.currentStep < 2) {
                            this.model.vars.currentStep++;
                        }
                    }
                }
            ]
        }
    ]
};
```

### Custom step content via slot

```json jaml-playground
{
    "type": "step",
    "cap": "Checkout Process",
    "data": [],
    "components": [
        {
            "type": "wrapper",
            "slot": "step",
            "styles": ["wrapper.buttonwrapper"],
            "components": [
                { "type": "badge", "cap": "Cart", "color": "hsl(240 100% 50%)" },
                { "type": "badge", "cap": "Payment", "color": "hsl(120 100% 25%)" }
            ]
        }
    ]
}
```

### Styled with custom color

```json jaml-playground
{
    "type": "step",
    "cap": "Onboarding",
    "color": "var(--jam-accent-color)",
    "data": ["Register", "Verify", "Profile", "Complete"]
}
```

---

## Notes

-   The labels are generated once from the initial `data` array. Later assignments to `data` or `value` do not rebuild or select the generated steps.
-   For a custom display, use the `step` slot with `data: []`, or compose `wrapper` and `badge` components with explicit state bindings.
-   Keep navigation state in the owning model and bind it to a separate status display, as in the example above.
