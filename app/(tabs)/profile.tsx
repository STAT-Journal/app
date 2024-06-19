import InventoryCard from '@/components/Profile/InventoryCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Profile = () => {
    return (
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', }}>
           <ProfileCard/>
           <InventoryCard/>
        </View>
    );
};

export default Profile;