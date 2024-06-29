import { ChatInterface } from "../../interfaces/Chat.interface";
import { API } from "../../utils/API";

export const fetchChats = (): Promise<{ data: ChatInterface[] }> =>
    API.get("/chats");

export const fetchChatByDocumentId = (
    id: string
): Promise<{ data: ChatInterface[] }> => API.get(`/chats?documentId=${id}`);

export const fetchChatById = (id: string): Promise<{ data: ChatInterface }> =>
    API.get(`/chats/${id}`);

export interface addChatInterface
    extends Omit<
        ChatInterface,
        "_id" | "project" | "createdAt" | "updatedAt" | "createdBy"
    > {}
export const addChat = (
    newChat: addChatInterface
): Promise<{ data: ChatInterface }> => API.post("/chats", newChat);

export const updateChat = (
    id: string,
    updatedChat: Partial<ChatInterface>
): Promise<{ data: ChatInterface }> => API.put(`/chats/${id}`, updatedChat);

export const deleteChat = (id: string): Promise<void> =>
    API.delete(`/chats/${id}`);
