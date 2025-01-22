import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    TouchableOpacity,
} from "react-native";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps extends ViewProps {
    message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    style,
    message = "Nothing to see here",
}) => {
    return (
        <View style={[styles.container, style]}>
            <Ionicons name="balloon-outline" size={50} color="grey" />
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    messageText: {
        color: "gray",
        fontSize: 16,
    },
    button: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        marginTop: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EmptyState;
