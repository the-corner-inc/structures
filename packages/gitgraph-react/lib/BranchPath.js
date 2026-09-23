import * as React from "react";
import { toSvgPath } from "@gitgraph/core";
export class BranchPath extends React.Component {
    render() {
        return (React.createElement("path", { d: toSvgPath(this.props.coordinates.map((a) => a.map((b) => this.props.getWithCommitOffset(b))), this.props.isBezier, this.props.gitgraph.isVertical), fill: "none", stroke: this.props.branch.computedColor, strokeWidth: this.props.branch.style.lineWidth, transform: `translate(${this.props.offset}, ${this.props.offset})` }));
    }
}
