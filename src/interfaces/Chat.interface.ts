import { CommonInterface } from "./Common.interface";
import { UserInterface } from "./User.interface";

export interface ChatInterface extends CommonInterface {
    content: string;
    createdBy: UserInterface;
    project: string;
    document: string;
}
