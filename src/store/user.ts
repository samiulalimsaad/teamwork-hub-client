import { create } from "zustand";
import { UserInterface } from "../interfaces/User.interface";

interface UserStore {
    user: UserInterface | null;
    setUser: (u: UserInterface) => void;
    reset: () => void;
}

export const useUserStore = create<UserStore>()((set) => ({
    user: null,
    setUser(u: UserInterface) {
        set(() => ({ user: u }));
    },
    reset() {
        set(() => ({ user: null }));
    },
}));
