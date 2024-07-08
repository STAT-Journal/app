import { useState, useEffect, useCallback } from 'react';
import { addCurrencyAmount, getCurrencyAmount, reduceCurrencyAmount } from '@/database/queries';

const useCurrency = () => {
    const [currency, setCurrency] = useState<number>(0);
    const [refresh, setRefresh] = useState<number>(0);

    const fetchCurrency = useCallback(async () => {
        let fetchedCurrency = await getCurrencyAmount();
        setCurrency(fetchedCurrency);
    }, []);

    useEffect(() => {
        fetchCurrency();
    }, [fetchCurrency, refresh]);

    const refreshCurrency = () => {
        setRefresh(prev => prev + 1);
    };

    const addCurrency = async (amount: number) => {
        await addCurrencyAmount(amount);
        refreshCurrency();

    }
    const reduceCurrency = async (amount: number) => {
        await reduceCurrencyAmount(amount);
        refreshCurrency();
    }
    return { currency, addCurrency, reduceCurrency, refreshCurrency };
};

export default useCurrency;
