import { FeedbackInterface } from "../../interfaces/Feedback.interface";
import { API } from "../../utils/API";

export const fetchFeedbacks = (): Promise<{ data: FeedbackInterface[] }> =>
    API.get("/feedbacks");

export const fetchFeedbackByDocumentId = (
    id: string
): Promise<{ data: FeedbackInterface[] }> => API.get(`/feedbacks/${id}`);

export const fetchFeedbackById = (
    id: string
): Promise<{ data: FeedbackInterface }> => API.get(`/feedbacks/${id}`);

export const addFeedback = (
    newFeedback: Omit<FeedbackInterface, "_id" | "documents" | "timestamp">
): Promise<{ data: FeedbackInterface }> => API.post("/feedbacks", newFeedback);

export const updateFeedback = (
    id: string,
    updatedFeedback: Partial<FeedbackInterface>
): Promise<{ data: FeedbackInterface }> =>
    API.put(`/feedbacks/${id}`, updatedFeedback);

export const deleteFeedback = (id: string): Promise<void> =>
    API.delete(`/feedbacks/${id}`);
