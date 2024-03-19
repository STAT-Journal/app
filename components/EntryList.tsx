import  { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Entry} from '@/database/models';
import TextEntry from '@/components/TextEntry';
import { addEntryToDB, getEntries } from '@/database/queries';


interface Props {}



const EntryList: React.FC<Props> = () => {
    const [entries, setEntries] = useState<Entry[]>([]);
    
    //On component mount, get all entries from the database
    useEffect(() => {
        getEntries()
          .then((data: Entry[]) => {
            setEntries(data);
            
        })
          .catch(error => console.error(error));
      }, []);


    const addNewEntry = (title:string, description:string) => {
        addEntryToDB(title, description).then(() => {
            setEntries([...entries, {id: entries.length + 1, title:title, description:description}]);
        });


    }
    
   
 
    return (
        <ScrollView style={styles.container}>
            {entries.map((child, index) => (
                <View key={index} style={styles.listContainer}>

                    <Text style={styles.title}>{child.title}</Text>
                    <Text style={styles.description}>{child.description}</Text>
                </View>
            ))}

            <TextEntry onSubmit={addNewEntry} />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        borderWidth: 1,
        width: wp('80%'),
    },
    listContainer: {
        maxWidth: 900,
        padding: 16,
        margin: 8,
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

export default EntryList;