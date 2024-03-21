import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import EntryList from '@/components/Entry/EntryView';



export default function TabThreeScreen() {
     
    
    return (
        <View style={styles.container}>
            <EntryList/>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    padding: 0,
    

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
