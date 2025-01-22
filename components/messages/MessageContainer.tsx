import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";

interface MessageContainerProps extends ViewProps {
    // Add your custom props here
}

export const MessageContainer: React.FC<MessageContainerProps> = ({
    style,
    children,
}) => {
    return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        width: "100%",
        padding: 16,
        borderRadius: 8,
    },
});

export default MessageContainer;
