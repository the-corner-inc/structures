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
import { AGENT_PROMPT, AGENTIC_ELEMENTS, INSTRUCTION_FILES } from "#/lib/agentic.ts";

export function AgenticPage() {
  const [selected, setSelected] = useState(AGENTIC_ELEMENTS[0]);
  const isInstructionFile = INSTRUCTION_FILES.some((file) => file.id === selected.id);
  const selectedGroup = isInstructionFile
    ? "Instructions"
    : selected.id === AGENT_PROMPT.id
      ? "Agents"
      : null;

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
            const instructions = element.id === "instructions";
            return (
              <div
                key={element.id}
                className="agentic-card"
                data-selected={active || element.name === selectedGroup}
              >
                <button
                  type="button"
                  className="agentic-card-select"
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
                </button>
                {element.id === "agents" && (
                  <button
                    type="button"
                    className="agentic-file-badge agentic-prompt-badge"
                    title={AGENT_PROMPT.description}
                    aria-pressed={selected.id === AGENT_PROMPT.id}
                    aria-controls="agentic-readme"
                    onClick={() => setSelected(AGENT_PROMPT)}
                  >
                    {AGENT_PROMPT.name}
                  </button>
                )}
                {instructions && (
                  <div
                    className="agentic-instruction-files"
                    role="group"
                    aria-label="Instruction files"
                  >
                    {INSTRUCTION_FILES.map((file) => (
                      <button
                        key={file.id}
                        type="button"
                        className="agentic-file-badge"
                        aria-pressed={selected.id === file.id}
                        aria-controls="agentic-readme"
                        onClick={() => setSelected(file)}
                      >
                        {file.name}
                      </button>
                    ))}
                  </div>
                )}
                <span className="agentic-card-footer">
                  <span>{element.kind}</span>
                  <span>
                    {active ? "Selected" : instructions ? "Read description" : "Read template"}{" "}
                    <ArrowDownIcon aria-hidden="true" />
                  </span>
                </span>
              </div>
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
            {selectedGroup ?? selected.name}{" "}
            <span>/ {selectedGroup ? selected.name : "README.md"}</span>
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
