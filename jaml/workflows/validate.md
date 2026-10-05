# Validate

Use `validate_jaml` as the static baseline when available. Omit `fileName` for unknown playground formats; use an explicit JAML extension only when the input format is known.

Inspect:

- Element types, inheritance, parameters, control keys, argument forms and render contracts.
- Bindings, instance state, updates, localization, lifecycle and event ownership.
- Custom-property plumbing: prefer [automatic `props` bridges](../references/JAML/jaml-format.md#props) over build hooks that only attach data/descriptors; check member collisions, post-`onafterbuild` timing, and the distinction between fresh reads and reactive notifications.
- [Intent-first capability selection](../references/building-ui.md#choose-elements-by-user-intent): infer the actual operation and coordinated controls, compare native owners and verify any claimed gap. Check the promised selection, keyboard/focus and navigation/panel contract; visual grouping, syntax or an ARIA role alone is insufficient. Retain justified adapters and reusable extensions.
- Application role/token consumption and business-color handling; [style ownership and composition](../references/Styles/styles.md#style-ownership-and-composition), including actual declaration placement, theme versus app ownership, native semantic status colors, shared recipes, reusable composition, justified adapters/pixel contracts and state/breakpoint cascade. For refactors, reconcile the reported inventory with the files and parity evidence; tokenized global selectors alone do not prove ownership was corrected.
- Theme definitions only when that domain is part of the task.

For forms, inspect the actual native input/select/textarea and exercise keyboard and pointer behavior. Host `disabled` or ARIA attributes alone do not prove that the backing control is disabled or named. Use canonical rule keys `minLength` and `maxLength`; separately test typed-input constraints and programmatically assigned values. Inspect screenshots at the intended viewport and theme: DOM overflow checks can miss clipped canvas text.

For every diagnostic, distinguish a real error from a demonstrated analyzer limitation using the owning source or runtime. A static pass cannot establish accessibility, geometry, lifecycle correctness or suitability of the chosen abstractions.

Report findings with severity, location, evidence and a concrete correction. Static analysis/review can run without a browser. For authorized live work, follow [runtime operations](runtime.md) and exercise the actual scenario, including relevant state preservation and theme changes.

Done: real issues and evidence-backed exceptions are accounted for; capability-selection and theme-convention concerns are reviewed alongside syntax. A validation-only request reports findings without editing.
