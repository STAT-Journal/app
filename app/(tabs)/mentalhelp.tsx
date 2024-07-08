import React from 'react';
import { View } from 'react-native';
import { Card, Text  } from 'react-native-paper';
import MentalHealthComponent from '@/components/MentalHealth/MentalHealth';
import { MentalHelpStyles } from '@/styles/styles';

const MentalHelp: React.FC = () => {
    return (
        <View style={MentalHelpStyles.container}>
            <Card style={MentalHelpStyles.cardTwo}>
                <Card.Content>
                    <Text style={MentalHelpStyles.description}>
                        Here are some resources to help you with your mental health.
                        </Text>
                </Card.Content>
            </Card>
            <Card style={MentalHelpStyles.card}>
                <Card.Content>
                    <MentalHealthComponent />
                </Card.Content>
            </Card>
        </View>
    );
}

export default MentalHelp;