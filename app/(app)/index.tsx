import {
    View,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Alert,
} from "react-native";
import { Image } from "react-native";
import React, { useState, useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { COLORS } from "@/utils/colors";
import { useForm, Controller, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must required"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
    const [loading, setLoading] = useState(false);
    const { onRegister, onLogin } = useAuth();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (data: FormData) => {
        if (!onLogin) return;
        setLoading(true);
        console.log({ email: data.email, password: data.password });
        const result = await onLogin(data.email, data.password);
        if (result && !result.error) {
            router.push("/(app)/(authenticated)/(tabs)/messages");
        }
        setLoading(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.header}>
                    <Image
                        source={{
                            uri: "https://galaxies.dev/img/logos/logo--blue.png",
                        }}
                        style={styles.image}
                    />
                    <Text style={styles.headline}>Galaxies.dev</Text>
                    <Text style={styles.subheadline}>
                        The app for react native
                    </Text>
                </View>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.inputContainer}>
                            <TextInput
                                autoCapitalize="none"
                                placeholder="john@doe.com"
                                value={value}
                                onChangeText={onChange}
                                style={styles.inputField}
                                placeholderTextColor={COLORS.placeholder}
                                keyboardType="email-address"
                            />
                            {errors.email && (
                                <Text style={styles.errorText}>
                                    {errors.email.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="password"
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry
                                style={styles.inputField}
                                placeholderTextColor={COLORS.placeholder}
                            />
                            {errors.password && (
                                <Text style={styles.errorText}>
                                    {errors.password.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={[
                        styles.button,
                        !errors.email && !errors.password
                            ? {}
                            : styles.buttonDisabled,
                    ]}
                    disabled={!!errors.email || !!errors.password}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            !errors.email && !errors.password
                                ? {}
                                : styles.buttonTextDisabled,
                        ]}
                    >
                        Log In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/register")}
                    style={styles.registerButton}
                >
                    <Text style={[styles.registerButtonText]}>Register</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator color="#fff" size="large" />
                </View>
            )}

            <Link
                href="/privacy"
                style={{ position: "absolute", bottom: 40, width: "100%" }}
            >
                <Text style={{ color: "white", textAlign: "center" }}>
                    Privacy Policy
                </Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
        justifyContent: "center",
    },
    header: {
        alignItems: "center",
        marginBottom: 40,
    },
    image: {
        height: 200,
        width: "100%",
        resizeMode: "contain",
    },
    inputContainer: {
        marginBottom: 12,
    },
    headline: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        marginBottom: 4,
    },
    subheadline: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.primary,
    },
    inputField: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 4,
        padding: 10,
        color: "#fff",
        backgroundColor: COLORS.input,
    },
    errorText: {
        color: "#ff6b6b",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    button: {
        marginTop: 20,
        alignItems: "center",
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 4,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    buttonTextDisabled: {
        opacity: 0.5,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 1,
        justifyContent: "center",
    },

    registerButton: {
        marginTop: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.primary,
        padding: 12,
        borderRadius: 4,
    },
    registerButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default Register;
