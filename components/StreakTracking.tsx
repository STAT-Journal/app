// components/Entry/StreakTracker.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";

interface StreakTrackerProps {
  streak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ streak }) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content style={styles.cardContent}>
          <Title>🎉{streak}</Title>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default StreakTracker;
