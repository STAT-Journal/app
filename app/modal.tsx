import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform } from "react-native";
import { ModalScreenStyles } from "@/styles/styles";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <View style={ModalScreenStyles.container}>
      <Text style={ModalScreenStyles.title}>Modal</Text>
      <View
        style={ModalScreenStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
