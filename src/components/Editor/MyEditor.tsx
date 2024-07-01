import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentInterface } from "../../interfaces/Document.interface";
import {
    useFetchDocumentById,
    useUpdateDocument,
} from "../../services/hooks/document";
import { useCreateVersion } from "../../services/hooks/version";
import { SOCKET } from "../../utils/SOCKET";
import Error from "../../utils/ui/Error";
import { Modal } from "../../utils/ui/Modal";
import Versions from "./Versions";
import { editorSupportedLanguage, editorTheme } from "./editor.config";

interface MyEditorProps {
    value: string;
    handleChange: (v: string | undefined) => void;
}

export const MyEditor: React.FC<MyEditorProps> = ({ value, handleChange }) => {
    const { id } = useParams();

    const createVersion = useCreateVersion();
    const updateDocument = useUpdateDocument();
    const { data: document, refetch } = useFetchDocumentById(id!);

    const [language, setLanguage] = useState(document?.data.language);
    const [theme, setTheme] = useState(document?.data.theme);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (document?.data) {
            setTheme(document.data.theme);
            setLanguage(document.data.language);
        }
    }, [document?.data]);

    useEffect(() => {
        SOCKET.on(`editorOption-${id}`, () => {
            refetch();
        });

        return () => {
            SOCKET.off(`editorOption-${id}`);
        };
    }, [document, id, refetch]);

    return (
        <div>
            <div className="md:hidden">
                <Error error="For better view Please use fullscreen" />
            </div>
            <div className="grid items-center justify-between grid-cols-1 gap-4 my-4 lg:grid-cols-4">
                <select
                    className="capitalize select select-bordered select-sm"
                    value={document?.data?.language}
                    onChange={(e) => {
                        const lang = e.target.value;
                        updateDocument.mutate({
                            id: id!,
                            updatedDocument: {
                                ...document?.data,
                                language: lang,
                            },
                        });
                        setLanguage(lang);

                        setTimeout(() => {
                            SOCKET.emit(`editorOption`, document?.data);
                        }, 500);
                    }}
                >
                    {editorSupportedLanguage.map((l) => (
                        <option value={l} key={l} className="capitalize">
                            {l}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-info btn-outline btn-sm"
                    onClick={() => setIsOpen(true)}
                >
                    Show Versions
                </button>
                <button
                    className="btn btn-accent btn-outline btn-sm"
                    onClick={() =>
                        createVersion.mutate({
                            documentId: id as unknown as string,
                            document: id as unknown as DocumentInterface,
                        })
                    }
                >
                    Commit Changes
                </button>
                <select
                    className="capitalize select select-bordered select-sm"
                    value={document?.data.theme}
                    onChange={(e) => {
                        const th = e.target.value;
                        updateDocument.mutate({
                            id: id!,
                            updatedDocument: {
                                ...document?.data,
                                theme: th,
                            },
                        });
                        setTheme(th);
                        setTimeout(() => {
                            SOCKET.emit(`editorOption`, document?.data);
                        }, 500);
                    }}
                >
                    {editorTheme.map((l) => (
                        <option value={l} key={l} className="capitalize">
                            {l}
                        </option>
                    ))}
                </select>
            </div>
            <Editor
                defaultLanguage="javascript"
                language={language}
                theme={theme}
                defaultValue="// some comment"
                value={value}
                onChange={handleChange}
                className="w-full h-[75vh] p-0 textarea textarea-bordered pb-11"
            />

            <Modal title="Versions" isOpen={isOpen}>
                <Versions documentId={id!} close={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};
