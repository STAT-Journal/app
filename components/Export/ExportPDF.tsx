import React from 'react';
import { View, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const ExportPDFButton: React.FC = () => {
  const handleExportPDF = async () => {
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

    // Generate HTML content for the PDF
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Entries</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Text Elements</th>
              <th>Image Elements</th>
            </tr>
            ${data.entries.map(entry => `
              <tr>
                <td>${entry.ID}</td>
                <td>${JSON.stringify(entry.Elements_JSON.text_elements)}</td>
                <td>${JSON.stringify(entry.Elements_JSON.image_elements)}</td>
              </tr>
            `).join('')}
          </table>
          <h1>Users</h1>
          <table>
            <tr>
              <th>Username</th>
              <th>Streak</th>
              <th>Currency Amount</th>
              <th>Last Entry</th>
              <th>Inventory of Items</th>
            </tr>
            ${data.users.map(user => `
              <tr>
                <td>${user.Username}</td>
                <td>${user.Streak}</td>
                <td>${user.CurrencyAmount}</td>
                <td>${user.LastEntry}</td>
                <td>${JSON.stringify(user.InventoryOfItems)}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    try {
      // Create the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      
      // Share the PDF
      await Sharing.shareAsync(uri);
      
      Alert.alert('Success', `PDF exported successfully at ${uri}`);
    } catch (err) {
      console.error('Error exporting PDF:', err);
      Alert.alert('Error', 'Failed to export PDF');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button onPress={handleExportPDF}>
        Export PDF
      </Button>
    </View>
  );
};

export default ExportPDFButton;
