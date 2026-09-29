import * as React from "react";
import { toSvgPath } from "@gitgraph/core";
export class BranchPath extends React.Component {
    render() {
        return (React.createElement("path", { "data-branch": this.props.branch.name, tabIndex: 0, role: "img", "aria-label": `${this.props.branch.name} branch`, d: toSvgPath(this.props.coordinates.map((a) => a.map((b) => this.props.getWithCommitOffset(b))), this.props.isBezier, this.props.gitgraph.isVertical), fill: "none", stroke: this.props.branch.computedColor, strokeWidth: this.props.branch.style.lineWidth, transform: `translate(${this.props.offset}, ${this.props.offset})` }));
    }
}
