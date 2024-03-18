import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Entry from './Entry';

interface ExistingEntry {
    title: string;
    description: string;
}

interface Props {
    ExistingEntries: ExistingEntry[];
}

const ListComponent: React.FC<Props> = ({ ExistingEntries }) => {
    const [entries, setEntries] = useState<ExistingEntry[]>(ExistingEntries);
    

    const addEntry = (title: string, description: string) => {
        setEntries([...entries, { title, description }]);

    }
    
   
 
    return (
        <ScrollView style={styles.container}>
            {entries.map((child, index) => (
                <View key={index} style={styles.listContainer}>
                    <Text style={styles.title}>{child.title}</Text>
                    <Text style={styles.description}>{child.description}</Text>
                </View>
            ))}
            <Entry onSubmit={addEntry} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
        width: wp('80%'),
    },
    listContainer: {
        maxWidth: 900,
        padding: 16,
        margin: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },
});

export default ListComponent;