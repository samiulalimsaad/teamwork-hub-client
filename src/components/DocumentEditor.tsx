import React, { ChangeEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useDebounce from "../hooks/useDebounce";
import { DocumentInterface } from "../interfaces/Document.interface";
import {
    useFetchDocumentById,
    useUpdateDocument,
} from "../services/hooks/document";
import { SOCKET } from "../utils/SOCKET";

interface DocumentEditorProps {
    projectId: string;
    documentId: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId }) => {
    const { data: document } = useFetchDocumentById(documentId);
    const updateDocument = useUpdateDocument();

    const [title, setTitle] = useState<string>(document?.data?.title || "");
    const [content, setContent] = useState<string>(
        document?.data?.content || ""
    );

    const updateTitle = useDebounce(updateTitleCB, 1500, [title]);
    const updateContent = useDebounce(updateContentCB, 1500, [content]);

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

    useEffect(() => {
        SOCKET.emit("joinDocument", { documentId });

        SOCKET.on("documentEdited", (data: DocumentInterface) => {
            console.log(data);
            if (data._id === documentId) {
                setContent(data.content);
                setTitle(data.title);
            }
        });

        return () => {
            SOCKET.emit("leaveDocument", { documentId });
            SOCKET.off("documentEdited");
        };
    }, [documentId]);

    const handleChange = async (value: string) => {
        setContent(value);
        const updatedDocument = {
            title,
            content: value,
        };
        updateContent(updatedDocument);
        SOCKET.emit("editDocument", {
            _id: documentId,
            title,
            content: value,
        });
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        const updatedDocument = {
            title: e.target.value,
            content,
        };
        updateTitle(updatedDocument);
        SOCKET.emit("editDocument", {
            _id: documentId,
            title: e.target.value,
            content,
        });
    };

    return (
        <div>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Document title"
                required
                className="w-full input input-bordered"
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
