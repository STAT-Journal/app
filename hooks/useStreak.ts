import { useState, useEffect, useCallback } from 'react';
import {  checkStreak as checkStreakFromDB } from '@/database/queries'; 

const useStreak = () => {
    const [streak, setStreak] = useState<number>(0);

    const checkStreak = useCallback(async () => {
        const currentStreak = await checkStreakFromDB();
        setStreak(currentStreak);
    }, []);

    useEffect(() => {
        checkStreak();
        const interval = setInterval(checkStreak, 60 * 24 * 60 * 1000); // 24 hours in milliseconds

        return () => clearInterval(interval);
    }, [checkStreak]);

    return { streak, checkStreak };
};

export default useStreak;
