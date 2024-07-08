import { InventoryItem } from '@/database/models';
import { readItems } from '@/database/queries';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const InventoryCard: React.FC = () => {
    const [items, setItems] = React.useState<InventoryItem[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            let i = await readItems();
            setItems(i);
        };
        fetchData();
    },[]);


    
    return (
        <Card style={{maxWidth:widthPercentageToDP(95), margin:10}}>
            <Card.Content >
                <Title>Store</Title>
                <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center', justifyContent:'center', }} >
                    {items.map((item) => {
                        return (
                            <Card key={item.id} style={{margin:10, alignContent:'center', justifyContent:'center', }}>
                                <Card.Content style={{alignContent:'center', justifyContent:'center', }}>
                                    <Title style={{fontSize:27}}> {item.icon}</Title>
                                    <Paragraph style={{fontSize:18}}>💰 {item.cost}</Paragraph>
                                </Card.Content>
                            </Card>
                        );
                    }
                    )}
                </View>
                <View style={{flexDirection:'row', flexWrap:'wrap', alignContent:'center', justifyContent:'center', }} >
                    <Text style={{fontSize:24}}>Your Balance: 💰12</Text>
                    </View>
            </Card.Content>
        </Card>
    );
};

export default InventoryCard;