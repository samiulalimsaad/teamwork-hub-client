import React from "react";
import { useParams } from "react-router-dom";
import DocumentEditor from "./DocumentEditor";
import Feedback from "./Feedback";

const Project: React.FC = () => {
    const { id } = useParams();
    const { id: documentId } = useParams();

    return (
        <fieldset className="p-4 border border-accent/20">
            <div className="space-y-4">
                <DocumentEditor projectId={id!} documentId={documentId!} />
                <Feedback
                    projectId={id!}
                    documentId={documentId!}
                    userId="userId"
                />
                <div className="my-8">{/* <Chat /> */}</div>
            </div>
        </fieldset>
    );
};

export default Project;
