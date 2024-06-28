import React, { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCreateProject, useFetchProjects } from "../services/hooks/project";

const Projects: React.FC = () => {
    const { data: projects } = useFetchProjects();
    const createProject = useCreateProject();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const title = form.projectTitle.value;
        const description = form.description.value;

        const newProject = {
            title,
            description,
        };
        createProject.mutate(newProject);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-3/5 mx-auto space-y-4">
                <input
                    type="text"
                    name="projectTitle"
                    placeholder="Title"
                    required
                    className="w-full input input-bordered "
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="w-full textarea textarea-bordered"
                    required
                />
                <button className="w-full btn btn-accent" type="submit">
                    Add Project
                </button>
            </form>
            <div>
                <h3 className="my-8 text-xl text-center">Projects</h3>
                <div className="divider"></div>
                <ul className="w-3/5 p-4 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                    {projects?.data?.map((project) => (
                        <li key={project._id}>
                            <a className="mx-auto">
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
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Projects;
