import { useQuery } from "@tanstack/react-query";
import { CheckIcon, ClipboardIcon, FileQuestionIcon, RotateCwIcon } from "lucide-react";
import { useRef, useState, useSyncExternalStore } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import { fetchMarkdown } from "#/lib/structures.ts";

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

  return (
    <article className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ pre: CopyablePre }}
      >
        {markdownQuery.data}
      </ReactMarkdown>
    </article>
  );
}

function CopyablePre(props: React.ComponentProps<"pre">) {
  const pre = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(pre.current?.innerText ?? "");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="code-block">
      <button type="button" aria-label="Copy code" onClick={copy}>
        {copied ? <CheckIcon /> : <ClipboardIcon />}
      </button>
      <pre ref={pre} {...props} />
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
