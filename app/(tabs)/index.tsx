import React from 'react';
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import ScrapbookPage from "@/components/Scrapbooking/ScrapbookPage";

export default function ForYouPageScreen() {
  return (
    <View style={styles.container}>
      <ScrapbookPage />
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
