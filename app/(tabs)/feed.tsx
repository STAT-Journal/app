import React from "react";
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import ForYouPage from "@/components/ForYouPage";

export default function ForYouPageScreen() {
  return (
    <View style={styles.container}>
      <ForYouPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Background color can be from your theme
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "100%",
  },
});
