import React from 'react';
import { IndexStyles } from '@/styles/styles';
import { View } from "@/components/Themed";
import ScrapbookPage from "@/components/Scrapbooking/ScrapbookPage";

export default function ForYouPageScreen() {
  return (
    <View style={IndexStyles.container}>
      <ScrapbookPage />
    </View>
  );
}