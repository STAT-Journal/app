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

import AudioRecorder from "@/components/Entry/AudioCapture";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";


export default function DebugScreen() {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button mode='outlined' onPress={() => {
        router.navigate('/dragdrop')
      }}>Launch Emoji/Draggables thing</Button>
      <AudioRecorder />

      <ImageGallery />
      <Divider />
      <ImageCapture />
      <Divider />
      <CalendarEvents />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
    justifyContent: "center",
    backgroundColor: MD3LightTheme.colors.background,
  },
});
