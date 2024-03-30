import React from "react";
import { StyleSheet } from "react-native";

import EntryView from "@/components/Entry/EntryView";
import { View } from "@/components/Themed";

export default function EntryScreen() {
  return (
    <View style={styles.container}>
      <EntryView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
