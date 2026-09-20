# Compose / Build

For a new app or substantial capability, follow [Design](design.md) first. For a small change, inspect the local design and perform only the relevant capability comparison.

1. Read the selected element's detail page and inheritance. Reuse existing controls and public style/plugin behavior when their contracts fit.
2. Wire state with documented binders and lifecycle; consult [Binders](../references/JAML/binder.md) and [Components](../references/JAML/component.md) for builder/CC/usage contracts. Consult [parameter suffixes](../references/JAML/jaml-format.md#param-suffixes--keysuffix) before adding a processor. Keep data, caller props and instance-owned state distinct.
3. Apply the selected roles, theme tokens and registered business colors. Use token-aware `css(...)` with appropriately scoped style parameters for simple declarations. Register shared recipes and lifecycle-owned extensions rather than maintaining parallel implementations of existing behavior.
4. Integrate external surfaces through a bounded adapter when needed. Preserve keyboard, accessibility, safe text rendering and cleanup requirements; verify native alternatives before declaring a gap.
5. Prefer a bare JSON JAML object for simple declarative output; use JavaScript builders when composition requires them and prefer `export default`. Use `jaml()` or `jam.render()` for deliberate runtime mounting, following the Utilities container contract.
6. For galleries, retain complete legible examples. Keep small data inline, load large/shared datasets through documented data contracts, and extract real repetition without hiding every example behind a generic registry.
7. Follow [Validate](validate.md). Correct real errors; retain valid code when a diagnostic is an evidenced analyzer limitation.

Done: requested behavior is implemented, selected capabilities and extensions have clear ownership, application theme conventions are applied, and verification results distinguish static from live evidence. Reusable additions have a concise contract and an example or meaningful test.
