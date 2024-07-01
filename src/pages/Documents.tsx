import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Document from "../components/Document";
import {
    editorSupportedLanguage,
    editorTheme,
} from "../components/Editor/editor.config";
import EditProject from "../components/Project/EditProject";
import { ProjectInterface } from "../interfaces/Project.interface";
import { useAuth } from "../providers/hooks/auth";
import {
    useCreateDocument,
    useFetchDocuments,
} from "../services/hooks/document";
import {
    useDeleteProject,
    useFetchProjectById,
} from "../services/hooks/project";
import { Modal } from "../utils/ui/Modal";

const Documents: React.FC = () => {
    const { user } = useAuth();
    const { id: projectId } = useParams();
    const { data: project } = useFetchProjectById(projectId!);
    const { data: documents } = useFetchDocuments(projectId!);
    const createDocument = useCreateDocument();
    const [editing, setEditing] = useState<ProjectInterface>();
    const [isOpen, setIsOpen] = useState(false);
    const [deleting, setDeleting] = useState<ProjectInterface>();

    const deleteProject = useDeleteProject();

    const handleCreateDocument = async () => {
        const newDocument = {
            title: "Untitled",
            content: " ",
            project: projectId,
            theme: editorTheme[0],
            language: editorSupportedLanguage[0],
        };
        createDocument.mutate(newDocument);
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-between mt-8 md:flex-row">
                <h3 className="text-xl text-center ">Documents</h3>
                <div className="flex flex-col items-center gap-2 my-4 smd:my-0 md:flex-row">
                    {user?.email === project?.data.createdBy?.email && (
                        <button
                            className="btn btn-error btn-xs"
                            onClick={() => setDeleting(project?.data)}
                        >
                            Delete project
                        </button>
                    )}
                    {user?.email === project?.data?.createdBy?.email && (
                        <button
                            className="btn btn-warning btn-xs"
                            onClick={() => setEditing(project?.data)}
                        >
                            Edit project
                        </button>
                    )}
                    <button
                        className="btn btn-accent btn-xs"
                        // onClick={handleCreateDocument}
                        onClick={() => setIsOpen(true)}
                    >
                        New Document
                    </button>
                </div>
            </div>
            <div>
                <div className="divider"></div>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {documents?.data?.map((doc) => (
                        <li key={doc._id}>
                            <Document document={doc} />
                        </li>
                    ))}
                </ul>
            </div>
            <Modal title="Do you want create a new Document?" isOpen={isOpen}>
                <div>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            className="btn btn-info btn-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            No
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
            {editing?._id && (
                <Modal title="Editing Project" isOpen={!!editing._id}>
                    <EditProject
                        close={() => setEditing(undefined)}
                        projectId={editing?._id}
                    />
                </Modal>
            )}

            {deleting?._id && (
                <Modal
                    title="Do you want to delete the Project?"
                    isOpen={!!deleting._id}
                >
                    <div>
                        <div className="flex items-center justify-center gap-4">
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => setDeleting(undefined)}
                            >
                                No
                            </button>
                            <button
                                className="btn btn-error btn-sm"
                                onClick={() =>
                                    deleteProject.mutate(deleting._id)
                                }
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Documents;
