import { CommonInterface } from "./Common.interface";
import { UserInterface } from "./User.interface";

export interface FeedbackInterface extends CommonInterface {
    content: string;
    createdBy: UserInterface;
    project: string;
    document: string;
}
