import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MD3LightTheme } from "react-native-paper";

interface ForYouCardProps {
  story: { title: string; description: string };
}

const ForYouCard: React.FC<ForYouCardProps> = ({ story }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{story.title}</Text>
      <Text style={styles.description}>{story.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
    shadowColor: MD3LightTheme.colors.shadow,
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
