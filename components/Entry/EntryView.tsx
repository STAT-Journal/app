import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ScrapbookCanvas from "../Scrapbooking/ScrapbookCanvas";
import ScrapbookMenu from "../Scrapbooking/ScrapbookMenu";
import ScrapbookEntry from "../Scrapbooking/ScrapbookEntry";

interface Props {}

const EntryView: React.FC<Props> = () => {

  const [entries, setEntries] = useState([]);

  return (
    <>

      <ScrapbookEntry />
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    width: wp("90%"),
  },
  fab: {
    bottom: 100,
    right: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputBox: {
    zIndex: 10,
    marginBottom: 36,
    alignSelf: "center",
    width: "80%",
    borderWidth: 1,
  },
  fill: {
    flexGrow: 1,
    flex: 1,
    height: hp("30%"),
  },
});

export default EntryView;
