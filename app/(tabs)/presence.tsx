import React from 'react';
import { usePresence } from '@/components/PresenceProvider';
import { SvgUri } from 'react-native-svg';
import { View } from 'react-native';


export const Presence = () => {
    const avatarSVGs = usePresence();
    return (
        <View style={{display: "flex"}}>
            {avatarSVGs.map((svg, index) => (
                <SvgUri style={{height: 50}} uri={svg} key={index} />
            ))}
        </View>
    )
}

export default Presence;