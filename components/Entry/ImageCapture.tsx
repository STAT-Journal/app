import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ImageCapture() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [imageLocation, setImageLocation] = useState<string | null>(null);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  async function captureImage() {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageLocation(data.uri); // For now, we'll just log the image URI. You can handle it as needed.
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={toggleCameraType}
            >
              <MaterialIcons name="cameraswitch" size={34} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={captureImage}
            >
              <MaterialIcons name="camera-alt" size={34} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {imageLocation && (
        <>
          <Text style={{ color: "black" }}> Image Location: </Text>
          <Text style={{ color: "black" }}> {imageLocation}</Text>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  swapButton: {
    flex: 1,
    alignSelf: "flex-start",
    margin: 30,
  },
  captureButton: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    margin: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
