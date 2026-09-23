import * as React from "react";
import { ReactSvgElement } from "./types";
import { GitgraphCore, Commit } from "@gitgraph/core";
interface ArrowProps {
    commits: Array<Commit<ReactSvgElement>>;
    commit: Commit<ReactSvgElement>;
    gitgraph: GitgraphCore<ReactSvgElement>;
    parentHash: string;
    commitRadius: number;
}
export declare class Arrow extends React.Component<ArrowProps> {
    render(): JSX.Element;
}
export {};
