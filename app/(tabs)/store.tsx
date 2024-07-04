import React from 'react';
import { Entry, TextEntry } from '@/database/models';
import { createTextEntry, readTextEntries, removeTextEntry, updateTextEntry } from '@/database/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { View, Text, Touchable, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Button, Card, Modal, Portal, TextInput } from 'react-native-paper';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import StoreOptions from '@/components/Store/StoreOptions';

const EntriesPage = () => {
    const [entries, setEntries] = useState<TextEntry[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newEntry, setNewEntry] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentEntry, setCurrentEntry] = useState<TextEntry | null>(null);
    const [entriesUpdated, setEntriesUpdated] = useState(0);

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
            <StoreOptions />
        </ScrollView>
    );
};

export default EntriesPage;
