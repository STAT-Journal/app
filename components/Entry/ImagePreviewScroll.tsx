import React from "react";
import { ScrollView, TouchableOpacity, Image } from "react-native";
import { ImagePreviewStyles } from "@/styles/styles";

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
      style={ImagePreviewStyles.previewContainer}
      contentContainerStyle={ImagePreviewStyles.previewContentContainer}
      horizontal
    >
      {imageUris.map((uri, index) => (
        <TouchableOpacity key={index} onPress={() => onImagePress(uri)}>
          <Image source={{ uri }} style={ImagePreviewStyles.previewImage} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default ImagePreviewScroll;
