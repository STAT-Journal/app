import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, Modal,  } from "react-native";
import ScrapbookMenu from "./ScrapbookMenu";
import ScrapbookCanvas from "./ScrapbookCanvas";
import SpeedDial from "../Entry/SpeedDial";
import EmojiPicker from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import { StatusBar } from 'expo-status-bar';
import { Emoji } from "rn-emoji-picker/dist/interfaces";
import Draggable from "./Draggable";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Button } from "react-native-paper";
import { createEntry, getUserStreak, readEntries, updateStreak, incrementStreak } from "@/database/queries";
import { ElementsJSON } from "@/database/models";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const ScrapbookEntry = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [recent, setRecent] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [emojisOnCanvas, setEmojisOnCanvas] = useState<{ emoji: string; x: any; y: any; }[]>([]);

    const addText = () => {
        console.log("Add text");
    }
    const saveEntry = async (username: string) => {
        console.log("Save entry");
        const elements: ElementsJSON = {
            text_elements: emojisOnCanvas.map((item) => ({ x: item.x, y: item.y, text: item.emoji })),
            image_elements: [],
        };

        //Update streak
        await incrementStreak(username);

        const streak = await getUserStreak(username)
        console.log(await "Streak updated" + " " + username + "Streak amount " + streak)

        //Create a new entry
        await createEntry(elements, username);
        console.log(await readEntries());
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
            <ScrapbookMenu onClear={handleClearCanvas} currentEmoji={selectedEmoji} onSave={() => saveEntry("testUser")}/>
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
            <Modal
                visible={showPicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowPicker(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.emojiMenuContainer}> 
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
                        <View style={styles.closeButton}>
                            <Button onPress={()=>setShowPicker(false)} mode="elevated" buttonColor="grey" textColor="white" >
                                Close
                            </Button>
                        </View>
                </View>
            </Modal>
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
    modalContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    closeButton: {
        position: 'absolute',
        bottom: 10,

    },
    emojiMenuContainer: {
        width: widthPercentageToDP(95),
        height: widthPercentageToDP(100),
        flexGrow:1,
        backgroundColor: '#fff',
        borderRadius: 10,

    },
});

export default ScrapbookEntry;
