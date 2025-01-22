import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useColorScheme } from "react-native";

interface MessageContainerProps extends ViewProps {
    // Add your custom props here
}

export const MessageContainer: React.FC<MessageContainerProps> = ({
    style,
    children,
}) => {
    const colorScheme = useColorScheme();
    return (
        <View
            style={{
                backgroundColor: colorScheme === "dark" ? "#444" : "#fff",
                width: "100%",
                padding: 16,
                borderRadius: 8,
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
        >
            {children}
        </View>
    );
};

export default MessageContainer;
