import { ProjectInterface } from "../../interfaces/Project.interface";
import { API } from "../../utils/API";

export const fetchProjects = (): Promise<{ data: ProjectInterface[] }> =>
    API.get("/projects");

export const fetchProjectById = (
    id: string
): Promise<{ data: ProjectInterface }> => API.get(`/projects/${id}`);

export interface createProjectInterface
    extends Omit<
        ProjectInterface,
        "_id" | "documents" | "createdAt" | "createdBy" | "updatedAt"
    > {}

export const createProject = (
    newProject: createProjectInterface
): Promise<{ data: ProjectInterface }> => API.post("/projects", newProject);

export const updateProject = (
    id: string,
    updatedProject: Partial<ProjectInterface>
): Promise<{ data: ProjectInterface }> =>
    API.put(`/projects/${id}`, updatedProject);

export const deleteProject = (id: string): Promise<void> =>
    API.delete(`/projects/${id}`);
