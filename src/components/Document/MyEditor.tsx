import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentInterface } from "../../interfaces/Document.interface";
import { useCreateVersion } from "../../services/hooks/version";
import Error from "../../utils/ui/Error";
import { Modal } from "../../utils/ui/Modal";
import Versions from "./Versions";
import { editorSupportedLanguage, editorTheme } from "./editor.config";

interface MyEditorProps {
    value: string;
    handleChange: (v: string | undefined) => void;
}

export const MyEditor: React.FC<MyEditorProps> = ({ value, handleChange }) => {
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("light");
    const [isOpen, setIsOpen] = useState(false);

    const { id } = useParams();
    const createVersion = useCreateVersion();

    return (
        <div>
            <div className="md:hidden">
                <Error error="For better view Please use fullscreen" />
            </div>
            <div className="grid items-center justify-between grid-cols-1 gap-4 my-4 lg:grid-cols-4">
                <select
                    className="capitalize select select-bordered select-sm"
                    onChange={(e) => setLanguage(e.target.value)}
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
                    Save a a New Version
                </button>
                <select
                    className="capitalize select select-bordered select-sm"
                    onChange={(e) => setTheme(e.target.value)}
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
