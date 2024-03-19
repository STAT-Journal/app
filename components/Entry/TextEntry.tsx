import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';


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
            <View style={styles.addEntryButton}>
                <Button title="Submit" onPress={handleSubmit}/>
            </View>
        </>
    );
};
export default TextEntry;

const styles = StyleSheet.create({
    addEntryButton: {
        
        bottom:0,
        
        alignItems: 'center',
        
        maxWidth: 90,
        padding: 16,
        margin: 8,
        backgroundColor: 'dodgerblue',
        borderRadius: 80,
        borderWidth: 2,
        borderColor: 'black',
    },
    
    
});
