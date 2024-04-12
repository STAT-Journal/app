import React from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Button, MD3LightTheme } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import { View } from "@/components/Themed";
import CalendarEvents from "@/components/CalendarEvents";
import ImageCapture from "@/components/Entry/ImageCapture";
import ImageGallery from "@/components/Entry/ImageGallery";

export default function DebugScreen() {


  return (
    <View style={styles.container}>
      <ImageGallery />
      <Divider />
      <ImageCapture />
      <Divider />
      <CalendarEvents />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    backgroundColor: MD3LightTheme.colors.background,
  },
});
