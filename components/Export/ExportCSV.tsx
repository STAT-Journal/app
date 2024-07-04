import React from 'react';
import { View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { Button } from 'react-native-paper';

const ExportCSVButton: React.FC = () => {
  const handleExportCSV = async () => {
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

    // Flatten the data for CSV export
    const flattenedEntries = data.entries.map(entry => ({
      ID: entry.ID,
      text_elements: JSON.stringify(entry.Elements_JSON.text_elements),
      image_elements: JSON.stringify(entry.Elements_JSON.image_elements),
    }));

    const flattenedUsers = data.users.map(user => ({
      Username: user.Username,
      Streak: user.Streak,
      CurrencyAmount: user.CurrencyAmount,
      LastEntry: user.LastEntry,
      InventoryOfItems: JSON.stringify(user.InventoryOfItems),
    }));

    // Convert to CSV format
    const csvEntries = Papa.unparse(flattenedEntries);
    const csvUsers = Papa.unparse(flattenedUsers);

    // Write the CSV data to files
    const entriesFilePath = `${FileSystem.documentDirectory}entries.csv`;
    const usersFilePath = `${FileSystem.documentDirectory}users.csv`;

    try {
      await FileSystem.writeAsStringAsync(entriesFilePath, csvEntries);
      await FileSystem.writeAsStringAsync(usersFilePath, csvUsers);
      Alert.alert('Success', `CSV files exported successfully at ${entriesFilePath} and ${usersFilePath}`);
    } catch (err) {
      console.error('Error writing CSV file:', err);
      Alert.alert('Error', 'Failed to export CSV file');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button mode="contained" onPress={handleExportCSV}>
        Export CSV
      </Button>
    </View>
  );
};

export default ExportCSVButton;
