import * as React from "react";
import { ReactSvgElement } from "./types";
import { Commit } from "@gitgraph/core";
interface MessageProps {
    commit: Commit<ReactSvgElement>;
    messageX: number;
}
export declare const Message: React.ForwardRefExoticComponent<MessageProps & React.RefAttributes<SVGGElement>>;
export {};
