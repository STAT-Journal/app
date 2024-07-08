import { Audio } from "expo-av";
import { Recording } from "expo-av/build/Audio";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AudioCaptureStyles } from "@/styles/styles";

export default function AudioRecorder() {
  const [recording, setRecording] = useState<Recording | undefined>(undefined);
  const [recordings, setRecordings] = useState<{ uri: string }[]>([]);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      // Ensure permission is granted before starting recording
      if (permissionResponse?.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }

      // Configure audio mode for iOS
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(newRecording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) return;

    console.log("Stopping recording..");
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI() || "No URI found";
    setRecordings((previousRecordings) => [...previousRecordings, { uri }]);
    setRecording(undefined);
    console.log("Recording stopped and stored at", uri);
  }

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playSound = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: true },
    );
    await sound.playAsync();
  };

  return (
    <View style={AudioCaptureStyles.container}>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={toggleRecording}
      />
      <ScrollView style={AudioCaptureStyles.recordingsContainer} horizontal>
        {recordings.map((recording, index) => (
          <TouchableOpacity
            key={index}
            style={AudioCaptureStyles.recording}
            onPress={() => playSound(recording.uri)}
          >
            <Text>Play Recording {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
