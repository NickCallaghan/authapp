import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import * as api from "@/utils/api";

const JWT_KEY = "galaxies-jwt-token";

interface AuthProps {
    token: string | null;
    userId: string | null;
    onRegister: (email: string, password: string, name: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => void;
    isInitialised: boolean;
}

interface DecodedToken {
    id: string;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
}: any) => {
    const [token, setToken] = React.useState<string | null>(null);
    const [userId, setUserId] = React.useState<string | null>(null);
    const [isInitialised, setIsInitialised] = React.useState(false);

    // Check if token is stored in SecureStore on app start
    useEffect(() => {
        async function loadToken() {
            const storedToken = await SecureStore.getItemAsync(JWT_KEY);

            if (storedToken) {
                processToken(storedToken);
                setIsInitialised(true);
            }
        }
        loadToken();
    }, []);

    const processToken = (jwt: string) => {
        try {
            const decodedToken = jwtDecode<DecodedToken>(jwt);
            setUserId(decodedToken.id);
            setToken(jwt);
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        } catch (error) {
            console.error(error);
            onLogout();
        }
    };

    const onLogout = async () => {
        setToken(null);
        setUserId(null);
        await SecureStore.deleteItemAsync(JWT_KEY);
        axios.defaults.headers.common["Authorization"] = null;
    };

    const onRegister = async (
        email: string,
        password: string,
        name: string
    ) => {
        try {
            const result = await api.registerUser(email, password, name);
            if (result.error) {
                console.error(result.error);
                return { error: true, msg: result.error };
            }
            if (result.data) processToken(result.data.token);
            await SecureStore.setItemAsync(JWT_KEY, result.data.token);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    const onLogin = async (email: string, password: string) => {
        try {
            const result = await api.loginUser(email, password);
            if (result.error) {
                console.error(result.error);
                return { error: true, msg: result.error };
            }
            processToken(result.data.token);
            console.log("Token", result.data.token);
            await SecureStore.setItemAsync(JWT_KEY, result.data.token);
            return result;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                userId,
                onRegister,
                onLogin,
                onLogout,
                isInitialised,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
