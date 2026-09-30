# Refactor routing

Inspect the existing implementation, project instructions and observed behavior before proposing replacements. Identify which contracts are intended to change and which state, lifecycle and public behavior must be preserved.

-   [Project refactor](refactor-project.md): application composition and consumption of framework/theme capabilities.
-   [Theme refactor](refactor-theme.md): definitions of tokens, swatches, variants, recipes or theme stylesheet behavior.

Use both when a change crosses them. Establish the target theme contract before migrating its consumers, and verify their combined behavior. Do not turn an app-local request into an unrelated shared-theme redesign.

Repository context is independent: in Jam-UI itself, use existing source ownership and tests. General framework refactors inspect callers and preserve public contracts; use the project/theme branch only when its domain applies.

For substantial refactor reports, including dry runs, include an **Upstream candidates** section using the [shared assessment](upstream-candidates.md). Distinguish a reusable gap from an existing capability the project has overlooked.

Use [Building a JAML UI](../references/building-ui.md) to check the target scenario and ownership decisions while preserving the existing app's good behavior; it is not a mandate to rebuild from a template.

A review-only request returns a migration proposal. Authorized refactoring includes implementation and scoped verification.
