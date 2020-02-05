import { useEffect, useContext } from 'react';
import { ChronoCountdownContext } from '../context/ChronoCountdownContext';

export default function useCountdown(timeActive: boolean) {
    const { seconds, setSeconds } = useContext(ChronoCountdownContext);
    
    useEffect(() => {
        let timerInterval: NodeJS.Timeout | undefined = undefined;
        
        if (setSeconds) {
            if (timeActive) {
                timerInterval = setInterval(() => {
                    setSeconds(seconds - 1)
                }, 1000);
            }
            return () => {
                if (timerInterval) clearInterval(timerInterval);
            };
        }
        return;
    }, [timeActive, seconds]);
    
    return { seconds };
}