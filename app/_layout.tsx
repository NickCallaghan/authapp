import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import {
    useFonts,
    Inter_900Black,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
});

export const RootLayout = () => {
    useReactQueryDevTools(queryClient);
    SplashScreen.preventAutoHideAsync();
    const [fontsLoaded] = useFonts({
        Inter_900Black,
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold,
    });

    React.useEffect(() => {
        SplashScreen.hideAsync();
    }, [fontsLoaded]);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default RootLayout;
