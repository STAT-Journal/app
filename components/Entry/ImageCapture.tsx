import { MaterialIcons } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import React, { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Divider } from "react-native-paper";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function ImageCapture() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isFullPreviewVisible, setIsFullPreviewVisible] = useState(false);
  const [fullPreviewUri, setFullPreviewUri] = useState("");
  const [imageUris, setImageUris] = useState<string[]>([]); // Store image URIs
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
      const data = await (cameraRef.current as Camera).takePictureAsync(
        options,
      );
      setImageUris((currentUris) => [...currentUris, data.uri]); // Append the new image URI
      console.log(data.uri);
    }
  }
  function handlePreviewTap(uri: React.SetStateAction<string>) {
    setFullPreviewUri(uri);
    setIsFullPreviewVisible(true);
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
      <Divider />
      <ScrollView
        style={styles.previewContainer}
        contentContainerStyle={styles.previewContentContainer}
        horizontal
      >
        {imageUris.map((uri, index) => (
          <TouchableOpacity key={index} onPress={() => handlePreviewTap(uri)}>
            <Image source={{ uri }} style={styles.previewImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {isFullPreviewVisible && (
        <Modal
          visible={isFullPreviewVisible}
          transparent
          onRequestClose={() => setIsFullPreviewVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setIsFullPreviewVisible(false)}
          >
            <View style={styles.fullSizePreviewContainer}>
              <Image
                source={{ uri: fullPreviewUri }}
                style={styles.fullSizePreviewImage}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: heightPercentageToDP("20%"), // Maintain 4:3 aspect ratio
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  swapButton: {
    alignSelf: "flex-start",
    margin: 30,
  },
  captureButton: {
    justifyContent: "center",
    alignContent: "center",
    alignSelf: "center",
    margin: 30,
  },
  previewContainer: {
    maxHeight: 50, // Adjust as needed
  },
  previewContentContainer: {
    // Now this controls the layout of the ScrollView's children
    alignItems: "center", // Ensure items are centered vertically in the container
    padding: 4, // Adjust padding as needed
  },
  previewImage: {
    width: 45,
    height: 45,
    margin: 4,
  },
  fullSizePreviewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
  },
  fullSizePreviewImage: {
    width: "100%", // Full width
    height: "100%", // Full height
    resizeMode: "contain", // Ensure the image fits well
  },
});
