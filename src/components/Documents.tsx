import React from "react";
import { Link, useParams } from "react-router-dom";
import {
    useCreateDocument,
    useFetchDocuments,
} from "../services/hooks/document";

const Documents: React.FC = () => {
    const { id: projectId } = useParams();
    const { data: documents } = useFetchDocuments(projectId!);
    const createDocument = useCreateDocument();

    const handleCreateDocument = async () => {
        const newDocument = {
            title: "Untitled",
            content: " ",
            project: projectId,
        };
        createDocument.mutate(newDocument);
    };

    return (
        <div>
            <div>
                <button
                    className="w-full btn btn-accent"
                    onClick={handleCreateDocument}
                >
                    New Document
                </button>
            </div>

            <div>
                <h3 className="my-8 text-xl text-center">Projects</h3>
                <div className="divider"></div>
                <ul className="w-3/5 p-4 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                    {documents?.data?.map((doc) => (
                        <li key={doc._id}>
                            <a className="mx-auto">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        {doc.title}{" "}
                                        <Link
                                            to={`/project/document/${doc._id}`}
                                            className="btn btn-accent btn-xs"
                                        >
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                                <div className="divider before:bg-accent/20 after:bg-accent/20"></div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Documents;
