import { CommonInterface } from "./Common.interface";
import { DocumentInterface } from "./Document.interface";
import { UserInterface } from "./User.interface";

export interface ProjectInterface extends CommonInterface {
    title: string;
    description: string;
    createdBy: UserInterface;
    documents: DocumentInterface[];
}
