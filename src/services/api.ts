import axios from "axios";
import { ProjectInterface } from "../interfaces/Project.interface";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchProjects = (): Promise<{ data: ProjectInterface[] }> =>
    API.get("/projects");

export const createProject = (
    newProject: Omit<ProjectInterface, "_id" | "documents">
): Promise<{ data: ProjectInterface }> => API.post("/projects", newProject);

export const updateProject = (
    id: string,
    updatedProject: Partial<ProjectInterface>
): Promise<{ data: ProjectInterface }> =>
    API.put(`/projects/${id}`, updatedProject);

export const deleteProject = (id: string): Promise<void> =>
    API.delete(`/projects/${id}`);
