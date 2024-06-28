import { UserInterface } from "./User.interface";
import { CommonInterface } from "./common.interface";

export interface FeedbackInterface extends CommonInterface {
    content: string;
    createdBy: UserInterface;
    project: string;
    document: string;
}
