import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateDocument } from "../services/api";

interface DocumentEditorProps {
    projectId: string;
    documentId: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({
    projectId,
    documentId,
}) => {
    const [content, setContent] = useState<string>("");

    const handleChange = async (value: string) => {
        setContent(value);

        await updateDocument(projectId, documentId, { content: value });
    };

    return (
        <ReactQuill
            value={content}
            onChange={handleChange}
            className="w-full textarea textarea-bordered"
        />
    );
};

export default DocumentEditor;
