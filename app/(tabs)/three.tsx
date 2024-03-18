import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import EntryList from '@/components/EntryList';
import Entry from '@/components/Entry';
import React from 'react';

export default function TabThreeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Three</Text>
            <EntryList
                childComponents={[
                    { title: 'Title 1', description: 'Description 1' },
                    { title: 'Title 2', description: 'Description 2' },
                    { title: 'Title 3', description: 'Description 3' },
                ]}
            />
            <Entry title="Title" description="Description" />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
