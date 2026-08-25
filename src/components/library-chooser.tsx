import { SiGithub } from "@icons-pack/react-simple-icons";
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react";
import { useState } from "react";

import { EXPLORER_FRAMEWORKS, type ExplorerKind } from "#/lib/structures.ts";

interface LibraryChooserProps {
  kind: ExplorerKind;
  onSelect: (library: string) => void;
  onSource: (source: string) => void;
}

export function LibraryChooser({ kind, onSelect, onSource }: LibraryChooserProps) {
  const [customSource, setCustomSource] = useState("");

  const applyCustomSource = () => {
    if (!customSource.trim()) return;
    onSource(customSource.trim());
  };

  return (
    <section className="library-chooser">
      <div className="chooser-intro">
        <p className="eyebrow">Community knowledge, made navigable</p>
        <h1>{kind === "folders" ? "Explore a project structure" : "Explore an issue workflow"}</h1>
        <p>
          Open an opinionated template or load a JSON structure from a raw GitHub Gist. Hover or
          select any item to read the reasoning behind it.
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
        <span>or pick a best practice</span>
      </div>

      <div className="framework-grid">
        {EXPLORER_FRAMEWORKS[kind].map((group) => (
          <section className="framework-group" key={group.name}>
            <h2>{group.name}</h2>
            <div>
              {group.children.map((framework) => (
                <button
                  type="button"
                  key={framework.name}
                  disabled={framework.disabled}
                  onClick={() => onSelect(framework.library)}
                >
                  <span>{framework.name}</span>
                  {framework.disabled ? <small>Coming soon</small> : <ChevronRightIcon />}
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
