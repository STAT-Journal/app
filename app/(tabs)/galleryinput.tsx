import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import React from 'react';
import * as ImagePicker from 'expo-image-picker';

function pickImage() {
  ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  }).then(result => {
    console.log(result);
  });
}

export default function GalleryTest() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>GalleryTest</Text>
        <Text onPress={pickImage}>Pick an image from camera roll</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

// TODO: Move styles to central location
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });