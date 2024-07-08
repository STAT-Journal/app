import React from 'react';
import { TextEntry } from '@/database/models';
import { checkStreak, createTextEntry, readTextEntries, removeTextEntry, updateTextEntry } from '@/database/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Button, Card, Modal, Portal, TextInput } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import StreakTracker from '../StreakTracking';

const EntriesPage = () => {
    const [entries, setEntries] = useState<TextEntry[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newEntry, setNewEntry] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentEntry, setCurrentEntry] = useState<TextEntry | null>(null);
    const [entriesUpdated, setEntriesUpdated] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const fetchEntries = async () => {
            const result = await readTextEntries();
            setEntries(result as TextEntry[]);
        };
        fetchEntries();
    }, [isCreating, isEditing, entriesUpdated]);

    const handleEdit = (entry: TextEntry) => {
        setCurrentEntry(entry);
        setNewEntry(entry.Entry);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (currentEntry) {
            await updateTextEntry(currentEntry.ID, newEntry);
            setEntriesUpdated(prev => prev + 1);
            setIsEditing(false);
            setNewEntry('');
        }
    };
    
    return (
        <ScrollView contentContainerStyle={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', width: widthPercentageToDP(100), flexGrow: 1 }}>
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={{ width: widthPercentageToDP(100), height: heightPercentageToDP(100), position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
            <Portal>
                <Modal visible={isCreating} onDismiss={() => setIsCreating(false)}>
                    <Card style={{ width: widthPercentageToDP(90), margin: 20, backgroundColor: 'rgba(255,255,255,1)', }}>
                        <Card.Title title="Create Entry" />
                        <Card.Content>
                            <TextInput
                                label="What's on your mind?"
                                value={newEntry}
                                onChangeText={text => setNewEntry(text)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button mode="contained"
                                    style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                                    buttonColor='brown'
                                    onPress={() => {
                                        setIsCreating(false);
                                    }}>
                                    Cancel
                                </Button>
                                <Button mode="contained"
                                    style={{ margin: 10, flex: 1, justifyContent: 'space-between',  }}
                                    buttonColor='limegreen'
                                    onPress={async() => {
                                        createTextEntry(newEntry);
                                        setStreak(await checkStreak());
                                        setEntriesUpdated(prev => prev + 1);
                                        setIsCreating(false);
                                        setNewEntry('');
                                    }}>
                                    Create
                                </Button>
                            </View>
                        </Card.Content>
                    </Card>
                </Modal>
            </Portal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: widthPercentageToDP(90) }}>

                <Button mode="elevated"
                    style={{ margin: 10, width: widthPercentageToDP(90), backgroundColor: 'rgba(255,255,255,1)', borderStyle: 'solid', borderWidth: 3, borderColor: 'black', flex: 2}}
                    onPress={() =>
                        setIsCreating(true)
                    }>
                    Create
                </Button>
                <StreakTracker streak={streak} />
            </View>
            {entries.map((entry: TextEntry) => (
                <Pressable key={entry.ID} onPress={() => handleEdit(entry)}>
                    <Card style={{ margin: 10, width: widthPercentageToDP(90), backgroundColor: 'rgba(255,255,255,1)', borderStyle: 'solid', borderWidth: 3, borderColor: 'black' }}>
                        <Card.Title title={"(id: " + (entry.ID ? entry.ID : 0).toString() + ") (created at: " + (entry.CreatedAt ? new Date(parseInt(entry.CreatedAt) * 1000).toLocaleString() : 0).toString() + ")"} />
                        <Card.Content>
                            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{entry.Entry}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button mode="contained"
                                style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                                buttonColor='limegreen'
                                onPress={() => handleEdit(entry)}>
                                Edit
                            </Button>
                            <Button mode="contained"
                                style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                                buttonColor='brown'
                                onPress={() => {
                                    removeTextEntry(entry.ID);
                                    setEntriesUpdated(prev => prev + 1);
                                }}>
                                Remove
                            </Button>
                        </Card.Actions>

                    </Card>
                </Pressable>
            ))}

            <Portal>
                <Modal visible={isEditing} onDismiss={() => setIsEditing(false)}>
                    <Card style={{ width: widthPercentageToDP(90), margin: 20, backgroundColor: 'rgba(255,255,255,1)', }}>
                        <Card.Title title="Edit Entry" />
                        <Card.Content>
                            <TextInput
                                label="What's on your mind?"
                                value={newEntry}
                                onChangeText={text => setNewEntry(text)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button mode="contained"
                                    style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                                    buttonColor='brown'
                                    onPress={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button mode="contained"
                                    style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                                    buttonColor='limegreen'
                                    onPress={handleSave}>
                                    Save
                                </Button>
                            </View>
                        </Card.Content>
                    </Card>
                </Modal>
            </Portal>
        </ScrollView>
    );
};

export default EntriesPage;
