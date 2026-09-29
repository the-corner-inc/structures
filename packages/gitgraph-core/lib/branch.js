import { BranchUserApi } from "./user-api/branch-user-api";
export { DELETED_BRANCH_NAME, createDeletedBranch, Branch, };
const DELETED_BRANCH_NAME = "";
class Branch {
    constructor(options) {
        this.gitgraph = options.gitgraph;
        this.name = options.name;
        this.style = options.style;
        this.parentCommitHash = options.parentCommitHash;
        this.commitDefaultOptions = options.commitDefaultOptions || { style: {} };
        this.onGraphUpdate = options.onGraphUpdate;
        this.renderLabel = options.renderLabel;
    }
    /**
     * Return the API to manipulate Gitgraph branch as a user.
     */
    getUserApi() {
        return new BranchUserApi(this, this.gitgraph, this.onGraphUpdate);
    }
    /**
     * Return true if branch was deleted.
     */
    isDeleted() {
        return this.name === DELETED_BRANCH_NAME;
    }
}
function createDeletedBranch(gitgraph, style, onGraphUpdate) {
    return new Branch({
        name: DELETED_BRANCH_NAME,
        gitgraph,
        style,
        onGraphUpdate,
    });
}
