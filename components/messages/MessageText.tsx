import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { useColorScheme } from "react-native";

interface MessageTextProps extends ViewProps {
    // Add your custom props here
}

export const MessageText: React.FC<MessageTextProps> = ({
    style,
    children,
}) => {
    const colorScheme = useColorScheme();
    return (
        <Text
            style={{
                color: colorScheme === "dark" ? "white" : "black",
                fontFamily: "Inter_400Regular",
            }}
        >
            {children}
        </Text>
    );
};

export default MessageText;
