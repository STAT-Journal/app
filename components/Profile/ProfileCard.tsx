import { router } from 'expo-router';
import React from 'react';
import {  Button, Card, Title, Paragraph } from 'react-native-paper';

const Profile = () => {
    // Temporary avatar source
    const AvatarSrc = "https://api.dicebear.com/9.x/adventurer/png?seed=Sammy"
    
    return (
        // Todo: Add user name and related information as props
        <Card style={{ margin:10}}>
            <Card.Cover source={{ uri: AvatarSrc }} />
            <Card.Content>
                <Title>User Name</Title> 
                <Paragraph>Current Streak: 2</Paragraph>
                <Paragraph>Currency: 💰12 </Paragraph>
            </Card.Content>
            <Card.Actions >
                <Button onPress={()=>{
                    router.navigate('/store');
                }}>Store</Button>
                <Button>Inventory</Button>
            </Card.Actions>
        </Card>
        
    );
};

export default Profile;