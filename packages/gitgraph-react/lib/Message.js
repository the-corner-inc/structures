import * as React from "react";
export const Message = React.forwardRef((props, ref) => {
    const { commit, messageX } = props;
    if (commit.renderMessage) {
        return (React.createElement("g", { ref: ref, transform: `translate(${messageX}, 0)` }, commit.renderMessage(commit)));
    }
    let body = null;
    if (commit.body) {
        body = (React.createElement("foreignObject", { width: "600", x: "10" },
            React.createElement("p", null, commit.body)));
    }
    // Use commit dot radius to align text with the middle of the dot.
    const y = commit.style.dot.size;
    return (React.createElement("g", { ref: ref, transform: `translate(${messageX}, ${y})` },
        React.createElement("text", { alignmentBaseline: "central", fill: commit.style.message.color, style: { font: commit.style.message.font }, onClick: commit.onMessageClick }, commit.message),
        body));
});
