import { UserInterface } from "../../interfaces/User.interface";
import { API } from "../../utils/API";

export const fetchUsers = (): Promise<{ data: UserInterface[] }> =>
    API.get("/users");

export const fetchUserById = (id: string): Promise<{ data: UserInterface }> =>
    API.get(`/users/${id}`);

export const createUser = (
    newUser: Omit<UserInterface, "_id" | "documents">
): Promise<{ data: UserInterface }> => API.post("/users/register", newUser);

export const updateUser = (
    id: string,
    updatedUser: Partial<UserInterface>
): Promise<{ data: UserInterface }> => API.put(`/users/${id}`, updatedUser);

export const deleteUser = (id: string): Promise<void> =>
    API.delete(`/users/${id}`);

export const logInUser = (
    user: Omit<UserInterface, "_id" | "documents" | "name">
): Promise<{ data: UserInterface }> => API.post("/users/login", user);

export const logOutUser = (): Promise<{ data: UserInterface }> =>
    API.post("/users/logout");
