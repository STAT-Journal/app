import { useProfileContext } from '@/database/ProfileProvider';
import { router } from 'expo-router';
import React from 'react';
import {  Button, Card, Title, Paragraph, Modal, Portal, Surface } from 'react-native-paper';
import { SvgUri } from 'react-native-svg';
import ProfileCreator from '../ProfileCreator';

const Profile = () => {
    const profileContext = useProfileContext();
    // Temporary avatar source

    const [showProfileCreator, setShowProfileCreator] = React.useState(false);
    
    return (
        // Todo: Add user name and related information as props
        <>
            {!showProfileCreator &&
                <Card style={{ margin:10}}>
                    <Card.Content>
                        <SvgUri uri={profileContext.profile?.AvatarSVG??""} style={{maxHeight:50}} />
                        <Title>{profileContext.profile?.Username}</Title> 
                        <Paragraph>Current Streak: 2</Paragraph>
                        <Paragraph>Currency: 💰12 </Paragraph>
                    </Card.Content>
                    <Card.Actions >
                        <Button onPress={()=>{
                            router.navigate('/store');
                        }}>Store</Button>
                        <Button>Inventory</Button>
                        <Button onPress={() => setShowProfileCreator(true)}>Edit Profile</Button>
                    </Card.Actions>
                </Card>
            }
            {showProfileCreator &&
            <Surface style={{width: "100%", height: "100%"}}>
                <ProfileCreator callbackOnDone={() => setShowProfileCreator(false)}/>
                <Button onPress={() => setShowProfileCreator(false)}>Close</Button>
            </Surface>
            }
        </>
        
    );
};

export default Profile;