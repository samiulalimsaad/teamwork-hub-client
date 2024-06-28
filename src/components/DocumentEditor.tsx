import React, { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useDebounce from "../hooks/useDebounce";
import { DocumentInterface } from "../interfaces/Document.interface";
import {
    useFetchDocumentById,
    useUpdateDocument,
} from "../services/hooks/document";

interface DocumentEditorProps {
    projectId: string;
    documentId: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId }) => {
    const { data: document } = useFetchDocumentById(documentId);
    const updateDocument = useUpdateDocument();

    const [title, setTitle] = useState<string>(document?.data.title || "");
    const [content, setContent] = useState<string>(
        document?.data.content || ""
    );

    const updateTitle = useDebounce(updateTitleCB, 1500, [title]);
    const updateContent = useDebounce(updateContentCB, 1500, [title]);

    useEffect(() => {
        if (document?.data) {
            setTitle(document.data.title);
            setContent(document.data.content);
        }
    }, [document?.data]);

    function updateTitleCB(data: unknown) {
        updateDocument.mutate({
            id: documentId,
            updatedDocument: data as DocumentInterface,
        });
    }

    function updateContentCB(data: unknown) {
        updateDocument.mutate({
            id: documentId,
            updatedDocument: data as DocumentInterface,
        });
    }

    const handleChange = async (value: string) => {
        setContent(value);
        const updatedDocument = {
            title,
            content: value,
        };
        updateContent(updatedDocument);
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        const updatedDocument = {
            title: e.target.value,
            content,
        };
        updateTitle(updatedDocument);
    };
    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Document ID"
                required
                className="w-full input input-bordered "
            />
            <ReactQuill
                value={content}
                onChange={handleChange}
                className="w-full textarea textarea-bordered"
            />
        </div>
    );
};

export default DocumentEditor;
