import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function releaseNotes(changelog, tag) {
  assert(/^v\d+\.\d+\.\d+$/.test(tag), "Expected a stable version tag such as v1.3.1");
  const heading = `## [${tag.slice(1)}]`;
  const section = changelog.split(/(?=^## \[)/m).find((entry) => entry.startsWith(heading));
  assert(section, `Missing CHANGELOG.md section for ${tag}`);
  return `${section.trim()}\n`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.stdout.write(releaseNotes(readFileSync("CHANGELOG.md", "utf8"), process.argv[2]));
}
