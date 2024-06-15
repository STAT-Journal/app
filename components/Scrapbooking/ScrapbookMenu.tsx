import { Entry } from '@/database/models';
import { readEntries } from '@/database/queries';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, List, Modal, } from 'react-native-paper';
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
        <View>
            <Text>Scrapbook Menu</Text>
            <View style={styles.row}>
                <Button onPress={onClear} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    Clear
                </Button>
                <Text style={styles.emojiLabel}>
                    Current Emoji: {currentEmoji}
                </Text>
                <Button onPress={onSave} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    Save
                </Button>
                <Button onPress={listExistingEntries} style={styles.clearButton} labelStyle={styles.clearLabel}>
                    List 
                </Button>
                <Modal visible={showPicker} onDismiss={() => {setShowPicker(false)}}>
                    <></>
                </Modal>
            </View>
        </View>
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
