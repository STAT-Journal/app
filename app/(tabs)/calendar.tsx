import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

import CalendarEvents from '@/components/CalendarEvents';
import React from 'react';

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <CalendarEvents/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',
  },
});