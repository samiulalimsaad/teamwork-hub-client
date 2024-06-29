import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = ReactQuill.Quill;
const Inline = Quill.import("blots/inline");

export class Highlight extends Inline {
    static create(opts: { color: unknown; id: unknown }) {
        const { color, id } = opts;
        const node = super.create();
        node.style.backgroundColor = color;
        node.dataset.id = id;
        return node;
    }

    static formats(node: {
        style: { backgroundColor: unknown };
        dataset: { id: unknown };
    }) {
        if (!node.style.backgroundColor) return null;
        return {
            color: node.style.backgroundColor,
            id: node.dataset.id,
        };
    }
}

Highlight.blotName = "highlight";
Highlight.tagName = "span"; // Required for quill
