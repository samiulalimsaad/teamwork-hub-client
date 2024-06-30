import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditProject from "../components/Project/EditProject";
import NewProject from "../components/Project/NewProject";
import { ProjectInterface } from "../interfaces/Project.interface";
import { useAuth } from "../providers/hooks/auth";
import { useDeleteProject, useFetchProjects } from "../services/hooks/project";
import { Modal } from "../utils/ui/Modal";

const Projects: React.FC = () => {
    const { user } = useAuth();
    const { data: projects } = useFetchProjects();
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState<ProjectInterface>();
    const [isAnimating, setIsAnimating] = useState<boolean>(true);

    useEffect(() => {
        const tout = setTimeout(() => {
            setIsAnimating(false);
        }, 4500);

        return () => {
            clearTimeout(tout);
        };
    }, []);

    const deleteProject = useDeleteProject();

    return (
        <div>
            <div className="flex items-center justify-between p-4 mt-8 bg-accent/10">
                <h3 className="text-xl text-center drop-shadow-md">Projects</h3>
                <button
                    className={`btn btn-accent btn-xs ${
                        isAnimating && !isOpen ? "animate-bounce" : ""
                    }`}
                    onClick={() => setIsOpen(true)}
                >
                    New
                </button>
            </div>
            <div className="divider"></div>
            <div>
                <div>
                    <h4 className="text-xl drop-shadow-md">My projects:</h4>

                    <ul className="p-2 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                        {projects?.data
                            ?.filter((p) => p.createdBy?.email === user?.email)
                            ?.map((project) => (
                                <li key={project._id}>
                                    <div className="p-2 mx-auto hover:bg-accent/10">
                                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                            <div>
                                                <h3 className="text-xl drop-shadow-md">
                                                    {project.title}
                                                </h3>
                                                <p className="text-xs opacity-40">
                                                    {project.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {user?.email ===
                                                    project.createdBy
                                                        ?.email && (
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
                                                )}
                                                {user?.email ===
                                                    project.createdBy
                                                        ?.email && (
                                                    <button
                                                        className="btn btn-warning btn-xs"
                                                        onClick={() =>
                                                            setEditing(project)
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                )}
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
                <div>
                    <h4 className="text-xl drop-shadow-md">Others projects:</h4>
                    <ul className="p-2 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                        {projects?.data
                            ?.filter((p) => p.createdBy?.email !== user?.email)
                            .map((project) => (
                                <li key={project._id}>
                                    <div className="p-2 mx-auto hover:bg-accent/10">
                                        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                                            <div>
                                                <div className="flex items-center gap-4">
                                                    <h3 className="text-xl drop-shadow-md">
                                                        {project.title}
                                                    </h3>
                                                    <small className="text-xs opacity-40">
                                                        createdBy:{" "}
                                                        {
                                                            project.createdBy
                                                                ?.name
                                                        }
                                                    </small>
                                                </div>
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
                                                    onClick={() =>
                                                        setEditing(project)
                                                    }
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
