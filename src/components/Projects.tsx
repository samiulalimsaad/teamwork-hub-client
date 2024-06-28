import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createProject } from "../services/api/project";
import { useFetchProjects } from "../services/hooks/project";

const initialState = {
    title: "",
    description: "",
};

const Projects: React.FC = () => {
    const { data: projects, refetch } = useFetchProjects();
    const [newProject, setNewProject] =
        useState<typeof initialState>(initialState);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createProject(newProject);
        await refetch();
        setNewProject({ title: "", description: "" });
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-3/5 mx-auto space-y-4">
                <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="w-full input input-bordered "
                />

                <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleChange}
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
