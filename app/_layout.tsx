import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Appearance } from "react-native";
import { graphql } from "@/gql/codegen";
import { Client, cacheExchange, fetchExchange, Provider } from 'urql';
import { AuthConfig, authExchange, AuthUtilities } from '@urql/exchange-auth';

function devFetchSessionToken(utils: AuthUtilities) {
  const mutation = graphql(`mutation devGetSessionToken {\n  devGetSessionToken\n}`)

  return utils.mutate(mutation, {})
}

async function authExchangeConfiguration(utils: AuthUtilities): Promise<AuthConfig> {
  let sessionToken = '';
  return {
    addAuthToOperation(operation: any) {
      if (!sessionToken) {
        return operation;
      } else {
        return utils.appendHeaders(operation, 
          { Authorization: `Bearer ${sessionToken}` }
        );
      }
    },
    didAuthError({ }: any) {
      return !sessionToken;
    },
    willAuthError({ }: any) {
      return !sessionToken;
    },
    refreshAuth() {
      return devFetchSessionToken(utils).then((result) => {
        sessionToken = result.data?.devGetSessionToken??'';
      });
    },
  }
}

const client = new Client({
  url: process.env.EXPO_API_URL??'',
  exchanges: [
    cacheExchange,
    authExchange(authExchangeConfiguration),
    fetchExchange
  ],
})

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
      <Provider value={client}>
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </Provider>
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
