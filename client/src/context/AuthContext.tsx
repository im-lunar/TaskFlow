import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCurrentUser } from "../services/auth.services";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider ({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem("taskflow_token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try{
            const response = await getCurrentUser();

            setUser(response.user);
        } catch (error) {
            console.error(error);

            localStorage.removeItem("taskflow_token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (token:string) => {
        localStorage.setItem("taskflow_token", token);

        await loadUser();
    };

    const logout = () => {
        localStorage.removeItem("taskflow_token");
        setUser(null);
    };
    
    useEffect(() => {
        loadUser();
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}