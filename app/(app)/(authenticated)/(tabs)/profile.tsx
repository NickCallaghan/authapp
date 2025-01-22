import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    Button,
    TouchableOpacity,
    ColorSchemeName,
    Image,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, uploadImage } from "@/utils/api";
import { useColorScheme } from "react-native";
import { COLORS } from "@/utils/colors";
import * as ImagePicker from "expo-image-picker";
import * as Burnt from "burnt";

interface profileProps extends ViewProps {
    // Add your custom props here
}

const ProfilePage = () => {
    const colorScheme = useColorScheme();
    const styles = makeStyles(colorScheme);
    const { onLogout, token, userId } = useAuth();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: getUserInfo,
    });

    const { mutate: uploadImageMutation } = useMutation({
        mutationFn: uploadImage,
        onSuccess: (response) => {
            // The mutation was successful!
            console.log(response);
            if (response.error) {
                Burnt.toast({
                    title: "Error",
                    message: "Failed to upload image",
                    preset: "error",
                });
            } else {
                Burnt.toast({
                    title: "Success",
                    message: "Image uploaded successfully",
                    preset: "done",
                });
                queryClient.invalidateQueries({ queryKey: ["user", userId] });
            }
            // Use context to read or write data to the query client
        },
        onError: (error, variables, context) => {
            console.error(error);
        },
    });

    const handlePickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (result.canceled) return;
        uploadImageMutation({
            uri: result.assets[0].uri,
            token: token || "",
        });
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.avatarContainer}>
                <TouchableOpacity onPress={handlePickImage}>
                    {user?.data?.avatar ? (
                        <Image source={{ uri: user?.data?.avatar }} />
                    ) : (
                        <Text style={styles.avatarPlaceholder}>
                            {user?.data?.name?.charAt(0).toUpperCase()}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.memberDetailsContainer}>
                <Text style={[styles.textBase, styles.name]}>
                    {user?.data?.name}
                </Text>
                <Text style={[styles.textBase, styles.email]}>
                    {user?.data?.email}
                </Text>
            </View>

            <TouchableOpacity style={styles.logout} onPress={onLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const makeStyles = (colorScheme: ColorSchemeName) =>
    StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: 50,
            paddingHorizontal: 20,
            backgroundColor: colorScheme === "dark" ? "black" : "white",
        },
        memberDetailsContainer: {
            paddingVertical: 5,
        },
        textBase: {
            color: colorScheme === "dark" ? "white" : "black",
            fontSize: 16,
            textAlign: "center",
        },
        name: {
            fontWeight: "bold",
            fontSize: 22,
            paddingBottom: 8,
        },
        email: {
            fontSize: 18,
            color: "#aFaFaF",
        },
        memberSince: {},
        avatarContainer: {
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
            backgroundColor: "#a9a9a9",
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        avatar: {
            height: 100,
            width: 100,
            borderRadius: 50,
        },
        avatarPlaceholder: {
            color: "white",
            fontSize: 40,
            opacity: 0.8,
        },
        logout: {
            backgroundColor: COLORS.primary,
            padding: 14,
            borderRadius: 5,
            width: "100%",
            position: "absolute",
            bottom: 30,
        },
        logoutText: {
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
        },
    });

export default ProfilePage;
