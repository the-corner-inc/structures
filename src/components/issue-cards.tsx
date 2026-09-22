import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link, useNavigate } from "@tanstack/react-router";
import { CheckCircleIcon, CircleDotIcon, ExternalLinkIcon, MessageSquareIcon } from "lucide-react";
import { useState } from "react";

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
  const [customSource, setCustomSource] = useState("");

  const applyCustomSource = () => {
    const source = customSource.trim();
    if (!source) return;
    navigate({ to: "/issues/$library", params: { library: "software" }, search: { source } });
  };

  return (
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
            , tagged with priority, type and status labels.
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
          <IssueCard key={issue.number} issue={issue} />
        ))}
      </div>
    </section>
  );
}

function IssueCard({ issue }: { issue: IssueCardData }) {
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
            <span
              key={label.name}
              className="issue-label"
              style={{
                color: label.color,
                backgroundColor: label.bgColor,
                borderColor: label.color,
              }}
            >
              {label.name}
            </span>
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
