// components/Entry/StreakTracker.tsx
import React from "react";
import { View } from "react-native";
import { Card, Title } from "react-native-paper";
import { StreakTrackerStyles } from "@/styles/styles";

interface StreakTrackerProps {
  streak: number;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ streak }) => {
  return (
    <View style={StreakTrackerStyles.container}>
      <Card>
        <Card.Content style={StreakTrackerStyles.cardContent}>
          <Title>🎉{streak}</Title>
        </Card.Content>
      </Card>
    </View>
  );
};

export default StreakTracker;
