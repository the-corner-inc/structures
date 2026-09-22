import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { SquareKanbanIcon, TagsIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";

import { StructureMarkdown } from "#/components/structures/structure-markdown.tsx";
import {
  defaultSource,
  fetchMarkdown,
  fetchSettings,
  nodeId,
  type BoardVariant,
  type FolderStructure,
} from "#/lib/structures.ts";

interface BoardConfig {
  group: string;
  heading: string;
  hint: string;
  emptyTitle: string;
  emptyDescription: string;
  icon: LucideIcon;
}

const BOARD_CONFIG: Record<BoardVariant, BoardConfig> = {
  kanban: {
    group: "kanban",
    heading: "Kanban board",
    hint: "Hover a column to read its description",
    emptyTitle: "No board columns",
    emptyDescription: "This structure does not define a “Kanban” group with columns.",
    icon: SquareKanbanIcon,
  },
  labels: {
    group: "labels",
    heading: "Labels",
    hint: "Hover a label to read its description",
    emptyTitle: "No labels",
    emptyDescription: "This structure does not define a “Labels” group.",
    icon: TagsIcon,
  },
};

export function StructureBoard({
  variant,
  sourceOverride,
}: {
  variant: BoardVariant;
  sourceOverride?: string;
}) {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const config = BOARD_CONFIG[variant];
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
  const group = useMemo(
    () => settings?.structures.find((item) => item.name.trim().toLowerCase() === config.group),
    [settings, config.group],
  );
  const items = group?.children ?? [];

  const descriptionQuery = useQuery({
    queryKey: ["structure-markdown", source, hoveredId],
    queryFn: ({ signal }) => fetchMarkdown(source, hoveredId!, signal),
    enabled: hydrated && Boolean(hoveredId),
  });

  const applySource = () => {
    const nextSource = sourceInput.trim();
    if (!nextSource) return;
    if (variant === "kanban") {
      navigate({ to: "/kanban", search: { source: nextSource } });
    } else {
      navigate({ to: "/labels", search: { source: nextSource } });
    }
  };

  const openDocumentation = (element: string) => {
    navigate({
      to: "/issues/$library/$element",
      params: { library: "software", element },
      search: sourceOverride ? { source: sourceOverride } : {},
    });
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

  const Icon = config.icon;

  return (
    <div className="board-layout">
      <aside className="board-sidebar" aria-label={`${config.heading} descriptions`}>
        <header className="board-sidebar-header">
          <div className="board-heading">
            <Icon aria-hidden="true" />
            <div>
              <h1>{config.heading}</h1>
              <p>{config.hint}</p>
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
        <div className="board-doc-scroll" aria-live="polite">
          {!hoveredId && <div className="sidebar-message">{config.hint}.</div>}
          {hoveredId && descriptionQuery.isPending && <DocSkeleton />}
          {hoveredId && descriptionQuery.isError && (
            <div className="sidebar-message">
              <strong>No description found</strong>
              <span>{descriptionQuery.error.message}</span>
              <button type="button" onClick={() => descriptionQuery.refetch()}>
                Try again
              </button>
            </div>
          )}
          {hoveredId && descriptionQuery.data && (
            <StructureMarkdown className="board-doc">{descriptionQuery.data}</StructureMarkdown>
          )}
        </div>
      </aside>

      <main className="board-main">
        {settingsQuery.isPending && <BoardSkeleton heading={config.heading} />}
        {settingsQuery.isError && (
          <div className="sidebar-message error-message">
            <strong>Could not load structure</strong>
            <span>{settingsQuery.error.message}</span>
            <button type="button" onClick={() => settingsQuery.refetch()}>
              Try again
            </button>
          </div>
        )}
        {settings && items.length > 0 && variant === "kanban" && (
          <div className="kanban-board">{items.map(renderColumn)}</div>
        )}
        {settings && items.length > 0 && variant === "labels" && (
          <div className="label-gallery">
            {items.map((item) => (
              <LabelSection
                key={nodeId(item)}
                group={item}
                activeId={hoveredId}
                onHover={setHoveredId}
                onOpen={openDocumentation}
              />
            ))}
          </div>
        )}
        {settings && items.length === 0 && (
          <section className="empty-document">
            <Icon aria-hidden="true" />
            <p className="eyebrow">{settings.libraryName || "Custom structure"}</p>
            <h1>{config.emptyTitle}</h1>
            <p>{config.emptyDescription}</p>
          </section>
        )}
      </main>
    </div>
  );
}

function LabelSection({
  group,
  depth = 0,
  activeId,
  onHover,
  onOpen,
}: {
  group: FolderStructure;
  depth?: number;
  activeId: string | null;
  onHover: (id: string) => void;
  onOpen: (element: string) => void;
}) {
  const children = group.children ?? [];
  const elements = children.filter((child) => !child.children?.length);
  const folders = children.filter((child) => child.children?.length);
  const Heading = depth === 0 ? "h2" : "h3";
  return (
    <section className="label-section">
      <Heading className={`label-section-heading${depth > 0 ? " sub" : ""}`}>{group.name}</Heading>
      {elements.length > 0 && (
        <div className="label-pills">
          {elements.map((element) => {
            const id = nodeId(element);
            // “transparent” colors mean the label renders without a tint.
            const color =
              element.color && element.color !== "transparent" ? element.color : undefined;
            const bgColor =
              element.bgColor && element.bgColor !== "transparent" ? element.bgColor : undefined;
            return (
              <button
                type="button"
                className="label-pill"
                key={id}
                aria-label={element.name}
                data-active={id === activeId || undefined}
                onPointerEnter={() => onHover(id)}
                onFocus={() => onHover(id)}
                onClick={() => onOpen(id)}
                style={
                  color || bgColor
                    ? { backgroundColor: bgColor, color, borderColor: color }
                    : undefined
                }
              >
                <span>{element.name}</span>
              </button>
            );
          })}
        </div>
      )}
      {folders.map((folder) => (
        <LabelSection
          key={nodeId(folder)}
          group={folder}
          depth={depth + 1}
          activeId={activeId}
          onHover={onHover}
          onOpen={onOpen}
        />
      ))}
    </section>
  );
}

function BoardSkeleton({ heading }: { heading: string }) {
  return (
    <div className="board-skeleton" aria-label={`Loading ${heading.toLowerCase()}`}>
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
