import React from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Button, MD3LightTheme } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import { View } from "@/components/Themed";
import ScrapbookEntry from "@/components/Scrapbooking/ScrapbookEntry";



export default function DragDrop() {


  return (
   <ScrapbookEntry />
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
