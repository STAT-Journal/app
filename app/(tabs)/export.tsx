import React from 'react';
import ExportCSV from '@/components/Export/ExportCSV';
import ExportJSON from '@/components/Export/ExportJSON';
import ExportPDF from '@/components/Export/ExportPDF';
import { View, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Card style={styles.cardTwo}>
                <Card.Content>
                    <Text style={styles.description}>
                        Export your data in various formats for backup or sharing purposes.
                    </Text>
                    <Text style={styles.description}>
                        data: {JSON.stringify(data)}
                    </Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <ExportCSV />
                    <ExportJSON />
                    <ExportPDF />
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    description: {
        fontSize: 13,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    card: {
        width: '85%',
        height: '50%',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
    },
    cardTwo: {
        width: '85%',
        height: '45%',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    cardThree: {
        width: '85%',
        height: '25%',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        width: '100%',
        borderRadius: 10,
        backgroundColor: '#6200ee',
    },
});

export default ExportPage;
