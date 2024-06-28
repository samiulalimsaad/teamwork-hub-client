import React, { ChangeEvent, useState } from "react";
import DocumentEditor from "./DocumentEditor";

interface ProjectProps {
    projectId: string;
}

const Project: React.FC<ProjectProps> = ({ projectId }) => {
    const [documentId, setDocumentId] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDocumentId(e.target.value);
    };

    return (
        <fieldset className="p-4 border border-accent/20">
            <div className="space-y-4">
                <input
                    type="text"
                    value={documentId}
                    onChange={handleChange}
                    placeholder="Document ID"
                    required
                    className="w-full input input-bordered "
                />
                <DocumentEditor projectId={projectId} documentId={documentId} />
            </div>
        </fieldset>
    );
};

export default Project;
