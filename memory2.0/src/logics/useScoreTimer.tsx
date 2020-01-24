import { useEffect, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

export default function useScoreTimer(timeActive: boolean, timerInterval: NodeJS.Timeout | undefined) {
    const { seconds, setSeconds} = useContext(TimerContext);

    useEffect(() => {
        if (setSeconds) {
            if (timeActive) {
                timerInterval = setInterval(() => {
                    setSeconds((seconds) => seconds + 1);
                }, 1000);
            } else if (!timeActive && seconds !== 0 && timerInterval) {
                clearInterval(timerInterval);
            }
            return () => {
                if (timerInterval) clearInterval(timerInterval);
            };
        }
        return;
    }, [timeActive, seconds]);
    
    return { seconds };
}