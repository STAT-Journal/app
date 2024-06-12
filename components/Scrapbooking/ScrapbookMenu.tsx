import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, } from 'react-native-paper';
interface ScrapbookMenuProps {
    onClear: () => void;
    currentEmoji: string;
}

const ScrapbookMenu: React.FC<{ onClear: () => void; currentEmoji: string }> = ({ onClear, currentEmoji }) => {
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
