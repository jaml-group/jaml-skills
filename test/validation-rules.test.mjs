import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

test("curated validation references and copyable examples retain canonical length keys", () => {
  for (const name of ["JAM-UI", "input", "popup"]) {
    const _page = readFileSync(
      new URL("../wiki/JAM-UI/" + name + ".md", import.meta.url),
      "utf8",
    );
    assert.doesNotMatch(_page, /["']?(?:minlength|maxlength)["']?\s*:/);
    assert.doesNotMatch(_page, /\|\s*`(?:minlength|maxlength)`\s*\|/);
    assert.match(_page, /minLength/);
  }
  const _reference = readFileSync(
    new URL("../wiki/JAM-UI/JAM-UI.md", import.meta.url),
    "utf8",
  );
  assert.match(_reference, /maxLength/);
});
