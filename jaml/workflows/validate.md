# Validate

Review the requested outcome and composition on every validation. Tool-call validation is optional: choose `validate_jaml` or the installed [thin launcher](../scripts/validate.mjs) when syntax, element or argument contracts, or bindings need a mechanical check.

For JAMLL checks, pass raw records with `format: "jamll"` or a `.jamll` filename, without Markdown fences. Use neutral inference only for unknown JSON or module formats. Read [validation usage and limits](../references/validation.md) for structured results and repeat checks. Correct mechanical diagnostics, then retrieve only a specific unresolved contract. Follow a static pass with the review below.

## Inspect

-   **Contracts:** element types, inheritance, parameters, control keys, argument forms and render contracts.
-   **Composition:** run the [composition review pass](../references/JAML/purpose-and-composition.md#review-the-reasoning-as-well-as-the-syntax). Compare the implementation with the design's candidates, owners, parts and remaining custom work, tracing shared helpers to the definitions they return. Check duplicated native parts and [overloaded hosts](../references/JAML/purpose-and-composition.md#choose-the-owner-before-the-slot). Assess responsibilities over wrapper counts, and exercise independent instances or additional consumers when reuse is claimed.
-   **Interaction and presentation:** walk the [actual path](../references/JAML/purpose-and-composition.md#choose-interaction-and-presentation) from trigger through completion and return, including pointer travel, repeated prompts, blocking, anchor visibility, keyboard access and narrow viewports. Verify pending, failure and retry, cancel and owner replacement.
-   **Helper lifetime:** check [construction and lifetime](../references/utils.md#dialog-and-popup-ownership): definition, Model and built element, callback receiver, return value, dismissal timing and settlement. Exercise [asynchronous transitions](../references/JAML/purpose-and-composition.md#own-asynchronous-operations): duplicate activation, failure then retry, departure before settlement, replacement on the same anchor and concurrent backend changes. For Undo, verify eligibility begins after acknowledgement and ends at the actual deadline.
-   **Builder overrides:** check [final overrides](../references/JAML/component.md#final-jaml-overrides): argument position and customization target, generated children retained before additions, initialization and cleanup still running alongside caller hooks, and composition done through the override. Exercise placement when adding children or slots.
-   **State:** bindings, instance state, updates, localization, lifecycle and event ownership.
-   **Custom properties:** prefer [automatic `props` bridges](../references/JAML/jaml-format.md#props) over build hooks that only attach data or descriptors. Check member collisions, post-`onafterbuild` timing and the difference between fresh reads and reactive notifications.
-   **Capability selection:** check [intent-first selection](../references/building-ui.md#choose-elements-by-user-intent): the actual operation and coordinated controls, compared native owners and any claimed gap. Verify the promised selection, keyboard and focus, and navigation or panel behavior directly. Keep justified adapters and reusable extensions.
-   **Theme and style:** application role and token consumption, business-color handling and [style ownership](../references/Styles/styles.md#style-ownership-and-composition), including declaration placement, theme versus app ownership, native status colors, shared recipes, justified adapters and pixel contracts, and state and breakpoint cascade. For refactors, reconcile the reported inventory with the files and parity evidence.
-   **Theme definitions:** only when that domain is part of the task.

## Exercise behavior

-   **Interaction plugins and presentation variants:** run the promised user sequence. A hover action needs target entry, popup reveal, action invocation and dismissal. Check where actions appear in each requested variant and keep deliberate keyboard and touch access.
-   **Demos:** use representative content and confirm visible action names match their effects. Keep adversarial strings and assertion-only actions in identified regression scenarios.
-   **Forms:** inspect the actual native input, select or textarea, and exercise keyboard and pointer behavior, confirming the backing control is disabled and named. Use canonical rule keys `minLength` and `maxLength`, and test typed-input constraints and programmatically assigned values separately.
-   **Visuals:** inspect screenshots at the intended viewport and theme, since clipped canvas text needs visual evidence.

Sort each diagnostic into a real error or a demonstrated analyzer limitation using the owning source or runtime. Accessibility, geometry, lifecycle and fit of the chosen abstractions need their own evidence.

Report findings with severity, location, evidence and a concrete correction. Static analysis and review can run without a browser. For authorized live work, follow [runtime operations](runtime.md) and exercise the actual scenario, including relevant state preservation and theme changes.

Done: real issues and evidence-backed exceptions are accounted for, and capability selection and theme conventions are reviewed alongside syntax. A validation-only request reports findings without editing.
