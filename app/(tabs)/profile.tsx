import ProfileCard from '@/components/Profile/ProfileCard';
import React from 'react';
import { View, Text } from 'react-native';

const Profile = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <ProfileCard/>
        </View>
    );
};

export default Profile;