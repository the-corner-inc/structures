// @vitest-environment jsdom

import { GitgraphCore } from "@gitgraph/core";
import { describe, expect, it } from "vite-plus/test";

import type { BranchFlow } from "../lib/branches.ts";
import { buildBranchGraph, DEFAULT_COMMITS_PER_BRANCH } from "./branch-graph.tsx";

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

function buildGitgraph(flow: BranchFlow) {
  const core = new GitgraphCore({});
  buildBranchGraph(core.getUserApi(), flow);
  return core;
}

describe("buildBranchGraph", () => {
  it("creates a commit for every branch commit plus every merge edge", () => {
    const core = buildGitgraph(gitflow);
    const { commits } = core.getRenderedData();
    expect(commits.length).toBe(
      gitflow.branches.length * DEFAULT_COMMITS_PER_BRANCH + gitflow.edges.length,
    );
  });

  it("renders a branch path for every branch", () => {
    const core = buildGitgraph(gitflow);
    const { branchesPaths } = core.getRenderedData();
    expect(branchesPaths.size).toBe(gitflow.branches.length);
  });

  it("keeps all model branch ids as distinct branch names", () => {
    const core = buildGitgraph(gitflow);
    // `clear()` seeds an invisible empty default branch, so assert presence
    // rather than an exact count.
    for (const branch of gitflow.branches) {
      expect(core.branches.has(branch.label)).toBe(true);
    }
  });

  it("is idempotent — re-running clears and rebuilds the same history", () => {
    const core = buildGitgraph(gitflow);
    const before = core.getRenderedData().commits.length;
    // Re-run as React StrictMode would.
    buildBranchGraph(core.getUserApi(), gitflow);
    const after = core.getRenderedData().commits.length;
    expect(after).toBe(before);
    for (const branch of gitflow.branches) {
      expect(core.branches.has(branch.label)).toBe(true);
    }
  });

  it("handles the simplest trunk-based flow (a single branch)", () => {
    const simple: BranchFlow = {
      libraryName: "Trunk-Based",
      branches: [{ id: "main", label: "main", kind: "trunk" }],
      edges: [],
    };
    const core = buildGitgraph(simple);
    const { commits } = core.getRenderedData();
    expect(commits.length).toBe(DEFAULT_COMMITS_PER_BRANCH);
  });
});
