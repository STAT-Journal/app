import { useState, useEffect, useCallback } from 'react';
import { InventoryItem, ItemAndCount } from '@/database/models';
import { readInventory, updateInventory } from '@/database/queries';

const useInventory = () => {
    const [inventory, setInventory] = useState<ItemAndCount[]>([]);
    const [refresh, setRefresh] = useState<number>(0);

    const fetchInventory = useCallback(async () => {
        const fetchedInventory = await readInventory();
        setInventory(fetchedInventory);
    }, []);

    useEffect(() => {
        fetchInventory();
    }, [fetchInventory, refresh]);

    const refreshInventory = () => {
        setRefresh(prev => prev + 1);
    };
   
    const addItem = async (item: InventoryItem) => {
        if (inventory.some(i => i.item.id === item.id)) {
            const updatedInventory = inventory.map(i => {
                if (i.item.id === item.id) {
                    return { ...i, count: i.count + 1 };
                }
                return i;
            });
            await await updateInventory(updatedInventory);
        } else {
            const updatedInventory = [...inventory, { item, count: 1 }];
            await await updateInventory(updatedInventory);
        }
    }
    const removeItem = async (item: InventoryItem) => {
        if (inventory.some(i => i.item.id === item.id)) {
            const updatedInventory = inventory.map(i => {
                if (i.item.id === item.id) {
                    return { ...i, count: i.count - 1 };
                }
                return i;
            });
            await await updateInventory(updatedInventory);
        }
    }

    return { inventory, refreshInventory , addItem, removeItem};
};

export default useInventory;
