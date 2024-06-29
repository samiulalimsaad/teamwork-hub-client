import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ChatInterface } from "../../interfaces/Chat.interface";
import {
    addChat,
    deleteChat,
    fetchChatByDocumentId,
    fetchChatById,
    fetchChats,
    updateChat,
} from "../api/chat";

export const useFetchChats = () => {
    return useQuery({
        queryKey: ["Chats"],
        queryFn: fetchChats,
    });
};

export const useFetchChatByDocumentId = (id: string) => {
    return useQuery({
        queryKey: ["Chats", id],
        queryFn: () => fetchChatByDocumentId(id),
    });
};

export const useFetchChatById = (id: string) => {
    return useQuery({
        queryKey: ["Chat", id],
        queryFn: () => fetchChatById(id),
    });
};

export const useAddChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addChat,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Chats"] });
            toast.success("Chat added successfully!");
        },
    });
};

export const useUpdateChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            updatedChat,
        }: {
            id: string;
            updatedChat: Partial<ChatInterface>;
        }) => updateChat(id, updatedChat),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["Chats"] });
            queryClient.invalidateQueries({ queryKey: ["Chat", id] });
        },
    });
};

export const useDeleteChat = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteChat(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Chats"] });
        },
    });
};
