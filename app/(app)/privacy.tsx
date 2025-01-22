import React from "react";
import { View, Text, StyleSheet, ViewProps } from "react-native";
import WebView from "react-native-webview";

interface privacyProps extends ViewProps {
    // Add your custom props here
}

export const privacy: React.FC<privacyProps> = ({ style }) => {
    return <WebView source={{ uri: "https://galaxies.dev/privacy" }} />;
};

const styles = StyleSheet.create({
    container: {
        // Add your styles here
    },
});

export default privacy;
