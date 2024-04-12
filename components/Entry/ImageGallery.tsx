import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";

import ImagePreviewScroll from "./ImagePreviewScroll"; // Make sure to import the ImagePreviewScroll component
import { heightPercentageToDP } from "react-native-responsive-screen";

export default function ImageGallery() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isFullPreviewVisible, setIsFullPreviewVisible] = useState(false);
  const [fullPreviewUri, setFullPreviewUri] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setSelectedImages((currentImages) => [
        ...currentImages,
        ...result.assets.map((asset) => asset.uri), // Adjust for multiple selections if allowed
      ]);
    }
  };

  function handlePreviewTap(uri: string) {
    setFullPreviewUri(uri);
    setIsFullPreviewVisible(true);
  }

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={pickImage} />
      {/* Use the ImagePreviewScroll component here */}
      <ImagePreviewScroll
        imageUris={selectedImages}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
