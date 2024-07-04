import InventoryCard from '@/components/Store/StoreOptions';
import ProfileCard from '@/components/Profile/ProfileCard';
import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {LinearGradient} from 'expo-linear-gradient';

const Profile = () => {
    return (
        <>
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{width:widthPercentageToDP(100), position:'absolute', top:0, left:0, right:0, bottom:0}}/>
        <ScrollView contentContainerStyle={{  alignItems: 'center', justifyContent: 'center', top:0 }}>
            
           <ProfileCard/>
           
        </ScrollView></>
    );
};

export default Profile;