import { readFile } from "node:fs/promises";

import { describe, expect, it } from "vite-plus/test";

import { layoutBranchFlow } from "./branch-flow.tsx";
import { parseBranchFlow } from "#/lib/branches.ts";

const FLOWS = ["git-flow", "github-flow", "gitlab-flow", "trunk-based", "trunk-based-release"];

async function loadFlow(dir: string) {
  const settings = JSON.parse(
    await readFile(new URL(`../../public/assets/${dir}/settings.json`, import.meta.url), "utf8"),
  );
  return parseBranchFlow(settings);
}

describe("layoutBranchFlow", () => {
  it.each(FLOWS)("lays out every %s node on a level", async (dir) => {
    const flow = await loadFlow(dir);
    const layout = layoutBranchFlow(flow);
    expect(layout.nodes).toHaveLength(flow.branches.length);
    expect(layout.edges).toHaveLength(flow.edges.length);
    for (const node of layout.nodes) {
      expect(node.level).toBeGreaterThanOrEqual(0);
    }
  });

  it("places merge targets strictly below their sources in Git Flow", async () => {
    const flow = await loadFlow("git-flow");
    const layout = layoutBranchFlow(flow);
    const level = new Map(layout.nodes.map((node) => [node.node.id, node.level]));
    expect(level.get("main")).toBeGreaterThan(level.get("develop")!);
    expect(level.get("develop")).toBeGreaterThan(level.get("feature")!);
    expect(level.get("develop")).toBeGreaterThan(level.get("release")!);
    expect(level.get("main")).toBeGreaterThan(level.get("hotfix")!);
  });

  it("handles the bidirectional main/release edge in trunk-based-release without error", async () => {
    const flow = await loadFlow("trunk-based-release");
    expect(() => layoutBranchFlow(flow)).not.toThrow();
    const layout = layoutBranchFlow(flow);
    expect(layout.nodes).toHaveLength(flow.branches.length);
  });
});
