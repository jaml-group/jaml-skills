# Design

Use this for a new app, substantial feature or migration. Creating or restyling a theme follows [Theme authoring](theme.md). Pages, builders, CCs and framework-provided UI all follow the composition section; application setup applies only to a new app.

## UI composition

1. **Define the experience and host.** Follow the shared path in [Building a JAML UI](../references/building-ui.md) with its dashboard, landing-page, form or application choices. Establish the user operations, state and data shape, responsive behavior, accessibility and lifecycle.
2. **Choose interaction and presentation.** For edits, confirmations and supporting views, select the trigger, location, attention demand and return path through [interaction and presentation choice](../references/JAML/purpose-and-composition.md#choose-interaction-and-presentation).
3. **Choose owners.** Follow the [composition order](../references/JAML/purpose-and-composition.md#decide-what-the-object-means) and [intent-first selection](../references/building-ui.md#choose-elements-by-user-intent). Read candidate pages and inheritance, and confirm keyboard, accessibility and state-preservation guarantees in their contracts. Map each need to a native element, public style or plugin, or a specific extension gap. Read the [chooser](../references/choosing-native-capabilities.md) topic when a choice stays open.
4. **Review the reasoning.** Run the [composition review pass](../references/JAML/purpose-and-composition.md#review-the-reasoning-as-well-as-the-syntax) before drawing the tree.
5. **Plan roles and theme.** For an application, read [roles](../references/Theme/stylize.md) and [token consumption](../references/Theme/tokens.md#consuming-tokens) before designing its surfaces.
6. **Choose sinks for streamed or external data.** Read the [literal-text boundary](../references/index.md#trust-and-application-data), [Markdown policy and execution ownership](../references/Plugins/markdown.md#content-policy-and-playground-ownership) and [owned subscription and follow-scroll contracts](../references/utils.md#owned-external-subscriptions-and-follow-scrolling), then choose the sink and lifecycle owner before composing the view.

Record a compact design with:

-   Business purposes, the chosen interaction and presentation with its rationale, the complete native operation candidates considered, selected owners and parts, and the specific gap that justifies custom work. Carry async, keyboard and host-lifecycle requirements alongside a candidate that covers part of the operation.
-   Structural regions and semantic roles; theme and token consumption and business-color strategy.
-   Data, reactivity, localization, navigation and cleanup ownership. For asynchronous operations, specify [pending, retry, departure and concurrency transitions](../references/JAML/purpose-and-composition.md#own-asynchronous-operations), including any backend prerequisite.
-   Reused capabilities, proposed extensions and the requirements each extension satisfies.
-   Intended module locations, registration timing and verification scenarios for the chosen parts and interactions in each requested presentation. Carry these choices into implementation and review, and revise the design when an evidenced gap changes an owner.

## Application setup

During authorized new-app setup, merge a concise JAML section into the project's applicable `AGENTS.md` using [the template](../assets/project-agents.md). Preserve unrelated rules, update an existing JAML section in place, and use project-relative links. Use a nested file's scope when the instructions belong there. This declaration is a setup output, and the skill works without it.

Use existing project directories when equivalent responsibilities already exist. A new app can use:

| Directory   | Responsibility                                        |
| ----------- | ----------------------------------------------------- |
| `views/`    | Pages and application composition                     |
| `builders/` | Functions returning JAML definitions                  |
| `ccs/`      | Registered reusable components and their contracts    |
| `styles/`   | Registered presentation/interaction recipes           |
| `plugins/`  | Attached behavior with per-instance state and cleanup |
| `usages/`   | Reusable component/action presets                     |
| `suffixes/` | Parameter processors                                  |
| `colors/`   | Named business-color registration                     |
| `theme/`    | Theme customization when required                     |
| `adapters/` | External integrations behind an explicit contract     |
| `utils/`    | Focused helpers without concealed widget ownership    |

Declare the convention in the design and create directories as their implementations are needed. Use an explicit registration entry point that runs after runtime readiness and before rendering consumers.

## Theme design

Read [Theme](../references/Theme/theme.md), then its selected authoring, token, stylesheet and recipe references. Establish semantic token responsibilities, supported variants, mode and swatch behavior, density and component consumers. A theme may define new documented recipes; an application verifies that the active theme provides a recipe before consuming it. Keep the framework role vocabulary unless the task explicitly changes that contract.

## Framework context

For Jam-UI source work, identify the owning implementation, public contract and verification seam in the existing package architecture, and use existing fixture and test locations. Builders, CCs and demos follow UI composition above. The app scaffold and generated app declaration belong to applications.

## Done

For substantial designs, include an **Upstream candidates** section using the [shared assessment](upstream-candidates.md).

The design resolves capability ownership, theme consumption and authoring scope, extension gaps, lifecycle and verification. A design-only request returns this design without creating app source or instructions. An authorized build with clear scope continues directly into [Compose](compose.md).
