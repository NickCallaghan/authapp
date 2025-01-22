import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { Stack, Slot } from "expo-router";
import { COLORS } from "@/utils/colors";

interface AuthenticatedTabsProps extends ViewProps {
    // Add your custom props here
}

export const AuthenticatedTabs: React.FC<AuthenticatedTabsProps> = ({
    style,
}) => {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="new-msg"
                options={{
                    presentation: "formSheet",
                    headerShown: true,
                    title: "New Message",
                    sheetAllowedDetents: [0.3, 0.8],
                    sheetGrabberVisible: true,
                    sheetExpandsWhenScrolledToEdge: false,
                    headerStyle: {
                        backgroundColor: COLORS.backgroundDark,
                    },
                    contentStyle: {
                        backgroundColor: COLORS.background,
                    },
                    headerTintColor: "#fff",
                }}
            />
        </Stack>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add your styles here
    },
});

export default AuthenticatedTabs;
