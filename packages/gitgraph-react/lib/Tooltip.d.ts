import * as React from "react";
import { Commit } from "@gitgraph/core";
export declare class Tooltip extends React.Component<{
    commit: Commit<React.ReactElement<SVGElement>>;
}, {
    textWidth: number;
}> {
    static readonly padding = 10;
    readonly state: {
        textWidth: number;
    };
    private $text;
    componentDidMount(): void;
    render(): JSX.Element;
}
