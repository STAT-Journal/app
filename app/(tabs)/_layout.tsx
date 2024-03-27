import React = require('react');
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
//COLE: Apply FontAwesome filter to the above site to get accurate list of icons
//Possible options for text entry icon: 'plus-square-o', 'pencil-square-o', 'comment-o'
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Justin Calendar',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Text Entry  ',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="plus-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Dev Screen',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="bug" color={color} />,
        }}
      />
      
    </Tabs>
  );
}
