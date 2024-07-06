import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text  } from 'react-native-paper';
import MentalHealthComponent from '@/components/MentalHealth/MentalHealth';

const MentalHelp: React.FC = () => {
    return (
        <View style={styles.container}>
            <Card style={styles.cardTwo}>
                <Card.Content>
                    <Text style={styles.description}>
                        Here are some resources to help you with your mental health.
                        </Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <MentalHealthComponent />
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    card: {
        marginBottom: 20,
    },
    cardTwo: {
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold',
    },
});

export default MentalHelp;