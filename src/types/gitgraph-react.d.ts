/**
 * Type shim for the vendored `@gitgraph/react` package.
 *
 * The vendored package is built against the React 16 typings it was originally
 * written for, which produce type conflicts when consumed from this app (React
 * 19). This module shadows only the type surface the app uses — the `Gitgraph`
 * component — typed against React 19, so JSX usage typechecks cleanly. The
 * runtime still resolves to the real compiled package via node_modules.
 */
declare module "@gitgraph/react" {
  import type * as React from "react";
  import type { GitgraphOptions, GitgraphUserApi } from "@gitgraph/core";

  /** Node type rendered by the React renderer. */
  export type ReactSvgElement = React.ReactElement<SVGElement>;

  export interface GitgraphProps {
    options?: GitgraphOptions;
    /** Render-prop fired with the gitgraph user API on mount. */
    children: (gitgraph: GitgraphUserApi<ReactSvgElement>) => void;
  }

  export function Gitgraph(props: GitgraphProps): React.ReactElement;
}
