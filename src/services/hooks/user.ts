import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createUser,
    deleteUser,
    fetchUserById,
    fetchUsers,
    getCurrentUser,
    logInUser,
    logOutUser,
    updateUser,
} from "../api/user";

import { toast } from "react-toastify";
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
            toast.success("User created successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
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
            toast.success("User info updated!");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.warn("User deleted successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useLogInUser = () => {
    return useMutation({
        mutationFn: logInUser,
        onSuccess: () => {
            toast.success("Successfully Logged in!");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useLogOutUser = () => {
    return useMutation({
        mutationFn: logOutUser,
        onSuccess: () => {
            toast.success("User created successfully!");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["getCurrentUser"],
        queryFn: getCurrentUser,
    });
};
