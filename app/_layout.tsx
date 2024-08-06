import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import * as React from "react";
import { PaperProvider, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./auth";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Appearance } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  //const theme = useTheme();
  //Lightest yellow from the logo = faf59a
  //Orange from the logo = fec260
  //Dark pink: f06aa7
  //light pink : f59eba
  //
/*  theme.colors.primary = "#f59eba"; // Pink
 
  theme.colors.onPrimary = "#f59eba";
  theme.colors.onPrimaryContainer = "#f59eba";

  theme.colors.secondary = "#fec260"; //Dark orange from the logo
  theme.colors.onSecondary = "#fec260";
  theme.colors.onSecondaryContainer = "#fec260";

  theme.colors.background = "#fec260"; // Light Grey
  theme.colors.onBackground = "#fec260"; */
  

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  Appearance.setColorScheme("light"); // TODO: adjust based on user settings
  // Without ^^, the general theme is light, but if the user device is
  // set to dark mode, the app will have some dark elements other light ones.

  return (
    <PaperProvider>
      <AuthProvider>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </AuthProvider>
      <Toast config={toastConfig} topOffset={90} />
    </PaperProvider>
  );
}

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      contentContainerStyle={{ margin: 0 }}
      text1Style={{
        fontSize: 24,
        fontWeight: "400",
      }}
      text1NumberOfLines={2}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
      }}
      text2NumberOfLines={1}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: any) => (
    <ErrorToast
      {...props}
      contentContainerStyle={{ margin: 0 }}
      text1Style={{
        fontSize: 24,
        fontWeight: "400",
      }}
      text1NumberOfLines={2}
      text2Style={{
        fontSize: 14,
        fontWeight: "400",
      }}
      text2NumberOfLines={1}
    />
  ),
};
