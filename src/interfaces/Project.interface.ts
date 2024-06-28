import { DocumentInterface } from "./Document.interface";
import { CommonInterface } from "./common.interface";

export interface ProjectInterface extends CommonInterface {
    title: string;
    description: string;
    documents: DocumentInterface[];
}
