import React from "react";
import { Message } from "@/utils/api";
import {
    View,
    Text,
    StyleSheet,
    ViewProps,
    TouchableOpacity,
    ColorSchemeName,
} from "react-native";
import { Link } from "expo-router";
import { formatDistanceToNow } from "date-fns";
import { useColorScheme } from "react-native";

interface MessageItemProps extends ViewProps {
    message: Message;
}

export const MessageItemPage: React.FC<MessageItemProps> = ({ message }) => {
    const colorScheme = useColorScheme();
    const styles = makeStyles(colorScheme);
    return (
        <Link
            href={`/(app)/(authenticated)/(tabs)/messages/${message.id}`}
            style={styles.container}
            asChild
        >
            <TouchableOpacity style={[styles.container]}>
                <View style={[styles.content]}>
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

const makeStyles = (colorScheme: ColorSchemeName) =>
    StyleSheet.create({
        container: {
            width: "100%",
            backgroundColor: colorScheme === "dark" ? "#444" : "#fff",
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
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
            color: colorScheme === "dark" ? "white" : "black",
        },
        createdAtText: {
            flex: 1,
            textAlign: "right",
            color: colorScheme === "dark" ? "#ccc" : "#666",
        },
    });

export default MessageItemPage;
