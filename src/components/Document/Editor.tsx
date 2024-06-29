import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Quill = ReactQuill.Quill;
const Inline = Quill.import("blots/inline");

export class Highlight extends Inline {
    static create(opts) {
        const { color, id } = opts;
        const node = super.create();
        node.style.backgroundColor = color;
        node.dataset.id = id;
        return node;
    }

    static formats(node) {
        if (!node.style.backgroundColor) return null;
        return {
            color: node.style.backgroundColor,
            id: node.dataset.id,
        };
    }
}

Highlight.blotName = "highlight";
Highlight.tagName = "span"; // Required for quill
Quill.register(Highlight);

const INITIAL_WORDS =
    "This does not work.<br><br>A second \"background\" format is injecting itself into the mix. You can see a nested span tag in the html because of it. Additionally, you can see there's a second format in the contents delta, which is logged to the console for convenience.<br><br>You'll notice that selecting the highlight doesn't remove it, but if you inspect the html you'll see that the highlight span tag has actually been removed, and only the background tag remains.";

const Editor = () => {
    const [editorHtml, setEditorHtml] = useState(INITIAL_WORDS);
    const quillRef = useRef(null);

    const handleClick = () => {
        const editor = quillRef.current.getEditor();
        const selection = editor.getSelection();
        editor.formatText(selection.index, selection.length, "highlight", {
            color: "blue",
            id: "1",
        });
    };

    const handleChange = (html) => {
        setEditorHtml(html);
        if (!quillRef.current) return;
        console.log(
            "handleChange, contents:",
            quillRef.current.getEditor().getContents()
        );
    };

    const handleChangeSelection = (selection) => {
        const editor = quillRef.current.getEditor();
        editor.formatText(
            selection.index,
            selection.length,
            "highlight",
            false
        );
    };

    return (
        <div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                onChange={handleChange}
                onChangeSelection={handleChangeSelection}
                value={editorHtml}
            />
            <button onClick={handleClick}>Highlight</button>
        </div>
    );
};

export default Editor;
