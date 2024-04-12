import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, View } from "react-native";

export default function GalleryImagePicker() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

    if (!result.canceled) {
      setSelectedImages((currentImages) => [
        ...currentImages,
        result.assets[0].uri,
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={pickImage} />
      <ScrollView style={styles.imagesContainer} horizontal>
        {selectedImages.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    marginTop: 15,
    maxHeight: 50,
  },
  image: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
});
