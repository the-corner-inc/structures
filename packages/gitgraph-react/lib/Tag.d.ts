import * as React from "react";
import { Tag as CoreTag, Commit } from "@gitgraph/core";
import { ReactSvgElement } from "./types";
interface BaseTagProps {
    tag: CoreTag<React.ReactElement<SVGElement>>;
}
export declare const TAG_PADDING_X = 10;
export declare const TAG_PADDING_Y = 5;
interface TagProps extends BaseTagProps {
    commit: Commit<ReactSvgElement>;
    tagX: number;
}
export declare const Tag: React.ForwardRefExoticComponent<TagProps & React.RefAttributes<SVGGElement>>;
export {};
