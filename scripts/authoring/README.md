# Native authoring build input

This directory contains the verified publisher export used to generate complete style and plugin guides. It is a maintainer dependency and is not included in the installed `jaml` skill.

Import a current trusted framework export with `node scripts/import-catalog.mjs <export-directory>`, then run `npm run catalog:generate`. Use `--frozen` only after the producer freezes that exact artifact. Consumers read the generated Markdown through the style/plugin indexes. Preserve the publisher's license and notice when updating the export.
