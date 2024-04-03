import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SpeedDial from "./SpeedDial";

import IndividualEntry from "@/components/Entry/IndividualEntry";
import TextEntry from "@/components/Entry/TextEntryModal";
import { addEntryToDB, getEntries } from "@/database/queries";
import { SelectUser } from "@/database/schema";

interface Props {}

const EntryView: React.FC<Props> = () => {
  const [entries, setEntries] = useState<SelectUser[]>([]);
  const [textEntryVisible, setTextEntryVisible] = useState<boolean>(false);

  //On component mount, get all entries from the database
  useEffect(() => {
    reloadEntries();
  }, []);

  const addNewEntry = async (title: string, description: string) => {
    try {
      const result = await addEntryToDB(title, description);
      // Handle the result here
      setEntries([...entries, { id: result[0].id, title, description }]);
    } catch (error) {
      console.error(error);
    }
  };

  const reloadEntries = async () => {
    const result = await getEntries();
    console.log(result);
    setEntries(result);
  };

  const toggleShowTextEntry = () => {
    setTextEntryVisible(!textEntryVisible);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {entries.map((child, _) => (
          <IndividualEntry
            key={child.id}
            id={child.id}
            title={child.title}
            description={child.description}
            refresh={reloadEntries}
          />
        ))}
        {entries.length === 0 && (
          <View style={styles.fill}>
            <Text>No Journal Entries 🧐 </Text>
          </View>
        )}
        <View style={{ height: 15 }} />
      </ScrollView>
      <TextEntry
        visible={textEntryVisible}
        refresh={reloadEntries}
        onSubmit={addNewEntry}
        toggleVisibility={toggleShowTextEntry}
      />
      <View style={styles.fab}>
        <SpeedDial openTextEntry={toggleShowTextEntry} />
      </View>
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
