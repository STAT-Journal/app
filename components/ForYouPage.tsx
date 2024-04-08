import React from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import ForYouCard from './ForYouCard';
import { View } from "@/components/Themed";

const ForYouPage: React.FC = () => {
  return (
    <Swiper style={styles.wrapper} loop horizontal={false} showsButtons={false} showsPagination={false}>
      <View style={styles.slide}>
        <ForYouCard/>
      </View>
      <View style={styles.slide}>
        <ForYouCard/>
      </View>
      <View style={styles.slide}>
        <ForYouCard/>
      </View>
      {/* Add more cards as needed */}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default ForYouPage;
