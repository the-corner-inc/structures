import { DEFAULT_FONT } from "./template";
import { numberOptionOr } from "./utils";
export { Tag };
class Tag {
    /**
     * Style
     */
    get style() {
        return {
            strokeColor: this.tagStyle.strokeColor || this.commitStyle.color,
            bgColor: this.tagStyle.bgColor || this.commitStyle.color,
            color: this.tagStyle.color || "white",
            font: this.tagStyle.font || this.commitStyle.message.font || DEFAULT_FONT,
            borderRadius: numberOptionOr(this.tagStyle.borderRadius, 10),
            pointerWidth: numberOptionOr(this.tagStyle.pointerWidth, 12),
        };
    }
    constructor(name, style, render, commitStyle) {
        this.name = name;
        this.tagStyle = style;
        this.commitStyle = commitStyle;
        this.render = render;
    }
}
