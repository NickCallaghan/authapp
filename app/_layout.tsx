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
import { useColorScheme } from "react-native";
import {
    ThemeProvider,
    DarkTheme,
    DefaultTheme,
} from "@react-navigation/native";

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
    const colorScheme = useColorScheme();

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
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Slot />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default RootLayout;
