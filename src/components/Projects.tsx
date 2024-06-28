import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ProjectInterface } from "../interfaces/Project.interface";
import { createProject, deleteProject, fetchProjects } from "../services/api";
import Project from "./Project";

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

    const handleDelete = async (id: string) => {
        await deleteProject(id);
        setProjects(projects.filter((project) => project._id !== id));
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
                    className="input input-bordered w-full "
                />

                <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    required
                />
                <button className="btn btn-accent w-full" type="submit">
                    Add Project
                </button>
            </form>
            <ul className="card w-3/5 rounded-box mx-auto space-y-8 my-8 border border-accent/10 p-4">
                {projects.map((project) => (
                    <li key={project._id}>
                        <a className="mx-auto">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    {project.title}{" "}
                                    <button
                                        className="btn btn-accent btn-xs"
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </div>
                                <Project projectId={project._id} />
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
