import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Entry} from '@/database/models';
import { addEntryToDB, getEntries } from '@/database/queries';

import TextEntry from '@/components/Entry/TextEntry';
import IndividualEntry from '@/components/Entry/IndividualEntry';


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
    
   const reloadEntries = () => {
        getEntries()
          .then((data: Entry[]) => {
            setEntries(data);
            
        })
          .catch(error => console.error(error));
    }   
 


    return (
        <ScrollView style={styles.container}>
            {entries.map((child, index) => (
                <IndividualEntry index={index} id={child.id} title={child.title} description={child.description} refresh={reloadEntries} />
            ))}

            <TextEntry onSubmit={addNewEntry} refresh={reloadEntries}/>

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

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default EntryList;