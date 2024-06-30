import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import { editorSupportedLanguage, editorTheme } from "./editor.config";

interface MyEditorProps {
    value: string;
    handleChange: (v: string | undefined) => void;
}

export const MyEditor: React.FC<MyEditorProps> = ({ value, handleChange }) => {
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("light");
    return (
        <div>
            <div>
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
