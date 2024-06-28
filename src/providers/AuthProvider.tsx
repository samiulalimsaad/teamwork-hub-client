import { ReactNode, createContext, useState } from "react";
import { UserInterface } from "../interfaces/User.interface";
import {
    useCreateUser,
    useLogInUser,
    useLogOutUser,
    useUpdateUser,
} from "../services/hooks/user";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthInfo {
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
    const [user, setUser] = useState<UserInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const createUserMutation = useCreateUser();
    const signInMutation = useLogInUser();
    const logOutMutation = useLogOutUser();
    const updateUserMutation = useUpdateUser();

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
        setUser(data);
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
        return data;
    };

    const logOut = async () => {
        setLoading(true);
        await logOutMutation.mutateAsync();
        setLoading(false);
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
