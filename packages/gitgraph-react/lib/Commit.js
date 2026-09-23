import * as React from "react";
import { Mode, } from "@gitgraph/core";
import { Dot } from "./Dot";
import { Tooltip } from "./Tooltip";
import { Arrow } from "./Arrow";
import { Message } from "./Message";
import { Tag, TAG_PADDING_X } from "./Tag";
import { BranchLabel } from "./BranchLabel";
export const Commit = (props) => {
    const { commit, commits, gitgraph, commitMessagesX } = props;
    /**
     * This _should_ likely be an array, but is not in order to intentionally keep
     *  a potential bug in the codebase that existed prior to Hook-ifying this component
     * @see https://github.com/nicoespeon/gitgraph.js/blob/be9cdf45c7f00970e68e1a4ba579ca7f5c672da4/packages/gitgraph-react/src/Gitgraph.tsx#L197
     * (notice that it's a single `null` value instead of an array
     *
     * The potential bug in question is "what happens when there are more than one
     * branch label rendered? Do they overlap or cause the message X position to be
     * in the wrong position?"
     *
     * TODO: Investigate potential bug outlined above
     */
    const branchLabelRef = React.useRef();
    const tagRefs = React.useRef([]);
    // "as unknown as any" needed to avoid `ref` mistypings later. :(
    const messageRef = React.useRef();
    const [branchLabelX, setBranchLabelX] = React.useState(0);
    const [tagXs, setTagXs] = React.useState([]);
    const [messageX, setMessageX] = React.useState(0);
    const arrows = React.useMemo(() => {
        if (!gitgraph.template.arrow.size)
            return null;
        const commitRadius = commit.style.dot.size;
        return commit.parents.map((parentHash) => {
            return (React.createElement(Arrow, { key: parentHash, commits: commits, commit: commit, gitgraph: gitgraph, parentHash: parentHash, commitRadius: commitRadius }));
        });
    }, [commits, commit, gitgraph]);
    const branchLabels = React.useMemo(() => {
        // @gitgraph/core could compute branch labels into commits directly.
        // That will make it easier to retrieve them, just like tags.
        const branches = Array.from(gitgraph.branches.values());
        return branches.map((branch) => {
            return (React.createElement(BranchLabel, { key: branch.name, gitgraph: gitgraph, branch: branch, commit: commit, ref: branchLabelRef, branchLabelX: branchLabelX }));
        });
    }, [gitgraph, commit, branchLabelX]);
    const tags = React.useMemo(() => {
        tagRefs.current = [];
        if (!commit.tags)
            return null;
        if (gitgraph.isHorizontal)
            return null;
        return commit.tags.map((tag, i) => (React.createElement(Tag, { key: `${commit.hashAbbrev}-${tag.name}`, commit: commit, tag: tag, ref: (r) => (tagRefs.current[i] = r), tagX: tagXs[i] || 0 })));
    }, [commit, gitgraph, tagXs]);
    const { x, y } = props.getWithCommitOffset(commit);
    // positionCommitsElements
    React.useLayoutEffect(() => {
        if (gitgraph.isHorizontal) {
            // Elements don't appear on horizontal mode, yet.
            return;
        }
        const padding = 10;
        let translateX = commitMessagesX;
        if (branchLabelRef.current) {
            setBranchLabelX(translateX);
            // For some reason, one paddingX is missing in BBox width.
            const branchLabelWidth = branchLabelRef.current.getBBox().width + BranchLabel.paddingX;
            translateX += branchLabelWidth + padding;
        }
        const allTagXs = tagRefs.current.map((tag) => {
            if (!tag)
                return 0;
            const tagX = translateX;
            // For some reason, one paddingX is missing in BBox width.
            const tagWidth = tag.getBBox().width + TAG_PADDING_X;
            translateX += tagWidth + padding;
            return tagX;
        });
        setTagXs(allTagXs);
        if (messageRef.current) {
            setMessageX(translateX);
        }
    }, [tagRefs, gitgraph, commitMessagesX]);
    const shouldRenderTooltip = props.currentCommitOver === commit &&
        (props.gitgraph.isHorizontal ||
            (props.gitgraph.mode === Mode.Compact &&
                commit.style.hasTooltipInCompactMode));
    if (shouldRenderTooltip) {
        props.setTooltip(React.createElement("g", { transform: `translate(${x}, ${y})` },
            React.createElement(Tooltip, { commit: commit },
                commit.hashAbbrev,
                " - ",
                commit.subject)));
    }
    return (React.createElement("g", { transform: `translate(${x}, ${y})` },
        React.createElement(Dot, { commit: commit, onMouseOver: () => {
                props.setCurrentCommitOver(commit);
                commit.onMouseOver();
            }, onMouseOut: () => {
                props.setCurrentCommitOver(null);
                props.setTooltip(null);
                commit.onMouseOut();
            } }),
        arrows,
        React.createElement("g", { transform: `translate(${-x}, 0)` },
            commit.style.message.display && (React.createElement(Message, { commit: commit, ref: messageRef, messageX: messageX })),
            branchLabels,
            tags)));
};
