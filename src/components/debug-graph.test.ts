// @vitest-environment jsdom
import { GitgraphCore, TemplateName, templateExtend } from "@gitgraph/core";
import { expect, it } from "vite-plus/test";

import type { BranchFlow } from "../lib/branches.ts";
import { buildBranchGraph } from "./branch-graph.tsx";

const COLORS = ["#0969da", "#1a7f37", "#8250df", "#cf222e", "#bf8700", "#57606a"];

const flow: BranchFlow = {
  libraryName: "Git Flow",
  branches: [
    { id: "main", label: "main", kind: "trunk", color: "#3fb950" },
    { id: "develop", label: "develop", kind: "integration", color: "#0969da" },
    { id: "feature", label: "feature/*", kind: "feature", color: "#8957e5" },
    { id: "hotfix", label: "hotfix/*", kind: "fix", color: "#cf222e" },
    { id: "release", label: "release/*", kind: "release", color: "#db6d28" },
  ],
  edges: [
    { from: "develop", to: "main" },
    { from: "feature", to: "develop" },
    { from: "hotfix", to: "develop" },
    { from: "hotfix", to: "main" },
    { from: "release", to: "main" },
  ],
};

it("preserves configured branch and commit colors after merges", () => {
  const core = new GitgraphCore({
    template: templateExtend(TemplateName.Metro, { colors: COLORS }),
  });
  buildBranchGraph(core.getUserApi(), flow);
  const { branchesPaths, commits } = core.getRenderedData();
  expect(branchesPaths.size).toBe(flow.branches.length);
  for (const node of flow.branches) {
    const branch = [...branchesPaths.keys()].find((branch) => branch.name === node.label);
    expect(branch?.computedColor).toBe(node.color);
    const branchCommits = commits.filter((commit) => commit.branchToDisplay === node.label);
    expect(branchCommits.length).toBeGreaterThan(0);
    for (const commit of branchCommits) {
      expect(commit.style.color).toBe(node.color);
      expect(commit.style.dot.color).toBe(node.color);
    }
  }
});
