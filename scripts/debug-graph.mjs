import { GitgraphCore, TemplateName, templateExtend, MergeStyle } from "../packages/gitgraph-core/lib/index.js";

const COLORS = ["#0969da", "#1a7f37", "#8250df", "#cf222e", "#bf8700", "#57606a"];

const flow = {
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

function commitStyleFor(id) {
  const color = flow.branches.find((b) => b.id === id)?.color;
  if (!color) return {};
  return { color, dot: { color } };
}

const core = new GitgraphCore({
  template: templateExtend(TemplateName.Metro, { colors: COLORS }),
});
let counter = 0;
const gitgraph = core.getUserApi();

const firstTrunkId = "main";
const byId = new Map(flow.branches.map((n) => [n.id, n]));
const outgoing = {};
for (const e of flow.edges) {
  outgoing[e.from] = outgoing[e.from] || [];
  outgoing[e.from].push(e.to);
}
function baseOf(id) {
  const kind = byId.get(id).kind;
  if (kind === "trunk") return id === firstTrunkId ? null : firstTrunkId;
  if (kind === "integration") return firstTrunkId;
  const t = outgoing[id];
  if (t && t.length > 0) return t[0];
  return firstTrunkId;
}

const apis = new Map();
function createBranch(id) {
  const base = baseOf(id);
  const color = byId.get(id)?.color;
  const api = gitgraph.branch({
    name: byId.get(id).label,
    from: base ? apis.get(base) : undefined,
    style: { color, label: { bgColor: "fff", strokeColor: "000" } },
    commitDefaultOptions: {
      style: {
        ...(color ? { color, dot: { color } } : {}),
        message: { display: false },
      },
    },
  });
  apis.set(id, api);
  return api;
}

const created = new Set();
while (created.size < flow.branches.length) {
  let progressed = false;
  for (const node of flow.branches) {
    if (created.has(node.id)) continue;
    const base = baseOf(node.id);
    if (base && !created.has(base)) continue;
    createBranch(node.id);
    for (let i = 1; i <= 3; i++) {
      apis.get(node.id).commit({ subject: `${node.id} ${i}`, style: commitStyleFor(node.id) });
    }
    created.add(node.id);
    progressed = true;
  }
  if (!progressed) break;
}

for (const e of flow.edges) {
  const source = apis.get(e.from);
  const target = apis.get(e.to);
  if (source && target) target.merge(source);
}

const data = core.getRenderedData();
console.log("\n=== BRANCHES (computedColor) ===");
for (const [name, branch] of data.branchesPaths) {
  console.log(`  ${name.padEnd(12)} style.color=${branch.style.color} computedColor=${branch.computedColor}`);
}

console.log("\n=== COMMITS ===");
for (const c of data.commits) {
  const ps = c.parents.join(",");
  console.log(
    `${c.hash.padEnd(12)} style.color=${String(c.style.color).padEnd(14)} dot.color=${String(c.style.dot.color).padEnd(14)} branchToDisplay=${String(c.branchToDisplay).padEnd(14)} parents=[${ps}]`,
  );
}
