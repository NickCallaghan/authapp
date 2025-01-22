import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { updateMessage } from "@/utils/api";

interface EditControlsProps extends ViewProps {
    isEditing: boolean;
    onUpdate: () => void;
    onDelete: () => void;
    setEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditControls: React.FC<EditControlsProps> = ({
    style,
    isEditing,
    setEditing,
    onUpdate,
    onDelete,
}) => {
    return (
        <View style={[styles.container, style]}>
            {!isEditing ? (
                <View style={styles.controlRow}>
                    <Ionicons
                        name="pencil"
                        size={24}
                        color="black"
                        onPress={() => setEditing(true)}
                    />
                    <Ionicons
                        name="trash"
                        size={24}
                        color="black"
                        onPress={onDelete}
                    />
                </View>
            ) : (
                <View style={styles.controlRow}>
                    <Ionicons
                        name="checkmark"
                        size={24}
                        color="black"
                        onPress={onUpdate}
                    />
                    <Ionicons
                        name="close"
                        size={24}
                        color="black"
                        onPress={() => setEditing(false)}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
    },
    controlRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 15,
    },
});

export default EditControls;
