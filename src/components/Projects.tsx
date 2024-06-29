import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchProjects } from "../services/hooks/project";
import { Modal } from "../utils/ui/Modal";
import NewProject from "./newProject";

const Projects: React.FC = () => {
    const { data: projects } = useFetchProjects();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className="flex items-center justify-between mt-8">
                <h3 className="text-xl text-center ">Projects</h3>
                <button
                    className="btn btn-accent btn-xs"
                    // onClick={handleCreateDocument}
                    onClick={() => setIsOpen(true)}
                >
                    New
                </button>
            </div>
            <div className="divider"></div>
            <div>
                <ul className="w-3/5 p-4 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                    {projects?.data?.map((project) => (
                        <li key={project._id}>
                            <div className="mx-auto ">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        {project.title}{" "}
                                        <Link
                                            to={`/project/${project._id}`}
                                            className="btn btn-accent btn-xs"
                                        >
                                            details
                                        </Link>
                                    </div>
                                </div>
                                <div className="divider before:bg-accent/20 after:bg-accent/20"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Modal title="Create a new Project?" isOpen={isOpen}>
                <NewProject close={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
};

export default Projects;
