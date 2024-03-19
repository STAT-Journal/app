import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';


interface Props {
    onSubmit: (title:string, description:string) => void;
    refresh: () => void;
}

const TextEntry :React.FC<Props> = ({ onSubmit, refresh }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        
        onSubmit(title, description);
        refresh();
    };

    return (
        <>
        <View style={styles.container}>
            <TextInput
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            
            <Button title="Submit" onPress={handleSubmit}  />
        </View>
             <TouchableOpacity style={styles.fab} onPress={() => console.log('Pressed')}>

             </TouchableOpacity>
            
            
        </>
    );
};
export default TextEntry;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderWidth: 1,
    },
    fab: {
        zIndex: -1,
      /* position: 'absolute',
      width: 56, // Diameter of the FAB
      height: 56, // Diameter of the FAB
      alignItems: 'center',
      justifyContent: 'center',
      right: 20,
      bottom: 20,
      backgroundColor: '#007bff', // Change this to your desired FAB color
      borderRadius: 28, // Half the diameter to make it perfectly circular
      elevation: 4, // Shadow for Android
      shadowColor: '#000', // Shadow for iOS
      shadowRadius: 2,
      shadowOpacity: 0.1,
      shadowOffset: { height: 2, width: 0 }, */
    },
    fabIcon: {
        zIndex: -1,
       fontSize: 24,
      color: 'white', 
    },
  });
  