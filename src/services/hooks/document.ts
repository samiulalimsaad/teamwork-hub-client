import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DocumentInterface } from "../../interfaces/Document.interface";
import {
    createDocument,
    deleteDocument,
    fetchDocumentById,
    fetchDocuments,
    updateDocument,
} from "../api/document";

export const useFetchDocuments = (projectId: string) => {
    return useQuery({
        queryKey: ["documents", projectId],
        queryFn: () => fetchDocuments(projectId),
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
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createDocument,
        onSuccess: ({ data }) => {
            queryClient.invalidateQueries({ queryKey: ["documents"] });
            navigate(`/project/document/${data._id}`);
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
