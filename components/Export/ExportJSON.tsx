import React from 'react';
import { View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Button } from 'react-native-paper';

const ExportJSONButton: React.FC = () => {
  const handleExportJSON = async () => {
    // TODO: make this a prop
    const data = {
      entries: [
        {
          ID: 1,
          Elements_JSON: {
            text_elements: [{ x: 10, y: 20, text: 'Hello' }],
            image_elements: [{ x: 30, y: 40, file_location: '/path/to/image.png' }],
          },
        },
        // Add more entries as needed
      ],
      users: [
        {
          Username: 'user1',
          Streak: 5,
          CurrencyAmount: 100,
          LastEntry: 1625246523,
          InventoryOfItems: [
            { name: 'item1', cost: 50, image: '/path/to/item1.png' },
            // Add more items as needed
          ],
        },
        // Add more users as needed
      ],
    };
    
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = `${FileSystem.documentDirectory}database.json`;

    try {
      await FileSystem.writeAsStringAsync(filePath, jsonData);
      Alert.alert('Success', `JSON file exported successfully at ${filePath}`);
    } catch (err) {
      console.error('Error writing JSON file:', err);
      Alert.alert('Error', 'Failed to export JSON file');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button onPress={handleExportJSON}>
        Export JSON
      </Button>
    </View>
  );
};

export default ExportJSONButton;
