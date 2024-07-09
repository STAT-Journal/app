import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { deleteEntry } from "@/database/queries";

interface Props {
  title: string;
  description: string;

  id: number;
  refresh: () => void;
}

const IndividualEntry: React.FC<Props> = ({
  title,
  description,
  id,
  refresh,
}) => {
  return (
    <View key={id.toString()} style={styles.IndividualEntry}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.deleteButton}>
        <Pressable
          onPress={() => {
            deleteEntry(id);
            refresh();
          }}
        >
          <FontAwesome
            name="remove"
            style={styles.deleteButtonIcon}
            size={24 as number}
          />
        </Pressable>
      </View>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  IndividualEntry: {
    maxWidth: 900,
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  deleteButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 15,
    right: -4,
    top: -4,
    position: "absolute",
  },
  deleteButtonIcon: {
    color: "white",
    textAlign: "center",
  },
});

export default IndividualEntry;
