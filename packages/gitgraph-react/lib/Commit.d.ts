import * as React from "react";
import { GitgraphCore, Commit as CommitCore, Coordinate } from "@gitgraph/core";
import { ReactSvgElement } from "./types";
interface CommitsProps {
    commits: Array<CommitCore<ReactSvgElement>>;
    commit: CommitCore<ReactSvgElement>;
    currentCommitOver: CommitCore<ReactSvgElement> | null;
    gitgraph: GitgraphCore<ReactSvgElement>;
    getWithCommitOffset: (props: any) => Coordinate;
    setTooltip: (val: React.ReactElement<SVGGElement> | null) => void;
    setCurrentCommitOver: (val: CommitCore<ReactSvgElement> | null) => void;
    commitMessagesX: number;
}
export declare const Commit: (props: CommitsProps) => JSX.Element;
export {};
