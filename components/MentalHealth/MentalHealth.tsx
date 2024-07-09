import React from 'react';
import { Linking } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const MentalHealthComponent: React.FC = () => {
    // TODO: Receive this as a prop
    // Prop should be an array
    const handleRedirect = () => {
        Linking.openURL('https://cmha.ca/find-info/mental-health/');
    };

    const handleRedirectTwo = () => {
        Linking.openURL('https://cmha.ca/brochure/coping-with-loneliness/');
    };

    const handleRedirectThree = () => {
        Linking.openURL('https://cmha.ca/brochure/fast-facts-about-mental-illness/');
    }

    const handleRedirectFour = () => {
        Linking.openURL('https://cmha.ca/brochure/feeling-angry/');
    }

    const handleRedirectFive = () => {
        Linking.openURL('https://cmha.ca/brochure/getting-help/');
    }

    const handleRedirectSix = () => {
        Linking.openURL('https://cmha.ca/brochure/grieving/');
    }

    return (
        <View>
            <Card style={styles.card}>
                <Card.Content>
                    <Button onPress={handleRedirect}>
                        Canadian Mental Health Association
                    </Button>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content >
                    <Button onPress={handleRedirectTwo}>
                        Feeling Lonely? 
                    </Button>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Button onPress={handleRedirectThree}>
                        Fast Facts about Mental Health
                    </Button>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Button onPress={handleRedirectFour}>
                        Feeling Angry? 
                    </Button>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Button onPress={handleRedirectFive}>
                        Getting Help 
                    </Button>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Button onPress={handleRedirectSix}>
                        Grieving? 
                    </Button>
                </Card.Content>
            </Card>
        </View>

    );
};

const styles = StyleSheet.create ({

    card: {
        marginBottom: 15,
    },
});


export default MentalHealthComponent;

