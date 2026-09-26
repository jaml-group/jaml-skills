## JAML application conventions

-   Use the installed `jaml` skill for JAML design, composition, refactoring, validation, explanation and debugging. For new dashboards, landing pages, forms or apps, read its Building a JAML UI guide and selected scenario before composition.
-   Follow semantic roles and theme tokens from design onward. Reuse existing elements, public styles/plugins, bindings, localization and lifecycle behavior where their contracts fit.
-   Apply the skill's style-ownership guidance: theme-worthy appearance uses the theme contract; local presentation stays with its component, shared recipes have named owners, and repeated composition uses the smallest fitting extension. Reuse native semantic feedback colors; justify domain palettes, adapters and retained pixel contracts.
-   Keep project refactoring and theme-definition refactoring explicitly scoped. Verify custom replacements against concrete requirements and preserve agreed behavior/state.
-   Follow this project's documented extension locations and registration entry point. Read the project design for capability ownership and validation scenarios.

<!-- During authorized setup, replace this comment with actual project-relative
design/reference links and extension locations. Merge with an existing JAML
section; preserve unrelated instructions. Framework/skills repositories use
their own source architecture instead of this application declaration. -->
