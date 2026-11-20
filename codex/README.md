# JAML for Codex

Render interactive JAML views directly in Codex. This plugin packages the existing JAML authoring skill and adds a presenter for Codex desktop chats with Visualize.

## Build a local marketplace

Use Node.js 22 or later and `unzip`. Download the publisher’s [JAML 2.0.0-beta.1 VSIX](https://open-vsx.org/api/jaml-group/vscode-jaml/2.0.0-beta.1/file/jaml-group.vscode-jaml-2.0.0-beta.1.vsix). The build verifies the VSIX checksum, extracts its browser asset and original MIT notice, disables theme-pack discovery for the sandbox, and substitutes licensed equivalents for specific embedded icons. The package and each rendered view include the [third-party notices](THIRD-PARTY-NOTICES.txt) for the browser bundle. The 1 MB visualization limit includes the compressed runtime and the view.

```sh
node scripts/build-codex-plugin.mjs --vsix /absolute/jaml-group.vscode-jaml-2.0.0-beta.1.vsix --out /absolute/jaml-marketplace
codex plugin marketplace add /absolute/jaml-marketplace
codex plugin add jaml-codex@jaml-group
```

In a new Codex desktop chat, invoke **JAML for Codex** and **Visualize**. Ask for an interactive JAML view. Confirm it renders in the reply and its controls respond.

The presenter uses complete-definition JAML modules with this runtime. See the packaged reply workflow for authoring guidance.
