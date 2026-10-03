import assert from "node:assert/strict";
import { test } from "node:test";

import { releaseNotes } from "./release-notes.mjs";

test("selects only the exact version and preserves Markdown and links", () => {
  const changelog = `# Changelog

## [1.3.10](https://example.com/newer) (2026-10-03)

Newer release.

## [1.3.1](https://example.com/current) (2026-10-02)

### Bug Fixes

- A [linked fix](https://example.com/fix).

## [1.3.0](https://example.com/older) (2026-10-01)

Older release.
`;
  assert.equal(
    releaseNotes(changelog, "v1.3.1"),
    "## [1.3.1](https://example.com/current) (2026-10-02)\n\n### Bug Fixes\n\n- A [linked fix](https://example.com/fix).\n",
  );
  assert.throws(() => releaseNotes(changelog, "v1.4.0"), /Missing CHANGELOG/);
  assert.throws(() => releaseNotes(changelog, "main"), /Expected a stable version tag/);
});
