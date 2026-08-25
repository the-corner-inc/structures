import { describe, expect, it } from "vite-plus/test";

import {
  filterStructures,
  markdownDocumentUrl,
  settingsDocumentUrl,
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
