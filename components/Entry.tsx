import React from 'react';
import { View, TextInput } from 'react-native';

interface ChildComponentProps {
    title: string;
    description: string;
}

const ChildComponent: React.FC<ChildComponentProps> = ({ title, description }) => {
    return (
        <View>
            <TextInput value={title} onChangeText={(text) => console.log(text)} />
            <TextInput value={description} onChangeText={(text) => console.log(text)} />
        </View>
    );
};

export default ChildComponent;