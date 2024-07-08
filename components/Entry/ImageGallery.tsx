import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Button,
  View,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { ImageGalleryStyles } from "@/styles/styles";
import ImagePreviewScroll from "./ImagePreviewScroll";

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
    <View style={ImageGalleryStyles.container}>
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
            <View style={ImageGalleryStyles.fullSizePreviewContainer}>
              <Image
                source={{ uri: fullPreviewUri }}
                style={ImageGalleryStyles.fullSizePreviewImage}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}
