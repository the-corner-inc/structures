import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vite-plus/test";

import {
  filterStructures,
  markdownDocumentUrl,
  settingsDocumentUrl,
  type FolderSettings,
  type FolderStructure,
} from "./structures.ts";

const tree: FolderStructure[] = [
  {
    name: "src",
    type: "folder",
    children: [
      { name: "components", type: "folder" },
      { name: "main.ts", type: "file" },
    ],
  },
  { name: "README.md", type: "file" },
];

describe("structure URLs", () => {
  it("resolves local settings and encoded markdown documents", () => {
    expect(settingsDocumentUrl("/assets/angular")).toBe("/assets/angular/settings.json");
    expect(markdownDocumentUrl("/assets/software/", "In Progress")).toBe(
      "/assets/software/md/in%20progress.md",
    );
  });

  it("uses a remote JSON document without rewriting it", () => {
    const gist = "https://gist.githubusercontent.com/example/raw/settings.json";
    expect(settingsDocumentUrl(gist)).toBe(gist);
    expect(markdownDocumentUrl(gist, "README.md")).toBe(
      "https://gist.githubusercontent.com/example/raw/md/readme.md.md",
    );
  });
});

describe("filterStructures", () => {
  it("keeps matching ancestors and removes unrelated branches", () => {
    expect(filterStructures(tree, "components")).toEqual([
      {
        name: "src",
        type: "folder",
        children: [{ name: "components", type: "folder" }],
      },
    ]);
  });
});

describe("built-in Angular documentation", () => {
  it("provides an explanation for every tree entry", async () => {
    const assetDirectory = fileURLToPath(new URL("../../public/assets/angular/", import.meta.url));
    const settings = JSON.parse(
      await readFile(join(assetDirectory, "settings.json"), "utf8"),
    ) as FolderSettings;
    const documents = new Set(await readdir(join(assetDirectory, "md")));
    const missing = structureNames(settings.structures).filter(
      (name) => !documents.has(`${name.toLowerCase()}.md`),
    );

    expect(missing).toEqual([]);
  });
});

function structureNames(items: FolderStructure[]): string[] {
  return items.flatMap((item) => [
    item.name,
    ...(item.children ? structureNames(item.children) : []),
  ]);
}
