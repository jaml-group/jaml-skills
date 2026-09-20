# Refactor routing

Inspect the existing implementation, project instructions and observed behavior before proposing replacements. Identify which contracts are intended to change and which state, lifecycle and public behavior must be preserved.

- [Project refactor](refactor-project.md): application composition and consumption of framework/theme capabilities.
- [Theme refactor](refactor-theme.md): definitions of tokens, swatches, variants, recipes or theme stylesheet behavior.

Use both when a change crosses them. Establish the target theme contract before migrating its consumers, and verify their combined behavior. Do not turn an app-local request into an unrelated shared-theme redesign.

Repository context is independent: in Jam-UI itself, use existing source ownership and tests. General framework refactors inspect callers and preserve public contracts; use the project/theme branch only when its domain applies.

A review-only request returns a migration proposal. Authorized refactoring includes implementation and scoped verification.
