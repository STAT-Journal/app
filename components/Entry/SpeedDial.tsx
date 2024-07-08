import { useIsFocused } from "@react-navigation/native";
import * as React from "react";
import { FAB, Portal } from "react-native-paper";
import { SpeedDialStyles } from "@/styles/styles";

interface Props {
  openTextEntry: () => void;
  openEmojiEntry: () => void;
}

const SpeedDial: React.FC<Props> = ({ openTextEntry, openEmojiEntry }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;
  const isFocused = useIsFocused();
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={isFocused}
        fabStyle={SpeedDialStyles.fab}
        style={SpeedDialStyles.group}
        icon={open ? "notebook-outline" : "plus"}
        actions={[
          { icon: "plus", onPress: () => console.log("Pressed add") },
          {
            icon: "sticker-emoji",
            label: "Emoji",
            onPress: () => {
              openEmojiEntry();
            
            },
          },
          {
            icon: "image",
            label: "Image",
            onPress: () => console.log("Pressed image"),
          },
          {
            icon: "text",
            label: "Text",
            onPress: () => {
              openTextEntry();
            },
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default SpeedDial;
