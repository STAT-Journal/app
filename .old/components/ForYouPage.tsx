import React from "react";
import { StyleSheet } from "react-native";
import { MD3LightTheme } from "react-native-paper";
import Swiper from "react-native-swiper";

import ForYouCard from "./ForYouCard";

import { View } from "@/components/Themed";
import { journalStories } from "@/constants/FakeForYouCardText";

const ForYouPage: React.FC = () => {
  return (
    <Swiper
      style={styles.wrapper}
      loop
      horizontal={false}
      showsButtons={false}
      showsPagination={false}
    >
      {journalStories.map((story, index) => (
        <View key={index} style={styles.slide}>
          <ForYouCard story={story} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MD3LightTheme.colors.background,
  },
});

export default ForYouPage;
