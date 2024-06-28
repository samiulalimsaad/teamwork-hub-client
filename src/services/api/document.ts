import { DocumentInterface } from "../../interfaces/Document.interface";
import { API } from "../../utils/API";

export const fetchDocuments = (
    projectId: string
): Promise<{ data: DocumentInterface[] }> =>
    API.get(`/documents?projectId=${projectId}`);

export const fetchDocumentById = (
    id: string
): Promise<{ data: DocumentInterface }> => API.get(`/documents/${id}`);

export interface createDocumentInterface
    extends Omit<
        DocumentInterface,
        "_id" | "feedbacks" | "createdAt" | "updatedAt"
    > {}

export const createDocument = (
    newDocument: createDocumentInterface
): Promise<{ data: DocumentInterface }> => API.post("/documents", newDocument);

export const updateDocument = (
    id: string,
    updatedDocument: Partial<DocumentInterface>
): Promise<{ data: DocumentInterface }> =>
    API.put(`/documents/${id}`, updatedDocument);

export const deleteDocument = (id: string): Promise<void> =>
    API.delete(`/documents/${id}`);
