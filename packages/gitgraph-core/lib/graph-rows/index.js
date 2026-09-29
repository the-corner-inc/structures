import { Mode } from "../mode";
import { CompactGraphRows } from "./compact";
import { RegularGraphRows } from "./regular";
export { createGraphRows, RegularGraphRows as GraphRows };
function createGraphRows(mode, commits) {
    return mode === Mode.Compact
        ? new CompactGraphRows(commits)
        : new RegularGraphRows(commits);
}
