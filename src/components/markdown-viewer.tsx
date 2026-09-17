import { useQuery } from "@tanstack/react-query";
import { FileQuestionIcon, RotateCwIcon } from "lucide-react";
import { useSyncExternalStore } from "react";

import { fetchMarkdown } from "#/lib/structures.ts";

import { StructureMarkdown } from "./structures/structure-markdown";

export default function MarkdownViewer({ source, element }: { source: string; element: string }) {
  const hydrated = useHydrated();
  const markdownQuery = useQuery({
    queryKey: ["structure-markdown", source, element],
    queryFn: ({ signal }) => fetchMarkdown(source, element, signal),
    enabled: hydrated,
  });

  if (markdownQuery.isPending) {
    return (
      <div className="document-loading">
        <span />
        Loading documentation…
      </div>
    );
  }

  if (markdownQuery.isError) {
    return (
      <section className="document-error">
        <FileQuestionIcon />
        <p className="eyebrow">Documentation unavailable</p>
        <h1>{element}</h1>
        <p>{markdownQuery.error.message}</p>
        <button type="button" className="primary-button" onClick={() => markdownQuery.refetch()}>
          <RotateCwIcon /> Try again
        </button>
      </section>
    );
  }

  return <StructureMarkdown className="markdown-body">{markdownQuery.data}</StructureMarkdown>;
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
