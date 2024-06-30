import { VersionInterface } from "../../interfaces/Version.interface";
import { API } from "../../utils/API";

export const fetchVersions = (
    projectId: string
): Promise<{ data: VersionInterface[] }> =>
    API.get(`/versions?projectId=${projectId}`);

export const fetchVersionById = (
    id: string
): Promise<{ data: VersionInterface }> => API.get(`/versions/${id}`);

export interface createVersionInterface
    extends Omit<
        VersionInterface,
        "_id" | "feedbacks" | "createdAt" | "updatedAt"
    > {}

export const createVersion = (
    newVersion: createVersionInterface
): Promise<{ data: VersionInterface }> => API.post("/versions", newVersion);

export const updateVersion = (
    id: string,
    updatedVersion: Partial<VersionInterface>
): Promise<{ data: VersionInterface }> =>
    API.put(`/versions/${id}`, updatedVersion);

export const deleteVersion = (id: string): Promise<void> =>
    API.delete(`/versions/${id}`);
