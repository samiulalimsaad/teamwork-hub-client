import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createUser,
    deleteUser,
    fetchUserById,
    fetchUsers,
    logInUser,
    logOutUser,
    updateUser,
} from "../api/user";

import { UserInterface } from "../../interfaces/User.interface";

export const useFetchUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
};

export const useFetchUserById = (id: string) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchUserById(id),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            updatedUser,
        }: {
            id: string;
            updatedUser: Partial<UserInterface>;
        }) => updateUser(id, updatedUser),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useLogInUser = () => {
    return useMutation({
        mutationFn: logInUser,
    });
};

export const useLogOutUser = () => {
    return useMutation({
        mutationFn: logOutUser,
    });
};
