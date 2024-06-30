import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentInterface } from "../../interfaces/Document.interface";
import { useCreateVersion } from "../../services/hooks/version";
import { editorSupportedLanguage, editorTheme } from "./editor.config";

interface MyEditorProps {
    value: string;
    handleChange: (v: string | undefined) => void;
}

export const MyEditor: React.FC<MyEditorProps> = ({ value, handleChange }) => {
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("light");

    const { id } = useParams();
    const createVersion = useCreateVersion();

    return (
        <div>
            <div className="flex items-center justify-between">
                <select
                    className="capitalize select select-bordered"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {editorSupportedLanguage.map((l) => (
                        <option value={l} key={l} className="capitalize">
                            {l}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-info"
                    onClick={() =>
                        createVersion.mutate({
                            document: id as unknown as DocumentInterface,
                        })
                    }
                >
                    Save a a new version
                </button>
                <select
                    className="capitalize select select-bordered"
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
        </div>
    );
};
