import * as React from "react";
import { GitgraphCore, Coordinate, Branch } from "@gitgraph/core";
import { ReactSvgElement } from "./types";
import { ReactElement } from "react";
interface BranchPathProps {
    branch: Branch<ReactElement<SVGElement>>;
    coordinates: Coordinate[][];
    isBezier: boolean;
    offset: number;
    gitgraph: GitgraphCore<ReactSvgElement>;
    getWithCommitOffset: (props: any) => Coordinate;
}
export declare class BranchPath extends React.Component<BranchPathProps, any> {
    render(): JSX.Element;
}
export {};
