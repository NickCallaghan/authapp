import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";

interface authenticatedProps extends ViewProps {
    // Add your custom props here
}

export const authenticated: React.FC<authenticatedProps> = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={{ color: "white" }}>authenticated</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default authenticated;
