import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { SquareKanbanIcon } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { StructureMarkdown } from "#/components/structures/structure-markdown.tsx";
import {
  defaultSource,
  fetchMarkdown,
  fetchSettings,
  nodeId,
  type FolderStructure,
} from "#/lib/structures.ts";

// The board renders the children of the structure group named “Kanban” as columns.
const BOARD_GROUP = "kanban";

export function KanbanBoard({ sourceOverride }: { sourceOverride?: string }) {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const source = sourceOverride ?? defaultSource("issues");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sourceDraft, setSourceDraft] = useState({ source, value: source });
  const sourceInput = sourceDraft.source === source ? sourceDraft.value : source;

  const settingsQuery = useQuery({
    queryKey: ["structure-settings", source],
    queryFn: ({ signal }) => fetchSettings(source, signal),
    enabled: hydrated,
  });

  const settings = settingsQuery.data;
  const columns = useMemo(() => {
    if (!settings) return [];
    const group = settings.structures.find(
      (item) => item.name.trim().toLowerCase() === BOARD_GROUP,
    );
    return group?.children ?? [];
  }, [settings]);

  const hoveredColumn = columns.find((column) => nodeId(column) === hoveredId);
  const descriptionQuery = useQuery({
    queryKey: ["structure-markdown", source, hoveredId],
    queryFn: ({ signal }) => fetchMarkdown(source, hoveredId!, signal),
    enabled: hydrated && Boolean(hoveredId),
  });

  const applySource = () => {
    const nextSource = sourceInput.trim();
    if (!nextSource) return;
    navigate({ to: "/issues/kanban", search: { source: nextSource } });
  };

  const renderColumn = (column: FolderStructure) => {
    const id = nodeId(column);
    // “transparent” colors mean the label renders without a tint.
    const color = column.color && column.color !== "transparent" ? column.color : undefined;
    const bgColor = column.bgColor && column.bgColor !== "transparent" ? column.bgColor : undefined;
    return (
      <button
        type="button"
        className="kanban-column"
        key={id}
        aria-label={column.name}
        data-active={id === hoveredId || undefined}
        onPointerEnter={() => setHoveredId(id)}
        onFocus={() => setHoveredId(id)}
        onClick={() => openDocumentation(id)}
      >
        <span
          className="kanban-column-header"
          style={bgColor ? { backgroundColor: bgColor } : undefined}
        >
          <span
            className="label-color"
            style={color ? { color, backgroundColor: bgColor, borderColor: color } : undefined}
            aria-hidden="true"
          />
          <span className="kanban-column-name">{column.name}</span>
        </span>
        <span className="kanban-column-body" aria-hidden="true" />
      </button>
    );
  };

  const openDocumentation = (element: string) => {
    navigate({
      to: "/issues/$library/$element",
      params: { library: "software", element },
      search: sourceOverride ? { source: sourceOverride } : {},
    });
  };

  return (
    <div className="kanban-layout">
      <aside className="kanban-sidebar" aria-label="Kanban column descriptions">
        <header className="kanban-sidebar-header">
          <div className="kanban-heading">
            <SquareKanbanIcon aria-hidden="true" />
            <div>
              <h1>Kanban board</h1>
              <p>Hover a column to read its description</p>
            </div>
          </div>
          <div className="source-control">
            <input
              value={sourceInput}
              aria-label="Structure settings URL"
              onChange={(event) => setSourceDraft({ source, value: event.target.value })}
              onKeyDown={(event) => event.key === "Enter" && applySource()}
            />
            <button type="button" onClick={applySource}>
              Load
            </button>
          </div>
        </header>
        <div className="kanban-doc-scroll" aria-live="polite">
          {!hoveredColumn && (
            <div className="sidebar-message">Hover a column to read its description.</div>
          )}
          {hoveredColumn && descriptionQuery.isPending && <DocSkeleton />}
          {hoveredColumn && descriptionQuery.isError && (
            <div className="sidebar-message">
              <strong>No description found</strong>
              <span>{descriptionQuery.error.message}</span>
              <button type="button" onClick={() => descriptionQuery.refetch()}>
                Try again
              </button>
            </div>
          )}
          {hoveredColumn && descriptionQuery.data && (
            <StructureMarkdown className="kanban-doc">{descriptionQuery.data}</StructureMarkdown>
          )}
        </div>
      </aside>

      <main className="kanban-main">
        {settingsQuery.isPending && <KanbanSkeleton />}
        {settingsQuery.isError && (
          <div className="sidebar-message error-message">
            <strong>Could not load structure</strong>
            <span>{settingsQuery.error.message}</span>
            <button type="button" onClick={() => settingsQuery.refetch()}>
              Try again
            </button>
          </div>
        )}
        {settings && columns.length > 0 && (
          <div className="kanban-board">{columns.map(renderColumn)}</div>
        )}
        {settings && columns.length === 0 && (
          <section className="empty-document">
            <SquareKanbanIcon aria-hidden="true" />
            <p className="eyebrow">{settings.libraryName || "Custom structure"}</p>
            <h1>No board columns</h1>
            <p>This structure does not define a “Kanban” group with columns.</p>
          </section>
        )}
      </main>
    </div>
  );
}

function KanbanSkeleton() {
  return (
    <div className="kanban-skeleton" aria-label="Loading kanban board">
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
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
