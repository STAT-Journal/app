import React from 'react';
import ExportCSV from '@/components/Export/ExportCSV';
import ExportJSON from '@/components/Export/ExportJSON';
import ExportPDF from '@/components/Export/ExportPDF';
import { View } from 'react-native';
import { ExportStyles } from '@/styles/styles';
import { Card, Text  } from 'react-native-paper';

const ExportPage: React.FC = () => {
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

    return (
        <View style={ExportStyles.container}>
            <Card style={ExportStyles.cardTwo}>
                <Card.Content>
                    <Text style={ExportStyles.description}>
                        Export your data in various formats for backup or sharing purposes.
                    </Text>
                    <Text style={ExportStyles.description}>
                        data: {JSON.stringify(data)}
                    </Text>
                </Card.Content>
            </Card>
            <Card style={ExportStyles.card}>
                <Card.Content>
                    <ExportCSV />
                    <ExportJSON />
                    <ExportPDF />
                </Card.Content>
            </Card>
        </View>
    );
};

export default ExportPage;
