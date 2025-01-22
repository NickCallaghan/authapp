import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { Stack } from "expo-router";
import { COLORS } from "@/utils/colors";

export const MessagesLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: "#fff",
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: "Messages",
                    headerStyle: {
                        backgroundColor: COLORS.background,
                    },
                    headerTintColor: "#fff",
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Message",
                }}
            />
        </Stack>
    );
};

export default MessagesLayout;
