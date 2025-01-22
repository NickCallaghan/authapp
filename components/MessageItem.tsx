import React from "react";
import { Message } from "@/utils/api";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import { formatDistanceToNow } from "date-fns";

interface MessageItemProps extends ViewProps {
    message: Message;
}

export const MessageItemPage: React.FC<MessageItemProps> = ({
    style,
    message,
}) => {
    return (
        <Link
            href={`/(app)/(authenticated)/(tabs)/messages/${message.id}`}
            style={styles.container}
            asChild
        >
            <TouchableOpacity style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.messageText} numberOfLines={2}>
                        {message.content}
                    </Text>
                    <Text style={styles.createdAtText}>
                        {formatDistanceToNow(message.createdAt)}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    },
    messageText: {
        flex: 2,
        flexWrap: "wrap",
        fontSize: 16,
        fontFamily: "Inter_400Regular",
    },
    createdAtText: {
        flex: 1,
        textAlign: "right",
        color: "#666",
    },
});

export default MessageItemPage;
