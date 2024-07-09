import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import Swiper from "react-native-swiper";

import ForYouCard from "./ForYouCard";
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
  },
});

export default ForYouPage;
