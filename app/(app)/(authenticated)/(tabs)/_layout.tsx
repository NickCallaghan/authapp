import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/utils/colors";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#666",
                headerStyle: {
                    backgroundColor: COLORS.background,
                },
                headerTintColor: "#fff",
            }}
        >
            <Tabs.Screen
                name="messages"
                options={{
                    headerShown: false,
                    title: "Messages",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome
                            size={size}
                            name="comments"
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome size={size} name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
