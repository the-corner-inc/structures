"use client";

import { CheckIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { ComponentProps } from "react";

/** Turn heading text into a stable, URL-safe anchor id. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Flatten React children to their text content (for slug generation). */
function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map((child) => textFromChildren(child)).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    return textFromChildren((children as { props: { children?: ReactNode } }).props?.children);
  }
  return "";
}

/**
 * Heading that exposes a hover-visible "#" anchor link to its right.
 * Clicking it copies the canonical link; opening it in a new tab loads the page
 * and (via the global hash-scroll hook) jumps straight to this heading.
 */
export function AnchorHeading({
  level,
  id,
  children,
  className,
  style,
  ...props
}: {
  level: 1 | 2 | 3 | 4;
  id?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentProps<`h${1 | 2 | 3 | 4}`>, "id">) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  const resolvedId =
    id ?? (slugify(textFromChildren(children)) || fallbackId(textFromChildren(children)));
  const href =
    typeof window === "undefined" ? `#${resolvedId}` : `${location.pathname}#${resolvedId}`;

  useEffect(() => () => clearTimeout(timer.current), []);

  const H = `h${level}` as "h1" | "h2" | "h3" | "h4";

  const copyLink = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const url = `${location.origin}${location.pathname}#${resolvedId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard unavailable — fall through to default anchor behavior */
      window.location.hash = resolvedId;
    }
  };

  return (
    <H
      id={resolvedId}
      ref={headingRef}
      className={className ? `${className} anchor-heading` : "anchor-heading"}
      style={style}
      {...props}
    >
      <span>{children}</span>
      <a
        className="anchor-link"
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        title={copied ? "Copied!" : "Copy link"}
        onClick={copyLink}
      >
        {copied ? (
          <CheckIcon className="anchor-icon anchor-icon-copied" aria-hidden="true" />
        ) : (
          <span className="anchor-glyph" aria-hidden="true">
            #
          </span>
        )}
      </a>
    </H>
  );
}

function fallbackId(text: string): string {
  return `heading-${text.length}`;
}

/** react-markdown heading renderers (spread into the `components` prop). */
export const MarkdownHeadings: Record<
  string,
  (props: { node?: unknown; children?: ReactNode }) => ReactNode
> = {
  h1: ({ node: _node, ...rest }) => <AnchorHeading level={1} {...rest} />,
  h2: ({ node: _node, ...rest }) => <AnchorHeading level={2} {...rest} />,
  h3: ({ node: _node, ...rest }) => <AnchorHeading level={3} {...rest} />,
  h4: ({ node: _node, ...rest }) => <AnchorHeading level={4} {...rest} />,
};
