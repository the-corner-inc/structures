import * as React from "react";
import { GitgraphCore, GitgraphOptions, GitgraphUserApi, Commit as CommitCore, MergeStyle, Mode, Orientation, TemplateName, templateExtend, BranchesPaths } from "@gitgraph/core";
import { ReactSvgElement, CommitOptions, BranchOptions, TagOptions, MergeOptions, Branch } from "./types";
export { Gitgraph, GitgraphProps, GitgraphState, TemplateName, templateExtend, MergeStyle, Mode, Orientation, CommitOptions, BranchOptions, TagOptions, MergeOptions, Branch, };
type GitgraphProps = GitgraphPropsWithChildren | GitgraphPropsWithGraph;
interface GitgraphPropsWithChildren {
    options?: GitgraphOptions;
    children: (gitgraph: GitgraphUserApi<ReactSvgElement>) => void;
}
interface GitgraphPropsWithGraph {
    graph: GitgraphCore<ReactSvgElement>;
}
interface GitgraphState {
    commits: Array<CommitCore<ReactSvgElement>>;
    branchesPaths: BranchesPaths<ReactSvgElement>;
    commitMessagesX: number;
    commitYWithOffsets: {
        [key: number]: number;
    };
    shouldRecomputeOffsets: boolean;
    currentCommitOver: CommitCore<ReactSvgElement> | null;
}
declare class Gitgraph extends React.Component<GitgraphProps, GitgraphState> {
    static defaultProps: Partial<GitgraphProps>;
    private gitgraph;
    private $graph;
    private $commits;
    private $tooltip;
    constructor(props: GitgraphProps);
    render(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    private setCurrentCommitOver;
    private setTooltip;
    private renderBranchesPaths;
    private computeOffsets;
    private getWithCommitOffset;
}
