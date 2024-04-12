import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { journalStories } from "@/constants/FakeForYouCardText";

let lastDisplayedIndex = -1;

const getRandomStory = () => {
  let randomIndex = Math.floor(Math.random() * journalStories.length);

  // If lastDisplayedIndex exists, ensure the next random story is different
  if (lastDisplayedIndex !== -1) {
    randomIndex = (lastDisplayedIndex + 1) % journalStories.length;
  }

  // Update lastDisplayedIndex for next time
  lastDisplayedIndex = randomIndex;

  return journalStories[randomIndex];
};

interface ForYouCardProps {}

const ForYouCard: React.FC<ForYouCardProps> = () => {
  const { title, description } = getRandomStory();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ForYouCard;
