import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CheckIcon,
  DownloadIcon,
  FileTextIcon,
} from "lucide-react";
import { useState } from "react";

import { PageTitle } from "#/components/page-title.tsx";
import { StructureMarkdown } from "#/components/structures/structure-markdown.tsx";
import { AGENTIC_ELEMENTS } from "#/lib/agentic.ts";

export function AgenticPage() {
  const [selected, setSelected] = useState(AGENTIC_ELEMENTS[0]);

  return (
    <main className="library-chooser topics-page agentic-page">
      <PageTitle
        eyebrow="Agent systems, explained"
        title="Agentic"
        intro="Understand the pieces behind an agent: what runs it, what it can do, and what guides its work. Select a building block to explore a README template."
      />

      <section className="agentic-explore" aria-labelledby="agentic-explore-title">
        <div className="agentic-section-heading">
          <h2 id="agentic-explore-title">Explore Customizations</h2>
          <span>Manage what the active agent knows and can do.</span>
        </div>
        <div className="agentic-grid">
          {AGENTIC_ELEMENTS.map((element) => {
            const Icon = element.icon;
            const active = selected.id === element.id;
            return (
              <button
                key={element.id}
                type="button"
                className="agentic-card"
                aria-label={element.name}
                aria-describedby={`${element.id}-description`}
                aria-pressed={active}
                aria-controls="agentic-readme"
                onClick={() => setSelected(element)}
              >
                <span className="agentic-card-heading">
                  <Icon aria-hidden="true" />
                  <strong>{element.name}</strong>
                  {active && <CheckIcon className="agentic-selected" aria-hidden="true" />}
                </span>
                <span id={`${element.id}-description`} className="agentic-card-description">
                  {element.description}
                </span>
                <span className="agentic-card-footer">
                  <span>{element.kind}</span>
                  <span>
                    {active ? "Selected" : "Read template"} <ArrowDownIcon aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        id="agentic-readme"
        className="agentic-readme"
        aria-labelledby="agentic-readme-title"
      >
        <header className="agentic-readme-toolbar">
          <FileTextIcon aria-hidden="true" />
          <h2 id="agentic-readme-title">
            {selected.name} <span>/ README.md</span>
          </h2>
          <span className="agentic-template-label">Example template</span>
          <a
            className="icon-button"
            href={`data:text/markdown;charset=utf-8,${encodeURIComponent(selected.readme)}`}
            download={selected.name.endsWith(".md") ? selected.name : `${selected.id}-README.md`}
            aria-label={`Download ${selected.name} template`}
            title="Download Markdown template"
          >
            <DownloadIcon aria-hidden="true" />
          </a>
        </header>
        <div className="agentic-distinction" aria-live="polite" aria-atomic="true">
          <h3>How {selected.name} fits in</h3>
          <p>{selected.distinction}</p>
          <a href={selected.source} target="_blank" rel="noreferrer">
            {selected.sourceLabel} <ArrowUpRightIcon aria-hidden="true" />
          </a>
        </div>
        <StructureMarkdown key={selected.id} className="markdown-body">
          {selected.readme}
        </StructureMarkdown>
        <footer className="agentic-readme-footer">
          A starting point for your project. Adapt the names, commands, and configuration to your
          agent app.
        </footer>
      </section>
    </main>
  );
}
