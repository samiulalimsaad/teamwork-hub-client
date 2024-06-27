import React, { ChangeEvent, useState } from "react";

interface ProjectProps {
    projectId: string;
}

const Project: React.FC<ProjectProps> = ({ projectId }) => {
    const [documentId, setDocumentId] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDocumentId(e.target.value);
    };

    return (
        <fieldset className="border border-accent/20 p-4">
            <div className="space-y-4">
                <input
                    type="text"
                    value={documentId}
                    onChange={handleChange}
                    placeholder="Document ID"
                    required
                    className="input input-bordered w-full "
                />
            </div>
        </fieldset>
    );
};

export default Project;
