import React from 'react';
import { Entry, Element } from '@/database/models';
import { readEntries } from '@/database/queries';
import {useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card, Modal, Portal, } from 'react-native-paper';
import { ScrapbookMenuStyles } from '@/styles/styles';

interface ScrapbookMenuProps {
    onClear: () => void;
    onSave: () => void;
    currentEmoji: string;
    reloadEntry: (entry: Entry) => void;
}

const listExistingEntries = async () => {
    const entries = await readEntries();
    for(let i = 0; i < entries.length; i++){
        console.log(entries[i]);
    }
}
const ScrapbookMenu: React.FC<ScrapbookMenuProps> = ({ onClear, onSave, currentEmoji, reloadEntry }: ScrapbookMenuProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const [entries, setEntries] = useState<Entry[]>([]);

    useEffect(() => {
        const fetchEntries = async () => {
            const result = await readEntries();
            setEntries(result as Entry[]);
            
        };
        
        fetchEntries();
        entries.map((entry: Entry) => {
            console.log(entry.ID);
            console.log(JSON.parse(entry.Elements_JSON.toString())[0].text);
        });
    }, [showPicker]);


    const onLoad = () => {
        setShowPicker(!showPicker);
    }

    
    return (
        <>
            <Portal>
            <Modal visible={showPicker} style={{justifyContent:'center', alignContent:'center', position:'absolute'}} onDismiss={() => {setShowPicker(false)}}>
                <ScrollView>
                {
                (entries).map((entry: Entry) => (
                        <TouchableOpacity key={entry.ID} onPress={() => {
                            reloadEntry(entry);setShowPicker(false);
                            }}>
                        <Card key={entry.ID} style={{margin: 10}}>
                            <Text>   Entry #{entry.ID}</Text>
                            <Card.Title title=
                            {
                                
                                JSON.parse(entry.Elements_JSON.toString()).map((e : Element, index : any) => (
                                    <Text key={index}>{e.text}</Text>
                                ))
                            }
                            />
                           
                        </Card>
                        </TouchableOpacity>
                ))}
                {entries.length === 0 && 
                <Card style={{margin: 10}}>
                            <Card.Title title={"No Entries Found"} />
                        </Card>}
                </ScrollView>
            </Modal>
            </Portal>

        <View>
            <Text>Scrapbook Menu</Text>
            <View>
                <Button onPress={onClear}>
                    Clear
                </Button>
                <Text style={{ alignSelf: "center" }}>
                    Emoji: {currentEmoji}
                </Text>
                <Button onPress={onSave}>
                    Save
                </Button>
                <Button onPress={listExistingEntries}>
                    Log 
                </Button>
                <Button onPress={onLoad}>
                    Load
                    </Button>
                
            </View>
            
        </View>
        </>
    );
};

export default ScrapbookMenu;
