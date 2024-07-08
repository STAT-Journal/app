import { addCurrency, reduceCurrency } from '@/database/queries';
import React, { useState } from 'react';
import { Modal, Portal, Button, Text, Card } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';

interface ProfileMenuProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    refresh: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ visible, setVisible, refresh }) => {

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}>
                <Card style={{width:widthPercentageToDP(90), justifyContent:'center', alignContent:'center', alignSelf:'center'}}>
                    <Card.Content>
                        <Text>Profile Menu</Text>
                        <Text>Add or Remove Currency</Text>
                        <Button style={{padding:3, margin: 5}} mode={'outlined'} 
                        onPress={async() => {
                            await addCurrency(10); 
                            refresh()}}
                            >Add 10 Currency</Button>
                        <Button style={{padding:3, margin: 5}} mode={'outlined'} 
                        onPress={async() => {
                            await reduceCurrency(10);
                            refresh();
                        }}>Remove 10 Currency</Button>

                        <Button style={{padding:3, margin: 5}} mode={'outlined'} onPress={hideModal}>Close</Button>
                    </Card.Content>

                </Card>
                
            </Modal>

            
        </Portal>
    );
};

export default ProfileMenu;