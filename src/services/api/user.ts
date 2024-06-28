import { UserInterface } from "../../interfaces/User.interface";
import { API } from "../../utils/API";

export const fetchUsers = (): Promise<{ data: UserInterface[] }> =>
    API.get("/users");

export const getCurrentUser = (): Promise<{ data: UserInterface }> =>
    API.get("/currentUser");

export const fetchUserById = (id: string): Promise<{ data: UserInterface }> =>
    API.get(`/users/${id}`);

export interface createUserInterface
    extends Omit<
        UserInterface,
        "_id" | "projects" | "createdAt" | "updatedAt"
    > {}

export const createUser = (
    newUser: createUserInterface
): Promise<{ data: UserInterface }> => API.post("/users/register", newUser);

export const updateUser = (
    id: string,
    updatedUser: Partial<UserInterface>
): Promise<{ data: UserInterface }> => API.put(`/users/${id}`, updatedUser);

export const deleteUser = (id: string): Promise<void> =>
    API.delete(`/users/${id}`);

export interface logInUserInterface
    extends Omit<
        UserInterface,
        "_id" | "projects" | "createdAt" | "updatedAt" | "name"
    > {}

export const logInUser = (
    user: logInUserInterface
): Promise<{ data: UserInterface }> => API.post("/users/login", user);

export const logOutUser = (): Promise<{ data: UserInterface }> =>
    API.post("/users/logout");
