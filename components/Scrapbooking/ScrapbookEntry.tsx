import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import ScrapbookMenu from "./ScrapbookMenu";
import ScrapbookCanvas from "./ScrapbookCanvas";
import SpeedDial from "../Entry/SpeedDial";
import EmojiPicker from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import { StatusBar } from 'expo-status-bar';
import { Emoji } from "rn-emoji-picker/dist/interfaces";
import Draggable from "./Draggable";

const ScrapbookEntry = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [recent, setRecent] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [emojisOnCanvas, setEmojisOnCanvas] = useState<{ emoji: string; x: any; y: any; }[]>([]);

    const addText = () => {
        console.log("Add text");
    }

    const addEmoji = () => {
        setShowPicker(true);
    }

    const handleEmojiSelect = (emoji: Emoji) => {
        setSelectedEmoji(emoji.emoji);
        setShowPicker(false);
    }

    const handleCanvasPress = (event: { nativeEvent: { locationX: any; locationY: any; }; }) => {
        const { locationX, locationY } = event.nativeEvent;
        if (selectedEmoji) {
            setEmojisOnCanvas([
                ...emojisOnCanvas,
                { emoji: selectedEmoji, x: locationX, y: locationY }
            ]);
        }
    }

    const handleClearCanvas = () => {
        setEmojisOnCanvas([]);
    }

    return (
        <View style={styles.container}>
            <ScrapbookMenu onClear={handleClearCanvas} currentEmoji={selectedEmoji}/>
            <TouchableWithoutFeedback onPress={handleCanvasPress}>
                <View style={styles.canvas}>
                    <ScrapbookCanvas />
                    {emojisOnCanvas.map((item, index) => (
                        <Draggable key={index} springBack={false}>
                            <Text key={index} style={{ ...styles.emoji, top: item.y, left: item.x }}>
                                {item.emoji}
                            </Text>
                        </Draggable>
                    ))}
                </View>
            </TouchableWithoutFeedback>
            <SpeedDial openTextEntry={addText} openEmojiEntry={addEmoji} />
            {showPicker && (
                <View style={styles.emojiMenu}>
                    <EmojiPicker
                        emojis={emojis}
                        recent={recent}
                        autoFocus={false}
                        loading={false}
                        darkMode={false}
                        perLine={7}
                        onSelect={handleEmojiSelect}
                    />
                </View>
            )}
            <StatusBar style="light" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'yellow',
    },
    canvas: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'orange',
    },
    emoji: {
        position: 'absolute',
        fontSize: 30,
    },
    selectedEmoji: {
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        marginTop: 20,
    },
    emojiMenu: {
        position: 'absolute',
        marginTop: 60,
        width: '100%',
        backgroundColor: '#fff',
    },
});

export default ScrapbookEntry;
