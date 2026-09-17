"use client";

import { SearchIcon } from "lucide-react";
import { lazy, Suspense, useEffect, useId, useMemo, useState } from "react";

import {
  filterStructures,
  flattenStructures,
  nodeId,
  parseStructures,
  type StructureNode,
} from "./structure-data";
import { StructureTree, type RenderStructureIcon } from "./structure-tree";

import "./structure-explorer.css";

const Markdown = lazy(() =>
  import("./structure-markdown").then((module) => ({ default: module.StructureMarkdown })),
);
export type { StructureNode, StructureType } from "./structure-data";
export { nodeId, parseStructures } from "./structure-data";
export type { RenderStructureIcon } from "./structure-tree";
export type GetDocumentation = (
  node: StructureNode,
  context: { signal: AbortSignal },
) => string | null | Promise<string | null>;

export interface StructureExplorerProps {
  items: StructureNode[];
  getDocumentation?: GetDocumentation;
  /** undefined uses internal selection; null is a controlled empty selection. */
  selectedId?: string | null;
  defaultSelectedId?: string;
  onSelect?: (node: StructureNode) => void;
  renderIcon?: RenderStructureIcon;
  className?: string;
  label?: string;
}

export function StructureExplorer({
  items,
  getDocumentation,
  selectedId,
  defaultSelectedId,
  onSelect,
  renderIcon,
  className = "",
  label = "Project structure",
}: StructureExplorerProps) {
  const validated = useMemo(() => parseStructures(items), [items]);
  const [internalId, setInternalId] = useState<string | null>(defaultSelectedId ?? null);
  const [query, setQuery] = useState("");
  const searchId = useId();
  const activeId = selectedId === undefined ? internalId : selectedId;
  const selected = flattenStructures(validated).find((node) => nodeId(node) === activeId);
  const visible = filterStructures(validated, query);
  function select(node: StructureNode) {
    if (selectedId === undefined) setInternalId(nodeId(node));
    onSelect?.(node);
  }
  return (
    <section
      aria-label={label}
      className={`structures-explorer${getDocumentation ? " structures-with-docs" : ""} ${className}`}
    >
      <div className="structures-sidebar">
        <label className="structures-search" htmlFor={searchId}>
          <SearchIcon aria-hidden="true" />
          <span className="structures-sr-only">Search {label}</span>
          <input
            id={searchId}
            type="search"
            value={query}
            placeholder="Search files and folders"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <div className="structures-tree-scroll">
          {visible.length ? (
            <StructureTree
              items={visible}
              selectedId={activeId}
              onSelect={select}
              renderIcon={renderIcon}
              forceExpand={Boolean(query.trim())}
              label={label}
            />
          ) : (
            <p className="structures-state" role="status">
              {items.length ? "No matching files or folders." : "This structure is empty."}
            </p>
          )}
        </div>
      </div>
      {getDocumentation && (
        <div className="structures-document">
          {selected ? (
            <Documentation key={nodeId(selected)} node={selected} load={getDocumentation} />
          ) : (
            <p className="structures-state">Select a file or folder to read its documentation.</p>
          )}
        </div>
      )}
    </section>
  );
}

type DocumentState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; text: string | null };
function Documentation({ node, load }: { node: StructureNode; load: GetDocumentation }) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<DocumentState>({ status: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) return null;
        setState({ status: "loading" });
        return load(node, { signal: controller.signal });
      })
      .then(
        (text) => {
          if (!controller.signal.aborted) setState({ status: "ready", text });
        },
        () => {
          if (!controller.signal.aborted) setState({ status: "error" });
        },
      );
    return () => controller.abort();
  }, [node, load, attempt]);
  if (state.status === "loading")
    return (
      <p className="structures-state" role="status">
        Loading documentation…
      </p>
    );
  if (state.status === "error")
    return (
      <div className="structures-state" role="alert">
        <p>Could not load documentation for {node.name}.</p>
        <button type="button" onClick={() => setAttempt((value) => value + 1)}>
          Try again
        </button>
      </div>
    );
  if (state.text === null)
    return (
      <p className="structures-state" role="status">
        No documentation for {node.name}.
      </p>
    );
  return (
    <Suspense
      fallback={
        <p className="structures-state" role="status">
          Loading documentation…
        </p>
      }
    >
      <Markdown>{state.text}</Markdown>
    </Suspense>
  );
}
