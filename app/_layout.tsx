import React from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

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

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default RootLayout;
