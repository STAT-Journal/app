import React from 'react';
import ExportCSV from '@/components/Export/ExportCSV';
import ExportJSON from '@/components/Export/ExportJSON';
import ExportPDF from '@/components/Export/ExportPDF';
import { View } from 'react-native';
import { ExportStyles } from '@/styles/styles';
import { Card, Text  } from 'react-native-paper';

const ExportPage: React.FC = () => {
    // TODO: Replace this with actual data from the database
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
            ],
          },
        ],
      };

    return (
        <View>
            <Card>
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
