import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import * as React from "react";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { checkStreak, setupDatabase } from "@/database/queries";
import ProfileCreator from "@/components/ProfileCreator";
import { Modal } from "react-native";
import { Portal, Surface } from "react-native-paper";
import { useProfileContext } from "@/database/ProfileProvider";
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
  const profileContext = useProfileContext();

  // Setup the database on app start
  React.useEffect(() => {
    setupDatabase();
    checkStreak();
  }, []);

  const showProfileCreator = !profileContext.profile;

  return (
    <>
      {showProfileCreator && 
        <Surface style={{marginTop: 120}}>
          <ProfileCreator />
        </Surface>
      }
      { !showProfileCreator &&
        <Tabs
          screenOptions={{
            // Disable the static render of the header on web
            // to prevent a hydration error in React Navigation v6.
            headerShown: useClientOnlyValue(false, true),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Feed",
              tabBarIcon: ({ color }: { color: string }) => (
                <TabBarIcon name="feed" color={color} />
              ),
            }}
          />
          
          <Tabs.Screen
            name="store"
            options={{
              title: "Store",
              tabBarIcon: ({ color }: { color: string }) => (
                <TabBarIcon name="shopping-basket" color={color} />
              ),
            }}
          />
          <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="user" color={color} />
            ),
          }}
        />
        {__DEV__ && (<Tabs.Screen
            name="debug"
            options={{
              title: "Debug",
              tabBarIcon: ({ color }: { color: string }) => (
                <TabBarIcon name="bug" color={color} />
              ),
            }}
          />) }
          {/* <Tabs.Screen
            name="user"
            options={{
              title: "User",
              tabBarIcon: ({ color }: { color: string }) => (
                <TabBarIcon name="user" color={color} />
              ),
            }}
          /> */}
          <Tabs.Screen
          name="export"
          options={{
            title: "Export",
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="download" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dragdrop"
          options={{
            title: "Emojis",
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="smile-o" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="mentalhealth"
          options={{
            title: "Mental Health Resources",
            tabBarIcon: ({ color }: { color: string }) => (
              <TabBarIcon name="heart" color={color} />
            ),
          }}
        />              
        </Tabs>
      }
    </>
  );
}
