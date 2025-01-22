import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

interface MessageTextProps extends ViewProps {
    // Add your custom props here
}

export const MessageText: React.FC<MessageTextProps> = ({
    style,
    children,
}) => {
    return <Text style={styles.container}>{children}</Text>;
};

const styles = StyleSheet.create({
    container: {
        color: "black",
        fontFamily: "Inter_400Regular",
    },
});

export default MessageText;
