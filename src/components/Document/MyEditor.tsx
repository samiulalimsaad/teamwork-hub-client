import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import { editorSupportedLanguage, editorTheme } from "./editor.config";

interface MyEditorProps {
    props: object;
    value: string;
    handleChange: (v: string) => void;
}

export const MyEditor: React.FC<MyEditorProps> = ({ value, handleChange }) => {
    // const [content, setContent] = useState<string>();
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("light");
    return (
        <div>
            <div>
                <select
                    className="capitalize"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {editorSupportedLanguage.map((l) => (
                        <option value={l} key={l} className="capitalize">
                            {l}
                        </option>
                    ))}
                </select>
                <select
                    className="capitalize"
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
                height="80vh"
                defaultLanguage="javascript"
                language={language}
                theme={theme}
                defaultValue="// some comment"
                value={value}
                onChange={handleChange}
                className="border"
            />
        </div>
    );
};
