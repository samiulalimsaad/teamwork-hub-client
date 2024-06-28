import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectInterface } from "../interfaces/Project.interface";
import { createProject, fetchProjects } from "../services/api/project";

const initialState = {
    title: "",
    description: "",
};

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<ProjectInterface[]>([]);
    const [newProject, setNewProject] =
        useState<typeof initialState>(initialState);

    useEffect(() => {
        const getProjects = async () => {
            const response = await fetchProjects();
            setProjects(response.data);
        };
        getProjects();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await createProject(newProject);
        setProjects([...projects, response.data]);
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
            <ul className="w-3/5 p-4 mx-auto my-8 space-y-8 border card rounded-box border-accent/10">
                {projects.map((project) => (
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
    );
};

export default Projects;
