# Project refactor

1. Establish the current behavior and an explicit preservation set: data/state, selection, focus, keyboard operation, routes, persistence, updates and cleanup as applicable.
2. Inventory substantial custom interactions, CSS recipes, duplicated state/listeners, translation and rendering code. Compare them with relevant existing elements, styles/plugins, bindings and localization. Read candidate contracts; do not replace a custom solution solely to improve a reuse percentage.
3. Map existing theme consumption to roles, active tokens and supported variants. Registered business colors retain domain meaning. Keep theme-definition changes in the separate Theme refactor workflow.
4. Design a scoped migration. Reuse fitting native capabilities, retain justified adapters, and extract shared builders/CCs/styles/plugins/usages/suffixes when their contracts remove real repetition. Existing directories can satisfy the extension convention.
5. Implement in behaviorally checkable increments. Preserve state/DOM identity where the preservation set requires it; replacing a widget must account for focus, event ownership and teardown.
6. Validate against the baseline and [Validate](validate.md). Treat scanner matches as review candidates, not proof of invalidity; source-supported exceptions remain valid.

Done: the intended improvements are visible, preservation checks pass, duplicated responsibilities are resolved, and retained exceptions name their concrete requirement. Report changed ownership and any remaining gap.
