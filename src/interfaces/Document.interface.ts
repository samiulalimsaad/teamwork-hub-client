import { FeedbackInterface } from "./Feedback.interface";

export interface DocumentInterface {
    _id: string;
    title: string;
    content: string;
    lastUpdated: Date;
    feedback: FeedbackInterface[];
}
