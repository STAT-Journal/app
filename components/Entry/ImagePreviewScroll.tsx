import React from "react";
import { ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";

interface ImagePreviewScrollProps {
  imageUris: string[];
  onImagePress: (uri: string) => void;
}

const ImagePreviewScroll: React.FC<ImagePreviewScrollProps> = ({
  imageUris,
  onImagePress,
}) => {
  return (
    <ScrollView
      style={styles.previewContainer}
      contentContainerStyle={styles.previewContentContainer}
      horizontal
    >
      {imageUris.map((uri, index) => (
        <TouchableOpacity key={index} onPress={() => onImagePress(uri)}>
          <Image source={{ uri }} style={styles.previewImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default ImagePreviewScroll;
