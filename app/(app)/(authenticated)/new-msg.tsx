import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import * as Burnt from "burnt";

interface NewMessagePageProps extends ViewProps {
    // Add your custom props here
}

export const NewMessagePage: React.FC<NewMessagePageProps> = ({ style }) => {
    const [message, setMessage] = useState("");
    const router = useRouter();
    const queryClient = useQueryClient();

    const { mutate: sendMessage, isPending } = useMutation({
        mutationFn: async (message: string) => {
            return createMessage({ content: message });
        },
        onSuccess: (resp) => {
            queryClient.invalidateQueries({ queryKey: ["messages"] });
            router.back();
            if (resp.error) {
                Burnt.toast({
                    title: "Error",
                    message: "Failed to send message",
                    preset: "error",
                });
            } else {
                Burnt.toast({
                    title: "Success!",
                    message: "Message sent successfully",
                    preset: "done",
                });
            }
        },
        onError: (error) => {
            console.error("ERROR", error);
        },
    });

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setMessage}
                    value={message}
                    placeholder="Message"
                    multiline
                    autoFocus
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[
                        styles.button,
                        !message.trim() && styles.buttonDisabled,
                    ]}
                    onPress={() => sendMessage(message)}
                    disabled={isPending || !message.trim()}
                >
                    {isPending ? (
                        <ActivityIndicator size="small" color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Send</Text>
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    inputContainer: {
        padding: 10,
        gap: 10,
    },
    input: {
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        padding: 12,
        flex: 1,
        fontSize: 16,
        borderColor: "#a9a9a9",
        borderWidth: 1,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: 13,
        borderRadius: 10,
        marginTop: 7,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default NewMessagePage;
