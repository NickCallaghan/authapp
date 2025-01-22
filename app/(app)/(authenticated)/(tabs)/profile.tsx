import React from "react";
import { View, Text, StyleSheet, ViewProps, Button } from "react-native";
import { useAuth } from "@/context/AuthContext";

interface profileProps extends ViewProps {
    // Add your custom props here
}

const ProfilePage = () => {
    const { onLogout } = useAuth();
    return (
        <View style={[styles.container]}>
            <Text>Profile</Text>

            <Button title="Logout" onPress={onLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add your styles here
    },
});

export default ProfilePage;
