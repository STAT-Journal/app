import React from 'react';
import { TextEntry } from '@/database/models';
import { readTextEntries, updateTextEntry } from '@/database/queries';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import InventoryCard from '@/components/Store/InventoryCard';

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
            <InventoryCard />
        </ScrollView>
    );
};

export default EntriesPage;
