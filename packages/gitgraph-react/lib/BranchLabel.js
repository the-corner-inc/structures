import * as React from "react";
function DefaultBranchLabel({ branch, commit }) {
    const [textSizing, setTextSizing] = React.useState({
        textWidth: 0,
        textHeight: 0,
    });
    const getSizing = React.useCallback((node) => {
        if (!node)
            return;
        const box = node.getBBox();
        setTextSizing({ textWidth: box.width, textHeight: box.height });
    }, []);
    const boxWidth = textSizing.textWidth + 2 * BranchLabel.paddingX;
    const boxHeight = textSizing.textHeight + 2 * BranchLabel.paddingY;
    // Center the pill vertically on the commit node's dot so the label lines up
    // with the branch tip instead of sitting above it. The dot is drawn at
    // `commit.style.dot.size` below the shared origin.
    const centeringOffset = commit.style.dot.size - boxHeight / 2;
    return (React.createElement("g", { transform: `translate(0, ${centeringOffset})` },
        React.createElement("rect", { stroke: branch.style.label.strokeColor || commit.style.color, fill: branch.style.label.bgColor, rx: branch.style.label.borderRadius, width: boxWidth, height: boxHeight }),
        React.createElement("text", { ref: getSizing, fill: branch.style.label.color || commit.style.color, style: { font: branch.style.label.font }, alignmentBaseline: "middle", dominantBaseline: "middle", x: BranchLabel.paddingX, y: boxHeight / 2 }, branch.name)));
}
export const BranchLabel = React.forwardRef((props, ref) => {
    const { branch, commit, branchLabelX } = props;
    if (!branch.style.label.display)
        return null;
    if (!props.gitgraph.branchLabelOnEveryCommit) {
        const commitHash = props.gitgraph.refs.getCommit(branch.name);
        if (commit.hash !== commitHash)
            return null;
    }
    // For the moment, we don't handle multiple branch labels.
    // To do so, we'd need to reposition each of them appropriately.
    if (commit.branchToDisplay !== branch.name)
        return null;
    const branchLabel = branch.renderLabel ? (branch.renderLabel(branch)) : (React.createElement(DefaultBranchLabel, { branch: branch, commit: commit }));
    if (props.gitgraph.isVertical) {
        return (React.createElement("g", { ref: ref, transform: `translate(${branchLabelX || 0}, 0)` }, branchLabel));
    }
    else {
        const commitDotSize = commit.style.dot.size * 2;
        const horizontalMarginTop = 10;
        const y = commitDotSize + horizontalMarginTop;
        return (React.createElement("g", { ref: ref, transform: `translate(${commit.x}, ${y})` }, branchLabel));
    }
});
BranchLabel.paddingX = 10;
BranchLabel.paddingY = 5;
