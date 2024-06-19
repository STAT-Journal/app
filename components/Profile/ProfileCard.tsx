import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const Profile = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Card style={{ margin: 20 }}>
                <Card.Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Title>User Name</Title>
                        <Avatar.Text size={60} label="Me" />
                    </View>
                    <Paragraph>Current Streak: 2</Paragraph>
                    <Paragraph>Currency: 💰12 </Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button>Store</Button>
                    <Button>Inventory</Button>
                </Card.Actions>
            </Card>
        </View>
    );
};

export default Profile;