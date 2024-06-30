import { CommonInterface } from "./Common.interface";
import { FeedbackInterface } from "./Feedback.interface";

export interface VersionInterface extends CommonInterface {
    title: string;
    content: string;
    project?: string;
    feedbacks: FeedbackInterface[];
}
