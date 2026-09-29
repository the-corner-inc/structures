import * as React from "react";
import { Branch, Commit, GitgraphCore } from "@gitgraph/core";
import { ReactSvgElement } from "./types";
import { MutableRefObject } from "react";
interface BranchLabelBaseProps {
    branch: Branch<React.ReactElement<SVGElement>>;
    commit: Commit<React.ReactElement<SVGElement>>;
}
interface BranchLabelProps extends BranchLabelBaseProps {
    gitgraph: GitgraphCore<ReactSvgElement>;
    ref: MutableRefObject<SVGGElement | undefined>;
    branchLabelX: number;
}
export interface CompoundedComponent extends React.ForwardRefExoticComponent<BranchLabelProps> {
    paddingX: number;
    paddingY: number;
}
export declare const BranchLabel: CompoundedComponent;
export {};
