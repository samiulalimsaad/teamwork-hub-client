import React, { ReactNode, createContext, useEffect, useState } from "react";
import { UserInterface } from "../interfaces/User.interface";
import {
    useCreateUser,
    useCurrentUser,
    useLogInUser,
    useLogOutUser,
    useUpdateUser,
} from "../services/hooks/user";
import { useModalStore } from "../store/modal";
import { useUserStore } from "../store/user";

interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthInfo {
    user: null | UserInterface;
    loading: boolean;
    createUserWithEmailAndPassword: (
        name: string,
        email: string,
        password: string
    ) => Promise<UserInterface>;
    signIn: (email: string, password: string) => Promise<UserInterface>;
    logOut: () => Promise<void>;
    updateUserProfile: (
        id: string,
        updatedFields: Partial<UserInterface>
    ) => Promise<UserInterface>;
}

export const AuthContext = createContext<AuthInfo | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const { data: me } = useCurrentUser();

    const { user, setUser, reset } = useUserStore();
    const [loading, setLoading] = useState(true);
    const { open, close } = useModalStore();
    const createUserMutation = useCreateUser();
    const signInMutation = useLogInUser();
    const logOutMutation = useLogOutUser();
    const updateUserMutation = useUpdateUser();

    useEffect(() => {
        if (me?.data) {
            setUser(me?.data);
            setLoading(false);
            close();
        }
    }, [close, me?.data, setUser]);

    const createUserWithEmailAndPassword = async (
        name: string,
        email: string,
        password: string
    ) => {
        setLoading(true);
        const newUser = {
            name,
            email,
            password,
        };
        const { data } = await createUserMutation.mutateAsync(newUser);
        setLoading(false);
        return data;
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        const credentials = {
            email,
            password,
        };
        const { data } = await signInMutation.mutateAsync(credentials);
        setUser(data);
        setLoading(false);
        close();
        return data;
    };

    const logOut = async () => {
        setLoading(true);
        await logOutMutation.mutateAsync();
        reset();
        setLoading(false);
        open();
    };

    const updateUserProfile = async (
        id: string,
        updatedFields: Partial<UserInterface>
    ) => {
        setLoading(true);
        const { data } = await updateUserMutation.mutateAsync({
            id,
            updatedUser: updatedFields,
        });
        setUser(data);
        setLoading(false);
        return data;
    };

    const authInfo: AuthInfo = {
        user,
        loading,
        createUserWithEmailAndPassword,
        signIn,
        logOut,
        updateUserProfile,
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
