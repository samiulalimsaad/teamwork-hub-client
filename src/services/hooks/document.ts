import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentInterface } from "../../interfaces/Document.interface";
import {
    createDocument,
    deleteDocument,
    fetchDocumentById,
    fetchDocuments,
    updateDocument,
} from "../api/document";

export const useFetchDocuments = () => {
    return useQuery({
        queryKey: ["documents"],
        queryFn: fetchDocuments,
    });
};

export const useFetchDocumentById = (id: string) => {
    return useQuery({
        queryKey: ["document", id],
        queryFn: () => fetchDocumentById(id),
    });
};

export const useCreateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDocument,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};

export const useUpdateDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            updatedDocument,
        }: {
            id: string;
            updatedDocument: Partial<DocumentInterface>;
        }) => updateDocument(id, updatedDocument),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            queryClient.invalidateQueries({ queryKey: ["document", id] });
        },
    });
};

export const useDeleteDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteDocument(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
        },
    });
};
