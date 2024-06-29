import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Document from "../components/Document";
import {
    useCreateDocument,
    useFetchDocuments,
} from "../services/hooks/document";
import { Modal } from "../utils/ui/Modal";

const Documents: React.FC = () => {
    const { id: projectId } = useParams();
    const { data: documents } = useFetchDocuments(projectId!);
    const createDocument = useCreateDocument();

    const [isOpen, setIsOpen] = useState(false);

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
            <div className="flex items-center justify-between mt-8">
                <h3 className="text-xl text-center ">Documents</h3>
                <button
                    className="btn btn-accent btn-xs"
                    // onClick={handleCreateDocument}
                    onClick={() => setIsOpen(true)}
                >
                    New
                </button>
            </div>

            <div>
                <div className="divider"></div>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {documents?.data?.map((doc) => (
                        <li key={doc._id}>
                            <Document document={doc} />
                        </li>
                    ))}
                </ul>
            </div>

            <Modal title="Do you want create a new Document?" isOpen={isOpen}>
                <div>
                    <p className="py-4 text-center">Are you agree?</p>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                        <button
                            className="btn btn-accent btn-sm"
                            onClick={handleCreateDocument}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Documents;
