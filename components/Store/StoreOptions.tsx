import { InventoryItem, ItemAndCount } from '@/database/models';
import {readItems,  } from '@/database/queries';
import useCurrency from '@/hooks/useCurrency';
import useInventory from '@/hooks/useInventory';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

const StoreOptionsCard: React.FC = () => {
    const [items, setItems] = React.useState<InventoryItem[]>([]);
    const { currency, addCurrency, reduceCurrency,  refreshCurrency } = useCurrency();
    const { inventory, addItem,refreshInventory } = useInventory();

    useEffect(() => {
        const fetchData = async () => {
            let i = await readItems();
            setItems(i);
            refreshCurrency();
        };
        fetchData();
    },[]);



    const handlePurchase = async (item: InventoryItem) => {
        if (currency >= item.cost) {
            addItem(item);
            reduceCurrency(item.cost);
            refreshCurrency();
            refreshInventory();
            Toast.show({
                type: 'success',
                text1: 'Purchased',
                text2: `${item.name} has been added to your inventory`
            });

        } else {
            console.log('insufficient funds');
            Toast.show({
                type: 'error',
                text1: 'Insufficient Funds',
                text2: `You need 💰${item.cost - currency} more to purchase ${item.name}`
            });
        }
    };
    
    return (
        <Card style={{maxWidth:widthPercentageToDP(95), margin:10}}>
            <Card.Content >
                <Title>Store</Title>
                <Divider/>
                <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center', justifyContent:'space-evenly', marginBottom:10, marginTop:10 }} >
                    {items.map((item) => {
                        return (
                            <Card key={item.id} style={{margin:5, alignContent:'center', padding:10}}>
                            <TouchableOpacity  onPress={() => handlePurchase(item)} >
                                <Card.Content style={{alignContent:'center', justifyContent:'center', }}>
                                    <Title style={{fontSize:28}}> {item.icon}</Title>
                                    <Paragraph style={{fontSize:18}}>💰 {item.cost}</Paragraph>
                                </Card.Content>
                                </TouchableOpacity>
                            </Card>
                            
                        );
                    }
                    )}
                </View>
                <Divider/>
                <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center', justifyContent:'center', margin:10}} >
                    <Text style={{fontSize:24}}>Your Balance: 💰{currency}</Text>
                    </View>
            </Card.Content>
        </Card>
    );
};

export default StoreOptionsCard;