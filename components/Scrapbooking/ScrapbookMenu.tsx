import { Entry } from '@/database/models';
import { readEntries } from '@/database/queries';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar, Button, Card, List, Modal, Paragraph, Title, } from 'react-native-paper';
interface ScrapbookMenuProps {
    onClear: () => void;
    onSave: () => void;
    currentEmoji: string;
}

const listExistingEntries = async () => {
    const entries = await readEntries();
    for(let i = 0; i < entries.length; i++){
        console.log(entries[i])
    }
}
const ScrapbookMenu: React.FC<ScrapbookMenuProps> = ({ onClear, onSave, currentEmoji }) => {
    const [showPicker, setShowPicker] = useState(false);
    


    const onLoad = () => {
        setShowPicker(true);
    }

    return (
        <>
        <Modal visible={showPicker} style={{justifyContent:'center', alignContent:'center', position:'absolute'}} onDismiss={() => {setShowPicker(false)}}>
            {}
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={(props) => <Avatar.Icon {...props} icon="folder" />} />
                                        
            </Card>
        </Modal>
        <View>
            <Text>Scrapbook Menu</Text>
            <View style={styles.row}>
                <Button onPress={onClear} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    Clear
                </Button>
                <Text style={styles.emojiLabel}>
                    Emoji: {currentEmoji}
                </Text>
                <Button onPress={onSave} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    Save
                </Button>
                <Button onPress={listExistingEntries} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    Log 
                </Button>
                <Button onPress={onLoad} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    Load
                    </Button>
                
            </View>
            
        </View>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clearButton: {
        borderColor: 'red',
        borderWidth: 1,
    },
    clearLabel: {
        color: 'red',
        fontSize: 20,
    },
    emojiLabel: {
        fontSize: 20,
        marginLeft: 10, 
    },
});

export default ScrapbookMenu;
