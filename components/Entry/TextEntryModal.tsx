import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface Props {
  onSubmit: (title: string, description: string) => void;
  refresh: () => void;
  visible: boolean;
  toggleVisibility: () => void;
}

const TextEntry: React.FC<Props> = ({
  onSubmit,
  refresh,
  visible,
  toggleVisibility,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(visible);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  const handleSubmit = () => {
    toggleVisibility();
    onSubmit(title, description);
    refresh();
  };

  const hideModal = () => {
    toggleVisibility();
  };

  return (
    <>
      {visible && (
        <>
          <Portal>
            <Modal visible={visible} onDismiss={hideModal}>
              <View style={styles.container}>
                <TextInput
                  placeholder="Title"
                  value={title}
                  onChangeText={setTitle}
                  style={{ fontSize: 26, borderRadius: 10 }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    height: hp("2%"),
                  }}
                />
                <TextInput
                  placeholder="Description"
                  value={description}
                  onChangeText={setDescription}
                  style={{ fontSize: 20, borderRadius: 10, height: hp("28%") }}
                  multiline
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Button
                  onPress={handleSubmit}
                  icon="creation"
                  mode="contained"
                  buttonColor="grey"
                  contentStyle={{
                    height: hp(8),
                    width: wp(80),
                    alignSelf: "center",
                  }}
                >
                  Submit
                </Button>
              </View>
            </Modal>
          </Portal>
        </>
      )}
    </>
  );
};
export default TextEntry;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 8,
    padding: 10,

    alignSelf: "center",
    width: wp("90%"),
    height: hp("40%"),
    bottom: hp("10%"),
    backgroundColor: "gray",
  },
});
