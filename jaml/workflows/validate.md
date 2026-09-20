# Validate

Use `validate_jaml` as the static baseline when available. Omit `fileName` for unknown playground formats; use an explicit JAML extension only when the input format is known.

Inspect:

- Element types, inheritance, parameters, control keys, argument forms and render contracts.
- Bindings, instance state, updates, localization, lifecycle and event ownership.
- Native capability fit, justified adapters and reusable extensions.
- Application role/token consumption, scoped CSS, shared style registration and business-color handling.
- Theme definitions only when that domain is part of the task.

For every diagnostic, distinguish a real error from a demonstrated analyzer limitation using the owning source or runtime. A static pass cannot establish accessibility, geometry, lifecycle correctness or suitability of the chosen abstractions.

Report findings with severity, location, evidence and a concrete correction. Static analysis/review can run without a browser. For authorized live work, follow [runtime operations](runtime.md) and exercise the actual scenario, including relevant state preservation and theme changes.

Done: real issues and evidence-backed exceptions are accounted for; capability-selection and theme-convention concerns are reviewed alongside syntax. A validation-only request reports findings without editing.
