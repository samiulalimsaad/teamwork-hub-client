import { create } from "zustand";

interface SavingStore {
    loading: boolean;
    startLoading: () => void;
    reset: () => void;
}

export const useSavingStore = create<SavingStore>()((set) => ({
    loading: false,
    startLoading() {
        set(() => ({ loading: true }));
    },
    reset() {
        set(() => ({ loading: false }));
    },
}));
