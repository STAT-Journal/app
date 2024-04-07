import React from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Button, MD3LightTheme } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import CalendarEvents from "@/components/CalendarEvents";
import { View } from "@/components/Themed";
import ImageCapture from "@/components/Entry/ImageCapture";

export default function DebugScreen() {
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{
          width: widthPercentageToDP(100),
          left: 0,
          marginVertical: heightPercentageToDP(10),
          flexGrow: 1,
        }}
        anchor={
          <Button
            onPress={openMenu}
            mode="outlined"
            icon="eye"
            style={{
              marginBottom: heightPercentageToDP(70),
              width: widthPercentageToDP(50),
              alignSelf: "center",
            }}
            labelStyle={{ fontSize: 20 }}
          >
            Show menu
          </Button>
        }
      >
        <Menu.Item onPress={() => {}} title="Item 1" />
        <ImageCapture />
        <Divider />

        <CalendarEvents />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    justifyContent: "center",
    backgroundColor: MD3LightTheme.colors.background,
  },
});
