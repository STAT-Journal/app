import { useEffect, useState } from "react";
import * as collection from "@dicebear/collection";
import { createAvatar, Style } from "@dicebear/core";
import { SvgUri } from 'react-native-svg';
import React from 'react';
import { Button, Card, Headline, Modal, Portal, TextInput } from "react-native-paper";
import { useProfileContext } from "@/database/ProfileProvider";
import { ScrollView, View } from "react-native";

interface StyleOptionProps {
  index: number;
  image: string;
  imageAlt: string;
  style: string;
  selected: boolean;
  pickStyle: () => void;
}

function StyleOption(props: StyleOptionProps) {
  return (
    <Card style={{display: "flex", alignItems: "center", justifyContent: "center", width: "50%", alignSelf: "center", marginTop: 30}}>
      <Card.Content>
        <SvgUri
          width="100px"
          height="100px"
          uri={props.image}
          title={props.style} />
      </Card.Content>
      <Card.Actions>
        <Button onPress={props.pickStyle}>Pick</Button>
      </Card.Actions>
    </Card>
  )
  
}

export default function ProfileCreator({callbackOnDone}: {callbackOnDone?: () => void}) {
  const [username, setUsername] = useState("");
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(-1);
  const [avatarSVG, setAvatarSVG] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const userContext = useProfileContext();

  useEffect(() => {
    if (avatarSVG) {
      setModalVisible(false);
    }
  }, [avatarSVG]);

  const isDone = avatarSVG && username;

  
  const styles = Object.keys(collection).map((styleName, index) => {
    let style = collection[styleName as keyof typeof collection];
    let exampleAvatar = createAvatar(style as Style<{ seed: String; }>, { seed: username });

    return {
        index: index,
        image: exampleAvatar.toDataUri(),
        imageAlt: styleName,
        style: styleName,
        selected: selectedStyleIndex === index,
        pickStyle: () => { setAvatarSVG(exampleAvatar.toDataUri()); setSelectedStyleIndex(index); console.log(`Selected ${index}`)}
    }
  });

  const complete = () => {;
    userContext?.setProfile({ Username: username, AvatarSVG: avatarSVG });
    if (callbackOnDone) {
      callbackOnDone();
    }
  }

    return (
      <View style={{paddingBottom: 120}}>
        <Headline style={{textAlign: "center", marginTop: 60}}>Create a profile!</Headline>
        <TextInput style={{marginTop: 120}} label="Pick a username" value={username} onChangeText={setUsername} />
        <Button style={{marginTop: 10}} onPress={() => setModalVisible(true)}>Pick an avatar</Button>
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)}>
            <ScrollView style={{display:"flex"}}>
              {styles.map((style) => <StyleOption key={style.index} {...style} />)}
            </ScrollView>
          </Modal>
        </Portal>
        {isDone && <Button onPress={complete}>Finish</Button>}
        {isDone && <Button dark onPress={() => { setUsername(""); setAvatarSVG(""); }}>Clear</Button>}
      </View>
      );
}