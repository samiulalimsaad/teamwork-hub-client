import { FeedbackInterface } from "./Feedback.interface";
import { CommonInterface } from "./common.interface";

export interface DocumentInterface extends CommonInterface {
    title: string;
    content: string;
    project?: string;
    feedbacks: FeedbackInterface[];
}
