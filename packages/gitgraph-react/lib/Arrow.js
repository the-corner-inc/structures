import * as React from "react";
import { arrowSvgPath } from "@gitgraph/core";
export class Arrow extends React.Component {
    render() {
        const parent = this.props.commits.find(({ hash }) => hash === this.props.parentHash);
        if (!parent)
            return null;
        // Starting point, relative to commit
        const origin = this.props.gitgraph.reverseArrow
            ? {
                x: this.props.commitRadius + (parent.x - this.props.commit.x),
                y: this.props.commitRadius + (parent.y - this.props.commit.y),
            }
            : { x: this.props.commitRadius, y: this.props.commitRadius };
        return (React.createElement("g", { transform: `translate(${origin.x}, ${origin.y})` },
            React.createElement("path", { d: arrowSvgPath(this.props.gitgraph, parent, this.props.commit), fill: this.props.gitgraph.template.arrow.color })));
    }
}
