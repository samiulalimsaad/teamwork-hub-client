import React from "react";
import { useParams } from "react-router-dom";
import DocumentEditor from "../components/DocumentEditor";
import Feedback from "../components/Feedback";

const Project: React.FC = () => {
    const { id } = useParams();
    const { id: documentId } = useParams();

    return (
        <fieldset className="h-[calc(100vh-4rem)] p-4">
            <div className="grid h-full grid-cols-1 sm:gap-4 sm:grid-cols-12">
                <div className="h-full col-span-8">
                    <DocumentEditor projectId={id!} documentId={documentId!} />
                </div>
                <div className="col-span-4 border">
                    <Feedback
                        projectId={id!}
                        documentId={documentId!}
                        userId="userId"
                    />
                </div>
                <div className="my-8">{/* <Chat /> */}</div>
            </div>
        </fieldset>
    );
};

export default Project;
