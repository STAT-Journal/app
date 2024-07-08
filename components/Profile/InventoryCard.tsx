import { InventoryItem, ItemAndCount } from '@/database/models';
import { readInventory, readItems } from '@/database/queries';
import useInventory from '@/hooks/useInventory';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const InventoryCard: React.FC = () => {
    const { inventory,  refreshInventory , addItem, removeItem} = useInventory();
    
    const isInitialRender = useRef(true);

    useFocusEffect(
        useCallback(() => {
            refreshInventory();
        }, [])
    );


    
    return (
        <Card style={{minWidth:widthPercentageToDP(95), margin:10}}>
            <Card.Content >
                <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center', justifyContent:'center', }} >

                    <Title style={{fontSize:24, flex:1}}>Inventory</Title>
                    <Paragraph style={{flex:1, alignSelf:'flex-end'}}>📦 Total Items: {inventory.length}</Paragraph>   
                    </View>
                <Paragraph style={{fontSize:18}}>Stickers</Paragraph>
                <ScrollView contentContainerStyle={{flexDirection:'row', flexWrap:'wrap', alignContent:'center', justifyContent:'space-evenly', }} >
                    {inventory.map((item) => {
                        return (
                            <View key={item.item.id} style={{flexDirection:'row',  alignContent:'center', justifyContent:'center', padding: 0}} >
                                <Card style={{margin:5, minWidth:widthPercentageToDP(40) ,alignContent:'center', justifyContent:'center', }}>
                                    <Card.Content style={{alignContent:'center', justifyContent:'center',margin:5  }}>
                                        <View style={{flexDirection:'row'}}> 
                                            <Text style={{fontSize:50}}>{item.item.icon}</Text>
                                            <View style={{flexDirection:'column', flexWrap:'wrap', alignContent:'center', justifyContent:'center', }} >
                                                <Paragraph style={{fontWeight:'bold', fontSize:18, margin:10}}>{item.item.name.charAt(0).toUpperCase() + item.item.name.slice(1)}</Paragraph>
                                                <Paragraph style={{fontSize:18, margin:10}}>Cost: 💰 {item.item.cost}</Paragraph>
                                                <Paragraph style={{fontSize:18, margin:10}}>Count: 📦 {item.count}</Paragraph>
                                            </View>
                                        </View>
                                    </Card.Content>
                                </Card>
                            </View>
                        );
                    }
                    )}
                </ScrollView>
            </Card.Content>
        </Card>
    );
};

export default InventoryCard;