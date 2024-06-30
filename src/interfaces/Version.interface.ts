import { CommonInterface } from "./Common.interface";
import { DocumentInterface } from "./Document.interface";

export interface VersionInterface extends CommonInterface {
    document: DocumentInterface;
}
