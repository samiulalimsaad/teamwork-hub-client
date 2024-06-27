import { DocumentInterface } from "./Document.interface";

export interface ProjectInterface {
    _id: string;
    title: string;
    description: string;
    documents: DocumentInterface[];
}
