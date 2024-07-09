import React from "react";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "react-native";
import { EditScreenInfoStyles } from "@/styles/styles";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={EditScreenInfoStyles.getStartedContainer}>
        <Text style={EditScreenInfoStyles.getStartedText}>
          Open up the code for this screen:
        </Text>

        <View
          style={[
            EditScreenInfoStyles.codeHighlightContainer,
            EditScreenInfoStyles.homeScreenFilename,
          ]}
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text style={EditScreenInfoStyles.getStartedText}>
          Change any of the text, save the file, and your app will automatically
          update.
        </Text>
      </View>

      <View style={EditScreenInfoStyles.helpContainer}>
        <ExternalLink
          style={EditScreenInfoStyles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text style={EditScreenInfoStyles.helpLinkText}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}
