import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileCard from '@/components/Profile/ProfileCard';

const Profile = () => {
    

    return (
        <ScrollView contentContainerStyle={{  alignItems: 'center', justifyContent: 'center', top:0 }}>
           <ProfileCard/>
        </ScrollView>
    );
};

export default Profile;