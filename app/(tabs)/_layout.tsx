import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import * as React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

import { setupDatabase } from "@/database/queries";
// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//COLE: Apply FontAwesome filter to the above site to get accurate list of icons
//Possible options for text entry icon: 'plus-square-o', 'pencil-square-o', 'comment-o'
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Setup the database on app start
  setupDatabase();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="feed" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Scrapbooking Entry",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="plus-square-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="debug"
        options={{
          title: "Debug",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="bug" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: ({ color }: { color: string }) => (
            <TabBarIcon name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
