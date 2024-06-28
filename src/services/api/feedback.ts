import { FeedbackInterface } from "../../interfaces/Feedback.interface";
import { API } from "../../utils/API";

export const fetchFeedbacks = (): Promise<{ data: FeedbackInterface[] }> =>
    API.get("/feedbacks");

export const fetchFeedbackByDocumentId = (
    id: string
): Promise<{ data: FeedbackInterface[] }> =>
    API.get(`/feedbacks?documentId=${id}`);

export const fetchFeedbackById = (
    id: string
): Promise<{ data: FeedbackInterface }> => API.get(`/feedbacks/${id}`);

export interface addFeedbackInterface
    extends Omit<
        FeedbackInterface,
        "_id" | "project" | "createdAt" | "updatedAt" | "createdBy"
    > {}
export const addFeedback = (
    newFeedback: addFeedbackInterface
): Promise<{ data: FeedbackInterface }> => API.post("/feedbacks", newFeedback);

export const updateFeedback = (
    id: string,
    updatedFeedback: Partial<FeedbackInterface>
): Promise<{ data: FeedbackInterface }> =>
    API.put(`/feedbacks/${id}`, updatedFeedback);

export const deleteFeedback = (id: string): Promise<void> =>
    API.delete(`/feedbacks/${id}`);
