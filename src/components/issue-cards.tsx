import { SiGithub } from "@icons-pack/react-simple-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircleIcon,
  CircleDotIcon,
  ExternalLinkIcon,
  MessageSquareIcon,
  TagsIcon,
} from "lucide-react";
import { useState, useSyncExternalStore } from "react";

import { StructureMarkdown } from "#/components/structures/structure-markdown.tsx";
import { defaultSource, fetchMarkdown } from "#/lib/structures.ts";

interface IssueLabel {
  name: string;
  color?: string;
  bgColor?: string;
}

interface IssueCardData {
  number: number;
  title: string;
  open: boolean;
  author: string;
  openedDaysAgo: number;
  comments: number;
  labels: IssueLabel[];
  kanban?: string;
}

const LABEL_BY = (name: string, color: string, bgColor: string): IssueLabel => ({
  name,
  color,
  bgColor,
});

// Every label shown on an issue card maps to an entry in the software "labels"
// structure whose Markdown explains what the label means.
// Most labels reuse their own entry; a few reuse a sibling or the kanban readme.
const LABEL_DOC: Record<string, string> = {
  // Status labels read the matching kanban-status readme (there is no s::-prefixed
  // readme for these), while s::On hold keeps its own s::on hold readme.
  "s::In Review": "In Review",
  "s::In Progress": "In Progress",
  "s::To Do": "To Do",
  "s::Done": "Done",
  // The type taxonomy documents t::Documentation, so t::Docs reuses it.
  "t::Docs": "t::Documentation",
};

function labelElementId(name: string): string {
  return LABEL_DOC[name] ?? name;
}

const sampleIssues: IssueCardData[] = [
  {
    number: 142,
    title: "feat: support custom markdown docs per element",
    open: true,
    author: "marta",
    openedDaysAgo: 2,
    comments: 6,
    labels: [
      LABEL_BY("P1", "#bd561d", "#bb800926"),
      LABEL_BY("t::Feat", "#a97c3b", "#2f2920"),
      LABEL_BY("s::In Review", "#bd561d", "#db6d281a"),
    ],
    kanban: "In Review",
  },
  {
    number: 141,
    title: "fix(auth): refresh session before token expires",
    open: true,
    author: "leo",
    openedDaysAgo: 4,
    comments: 12,
    labels: [
      LABEL_BY("P0", "#da3633", "#f851491a"),
      LABEL_BY("t::Bug", "#c28088", "#321a20"),
      LABEL_BY("s::In Progress", "#238636", "#2ea04326"),
    ],
    kanban: "In Progress",
  },
  {
    number: 140,
    title: "docs: document conventional-commit titles",
    open: true,
    author: "marta",
    openedDaysAgo: 5,
    comments: 2,
    labels: [
      LABEL_BY("P2", "#c99540", "#bb800926"),
      LABEL_BY("t::Docs", "#3199e4", "#388bfd1a"),
      LABEL_BY("s::To Do", "#1f6feb", "#388bfd1a"),
    ],
    kanban: "To Do",
  },
  {
    number: 139,
    title: "perf: precompute structure hashes",
    open: true,
    author: "isma",
    openedDaysAgo: 8,
    comments: 0,
    labels: [
      LABEL_BY("P2", "#c99540", "#bb800926"),
      LABEL_BY("t::Perf", "#c87e64", "#31221e"),
      LABEL_BY("s::To Do", "#1f6feb", "#388bfd1a"),
    ],
    kanban: "To Do",
  },
  {
    number: 138,
    title: "refactor(explorer): extract sidebar props",
    open: true,
    author: "leo",
    openedDaysAgo: 9,
    comments: 3,
    labels: [
      LABEL_BY("P1", "#bd561d", "#bb800926"),
      LABEL_BY("t::Refactor", "#facc03", "#37341c"),
      LABEL_BY("s::In Review", "#bd561d", "#db6d281a"),
    ],
    kanban: "In Review",
  },
  {
    number: 137,
    title: "style: align card spacing on narrow screens",
    open: false,
    author: "isma",
    openedDaysAgo: 14,
    comments: 1,
    labels: [
      LABEL_BY("P4", "#9198a1", "#656c7633"),
      LABEL_BY("t::Style", "#e3a7fa", "#29133b"),
      LABEL_BY("s::Done", "#8957e5", "#ab7df826"),
    ],
    kanban: "Done",
  },
  {
    number: 136,
    title: "ci: cache pnpm store between jobs",
    open: true,
    author: "marta",
    openedDaysAgo: 15,
    comments: 4,
    labels: [
      LABEL_BY("P3", "#3fb950", "#2ea04326"),
      LABEL_BY("t::CI", "#0969da", "#388bfd1a"),
      LABEL_BY("s::On hold", "#9198a1", "#656c7633"),
    ],
    kanban: "Backlog",
  },
  {
    number: 135,
    title: "chore: update license headers",
    open: false,
    author: "leo",
    openedDaysAgo: 21,
    comments: 0,
    labels: [
      LABEL_BY("P4", "#9198a1", "#656c7633"),
      LABEL_BY("t::Chore", "#bd561d", "#db6d281a"),
      LABEL_BY("s::Done", "#8957e5", "#ab7df826"),
    ],
    kanban: "Done",
  },
];

export function IssueCards() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const [customSource, setCustomSource] = useState("");
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const source = defaultSource("issues");

  const descriptionQuery = useQuery({
    queryKey: ["issue-label-markdown", source, hoveredLabel],
    queryFn: ({ signal }) => fetchMarkdown(source, labelElementId(hoveredLabel!), signal),
    enabled: hydrated && Boolean(hoveredLabel),
  });

  const applyCustomSource = () => {
    const source = customSource.trim();
    if (!source) return;
    navigate({ to: "/issues/$library", params: { library: "software" }, search: { source } });
  };

  return (
    <div className="board-layout issue-board-layout">
      <aside className="board-sidebar" aria-label="Issue label descriptions">
        <header className="board-sidebar-header">
          <div className="board-heading">
            <TagsIcon aria-hidden="true" />
            <div>
              <h1>Label logic</h1>
              <p>Hover a label to read what it means</p>
            </div>
          </div>
        </header>
        <div className="board-doc-scroll" aria-live="polite">
          {!hoveredLabel && <div className="sidebar-message">Hover a label to read its logic.</div>}
          {hoveredLabel && descriptionQuery.isPending && <DocSkeleton />}
          {hoveredLabel && descriptionQuery.isError && (
            <div className="sidebar-message">
              <strong>No description found</strong>
              <span>{descriptionQuery.error.message}</span>
              <button type="button" onClick={() => descriptionQuery.refetch()}>
                Try again
              </button>
            </div>
          )}
          {hoveredLabel && descriptionQuery.data && (
            <StructureMarkdown className="board-doc">{descriptionQuery.data}</StructureMarkdown>
          )}
        </div>
      </aside>

      <main className="board-main issue-board-main">
        <section className="issue-cards-page">
          <header className="issue-cards-header">
            <div>
              <p className="eyebrow">Conventional commit naming</p>
              <h1>Issues</h1>
              <p>
                Example issues whose titles follow{" "}
                <Link to="/naming" className="inline-link">
                  the conventional-commit standard
                </Link>
                , tagged with priority, type and status labels. Hover any label to read its logic in
                the sidebar.
              </p>
            </div>
            <Link to="/naming" className="naming-cta">
              Read the naming standard <ExternalLinkIcon aria-hidden="true" />
            </Link>
          </header>

          <details className="gist-card load-card" open={false}>
            <summary>
              <div>
                <h2>Load your structure</h2>
                <p>Paste a public raw JSON URL to open it in the explorer.</p>
              </div>
              <a
                href="https://gist.github.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Create a GitHub Gist"
              >
                <SiGithub />
              </a>
            </summary>
            <div className="source-control large">
              <input
                type="url"
                value={customSource}
                placeholder="https://gist.githubusercontent.com/…/settings.json"
                onChange={(event) => setCustomSource(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && applyCustomSource()}
              />
              <button type="button" onClick={applyCustomSource} disabled={!customSource.trim()}>
                Load <ExternalLinkIcon />
              </button>
            </div>
          </details>

          <div className="issue-card-list">
            {sampleIssues.map((issue) => (
              <IssueCard
                key={issue.number}
                issue={issue}
                activeLabel={hoveredLabel}
                onHoverLabel={setHoveredLabel}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function IssueCard({
  issue,
  activeLabel,
  onHoverLabel,
}: {
  issue: IssueCardData;
  activeLabel: string | null;
  onHoverLabel: (label: string | null) => void;
}) {
  const StatusIcon = issue.open ? CircleDotIcon : CheckCircleIcon;
  const statusColor = issue.open ? "var(--file)" : "var(--accent)";
  return (
    <article className="issue-card">
      <span className="issue-card-state" style={issue.open ? undefined : { color: statusColor }}>
        <StatusIcon aria-hidden="true" />
      </span>

      <div className="issue-card-main">
        <div className="issue-card-title-row">
          <Link
            to="/issues/$library/$element"
            params={{ library: "software", element: "to do" }}
            className="issue-card-title"
          >
            {issue.title}
          </Link>
        </div>

        <div className="issue-card-labels">
          {issue.labels.map((label) => (
            <button
              key={label.name}
              type="button"
              className="issue-label"
              data-active={label.name === activeLabel || undefined}
              onPointerEnter={() => onHoverLabel(label.name)}
              onFocus={() => onHoverLabel(label.name)}
              onPointerLeave={() => onHoverLabel(null)}
              onBlur={() => onHoverLabel(null)}
              style={{
                color: label.color,
                backgroundColor: label.bgColor,
                borderColor: label.color,
              }}
            >
              {label.name}
            </button>
          ))}
        </div>

        <div className="issue-card-meta">
          <span className="issue-card-kanban">{issue.kanban}</span>
          <span>
            #{issue.number} opened {formatDays(issue.openedDaysAgo)} by {issue.author}
          </span>
          {issue.comments > 0 && (
            <span className="issue-card-comments">
              <MessageSquareIcon aria-hidden="true" />
              {issue.comments}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function formatDays(days: number) {
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

function DocSkeleton() {
  return (
    <div className="tree-skeleton" aria-label="Loading description">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} style={{ width: `${72 + ((index * 13) % 24)}%` }} />
      ))}
    </div>
  );
}

function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

function noopSubscribe() {
  return () => {};
}
