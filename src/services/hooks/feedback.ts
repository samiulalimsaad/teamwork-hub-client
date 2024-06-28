import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FeedbackInterface } from "../../interfaces/Feedback.interface";
import {
    addFeedback,
    deleteFeedback,
    fetchFeedbackByDocumentId,
    fetchFeedbackById,
    fetchFeedbacks,
    updateFeedback,
} from "../api/feedback";

export const useFetchFeedbacks = () => {
    return useQuery({
        queryKey: ["feedbacks"],
        queryFn: fetchFeedbacks,
    });
};

export const useFetchFeedbackByDocumentId = (id: string) => {
    return useQuery({
        queryKey: ["feedbacks", "document", id],
        queryFn: () => fetchFeedbackByDocumentId(id),
    });
};

export const useFetchFeedbackById = (id: string) => {
    return useQuery({
        queryKey: ["feedback", id],
        queryFn: () => fetchFeedbackById(id),
    });
};

export const useAddFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFeedback,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        },
    });
};

export const useUpdateFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            updatedFeedback,
        }: {
            id: string;
            updatedFeedback: Partial<FeedbackInterface>;
        }) => updateFeedback(id, updatedFeedback),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
            queryClient.invalidateQueries({ queryKey: ["feedback", id] });
        },
    });
};

export const useDeleteFeedback = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteFeedback(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
        },
    });
};
