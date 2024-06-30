import { DiffEditor } from "@monaco-editor/react";
import React from "react";
import { useParams } from "react-router-dom";
import { VersionInterface } from "../../interfaces/Version.interface";
import { useFetchDocumentById } from "../../services/hooks/document";

interface VersionProps {
    version: VersionInterface;
    close: () => void;
}

const Diff: React.FC<VersionProps> = ({ version, close }) => {
    const { id } = useParams();
    const { data: document } = useFetchDocumentById(id!);
    return (
        <div>
            <div>
                <div className="flex items-center justify-around mb-2 font-semibold drop-shadow-md">
                    <span>Now</span>
                    <span>Old</span>
                </div>
                <DiffEditor
                    className="border"
                    height={500}
                    original={document?.data.content}
                    originalLanguage="javascript"
                    modifiedLanguage="javascript"
                    modified={version.document.content}
                />
            </div>
            <div className="mx-auto my-4">
                <button className="btn btn-info" onClick={close}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Diff;
