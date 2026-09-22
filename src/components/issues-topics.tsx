import { SiGithub } from "@icons-pack/react-simple-icons";
import { useNavigate } from "@tanstack/react-router";
import { ChevronRightIcon, ExternalLinkIcon, KanbanIcon, TagsIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

import { ISSUE_TOPICS, type IssueTopic } from "#/lib/structures.ts";

const TOPIC_ICONS: Record<IssueTopic["name"], LucideIcon> = {
  Labels: TagsIcon,
  Kanban: KanbanIcon,
};

export function IssuesTopics() {
  const navigate = useNavigate();
  const [customSource, setCustomSource] = useState("");

  const openTopic = (topic: IssueTopic) => {
    if (topic.board === "kanban") {
      navigate({ to: "/issues/kanban", search: {} });
    } else {
      navigate({ to: "/issues/labels", search: {} });
    }
  };

  const applyCustomSource = () => {
    const source = customSource.trim();
    if (!source) return;
    navigate({ to: "/issues/$library", params: { library: "software" }, search: { source } });
  };

  return (
    <section className="library-chooser issues-topics">
      <div className="chooser-intro">
        <p className="eyebrow">Issues</p>
        <h1>Explore an issue workflow</h1>
        <p>
          Pick a topic to browse the software issue-management structure, or load a JSON structure
          from a raw GitHub Gist.
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
        {ISSUE_TOPICS.map((topic) => {
          const Icon = TOPIC_ICONS[topic.name];
          return (
            <button
              type="button"
              className="topic-card"
              key={topic.name}
              onClick={() => openTopic(topic)}
            >
              <span className="topic-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="topic-name">{topic.name}</span>
              <p>{topic.description}</p>
              <ChevronRightIcon aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
}
