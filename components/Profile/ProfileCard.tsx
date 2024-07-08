import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ProfileMenu from './ProfileMenu';
import { checkStreak, getCurrencyAmount } from '@/database/queries';

const Profile = () => {
    const [devMenu, showDevMenu] = React.useState(false);
    const [streak, setStreak] = React.useState<number>(0);
    const [currency, setCurrency] = React.useState<number>(0);
    const [refreshCurrency, setRefreshCurrency] = React.useState<number>(0);
    useEffect(() => {
        const getStreak = async () => {
            let i = await checkStreak();
            setStreak(i);
        };
        getStreak();

        const getCurrency = async () => {
            let i = await getCurrencyAmount();
            setCurrency(i);
        };
        getCurrency();
    },[refreshCurrency]);

    return (
        <>
        <Card style={{ margin:20, width:widthPercentageToDP(95),}}>
            <Card.Content>
                <Title>User Name</Title>
                <View style={{ right: widthPercentageToDP(1), justifyContent: 'space-between', position: 'absolute', margin: 10}}>
                    
                    <Avatar.Text size={80} label="Me" />
                </View>
                <Paragraph>Current Streak: {streak}</Paragraph>
                <Paragraph>Currency: 💰 {currency} </Paragraph>
            </Card.Content>
            <Card.Actions >
                
                <Button onPress={()=>showDevMenu(true)}>Dev Profile Menu</Button>
            </Card.Actions>
        </Card>
        <ProfileMenu visible={devMenu} setVisible={showDevMenu} refresh={()=>{setRefreshCurrency(refreshCurrency => refreshCurrency + 1)}}/>
        </>
    );
};

export default Profile;