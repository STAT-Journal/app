import React from 'react';
import { Modal, Portal, Button, Text, Card } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import useCurrency from '@/hooks/useCurrency'; // Adjust the path as needed

interface ProfileMenuProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ visible, setVisible }) => {
    const { addCurrency, reduceCurrency, refreshCurrency } = useCurrency();

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}>
                <Card style={{ width: widthPercentageToDP(90), justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
                    <Card.Content>
                        <Text>Profile Menu</Text>
                        <Text>Add or Remove Currency</Text>
                        <Button
                            style={{ padding: 3, margin: 5 }}
                            mode={'outlined'}
                            onPress={async () => {
                                await addCurrency(10);
                                refreshCurrency();
                            }}
                        >
                            Add 10 Currency
                        </Button>
                        <Button
                            style={{ padding: 3, margin: 5 }}
                            mode={'outlined'}
                            onPress={async () => {
                                await reduceCurrency(10);
                                refreshCurrency();
                            }}
                        >
                            Remove 10 Currency
                        </Button>

                        <Button style={{ padding: 3, margin: 5 }} mode={'outlined'} onPress={hideModal}>
                            Close
                        </Button>
                    </Card.Content>
                </Card>
            </Modal>
        </Portal>
    );
};

export default ProfileMenu;
