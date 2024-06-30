import Editor from "@monaco-editor/react";
import { useState } from "react";

const lang = [
    "javascript",
    "typescript",
    "json",
    "html",
    "css",
    "python",
    "cpp",
    "dockerfile",
    "go",
    "graphql",
    "java",
    "less",
    "markdown",
    "mdx",
    "mysql",
    "pgsql",
    "php",
    "powershell",
    "rust",
    "sql",
    "xml",
    "yaml",
    "text",
];
export function Test() {
    const [content, setContent] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [theme, setTheme] = useState("light");
    return (
        <div>
            <div>
                <select
                    className="capitalize"
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {lang.map((l) => (
                        <option value={l} key={l} className="capitalize">
                            {l}
                        </option>
                    ))}
                </select>
                <select
                    className="capitalize"
                    onChange={(e) => setTheme(e.target.value)}
                >
                    <option value="light" className="capitalize">
                        light
                    </option>
                    <option value="vs-dark" className="capitalize">
                        vs-dark
                    </option>
                </select>
            </div>
            <Editor
                height="80vh"
                defaultLanguage="javascript"
                language={language}
                theme={theme}
                defaultValue="// some comment"
                value={content}
                onChange={(e: string) => setContent(e)}
                className="border"
            />
        </div>
    );
}
