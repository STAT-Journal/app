import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import EntryList from '@/components/EntryList';

import React from 'react';
interface ExistingEntry {
    title: string;
    description: string;
}
export default function TabThreeScreen() {
    const someDatabaseResults: ExistingEntry[] = [
        { title: 'Existing entry 1', description: 'Description 1' },
        { title: 'Existing entry 2', description: 'Description 2' },
        { title: 'Existing entry 3', description: 'Description 3' },
    ];

    return (
        <View style={styles.container}>
            
            <EntryList
                ExistingEntries={someDatabaseResults}
            />
            

        </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    padding: 20,
    

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
