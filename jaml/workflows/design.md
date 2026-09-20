# Design

Read the reference map and the owning pages for the capabilities under consideration. For an application, read roles and token consumption before designing its surfaces.

## Application design

Establish the important user operations, state/data shape, responsive behavior, accessibility and lifecycle expectations. Map each substantial capability to an existing native element, public style/plugin or a specific extension gap. Read candidate detail pages and inheritance before selecting a custom implementation. A documented control name alone does not establish keyboard, accessibility or state-preservation guarantees.

Record a compact design with:

- Structural regions and semantic roles; theme/token consumption and business-color strategy.
- Data, reactivity, localization, navigation and cleanup ownership.
- Reused capabilities, proposed extensions and the requirements each extension satisfies.
- Intended module locations, registration timing and verification scenarios.

During authorized new-app setup, merge a concise JAML section into the project's applicable `AGENTS.md` using [the template](../assets/project-agents.md). Preserve unrelated rules, update an existing JAML section instead of duplicating it, and use project-relative links. If instructions belong in an existing nested file, use that scope. This declaration is a setup output, not a prerequisite for using the skill.

Use existing project directories when equivalent responsibilities already exist. A new app can use:

| Directory | Responsibility |
|---|---|
| `views/` | Pages and application composition |
| `builders/` | Functions returning JAML definitions |
| `ccs/` | Registered reusable components and their contracts |
| `styles/` | Registered presentation/interaction recipes |
| `plugins/` | Attached behavior with per-instance state and cleanup |
| `usages/` | Reusable component/action presets |
| `suffixes/` | Parameter processors |
| `colors/` | Named business-color registration |
| `theme/` | Theme customization when required |
| `adapters/` | External integrations behind an explicit contract |
| `utils/` | Focused helpers without concealed widget ownership |

Declare the convention in the design; create directories as their implementations are needed. Use an explicit registration entry point after required runtime readiness and before rendering consumers. Avoid importing registration side effects before the runtime is available.

## Theme design

Read [Theme](../references/Theme/theme.md), then its selected authoring, token, stylesheet and recipe references. Establish semantic token responsibilities, supported variants, mode/swatch behavior, density and component consumers. A theme may define new documented recipes; an application must verify that the active theme provides a recipe before consuming it. Preserve the framework role vocabulary unless the task explicitly changes that framework contract.

## Framework context

For Jam-UI source work, identify the owning implementation, public contract and verification seam in the existing package architecture. Use existing fixture/test locations. The app scaffold and generated app declaration do not apply to framework maintenance. Demos still follow application-composition principles.

## Done

The design resolves capability ownership, theme consumption/authoring scope, extension gaps, lifecycle and verification. A design-only request returns this design without creating app source or instructions. An authorized build can continue directly into Compose; do not introduce an extra approval round when scope is already clear.
