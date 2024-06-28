import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentEditor from "./DocumentEditor";
import Feedback from "./Feedback";

interface ProjectProps {
    projectId: string;
}

const Project: React.FC = () => {
    const { id } = useParams();
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
                <DocumentEditor projectId={id!} documentId={documentId} />
                <Feedback
                    projectId={id!}
                    documentId={documentId}
                    userId="userId"
                />
            </div>
        </fieldset>
    );
};

export default Project;
