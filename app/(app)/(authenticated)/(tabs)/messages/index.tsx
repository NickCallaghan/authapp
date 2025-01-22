import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import Fab from "@/components/Fab";
import MessageItemPage from "@/components/MessageItem";
import { fetchMessages } from "@/utils/api";
import { COLORS } from "@/utils/colors";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
    ActivityIndicator,
    ColorSchemeName,
    FlatList,
    RefreshControl,
    StyleSheet,
    useColorScheme,
    View,
    ViewProps,
} from "react-native";

interface messagesProps extends ViewProps {
    // Add your custom props here
}

const MessagesPage: React.FC<messagesProps> = ({ style }) => {
    const colorScheme = useColorScheme();
    const styles = makeStyles(colorScheme);

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

const makeStyles = (colorScheme: ColorSchemeName) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:
                colorScheme === "dark"
                    ? COLORS.dark.background
                    : COLORS.light.background,
        },
        flatlist: {
            flex: 1,
            width: "100%",
            padding: 16,
        },
    });

export default MessagesPage;
