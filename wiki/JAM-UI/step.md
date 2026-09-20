# step

**Class:** `ShaddockStep` · **Type:** `"step"` · **Extends:** `AbstractInputElement`

A step/stepper indicator that renders a sequence of labeled steps with arrow separators between them. Useful for progress wizards, pipeline views, and multi-step process flows.

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

| Param | Type | Default | Description |
|---|---|---|---|
| `data` | `string[]` | — | Array of step label strings rendered in order with arrow separators. |
| `value` | `any` | — | Current active step index or value. |

---

## Slots

| Slot | Description |
|---|---|
| `step` (default) | Custom step content. When populated, overrides the auto-generated step display. |

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

### Reactive step with value binding and navigation

```javascript jaml-playground
export default {
  type: 'container',
  vars: { currentStep: 1 },
  components: [
    {
      type: 'step',
      cap: 'Document Workflow',
      data: ['Draft', 'Review', 'Published'],
      value: '{{currentStep}}'
    },
    {
      type: 'wrapper',
      styles: ['wrapper.buttonwrapper'],
      components: [
        {
          type: 'button',
          cap: 'Previous',
          onclick: function() {
            if (this.model.vars.currentStep > 0)
              this.model.vars.currentStep--
          }
        },
        {
          type: 'button-cta',
          cap: 'Next',
          onclick: function() {
            if (this.model.vars.currentStep < 2)
              this.model.vars.currentStep++
          }
        }
      ]
    }
  ]
}
```

### Custom step content via slot

```json jaml-playground
{
  "type": "step",
  "cap": "Checkout Process",
  "data": ["Cart", "Shipping", "Payment", "Confirmation"],
  "components": [
    {
      "type": "wrapper",
      "slot": "step",
      "styles": ["wrapper.buttonwrapper"],
      "components": [
        { "type": "badge", "cap": "Cart", "color": "blue" },
        { "type": "badge", "cap": "Payment", "color": "green" }
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

- The `step` element is in early development. The arrow separator and label text are generated from the `data` array in `initedCallback`.
- For advanced step indicators, consider injecting a custom template via the `step` slot, or building the stepper using `wrapper` + `badge` components.
- The value can be used to track the current step position, enabling conditional display or navigation logic.
