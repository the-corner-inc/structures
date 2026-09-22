import type { ReactNode } from "react";

/**
 * Reusable page title/header: an eyebrow, a title, an optional intro paragraph,
 * and an optional call-to-action button aligned to the right (e.g. a `.naming-cta`).
 */
export function PageTitle({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="page-title">
      <div className="page-title-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {intro ? <div className="page-title-intro">{intro}</div> : null}
      </div>
      {action ? <div className="page-title-action">{action}</div> : null}
    </header>
  );
}
