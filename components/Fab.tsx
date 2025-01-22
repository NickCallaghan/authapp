import React from "react";
import { Text, StyleSheet, ViewProps, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";

interface FabProps extends ViewProps {
    // Add your custom props here
}

export const Fab: React.FC<FabProps> = ({ style }) => {
    return (
        <Link href="/(app)/(authenticated)/new-msg" asChild>
            <TouchableOpacity style={styles.fab}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
});

export default Fab;
