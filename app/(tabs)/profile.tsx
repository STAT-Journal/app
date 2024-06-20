import InventoryCard from '@/components/Profile/InventoryCard';
import ProfileCard from '@/components/Profile/ProfileCard';
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {LinearGradient} from 'expo-linear-gradient';

const Profile = () => {
    return (
        <ScrollView contentContainerStyle={{  alignItems: 'center', justifyContent: 'center', top:0 }}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{width:widthPercentageToDP(100), height:1000, position:'absolute', top:0, left:0, right:0, bottom:0}}/>
           <ProfileCard/>
           <InventoryCard/>
        </ScrollView>
    );
};

export default Profile;