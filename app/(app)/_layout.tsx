import { useAuth } from "@/context/AuthContext";
import { COLORS } from "@/utils/colors";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";

export default function UnathourisedStack() {
    const router = useRouter();
    const { isInitialised, token } = useAuth();
    const colorScheme = useColorScheme();

    const segments = useSegments();

    useEffect(() => {
        if (!isInitialised) return;

        const inAuthGroup = segments[1] === "(authenticated)";
        if (token && !inAuthGroup) {
            router.replace("/(app)/(authenticated)/(tabs)/messages", {});
        } else if (inAuthGroup && !token) {
            router.replace("/");
        }
    }, [isInitialised, token]);

    return (
        <Stack
            screenOptions={{
                contentStyle: {
                    backgroundColor:
                        colorScheme === "dark"
                            ? COLORS.dark.background
                            : COLORS.light.background,
                },
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: "#fff",
            }}
        >
            <Stack.Screen
                name="index"
                options={{ headerShown: false, title: "Log In" }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: "Create Account",
                    headerBackTitle: "Login",
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="privacy"
                options={{
                    title: "Privacy Policy",
                    presentation: "modal",
                    headerShown: true,
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                }}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Stack.Screen
                name="(authenticated)"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
