import React from "react";
import { StyleSheet } from "react-native";
import { Menu, Divider, Button, MD3LightTheme } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import { View } from "@/components/Themed";
import CalendarEvents from "@/components/CalendarEvents";

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
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
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
