import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet,  } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';

interface Props {
    onSubmit: (title:string, description:string) => void;
    refresh: () => void;
    visible: boolean;
}

const TextEntry :React.FC<Props> = ({ onSubmit, refresh, visible }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [open, setOpen] = useState(visible);

    useEffect(() => {
        setOpen(visible);
    }, []);
    const handleSubmit = () => {
        setOpen(false);
        onSubmit(title, description);
        refresh();
    };

    return (
        <>
    {open && <View style={styles.container} >
        <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={{fontSize: 16}}
               
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{fontSize: 16}}
            />
            
            <Button title="Submit" onPress={handleSubmit}  />
        </View>}
             
            
            
        </>
    );
};
export default TextEntry;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
      position: 'absolute',
      alignSelf: 'center',
      bottom: hp(5),
      width: wp(90),
      backgroundColor: 'white',
    
  },
});
  