import * as React from "react";
import { GitgraphCore, MergeStyle, Mode, Orientation, TemplateName, templateExtend, } from "@gitgraph/core";
import { BranchLabel } from "./BranchLabel";
import { Tooltip } from "./Tooltip";
import { Commit } from "./Commit";
import { BranchPath } from "./BranchPath";
export { Gitgraph, TemplateName, templateExtend, MergeStyle, Mode, Orientation, };
function isPropsWithGraph(props) {
    return "graph" in props;
}
class Gitgraph extends React.Component {
    constructor(props) {
        super(props);
        this.$graph = React.createRef();
        this.$commits = React.createRef();
        this.$tooltip = null;
        this.state = {
            commits: [],
            branchesPaths: new Map(),
            commitMessagesX: 0,
            commitYWithOffsets: {},
            shouldRecomputeOffsets: true,
            currentCommitOver: null,
        };
        this.gitgraph = isPropsWithGraph(props)
            ? props.graph
            : new GitgraphCore(props.options);
        this.gitgraph.subscribe((data) => {
            const { commits, branchesPaths, commitMessagesX } = data;
            this.setState({
                commits,
                branchesPaths,
                commitMessagesX,
                shouldRecomputeOffsets: true,
            });
        });
    }
    render() {
        return (React.createElement("svg", { ref: this.$graph },
            React.createElement("g", { transform: `translate(${BranchLabel.paddingX}, ${Tooltip.padding})` },
                this.renderBranchesPaths(),
                React.createElement("g", { ref: this.$commits }, this.state.commits.map((commit) => (React.createElement(Commit, { key: commit.hash, commits: this.state.commits, commit: commit, currentCommitOver: this.state.currentCommitOver, setCurrentCommitOver: this.setCurrentCommitOver.bind(this), gitgraph: this.gitgraph, getWithCommitOffset: this.getWithCommitOffset.bind(this), setTooltip: this.setTooltip.bind(this), commitMessagesX: this.state.commitMessagesX })))),
                this.$tooltip)));
    }
    componentDidMount() {
        if (isPropsWithGraph(this.props))
            return;
        this.props.children(this.gitgraph.getUserApi());
    }
    componentDidUpdate() {
        if (this.$graph.current) {
            const { height, width } = this.$graph.current.getBBox();
            const graphWidth = width + Tooltip.padding + BranchLabel.paddingX;
            const graphHeight = height + Tooltip.padding + BranchLabel.paddingY;
            this.$graph.current.setAttribute("width", graphWidth.toString());
            this.$graph.current.setAttribute("height", graphHeight.toString());
            // Expose a viewBox so the SVG can be scaled responsively (width:100% /
            // max-width) without cropping, instead of overflowing at its intrinsic
            // pixel width.
            this.$graph.current.setAttribute("viewBox", `0 0 ${graphWidth} ${graphHeight}`);
        }
        if (!this.state.shouldRecomputeOffsets)
            return;
        if (!this.$commits.current)
            return;
        const commits = Array.from(this.$commits.current.children);
        this.setState({
            commitYWithOffsets: this.computeOffsets(commits),
            shouldRecomputeOffsets: false,
        });
    }
    setCurrentCommitOver(v) {
        this.setState({ currentCommitOver: v });
    }
    setTooltip(v) {
        this.$tooltip = v;
    }
    renderBranchesPaths() {
        const offset = this.gitgraph.template.commit.dot.size;
        const isBezier = this.gitgraph.template.branch.mergeStyle === MergeStyle.Bezier;
        return Array.from(this.state.branchesPaths).map(([branch, coordinates]) => (React.createElement(BranchPath, { key: branch.name, gitgraph: this.gitgraph, branch: branch, coordinates: coordinates, getWithCommitOffset: this.getWithCommitOffset.bind(this), isBezier: isBezier, offset: offset })));
    }
    computeOffsets(commits) {
        let totalOffsetY = 0;
        // In VerticalReverse orientation, commits are in the same order in the DOM.
        const orientedCommits = this.gitgraph.orientation === Orientation.VerticalReverse
            ? commits
            : commits.reverse();
        return orientedCommits.reduce((newOffsets, commit) => {
            const commitY = parseInt(commit.getAttribute("transform").split(",")[1].slice(0, -1), 10);
            const firstForeignObject = commit.getElementsByTagName("foreignObject")[0];
            const customHtmlMessage = firstForeignObject && firstForeignObject.firstElementChild;
            let messageHeight = 0;
            if (customHtmlMessage) {
                const height = customHtmlMessage.getBoundingClientRect().height;
                const marginTopInPx = window.getComputedStyle(customHtmlMessage).marginTop || "0px";
                const marginTop = parseInt(marginTopInPx.replace("px", ""), 10);
                messageHeight = height + marginTop;
            }
            // Force the height of the foreignObject (browser issue)
            if (firstForeignObject) {
                firstForeignObject.setAttribute("height", `${messageHeight}px`);
            }
            newOffsets[commitY] = commitY + totalOffsetY;
            // Increment total offset after setting the offset
            // => offset next commits accordingly.
            totalOffsetY += messageHeight;
            return newOffsets;
        }, {});
    }
    getWithCommitOffset({ x, y }) {
        return { x, y: this.state.commitYWithOffsets[y] || y };
    }
}
Gitgraph.defaultProps = {
    options: {},
};
