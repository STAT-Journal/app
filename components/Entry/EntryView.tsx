import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SpeedDial from "./SpeedDial";

import IndividualEntry from "@/components/Entry/IndividualEntry";
import TextEntry from "@/components/Entry/TextEntryModal";
import { Entry } from "@/database/models";
import { addEntryToDB, getEntries } from "@/database/queries";

interface Props {}

const EntryList: React.FC<Props> = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [textEntryVisible, setTextEntryVisible] = useState(false);
  //On component mount, get all entries from the database
  useEffect(() => {
    getEntries()
      .then((data: Entry[]) => {
        setEntries(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const addNewEntry = (title: string, description: string) => {
    addEntryToDB(title, description).then(() => {
      setEntries([...entries, { id: entries.length + 1, title, description }]);
    });
  };

  const reloadEntries = () => {
    getEntries()
      .then((data: Entry[]) => {
        setEntries(data);
      })
      .catch((error) => console.error(error));
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
    position: "absolute",
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

export default EntryList;
