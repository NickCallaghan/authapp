import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useQuery } from "@tanstack/react-query";
import { fetchMessage } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ErrorState from "@/components/common/ErrorState";
import { useAuth } from "@/context/AuthContext";
import { updateMessage, deleteMessage } from "@/utils/api";
import * as Burnt from "burnt";
import { useRouter } from "expo-router";

import {
    MessageContainer,
    MessageText,
    EditControls,
} from "@/components/messages";

export default function ViewMesagePage() {
    const { id } = useLocalSearchParams();
    const { userId } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newMessageContent, setNewMessageContent] = useState("");
    const queryClient = useQueryClient();
    const router = useRouter();

    // Handle Intial Message Data Fetch
    const {
        data: message,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["message", id],
        queryFn: () => fetchMessage(Number(id)),
    });

    useEffect(() => {
        if (message?.data?.content) {
            setNewMessageContent(message.data.content);
        }
        return;
    }, [message]);

    const isOwnMessage = message?.data?.userId === userId;

    // Handle Mutations

    const { mutate: updateMessageMutation, isPending: updatePending } =
        useMutation({
            mutationFn: async () =>
                updateMessage(Number(id), { content: newMessageContent }),
            onSuccess: (resp) => {
                if (resp.error) {
                    Burnt.toast({
                        title: "Error",
                        message: "Failed to update message",
                        preset: "error",
                    });
                } else {
                    Burnt.toast({
                        title: "Success!",
                        message: "Message updated",
                        preset: "done",
                    });
                    // Invalidate query
                    queryClient.invalidateQueries({
                        queryKey: ["message", id],
                    });
                    queryClient.invalidateQueries({ queryKey: ["messages"] });
                    router.back();
                }
                setIsEditing(false);
            },
            onError: (err: any) => {
                console.log(`Failed to update message: ${id} --`, err);
            },
        });

    const { mutate: deleteMessageMutation, isPending: deletePending } =
        useMutation({
            mutationFn: async () => deleteMessage(Number(id)),
            onSuccess: (resp) => {
                if (resp.error) {
                    Burnt.toast({
                        title: "Error",
                        message: "Failed to delete message",
                        preset: "error",
                    });
                } else {
                    Burnt.toast({
                        title: "Success!",
                        message: "Message deleted",
                        preset: "done",
                    });
                    queryClient.invalidateQueries({ queryKey: ["messages"] });
                    router.back();
                }
            },
            onError: (err: any) => {
                console.log(`Failed to delete message: ${id} --`, err);
            },
        });

    // Early Return Scenarios
    if (isError)
        return (
            <ErrorState message="Failed to fetch message" onRetry={refetch} />
        );

    if (isLoading || updatePending || deletePending) {
        return (
            <View style={styles.mutationSpinner}>
                <ActivityIndicator color={COLORS.primary} size="large" />
            </View>
        );
    }

    if (!message?.data)
        return (
            <ErrorState message="Unable to find message" onRetry={refetch} />
        );

    // Render Message

    return (
        <View style={styles.container}>
            <MessageContainer>
                {isEditing ? (
                    <TextInput
                        style={styles.textInput}
                        value={newMessageContent}
                        onChangeText={setNewMessageContent}
                    />
                ) : (
                    <MessageText>{newMessageContent}</MessageText>
                )}
                {isOwnMessage && (
                    <EditControls
                        isEditing={isEditing}
                        setEditing={setIsEditing}
                        onDelete={deleteMessageMutation}
                        onUpdate={deleteMessageMutation}
                    />
                )}
            </MessageContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "lightgray",
    },
    textInput: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: COLORS.primary,
        paddingBottom: 8,
    },
    mutationSpinner: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
});
