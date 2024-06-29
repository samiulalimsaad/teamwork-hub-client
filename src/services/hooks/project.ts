import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ProjectInterface } from "../../interfaces/Project.interface";
import {
    createProject,
    deleteProject,
    fetchProjectById,
    fetchProjects,
    updateProject,
} from "../api/project";

export const useFetchProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });
};

export const useFetchProjectById = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => fetchProjectById(id),
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("New Project created successfully!");
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            updatedProject,
        }: {
            id: string;
            updatedProject: Partial<ProjectInterface>;
        }) => updateProject(id, updatedProject),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", id] });
            toast.success("Project updated successfully!");
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteProject(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success("Project deleted successfully!");
        },
    });
};
