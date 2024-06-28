import { CommonInterface } from "./common.interface";

export interface FeedbackInterface extends CommonInterface {
    user: string;
    content: string;
}
