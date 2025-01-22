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

interface ErrorStateProps extends ViewProps {
    message?: string;
    onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
    style,
    message = "Error",
    onRetry,
}) => {
    return (
        <View style={[styles.container, style]}>
            <Ionicons name="alert-circle-outline" size={50} color="grey" />
            <Text style={styles.messageText}>{message}</Text>

            {onRetry && (
                <TouchableOpacity style={styles.button} onPress={onRetry}>
                    <Text style={styles.buttonText}>Try again</Text>
                </TouchableOpacity>
            )}
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

export default ErrorState;
