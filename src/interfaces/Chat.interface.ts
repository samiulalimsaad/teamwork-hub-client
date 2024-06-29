import { UserInterface } from "./User.interface";
import { CommonInterface } from "./common.interface";

export interface ChatInterface extends CommonInterface {
    content: string;
    createdBy: UserInterface;
    project: string;
    document: string;
}
