import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditProject from "../components/Project/EditProject";
import NewProject from "../components/Project/NewProject";
import { ProjectInterface } from "../interfaces/Project.interface";
import { useDeleteProject, useFetchProjects } from "../services/hooks/project";
import { Modal } from "../utils/ui/Modal";

const Projects: React.FC = () => {
    const { data: projects } = useFetchProjects();
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState<ProjectInterface>();
    const deleteProject = useDeleteProject();

    return (
        <div>
            <div className="flex items-center justify-between p-4 mt-8 bg-accent/10">
                <h3 className="text-xl text-center ">Projects</h3>
                <button
                    className="btn btn-accent btn-xs"
                    onClick={() => setIsOpen(true)}
                >
                    New
                </button>
            </div>
            <div className="divider"></div>
            <div>
                <ul className="p-2 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                    {projects?.data?.map((project) => (
                        <li key={project._id}>
                            <div className="p-2 mx-auto hover:bg-accent/10">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs opacity-40">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="btn btn-error btn-xs"
                                            onClick={() =>
                                                deleteProject.mutate(
                                                    project._id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-warning btn-xs"
                                            onClick={() => setEditing(project)}
                                        >
                                            Edit
                                        </button>
                                        <Link
                                            to={`/project/${project._id}`}
                                            className="btn btn-accent btn-xs"
                                        >
                                            details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="my-0 divider before:bg-accent/20 after:bg-accent/20"></div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal title="Create a new Project?" isOpen={isOpen}>
                <NewProject close={() => setIsOpen(false)} />
            </Modal>
            {editing?._id && (
                <Modal title="Editing Project" isOpen={!!editing._id}>
                    <EditProject
                        close={() => setEditing(undefined)}
                        projectId={editing?._id}
                    />
                </Modal>
            )}
        </div>
    );
};

export default Projects;
