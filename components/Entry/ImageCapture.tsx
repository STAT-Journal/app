import { CameraView, useCameraPermissions } from 'expo-camera';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { Divider } from "react-native-paper";
import { ImageCaptureStyles } from "@/styles/styles";

import ImagePreviewScroll from "./ImagePreviewScroll"; 

export default function ImageCapture() {
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
      <View style={ImageCaptureStyles.container}>
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
      <View style={ImageCaptureStyles.container}>
        <CameraView style={ImageCaptureStyles.camera}>
          <View style={ImageCaptureStyles.buttonContainer}>
            
            <TouchableOpacity
              style={ImageCaptureStyles.captureButton}
              onPress={captureImage}
            >
              <Text style={ImageCaptureStyles.text}>Capture</Text>
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
            <View style={ImageCaptureStyles.fullSizePreviewContainer}>
              <Image
                source={{ uri: fullPreviewUri }}
                style={ImageCaptureStyles.fullSizePreviewImage}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
}
