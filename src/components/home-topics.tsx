import { SiGithub } from "@icons-pack/react-simple-icons";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronRightIcon,
  CircleDotIcon,
  ExternalLinkIcon,
  FolderTreeIcon,
  GitBranchIcon,
  KanbanIcon,
  TagsIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

import { TOPICS, type Topic } from "#/lib/structures.ts";

const TOPIC_ICONS: Record<Topic["name"], LucideIcon> = {
  Folders: FolderTreeIcon,
  Labels: TagsIcon,
  Kanban: KanbanIcon,
  Issues: CircleDotIcon,
  Branches: GitBranchIcon,
};

export function HomeTopics() {
  const navigate = useNavigate();
  const [customSource, setCustomSource] = useState("");

  const applyCustomSource = () => {
    const source = customSource.trim();
    if (!source) return;
    navigate({ to: "/issues/$library", params: { library: "software" }, search: { source } });
  };

  return (
    <section className="library-chooser topics-page">
      <div className="chooser-intro">
        <p className="eyebrow">Community knowledge, made navigable</p>
        <h1>Project organization, explained</h1>
        <p>
          Browse opinionated standards for folders, issues, and boards — every entry documented in
          Markdown, or load your own structure from a raw GitHub Gist.
        </p>
      </div>

      <div className="gist-card">
        <div className="gist-card-heading">
          <div>
            <h2>Load your structure</h2>
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
            onKeyDown={(event) => event.key === "Enter" && applyCustomSource()}
          />
          <button type="button" onClick={applyCustomSource} disabled={!customSource.trim()}>
            Load <ExternalLinkIcon />
          </button>
        </div>
      </div>

      <div className="choice-divider">
        <span>or pick a topic</span>
      </div>

      <div className="topic-grid">
        {TOPICS.map((topic) => {
          const Icon = TOPIC_ICONS[topic.name];
          return "to" in topic ? (
            <Link key={topic.name} to={topic.to} className="topic-card">
              <span className="topic-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="topic-name">{topic.name}</span>
              <p>{topic.description}</p>
              <ChevronRightIcon aria-hidden="true" />
            </Link>
          ) : (
            <button key={topic.name} type="button" className="topic-card" disabled>
              <span className="topic-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="topic-name">{topic.name}</span>
              <p>{topic.description}</p>
              <small>Coming soon</small>
            </button>
          );
        })}
      </div>
    </section>
  );
}
