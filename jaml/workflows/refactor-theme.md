# Theme refactor

Read the Theme index and the owning token, stylesheet and authoring pages. Distinguish authored `ref`, registered `sys`/`cmpt`, runtime token projection, role selectors and chart recipes.

1. Establish affected themes, component consumers and expected visual changes. Inventory supported token/variant contracts and current mode/swatch behavior.
2. Define the target semantic contract. Preserve existing names/meaning where possible; explicitly plan consumer migration for renamed or removed tokens/recipes.
3. Refactor definitions at their owner. Use complete required runtime token trees; verify fallback behavior. Keep project-specific details in app extensions and durable theme recipes in the theme.
4. Preserve selector boundaries: refinement belongs to the documented JavaScript dictionaries; compiled CSS/SCSS uses literal runtime selectors and explicit CSS variables. Roles do not automatically supply every layout or popup behavior.
5. Migrate affected consumers through Project refactor when necessary. Follow current source for chart recipe cooking and runtime color adaptation.
6. Validate representative components across light/dark modes and supported swatch/density changes. Check stale values, registration, selector matching and geometry; separate static checks from authorized runtime execution.

Done: semantic ownership and supported contracts are explicit, affected consumers are accounted for, and theme changes have source-backed/static evidence plus the runtime evidence actually obtained.
