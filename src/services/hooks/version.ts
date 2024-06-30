import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { VersionInterface } from "../../interfaces/Version.interface";
import {
    createVersion,
    deleteVersion,
    fetchVersionById,
    fetchVersions,
    updateVersion,
} from "../api/version";

export const useFetchVersions = (projectId: string) => {
    return useQuery({
        queryKey: ["versions", projectId],
        queryFn: () => fetchVersions(projectId),
    });
};

export const useFetchVersionById = (id: string) => {
    return useQuery({
        queryKey: ["version"],
        queryFn: () => fetchVersionById(id),
    });
};

export const useCreateVersion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createVersion,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["versions"] });
            toast.success("Version added successfully!");
        },
    });
};

export const useUpdateVersion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            updatedVersion,
        }: {
            id: string;
            updatedVersion: Partial<VersionInterface>;
        }) => updateVersion(id, updatedVersion),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["versions"] });
            queryClient.invalidateQueries({ queryKey: ["version", id] });
        },
    });
};

export const useDeleteVersion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteVersion(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["version"] });
            queryClient.invalidateQueries({ queryKey: ["version", id] });
        },
    });
};
