import React, { useState } from "react";
import { View, TouchableWithoutFeedback, Modal } from "react-native";
import ScrapbookMenu from "./ScrapbookMenu";
import SpeedDial from "../Entry/SpeedDial";
import EmojiPicker from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import { StatusBar } from 'expo-status-bar';
import { Emoji } from "rn-emoji-picker/dist/interfaces";
import Draggable from "./Draggable";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { Button, Portal } from "react-native-paper";
import { createEntry, readEntries } from "@/database/queries";
import { Element, Entry } from "@/database/models";
import { LinearGradient } from "expo-linear-gradient";
import { ScrapbookEntryStyles } from "@/styles/styles";

interface ScrapbookEntryProps {
    entry? : Entry
}

const ScrapbookEntry: React.FC<ScrapbookEntryProps> = () => {
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [recent, setRecent] = useState([]);
    const [showPicker, setShowPicker] = useState(false);
    const [elements, setElements] = useState<Element[]>([]);

    

    const addText = () => {
        console.log("Add text");
    }
    
    const saveEntry = () => {
        createEntry(elements);
        console.log("Save entry");
        /* const elements: ElementsJSON = {
            text_elements: emojisOnCanvas.map((emojis) => ({ x: item.x, y: item.y, text: item.emoji })),
            image_elements: [],
        };
        
        console.log(readEntries()); */
    }

    const reloadEntry = (entry: Entry)=> {
        const elements = JSON.parse(entry.Elements_JSON.toString());
        console.log(elements);
        setElements(elements);
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
            setElements([
                ...elements,
                { x: locationX, y: locationY, text: selectedEmoji, scale: 1, rotation: 0}
            ]);
        }
    }

    const handleClearCanvas = () => {
        setElements([]);
    }

    return (
        <View style={ScrapbookEntryStyles.container}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{width:widthPercentageToDP(100), height:1000, position:'absolute', top:0, left:0, right:0, bottom:0}}/>
            <ScrapbookMenu onClear={handleClearCanvas} currentEmoji={selectedEmoji} onSave={saveEntry} reloadEntry={reloadEntry}/>
            <TouchableWithoutFeedback onPress={handleCanvasPress}>
                <View style={ScrapbookEntryStyles.canvas}>
                    {elements.map((item, index) => (
                        <Draggable key={index} element={item}/>
                    ))}
                </View>
            </TouchableWithoutFeedback>
            <SpeedDial openTextEntry={addText} openEmojiEntry={addEmoji} />
            <Portal>
            <Modal
                visible={showPicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowPicker(false)}
            >
                <View style={ScrapbookEntryStyles.modalContainer}>
                    <View style={ScrapbookEntryStyles.emojiMenuContainer}> 
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
                        <View style={ScrapbookEntryStyles.closeButton}>
                            <Button onPress={()=>setShowPicker(false)} mode="elevated" buttonColor="grey" textColor="white" >
                                Close
                            </Button>
                        </View>
                </View>
            </Modal>
            </Portal>
            <StatusBar style="light" />
        </View>
    );
}



export default ScrapbookEntry;
