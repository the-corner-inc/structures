"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import "./structure-explorer.css";

export function StructureMarkdown({
  children,
  className = "structures-markdown",
}: {
  children: string;
  className?: string;
}) {
  return (
    <article className={className}>
      <ReactMarkdown
        skipHtml
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ pre: CopyablePre }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}

function CopyablePre({ node: _node, ...props }: ComponentProps<"pre"> & { node?: unknown }) {
  const pre = useRef<HTMLPreElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [status, setStatus] = useState("");
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(pre.current?.textContent ?? "");
      setStatus("Copied");
    } catch {
      setStatus("Copy unavailable");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 1400);
  }
  return (
    <div className="structures-code-block">
      <button type="button" aria-label="Copy code" onClick={copy}>
        {status === "Copied" ? <CheckIcon /> : <ClipboardIcon />}
      </button>
      <span className="structures-sr-only" role="status">
        {status}
      </span>
      <pre ref={pre} {...props} />
    </div>
  );
}
