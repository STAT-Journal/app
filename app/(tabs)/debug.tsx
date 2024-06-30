import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Button, MD3LightTheme } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import { View } from "@/components/Themed";
import CalendarEvents from "@/components/CalendarEvents";
import ImageCapture from "@/components/Entry/ImageCapture";
import ImageGallery from "@/components/Entry/ImageGallery";
import AudioRecorder from "@/components/Entry/AudioCapture";
import StreakTracking from "@/components/StreakTracking";
import { updateStreak, getUserStreak, createUser } from "@/database/queries"; //Import your database functions

export default function DebugScreen() {
  const [streak, setStreak] = useState<number>(0);
  const username = 'testUser'; //Replace with actual username

  useEffect(() => {
    const fetchAndUpdateStreak = async () => {
      await updateStreak(username); 
      const userStreak = await getUserStreak(username); //Replace with actual username
      //console.log(`Streak for username: ${username}, streak: ${userStreak}`);
      setStreak(userStreak);
      //console.log(`Streak updated for username: ${username}, new streak: ${userStreak}`);
      
    };

    //Initial fetch and update
    fetchAndUpdateStreak();

    //Set interval to update streak every second
    const interval = setInterval(fetchAndUpdateStreak, 1000);

    //Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <StreakTracking streak={streak} />
      <AudioRecorder />
      <ImageGallery />
      <Divider />
      <ImageCapture />
      <Divider />
      <CalendarEvents />
    </View>
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
