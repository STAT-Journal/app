import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-paper";

interface ImageCaptureProps {
  // Define the props that this component can take }
  visible: boolean;
}
export default function ImageCapture({ visible }: ImageCaptureProps) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [modalVisible, setVisible] = useState(visible);
  useEffect(() => {
    setVisible(visible);
  }, [visible]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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

  return (
    <>
      <Button title="Show Camera" onPress={showModal} />
      <Modal
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
        }}
        visible={modalVisible}
        onDismiss={hideModal}
      >
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>width: widthPercentageToDP(90),
          </View>
        </Camera>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold"
  },
});
