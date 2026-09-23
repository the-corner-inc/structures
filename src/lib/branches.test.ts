import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vite-plus/test";

import { parseBranchFlow, type BranchFlow } from "./branches.ts";

describe("parseBranchFlow", () => {
  const gitflow: BranchFlow = {
    libraryName: "Git Flow",
    branches: [
      { id: "main", label: "main", kind: "trunk", protected: true },
      { id: "develop", label: "develop", kind: "integration", protected: true },
      { id: "feature", label: "feature/*", kind: "feature" },
      { id: "hotfix", label: "hotfix/*", kind: "fix" },
      { id: "release", label: "release/*", kind: "release" },
    ],
    edges: [
      { from: "develop", to: "main" },
      { from: "feature", to: "develop" },
      { from: "hotfix", to: "develop" },
      { from: "hotfix", to: "main" },
      { from: "release", to: "main" },
    ],
  };

  it("accepts a valid flow and returns it unchanged", () => {
    expect(parseBranchFlow(gitflow)).toEqual(gitflow);
  });

  it("defaults the label to the id when omitted", () => {
    const parsed = parseBranchFlow({
      libraryName: "GitHub Flow",
      branches: [{ id: "main", kind: "trunk" }],
      edges: [],
    });
    expect(parsed.branches[0].label).toBe("main");
  });

  it("accepts a missing edges array as an empty graph", () => {
    const parsed = parseBranchFlow({
      libraryName: "Trunk-Based",
      branches: [{ id: "main", kind: "trunk" }],
    });
    expect(parsed.edges).toEqual([]);
  });

  it("accepts optional color and description strings", () => {
    const parsed = parseBranchFlow({
      libraryName: "Custom",
      branches: [
        { id: "main", kind: "trunk", color: "#da3633", description: "Production history." },
      ],
      edges: [],
    });
    expect(parsed.branches[0]).toMatchObject({
      color: "#da3633",
      description: "Production history.",
    });
  });

  it("rejects a missing or empty libraryName", () => {
    expect(() => parseBranchFlow({ branches: [], edges: [] })).toThrow(/libraryName/);
    expect(() => parseBranchFlow({ libraryName: "   ", branches: [], edges: [] })).toThrow(
      /libraryName/,
    );
  });

  it("rejects a non-array branches value", () => {
    expect(() => parseBranchFlow({ libraryName: "X", branches: "main" })).toThrow(/branches/);
  });

  it("rejects a non-array edges value", () => {
    expect(() =>
      parseBranchFlow({ libraryName: "X", branches: [], edges: "main->develop" }),
    ).toThrow(/edges/);
  });

  it("rejects a branch without a valid URL-safe id", () => {
    expect(() =>
      parseBranchFlow({ libraryName: "X", branches: [{ id: "feature/main", kind: "feature" }] }),
    ).toThrow(/URL-safe id/);
    expect(() =>
      parseBranchFlow({ libraryName: "X", branches: [{ id: "..", kind: "feature" }] }),
    ).toThrow(/URL-safe id/);
    expect(() =>
      parseBranchFlow({ libraryName: "X", branches: [{ id: " ", kind: "feature" }] }),
    ).toThrow(/URL-safe id/);
  });

  it("rejects an unknown branch kind", () => {
    expect(() =>
      parseBranchFlow({ libraryName: "X", branches: [{ id: "main", kind: "trunky" }] }),
    ).toThrow(/Invalid branch kind/);
  });

  it("rejects duplicate branch ids case-insensitively", () => {
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [
          { id: "main", kind: "trunk" },
          { id: "MAIN", kind: "integration" },
        ],
      }),
    ).toThrow(/Duplicate branch id/);
  });

  it("rejects invalid optional fields", () => {
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [{ id: "main", kind: "trunk", color: 5 as unknown as string }],
      }),
    ).toThrow(/Invalid color/);
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [{ id: "main", kind: "trunk", protected: "yes" as unknown as boolean }],
      }),
    ).toThrow(/Invalid protected/);
  });

  it("rejects edges referencing unknown branches", () => {
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [{ id: "main", kind: "trunk" }],
        edges: [{ from: "main", to: "develop" }],
      }),
    ).toThrow(/unknown branch: develop/);
  });

  it("rejects self-loop edges", () => {
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [{ id: "main", kind: "trunk" }],
        edges: [{ from: "main", to: "main" }],
      }),
    ).toThrow(/at itself/);
  });

  it("rejects duplicate edges", () => {
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [
          { id: "main", kind: "trunk" },
          { id: "develop", kind: "integration" },
        ],
        edges: [
          { from: "develop", to: "main" },
          { from: "DEVELOP", to: "main" },
        ],
      }),
    ).toThrow(/Duplicate edge/);
  });

  it("rejects an edge without string from/to ids", () => {
    expect(() =>
      parseBranchFlow({
        libraryName: "X",
        branches: [
          { id: "main", kind: "trunk" },
          { id: "develop", kind: "integration" },
        ],
        edges: [{ from: "develop", to: "" }],
      }),
    ).toThrow(/non-empty/);
  });
});

describe("built-in branch flow presets", () => {
  it.each([
    "git-flow",
    "github-flow",
    "gitlab-flow",
    "trunk-based",
    "trunk-based-release",
  ] as const)("validates the %s preset", async (flow) => {
    const settings = JSON.parse(
      await readFile(new URL(`../../public/assets/${flow}/settings.json`, import.meta.url), "utf8"),
    );
    expect(() => parseBranchFlow(settings)).not.toThrow();
  });
});
