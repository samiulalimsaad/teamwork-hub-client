import { useContext } from "react";
import { AuthContext, AuthInfo } from "../AuthProvider";

export const useAuth = (): AuthInfo => {
    return useContext(AuthContext)!;
};
