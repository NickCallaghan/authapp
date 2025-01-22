import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    Button,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import Fab from "@/components/Fab";
import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "@/utils/api";
import { FlatList } from "react-native";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import MessageItemPage from "@/components/MessageItem";
import { COLORS } from "@/utils/colors";

interface messagesProps extends ViewProps {
    // Add your custom props here
}

const MessagesPage: React.FC<messagesProps> = ({ style }) => {
    const router = useRouter();

    const {
        data: messages,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ["messages"],
        queryFn: fetchMessages,
    });

    if (messages?.error) {
        return (
            <ErrorState message="Failed to fetch messages" onRetry={refetch} />
        );
    }

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator color={COLORS.primary} size="large" />
            </View>
        );
    }

    return (
        <View style={[styles.container, style]}>
            <FlatList
                style={styles.flatlist}
                data={messages?.data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MessageItemPage message={item} />}
                ListEmptyComponent={() =>
                    !isLoading && <EmptyState message="No messages to show" />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refetch}
                    />
                }
            />
            <Fab />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "lightgray",
    },
    flatlist: {
        flex: 1,
        width: "100%",
        padding: 16,
    },
});

export default MessagesPage;
