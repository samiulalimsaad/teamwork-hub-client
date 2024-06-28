import { DocumentInterface } from "../../interfaces/Document.interface";
import { API } from "../../utils/API";

export const fetchDocuments = (): Promise<{ data: DocumentInterface[] }> =>
    API.get("/documents");

export const fetchDocumentById = (
    id: string
): Promise<{ data: DocumentInterface }> => API.get(`/documents/${id}`);

export const createDocument = (
    newDocument: Omit<DocumentInterface, "_id" | "documents">
): Promise<{ data: DocumentInterface }> => API.post("/documents", newDocument);

export const updateDocument = (
    id: string,
    updatedDocument: Partial<DocumentInterface>
): Promise<{ data: DocumentInterface }> =>
    API.put(`/documents/${id}`, updatedDocument);

export const deleteDocument = (id: string): Promise<void> =>
    API.delete(`/documents/${id}`);
