import * as React from "react";
import { Commit } from "@gitgraph/core";
export interface DotProps {
    commit: Commit<React.ReactElement<SVGElement>>;
    onMouseOver: () => void;
    onMouseOut: () => void;
}
export declare const Dot: React.FC<DotProps>;
