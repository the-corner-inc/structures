"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon, ExternalLinkIcon, GitBranchIcon } from "lucide-react";
import { useState } from "react";

import { BranchGraph } from "#/components/branch-graph.tsx";
import { BRANCH_FLOWS, branchSource, fetchBranchFlow, type BranchNode } from "#/lib/branches.ts";

export function BranchFlowPage({ sourceOverride }: { sourceOverride?: string }) {
  const navigate = useNavigate();
  const source = sourceOverride;
  const [hoveredBranch, setHoveredBranch] = useState<BranchNode | null>(null);

  const flowQuery = useQuery({
    queryKey: ["branch-flow", source],
    queryFn: ({ signal }) => fetchBranchFlow(source!, signal),
    enabled: Boolean(source),
  });

  const openPreset = (dir: string) => {
    navigate({ to: "/branches", search: { source: branchSource(dir) } });
  };

  const loadCustomSource = (value: string) => {
    const next = value.trim();
    if (!next) return;
    navigate({ to: "/branches", search: { source: next } });
  };

  // No flow selected: show the preset chooser.
  if (!source) {
    return <BranchFlowChooser onSelect={openPreset} onSource={loadCustomSource} />;
  }

  const flow = flowQuery.data;
  const branch = hoveredBranch && flow?.branches.includes(hoveredBranch) ? hoveredBranch : null;

  return (
    <div className="board-layout branch-page">
      <aside className="board-sidebar" aria-label="Branch description">
        <header className="board-sidebar-header">
          <div className="board-heading">
            <GitBranchIcon aria-hidden="true" />
            <div>
              <h1>{flow?.libraryName ?? "Branch flow"}</h1>
              <p>Branching strategy</p>
            </div>
          </div>
          {flow && (
            <button
              type="button"
              className="branch-change"
              onClick={() => navigate({ to: "/branches", search: {} })}
            >
              Change strategy
            </button>
          )}
        </header>
        <div className="board-doc-scroll" aria-live="polite">
          {flowQuery.isPending && <div className="sidebar-message">Loading strategy…</div>}
          {flowQuery.isError && (
            <div className="sidebar-message error-message">
              <strong>Could not load strategy</strong>
              <span>{flowQuery.error.message}</span>
              <button type="button" onClick={() => flowQuery.refetch()}>
                Try again
              </button>
            </div>
          )}
          {branch && (
            <article className="board-doc">
              <h2>{branch.label || branch.id}</h2>
              <p>
                {branch.description || "No description provided for this branch in this strategy."}
              </p>
            </article>
          )}
          {flow && !branch && (
            <article className="board-doc">
              <h2>About this strategy</h2>
              <p>{flow.description || "No description provided for this strategy."}</p>
              <p>Hover or focus a branch to read its description.</p>
            </article>
          )}
        </div>
      </aside>

      <main className="branch-main">
        {flowQuery.isPending && <div className="sidebar-message">Loading strategy…</div>}
        {flowQuery.isError && (
          <div className="sidebar-message error-message">
            <strong>Could not load strategy</strong>
            <span>{flowQuery.error.message}</span>
            <button type="button" onClick={() => flowQuery.refetch()}>
              Try again
            </button>
          </div>
        )}
        {flow && (
          <div className="branch-diagram">
            <BranchGraph flow={flow} onHover={setHoveredBranch} />
          </div>
        )}
      </main>
    </div>
  );
}

function BranchFlowChooser({
  onSelect,
  onSource,
}: {
  onSelect: (dir: string) => void;
  onSource: (source: string) => void;
}) {
  const [customSource, setCustomSource] = useState("");
  return (
    <section className="library-chooser topics-page">
      <div className="chooser-intro">
        <p className="eyebrow">Branching standards</p>
        <h1>Explore a branching strategy</h1>
        <p>
          Open an opinionated branching model or load a strategy from a raw JSON URL. Hover any
          branch in the diagram to read what it is for.
        </p>
      </div>

      <div className="gist-card">
        <div className="gist-card-heading">
          <div>
            <h2>Load your strategy</h2>
            <p>Paste a public raw JSON URL.</p>
          </div>
          <a
            href="https://gist.github.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Create a GitHub Gist"
          >
            <SiGithub />
          </a>
        </div>
        <div className="source-control large">
          <input
            type="url"
            value={customSource}
            placeholder="https://gist.githubusercontent.com/…/settings.json"
            onChange={(event) => setCustomSource(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onSource(customSource)}
          />
          <button
            type="button"
            onClick={() => onSource(customSource)}
            disabled={!customSource.trim()}
          >
            Load <ExternalLinkIcon />
          </button>
        </div>
      </div>

      <div className="choice-divider">
        <span>or pick a strategy</span>
      </div>

      <div className="framework-grid">
        <section className="framework-group">
          <h2>Strategies</h2>
          <div>
            {BRANCH_FLOWS.map((flow) => (
              <button type="button" key={flow.dir} onClick={() => onSelect(flow.dir)}>
                <span>{flow.name}</span>
                <ChevronRightIcon />
              </button>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
