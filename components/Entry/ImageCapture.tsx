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
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Divider } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";

import ImagePreviewScroll from "./ImagePreviewScroll"; 

export default function ImageCapture() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [isFullPreviewVisible, setIsFullPreviewVisible] = useState(false);
  const [fullPreviewUri, setFullPreviewUri] = useState("");
  const [imageUris, setImageUris] = useState<string[]>([]);
  const cameraRef = useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
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
      setImageUris((currentUris) => [...currentUris, data.uri]);
      console.log(data.uri);
    }
  }


  function handlePreviewTap(uri: string) {
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
      <ImagePreviewScroll
        imageUris={imageUris}
        onImagePress={handlePreviewTap}
      />
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
    minHeight: heightPercentageToDP("20%"),
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
    maxHeight: 50, 
  },
  previewContentContainer: {
    alignItems: "center", 
    padding: 4, 
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
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    minHeight: heightPercentageToDP("100%"),
  },
  fullSizePreviewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
