import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckIcon,
  DownloadIcon,
  FolderCodeIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PrinterIcon,
  SearchIcon,
  Settings2Icon,
  Share2Icon,
  XIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { LibraryChooser } from "#/components/library-chooser.tsx";
import { StructureTree } from "#/components/structure-tree.tsx";
import {
  defaultSource,
  fetchSettings,
  filterStructures,
  librarySource,
  type ExplorerKind,
  type FolderSettings,
} from "#/lib/structures.ts";

const MarkdownViewer = lazy(() => import("#/components/markdown-viewer.tsx"));

interface StructureExplorerProps {
  kind: ExplorerKind;
  library?: string;
  element?: string;
  sourceOverride?: string;
}

export function StructureExplorer({
  kind,
  library,
  element,
  sourceOverride,
}: StructureExplorerProps) {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const source = sourceOverride ?? (library ? librarySource(library) : defaultSource(kind));
  const [query, setQuery] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const actionMessageTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [sourceDraft, setSourceDraft] = useState({ source, value: source });
  const sourceInput = sourceDraft.source === source ? sourceDraft.value : source;

  useEffect(
    () => () => {
      if (actionMessageTimer.current) clearTimeout(actionMessageTimer.current);
    },
    [],
  );

  const settingsQuery = useQuery({
    queryKey: ["structure-settings", source],
    queryFn: ({ signal }) => fetchSettings(source, signal),
    enabled: hydrated,
  });

  const settings = settingsQuery.data;
  const visibleItems = settings ? filterStructures(settings.structures, query) : [];
  const routeLibrary = settings?.libraryName || library || kind;

  const selectElement = (selected: string) => {
    const search = { source: sourceOverride };
    if (kind === "folders") {
      navigate({
        to: "/folders/$library/$element",
        params: { library: routeLibrary, element: selected },
        search,
      });
    } else {
      navigate({
        to: "/issues/$library/$element",
        params: { library: routeLibrary, element: selected },
        search,
      });
    }
  };

  const applySource = () => {
    const nextSource = sourceInput.trim();
    if (!nextSource) return;
    if (kind === "folders") {
      navigate({ to: "/folders", search: { source: nextSource } });
    } else {
      navigate({ to: "/issues", search: { source: nextSource } });
    }
  };

  const selectLibrary = (selectedLibrary: string) => {
    if (kind === "folders") {
      navigate({ to: "/folders/$library", params: { library: selectedLibrary }, search: {} });
    } else {
      navigate({ to: "/issues/$library", params: { library: selectedLibrary }, search: {} });
    }
  };

  const loadCustomSource = (nextSource: string) => {
    if (kind === "folders") {
      navigate({ to: "/folders", search: { source: nextSource } });
    } else {
      navigate({ to: "/issues", search: { source: nextSource } });
    }
  };

  const showActionMessage = (message: string) => {
    if (actionMessageTimer.current) clearTimeout(actionMessageTimer.current);
    setActionMessage(message);
    actionMessageTimer.current = setTimeout(() => setActionMessage(""), 2400);
  };

  const shareStructure = async () => {
    try {
      await copyText(window.location.href);
      showActionMessage("Share link copied");
    } catch {
      showActionMessage("Could not copy the link");
    }
  };

  return (
    <div className={minimized ? "explorer-layout explorer-minimized" : "explorer-layout"}>
      <aside className="explorer-sidebar" aria-label={`${kind} explorer`}>
        <div className="print-explorer-heading" aria-hidden="true">
          <span>Structures</span>
          <strong>{settings?.libraryName ?? library ?? "Custom structure"}</strong>
          <small>{kind === "folders" ? "Folder standard" : "Issue workflow"}</small>
        </div>
        <header className="explorer-sidebar-header">
          <div className="explorer-search-row">
            <label className="input-with-icon">
              <SearchIcon aria-hidden="true" />
              <span className="sr-only">Search structure</span>
              <input
                type="search"
                value={query}
                placeholder="Search"
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button
              type="button"
              className="icon-button"
              aria-label="Copy a shareable link to this structure"
              title="Copy share link"
              disabled={!settings}
              onClick={shareStructure}
            >
              {actionMessage === "Share link copied" ? <CheckIcon /> : <Share2Icon />}
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="Print this structure"
              title="Print structure"
              disabled={!settings}
              onClick={() => window.print()}
            >
              <PrinterIcon />
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label={settingsOpen ? "Close explorer settings" : "Open explorer settings"}
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((open) => !open)}
            >
              {settingsOpen ? <XIcon /> : <Settings2Icon />}
            </button>
          </div>
          <p className="explorer-action-feedback" aria-live="polite">
            {actionMessage}
          </p>

          {settingsOpen && (
            <section className="explorer-settings">
              <div className="settings-title-row">
                <div>
                  <h2>Explorer settings</h2>
                  <p>JSON or raw Gist URL</p>
                </div>
                <button
                  type="button"
                  className="icon-button subtle"
                  aria-label="Download structure settings"
                  disabled={!settings}
                  onClick={() => settings && downloadSettings(settings)}
                >
                  <DownloadIcon />
                </button>
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
            </section>
          )}
        </header>

        <div className="explorer-tree-scroll">
          {settingsQuery.isPending && <ExplorerLoading />}
          {settingsQuery.isError && (
            <div className="sidebar-message error-message">
              <strong>Could not load structure</strong>
              <span>{settingsQuery.error.message}</span>
              <button type="button" onClick={() => settingsQuery.refetch()}>
                Try again
              </button>
            </div>
          )}
          {settings && visibleItems.length > 0 && (
            <StructureTree
              items={visibleItems}
              kind={kind}
              manifestConfig={settings.manifestConfig}
              selectedElement={element}
              onSelect={selectElement}
            />
          )}
          {settings && visibleItems.length === 0 && (
            <div className="sidebar-message">No items match “{query}”.</div>
          )}
        </div>

        <footer className="explorer-footer" aria-label="Application version">
          <span>{settings?.libraryName ?? "Structures"}</span>
          <span>v{__APP_VERSION__}</span>
        </footer>
      </aside>

      <button
        type="button"
        className="sidebar-collapse-button"
        aria-label={minimized ? "Expand explorer" : "Minimize explorer"}
        onClick={() => setMinimized((current) => !current)}
      >
        {minimized ? <PanelLeftOpenIcon /> : <PanelLeftCloseIcon />}
      </button>

      <main className="explorer-main">
        {!library && !sourceOverride && (
          <LibraryChooser kind={kind} onSelect={selectLibrary} onSource={loadCustomSource} />
        )}
        {!element && (library || sourceOverride) && (
          <EmptyDocument libraryName={settings?.libraryName} loading={settingsQuery.isPending} />
        )}
        {element && (
          <Suspense fallback={<DocumentLoading />}>
            <MarkdownViewer source={source} element={element} />
          </Suspense>
        )}
      </main>
    </div>
  );
}

function EmptyDocument({ libraryName, loading }: { libraryName?: string; loading: boolean }) {
  return (
    <section className="empty-document">
      <FolderCodeIcon aria-hidden="true" />
      <p className="eyebrow">{loading ? "Loading structure" : libraryName || "Custom structure"}</p>
      <h1>Select a file or folder</h1>
      <p>Choose an item in the explorer to read its documentation.</p>
    </section>
  );
}

function ExplorerLoading() {
  return (
    <div className="tree-skeleton" aria-label="Loading structure">
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} style={{ width: `${62 + ((index * 17) % 31)}%` }} />
      ))}
    </div>
  );
}

function DocumentLoading() {
  return (
    <div className="document-loading" role="status">
      <span />
      Loading documentation…
    </div>
  );
}

function downloadSettings(settings: FolderSettings) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(settings, null, 2)], { type: "application/json" }),
  );
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${settings.libraryName || "structure"}-settings.json`;
  anchor.click();
  URL.revokeObjectURL(url);
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

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Older browsers can expose the API while denying it outside a secure context.
    }
  }

  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.append(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();
  if (!copied) throw new Error("The browser denied clipboard access.");
}
