import { UserInterface } from "../../interfaces/User.interface";
import { API } from "../../utils/API";

export const fetchUsers = (): Promise<{ data: UserInterface[] }> =>
    API.get("/user");

export const fetchUserById = (id: string): Promise<{ data: UserInterface }> =>
    API.get(`/user/${id}`);

export const createUser = (
    newUser: Omit<UserInterface, "_id" | "documents">
): Promise<{ data: UserInterface }> => API.post("/register", newUser);

export const updateUser = (
    id: string,
    updatedUser: Partial<UserInterface>
): Promise<{ data: UserInterface }> => API.put(`/user/${id}`, updatedUser);

export const deleteUser = (id: string): Promise<void> =>
    API.delete(`/user/${id}`);

export const logInUser = (
    user: Omit<UserInterface, "_id" | "documents" | "name">
): Promise<{ data: UserInterface }> => API.post("/login", user);

export const logOutUser = (): Promise<{ data: UserInterface }> =>
    API.post("/logout");
