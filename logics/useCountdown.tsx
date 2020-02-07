import { useEffect, useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';

export default function useCountdown(timeActive: boolean) {
    const { countdownSeconds, setCountdownSeconds } = useContext(CountdownContext);
    
    useEffect(() => {
        let timerInterval: NodeJS.Timeout | undefined = undefined;
        
        if (setCountdownSeconds) {
            if (timeActive) {
                timerInterval = setInterval(() => {
                    setCountdownSeconds(countdownSeconds - 1)
                }, 1000);
            }
            return () => {
                if (timerInterval) clearInterval(timerInterval);
            };
        }
        return;
    }, [timeActive, countdownSeconds]);
    
    return { countdownSeconds };
}