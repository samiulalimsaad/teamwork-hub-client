import { CommonInterface } from "./Common.interface";
import { FeedbackInterface } from "./Feedback.interface";

export interface DocumentInterface extends CommonInterface {
    title: string;
    content: string;
    project?: string;
    feedbacks: FeedbackInterface[];
}
