# Project refactor

1. Establish the current behavior and an explicit preservation set: data/state, selection, focus, keyboard operation, routes, persistence, updates and cleanup as applicable.
2. Infer each substantial interaction's [intent and behavioral contract](../references/building-ui.md#choose-elements-by-user-intent) from state, handlers and effects, including controls that act together. Inventory custom interactions, CSS recipes, duplicated state/listeners, translation and rendering code. Classify the CSS by [style ownership and composition](../references/Styles/styles.md#style-ownership-and-composition), including local rules hidden in shared files. Compare with existing elements, styles/plugins, bindings and localization; read their contracts. Counts identify candidates, not defects or a reuse target.
3. Map existing theme consumption to roles, active tokens and supported variants. Registered business colors retain domain meaning. Keep theme-definition changes in the separate Theme refactor workflow.
4. Design a scoped migration. Reuse fitting native capabilities, retain justified adapters, and extract shared builders/CCs/styles/plugins/usages/suffixes when their contracts remove real repetition. Existing directories can satisfy the extension convention.
5. Implement in behaviorally checkable increments. Preserve state/DOM identity where the preservation set requires it; replacing a widget must account for focus, event ownership and teardown.
6. Validate against the baseline and [Validate](validate.md). Treat scanner matches as review candidates, not proof of invalidity; source-supported exceptions remain valid.

For a refactor report or dry run, record the inferred intent, native candidate, covered contract, remaining gap and preservation checks for substantial custom interactions. Assess capability selection before deciding where their CSS belongs.

Include a **Style ownership inventory** for the inspected scope:

-   Existing CSS buckets and representative rules/files: local component presentation, theme-owned appearance, shared app recipes, repeated composition and bounded adapters. State any uninspected scope.
-   Proposed destination owner and files for each bucket, including native capabilities to reuse and CC/builder/usage candidates for repeated composition.
-   Rules and pixel values to retain, with their concrete contract/reason and responsible owner; identify theme-definition changes separately.
-   Parity checks for affected appearance and behavior: states, light/dark themes, responsive sizing, zoom, scroll/focus and any affected editor, startup or print integration. A dry run proposes these checks and does not claim they passed.

Done: the intended improvements are visible, preservation checks pass, duplicated responsibilities are resolved, and retained exceptions name their concrete requirement. Reconcile the ownership inventory with the implementation; token substitution alone does not complete structural style refactoring. Report any remaining gap.
