import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

import { registrySchema } from "shadcn/schema";

const registry = registrySchema.parse(JSON.parse(await readFile("registry.json", "utf8")));
assert.equal(registry.items.length, 1);
const item = registry.items[0];
assert.equal(item.name, "structure-explorer");
assert.equal(item.type, "registry:block");
const files = new Set(item.files.map((file) => file.path));
const dependencies = new Set(item.dependencies.map((name) => name.replace(/@[^@]+$/, "")));
for (const file of item.files) {
  assert(file.target.startsWith("@components/structures/"), `Unscoped target: ${file.target}`);
  const content = await readFile(file.path, "utf8");
  if (/\.tsx?$/.test(file.path)) {
    for (const [, specifier] of content.matchAll(/(?:from\s+|import\s*\(?\s*)["']([^"']+)["']/g)) {
      if (specifier.startsWith(".")) {
        const resolved = new URL(
          specifier,
          new URL(file.path, `file://${process.cwd()}/`),
        ).pathname.slice(process.cwd().length + 1);
        assert(
          [resolved, `${resolved}.ts`, `${resolved}.tsx`].some((path) => files.has(path)),
          `Undeclared source import: ${specifier}`,
        );
      } else
        assert(
          specifier === "react" || dependencies.has(specifier),
          `Undeclared dependency: ${specifier}`,
        );
    }
  }
}
assert(files.has("src/components/structures/LICENSE"));
execFileSync("node_modules/.bin/shadcn", ["build", "--output", ".registry-build"], {
  stdio: "inherit",
});
const built = JSON.parse(await readFile(".registry-build/structure-explorer.json", "utf8"));
assert.equal(built.files.length, item.files.length);
assert(built.files.every((file) => typeof file.content === "string" && file.content.length));
console.log(
  `Validated ${item.name}: ${built.files.length} files, ${dependencies.size} runtime dependencies.`,
);
