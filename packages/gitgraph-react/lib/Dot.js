import * as React from "react";
export const Dot = ({ commit, onMouseOver, onMouseOut, }) => {
    if (commit.renderDot) {
        return commit.renderDot(commit);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("defs", null,
            React.createElement("circle", { id: commit.hash, cx: commit.style.dot.size, cy: commit.style.dot.size, r: commit.style.dot.size, fill: commit.style.dot.color }),
            React.createElement("clipPath", { id: `clip-${commit.hash}` },
                React.createElement("use", { xlinkHref: `#${commit.hash}` }))),
        React.createElement("g", { onClick: commit.onClick, onMouseOver: onMouseOver, onMouseOut: onMouseOut },
            React.createElement("use", { xlinkHref: `#${commit.hash}`, clipPath: `url(#clip-${commit.hash})`, stroke: commit.style.dot.strokeColor, strokeWidth: commit.style.dot.strokeWidth && commit.style.dot.strokeWidth * 2 }),
            commit.dotText && (React.createElement("text", { alignmentBaseline: "central", textAnchor: "middle", x: commit.style.dot.size, y: commit.style.dot.size, style: { font: commit.style.dot.font } }, commit.dotText)))));
};
