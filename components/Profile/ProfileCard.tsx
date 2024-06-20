import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Profile = () => {
    return (
        
        <Card style={{ margin:20, width:widthPercentageToDP(95),}}>
            <Card.Content>
                <Title>User Name</Title>
                <View style={{ right: widthPercentageToDP(1), justifyContent: 'space-between', position: 'absolute', margin: 10}}>
                    
                    <Avatar.Text size={80} label="Me" />
                </View>
                <Paragraph>Current Streak: 2</Paragraph>
                <Paragraph>Currency: 💰12 </Paragraph>
            </Card.Content>
            <Card.Actions >
                <Button >Store</Button>
                <Button>Inventory</Button>
            </Card.Actions>
        </Card>
        
    );
};

export default Profile;