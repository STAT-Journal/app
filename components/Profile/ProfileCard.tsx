import { router } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import ProfileMenu from './ProfileMenu';
import useCurrency from '@/hooks/useCurrency';
import { useFocusEffect } from '@react-navigation/native';
import useStreak from '@/hooks/useStreak';

const Profile = () => {
    const [devMenu, showDevMenu] = React.useState(false);
    const {streak, checkStreak} = useStreak();
    const { currency, refreshCurrency } = useCurrency();

    useFocusEffect(
        useCallback(() => {
            refreshCurrency();
            checkStreak();
        }, [devMenu])
    );;

    return (
        <>
            <Card style={{ margin: 20, width: widthPercentageToDP(95) }}>
                <Card.Content>
                    <Title>User Name</Title>
                    <View style={{ right: widthPercentageToDP(1), justifyContent: 'space-between', position: 'absolute', margin: 10 }}>
                        <Avatar.Text size={80} label="Me" />
                    </View>
                    <Paragraph>Current Streak: {streak}</Paragraph>
                    <Paragraph>Currency: 💰 {currency} </Paragraph>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => showDevMenu(true)}>Dev Profile Menu</Button>
                </Card.Actions>
            </Card>
            <ProfileMenu visible={devMenu} setVisible={showDevMenu} />
        </>
    );
};

export default Profile;
