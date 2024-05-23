import { CameraView, useCameraPermissions } from 'expo-camera';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
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
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaStatus, requestMediaPermission] = MediaLibrary.usePermissions();
  const [isFullPreviewVisible, setIsFullPreviewVisible] = useState(false);
  const [fullPreviewUri, setFullPreviewUri] = useState("");
  const [imageUris, setImageUris] = useState<string[]>([]);
  const cameraRef = useRef(null);
  const viewShotRef = useRef(null);

  if (!permission || !mediaStatus) {
    return <View />;
  }

  if (!permission.granted || !mediaStatus.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera and save images
        </Text>
        <Button onPress={() => {
          requestPermission();
          requestMediaPermission();
        }} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function captureImage() {
    if (cameraRef.current) {
      const uri = await captureRef(viewShotRef, {
        format: "jpg",
        quality: 0.8
      });
      const asset = await MediaLibrary.createAssetAsync(uri);
      setImageUris((currentUris) => [...currentUris, asset.uri]);
      console.log(asset.uri);
    }
  }

  function handlePreviewTap(uri: string) {
    setFullPreviewUri(uri);
    setIsFullPreviewVisible(true);
  }

  return (
    <>
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={captureImage}
            >
              <Text style={styles.text}>Capture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
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
  text: {
    fontSize: 18,
    color: 'white',
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
