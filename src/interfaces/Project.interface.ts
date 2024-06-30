import { DocumentInterface } from "./Document.interface";
import { UserInterface } from "./User.interface";
import { CommonInterface } from "./common.interface";

export interface ProjectInterface extends CommonInterface {
    title: string;
    description: string;
    createdBy: UserInterface;
    documents: DocumentInterface[];
}
