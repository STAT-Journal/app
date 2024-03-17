import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

interface ChildComponent {
    title: string;
    description: string;
}

interface Props {
    childComponents: ChildComponent[];
}

const ListComponent: React.FC<Props> = ({ childComponents }) => {
    return (
        <ScrollView style={styles.container}>
            <div className = "container outline-2"> 
            {childComponents.map((child, index) => (
                <View key={index} style={styles.childContainer}>
                    <Text style={styles.title}>{child.title}</Text>
                    <Text style={styles.description}>{child.description}</Text>
                </View>
            ))}
            </div>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
    },
    childContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },
});

export default ListComponent;