import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Button, MD3LightTheme } from "react-native-paper";
import CalendarEvents from "@/components/CalendarEvents";
import ImageCapture from "@/components/Entry/ImageCapture";
import ImageGallery from "@/components/Entry/ImageGallery";
import AudioRecorder from "@/components/Entry/AudioCapture";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";
import StreakTracking from "@/components/StreakTracking";
import ExportJSONButton from "@/components/Export/ExportJSON";
import ExportCSVButton from "@/components/Export/ExportCSV";
import ExportPDFButton from "@/components/Export/ExportPDF";
import { checkStreak } from "@/database/queries";
import { useFocusEffect } from "@react-navigation/native";



export default function DebugScreen() {
  // TODO: this should be provided elsewhere, probably as a hook 
  // to use in other components
  const [streak, setStreak] = useState(0); 
  
  // TODO: remove when streak is hookitized
  useFocusEffect(() => {
    const updateStreak = async () => {
      const streak = await checkStreak();
      setStreak(streak);
    }
    updateStreak();

    });

  return (
    <ScrollView >
      <StreakTracking streak={streak} />
      <AudioRecorder />
      <ImageGallery />
      <Divider />
      <ImageCapture />
      <Divider />
      <CalendarEvents />
    </ScrollView>
  );
}