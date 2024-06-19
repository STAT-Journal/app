import { InventoryItem } from '@/database/models';
import { readItems } from '@/database/queries';
import React, { useEffect } from 'react';
import { View } from 'react-native';
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

    console.log(items)

    
    return (
        <View style={{ flex: 1, width: widthPercentageToDP(90),  alignItems: 'center', justifyContent: 'center' }}>
            <Card >
                <Card.Content >
                    <Title>Inventory</Title>
                    <View >
                        {items.map((item) => {
                            return (
                                <Card style={{margin:10}}>
                                    <Card.Content>
                                        <Title>{item.name}</Title>
                                        <Paragraph>{item.icon}</Paragraph>
                                        <Paragraph>Cost: {item.cost}</Paragraph>
                                    </Card.Content>
                                </Card>
                            );
                        }
                        )}
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
};

export default InventoryCard;