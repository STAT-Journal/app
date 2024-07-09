import React from 'react';
import { TextEntry } from '@/database/models';
import { checkStreak, createTextEntry, readTextEntries, removeTextEntry, updateTextEntry } from '@/database/queries';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { Button, Card, Modal, Portal, TextInput } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
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
        <ScrollView>
            <Card>
                <Card.Title title="Create Entry" />
                <Card.Content>
                    <TextInput
                        label="What's on your mind?"
                        value={newEntry}
                        onChangeText={text => setNewEntry(text)} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <Button mode="contained"
                            onPress={() => {
                                setIsCreating(false);
                            }}>
                            Cancel
                        </Button>
                        <Button mode="contained"
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

            <StreakTracker streak={streak} />
            {entries.map((entry: TextEntry) => (
                <Card style={{ margin: 10 }} key={entry.ID}>
                    <Card.Title title={"(id: " + (entry.ID ? entry.ID : 0).toString() + ") (created at: " + (entry.CreatedAt ? new Date(parseInt(entry.CreatedAt) * 1000).toLocaleString() : 0).toString() + ")"} />
                    <Card.Content>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{entry.Entry}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button 
                            style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                            onPress={() => handleEdit(entry)}>
                            Edit
                        </Button>
                        <Button 
                            style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                            onPress={() => {
                                removeTextEntry(entry.ID);
                                setEntriesUpdated(prev => prev + 1);
                            }}>
                            Remove
                        </Button>
                    </Card.Actions>
                </Card>
            ))}

            <Portal>
                <Modal visible={isEditing} onDismiss={() => setIsEditing(false)}>
                    <Card style={{ width: widthPercentageToDP(90), margin: 20, }}>
                        <Card.Title title="Edit Entry" />
                        <Card.Content>
                            <TextInput
                                label="What's on your mind?"
                                value={newEntry}
                                onChangeText={text => setNewEntry(text)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button 
                                    style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
                                    onPress={() => setIsEditing(false)}>
                                    Cancel
                                </Button>
                                <Button 
                                    style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}
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
