import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

interface Props {
    onSubmit: (title: string, description: string) => void;
}

const Entry :React.FC<Props> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        // Pass title and description to sibling element
        // Implement your logic here
        onSubmit(title, description);
    };

    return (
        <View>
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
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};
export default Entry;

