import { useEffect, useContext } from 'react';
import { TimerContext } from '../../../../global/context/TimerContext';

export default function useScoreTimer(timeActive: boolean) {
    const { seconds, setSeconds} = useContext(TimerContext);
    
    useEffect(() => {
        let timerInterval: NodeJS.Timeout | undefined = undefined;

        if (setSeconds) {
            if (timeActive) {
                timerInterval = setInterval(() => {
                    setSeconds(seconds => seconds + 1);
                }, 100);
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