import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import useDebounce from "../../hooks/useDebounce";
import { DocumentInterface } from "../../interfaces/Document.interface";
import { useAuth } from "../../providers/hooks/auth";
import {
    useFetchDocumentById,
    useUpdateDocument,
} from "../../services/hooks/document";
import { Highlight } from "../../utils/CustomQuill";
import { SOCKET } from "../../utils/SOCKET";
import { MyEditor } from "./MyEditor";

Quill.register(Highlight);

interface DocumentEditorProps {
    documentId: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId }) => {
    const { user } = useAuth();
    const { data: document } = useFetchDocumentById(documentId);
    const updateDocument = useUpdateDocument();

    const editorRef = useRef<ReactQuill>(null);
    const [title, setTitle] = useState<string>(document?.data?.title || "");
    const [content, setContent] = useState<string>(
        document?.data?.content || ""
    );

    const updateTitle = useDebounce(updateTitleCB, 1000, [title]);
    const updateContent = useDebounce(updateContentCB, 1000, [content]);

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
        SOCKET.emit(`joinDocument`, {
            documentId,
            user,
        });

        let timeout: NodeJS.Timeout | null = null;
        SOCKET.on(`documentEdited-${documentId}`, (data: DocumentInterface) => {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                setContent(data.content);
                setTitle(data.title);
            }, 50);
        });

        return () => {
            SOCKET.emit("leaveDocument", { documentId });
            SOCKET.off(`documentEdited-${documentId}`);
        };
    }, [documentId, user]);

    const handleChange = (value: string) => {
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
                className="w-full input input-bordered bg-accent/20"
            />
            <MyEditor
                // ref={editorRef}
                value={content}
                handleChange={handleChange}
                className="w-full h-[85vh] p-0 textarea textarea-bordered pb-11"
            />
        </div>
    );
};

export default DocumentEditor;
