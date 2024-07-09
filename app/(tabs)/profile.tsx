import ProfileCard from '@/components/Profile/ProfileCard';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {LinearGradient} from 'expo-linear-gradient';

const Profile = () => {
    return (
        <>

        <ScrollView contentContainerStyle={{  alignItems: 'center', justifyContent: 'center', top:0 }}>
           <ProfileCard/>
        </ScrollView></>
    );
};

export default Profile;